export const useCommon = defineStore('useCommon', {
    state: () => ({
        loginDialog: false,
        storeDialog:false, 
        listCategory: false,
        categoryCreate: false, 
        pixDialog: false,

        paramId : 0, 
        CategoryId : 0, 
        nameProd : '',
        nameCategory: '',
        pymentPix: false
    }),
       
})