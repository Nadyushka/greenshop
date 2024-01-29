// https://nuxt.com/docs/api/configuration/nuxt-config

import {resolve} from "path"
import * as path from "path";

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
        '@nuxt/image',
        '@pinia/nuxt',
        '@vee-validate/nuxt',
        '@vueuse/nuxt',
    ],
    alias: {
        '@': resolve(__dirname, './'),
    },
    css: [
        "~/assets/css/main.css",
        "normalize.css/normalize.css"
    ],
    router: {
        base: '/',
    },
})
