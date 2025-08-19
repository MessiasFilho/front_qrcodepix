<template>
  <div class="p-6 space-y-8 w-full h-full flex flex-col bg-gray-50">
    <h1 class="text-3xl font-extrabold text-gray-900 mb-4 whitespace-nowrap">Dashboard </h1>
    <div class=" flex flex-col  space-y-2">
      <MotionComponent animation="fade-down" :delay="0.5">
        <div
          class="bg-white border  border-gray-200 rounded-lg shadow-md flex flex-col items-center justify-center w-full">
          <div class="flex items-center border-b justify-center w-full p-2">
            <span class="text-sm font-semibold text-green-700 tracking-wider uppercase">Venda</span>
          </div>
          <div class="text-center text-3xl p-2 font-bold text-gray-800 break-words max-w-full">
            <MotionComponent class="inline-block text-[clamp(1.5rem,3vw,2.5rem)]" animation="scale"
              :countTo="orderStore.dashbord.total_seller" :duration="1500" format="money" />
          </div>
        </div>
      </MotionComponent>
      <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6  ">
        <MotionComponent animation="slide-right" :delay="1">
          <div
            class="bg-white border border-gray-200 rounded-lg shadow-xl flex flex-col items-center justify-center w-full ">
            <div class="flex items-center border-b justify-start w-full p-2">
              <span class="text-sm font-semibold text-blue-500 tracking-wider uppercase">Pagos</span>
            </div>
            <div class="flex items-center w-full p-4 gap-4">
              <BanknoteArrowUp class="text-blue-500" :size="40" />
              <span class="font-bold text-gray-800 text-[clamp(1.5rem,3vw,2.5rem)] break-words">
                <MotionComponent animation="scale" :countTo="orderStore.dashbord.paid" :duration="2000" />
              </span>
            </div>
          </div>
        </MotionComponent>
        <MotionComponent animation="slide-left" :delay="1">
          <div
            class="bg-white border border-gray-200 rounded-lg shadow-xl flex flex-col items-center justify-center w-full ">
            <div class="flex items-center border-b justify-start w-full p-2">
              <span class="text-sm font-semibold tracking-wider uppercase text-amber-500">Estoque</span>
            </div>
            <div class="flex items-center w-full p-4 gap-4">
              <Package class="text-amber-500" :size="40" />
              <span class="font-bold text-gray-800 text-[clamp(1.5rem,3vw,2.5rem)] break-words">
                <MotionComponent animation="scale" :countTo="orderStore.dashbord.stock_total" :duration="2000" />
              </span>
            </div>
          </div>
        </MotionComponent>
        <MotionComponent animation="slide-right" :delay="1.3">
          <div
            class="bg-white border border-gray-200 rounded-lg shadow-xl flex flex-col items-center justify-center w-full ">
            <div class="flex items-center border-b justify-start w-full p-2">
              <span class="text-sm font-semibold tracking-wider uppercase text-red-500">Cancelados</span>
            </div>
            <div class="flex items-center w-full p-4 gap-4">
              <BanknoteX class="text-red-500" :size="40" />
              <span class="font-bold text-gray-800 text-[clamp(1.5rem,3vw,2.5rem)] break-words">
                <MotionComponent animation="scale" :countTo="orderStore.dashbord.cancelled" :duration="2000" />
              </span>
            </div>
          </div>
        </MotionComponent>
        <MotionComponent animation="slide-left" :delay="1.3">
          <div
            class="bg-white border border-gray-200 rounded-lg shadow-xl flex flex-col items-center justify-center w-full ">
            <div class="flex items-center border-b justify-start w-full p-2">
              <span class="text-sm font-semibold tracking-wider uppercase text-yellow-400">Pedidos</span>
            </div>
            <div class="flex items-center w-full p-4 gap-4">
              <ArrowDownUp class="text-yellow-400" :size="40" />
              <span class="font-bold text-gray-800 text-[clamp(1.5rem,3vw,2.5rem)] break-words">
                <MotionComponent animation="scale" :countTo="orderStore.dashbord.pending" :duration="2000" />
              </span>
            </div>
          </div>
        </MotionComponent>
      </div>

    </div>
    <PaimentPixComponent />
  </div>
</template>


<script setup lang="ts">
import { Package, BanknoteArrowUp, BanknoteX, ArrowDownUp } from 'lucide-vue-next';
import { useOrder } from '~/store/order';
import { useProducts } from '~/store/products';



definePageMeta({
  name: 'dashboard',
  layout: 'dashboard'
})

const productStore = useProducts()
const orderStore = useOrder()


onMounted(async () => {
  await productStore.GetALLProducts()
  await orderStore.GetDashboard()
})

</script>

<style scoped>

</style>
