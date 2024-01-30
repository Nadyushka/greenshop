<script setup lang="ts">
import NButton from "~/components/ui/NButton.vue"
import {usePlantsStore} from "~/store/plants";
import PlantForm from "~/components/admin/PlantForm.vue";

const plantsStore = usePlantsStore()
const { shownPlants } = storeToRefs(plantsStore)

const plantInput = ref('')

const editPlantId = ref()
const isModalOpen = ref(false)

const isTouchedPlant = ref(shownPlants.value?.plants[0]?.id ?? undefined)
const setTouchedPlant = (id: string) => isTouchedPlant.value = id

const editPostData = (id: string) => {
  editPlantId.value = id
  isModalOpen.value = true
}

const closeModal = () => {
  editPlantId.value = null
  isModalOpen.value = false
}

const addPost = () => isModalOpen.value = true

watch(() => isModalOpen.value,
    (value) => {
      const body = document.body
      if (value) {
        body.style.overflow = 'hidden'
      } else {
        body.style.overflow = 'auto'
      }
    })

watch(
    () => plantInput.value,
    () => {
      isTouchedPlant.value = shownPlants.value?.plants[0]?.id ?? undefined
      plantsStore.$patch(state => state.plantTitle = plantInput.value)
    })
</script>

<template>
  <main class="blogs">
    <div class="blogs__action">
      <input
          v-model="plantInput"
          class="blogs__find"
          placeholder="Write title to find a plant"/>
      <NButton btn-title="Add plant" @btn-click="addPost"/>
    </div>
    <div
        v-if="shownPlants.length"
        class="plants__wrapper"
        :class="{
          'blogs__wrapper_short': shownPlants.length % 4 !== 0
        }"
    >

      <PlantItem
          v-for="plant in shownPlants.plants"
          :key="plant.id"
          :title="plant.title"
          :price="plant.price"
          :discount="plant.discount"
          :added-to-cart="plant.addedToCart"
          :saved="plant.saved"
          :img="plant.img"
          :id="plant.id"
          :is-touched="isTouchedPlant === plant.id"
          @click="setTouchedPlant(plant.id)"
          :admin-mode="true"
          @edit-post="id => editPostData(id)"
      />

    </div>

    <ShopPagination/>

    <div
        v-if="!shownPlants.length"
        class="blogs__mo-data">
      No plants were found :(
    </div>


    <PlantForm
        v-if="isModalOpen"
        :id="editPlantId"
        @close-modal="closeModal"/>

  </main>
</template>

<style scoped>
.blogs {
  padding-bottom: 50px;
}

.blogs__action {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.plants__wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 0 auto 90px;
  padding-top: 50px;
}

.blogs__wrapper_short {
  gap: 16px;
  justify-content: flex-start;
}

.blogs__find {
  width: 30%;
  border-bottom: 1px solid #ACACAC;
}

.blogs__mo-data {
  padding-top: 50px;
  text-align: center;
  font-family: 'CeraPro-Regular', sans-serif;
  font-size: 20px;
}
</style>
