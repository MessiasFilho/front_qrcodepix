<template>
    <div class=" min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)] p-2 space-y-4">
        <MotionComponent animation="fade-down">

            <header class="bg-[var(--popover)] shadow-md rounded-sm sticky top-0 z-10">
                <!-- Linha de topo com título e botões -->
                <div class="w-full flex items-center justify-between px-4 py-3 gap-4 flex-wrap">

                    <!-- Botão voltar -->
                    <button @click="navigateTo('../products/category')"
                        class="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--muted)] hover:bg-[var(--accent)] text-[var(--foreground)] transition-all active:scale-95">
                        <ArrowBigLeft :size="22" />
                    </button>

                    <!-- Título -->
                    <div class="flex-1 min-w-[180px]">
                        <h1 class="text-base font-semibold uppercase text-gray-800 whitespace-nowrap">
                            Cadastro de Produto
                        </h1>
                        <h2>
                            <span class="text-sm font-medium text-gray-600">
                                Categoria: {{ useCommon().nameCategory }}
                            </span>
                        </h2>
                    </div>

                    <!-- Botão criar produto -->
                    <button @click="navigateTo('create_product')"
                        class="shadow-xl bg-[var(--secondary)] rounded-md whitespace-nowrap px-4 py-2 font-semibold text-white active:scale-95 transition-all">
                        Produto +
                    </button>
                </div>

                <!-- Campo de filtro -->
                <div class="w-full px-4 pb-3">
                    <input type="text" placeholder="Filtrar produtos..."
                        class="w-full px-3 py-2 rounded-md bg-[var(--background)] border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] transition" />
                </div>
            </header>

        </MotionComponent>


        <div>
            <MotionComponent animation="fade-up">
                <Table class="flex-1 min-w-full overflow-auto bg-white mt-1 rounded-md">
                    <TableHeader class="rounded-md p-2">
                        <TableRow>
                            <TableHead class="min-w-[60px] text-center">ID</TableHead>
                            <TableHead class="min-w-[160px] text-center">NOME</TableHead>
                            <TableHead class="min-w-[100px] text-center">VALOR</TableHead>
                            <TableHead class="min-w-[100px] text-center">ESTOQUE</TableHead>
                            <TableHead class="min-w-[80px] text-center">EDITAR</TableHead>
                            <TableHead class="min-w-[80px] text-center">APAGAR</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        <TableRow v-for="(item, i) in prodStore.proCateg" :key="i"
                            :class="i % 2 == 0 ? 'bg-[var(--popover)]': 'bg-[var(--muted)] hover:bg-[var(--muted)]'" 
                            >
                            <TableCell class="text-center">{{ i + 1 }}</TableCell>
                            <TableCell class="text-center">{{ item.name }}</TableCell>
                            <TableCell class="text-center">{{ item.value }}</TableCell>
                            <TableCell class="text-center">{{ item.stock_quantity }}</TableCell>
                            <TableCell class="text-center">
                                <button @click="navigatePage(item.id)" class="active:scale-95 transition-all">
                                    <SquarePen class="text-blue-400" />
                                </button>
                            </TableCell>
                            <TableCell class="text-center">
                                <button class="active:scale-95 transition-all">
                                    <Trash class="text-red-400" />
                                </button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

            </MotionComponent>
        </div>

    </div>

</template>

<script setup lang="ts">
import { useCommon } from '~/store/common'
import { useProducts } from '~/store/products'
import { SquarePen, Trash, ArrowBigLeft } from 'lucide-vue-next';


definePageMeta({
    name: 'create',
    layout: 'dashboard'
})

const prodStore = useProducts()
const commonStore = useCommon()


const navigatePage = (id: number) => {
    commonStore.paramId = id
    navigateTo('Edit_product')
}

onMounted(async () => {
    if (commonStore.CategoryId == 0) {
        navigateTo('/dashboard/products/category')
    }

    const prod = await prodStore.GetProductsbyCatagory(commonStore.CategoryId)


})

</script>

<style lang="scss" scoped></style>