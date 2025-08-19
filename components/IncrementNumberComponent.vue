<template>
  <div>
    <NumberField
      :min="0"
      :max="max ?? 0"
      v-model="innerValue"
    >
      <NumberFieldContent>
        <NumberFieldDecrement />
        <NumberFieldInput />
        <NumberFieldIncrement />
      </NumberFieldContent>
    </NumberField>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue?: number
  max?: number
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

// valor interno controlado pelo pai
const innerValue = ref<number>(props.modelValue ?? 0)

// mantém sincronizado quando o pai muda
watch(() => props.modelValue, (v) => {
  innerValue.value = v ?? 0
})

// emite quando o usuário altera
watch(innerValue, (v) => {
  emit('update:modelValue', Number(v) || 0)
})
</script>