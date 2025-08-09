<template>
    <div>
        <Dialog :open="commonStore.pymentPix">
            <DialogContent class="w-[1080px]">
                <DialogHeader class="w-full ">
                    <DialogTitle class="uppercase text-[var(--secondary)]">pix </DialogTitle>
                   <div v-if="qrcodeIMG">
                     <span  class="text-2xl text-[var(--secondary)] font-semibold">{{ formatNumber }}</span>
                   
                   </div>
                </DialogHeader>

                <div v-if="qrcodeIMG">
                    <div class="flex flex-col items-center justify-center mb-6 ">
                        <img v-if="pixStore.pix.piximage" :src="pixStore.pix.piximage" alt="QR Code"
                            class="w-60 h-60 object-contain border rounded-lg shadow-xl" />
                    </div>
                    <div class="w-full flex flex-col items-center space-y-2 mb-6">
                        <div @click="copyPixCode"
                            class="w-full active:scale-95 transition bg-[var(--popover)] duration-75 max-w-md flex justify-center items-center shadow rounded py-1 border gap-2">
                            <span class="text-sm text-gray-700 font-semibold ">PIX copia e cola</span>
                            <button class="p-2 rounded-md hover:bg-gray-200 transition" title="Copiar código Pix">
                                <Files class="w-5 h-5 text-gray-700" />
                            </button>
                        </div>

                        <span v-if="copied" class="text-green-600 text-sm">Código copiado!</span>
                    </div>
                </div>

                <div v-if="!qrcodeIMG" class="w-full flex justify-center">
                    <input v-model="valor" class="mim-w-[100px] px-3 text-center py-2 rounded-md bg-[var(--background)] border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] transition" 
                    type="number" 
                    placeholder="informe o valor do pix">
                </div>
                <DialogFooter>
                    <div class="flex space-x-4 ">
                        <button @click="Cancelar()" variant="secondary"
                            class="w-full bg-red-500/70 text-white rounded font-semibold active:scale-95 uppercase transition-all">Cancelar</button>
                        <button :disabled="gerar" :class="gerar == true ? 'bg-[var(--secondary)]/60 active:scale-100' : 'bg-[var(--secondary)]'"
                            class="w-full bg-[var(--secondary)] text-white rounded font-semibold active:scale-95 transition-all uppercase"
                            @click="GetnereateQRcode()">{{ text }}</button>

                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
</template>

<script setup lang="ts">
import { useCommon } from '~/store/common';
import { usePix } from '~/store/pix';
import { useUser } from '~/store/user';

const qrcodeIMG = ref(false)
const gerar = ref(false)
const valor = ref(0)
const text = ref('gerar')
const commonStore = useCommon()
const userStore = useUser()
const pixStore = usePix()
const copied = ref(false);


const Cancelar = () => {
    qrcodeIMG.value = false
    commonStore.pymentPix = false
    gerar.value = false
    valor.value = 0
}
const GetnereateQRcode = async () => {
    if (valor.value == 0) {
        return
    }

    await pixStore.GenerateQRcode(userStore.user.hash, valor.value)
    qrcodeIMG.value = true
    gerar.value = true

}
const copyPixCode = async () => {
    try {
        await navigator.clipboard.writeText(pixStore.pix.pixcode);
        copied.value = true;
        setTimeout(() => {
            copied.value = false;
        }, 2000);
    } catch (err) {
        console.error('Erro ao copiar Pix:', err);
    }
};

const formatNumber = computed (() =>{
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor.value)
}) 


onMounted(async () => {
    await userStore.getUser()
})

</script>

<style scoped></style>