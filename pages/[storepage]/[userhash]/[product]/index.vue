<template>
  <div class="w-full min-h-screen bg-[var(--background)] text-[var(--foreground)]">
    <main
      class="fixed top-16 left-1/2 -translate-x-1/2 z-10 w-full max-w-screen-xl min-w-[320px] px-3 sm:px-4 lg:px-6 py-3"
    >
      <!-- Loading skeleton -->
      <div v-if="loading" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="h-[360px] bg-[var(--muted)] rounded-xl animate-pulse"></div>
        <div class="space-y-3">
          <div class="h-8 w-3/4 bg-[var(--muted)] rounded animate-pulse"></div>
          <div class="h-5 w-1/2 bg-[var(--muted)] rounded animate-pulse"></div>
          <div class="h-24 w-full bg-[var(--muted)] rounded animate-pulse"></div>
          <div class="h-10 w-40 bg-[var(--muted)] rounded animate-pulse"></div>
        </div>
      </div>

      <!-- Produto não encontrado -->
      <div
        v-else-if="!product"
        class="p-6 bg-[var(--popover)] rounded-xl shadow text-center"
      >
        <p>Produto não encontrado.</p>
      </div>

      <!-- Produto -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Galeria -->
        <section class="rounded-xl flex">
          <MotionComponent
            animation="slide-right"
            :duration="8.0"
            v-if="images.length > 1"
            class="mt-3"
          >
            <div
              class="flex flex-col gap-2 overflow-y-auto rounded-md shadow-2xl scrollbar-none"
            >
              <button
                v-for="(src, idx) in images"
                :key="idx"
                @click="setImage(idx)"
                :class="[
                  'shrink-0 w-20 h-20 rounded-md shadow-2xl overflow-hidden border-2',
                  idx === imageIndex
                    ? 'border-[var(--primary)]'
                    : 'border-[var(--border)]',
                ]"
                title="Ver imagem"
              >
                <img
                  :src="src"
                  :alt="'thumb-' + idx"
                  class="w-full h-full object-cover"
                />
              </button>
            </div>
          </MotionComponent>

          <MotionComponent
            :key="animKey"
            animation="slide-left"
            :delay="0.3"
            class="w-full aspect-[4/3] p-2 rounded-lg overflow-hidden flex items-center justify-center"
          >
            <img
              v-if="currentImage"
              :src="currentImage"
              :alt="product.name"
              class="w-full h-full rounded-2xl object-contain"
              loading="lazy"
              decoding="async"
            />
            <div v-else class="text-sm text-[var(--muted-foreground)]">Sem imagem</div>
          </MotionComponent>

          <!-- Colapso de mais imagens -->
        </section>

        <!-- Detalhes do produto -->
        <section class="bg-[var(--popover)] rounded-xl shadow p-4">
          <h1 class="text-xl md:text-2xl font-semibold leading-tight">
            {{ product.name }}
          </h1>

          <div class="mt-2 text-sm text-[var(--muted-foreground)]">
            <span v-if="product.category_name"
              >Categoria: {{ product.category_name }}</span
            >
          </div>

          <div class="mt-4">
            <p class="text-[var(--foreground)] whitespace-pre-line">
              {{ product.description || "Sem descrição." }}
            </p>
          </div>

          <div class="mt-5 flex items-baseline gap-3">
            <span class="text-2xl font-bold text-[var(--primary)]">{{
              formatBRL(product.value)
            }}</span>
            <span class="text-sm text-[var(--muted-foreground)]"
              >Estoque: {{ product.stock_quantity }}</span
            >
          </div>

          <div class="mt-6">
            <button
              class="px-5 py-2 w-full rounded-md bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--accent)] active:scale-95 transition font-semibold shadow"
              @click="onBuy"
            >
              Pedir
            </button>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "#app";
import { computed, onMounted, ref, watch } from "vue";
import MotionComponent from "~/components/MotionComponent.vue";
import { useProducts } from "~/store/products";

definePageMeta({ layout: "client" });

const productStore = useProducts();
const route = useRoute();
const imageIndex = ref(0);
const showThumbs = ref(false);
const prevImageIndex = ref(0);
const animKey = ref(0);

const sidebarOpen = ref(false);

const animName = computed(() =>
  imageIndex.value > prevImageIndex.value ? "slide-left" : "slide-right"
);
// const images = computed(() => productStore.product.images || [])
// const currentImage = computed(() => images.value[imageIndex.value] || '')

const hash = computed(() => String(route.params.hash ?? route.params.userhash ?? ""));
const productId = computed(() => Number(route.params.product ?? route.params.id));

const loading = ref(true);
const product = computed(() => productStore.productresp);

// imagens e estado do carrossel
const images = computed<string[]>(() =>
  Array.isArray(product.value?.images) ? product.value!.images : []
);

const currentImage = computed(() => images.value[imageIndex.value] || "");

// helpers galeria
const setImage = (idx: number) => {
  if (idx >= 0 && idx < images.value.length) imageIndex.value = idx;
  prevImageIndex.value = imageIndex.value;
  imageIndex.value = idx;
  animKey.value++;
};
const prevImage = () => {
  if (!images.value.length) return;
  imageIndex.value = (imageIndex.value - 1 + images.value.length) % images.value.length;
};
const nextImage = () => {
  if (!images.value.length) return;
  imageIndex.value = (imageIndex.value + 1) % images.value.length;
};

// fmt BRL
const formatBRL = (n?: number) =>
  typeof n === "number"
    ? n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
    : "—";

// ação comprar (placeholder)
const onBuy = () => {
  // ainda vai implementar pedido
  console.log("Comprar clicado para", product.value?.id);
};

// carregar produto
const fetchProduct = async () => {
  if (!hash.value || !productId.value) return;
  loading.value = true;
  await productStore.GetProductByHashId(hash.value, productId.value);
  imageIndex.value = 0;
  showThumbs.value = false;
  loading.value = false;
};

onMounted(fetchProduct);
watch(
  [
    () => route.params.hash,
    () => route.params.userhash,
    () => route.params.product,
    () => route.params.id,
  ],
  fetchProduct
);
</script>

<style scoped>
/* sumir scrollbar horizontal nas thumbs */
.scrollbar-none::-webkit-scrollbar {
  display: none;
}
.scrollbar-none {
  scrollbar-width: none;
}

/* colapso suave */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.18s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
