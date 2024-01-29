<script setup lang="ts">
import NButton from "~/components/ui/NButton.vue"
import {useAuthStore} from "~/store/auth"
import {usePlantsStore} from "~/store/plants"
import {storeToRefs} from "pinia"
import {ERouteName} from "~/shared/routes"

const authStore = useAuthStore()
const {isAuth, userRole, authError} = storeToRefs(authStore)

const plantStore = usePlantsStore()
const { cartItemsData } = storeToRefs(plantStore)

const route = useRoute()
const router = useRouter()

const isLoginModalOpen = ref<boolean>(false)

const headerListItems = ['Home', 'Shop', 'Plant Care', 'Blogs']
const activeListItem = ref('Home')

const roles = ['Buyer', 'Admin']
const selectedRole = ref('Buyer')

const email = ref('buyer@gmail.com')
const password = ref('buyer123')

const loginBtnData = computed<'Login' | 'Logout'>(() => !isAuth.value ? 'Login' : 'Logout')

const linkTransformer = (link: string) => {
  activeListItem.value = link

  if (link === 'Home') {
    router.push({
      name: ERouteName.PAGE_HOME
    })
  } else if (link === 'Plant Care') {
    router.push({
      name: ERouteName.PAGE_PLANT_CARE,
    })
  } else if (link === 'Shop') {
    router.push({
      name: ERouteName.PAGE_SHOP,
    })
  } else if (link === 'Blogs') {
    router.push({
      name: ERouteName.PAGE_BLOGS,
    })
  }
}

const wasPressOnIcon = ref(false)

const openPage = (page: string, pressOnIcon?: boolean) => {

  wasPressOnIcon.value = pressOnIcon ?? false

  if (route.path != ERouteName.PAGE_HOME && page == ERouteName.PAGE_HOME) {
    if (userRole.value != 'admin')
      router.push({
        name: ERouteName.PAGE_HOME,
      })

  } else if (page == ERouteName.PAGE_PERSONAL_AREA) {

    if (isAuth.value && userRole.value === 'buyer') {
      router.push({
        name: ERouteName.PAGE_PERSONAL_AREA,
      })
    } else {
      toggleModal(true)
    }

  } else if (page == ERouteName.PAGE_SHOP_CART) {
    router.push({
      name: ERouteName.PAGE_SHOP_CART,
    })
  }

}

const setCorrectHeaderActiveItem = () => {
  if (route.path.slice(1) === 'personal-area' || route.path.slice(1) === 'admin') {
    activeListItem.value = ''
    return
  }

  if (activeListItem.value.toLowerCase() !== route.path.slice(1).toLowerCase()) {
    const activeHeaderItem = [...headerListItems].filter(item => item.includes(route.path.slice(2, 4)))
    activeListItem.value = activeHeaderItem[0]
  }
}

const toggleModal = (isOpen: boolean) => isLoginModalOpen.value = isOpen

const changeRole = (role: string) => {
  selectedRole.value = role

  if (role === 'Buyer') {
    email.value = 'buyer@gmail.com'
    password.value = 'buyer123'
  } else {
    email.value = 'admin@gmail.com'
    password.value = 'admin123'
  }
}

const loginLogout = async () => {
  if (isAuth.value) {
    await authStore.logout()
    if (route.path === ERouteName.PAGE_PERSONAL_AREA || route.path === ERouteName.PAGE_ADMIN) {
      await router.push({
        name: ERouteName.PAGE_HOME,
      })
    }
  } else {
    const res = await authStore.login({email: email.value, password: password.value})
    if (!res) {
      toggleModal(false)

      if (wasPressOnIcon.value) {
        await router.push({
          name: ERouteName.PAGE_PERSONAL_AREA,
        })
      }

      if (userRole.value === 'admin') {
        await router.push({
          name: ERouteName.PAGE_ADMIN,
        })
      }
    }
  }
}

const openModalAndLogout = async () => {
  if (!isAuth.value) {
    toggleModal(true)
  } else {
    await loginLogout()
  }
}

watch(
    () => route.path,
    () => {
      setCorrectHeaderActiveItem()
    }
)

onMounted(() => {
  setCorrectHeaderActiveItem()
})
</script>

<template>
  <header class="header">
    <div
        class="header__wrapper"
        :class="{
             'header__wrapper-admin': userRole === 'admin'
           }">
      <img
          src="../assets/svg/logo.svg"
          alt="logo"
          class="header__logo"
          @click="openPage( ERouteName.PAGE_HOME)"
      />

      <nav
          class="header__nav"
          v-if="userRole !== 'admin'"
      >
        <ul class="header__list">
          <li
              v-for="list in headerListItems"
              class="header__item" :class="{'header__item_active': activeListItem === list}"
              @click="linkTransformer(list)"
          >
            {{ list }}
          </li>
        </ul>
      </nav>

      <div class="header__login">
        <div
            v-if="userRole !== 'admin'"
            class="header__cart"
            @click="openPage(ERouteName.PAGE_SHOP_CART)">
          <img src="../assets/svg/cart-icon.svg" alt="cart icon"/>
          <div class="header__purchases"> {{ cartItemsData.length }}</div>
        </div>
        <img
            v-if="userRole !== 'admin'"
            class="header__home"
            src="../assets/svg/home-icon.svg"
            alt="home icon"
            @click="openPage(ERouteName.PAGE_PERSONAL_AREA, true)"
        />
        <NButton :btn-title="loginBtnData"
                 :left-icon="loginBtnData.toLowerCase()"
                 @btn-click="openModalAndLogout"/>
      </div>
    </div>
    <div class="header__line"/>

    <div class="modal" v-if="isLoginModalOpen && !isAuth">
      <div class="modal__body">
        <img
            src="../assets/svg/close-icon.svg"
            class="modal__close"
            @click="toggleModal(false)"/>
        <h2 class="modal__title">Login</h2>
        <p class="modal__text">Enter your email and password to login.</p>
        <div class="modal__roles">
          <div
              v-for="role in roles"
              class="modal__role "
              :class="{'modal__role_active': selectedRole === role}"
              @click="changeRole(role)"
          >
            {{ role }}
          </div>
        </div>

        <div class="modal__label">Email</div>
        <input class="modal__input" v-model="email"/>

        <div class="modal__label">Password</div>
        <input class="modal__input" v-model="password"/>

        <div class="modal__error"> {{ authError }}</div>

        <NButton
            btn-title="Login"
            class="modal__btn"
            @btn-click="loginLogout"/>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  margin-bottom: 12px;
}

.header__wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header__wrapper-admin {
  padding-top: 25px;
  padding-bottom: 15px;
}

.header__logo {
  cursor: pointer;
}

.header__list {
  display: flex;
  gap: 50px;
  padding: 0;
  margin: 0;
}

.header__item {
  font-size: 16px;
  font-family: 'CeraPro-Regular', sans-serif;
  cursor: pointer;
  padding-top: 33px;
  padding-bottom: 25px;
  border-bottom: 3px solid transparent;
  transition: 0.3s all;
  color: #3D3D3D;
}

.header__item:hover {
  transform: scale(1.05);
}

.header__item:active {
  color: #46A358;
}

.header__item_active {
  font-family: 'CeraPro-Bold', sans-serif;
  font-weight: 700;
  border-bottom: 3px solid #46A358;
}

.header__login {
  display: flex;
  align-items: center;
  gap: 30px;
}

.header__line {
  height: 1px;
  width: 100%;
  background-color: rgba(70, 163, 88, 0.5);
}

.header__cart {
  position: relative;
  z-index: 10;
  cursor: pointer;
}

.header__home {
  width: 24px;
  height: 24px;
  cursor: pointer;
}

.header__purchases {
  position: absolute;
  top: -1px;
  right: -5px;
  z-index: 20;
  min-width: 10px;
  min-height: 10px;
  padding: 2px;
  background-color: #46A358;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  font-size: 10px;
  font-family: 'CeraPro-Medium', sans-serif
}

.modal {
  position: fixed;
  background-color: rgba(10, 13, 18, 0.2);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
}

.modal__body {
  position: relative;
  width: 400px;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  padding: 32px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.modal__close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 20px;
  height: 20px;
  cursor: pointer;
  transition: 0.5s all;
}

.modal__close:hover {
  scale: 1.1;
}

.modal__title {
  color: #3D3D3D;
  font-family: 'CeraPro-Medium', sans-serif;
  font-weight: 500;
  text-align: center;
  margin-bottom: 20px;
}

.modal__text,
.modal__error {
  color: #3D3D3D;
  font-family: 'CeraPro-Regular', sans-serif;
  font-size: 13px;
  font-weight: 400;
  line-height: 16px;
  margin-bottom: 14px;
  text-align: center;
}

.modal__roles {
  padding: 8px;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.modal__role {
  padding: 10px 16px;
  color: #46A358;
  cursor: pointer;
  border: 1px solid #46A358;
  transition: 0.2s all;
}

.modal__role:first-of-type {
  border-radius: 8px 0 0 8px;
}

.modal__role:last-of-type {
  border-radius: 0 8px 8px 0;
}

.modal__role_active {
  background-color: #46A358;
  color: #fff;
}

.modal__label {
  font-size: 15px;
  font-family: 'CeraPro-Regular', sans-serif;
  font-weight: 400;
  color: #3D3D3D;
  margin-bottom: 10px;
  background-repeat: no-repeat;
  background-position: right top;
  display: block;
  align-self: flex-start;
}

.modal__input {
  border: 1px solid #EAEAEA;
  border-radius: 5px;
  width: 95%;
  margin-bottom: 10px;
  color: #3D3D3D;
}

.modal__error {
  color: red;
}

.modal__btn {
  width: 100%;
  margin-top: 20px
}
</style>
