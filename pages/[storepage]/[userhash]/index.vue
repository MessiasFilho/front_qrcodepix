<template>
    <div class="w-full min-h-screen flex flex-col ">
        <header class="w-full  mb-1  h-48">
            <div
                class="w-full h-full flex items-center justify-center bg-gradient-to-r  text-white text-3xl font-bold from-purple-600 to-indigo-600">
                <span>asdasd</span>
            </div>
        </header>

        <div class="bg-gray-100 rounded-md p-2">
            <div class="flex  items-center  bg-white rounded-t-md p-2 h-full shadow-2xl ">
                <input v-model="search" class="w-full outline-none border p-1 rounded-md" type="text"
                    placeholder="buscar produtos">
            </div>
            <div class="flex items-center gap-2 bg-white shadow-2xl rounded-b-md p-2">
                <button @click="selectCategory = ''" :class="[
                    'px-3 py-1 rounded transition-all shrink-0',
                    selectCategory === ''
                        ? 'bg-[var(--secondary)] text-white font-semibold'
                        : 'bg-gray-200 hover:bg-[var(--accent)] text-[var(--primary)] font-semibold hover:text-white'
                ]">
                    Todos
                </button>
                <button @click="scrollCats(-1)"
                    class="hidden sm:inline-flex p-2 rounded bg-gray-200 hover:bg-gray-300 shrink-0">
                    ‹
                </button>
                <div ref="catsTrack"
                    class="flex-1 overflow-x-auto whitespace-nowrap scrollbar-none scroll-smooth snap-x snap-mandatory relative">
                    <div class="inline-flex gap-2 pr-6 bg-white ">
                        <button v-for="(cat, i) in categoryStore.categoryes" :key="i" @click="selectCategory = cat.name"
                            :class="[
                                'px-3 py-1  rounded cursor-pointer transition-all whitespace-nowrap snap-start shrink-0',
                                selectCategory === cat.name
                                    ? 'bg-[var(--secondary)] font-semibold shadow-xl text-white'
                                    : 'bg-gray-200 text-[var(--primary)] shadow-xl font-semibold hover:bg-[var(--accent)] hover:text-white'
                            ]">
                            {{ cat.name }}
                        </button>
                    </div>
                </div>
                <button @click="scrollCats(1)"
                    class="hidden sm:inline-flex p-2 rounded bg-gray-200 hover:bg-gray-300 shrink-0">
                    ›
                </button>
            </div>

        </div>

        <div class="p-2">
        
            <MotionComponent animation="fade-up">
                <main class="w-full h-full flex flex-col rounded-md mt-2">
                    <div class="w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
                        <div v-for="item in filterProducts" :key="item.id"
                            class="p-2 border rounded-lg shadow-sm bg-white flex flex-col">

                            <h3 class="font-semibold text-gray-800 leading-tight line-clamp-2">
                                {{ item.name }}
                            </h3>
                            <div class="w-full aspect-[4/3] mb-3 overflow-hidden rounded-md bg-gray-100">
                                <img v-if="item.images && item.images.length" :src="item.images[0]" :alt="item.name"
                                    :title="item.name" loading="lazy" decoding="async" class="w-full h-full object-cover" />
                                <div v-else class="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                                    Sem imagem
                                </div>
                            </div>



                            <p class="text-sm text-gray-500 mt- line-clamp-2">
                                {{ item.description || 'Sem descrição' }}
                            </p>

                            <div class="mt-2 flex items-center justify-between">
                                <span class="text-indigo-600 font-bold">
                                    R$ {{ item.value }}
                                </span>
                                <span class="text-xs text-gray-500">
                                    Estoque: {{ item.stock_quantity }}
                                </span>
                            </div>

                            <!-- Ação -->
                            <div class="mt-3">
                              <button class="w-full flex uppercase roundde-md bg-[var(--primary)] text-white font-semibold active:scale-95 transition-all rounded p-1 shadow-2xl">
                                 <ShoppingBasket :size="24" />
                                <span>
                                    comprar
                                </span> 
                                
                              </button>
                            </div>
                        </div>
                    </div>
                </main>
            </MotionComponent>
        
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
import { ShoppingBasket } from 'lucide-vue-next';
const store = useStore();

definePageMeta({
    name: 'loja',
    layout: 'client', // No layout for the register page
});

const categoryStore = useCategory()
const productsStore = useProducts()

const selectCategory = ref('')
const search = ref('')
const catsTrack = ref<HTMLDivElement | null>(null)

const filterProducts = computed(() => {
    return productsStore.products.filter((prod) => {
        const matchesCategory = !selectCategory.value || prod.category_name === selectCategory.value;
        const matchesSearch =
            !search.value ||
            prod.name.toLowerCase().includes(search.value.toLowerCase()) ||
            prod.description.toLowerCase().includes(search.value.toLowerCase());
        return matchesCategory && matchesSearch;

    })

})

const scrollCats = (dir: -1 | 1) => {
    const el = catsTrack.value
    if (!el) return
    const step = el.clientWidth * 0.8 // rola ~80% da largura visível
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
}

onMounted(async () => {
    productsStore.GetALLProducts()
    categoryStore.ListCategory()
})


</script>

<style scoped>
.scrollbar-none::-webkit-scrollbar {
    display: none;
}

/* Firefox */
.scrollbar-none {
    scrollbar-width: none;
}
</style>