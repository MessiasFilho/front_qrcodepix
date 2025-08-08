<template>
    <div class="w-full bg-gray-100 h-full flex flex-col items-center justify-center">
        <div class=" overflow-auto flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
        <h1 class="text-2xl font-bold mb-4">Bem vindo ao registro na WareStore</h1>
        <p class="mb-6">Por favor prencha os campos nessesarios</p>
        <form @submit.prevent="createuser" class="space-y-4 w-full ">
            <div>
                <label for="username" class="block mb-1">Nome</label>
                <input v-model="formUser.name" id="username" type="text" class="w-full p-2 border rounded-md" placeholder="Insira seu nome " />
            </div>
            <div>
                <label for="email" class="block mb-1">Email</label>
                <input v-model="formUser.email"  id="email" type="email" class="w-full p-2 border rounded-md" placeholder="Insira seu email" />
            </div>
            <div>
                <label for="email" class="block mb-1">Telefone</label>
                <input v-model="formUser.phone"  id="email" type="tel" class="w-full p-2 border rounded-md" placeholder="Insira seu telefone" />
            </div>
            <div>
                <label for="email" class="block mb-1">CPF</label>
                <input v-model="formUser.document"  id="email" type="text" class="w-full p-2 border rounded-md" placeholder="Informe seu CPF" />
            </div>
            <div>
                <label for="cidade" class="block mb-1">Cidade</label>
                <input  v-model="formUser.city" id="cidade" type="" class="w-full p-2 border rounded-md" placeholder="Infrorme sua cidade" />
            </div>
            <div>
                <label for="email" class="block mb-1">Senha</label>
                <input  v-model="formUser.password" id="email" type="password" class="w-full p-2 border rounded-md" placeholder="Insira a sua senha" />
            </div>
            <div>
                <label for="password" class="block mb-1">Confirme sua senha</label>
                <input  v-model="formUser.confirm_password" id="password" type="password" class="w-full p-2 border rounded-md" placeholder="Insira a sua senha" />
            </div>
            <div class="flex  gap-4">
            <button @click="navigateTo('')" class="w-full bg-red-400 text-white p-2 rounded-md hover:bg-red-500 transition-all">Voltar</button>
            <button type="submit" class="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-all">Registrar</button>
            </div>
        </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useUser, type User_create } from '~/store/user';

definePageMeta({
    name: 'register',
    layout: false,
})



const userStore = useUser();

const formUser = ref<User_create>({
    name: '',
    email: '',
    phone: '',
    document: '',
    city: '',
    password: '',
    confirm_password: ''
})

const createuser = async () => {
    await userStore.createUser(formUser.value);
};

</script>

<style scoped>

</style>