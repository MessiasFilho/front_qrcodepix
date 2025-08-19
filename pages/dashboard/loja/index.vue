<template>
  <div class="w-full min-h-screen flex flex-col ">
    <header class="w-full  mb-2  h-48">
      <div
        class="w-full h-full flex items-center justify-center bg-gradient-to-r  text-white text-3xl font-bold from-purple-600 to-indigo-600">
        <span>asdasd</span>
      </div>
    </header>
    <div class="bg-gray-100 rounded-md p-2">

      <div class="flex  items-center  bg-white rounded-t-md p-2 h-full ">
        <input v-model="search" class="w-full outline-none border p-1 rounded-md" type="text" placeholder="buscar produtos">
      </div>

      <div class="flex items-center bg-white rounded-b-md px-2 h-full ">
        <button @click="selectedCategory = ''"
          :class="['p-2 rounded-md transition-all', selectedCategory === '' ? 'bg-indigo-600 text-white' : 'bg-gray-200']">
          Todos
        </button>
        <div class=" overflow-x-auto whitespace-nowrap px-4 py-1 rounded-r-md  ">
          <div class="inline-flex gap-3">

            <div v-for="(cat, index) in categoryStore.categoryes" :key="index" class="">
              <button @click="selectedCategory = cat.name"
                :class="['px-4 py-2 rounded-md cursor-pointer transition-all whitespace-nowrap',
                  selectedCategory === cat.name ? 'bg-indigo-600 text-white' : 'bg-gray-200 hover:bg-indigo-500 hover:text-white']">
                {{ cat.name }}
              </button>
            </div>
          </div>
        </div>

      </div>
      
      <div class="flex-1 grid grid-cols-1 mt-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div v-for="(product, index) in filterProducts" :key="index"
          class="bg-white p-4 rounded-xl shadow hover:scale-[1.02] hover:shadow-md transition-all">
          <img  class="w-full h-40 object-cover rounded-md mb-2" />
          <h3 class="font-semibold text-lg text-gray-800">{{ product.name }}</h3>
          <p class="text-sm text-gray-500 mb-2">{{ product.description }}</p>
          <p class="font-bold text-indigo-600">R$ {{ product.value }} R$</p>
          <code>{{ product.images }}</code>
        </div>
      </div>
    </div>
  </div>

  <CreateStoreComponent />

</template>

<script setup lang="ts">

import { number } from 'motion-v';
import { useCategory } from '~/store/category';
import { useProducts } from '~/store/products';
import { useStore } from '~/store/store';
import { useUser } from '~/store/user';
const store = useStore();

definePageMeta({
  name: 'loja',
  layout: 'dashboard', // No layout for the register page
});

const categoryStore = useCategory()
const productsStore = useProducts()

const search = ref('')
const selectedCategory = ref('');


const filterProducts = computed(() => {
  return productsStore.products.filter((prod) => {
    const matchesCategory = !selectedCategory.value || prod.category_name === selectedCategory.value;
    const matchesSearch =
      !search.value ||
      prod.name.toLowerCase().includes(search.value.toLowerCase()) ||
      prod.description.toLowerCase().includes(search.value.toLowerCase());
    return matchesCategory && matchesSearch;

  })

})

onMounted(async () =>{
  productsStore.GetALLProducts()
  categoryStore.ListCategory()
})


</script>

<style scoped></style>