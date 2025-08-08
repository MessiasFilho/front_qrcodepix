<template>
    <div>
        <Dialog   :open="storeCommon.loginDialog" >
            <DialogContent class="w-[1080px]">
                <DialogHeader class="w-full ">
                    <DialogTitle>Login</DialogTitle>
                    
                </DialogHeader>
                <div>
                    <div class="flex flex-col gap-4">
                        <div class="flex flex-col justify-center">
                            <label for="email">Email</label>
                             <Input id="email" class="border  outline-none rounded-md p-2" placeholder="Email" />
                        </div>
                        <div class="flex flex-col justify-center">
                            <label for="password">Senha</label>
                            <Input id="password" type="password" class="border p-2 rounded-md" />
                        
                        </div>
                        
                    </div>
                
                </div>
                <DialogFooter>
                    <div class="flex space-x-4 ">
                        <button  variant="secondary" class="w-full bg-red-400 rounded-md font-semibold active:scale-95 transition-all" @click="navigatePage('')">Cancelar</button>
                        <button class="w-full bg-green-400 rounded-md font-semibold active:scale-95 transition-all" @click="">Entrar</button>
                    
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
</template>

<script setup lang="ts">
import { useCommon } from '~/store/common';

const storeCommon = useCommon();

const navigatePage = (page: string) => {
    
    storeCommon.loginDialog = false;  // Close the login dialog
    navigateTo(page);  // Assuming you have a method to navigate to the page
    
    // Implement navigation logic here if needed
};

</script>

<style scoped></style>