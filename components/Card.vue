<template>
  <div :class="['rounded-xl shadow-md  justify-center  bg-white border-l-4', borderColor]">
    <div class="flex items-center p-2 justify-between ">
      <{{ icon }} />
      <div class="text-right">
        <div class="text-sm text-gray-500 text-center ">{{ title }}</div>
        <div class="text-lg font-semibold text-gray-800">{{ value }}</div>
        <div v-if="extra" class="text-xs text-gray-400">{{ extra }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const props = defineProps<{
  title: string
  icon: string
  value: string
  extra?: string
  color?: 'green' | 'red' | 'blue' | 'gray'
}>()

const borderColor = computed(() => {
  return {
    green: 'border-green-500',
    red: 'border-red-500',
    blue: 'border-blue-500',
    gray: 'border-gray-400',
  }[props.color ?? 'gray']
})
</script>
