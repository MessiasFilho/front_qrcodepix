<template>
  <div class="flex p-1 flex-col w-full h-full bg-[var(--background)]">
    <header class="p-4 bg-[var(--popover)] rounded-xl flex items-center  space-x-3 shadow mb-4">
      <button
        type="button"
        @click="navigateTo('/dashboard/products')"
         class="w-10 h-10 flex items-center justify-center  rounded-full bg-[var(--muted)] hover:bg-[var(--accent)] text-[var(--primary)] transition-all active:scale-95" >
         <ArrowBigLeft  :size="22" />
      </button>
      <h1 class="text-lg font-semibold uppercase text-[var(--primary)]">Criar Produto</h1>
    </header>

    <form
      @submit.prevent="CreateProduct"
      class="bg-[var(--popover)] text-[var(--card-foreground)] w-full p-6 rounded-2xl shadow-xl space-y-4 transition-all"
    >
      <!-- Nome -->
      <div class="flex flex-col space-y-1">
        <label for="name" class="text-sm font-medium text-[var(--muted-foreground)]">Nome</label>
        <input
          id="name"
          v-model="productsuser.name"
          required
          class="bg-[var(--muted)] text-[var(--foreground)] border border-[var(--border)] placeholder-[var(--muted-foreground)] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--ring)] transition-all"
          type="text"
          placeholder="Digite o nome do produto"
        />
      </div>

      <!-- Descrição -->
      <div class="flex flex-col space-y-1">
        <label for="description" class="text-sm font-medium text-[var(--muted-foreground)]">Descrição</label>
        <input
          id="description"
          v-model="productsuser.description"
          required
          class="bg-[var(--muted)] text-[var(--foreground)] border border-[var(--border)] placeholder-[var(--muted-foreground)] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--ring)] transition-all"
          type="text"
          placeholder="Descrição do produto"
        />
      </div>

      <!-- Valor -->
      <div class="flex flex-col space-y-1">
        <label for="value" class="text-sm font-medium text-[var(--muted-foreground)]">Valor</label>
        <input
          id="value"
          v-model="productsuser.value"
          required
          class="bg-[var(--muted)] text-[var(--foreground)] border border-[var(--border)] placeholder-[var(--muted-foreground)] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--ring)] transition-all"
          type="number"
          placeholder="Ex: 29.99"
        />
      </div>

      <!-- Quantidade em Estoque -->
      <div class="flex flex-col space-y-1">
        <label for="stock_quantity" class="text-sm font-medium text-[var(--muted-foreground)]">Quantidade em estoque</label>
        <input
          id="stock_quantity"
          v-model="productsuser.stock_quantity"
          required
          class="bg-[var(--muted)] text-[var(--foreground)] border border-[var(--border)] placeholder-[var(--muted-foreground)] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--ring)] transition-all"
          type="number"
          placeholder="Ex: 10"
        />
      </div>

      <!-- Imagem -->
      <div class="flex flex-col space-y-1">
        <label for="image" class="text-sm font-medium text-[var(--muted-foreground)]">Imagem</label>
        <input
          id="image"
          
          class="bg-[var(--muted)] text-[var(--foreground)] border border-[var(--border)] placeholder-[var(--muted-foreground)] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--ring)] transition-all"
          type="text"
          placeholder="URL da imagem"
        />
      </div>

      <!-- Botões -->
      <div class="flex justify-end space-x-3 pt-2">
 
        <button
          type="submit"
          class="bg-[var(--primary)] hover:bg-[var(--accent)] text-[var(--primary-foreground)] px-4 py-2 rounded-md font-semibold active:scale-95 transition-all"
        >
          Criar
        </button>
      </div>
    </form>
  </div>
</template>


<script setup lang="ts">
import { useProducts, type Product_Interface } from '~/store/products';

import { ArrowBigLeft } from 'lucide-vue-next';
import { useCommon } from '~/store/common';
definePageMeta({
    name: "create_product",
    layout: 'dashboard'
})

const productStore = useProducts()
const commumstore = useCommon()

const productsuser = ref<Product_Interface>({
    description: '',
    imagens: '',
    name: '',
    stock_quantity: 0,
    value: 0
})

const CreateProduct = async () => {
    await productStore.CreateProduct(productsuser.value, commumstore.CategoryId)
}


</script>

<style scoped></style>