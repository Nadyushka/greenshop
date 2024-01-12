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

const {title, text, id, shortForm} = defineProps<PropsType>()

const router = useRouter()

const openPlantCarePost = () => router.push(`/plantCare/${id}`)
</script>

<template>
  <div class="care-block">
    <div class="care-block__wrapper">
      <img src="@/assets/png/main_plant-care.png" class="care-block__left-img"/>
      <img :src="`_nuxt/assets/png/${img}`" class="care-block__plant-img"/>
      <div class="care-block__data">
        <h3>{{ title }}</h3>
        <p> {{ text }}</p>
        <NButton
            v-if="shortForm"
            btn-title="Find More"
            right-icon="arrow"
            @btn-click="openPlantCarePost"
        />
        <p
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
}
</style>
