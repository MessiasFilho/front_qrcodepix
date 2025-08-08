<template>
  <div class="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)] p-1 space-y-4 ">
    <MotionComponent animation="fade-down">
    
        <header class="bg-[var(--popover)] shadow-md rounded-sm p-2  flex flex-col items-center justify-between sticky top-0 z-10">
          <!-- Voltar -->
          <div class="flex w-full justify-between items-center mb-2">
          
            <button
              @click="navigateTo('../products')"
              class="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--muted)] hover:bg-[var(--accent)] text-[var(--foreground)] transition-all active:scale-95"
            >
              <ArrowBigLeft :size="22" />
            </button>

            <!-- Criar categoria -->
            <button
              @click="commuStore.categoryCreate = true"
              class="flex items-center gap-2 px-4 py-2 rounded bg-[var(--secondary)] hover:bg-[var(--accent)] text-[var(--primary-foreground)] uppercase text-sm transition-all active:scale-95 shadow-sm"
            >
              <span>Nova Categoria</span>
              <Plus :size="18" />
            </button>
            
          </div>

        <div class="w-full">
          <input
            v-model="filtro"
            type="text"
            placeholder="Filtrar categorias..."
            class="w-full px-3 py-2 rounded-md bg-[var(--background)] border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] transition"
          />
        </div>
        </header>
    
    </MotionComponent>

    <!-- Input de filtro -->

    <!-- Tabela -->
    <main class="flex-1">
      <div class="w-full h-full flex flex-col">
        <MotionComponent animation="fade-up">
        
          <Table class="flex-1 overflow-auto bg-[var(--popover)] rounded-md p-2 shadow-sm">
            <TableHeader class="rounded-md p-2">
              <TableRow>
                <TableHead class="w-[10px] text-[var(--muted-foreground)]">ID</TableHead>
                <TableHead class="text-[var(--muted-foreground)] w-full">Nome</TableHead>
                <TableHead class="text-right text-[var(--muted-foreground)]  flex justify-center items-center uppercase">produto</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow
                v-for="(item, i) in categoriasFiltradas"
                :key="i"
                :class="i % 2 == 0 ? 'bg-[var(--popover)]': 'bg-[var(--muted)] hover:bg-[var(--muted)]'"
              >
                <TableCell class="font-medium">{{ i + 1 }}</TableCell>
                <TableCell class="font-medium">{{ item.name }}</TableCell>
                <TableCell class="flex justify-end">
                  <button
                    @click="navigatePage(item.id, item.name)"
                    class="px-2 py-1 rounded bg-[var(--secondary)] text-[var(--primary-foreground)] hover:bg-[var(--accent)] text-sm transition active:scale-95"
                  >
                    ADICONAR PRODUTO
                  </button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </MotionComponent>
      </div>
    </main>

    <!-- Modal -->
    <CategoryCreateComponents />
  </div>
</template>

<script setup lang="ts">
import { Plus } from 'lucide-vue-next';
import { ArrowBigLeft } from 'lucide-vue-next';
import { useCategory } from '~/store/category';
import { useCommon } from '~/store/common';
definePageMeta({
  layout: 'dashboard',
  name: 'category',
})

const commuStore = useCommon()
const categoryStore = useCategory()


const filtro = ref('');

const categoriasFiltradas = computed(() => {
  return categoryStore.categoryes.filter(categoria =>
    categoria.name.toLowerCase().includes(filtro.value.toLowerCase())
  );
});

const navigatePage = (id: number, name: string) => {
  commuStore.CategoryId = id
  commuStore.nameCategory = name
  navigateTo('/dashboard/products/create')

}

onMounted(async () => {
  await categoryStore.ListCategory()
})

</script>

<style scoped></style>