<script setup lang="ts">
import NButton from "~/components/ui/NButton.vue"

interface PropsType {
  title: string
  text: string
  id: string
  img: string
  shortForm: boolean
  fullText: string
}

const {title, text, id, shortForm, fullText, img} = defineProps<PropsType>()

const router = useRouter()

const openPlantCarePost = () => router.push(`/plantCare/${id}`)
</script>

<template>
  <div class="care-block">
    <div class="care-block__wrapper">
      <img src="@/assets/png/main_plant-care.png" class="care-block__left-img"/>
      <img :src="`_nuxt/assets/png/${img}`" class="care-block__plant-img"/>
      <div class="care-block__data">
        <h3 class="care-block__title">{{ title }}</h3>
        <p class="care-block__text"> {{ text }}</p>
        <div class="care-block__btn-wrapper" v-if="shortForm">
          <NButton
              btn-title="Find More"
              right-icon="arrow"
              @btn-click="openPlantCarePost"
          />
        </div>
        <p
            class="care-block__full-text"
            v-if="!shortForm"
        > {{ fullText }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.care-block {
  max-width: 586px;
  padding-top: 52px;
  min-height: 292px;
  flex: 1 1 calc(50% - 28px);
}

.care-block__wrapper {
  background-color: #FBFBFB;
  position: relative;
  display: flex;
  min-height: 250px;
  padding-right: 30px;
}

.care-block__left-img {
  position: absolute;
  bottom: 0;
  left: 0;
}

.care-block__plant-img {
  position: absolute;
  left: 50px;
  bottom: 15px;
}

.care-block__data {
  padding-left: 50%;
  padding-top: 37px;
  text-align: right;
}

.care-block__title {
  padding-left: 45%;
  font-size: 18px;
  font-family: 'CeraPro-Black', sans-serif;
  font-weight: 900;
  line-height: 24px;
  text-align: right;
  text-transform: uppercase;
  margin-bottom: 9px;
}

.care-block__text {
  font-size: 14px;
  font-family: 'CeraPro-Regular', sans-serif;
  line-height: 24px;
  color: #727272;
  margin-bottom: 25px;
}

.care-block__btn-wrapper {
 display: flex;
  justify-content: flex-end;
}
</style>
