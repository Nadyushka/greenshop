import {storeToRefs} from 'pinia'
import {defineNuxtRouteMiddleware, navigateTo} from '#imports'
import {useAuthStore} from '~/store/auth'
import {ERouteName} from '~/shared/routes'

export default defineNuxtRouteMiddleware((to) => {
    const authStore = useAuthStore()
    const {isAuth} = storeToRefs(authStore)

    const userRole = useCookie('userRole')

    if (to.name === ERouteName.PAGE_PERSONAL_AREA
        && !isAuth.value
        && userRole.value !== 'buyer') {

        return navigateTo({name: ERouteName.PAGE_HOME})
    } else if (to.name === ERouteName.PAGE_ADMIN
        && !isAuth.value
        && userRole.value !== 'admin') {

        return navigateTo({name: ERouteName.PAGE_HOME})
    }
})
