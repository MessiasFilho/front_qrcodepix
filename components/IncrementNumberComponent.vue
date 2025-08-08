<template>
    <div>
        <NumberField :min="0"  :max="item.stock_quantity" :default-value="0" v-model="amount" >
            <NumberFieldContent>
                <NumberFieldDecrement />
                <NumberFieldInput  />
                <NumberFieldIncrement />
            </NumberFieldContent>
        </NumberField>
    </div>
</template>

<script setup lang="ts">

const amount = ref()

const props = defineProps<{
    item: {
    id: number
    name: string
    value: number
    stock_quantity: number
  }
}>()

const emit = defineEmits<{
    (e: 'update_stock',id: number, value: number ): void
}>()

watch(amount, (val) => {
  emit('update_stock', props.item.id, val)
})

</script>

<style scoped>

</style>