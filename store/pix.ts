export interface PixResponse{
    Message: string, 
    pixcode: string, 
    piximage: string,
}


export interface PixUser {
  name: string;
  document: string;
  phone: string;
  city: string;
  pix_type: string;
  pix_key: string;
  description_pix: string;
}


export const usePix = defineStore('usePix', {
    state: () =>({
        pix : {} as PixResponse
    }), 
    actions: {        
        async GenerateQRcode(hash: string, valor: number){
            const {data, error} = await useFetch<PixResponse>(`pix/generate/${hash}`,{
                method:'POST', 
                baseURL: useRuntimeConfig().public.backend, 
                headers: {Authorization: `Bearer${localStorage.getItem('login')}`},
                body: {value: valor }
            })
            
            if (error.value){
                return console.log('deu ruim no pix');
            }
            if (data.value){
                this.pix = data.value
            }
        },
        
        async UpdatePixKey(user : PixUser){
            const {data , error} = await useFetch('user/update-credentials',{
                method: 'PUT',
                baseURL: useRuntimeConfig().public.backend, 
                headers: {Authorization:`Bearer${localStorage.getItem('login')}`},
                body: {...user}
            })

            if (error.value){
                console.log('deu ruim em atualizar chave pix');
                return false
                
            }

            if (data.value ){
                console.log('');
                
                return true 
            }

            return false

        }
    
    }

    



})