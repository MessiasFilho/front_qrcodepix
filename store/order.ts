
export interface orderRequest {
  value: number;
  products: productsItem[];
}

interface productsItem {
  id: number;
  qtd: number;
}

export interface resposeOrder {
  Message: string;
  id: number;
}

export interface respDashboard {
   "cancelled": 0,
    "paid": 0,
    "pending": 0,
    "stock_total": 0,
    "total_seller": 0
}
export const useOrder = defineStore("useOrder", {
  state: () => ({
    resp: {} as resposeOrder,
     dashbord: {} as respDashboard,
  }),
  actions: {

    async CreateOrder(order: orderRequest, hash: string): Promise <resposeOrder | null> {
      const { data, error } = await useFetch<resposeOrder>(
        `order/create/${hash}`,
        {
          method: "POST",
          baseURL: useRuntimeConfig().public.backend,
          headers: {
            Authorization: `Bearer${localStorage.getItem("login")}`,
          },
          body: { ...order },
        }
      );

      if (error.value) {
        console.error("Erro ao criar pedido:", error.value);
        return null; 
      }

      if (data.value) {
        
        this.resp = data.value
      }

   

      return null;
    },

    async OrderPaymentQrcode(id: number) {
      const { data, error } = await useFetch(`order/payment/${id}`, {
        method: "POST",
        baseURL: useRuntimeConfig().public.backend,
        headers: { Authorization: `Bearer${localStorage.getItem("login")}` },
      });
      if (error.value) {
        console.log("error");
        return false;
      }

      if (data.value) {
        this.GetDashboard()
        return true;
      }
      return false;
    },

    async GetDashboard (){
       const { data, error } = await  useFetch<respDashboard>(`order/dashboard`, {
        method: "get",
        baseURL: useRuntimeConfig().public.backend,
        headers: { Authorization: `Bearer${localStorage.getItem("login")}` },
      });

      if (error.value) {
        console.log("error");
        return false;
      }

      if (data.value) {

          
          this.dashbord = data.value
          
       
         return true
        }
      
        
      
    }
  },
});
