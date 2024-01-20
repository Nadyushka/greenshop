<script setup lang="ts">
import { usePlantsStore } from "~/store/plants";

const plantsStore = usePlantsStore()
const { shownPlants } = storeToRefs(plantsStore)

const isTouchedPlant = ref('0')
const setTouchedPlant = (id: string) => isTouchedPlant.value = id

const types = ['All Plants', 'New Arrivals', 'Sale']
const selectedType = ref('All Plants')
const setSelectedType = async (type: string) => {
  await plantsStore.setPage(1)
  await plantsStore.setProductStatus(type)
  selectedType.value = type
}
</script>

<template>
  <section class="main__shop">
    <div class="main__shop-wrapper">
      <PlantsFilters/>
      <div class="main__plants">
        <div class="main__plants-types">
          <div v-for="type in types"
               class="main__plants-type"
               :class="{'main__plants-type_active': type === selectedType}"
               @click="setSelectedType(type)"
          >
            {{ type }}
          </div>
        </div>
        <div class="main__plants-wrapper">
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
          />
        </div>
        <ShopPagination/>
      </div>
    </div>

  </section>
</template>

<style scoped>
.main__shop {
  margin-bottom: 94px;
  padding-top: 20px;
}

.main__shop-wrapper {
  display: flex;
  gap: 50px;
}

.main__plants-wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 37px;
  margin-bottom: 90px;
}

.main__plants-types {
  display: flex;
  gap: 37px;
  margin-bottom: 31px;
}

.main__plants-type {
  font-size: 15px;
  font-family: 'CeraPro-Regular', sans-serif;
  font-weight: 400;
  color: #3D3D3D;
  transition: 0.5s all;
  border-bottom: 1px solid transparent;
  padding-bottom: 7px;
  cursor: pointer;
}

.main__plants-type_active {
  color: #46A358;
  font-family: 'CeraPro-Bold', sans-serif;
  font-weight: 700;
  border-bottom: 1px solid #46A358;
  transition: 0s all;
}
</style>
