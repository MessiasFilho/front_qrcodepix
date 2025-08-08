<template>
  <div class="flex p-1 flex-col w-full h-full bg-[var(--background)]">
    <header class="p-4 bg-[var(--popover)] rounded-xl flex items-center space-x-3 shadow mb-4">
      <button
        type="button"
        @click="navigateTo('/dashboard/products/create')"
        class="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--muted)] hover:bg-[var(--accent)] text-[var(--primary)] transition-all active:scale-95"
      >
        <ArrowBigLeft :size="22" />
      </button>
      <h1 class="text-lg font-semibold uppercase text-[var(--primary)]">Editar Produto</h1>
    </header>

    <form
      @submit.prevent="UpdateProduct"
      class="bg-[var(--popover)] text-[var(--card-foreground)] w-full p-6 rounded-2xl shadow-xl space-y-4 transition-all"
    >
      <!-- Nome -->
      <div class="flex flex-col space-y-1">
        <label class="text-sm font-medium text-[var(--muted-foreground)]">Nome</label>
        <input
          v-model="productStore.product.name"
          required
          class="bg-[var(--muted)] text-[var(--foreground)] border border-[var(--border)] placeholder-[var(--muted-foreground)] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--ring)] transition-all"
          type="text"
          placeholder="Nome do produto"
        />
      </div>

      <!-- Descrição -->
      <div class="flex flex-col space-y-1">
        <label class="text-sm font-medium text-[var(--muted-foreground)]">Descrição</label>
        <input
          v-model="productStore.product.description"
          required
          class="bg-[var(--muted)] text-[var(--foreground)] border border-[var(--border)] placeholder-[var(--muted-foreground)] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--ring)] transition-all"
          type="text"
          placeholder="Descrição"
        />
      </div>

      <!-- Valor -->
      <div class="flex flex-col space-y-1">
        <label class="text-sm font-medium text-[var(--muted-foreground)]">Valor</label>
        <input
          v-model="productStore.product.value"
          required
          class="bg-[var(--muted)] text-[var(--foreground)] border border-[var(--border)] placeholder-[var(--muted-foreground)] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--ring)] transition-all"
          type="number"
          placeholder="Ex: 29.99"
        />
      </div>

      <!-- Quantidade em estoque -->
      <div class="flex flex-col space-y-1">
        <label class="text-sm font-medium text-[var(--muted-foreground)]">Quantidade em estoque</label>
        <input
          v-model="productStore.product.stock_quantity"
          required
          class="bg-[var(--muted)] text-[var(--foreground)] border border-[var(--border)] placeholder-[var(--muted-foreground)] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--ring)] transition-all"
          type="number"
          placeholder="Ex: 5"
        />
      </div>

      <!-- Imagem -->
      <div class="flex flex-col space-y-1">
        <label class="text-sm font-medium text-[var(--muted-foreground)]">Imagem</label>
        <input
        
          class="bg-[var(--muted)] text-[var(--foreground)] border border-[var(--border)] placeholder-[var(--muted-foreground)] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--ring)] transition-all"
          type="text"
          placeholder="URL da imagem"
        />
      </div>

      <!-- Botões -->
      <div class="flex justify-end w-full pt-2">
      

        <button
          type="submit"
          class="bg-[var(--primary)] hover:bg-[var(--accent)] text-[var(--primary-foreground)] px-4 py-2 rounded-md font-semibold active:scale-95 transition-all"
        >
          Editar
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useProducts, type UpdateProduct } from '~/store/products';


import { ArrowBigLeft } from 'lucide-vue-next';
import { useCommon } from '~/store/common';
definePageMeta({
    name: "edit_product",
    layout: 'dashboard'
})

const productStore = useProducts()
const commumstore = useCommon()

const productUser = ref<UpdateProduct>({
    description: '',
    imagens: '',
    name: '',
    stock_quantity: 0,
    category_id: 0,
    value: 0
})

const UpdateProduct = async () => {
    await productStore.UpdateProduct(productUser.value = {
        name: productStore.product.name,
        description: productStore.product.description,
        value: productStore.product.value,
        stock_quantity: productStore.product.stock_quantity,
        category_id: commumstore.CategoryId,
        imagens: productStore.product.imagens
    }, commumstore.paramId )
}

onMounted( async () =>{
    if ( commumstore.CategoryId == 0){
        navigateTo('../products')
    }
    await productStore.GetProductById(commumstore.paramId)
})


</script>

<style scoped></style>