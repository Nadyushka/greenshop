<script setup lang="ts">
const plantsData = ref([
  {
    id: '1',
    title: 'Barberton Daisy',
    price: 119,
    discount: 0,
    addedToCart: false,
    saved: true,
    img: 'plant_one.png',
  },
  {
    id: '2',
    title: 'Angel Wing Begonia',
    price: 169,
    discount: 0,
    addedToCart: true,
    saved: true,
    img: 'plant_two.png',
  },
  {
    id: '3',
    title: 'African Violet',
    price: 229,
    discount: 13,
    addedToCart: false,
    saved: false,
    img: 'plant_three.png',
  },
  {
    id: '4',
    title: 'Bird\'s Nest Fern',
    price: 99,
    discount: 0,
    addedToCart: false,
    saved: true,
    img: 'plant_four.png',
  },
  {
    id: '5',
    title: 'Broadleaf Lady Palm',
    price: 59,
    discount: 0,
    addedToCart: false,
    saved: false,
    img: 'plant_five.png',
  },
  {
    id: '6',
    title: 'Chinese Evergreen',
    price: 39,
    discount: 0,
    addedToCart: false,
    saved: false,
    img: 'plant_six.png',
  },
  {
    id: '7',
    title: 'Bird\'s Nest Fern',
    price: 99,
    discount: 0,
    addedToCart: false,
    saved: false,
    img: 'plant_seven.png',
  },
  {
    id: '8',
    title: 'Broadleaf Lady Palm',
    price: 59,
    discount: 0,
    addedToCart: false,
    saved: false,
    img: 'plant_eight.png',
  },
  {
    id: '9',
    title: 'Chinese Evergreen',
    price: 39,
    discount: 0,
    addedToCart: false,
    saved: false,
    img: 'plant_nine.png',
  }
].filter(plant => plant.saved))

const isTouchedPlant = ref('2')
const setTouchedPlant = (id: string) => isTouchedPlant.value = id


const toggleFavoriteItem = (id: string, selected: boolean) => {
  plantsData.value = plantsData.value
      .map( plant => plant.id === id ? ({ ...plant, saved: !selected }) : plant)
      .filter(plant => plant.saved)
}

</script>

<template>
  <div class="main__plants-wrapper">
    <PlantItem
        v-for="plant in plantsData"
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
        @toggle-favorite-plant="toggleFavoriteItem(plant.id, plant.saved)"
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
