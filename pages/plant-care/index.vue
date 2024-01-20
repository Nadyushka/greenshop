<script setup lang="ts">

import {usePlantsStore} from "~/store/plants";

const plantsStore = usePlantsStore()
const { plantCareData } = storeToRefs(plantsStore)

</script>

<template>
  <section class="main__blogs">
    <h1 class="main__blogs-title">Our Plant Care Advices</h1>
    <p class="main__blogs-description">We are an online plant shop sharing our deep knowledge in plant care. </p>
    <div class="main__blogs-block">
      <MainPlantCarePost
          v-for="post in plantCareData"
          :short-form="true"
          :key="post.id"
          :title="post.title"
          :text="post.text"
          :img="post.img"
          :id="post.id"
          :full-text="post.fullText"
      />
    </div>
  </section>
</template>

<style scoped>
.main__blogs {
  margin-bottom: 50px;
}

.main__blogs-title {
  font-size: 30px;
  font-family: 'CeraPro-Bold', sans-serif;
  font-weight: 900;
  margin-bottom: 15px;
  text-align: center;
  color: #3D3D3D;
}

.main__blogs-description {
  text-align: center;
  font-size: 14px;
  font-family: 'CeraPro-Regular', sans-serif;
  color: #727272;
  margin-bottom: 35px;
}

.main__blogs-block {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
}
</style>
