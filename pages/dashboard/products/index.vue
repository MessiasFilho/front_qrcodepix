<template>
    <div class="flex flex-col h-screen bg-[var(--background)] text-[var(--foreground)] p-3">
       <MotionComponent animation="fade-down" class="sticky top-0 z-10">
       
            <header class="bg-[var(--popover)]   shadow p-3 w-full rounded-sm flex flex-col items-center">
                
                <div class="flex space-x-4 mb-2 justify-between w-full  ">
                    <button @click="navigateTo('/dashboard/products/category')"
                        class="bg-[var(--secondary)] hover:bg-[var(--accent)] text-[var(--primary-foreground)] p-2 rounded w-64 flex justify-center items-center space-x-2 active:scale-90 transition-all shadow-sm">
                        <span class="whitespace-nowrap">Criar Produto</span>
                        <Plus :size="18" />
                    </button>

                    <button @click="generateQrcode()"
                        class="bg-[var(--secondary)] hover:bg-[var(--accent)] text-[var(--primary-foreground)] p-2 rounded w-64 flex justify-center items-center space-x-2 active:scale-90 transition-all shadow-sm">
                        <span>QR-code</span>
                        <QrCode />
                    </button>
                </div>
                <div class="flex w-full items-center space-x-2 justify-center">
                    <input type="text" placeholder="Buscar produtos..."
                        class="border border-[var(--border)] mb-1 rounded px-3 py-2 w-full text-[var(--foreground)] bg-[var(--background)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] transition" />

                </div>
            </header>
       
       
       </MotionComponent>

        <!-- Botões -->

        <!-- Tabela -->
        <main class="w-full h-full flex flex-col rounded-md mt-2 ">
            <MotionComponent animation="fade-up">
            
            <Table class="flex-1 overflow-auto bg-[var(--popover)] text-[var(--card-foreground)] p-1 mt-1 rounded-md">
                <TableHeader class="rounded-md p-2">
                    <TableRow>
                        <TableHead class="w-[20px] text-[var(--foreground)]">ID</TableHead>
                        <TableHead class="text-[var(--foreground)]">NOME</TableHead>
                        <TableHead class="text-[var(--foreground)]">VALOR</TableHead>
                        <TableHead class="text-[var(--foreground)]">ESTOQUE</TableHead>
                        <TableHead class="uppercase text-[var(--foreground)]">Selecionar</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>

                    <TableRow v-for="(item, i) in productStore.products" :key="i"
                        :class="i % 2 === 0 ? 'bg-[var(--popover)]' : 'bg-[var(--muted)] hover:bg-[var(--muted)]'"
                        class="transition-colors">
                       
                            <TableCell><span>{{ i + 1 }}</span></TableCell>
                       
                        <TableCell><span>{{ item.name }}</span></TableCell>
                        <TableCell><span>{{ item.value }}</span></TableCell>
                        <TableCell><span>{{ item.stock_quantity }}</span></TableCell>
                        <TableCell class="sm:w-30">
                            <IncrementNumberComponent :item="item" @update_stock="updateItemQuantity" />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            </MotionComponent>
        </main>

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

definePageMeta({
    layout: 'dashboard',
    name: 'products',
})

const productStore = useProducts()
const userStore = useUser()
const commonStore = useCommon()
const pixStore = usePix()
const orderStore = useOrder()


const selectedQuantities = ref<Record<number, number>>({})

const order = ref<orderRequest>()

const updateItemQuantity = (id: number, value: number) => {
    selectedQuantities.value[id] = value
}


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

onMounted(async () => {
    await productStore.GetALLProducts()
    await userStore.getUser()
});


</script>

<style scoped></style>