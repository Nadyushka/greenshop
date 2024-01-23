<script setup lang="ts">

import NButton from "~/components/ui/NButton.vue"
import {usePlantsStore} from "~/store/plants";
import CarePostForm from "~/components/admin/CarePostForm.vue";

const plantsStore = usePlantsStore()
const { plantCareData } = storeToRefs(plantsStore)

const blogInput = ref('')

const selectedPost = computed(() => {
  if (blogInput.value) {
    return [...plantCareData.value].filter(post => post.title.toLowerCase().includes(blogInput.value.toLowerCase()))
  }

  return plantCareData.value
})

const editPostId = ref()
const isModalOpen = ref(false)

const editPostData = (id: string) => {
  editPostId.value = id
  isModalOpen.value = true
}

const closeModal = () => {
  editPostId.value = null
  isModalOpen.value = false
}

const addPost = () =>  isModalOpen.value = true
</script>

<template>
  <main class="blogs">
    <div class="blogs__action">
      <input
          v-model="blogInput"
          class="blogs__find"
          placeholder="Write title to find a post"/>
      <NButton btn-title="Add post" @btn-click="addPost"/>
    </div>
    <div
        v-if="selectedPost.length"
        class="blogs__wrapper"
        :class="{
          'blogs__wrapper_short': selectedPost.length % 4 !== 0
        }"
    >

      <PlantCarePost
          v-for="post in selectedPost"
          :short-form="true"
          :key="post.id"
          :title="post.title"
          :text="post.text"
          :img="post.img"
          :id="post.id"
          :full-text="post.fullText"
          :admin-mode="true"
          @edit-post="id => editPostData(id)"
      />
    </div>
    <div
        v-if="!selectedPost.length"
        class="blogs__mo-data">
      No data was found :(
    </div>

    <CarePostForm
        v-if="isModalOpen"
        :id="editPostId"
        @close-modal="closeModal"
    />

  </main>
</template>

<style scoped>
.blogs {
  padding-bottom: 50px;
}

.blogs__action {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.blogs__wrapper {
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.blogs__wrapper_short {
  gap: 16px;
  justify-content: flex-start;
}

.blogs__find {
  width: 30%;
  border-bottom: 1px solid #ACACAC;
}

.blogs__mo-data {
  padding-top: 50px;
  text-align: center;
  font-family: 'CeraPro-Regular', sans-serif;
  font-size: 20px;
}
</style>
