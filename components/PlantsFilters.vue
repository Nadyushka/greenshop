<script setup lang="ts">

import NButton from "~/components/ui/NButton.vue";

const categories = [
  {title: "House Plants", total: 33},
  {title: "Potter Plants", total: 12},
  {title: "Seeds", total: 65},
  {title: "Small Plants", total: 39},
  {title: "Big Plants", total: 23},
  {title: "Succulents", total: 17},
  {title: "Trerrariums", total: 19},
  {title: "Gardening", total: 23},
  {title: "Accessories", total: 18},
]

const sizes = [
  {size: 'Small', total: 19},
  {size: 'Medium', total: 86},
  {size: 'Large', total: 78},
]

const selectedCategory = ref(0)
const setSelectedCategory = (idx: number) => selectedCategory.value = idx

const selectedSize = ref(-1)
const setSelectedSize = (idx: number) => selectedSize.value = idx

const minPrice = ref<null | undefined>()
const maxPrice = ref<null | undefined>()
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

      <NButton btn-title="Filter" style="margin-bottom: 46px"/>

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

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
}
</style>
