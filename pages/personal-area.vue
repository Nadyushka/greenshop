<script setup lang="ts">

import PersonalData from "~/components/personal/PersonalData.vue";
import {useAuthStore} from "~/store/auth";
import FavoritesPlants from "~/components/personal/FavoritesPlants.vue";
import {ERouteName} from "~/shared/routes";

definePageMeta({
  name: ERouteName.PAGE_PERSONAL_AREA,
  middleware: ['auth'],
  layout: "default",
})

const breadCrumbs = ['Personal Data', 'Addresses', 'Wishlist']
const selectedBreadCrumb = ref('Personal Data')

const setSelectedBreadCrumb = (breadCrumb: string) => selectedBreadCrumb.value = breadCrumb

const authStore = useAuthStore()
const {isAuth, userRole} = storeToRefs(authStore)

const router = useRouter()

const checkIfUserAuthorised = () => {
  if (!isAuth.value && userRole.value !== 'buyer') {
    router.push('/')
  }
}

watch(() => [userRole.value, isAuth.value],
    () => {
      checkIfUserAuthorised()
    })

</script>

<template>
  <main class="personal">

    <div class="personal__breadCrumbs">
      <div
          v-for="breadCrumb in breadCrumbs"
          class="personal__item"
          :class="{'personal__item_active': selectedBreadCrumb == breadCrumb}"
          @click="setSelectedBreadCrumb(breadCrumb)"
      >
        {{ breadCrumb }}
      </div>
    </div>

    <div v-if="selectedBreadCrumb === 'Personal Data'" class="data">
      <PersonalData/>
    </div>

    <div v-if="selectedBreadCrumb === 'Addresses'" class="addresses">
      <PersonalAddresses/>
    </div>

    <div v-if="selectedBreadCrumb === 'Wishlist'" class="addresses">
      <FavoritesPlants/>
    </div>

  </main>
</template>

<style scoped>
.personal__breadCrumbs {
  display: flex;
  gap: 20px;
  padding-top: 20px;
  margin-bottom: 40px;
  border-bottom: 1px solid rgba(70, 163, 88, 0.5);
}

.personal__item {
  font-size: 15px;
  font-family: 'CeraPro-Regular', sans-serif;
  font-weight: 400;
  color: #3D3D3D;
  transition: 0.5s all;
  border-bottom: 1px solid transparent;
  padding-bottom: 16px;
  cursor: pointer;
}

.personal__item_active {
  color: #46A358;
  font-family: 'CeraPro-Bold', sans-serif;
  font-weight: 700;
  border-bottom: 1px solid #46A358;
  transition: 0s all;
}

</style>
