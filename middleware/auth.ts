import {storeToRefs} from 'pinia'
import {defineNuxtRouteMiddleware, navigateTo} from '#imports'
import {useAuthStore} from '~/store/auth'
import {ERouteName} from '~/shared/routes'

export default defineNuxtRouteMiddleware((to) => {
    const authStore = useAuthStore()
    const {isAuth, userRole} = storeToRefs(authStore)

    console.log(to.name, isAuth.value )

    if (false) {

        return navigateTo({name: ERouteName.PAGE_HOME})
    } else if (to.name === ERouteName.PAGE_ADMIN
        && !isAuth.value
        && userRole.value !== 'admin') {

        return navigateTo({name: ERouteName.PAGE_HOME})
    }
})
