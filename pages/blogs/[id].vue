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

const blogPostsData: PostData[] = [
  {
    id: '1',
    date: 'September 12',
    length: 'Read in 6 minutes',
    img: 'main__post-one.png',
    title: 'Cactus & Succulent Care Tips',
    text: 'Cacti are succulents are easy care plants for any home or patio.',
    fullText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

  },
  {
    id: '2',
    date: 'September 13',
    length: 'Read in 2 minutes',
    img: 'main__post-two.png',
    title: 'Top 10 Succulents for Your Home',
    text: 'Best in hanging baskets. Prefers medium to high light.',
    fullText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

  },
  {
    id: '3',
    date: 'September 15',
    length: 'Read in 3 minutes',
    img: 'main__post-three.png',
    title: 'Cacti & Succulent Care Tips',
    text: 'Cacti and succulents thrive in containers and because most are.',
    fullText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

  },
  {
    id: '4',
    date: 'September 15',
    length: 'Read in 2 minutes',
    img: 'main__post-four.png',
    title: 'Best Houseplants Room by Room',
    text: 'The benefits of houseplants are endless. In addition to.',
    fullText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

  },
  {
    id: '5',
    date: 'September 9',
    length: 'Read in 1 minutes',
    img: 'main__post-three.png',
    title: 'Cacti & Succulent Care Tips',
    text: 'Cacti and succulents thrive in containers and because most are.',
    fullText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

  },
  {
    id: '6',
    date: 'September 9',
    length: 'Read in 3 minutes',
    img: 'main__post-four.png',
    title: 'Top 10 Succulents for Your Home',
    text: 'Best in hanging baskets. Prefers medium to high light.',
    fullText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

  },
  {
    id: '7',
    date: 'September 10',
    length: 'Read in 1 minutes',
    img: 'main__post-two.png',
    title: 'Best Houseplants Room by Room',
    text: 'The benefits of houseplants are endless. In addition to.',
    fullText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

  },
  {
    id: '8',
    date: 'September 11',
    length: 'Read in 7 minutes',
    img: 'main__post-one.png',
    title: 'Cactus & Succulent Care Tips',
    text: 'Cacti are succulents are easy care plants for any home or patio.',
    fullText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

  },
]


const route = useRoute()
const postId = route.params.id

const openPost = ref({})

onMounted(() => {
  openPost.value = blogPostsData.find(post => post.id === postId)
})

</script>

<template>
  <MainBlogPost
      :key="openPost.id"
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

