<script setup lang="ts">
import NButton from "~/components/ui/NButton.vue";

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
      <div class="personal__row">
        <div>
          <div class="personal__label">First Name</div>
          <input class="personal__input"/>
        </div>
        <div>
          <div class="personal__label">Last Name</div>
          <input class="personal__input"/>
        </div>
      </div>
      <div class="personal__row">
        <div>
          <div class="personal__label">Email</div>
          <input class="personal__input"/>
        </div>
        <div>
          <div class="personal__label">Phone</div>
          <input class="personal__input"/>
        </div>
      </div>
      <div class="personal__label">Password</div>
      <input class="personal__input"/>

      <NButton btn-title="Save Personal Data" style="margin-bottom: 16px"/>
    </div>

    <div v-if="selectedBreadCrumb === 'Addresses'" class="addresses">
      Addresses
    </div>

    <div v-if="selectedBreadCrumb === 'Favorites'" class="addresses">
      Favorites
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

.personal__row {
  display: flex;
  gap: 10px;
}

.personal__label {
  font-size: 15px;
  font-family: 'CeraPro-Regular', sans-serif;
  font-weight: 400;
  color: #3D3D3D;
  margin-bottom: 10px;
}

.personal__input {
  border-radius: 3px;
  border: 1px solid #EAEAEA;
  margin-bottom: 10px;
}
</style>
