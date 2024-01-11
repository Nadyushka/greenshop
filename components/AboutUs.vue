<script setup lang="ts">
interface PropsType {
  img: string
  title: string
  text: string
  lastItem: boolean
}

const {title, text, img, lastItem} = defineProps<PropsType>()
const imgUrl = () => `_nuxt/assets/svg/${img}.svg`
</script>

<template>
  <div
      class="about-item"
      :class="{'about-item_left-border': !lastItem}"
  >
    <img :src="imgUrl()" class="about-item__img"/>
    <h4 class="about-item__title">{{ title }}</h4>
    <p class="about-item__text"> {{ text }}</p>
  </div>
</template>

<style scoped>
.about-item {
  padding-left: 24px;
  padding-right: 34px;
  display: inline-block;
  max-width: 350px;
}

.about-item__img {
  margin-bottom: 15px;
}

.about-item__title {
  margin-bottom: 9px;
  font-family: 'CeraPro-Bold', sans-serif;
  font-size: 17px;
  font-weight: 700;
}

.about-item__text {
  font-family: 'CeraPro-Regular', sans-serif;
  font-size: 14px;
  line-height: 22px;
  color: #727272;
}

.about-item_left-border {
 border-right: 1px solid rgba(70, 163, 88, 0.1);
}
</style>
