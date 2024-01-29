import { resolve } from "path"

export default defineNuxtConfig({
    devtools: {enabled: true},
    app: {
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            title: 'GREENSHOP',
        }
    },
    modules: [
        '@pinia/nuxt',
        '@vee-validate/nuxt',
        '@vueuse/nuxt',
        'nuxt-svgo'
    ],
    alias: {
        '@': resolve(__dirname, './'),
    },
    css: [
        "~/assets/styles/main.scss",
        "normalize.css/normalize.css"
    ],
    router: {
        base: '/',
    },
})
