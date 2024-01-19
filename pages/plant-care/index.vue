<script setup lang="ts">
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
  },
  {
    id: '3',
    title: 'Styling Trends & much more',
    text: 'We are an online plant shop offering a wide range of cheap and trendy plants',
    img: 'main_care-two.png',
    fullText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  {
    id: '4',
    title: 'Summer cactus & succulents',
    text: 'We are an online plant shop offering a wide range of cheap and trendy plants',
    img: 'main_care-one.png',
    fullText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
]
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
