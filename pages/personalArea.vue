<script setup lang="ts">

import PersonalData from "~/components/PersonalData.vue";

const breadCrumbs = ['Personal Data', 'Addresses', 'Favorites']
const selectedBreadCrumb = ref('Personal Data')

const setSelectedBreadCrumb = (breadCrumb: string) => selectedBreadCrumb.value = breadCrumb

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

    <div v-if="selectedBreadCrumb === 'Favorites'" class="addresses">
      <FavoritesPlants/>
    </div>

  </main>
</template>

<style scoped>
.personal__breadCrumbs {
  display: flex;
  gap: 16px;
  padding-top: 20px;
  padding-bottom: 20px;
}

.personal__item {
  font-size: 15px;
  font-family: 'CeraPro-Regular', sans-serif;
  font-weight: 400;
  color: #3D3D3D;
  transition: 0.5s all;
  border-bottom: 1px solid transparent;
  padding-bottom: 7px;
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
