import { useUser } from "./user";

export interface Category {
    name: string;
}

export interface listCategory{
    id:number, 
    name: string
}

export const useCategory = defineStore('useCategory', {
    state: () => ({
        category: {} as Category,
        categoryes: [] as listCategory[]
    }),
    actions: {

        async CreateCategory ( catego : Category ){
            const {data, error} =  await useFetch('category/', {
                method:'post', 
                body: {...catego},
                baseURL: useRuntimeConfig().public.backend,
                headers: {authorization: `Bearer${localStorage.getItem('login')}`}
            })

            if (error.value){
                console.log(error.value);

            }

            if (data.value){

            }

        },   
    
        async ListCategory (){
            const {data, error} =  await useFetch<listCategory[]>(`category`, {
                method:'get', 
                baseURL: useRuntimeConfig().public.backend,
                headers: {authorization: `Bearer${localStorage.getItem('login')}`}
            })

            if (error.value){
                console.log(error.value);
                
            }

            if (data.value){
                this.categoryes = data.value
               
                
            }

        }
    }

});