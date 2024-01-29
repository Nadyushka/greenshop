<script setup lang="ts">
import { useAuthStore } from "~/store/auth"

import PlantsAdmin from "~/components/admin/PlantsAdmin.vue"
import PlantsCareAdmin from "~/components/admin/PlantsCareAdmin.vue"
import BlogsAdmin from "~/components/admin/BlogsAdmin.vue"
import { usePlantsStore } from "~/store/plants"
import {ERouteName} from "~/shared/routes";

definePageMeta({
  name: ERouteName.PAGE_ADMIN,
  middleware: ['auth'],
  layout: "admin",
})

const authStore = useAuthStore()
const {isAuth, userRole} = storeToRefs(authStore)

const plantsStore = usePlantsStore()

const router = useRouter()

const breadCrumbs = ['Plants', 'Plant Care', 'Blogs']
const selectedBreadCrumb = ref('Plants')

const setSelectedBreadCrumb = (breadCrumb: string) => selectedBreadCrumb.value = breadCrumb

const checkIfUserAuthorised = () => {
   if (!isAuth.value && userRole.value !== 'admin') {
    router.push('/')
  }
}

watch(() => [userRole.value, isAuth.value],
    () => {
      checkIfUserAuthorised()
    })

onMounted(async () => {
  await plantsStore.removeAllFilters()
})

</script>

<template>
  <main class="admin">
    <div class="admin__breadCrumbs">
      <div
          v-for="breadCrumb in breadCrumbs"
          class="admin__item"
          :class="{'admin__item_active': selectedBreadCrumb == breadCrumb}"
          @click="setSelectedBreadCrumb(breadCrumb)"
      >
        {{ breadCrumb }}
      </div>
    </div>

    <div v-if="selectedBreadCrumb === 'Plants'" class="data">
      <PlantsAdmin/>
    </div>

    <div v-if="selectedBreadCrumb === 'Plant Care'" class="addresses">
      <PlantsCareAdmin/>
    </div>

    <div v-if="selectedBreadCrumb === 'Blogs'" class="addresses">
      <BlogsAdmin/>
    </div>

  </main>
</template>

<style scoped>
.admin__breadCrumbs {
  display: flex;
  gap: 20px;
  padding-top: 20px;
  margin-bottom: 40px;
  border-bottom: 1px solid rgba(70, 163, 88, 0.5);
}

.admin__item {
  font-size: 15px;
  font-family: 'CeraPro-Regular', sans-serif;
  font-weight: 400;
  color: #3D3D3D;
  transition: 0.5s all;
  border-bottom: 1px solid transparent;
  padding-bottom: 16px;
  cursor: pointer;
}

.admin__item_active {
  color: #46A358;
  font-family: 'CeraPro-Bold', sans-serif;
  font-weight: 700;
  border-bottom: 1px solid #46A358;
  transition: 0s all;
}

</style>
