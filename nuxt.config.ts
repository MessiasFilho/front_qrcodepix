import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
 css: ['~/assets/css/main.css'],
 modules: ['shadcn-nuxt', '@pinia/nuxt', 'motion-v/nuxt', ],
 devtools:{enabled: false},
 runtimeConfig:{
  public: {
    backend:'http://localhost:4041/',
 },
},  


  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  ssr: false, 
  app: {
  head: {
    meta: [
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
      },
    ]
  }
}

})