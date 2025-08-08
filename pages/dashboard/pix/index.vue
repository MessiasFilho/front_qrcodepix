<template>
    <div class="flex flex-col  p-6 gap-4 min-h-screen">
        <div class="bg-white p-6 rounded-2xl mx-auto transition-all shadow-xl max-w-md w-full h-full">
            <h2 class="text-xl font-bold mb-4 text-gray-800"> Cadastro de Chave PIX</h2>
            <form @submit.prevent="updatePixKey()" class="flex flex-col gap-4">
                <div>
                    <label for="pixType" class="block text-sm font-medium text-gray-700 mb-1">Tipo de Chave</label>
                    <Select v-model="pixType">
                        <SelectTrigger class="w-full shadow bg-[var(--muted)]">
                            <SelectValue placeholder="selecione uma chave pix" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup  v-for="item in listitems">
                                <SelectItem class="focus:text-white " :value="item.value">
                                    {{ item.text }}
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label for="pixKey" class="block text-sm font-medium text-gray-700 mb-1">Chave PIX</label>
                    <input  v-model="pixKey" :placeholder="getPlaceholder(pixType)" id="pixKey" type="text"
                        class="w-full border shadow bg-[var(--muted)] border-gray-300 rounded-md  p-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition disabled:bg-gray-200" />
                </div>
                <div class="space-y-1 w-full">
                    <label for="descri" class="block text-sm font-medium text-gray-700">
                        Descrição da chave PIX
                    </label>

                    <Textarea id="descri" v-model="descricao" maxlength="100"
                        class="w-full min-h-[100px] p-3 border bg-[var(--muted)] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
                        placeholder="Descreva o uso desta chave PIX " />

                    <div class="flex justify-between text-sm text-gray-500">
                        <span v-if="textareaalert" class="text-red-500 font-medium">
                            {{ textareaalert }}
                        </span>
                        <span :class="descricao.length >= 100 ? 'text-red-500 font-semibold' : ''">
                            {{ descricao.length }}/100
                        </span>
                    </div>
                </div>
                <button type="submit"
                    class="bg-[var(--secondary)] text-white font-semibold px-4 py-2 rounded-xl hover:scale-105 active:scale-95 transition-transform">
                    Salvar Chave
                </button>

            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { usePix} from '~/store/pix';
import { useUser } from '~/store/user';
definePageMeta({
    name: 'pix',
    layout: 'dashboard'
})
const userStore = useUser()
const pixStore = usePix()
const descricao = ref('')

const pixType = ref(userStore.user.pix_type) 
const pixKey = ref(userStore.user.pix_key)
const textareaalert = ref('')

watch(pixType, () => {
    pixKey.value = ''
})

watch(descricao, (val) => {
  textareaalert.value = val.length >= 100 ? 'Máximo de caracteres atingido.' : ''
})
const listitems = [
    { value: 'CPF', text: 'CPF' },
    { value: 'phone', text: 'Telefone' },
    { value: 'email', text: 'Email' },
    { value: 'random', text: 'Aleatoria' },
]
const getPlaceholder = (type: string) => {

    switch (type) {
        case 'CPF':
            return '000.000.000-00'
        case 'phone':
            return '85123456789'
        case 'email':
            return 'email@exemplo.com'
        case 'random':
            return 'Chave Aleatória'
        default:
            return ''
    }


}

const updatePixKey = async () => {
   
     const pixKeyValue = pixType.value === 'phone'? `+55${pixKey.value?.replace(/\D/g, '')}` : pixKey.value;

    await pixStore.UpdatePixKey({
        name: userStore.user.name,
        document: userStore.user.document,
        city: userStore.user.city,
        phone: userStore.user.phone,
        description_pix: descricao.value,
        pix_key:  pixKeyValue,
        pix_type: pixType.value

    })
}

onMounted(async () => {
   await userStore.getUser()
})



</script>

<style scoped></style>