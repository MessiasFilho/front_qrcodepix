<template>
    <div>
          <Dialog :open="useCommon().storeDialog" >
            <DialogContent>
                <DialogHeader class="w-full ">
                    <DialogTitle></DialogTitle>
                    
                </DialogHeader>
                <div>
                    <div class="flex flex-col gap-4">
                        <div class="flex flex-col justify-center">
                            <label for="name">nome da loja</label>
                             <input v-model="formstore.name" id="name" class="border  outline-none rounded-md p-2" placeholder="nome" />
                        </div>
                        <div class="flex flex-col justify-center">
                            <label for="descricao">descrição da loja</label>
                            <input v-model="formstore.description" id="descricao" type="text" class="border p-2 rounded-md" />
                        
                        </div>
                    </div>
                
                </div>
               
                    <div class="flex space-x-4 w-full justify-between items-center ">
                        <button @click="useCommon().storeDialog = false" class=" bg-red-400 rounded-md font-semibold active:scale-95 transition-all uppercase px-2" >Cancelar</Button>
                        <button @click="createStore()" class=" bg-green-400 rounded-md font-semibold active:scale-95 transition-all px-2 uppercase " >Criar</Button>
                    </div>
            </DialogContent>
        </Dialog>
    </div>
</template>

<script setup lang="ts">
import { useCommon } from '~/store/common';
import { useStore, type Store_create } from '~/store/store';
import { useUser } from '~/store/user';

const formstore = ref<Store_create>({
    name: '',
    description: '' 
})
  

const createStore = async () => {
     await useStore().CreateStore(formstore.value);
     await useStore().getStore(useUser().user.store_id);
     formstore.value = { name: '', description: '' }; // Reset the form after creation
     useCommon().storeDialog = false
};



</script>

<style scoped>

</style>