<template>
    <div class="flex bg-gray-100 w-full items-center justify-center h-screen">
        <div class=" p-6 bg-white rounded-lg shadow-lg w-full max-w-md">
            <form @submit.prevent="loginUser" class="space-y-4">
                
                <label for="">Email</label>
                <input v-model="user.email" type="text" class="border p-2 rounded-md shadow-md w-full mb-4" placeholder="Email" />
                <label for="">Senha</label>
                <input v-model="user.password" type="password" class="border p-2 rounded-md w-full shadow-md mb-4" placeholder="Senha" />
            
            <div class="flex w-sm  justify-between mb-4  ">
                <span class=" cursor-pointer active:scale-99 transition-all underline"> cadastrar-se </span> 
            </div>
            <div class="flex space-x-4 justify-between">
                <button @click="navigateTo('')" class="bg-red-400 rounded-sm px-1 cursor-pointer active:scale-95 transition-all uppercase text-white shadow-md font-semibold">Cancelar</button>
                <button type="submit" class="bg-blue-400 cursor-pointer active:scale-95 transition-all rounded-sm px-1 uppercase text-white shadow-md font-semibold">Login</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useCommon } from '~/store/common';
import { useUser, type User_login } from '~/store/user';

const userStore = useUser()

definePageMeta({
    name: 'Login',
    layout: false,
})

const storeCommon = useCommon();


const user = ref<User_login>({
    email: '',
    password: ''
});


const loginUser = async () =>{
    if (!user.value.email || !user.value.password) {
        console.log('Preencha todos os campos');
        
        return;
    }

    await userStore.LoginUser(user.value);
}


onMounted(() => {
   
});

</script>

<style scoped>

</style>