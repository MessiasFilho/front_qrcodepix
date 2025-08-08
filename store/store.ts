import { useUser } from "./user";

export interface Store_create {
    name: string;
    description: string;
}

export interface Storeinterface {
    id: number;
    name: string;
    description: string;
    status: boolean;
}
export const useStore = defineStore('useStore', {
    state: () => ({
        store: {} as Storeinterface,
    }),
    actions: {
        async CreateStore( store: Store_create) {
            const {data, error} = await useFetch<Store_create>('/store/create', {
                method: 'POST',
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                body: {...store},
                baseURL: useRuntimeConfig().public.backend,
            })
            if (error.value) {
                console.error('Error creating store:', error.value);
                return ;
            }
            if (data.value) {

                await useUser().getUser(); 

                console.log('Store created successfully:', data.value);
                return ;
            }

        }, 
        async getStore(id : number) {
            if (!id) {
                
                return;
            }
            const {data, error} = await useFetch<Storeinterface>(`/store/${id}`, {
                method: 'GET',
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                baseURL: useRuntimeConfig().public.backend,
            })
            if (error.value) {
                console.error('Error fetching stores:', error.value);
                return ;
            }
            if (data.value) {
                this.store = data.value;
                return data.value;
            }
        },
        async GetStoroByClient(storeName: string, hashuser: string){
            const {data, error} = await useFetch(`store/${storeName}/${hashuser}`, {
                method: 'get', 
                baseURL: useRuntimeConfig().public.backend,
                headers: {Authorization: `Bearer${localStorage.getItem('login')}`}
            })

            if(error.value){
                return false
                
            }
            if (data.value){
                console.log(data.value);
                return true
            }

            return false
        }
    }
})