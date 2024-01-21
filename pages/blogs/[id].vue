<script setup lang="ts">
import {usePlantsStore} from "~/store/plants";

const plantsStore = usePlantsStore()
const { blogPostsData } = storeToRefs(plantsStore)

const route = useRoute()
const postId = route.params.id

const openPost = ref({})

onMounted(() => {
  openPost.value = blogPostsData.value.find(post => post.id === postId)
})
</script>

<template>
  <BlogPost
      :short-form="false"
      :id="openPost.id"
      :date="openPost.date"
      :length="openPost.length"
      :img="openPost.img"
      :title="openPost.title"
      :text="openPost.text"
      :full-text="openPost.fullText"
  />
</template>

