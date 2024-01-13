<script setup lang="ts">
import NButton from "~/components/ui/NButton.vue";

const blogPostsData = [
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

  }]
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

const router = useRouter()

const openShopPage = () => router.push('shop')
</script>

<template>
  <main class="main">
    <section class="main__intro">
      <div class="main__intro-data">
        <h3 class="main__intro-title">Welcome to GreenShop</h3>
        <h1 class="main__main-title">Let’s Make a Better <span>Planet</span></h1>
        <p class="main__main-text">We are an online plant shop offering a wide range of cheap and trendy plants. Use our
          plants to create an
          unique Urban Jungle. Order your favorite plants!</p>
        <NButton
            btn-title="SHOP NOW"
            @btn-click="openShopPage"/>
      </div>
      <img src="@/assets/png/main_intro.png" alt="plant picture"/>
    </section>
    <section class="main__plant-care">
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
    </section>
    <section class="main__blogs">
      <h2 class="main__blogs-title">Our Blog Posts</h2>
      <p class="main__blogs-description">We are an online plant shop offering a wide range of cheap and trendy
        plants. </p>
      <div class="main__blogs-block">
        <MainBlogPost
            v-for="post in blogPostsData"
            :key="post.id"
            :short-form="true"
            :id="post.id"
            :date="post.date"
            :length="post.length"
            :img="post.img"
            :title="post.title"
            :text="post.text"
            :full-text="post.fullText"
        />
      </div>
    </section>
  </main>
</template>

<style scoped>
.main {
  max-width: 1202px;
  margin: 0 auto 100px;
}

.main__intro {
  display: flex;
  justify-content: space-between;
  background: linear-gradient(97.77deg, rgba(245, 245, 245, 0.5) -23.46%, rgba(245, 245, 245, 0.5) 107.51%);
  padding-left: 40px;
}

.main__intro-data {
  padding-top: 68px;
}

.main__intro-title {
  font-size: 14px;
  font-family: 'CeraPro-Medium', sans-serif;
  color: #3D3D3D;
  text-transform: uppercase;
  margin-bottom: 7px;
  letter-spacing: 1.4px;
}

.main__main-title {
  font-size: 70px;
  font-family: 'CeraPro-Black', sans-serif;
  line-height: 70px;
  max-width: 530px;
  text-transform: uppercase;
  margin-bottom: 5px;
}

.main__main-text {
  max-width: 557px;
  color: #727272;
  font-family: 'CeraPro-Regular', sans-serif;
  line-height: 24px;
  margin-bottom: 55px;
  font-size: 14px;
}

.main__main-title span {
  color: #46A358;
}

.main__plant-care {
  display: flex;
  justify-content: space-between;
  gap: 28px;
  max-width: 1202px;
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
}
</style>
