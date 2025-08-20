export interface Product_Interface {
  name: string;
  description: string;
  value: Number;
  stock_quantity: Number;
  imagens: []
}

export interface ProductResponse {
  id: number;
  name: string;
  description: string;
  value: number;
  stock_quantity: number;
  images: string [] ;
  category_id: number;
  category_name: string;
  created_at: string;  
  updated_at: string;  
}



export interface GetProductResponse extends Product_Interface {
  id: number;
}

export interface UpdateProduct extends Product_Interface {
  category_id: number
}

export const useProducts = defineStore("useProducts", {
  state: () => ({

    products: [] as ProductResponse [], 
    proCateg: [] as GetProductResponse[], 
    product: {} as Product_Interface, 
    productresp:{} as ProductResponse
  }),
  actions: {


   async CreateProduct(categoryId: number, payload: {
      name: string
      description: string
      value: number
      stock_quantity: number
      files?: File[]
    }) {
      const fd = new FormData()
      fd.append('name', payload.name)
      fd.append('description', payload.description)
      fd.append('value', String(payload.value))
      fd.append('stock_quantity', String(payload.stock_quantity))
      if (payload.files?.length) {
        for (const f of payload.files) {
          fd.append('imagens', f) // mesma chave do backend
        }
      }
      const { data, error } = await useFetch(`products/add-item/${categoryId}`, {
        method: 'POST',
        baseURL: useRuntimeConfig().public.backend,
        headers: { Authorization: `Bearer ${localStorage.getItem('login')}` },
        body: fd,
      })
      if (error.value) throw error.value
      return data.value
    },
    async GetALLProducts() {

      this.products = []

      const { data, error } = await useFetch<ProductResponse[]>("products/all", {
        method: "get",
        baseURL: useRuntimeConfig().public.backend,
        headers: { authorization: `Bearer ${localStorage.getItem("login")}` },
      });

      if (error.value) {
        console.log("erro ao cria produto");
        return
      }
      if (data.value) {
        
        this.products = data.value
        return true
      }
    },

    async GetProduct() {
      const { data, error } = await useFetch("", {
        method: "get",
        baseURL: useRuntimeConfig().public.backend,
        headers: { authorization: `Bearer ${localStorage.getItem("login")}` },
      });

      if (error.value) {
        console.log("erro ao cria produto");
      }
      if (data.value) {
        console.log("sucesso ao cria produto");
      }
    },

    async GetProductsbyCatagory(id:number){
        this.proCateg = []
         const { data, error } = await useFetch<GetProductResponse[]>(`products/get-item-category/${id}`, {
        method: "get",
        baseURL: useRuntimeConfig().public.backend,
        headers: { authorization: `Bearer ${localStorage.getItem("login")}` },
      });

      if (error.value) {
        console.log("erro ao cria produto");
        return false
      }
      if (data.value) { 
        this.proCateg = data.value
        return true 
        
      }

      return false
    }, 
    
    async GetProductByHashId (hash: string,id: number) {
        const { data, error } = await useFetch<ProductResponse>(`products/${hash}/${id}`, {
        method: "get",
        baseURL: useRuntimeConfig().public.backend,
      });
        if (error.value) {
        console.log("erro ao cria produto");
      }
      if (data.value) {
        this.productresp = data.value
      }

    }, 
    async GetProductById (id: number) {
        const { data, error } = await useFetch<Product_Interface>(`products/get-item/${id}`, {
        method: "get",
        baseURL: useRuntimeConfig().public.backend,
        headers: { authorization: `Bearer ${localStorage.getItem("login")}` },
      });

        if (error.value) {
        console.log("erro ao cria produto");
      }
      if (data.value) {
        this.product = data.value
      
        
      }

    }, 

    async UpdateProduct(prod: UpdateProduct, id: number ){
       const { data, error } = await useFetch<UpdateProduct>(`products/update/${id}`, {
        method: "put",
        baseURL: useRuntimeConfig().public.backend,
        headers: { authorization: `Bearer ${localStorage.getItem("login")}` },
        body: {...prod} ,
      });

      if (error.value) {
        console.log("erro ao cria produto");
      }
      if (data.value) {
        console.log("sucesso ao cria produto");
      }



    }

  },


});
