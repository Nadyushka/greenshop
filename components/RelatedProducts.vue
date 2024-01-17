<script setup lang="ts">
const plantsData = [
  {
    id: '1',
    title: 'Barberton Daisy',
    price: 119,
    discount: 0,
    addedToCart: false,
    saved: false,
    img: 'plant_one.png',
  },
  {
    id: '2',
    title: 'Angel Wing Begonia',
    price: 169,
    discount: 0,
    addedToCart: true,
    saved: false,
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
    saved: false,
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
]

interface PropsType {
  title: string
}

const {title} = defineProps<PropsType>()
const isTouchedPlant = ref('')
const setTouchedPlant = (id: string) => isTouchedPlant.value = id

const plantItemWidth = ref(215)
const setWidth = (width: number) => plantItemWidth.value = width

const slides = [0, 1, 2];
const activeSlide = ref(1);
const slideTranslateX = ref(plantItemWidth.value * activeSlide.value);

const setActiveSlide = (id: number) => {
  activeSlide.value = id;
  slideTranslateX.value = id * plantItemWidth.value;
};
</script>

<template>
  <div class="related">
    <p class="related__title"> {{ title }}</p>
    <div class="main__plants-slider">
      <div
          class="main__plants-wrapper"
          :style="{ transform: `translateX(${-slideTranslateX}px)` }"
      >
        <PlantItem
            style="flex: 0 0 calc(20% - 27px)"
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
        />
      </div>
    </div>
    <div class="related__slide">
      <div
          v-for="slide in slides"
          class="related__item"
          :class="{'related__item_active': slide === activeSlide}"
          @click="setActiveSlide(slide)"
      />
    </div>
  </div>

</template>

<style scoped>
.related {
  margin-bottom: 128px;
}

.main__plants-slider {
  overflow: hidden;
  margin-bottom: 50px;
}

.main__plants-wrapper {
  display: flex;
  gap: 26px;
  transition: 0.5s all;
}

.related__title {
  font-size: 17px;
  font-family: 'CeraPro-Bold', sans-serif;
  font-weight: 700;
  padding-bottom: 11px;
  margin-bottom: 44px;
  border-bottom: 1px solid rgba(70, 163, 88, 0.5);
  color: #46A358;
}

.related__slide {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.related__item {
  height: 12px;
  width: 12px;
  border-radius: 100%;
  border: 1px solid #46A358;
  cursor: pointer;
  transition: 0s all;
}

.related__item_active {
  background-color: #46A358;
  transition: 0.5s all;
}
</style>
