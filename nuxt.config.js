// https://nuxt.com/docs/api/configuration/nuxt-config

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
    // modules: [
    //     '@pinia/nuxt',
    //     '@vueuse/nuxt',
    // ],
    alias: {
        '@': resolve(__dirname, './'),
    },
    css: [
        "~/assets/css/main.css",
        "normalize.css/normalize.css"
    ],
})
