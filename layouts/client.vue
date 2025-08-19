<template>
  <div class="w-full h-screen flex flex-col bg-[var(--background)]">
    <!-- Header (container centralizado) -->
    <header class="">
      <div
        class="mx-auto w-full max-w-screen-xl min-w-[320px]
               bg-[var(--primary)] text-[var(--primary-foreground)]
               rounded-b-md shadow px-3 sm:px-4 lg:px-6 py-3
               flex items-center justify-between"
      >
        <h1 class="text-base sm:text-lg font-semibold"></h1>

        <div class="relative">
          <button
            @click="onCart"
            class="p-2 rounded-full bg-[var(--background)] text-[var(--primary)]
                   shadow active:scale-95 transition"
          >
            <ShoppingCart class="w-5 h-5" />
          </button>
          <!-- badge do carrinho -->
          <span
            v-if="cartCount > 0"
            class="absolute -top-1 -right-1 bg-red-500 text-white text-xs
                   font-bold rounded-full w-5 h-5 flex items-center justify-center"
          >
            {{ cartCount }}
          </span>
        </div>
      </div>
    </header>

    <!-- Conteúdo (alinhado ao mesmo container do header) -->
    <div class="flex flex-1 overflow-hidden">
      <main class="flex-1 overflow-auto">
        <div class="mx-auto w-full max-w-screen-xl min-w-[320px] px-3 sm:px-4 lg:px-6">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ShoppingCart } from 'lucide-vue-next'

const cartCount = ref(3) // troque pelo valor real do seu store
const onCart = () => { /* abrir carrinho */ }
</script>
