<script setup lang="ts">
import NButton from "~/components/ui/NButton.vue"
import { usePlantsStore } from "~/store/plants"
import {ERouteName} from "~/shared/routes";

definePageMeta({
  name: ERouteName.PAGE_HOME,
})

const plantsStore = usePlantsStore()
const {shownPlants, plantCareData, blogPostsData} = storeToRefs(plantsStore)

const router = useRouter()

const openShopPage = () => router.push('shop')

const isTouchedPlant = ref('2')
const setTouchedPlant = (id: string) => isTouchedPlant.value = id

const types = ['All Plants', 'New Arrivals', 'Sale']
const selectedType = ref('All Plants')

const setSelectedType = async (type: string) => {
  await plantsStore.setPage(1)
  await plantsStore.setProductStatus(type)
  selectedType.value = type
}
</script>

<template>
  <main class="main">
    <section class="main__intro">
      <div class="main__intro-data">
        <h3 class="main__intro-title">Welcome to GreenShop</h3>
        <h1 class="main__main-title">Let’s Make a Better <span>Planet</span></h1>
        <p class="main__main-text">
          We are an online plant shop offering a wide range of cheap and trendy plants. Use our
          plants to create an unique Urban Jungle. Order your favorite plants!
        </p>
        <NButton
            btn-title="SHOP NOW"
            @btn-click="openShopPage"/>
      </div>
      <img src="/png/main_intro.png" alt="plant picture"/>
    </section>
    <section class="main__shop">
      <div class="main__shop-wrapper">
        <PlantsFilters/>
        <div class="main__plants">
          <div class="main__plants-types">
            <div v-for="type in types"
                 class="main__plants-type"
                 :class="{'main__plants-type_active': type === selectedType}"
                 @click="setSelectedType(type)"
            >
              {{ type }}
            </div>
          </div>
          <div class="main__plants-wrapper">
            <PlantItem
                v-for="plant in shownPlants.plants"
                :key="plant.id"
                :title="plant.title"
                :price="plant.price"
                :discount="plant.discount"
                :added-to-cart="plant.addedToCart"
                :saved="plant.saved"
                :img="plant.img"
                :id="plant.id"
                :is-touched="isTouchedPlant === plant.id"
                @click="setTouchedPlant(plant.id)"
            />
          </div>
          <ShopPagination v-if="shownPlants.length"/>

          <div v-if="!shownPlants.length" class="main__no-data">No plants were found :(</div>
        </div>
      </div>

    </section>
    <section class="main__plant-care">
      <PlantCarePost
          v-for="post in plantCareData.slice(0,2)"
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
        <BlogPost
            v-for="post in blogPostsData.slice(0, 4)"
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

.main__shop {
  margin-bottom: 94px;
}

.main__shop-wrapper {
  display: flex;
  gap: 50px;
}

.main__plants-wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 37px;
  margin-bottom: 90px;
}

.main__plants-types {
  display: flex;
  gap: 37px;
  margin-bottom: 31px;
}

.main__plants-type {
  font-size: 15px;
  font-family: 'CeraPro-Regular', sans-serif;
  font-weight: 400;
  color: #3D3D3D;
  transition: 0.5s all;
  border-bottom: 1px solid transparent;
  padding-bottom: 7px;
  cursor: pointer;
}

.main__plants-type_active {
  color: #46A358;
  font-family: 'CeraPro-Bold', sans-serif;
  font-weight: 700;
  border-bottom: 1px solid #46A358;
  transition: 0s all;
}


.main__intro {
  display: flex;
  justify-content: space-between;
  background: linear-gradient(97.77deg, rgba(245, 245, 245, 0.5) -23.46%, rgba(245, 245, 245, 0.5) 107.51%);
  padding-left: 40px;
  margin-bottom: 46px;
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

.main__no-data {
  font-family: 'CeraPro-Regular', sans-serif;
  color: #727272;
  font-size: 20px;
  width: 900px;
 text-align: center;
}
</style>
