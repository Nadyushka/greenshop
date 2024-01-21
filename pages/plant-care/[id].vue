<script setup lang="ts">

import {usePlantsStore} from "~/store/plants";

const plantsStore = usePlantsStore()
const { plantCareData } = storeToRefs(plantsStore)

const route = useRoute()
const postId = route.params.id

const openPost = ref({})

onMounted(() => {
  openPost.value = plantCareData.value.find(post => post.id === postId)
})

</script>

<template>
  <PlantCarePost
      :short-form="false"
      :key="openPost.id"
      :title="openPost.title"
      :text="openPost.text"
      :img="openPost.img"
      :id="openPost.id"
      :full-text="openPost.fullText"
  />
</template>
