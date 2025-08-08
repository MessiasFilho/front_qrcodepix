import { get } from "@vueuse/core";

export interface User_create {
    name: string;
    email: string;
    document: string;
    phone: string
    city: string;
    password: string;
    confirm_password: string;
}

export interface User {
  city: string;
  description_pix: string;
  document: string;
  email: string;
  expiration: number;
  hash: string;
  management: 'active' | 'inactive' | string; 
  name: string;
  phone: string;
  pix_key: string;
  pix_type: string;
  status: 'active' | 'inactive' | string; 
  store_id: number;
}

export interface User_login {
    email: string;  
    password: string;
}

export const useUser = defineStore('useUser', {
    state: () => ({
        user: {} as User,
    }), 
    actions:{
        async LoginUser(user_login: User_login) {
            interface token{
                access_token: string;
            }

            const {data, error} = await useFetch<token>('/auth', {
                method: 'POST',
                body: {...user_login},
                baseURL: useRuntimeConfig().public.backend,
            })
            if (error.value) {
                console.error('Error logging in:', error.value);
                return 
            }
            if (data.value) {
                localStorage.setItem('login', data.value.access_token);
                navigateTo('/dashboard');
                this.getUser()
                return
            }
        },

        async createUser(user: User_create) {
           const {data , error} = await useFetch('/auth/register', {
                method: 'POST',
                body: {...user},
                baseURL: useRuntimeConfig().public.backend,            
            })
            if (error.value) {
                console.error('Error creating user:', error.value);
                return 
            }
            if (data.value) {
                console.log('User created successfully:', data.value);
                return 
            }
        }, 

        async getUser() {
            const {data, error} = await useFetch<User>('/user/me', {
                method: 'GET',
                baseURL: useRuntimeConfig().public.backend,
                headers: {  Authorization: `Bearer ${localStorage.getItem('login')}`}
        }
            )
            if (error.value) {
                console.error('Error fetching user:', error.value);
                return false
            }
            if (data.value) {
                this.user = data.value;
                return true
            }

            return false
        }

    }
})
