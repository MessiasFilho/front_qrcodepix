<template>
  <div class="flex p-2 flex-col w-full h-full bg-[var(--background)]">
    <header class="p-4 bg-[var(--popover)] rounded-xl flex items-center space-x-3 shadow mb-4">
      <button
        type="button"
        @click="navigateTo('/dashboard/products/create')"
        class="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--muted)] hover:bg-[var(--accent)] text-[var(--primary)] transition-all active:scale-95">
        <ArrowBigLeft :size="22" />
      </button>
      <h1 class="text-lg font-semibold uppercase text-[var(--primary)]">Criar Produto</h1>
    </header>

    <form @submit.prevent="CreateProduct" class="bg-[var(--popover)] text-[var(--card-foreground)] w-full p-6 rounded-2xl shadow-xl space-y-4 transition-all">
      <!-- Nome -->
      <div class="flex flex-col space-y-1">
        <label for="name" class="text-sm font-medium text-[var(--muted-foreground)]">Nome</label>
        <input
          id="name"
          v-model.trim="form.name"
          required
          class="bg-[var(--muted)] text-[var(--foreground)] border border-[var(--border)] placeholder-[var(--muted-foreground)] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--ring)] transition-all"
          type="text"
          placeholder="Digite o nome do produto" />
      </div>

      <!-- Descrição -->
      <div class="flex flex-col space-y-1">
        <label for="description" class="text-sm font-medium text-[var(--muted-foreground)]">Descrição</label>
        <input
          id="description"
          v-model.trim="form.description"
          class="bg-[var(--muted)] text-[var(--foreground)] border border-[var(--border)] placeholder-[var(--muted-foreground)] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--ring)] transition-all"
          type="text"
          placeholder="Descrição do produto" />
      </div>

      <!-- Valor -->
      <div class="flex flex-col space-y-1">
        <label for="value" class="text-sm font-medium text-[var(--muted-foreground)]">Valor</label>
        <input
          id="value"
          v-model.number="form.value"
          required
          min="0"
          step="0.01"
          class="bg-[var(--muted)] text-[var(--foreground)] border border-[var(--border)] placeholder-[var(--muted-foreground)] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--ring)] transition-all"
          type="number"
          placeholder="Ex: 29.99" />
      </div>

      <!-- Quantidade em Estoque -->
      <div class="flex flex-col space-y-1">
        <label for="stock_quantity" class="text-sm font-medium text-[var(--muted-foreground)]">Quantidade em estoque</label>
        <input
          id="stock_quantity"
          v-model.number="form.stock_quantity"
          required
          min="0"
          class="bg-[var(--muted)] text-[var(--foreground)] border border-[var(--border)] placeholder-[var(--muted-foreground)] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--ring)] transition-all"
          type="number"
          placeholder="Ex: 10" />
      </div>

      <!-- Imagens (múltiplas) -->
      <div class="flex flex-col space-y-2">
        <label class="text-sm font-medium text-[var(--muted-foreground)]">Imagens (PNG/JPG)</label>
        <input
          type="file"
          accept="image/*"
          multiple
          @change="onFiles"
          class="bg-[var(--muted)] text-[var(--foreground)] border border-[var(--border)] rounded-md px-4 py-2" />

        <!-- Pré-visualização -->
        <div v-if="filesPreview.length" class="flex flex-wrap gap-2">
          <div v-for="(src, i) in filesPreview" :key="i" class="w-20 h-20 rounded overflow-hidden bg-[var(--muted)]">
            <img :src="src" class="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      <!-- Botões -->
      <div class="flex justify-end gap-2 pt-2">
        <button type="button" @click="resetForm"
          class="px-4 py-2 rounded-md border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--muted)] active:scale-95 transition-all">
          Limpar
        </button>

        <button type="submit" :disabled="isSaving"
          class="bg-[var(--primary)] hover:bg-[var(--accent)] text-[var(--primary-foreground)] px-4 py-2 rounded-md font-semibold active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed">
          {{ isSaving ? 'Salvando...' : 'Criar' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ArrowBigLeft } from 'lucide-vue-next'
import { useProducts } from '~/store/products'
import { useCommon } from '~/store/common'

definePageMeta({ name: 'create_product', layout: 'dashboard' })

const productStore = useProducts()
const commumstore = useCommon()

// formulário local (sem 'imagens' string — agora usamos files[])
const form = reactive({
  name: '',
  description: '',
  value: 0,
  stock_quantity: 0,
})

const files = ref<File[]>([])
const filesPreview = computed(() => files.value.map(f => URL.createObjectURL(f)))
const isSaving = ref(false)

function onFiles(e: Event) {
  const input = e.target as HTMLInputElement
  if (!input.files?.length) {
    files.value = []
    return
  }
  files.value = Array.from(input.files)
}

function resetForm() {
  form.name = ''
  form.description = ''
  form.value = 0
  form.stock_quantity = 0
  files.value = []
}

async function CreateProduct() {
  if (!commumstore.CategoryId) {
    return alert('Selecione uma categoria antes de criar o produto.')
  }
  if (!form.name.trim()) {
    return alert('Informe o nome do produto.')
  }

  try {
    isSaving.value = true
    await productStore.CreateProduct(commumstore.CategoryId, {
      name: form.name.trim(),
      description: form.description.trim(),
      value: Number(form.value),
      stock_quantity: Number(form.stock_quantity),
      files: files.value,
    })

    // sucesso: limpar e (opcional) navegar
    resetForm()
    navigateTo('/dashboard/products')
  } catch (e) {
    console.error('Erro ao criar produto:', e)
    alert('Erro ao criar produto.')
  } finally {
    isSaving.value = false
  }
}
</script>

<style scoped></style>
