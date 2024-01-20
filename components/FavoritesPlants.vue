<script setup lang="ts">
import {usePlantsStore} from "~/store/plants";

const plantsStore = usePlantsStore()
const { wishlist } = storeToRefs(plantsStore)

const isTouchedPlant = ref('2')
const setTouchedPlant = (id: string) => isTouchedPlant.value = id
console.log(wishlist.value)
</script>

<template>
  <div class="main__plants-wrapper">
    <PlantItem
        v-for="plant in wishlist"
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
</template>

<style scoped>
.main__plants-wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 37px;
  margin-bottom: 90px;
}
</style>
