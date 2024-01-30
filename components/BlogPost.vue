<script setup lang="ts">
import {usePlantsStore} from "~/store/plants";
import {ERouteName} from "~/shared/routes";

interface PropsType {
  id: string
  title: string
  text: string
  img: string
  date: string
  length: string
  fullText: string
  shortForm: boolean
  adminMode?: boolean
}

const props = defineProps<PropsType>()
const {id, img, date, length, title, text, shortForm, fullText, adminMode} = toRefs(props)

const plantsStore = usePlantsStore()

const emit = defineEmits<{ (emit: 'edit-post', id: string): void }>()

const deletePost = async () => {
  await plantsStore.deleteBlogPost(id.value)
}

const editPost = () => {
  emit('edit-post', id.value)
}
</script>

<template>
  <div class="blog" :class="{'blog-post_active': !shortForm}">
    <img
        v-if="shortForm"
        :src="`/blog/${img}`"
        class="blog__img" alt="blog img"
    />
    <div class="blog__wrapper">
      <div class="blog__date-length">
        <div class="blog__date">{{ date }}</div>
        <div class="blog__length">{{ length }}</div>
      </div>
      <h3 class="blog__title"> {{ title }}</h3>
      <p class="blog__text">{{ text }}</p>
      <NuxtLink
          :to="{
            name: ERouteName.PAGE_BLOGS_ID,
            params: {
              id
             }
          }"
          class="block__read"
          v-if="shortForm && !adminMode"
      >
        Read More
      </NuxtLink>
      <div v-if="adminMode" class="blog__admin">
        <img src="/svg/delete-icon.svg" @click="deletePost"/>
        <img src="/svg/edit-icon.svg" @click="editPost"/>
      </div>
      <p
          v-if="!shortForm"
          class="blog__full-text"
      > {{ fullText }}</p>
    </div>
  </div>
</template>

<style scoped>
.blog {
  width: 268px;
  background-color: #FBFBFB;
  padding-bottom: 13px;
}

.blog-post_active {
  width: auto;
  margin: 0 auto 16px;
}

.blog__img {
  margin-bottom: 8px;
  object-fit: contain;
}

.blog__wrapper {
  padding-left: 15px;
  padding-right: 15px;
}

.blog__date-length {
  display: flex;
}

.blog__date,
.blog__length {
  font-size: 14px;
  font-family: 'CeraPro-Medium', sans-serif;
  font-weight: 500;
  color: #46A358;
  width: max-content;
  line-height: 26px;
}

.blog__date {
  padding-right: 5px;
  border-right: 1px solid #46A358;
}

.blog__length {
  padding-left: 3px;
}

.blog__title {
  font-size: 26px;
  font-family: 'CeraPro-Bold', sans-serif;
  font-weight: 700;
  margin-bottom: 4px;
  line-height: 26px;
  color: #3D3D3D;
}

.blog__text,
.blog__full-text {
  color: #727272;
  font-size: 14px;
  font-family: 'CeraPro-Regular', sans-serif;
  line-height: 22px;
  margin-bottom: 7px;
}

.block__read {
  font-family: 'CeraPro-Medium', sans-serif;
  font-size: 14px;
  color: #3D3D3D;
  background-image: url('/svg/blogs-arrow.svg');
  background-position: 80px 5px;
  background-repeat: no-repeat;
  cursor: pointer;
  transition: 0.5s all;
  padding: 2px 23px 2px 2px;
}

.block__read:hover {
  font-size: 15px;
  background-position: 85px 5px;
}

.block__read:active {
  font-weight: 700;
}

.blog__admin {
  display: flex;
  justify-content: space-between;
  margin-top: auto;
}

.blog__admin img {
  width: 16px;
  height: 16px;
  cursor: pointer;
  transition: 0.5s all;
}

.blog__admin img:hover {
  scale: 1.1;
}
</style>
