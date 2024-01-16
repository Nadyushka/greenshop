<script setup lang="ts">
import NButton from "@/components/ui/NButton.vue"

const isLoginModalOpen = ref<boolean>(false)
const activeListItem = ref('Home')

const openLoginModal = (isLoginModalOpened: boolean) => isLoginModalOpen.value = isLoginModalOpened

const headerListItems = ['Home', 'Shop', 'Plant Care', 'Blogs']

const linkTransformer = (link: string) => {
  setCorrectHeaderActiveItem()
  if (link === 'Home') {
    activeListItem.value = 'Home'
    router.push('/')
  } else if (link === 'Plant Care') {
    router.push('/plantCare')
  } else {
    router.push(`/${link.toLowerCase()}`)
  }
}

const route = useRoute()
const router = useRouter()

const openToMainPage = () => {
  if (route.path === '/') return

  router.push('/')
}

const setCorrectHeaderActiveItem = () => {
  if (route.path.slice(1) === 'personalArea') {
    activeListItem.value = ''
    return
  }

  if (activeListItem.value.toLowerCase() !== route.path.slice(1).toLowerCase()) {
    const activeHeaderItem = [...headerListItems].filter(item => item.includes(route.path.slice(2, 4)))
    activeListItem.value = activeHeaderItem[0]
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

const openPersonalArea = () => router.push('/personalArea')
</script>

<template>
  <header class="header">
    <div class="header__wrapper">
      <img
          src="@/assets/svg/logo.svg"
          alt="logo"
          class="header__logo"
          @click="openToMainPage"
      />
      <nav class="header__nav">
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
        <div class="header__cart">
          <img src="@/assets/svg/cart-icon.svg" alt="cart icon"/>
          <div class="header__purchases"> 6</div>
        </div>
        <img
            class="header__home"
            src="@/assets/svg/home-icon.svg"
            alt="home icon"
            @click="openPersonalArea"
        />
        <NButton btn-title="Login" left-icon="login" @btn-click="openLoginModal(true)"/>
      </div>
    </div>
    <div class="header__line"/>
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
</style>
