<template>
  <div class="p-4 space-y-6 w-full h-full flex flex-col">
    <h1 class="text-2xl font-bold text-gray-800">Dashboard de Vendas</h1>

    <!-- Cards com indicadores principais -->
    <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <MotionComponent animation="slide-right">
        <div class=" bg-[var(--muted)] border p-1 rounded-md shadow-md">
           <div class=" flex p-1 justify-center items-center">
          
            <span class="whitespace-nowrap text-green-600 uppercase">total de venda</span>
           </div>
           <span class="text-4xl text-center">
             <MotionComponent animation="scale" :countTo="orderStore.dashbord.total_seller" :duration="1500" />      
             </span>
           

        </div>

      </MotionComponent>

      <!-- <Motioncomponent animation="slide-left">
      
      </Motioncomponent> -->

    </div>

    <!-- Card com mais e menos vendidos juntos -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <!-- <Motioncomponent animation="fade-down">
      
      </Motioncomponent> -->

    
    </div>
  
    
  </div>
</template>

<script setup lang="ts">
import { PiggyBank,CircleDollarSign  } from 'lucide-vue-next';
import { useOrder } from '~/store/order';
import { useProducts } from '~/store/products';



definePageMeta({
  name:'dashboard', 
  layout: 'dashboard'
})

const productStore = useProducts()
const orderStore = useOrder()


onMounted(async ()=>{
 await productStore.GetALLProducts()
 await orderStore.GetDashboard()   
})

</script>

<style scoped>
/* Estilização opcional */
</style>
