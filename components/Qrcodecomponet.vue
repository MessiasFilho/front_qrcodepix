<template>
    <div class="w-full h-full flex flex-col">
        <Dialog :open="commonStore.pixDialog">
            <DialogContent class="p-6 rounded-xl shadow-xl bg-[var(--muted)]">
                <DialogTitle class="text-xl font-bold text-gray-800 mb-4 text-center">
                    Total a pagar: <span class="text-green-600">R$ {{ props.total }}</span>
                </DialogTitle>

                <div class="flex flex-col items-center justify-center mb-6 ">
                    <img v-if="pixStore.pix.piximage" :src="pixStore.pix.piximage" alt="QR Code"
                        class="w-60 h-60 object-contain border rounded-lg shadow-2xl" />
                </div>

                <div class="w-full flex flex-col items-center space-y-2 mb-6">
                    <div @click="copyPixCode" class="w-full active:scale-95 transition bg-[var(--popover)] duration-75 max-w-md flex justify-center items-center shadow-md rounded-md border gap-2">
                        <span class="text-sm text-gray-700 font-semibold ">PIX copia e cola</span>
                        <button  class="p-2 rounded-md hover:bg-gray-200 transition"
                            title="Copiar código Pix">
                            <Files class="w-5 h-5 text-gray-700" />
                        </button>
                    </div>

                    <span v-if="copied" class="text-green-600 text-sm">Código copiado!</span>
                </div>

                <DialogFooter>
          <div class="flex justify-between gap-4">
            <button
              @click="commonStore.pixDialog = false"
              class="w-full py-2 rounded-md bg-[var(--destructive)] text-[var(--destructive-foreground)] font-semibold hover:bg-red-600 active:scale-95 transition-all"
            >
              Cancelar
            </button>
            <button
              @click="finalizar()"
              class="w-full py-2 rounded-md bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold hover:bg-[var(--accent)] active:scale-95 transition-all"
            >
              Finalizar
            </button>
          </div>
        </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
</template>

<script setup lang="ts">
import { Files } from 'lucide-vue-next';
import { useCommon } from '~/store/common';
import Dialog from './ui/dialog/Dialog.vue';
import DialogContent from './ui/dialog/DialogContent.vue';
import { usePix } from '~/store/pix';
import { useProducts } from '~/store/products';


const commonStore = useCommon()
const pixStore = usePix()
const produStore = useProducts()
const props = defineProps<{
    total: number, 
    onConfirm: () => void
}>()

const finalizar = async () =>{
    props.onConfirm()
   
    commonStore.pixDialog = false
}

const copied = ref(false);
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

onMounted(async () => {


})

</script>

<style lang="scss" scoped></style>