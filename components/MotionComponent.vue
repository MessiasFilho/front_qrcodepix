<template>
  <Motion
    :initial="animationConfig.initial"
    :animate="animationConfig.enter"
    v-bind="attrs"
  >
    <slot v-if="!isCounting" />
    <template v-else>
      <span>{{ formattedValue }}</span>
    </template>
  </Motion>
</template>

<script setup lang="ts">

const attrs = useAttrs()

const props = defineProps<{
  animation: 'scale' | 'fade' | 'fade-up' | 'fade-down' | 'slide-left' | 'slide-right',
  format?: 'money' | 'number' | 'none',
  delay?: number,
  countTo?: number, // <- novo!
  duration?: number // <- duração da contagem animada (em ms)
}>()

const animations = {
  scale: (delay = 0) => ({
    initial: { opacity: 0, scale: 0.8 },
    enter: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, delay }
    }
  }),
  fade: (delay = 0) => ({
    initial: { opacity: 0 },
    enter: {
      opacity: 1,
      transition: { duration: 0.4, delay }
    }
  }),
  'fade-up': (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    enter: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, delay }
    }
  }),
  'fade-down': (delay = 0) => ({
    initial: { opacity: 0, y: -20 },
    enter: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, delay }
    }
  }),
  'slide-left': (delay = 0) => ({
    initial: { opacity: 0, x: 50 },
    enter: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, delay }
    }
  }),
  'slide-right': (delay = 0) => ({
    initial: { opacity: 0, x: -50 },
    enter: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, delay }
    }
  })
}

const animationConfig = computed(() => animations[props.animation](props.delay || 0))

// Lógica do contador animado
const displayedValue = ref(0)
const isCounting = computed(() => typeof props.countTo === 'number')

const formattedValue = computed(() => {
  switch (props.format) {
    case 'money':
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(displayedValue.value)
    case 'number':
      return new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(displayedValue.value)
    case 'none':
    default:
      return displayedValue.value.toString()
  }
})

function animateCount(to: number, duration: number) {
  const start = 0
  const startTime = performance.now()
  const frame = (now: number) => {
    const progress = Math.min((now - startTime) / duration, 1)
    displayedValue.value = Math.floor(start + (to - start) * progress)
    if (progress < 1) {
      requestAnimationFrame(frame)
    }
  }
  requestAnimationFrame(frame)
}

onMounted(() => {
  

  if (isCounting.value && typeof props.countTo === 'number') {
    animateCount(props.countTo, props.duration || 1000)
  }
})
</script>
