<script setup lang="ts">

import NButton from "~/components/ui/NButton.vue";
import { usePlantsStore } from "~/store/plants";

const plantsStore = usePlantsStore()

const categories = [
  {title: "House Plants", total: plantsStore.filteredPlants({filterType: 'type', filterValue: 'House Plants'})},
  {title: "Potter Plants", total: plantsStore.filteredPlants({filterType: 'type', filterValue: 'Potter Plants'})},
  {title: "Seeds", total: plantsStore.filteredPlants({filterType: 'type' , filterValue : 'Seeds'})},
  {title: "Small Plants", total: plantsStore.filteredPlants({filterType: 'type', filterValue : 'Small Plants'})},
  {title: "Big Plants", total: plantsStore.filteredPlants({filterType: 'type', filterValue: 'Big Plants'})},
  {title: "Succulents", total: plantsStore.filteredPlants({filterType: 'type', filterValue: 'Succulents'})},
  {title: "Trerrariums", total: plantsStore.filteredPlants({filterType: 'type', filterValue: 'Trerrariums'})},
]

const sizes = [
  {size: 'Small',  total: plantsStore.filteredPlants({filterType: 'size', filterValue: 'small'})},
  {size: 'Medium',  total: plantsStore.filteredPlants({filterType: 'size', filterValue: 'medium'})},
  {size: 'Large',  total: plantsStore.filteredPlants({filterType: 'size', filterValue: 'large'})},
]

const setSelectedCategory = (idx: number) => selectedCategory.value = idx

const minPrice = ref<number | null | undefined>()
const maxPrice = ref<number | null | undefined>()
const selectedCategory = ref(-1)
const selectedSize = ref(-1)

const setSelectedSize = async (idx: number) => {
  selectedSize.value = idx
}

const setFilters = () => {
  const sizeName: string | null = sizes[selectedSize.value]?.size ?? null

  plantsStore.setPage(1)

  plantsStore.setPlantsFilters({
    minPrice: minPrice.value ?? 0,
    maxPrice: maxPrice.value ?? 10000,
    plantType: categories[selectedCategory.value]?.title ?? null,
    plantSize: sizeName ?? null,
  })
}

const clearFilters = () => {
  minPrice.value = null
  maxPrice.value = null
  selectedCategory.value = -1
  selectedSize.value = -1

  plantsStore.setPage(1)

  plantsStore.setPlantsFilters({
    minPrice: 0,
    maxPrice: 10000,
    plantType: '',
    plantSize: '',
  })
}

onMounted(async () => {
  await plantsStore.removeAllFilters()
})
</script>

<template>
  <div class="filters">
    <div class="filters__wrapper">
      <h3 class="filters__title">Categories</h3>
      <div
          v-for="(category,idx) in categories"
          class="filters__type"
          @click="setSelectedCategory(idx)"
      >
        <div
            class="filters__name"
            :class="{'filters__name_active': categories[selectedCategory] === categories[idx]}">
          {{ category.title }}
        </div>
        <div
            class="filters__total"
            :class="{'filters__name_active': categories[selectedCategory] === categories[idx]}"
        >({{ category.total }})
        </div>
      </div>

      <h3 class="filters__title">Price Range, $</h3>
      <div class="filters__price-range">
        <input
            v-model.trim.number="minPrice"
            placeholder="from"
            class="filters__price-input"
            type="number"/>
        <input
            v-model.trim.number="maxPrice"
            placeholder="to"
            class="filters__price-input"
            type="number"/>
      </div>


      <div class="filters__btns">
        <button @click="clearFilters" class="filters__clear">Clear</button>
        <NButton btn-title="Filter" @btn-click="setFilters"/>
      </div>

      <h3 class="filters__title">Size</h3>
      <div
          v-for="(size,idx) in sizes"
          class="filters__type"
          @click="setSelectedSize(idx)"
      >
        <div
            class="filters__name"
            :class="{'filters__name_active': sizes[selectedSize] === sizes[idx]}"
        > {{ size.size }}
        </div>
        <div
            class="filters__total"
            :class="{'filters__name_active': sizes[selectedSize] === sizes[idx]}"
        >({{ size.total }})
        </div>
      </div>

      </div>
    <img src="~/assets/png/sale_baner.png" alt="sale image"/>
  </div>
</template>

<style scoped>

.filters {
  max-width: 304px;
}

.filters__wrapper {
  padding: 14px 18px 14px 24px;
  background-color: #FBFBFB;
}

.filters__title {
  font-family: 'CeraPro-Bold', sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: #3D3D3D;
  margin-bottom: 16px;
}

.filters__type {
  display: flex;
  justify-content: space-between;
  padding-left: 12px;
  margin-bottom: 36px;
  cursor: pointer;
}

.filters__name,
.filters__total {
  font-size: 15px;
  font-family: 'CeraPro-Regular', sans-serif;
  font-weight: 400;
  color: #3D3D3D;
}

.filters__name_active,
.filters__total_active {
  color: #46A358;
  font-weight: 700;
  font-family: 'CeraPro-Bold', sans-serif;
}

.filters__price-range {
  display: flex;
  gap: 5px;
  justify-content: space-between;
  margin-bottom: 16px;
}

.filters__price-input {
  width: calc(50% - 5px);
}

.filters__btns {
  display: flex;
  justify-content: space-between;
  margin-bottom: 46px;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
}

.filters__clear {
  background-color: #fff;
  border-radius: 6px;
  padding: 10px 17px;
  border: 1px solid #46A358;
  transition: 0.5s all;
  cursor: pointer;
  color: #46A358;
  font-family: 'CeraPro-Medium', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
}

.filters__clear:active {
  background-color: #46A358;
  border: 1px solid #46A358;
  color: #fff;
}
</style>
