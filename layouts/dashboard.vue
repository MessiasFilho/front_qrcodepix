<template>
  <div class="w-full h-screen flex flex-col">
    <!-- Header -->
    <header class="w-full bg-[var(--primary)] rounded-b-md   text-white p-4 flex justify-between items-center z-20">
      <div class="md:hidden">
        <button @click="toggleSidebar" class="text-white focus:outline-none">
          <Logs />
        </button>
      </div>
      <div class="space-x-2 flex">
        <div v-if="verifuserStore()">
          <button @click="useCommon().storeDialog = true"
            class="border active:scale-95 transition-all border-gray-300 bg-gray-700 text-white px-4 rounded hover:bg-gray-600">
            Criar Loja
          </button>
        </div>
        <button
          @click="useCommon().pymentPix = true"
          class="border active:scale-95 text-[var(--primary)] transition-all  rounded shadow-md font-semibold  bg-[var(--background)]">
          <QrCode />
        </button>
      </div>
    </header>
    <div class="flex flex-1 overflow-hidden ">

      <nav :class="[
        'bg-[var(--sidebar)] mt-1 rounded-md ml-1 border border-[var(--sidebar-border)] w-64 p-4 space-y-2',
        'transition-transform duration-500',
        sidebarOpen ? 'translate-x-0 md:translate-x-0' : '-translate-x-full md:translate-x-0',
        'fixed md:static h-full z-20'
      ]">
        <ul class="overflow-auto space-y-2 px-2">
          <MotionComponent v-for="(item, index) in listMenuItems" :key="`${animationKey}-${index}`"
            animation="slide-right" :delay="index * 0.1">
            <li>
              <div :aria-current="isReactive(item.path) ? 'page' : undefined" @click="navigateTo(item.path), sidebarOpen = false" class="flex items-center justify-between gap-2 p-2 rounded-md w-full
              border border-[var(--sidebar-border)]
              text-[var(--sidebar-foreground)]
              transition-all duration-150 transform hover:scale-105 active:scale-95
              hover:bg-[var(--sidebar-accent)/10] hover:text-[var(--sidebar-accent-foreground)]
              focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sidebar-ring)]
              aria-[current=page]:bg-[var(--sidebar-accent)/20] aria-[current=page]:text-[var(--sidebar-accent-foreground)]
  ">
                <span class="text-sm font-semibold uppercase tracking-wide">{{ item.label }}</span>
                <component :is="item.icon" class="w-5 h-5 text-[var(--sidebar-accent)]" />
              </div>
            </li>
          </MotionComponent>
        </ul>
      </nav>

      <!-- Overlay (mobile) -->
      <div v-if="sidebarOpen" @click="toggleSidebar" class="fixed inset-0 bg-black opacity-50 z-10 md:hidden "></div>

      <!-- Main Content -->
      <main class="flex-1 overflow-auto  bg-[var(--backgroud)]">
        <slot />
      </main>
    </div>
  </div>
  <PaimentPixComponent/>
</template>

<script setup lang="ts">
import { PackageSearch, KeyRound, Bolt, ListOrdered, LayoutDashboard, Store, Logs, QrCode } from 'lucide-vue-next';
import { useCommon } from '~/store/common';

import { useStore } from '~/store/store';
const sidebarOpen = ref(false);
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};
const verifuserStore = (): boolean => {
  const status = useStore().store.status;
  if (status === undefined) return false;
  return !status;
};


const listMenuItems = [
  { label: 'Loja', path: '/dashboard/loja', icon: Store },
  { label: 'Produtos', path: '/dashboard/products', icon: PackageSearch },
  { label: 'Pedidos', path: '/dashboard/products', icon: ListOrdered },
  { label: 'Chave Pix', path: '/dashboard/pix', icon: KeyRound },
  { label: 'Dashboard', path: '/dashboard/', icon: LayoutDashboard },
  { label: 'configuração', path: '/dashboard/products', icon: Bolt },

]

const animationKey = ref(0);

watch(sidebarOpen, (val) => {
  if (val) {
    animationKey.value++; // força o Motioncomponent a recriar e reanimar
  }
});


</script>

<style scoped></style>