<script setup lang="ts">

interface PostData {
  id: string;
  date: string;
  length: string;
  img: string;
  title: string;
  text: string;
  fullText: string;
}

const plantCareData = [
  {
    id: '1',
    title: 'Summer cactus & succulents',
    text: 'We are an online plant shop offering a wide range of cheap and trendy plants',
    img: 'main_care-one.png',
    fullText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  {
    id: '2',
    title: 'Styling Trends & much more',
    text: 'We are an online plant shop offering a wide range of cheap and trendy plants',
    img: 'main_care-two.png',
    fullText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  }
]

const route = useRoute()
const postId = route.params.id

const openPost = plantCareData.find(post => post.id === postId)

// onMounted(() => {
//   openPost.value = blogPostsData.find(post => post.id === postId)
// })

</script>

<template>
  <MainPlantCarePost
      :short-form="false"
      :key="openPost.id"
      :title="openPost.title"
      :text="openPost.text"
      :img="openPost.img"
      :id="openPost.id"
      :full-text="openPost.fullText"
  />
</template>
