// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  nitro: {
    preset: 'node', // ensure you’re not in 'vercel-edge' or 'static'
  },
  modules: ['@nuxtjs/tailwindcss']
  // vite: {
  //   resolve: {
  //     alias: {
  //       'pdfjs-dist/build/pdf.worker.entry': 'pdfjs-dist/build/pdf.worker.min.js'
  //     }
  //   }
  // }
})
