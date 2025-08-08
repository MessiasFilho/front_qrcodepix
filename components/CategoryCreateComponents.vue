<template>
  <div class="w-full h-full flex flex-col">
    <Dialog :open="useCommon().categoryCreate">
      <DialogContent
        class="bg-[var(--muted)] text-[var(--card-foreground)] rounded-2xl shadow-xl    transition-all"
      >
        <DialogHeader class="">
          <DialogTitle class="text-xl font-semibold tracking-wide">
            Criar Categoria
          </DialogTitle>
        </DialogHeader>

        <div class="flex flex-col space-y-2">
          <label
            for="name"
            class="text-sm font-medium text-[var(--muted-foreground)]"
          >
            Nome da Categoria
          </label>
          <input
            v-model="nameCategory.name"
            id="name"
            placeholder="Ex: Produtos Digitais"
            class="bg-[var(--input)] text-[var(--foreground)] placeholder-[var(--muted-foreground)] border border-[var(--border)] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--ring)] transition-all"
            type="text"
          />
        </div>

        <DialogFooter class="mt-1">
          <div class="flex w-full space-x-4">
            <button
              @click="useCommon().categoryCreate = false"
              class="w-full bg-[var(--destructive)] hover:bg-red-600 text-[var(--destructive-foreground)] py-2 rounded-md font-semibold active:scale-95 transition-all"
            >
              Cancelar
            </button>

            <button
              @click="createCategory()"
              class="w-full bg-[var(--primary)] hover:bg-[var(--accent)] text-[var(--primary-foreground)] py-2 rounded-md font-semibold active:scale-95 transition-all"
            >
              Criar
            </button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>


<script setup lang="ts">
import { useCategory, type Category } from '~/store/category'
import { useCommon } from '~/store/common'

const categoryStore = useCategory()

const nameCategory = ref<Category>({
  name: ''
})

const createCategory = async () => {
  await categoryStore.CreateCategory(nameCategory.value)
  nameCategory.value.name = ''
  await categoryStore.ListCategory()
  useCommon().categoryCreate = false
}
</script>
