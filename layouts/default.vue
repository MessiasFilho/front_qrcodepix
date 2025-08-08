<template>
    <div class="w-full h-screen flex flex-col items-center ">
        <header class="w-full bg-gray-800 text-white p-2 flex items-center">
            <div class="w-full space-x-1.5 flex justify-end items-center">
                <button @click="navigatePageTo('login')" class="border active:scale-95 transition-all border-gray-300 bg-gray-700 text-white px-4  rounded hover:bg-gray-600">
                    login
                </button>
                <button @click="navigatePageTo('register')" class="border active:scale-95 transition-all border-gray-300 bg-gray-700 text-white px-4  rounded hover:bg-gray-600">
                    register
                </button>
            </div>
        
        </header>
        <slot />
    </div>
</template>

<script setup lang="ts">

const navigatePageTo = (page: string) => {
  navigateTo(page);
};
</script>

<style scoped>

</style>