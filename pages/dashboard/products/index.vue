<template>
    <div class="flex flex-col h-screen bg-[var(--background)] text-[var(--foreground)] p-3">
        <MotionComponent animation="fade-down" class="sticky top-0 z-9">

            <header class="bg-[var(--popover)] shadow p-3 w-full rounded-sm flex flex-col space-y-3">

                <div class="flex   gap-2 justify-between w-full">
                    <button @click="navigateTo('/dashboard/products/category')"
                        class="bg-[var(--secondary)] hover:bg-[var(--accent)] text-[var(--primary-foreground)] px-3 py-2 rounded flex justify-center items-center gap-2 active:scale-90 transition-all shadow-sm w-full sm:w-1/2 lg:w-64">
                        <span class="whitespace-nowrap">Criar Produto</span>
                        <Plus :size="18" />
                    </button>

                    <button @click="generateQrcode()"
                        class="bg-[var(--secondary)] hover:bg-[var(--accent)] text-[var(--primary-foreground)] px-3 py-2 rounded flex justify-center items-center gap-2 active:scale-90 transition-all shadow-sm w-full sm:w-1/2 lg:w-64">
                        <span>QR-code</span>
                        <QrCode />
                    </button>
                </div>

                <div class="w-full">
                    <input v-model="search" type="text" placeholder="Buscar produtos..."
                        class="border border-[var(--border)] rounded px-3 py-2 w-full text-[var(--foreground)] bg-[var(--background)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] transition" />
                </div>


                <div class="flex items-center gap-2">
                    <button @click="selectCategory = ''" :class="[
                        'px-3 py-1 rounded transition-all shrink-0',
                        selectCategory === ''
                            ? 'bg-[var(--secondary)] text-white'
                            : 'bg-gray-200 hover:bg-[var(--accent)] hover:text-white'
                    ]">
                        Todos
                    </button>


                    <button @click="scrollCats(-1)"
                        class="hidden sm:inline-flex p-2 rounded bg-gray-200 hover:bg-gray-300 shrink-0">
                        ‹
                    </button>


                    <div ref="catsTrack"
                        class="flex-1 overflow-x-auto whitespace-nowrap scrollbar-none scroll-smooth snap-x snap-mandatory relative">


                        <div
                            class="pointer-events-none absolute right-0 top-0 h-full w-6 bg-gradient-to-l from-[var(--popover)] to-transparent">
                        </div>

                        <div class="inline-flex gap-2 pr-6">
                            <button v-for="(cat, i) in categoryStore.categoryes" :key="i"
                                @click="selectCategory = cat.name" :class="[
                                    'px-3 py-1 rounded cursor-pointer transition-all whitespace-nowrap snap-start shrink-0',
                                    selectCategory === cat.name
                                        ? 'bg-[var(--secondary)] text-white'
                                        : 'bg-gray-200 text-[var(--primary)] hover:bg-[var(--accent)] hover:text-white'
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
            </header>

        </MotionComponent>

        <MotionComponent animation="fade-up">
            <main class="w-full h-full flex flex-col rounded-md mt-2">
                <div class="w-full h-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
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



                        <p v-if="item.description" class="text-sm text-gray-500 mt- line-clamp-2">
                            {{ item.description  }}
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
                        <div class="mt-3 ">
                            <IncrementNumberComponent v-model="selectedQuantities[item.id]"
                                :max="item.stock_quantity" />
                        </div>
                    </div>
                </div>
            </main>
        </MotionComponent>

        <Qrcodecomponet :total="calcularTotal()" :onConfirm="createOrderdialog" />
    </div>
</template>

<script setup lang="ts">
import { Search, Plus } from 'lucide-vue-next';
import { useProducts } from '~/store/products';
import { QrCode } from 'lucide-vue-next';
import { useUser } from '~/store/user';
import { useCommon } from '~/store/common';
import { usePix } from '~/store/pix';
import { useOrder, type orderRequest, type resposeOrder } from '~/store/order';
import { useCategory } from '~/store/category';

definePageMeta({
    layout: 'dashboard',
    name: 'products',
})
const categoryStore = useCategory()
const productStore = useProducts()
const userStore = useUser()
const commonStore = useCommon()
const pixStore = usePix()
const orderStore = useOrder()
const selectCategory = ref('')
const search = ref('')
const selectedQuantities = ref<Record<number, number>>({})
const order = ref<orderRequest>()


const calcularTotal = () => {
    return Object.entries(selectedQuantities.value).reduce((sum, [id, qty]) => {
        const item = productStore.products.find(p => p.id === Number(id))
        if (item) {
            return sum + item.value * Number(qty)
        }
        return sum
    }, 0)
}

const generateQrcode = async () => {
    const total = calcularTotal()
    if (total == 0) return


    commonStore.pixDialog = true
    await pixStore.GenerateQRcode(userStore.user.hash, total)
}

const createOrderdialog = async () => {

    const total = calcularTotal()
    order.value = {
        value: total,
        products: Object.entries(selectedQuantities.value).map(([id, qtd]) => ({
            id: Number(id),
            qtd: Number(qtd),
        })),
    };
    await orderStore.CreateOrder(order.value, userStore.user.hash)
    await orderStore.OrderPaymentQrcode(orderStore.resp.id)
    await userStore.getUser()
    await productStore.GetALLProducts()
    selectedQuantities.value = {}

}

const filterProducts = computed(() => {
    return productStore.products.filter((prod) => {
        const matchesCategory = !selectCategory.value || prod.category_name === selectCategory.value;
        const mathSearch = !search.value || prod.name.toLocaleLowerCase().includes(search.value.toLocaleLowerCase()) ||
            prod.description.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())
        return matchesCategory && mathSearch
    })
})

const catsTrack = ref<HTMLDivElement | null>(null)

const scrollCats = (dir: -1 | 1) => {
    const el = catsTrack.value
    if (!el) return
    const step = el.clientWidth * 0.8 // rola ~80% da largura visível
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
}


onMounted(async () => {
    await productStore.GetALLProducts()
    await userStore.getUser()
    await categoryStore.ListCategory()
});



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