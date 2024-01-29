<script setup lang="ts">
import NButton from "~/components/ui/NButton.vue"
import {usePlantsStore} from "~/store/plants";
import {useAuthStore} from "~/store/auth";
import {ERouteName} from "~/shared/routes";

definePageMeta({
  name: ERouteName.PAGE_SHOP_ID,
  middleware: ['auth'],
  layout: "default",
})

const plantsStore = usePlantsStore()
const {cartItemsData} = storeToRefs(plantsStore)

const authStore = useAuthStore()
const {isAuth, userRole} = storeToRefs(authStore)

const route = useRoute()
const plantId = route.params.id as string

const plantData = computed(() => plantsStore.selectedPlant(plantId))
const mainImg = ref('0deg')

const setMainImg = (degree: string) => mainImg.value = degree

const degrees = ['0deg', '90deg', '180deg', '270deg']

const stars = 5

const plantQuantity = computed(() => cartItemsData.value?.find(plant => plant.id === plantId)?.pcs ?? 1)

const addRemoverProductToWishlist = async () => {
  if (plantData.value?.saved) {
    await plantsStore.removeProductFromWishlist(plantId)
  } else {
    await plantsStore.addProductToWishlist(plantId)
  }
}

const addToCart = () => {
  if (cartItemsData.value.find(plant => plant.id === plantId)) return

  const plantInfo = {
    id: plantData.value!.id,
    title: plantData.value!.title,
    img: plantData.value!.img,
    price: plantData.value!.price,
    pcs: plantQuantity.value,
  }
  plantsStore.addProductToCart(plantInfo)
}

const removeFromCart = () => {
  plantsStore.removeProductFromCart(plantId)
}

const increasePcsInCart = () => {
  plantsStore.changePcsInCart(plantId, true)
}

const router = useRouter()

const buyNow = async () => {
  await plantsStore.buyPlantNow(plantId, plantQuantity.value)
  await router.push('/shop/cart')
}
</script>

<template>
  <main class="plant">
    <h2 class="plant__bread-crumbs">Shop / <span>Plant</span></h2>
    <div class="plant__top">
      <div class="plant__imgs">
        <div class="plant__small-imgs">
          <img
              v-for="degree in degrees"
              :src="`http://localhost:3000/_nuxt/assets/png/plants/${plantData.img}`"
              alt="plant image"
              class="plant__small-img"
              :class="{
                'plant__small-img_active': degree == mainImg
              }"
              @click="setMainImg(degree)"
          />
        </div>
        <img
            class="plant__main-img"
            :src="`http://localhost:3000/_nuxt/assets/png/plants/${plantData.img}`"
            :style="{
               transform: `rotate(${mainImg})`
        }"
        />
      </div>

      <div class="plant__info">
        <h1 class="plant__title"> {{ plantData.title }}</h1>
        <div class="plant__price-and-rate">
          <div class="plant__price">${{ plantData.price }},00</div>
          <div class="plant__rate" v-if="plantData.rate">
            <div v-for="star in stars">
              <img v-if="star <= plantData.rate" src="@/assets/svg/filled-star.svg"/>
              <img v-else src="@/assets/svg/empty-star.svg"/>
            </div>
          </div>
        </div>
        <h3 class="plant__short-description">Short Description:</h3>
        <p class="plant__short-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fringilla augue nec
          est tristique auctor.
          Donec
          non est at libero vulputate rutrum. Morbi ornare lectus quis justo gravida semper. Nulla tellus mi,
          vulputate
          adipiscing cursus eu, suscipit id nulla.
        </p>
        <div class="plant__order">
          <div class="order">
            <div class="order__less" @click="plantsStore.changePcsInCart(plantId, false)">-</div>
            <div class="order__pcs">{{ plantQuantity }}</div>
            <div class="order__more" @click="increasePcsInCart">+</div>
          </div>
          <NButton btn-title="Buy NOW" @click="buyNow"/>
          <button v-if="!plantData.addedToCart" class="plant__add-btn" @click="addToCart">Add to cart</button>
          <button v-if="plantData.addedToCart" class="plant__add-btn" @click="removeFromCart">Added to cart</button>

          <div
              v-if="isAuth && userRole === 'buyer'"
              class="plant__wishlist"
              @click="addRemoverProductToWishlist"
          >
            <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                :class="{'plant__wishlist_active': plantData.saved}"
            >
              <path
                  d="M10 18.8873C9.71527 18.8873 9.44077 18.7842 9.22684 18.5968C8.41888 17.8903 7.63992 17.2264 6.95267 16.6408L6.94916 16.6377C4.93423 14.9207 3.19427 13.4378 1.98364 11.9771C0.630341 10.3441 0 8.79578 0 7.10434C0 5.46097 0.563507 3.94485 1.58661 2.83508C2.62192 1.71219 4.04251 1.09375 5.58716 1.09375C6.74164 1.09375 7.79892 1.45874 8.72955 2.1785C9.19922 2.54181 9.62494 2.98645 10 3.5051C10.3752 2.98645 10.8008 2.54181 11.2706 2.1785C12.2012 1.45874 13.2585 1.09375 14.413 1.09375C15.9575 1.09375 17.3782 1.71219 18.4135 2.83508C19.4366 3.94485 20 5.46097 20 7.10434C20 8.79578 19.3698 10.3441 18.0165 11.9769C16.8059 13.4378 15.0661 14.9205 13.0515 16.6374C12.363 17.224 11.5828 17.8889 10.773 18.5971C10.5592 18.7842 10.2846 18.8873 10 18.8873ZM5.58716 2.26532C4.37363 2.26532 3.25882 2.74963 2.44781 3.62915C1.62476 4.52194 1.17142 5.75607 1.17142 7.10434C1.17142 8.52692 1.70013 9.79919 2.88559 11.2296C4.03137 12.6122 5.73563 14.0645 7.70889 15.7462L7.71255 15.7492C8.4024 16.3371 9.18442 17.0036 9.99832 17.7153C10.8171 17.0023 11.6003 16.3347 12.2916 15.7458C14.2647 14.0642 15.9688 12.6122 17.1146 11.2296C18.2999 9.79919 18.8286 8.52692 18.8286 7.10434C18.8286 5.75607 18.3752 4.52194 17.5522 3.62915C16.7413 2.74963 15.6264 2.26532 14.413 2.26532C13.524 2.26532 12.7078 2.54791 11.9872 3.10516C11.3449 3.60199 10.8975 4.23004 10.6352 4.66949C10.5003 4.89548 10.2629 5.03036 10 5.03036C9.73709 5.03036 9.49966 4.89548 9.36478 4.66949C9.10263 4.23004 8.65524 3.60199 8.01285 3.10516C7.29218 2.54791 6.47598 2.26532 5.58716 2.26532Z"
                  fill="#3D3D3D"/>
            </svg>
          </div>
        </div>
        <div class="plant__data">SKU: <span>{{ plantData.id }}</span></div>
        <div class="plant__data">Category: <span>{{ plantData.type }}</span></div>
        <div class="plant__data">Tags: <span>Home, Garden, Plants</span></div>

      </div>
    </div>

    <div class="plant__bottom">
      <div class="plant__titles">
        <h3 class="plant__bottom-title">Product Description</h3>
      </div>

      <p class="plant__text">The ceramic cylinder planters come with a wooden stand to help elevate your plants off the
        ground. The
        ceramic
        cylinder planters come with a wooden stand to help elevate your plants off the ground. Lorem ipsum dolor sit
        amet, consectetur adipiscing elit. Nam fringilla augue nec est tristique auctor. Donec non est at libero
        vulputate rutrum. Morbi ornare lectus quis justo gravida semper. Nulla tellus mi, vulputate adipiscing
        cursus
        eu, suscipit id nulla.
      </p>
      <p class="plant__text">
        Pellentesque aliquet, sem eget laoreet ultrices, ipsum metus feugiat sem, quis fermentum turpis eros eget
        velit.
        Donec ac tempus ante. Fusce ultricies massa massa. Fusce aliquam, purus eget sagittis vulputate, sapien
        libero
        hendrerit est, sed commodo augue nisi non neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Sed
        tempor, lorem et placerat vestibulum, metus nisi posuere nisl, in accumsan elit odio quis mi. Cras neque
        metus,
        consequat et blandit et, luctus a nunc. Etiam gravida vehicula tellus, in imperdiet ligula euismod eget. The
        ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground.
      </p>

      <h4 class="plant__text-title">Living Room:</h4>

      <p class="plant__text">The ceramic cylinder planters come with a wooden stand to help elevate your plants off the
        ground. The
        ceramic
        cylinder planters come with a wooden stand to help elevate your plants off the ground. Lorem ipsum dolor sit
        amet, consectetur adipiscing elit.</p>

      <h4 class="plant__text-title">Dining Room:</h4>

      <p class="plant__text">The ceramic cylinder planters come with a wooden stand to help elevate your plants off the
        ground. The
        ceramic
        cylinder planters come with a wooden stand to help elevate your plants off the ground. Lorem ipsum dolor sit
        amet, consectetur adipiscing elit.</p>

      <h4 class="plant__text-title">Office:</h4>

      <p class="plant__text">The ceramic cylinder planters come with a wooden stand to help elevate your plants off the
        ground. The
        ceramic
        cylinder planters come with a wooden stand to help elevate your plants off the ground. Lorem ipsum dolor sit
        amet, consectetur adipiscing elit.</p>
    </div>

    <RelatedProducts title="Releted Products"/>
  </main>
</template>

<style scoped>
.plant {
  padding-top: 36px;
}

.plant__bread-crumbs {
  color: #3D3D3D;
  font-family: 'CeraPro-Bold', sans-serif;
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 43px;
}

.plant__bread-crumbs span {
  font-family: 'CeraPro-Regular', sans-serif;
  font-weight: 400;
}

.plant__top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 94px;
}

.plant__imgs,
.plant__info {
  flex: 0 0 47%;
}

.plant__imgs {
  display: flex;
  gap: 46px;
}

.plant__small-imgs {
  display: flex;
  flex-direction: column;
}

.plant__small-img {
  margin-bottom: 16px;
  width: 100px;
  height: 100px;
  cursor: pointer;
  transition: 0.2s all;
  background-color: #FBFBFB;
  border: 1px solid #FBFBFB;
}

.plant__small-img_active {
  border: 1px solid #46A358;
}

.plant__small-img:nth-of-type(2) {
  transform: rotate(90deg);
}

.plant__small-img:nth-of-type(3) {
  transform: rotate(180deg);
}

.plant__small-img:nth-of-type(4) {
  transform: rotate(270deg);
}

.plant__main-img {
  width: 444px;
  height: 444px;
  object-fit: contain;
  transition: 0.5s all;
  background-color: #FBFBFB;
}

.plant__title {
  color: #3D3D3D;
  font-family: 'CeraPro-Bold', sans-serif;
  font-size: 28px;
  font-weight: 700;
  margin-top: 0;
  margin-bottom: 21px;
}

.plant__price-and-rate {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(70, 163, 88, 0.5);
  margin-bottom: 28px;
  padding-bottom: 13px;
}

.plant__price {
  color: #46A358;
  font-family: 'CeraPro-Bold', sans-serif;
  font-size: 22px;
  font-weight: 700;
  line-height: 16px;
}

.plant__rate {
  display: flex;
  gap: 3px;
}

.plant__short-description {
  margin-bottom: 10px;
  color: #3D3D3D;
  font-family: 'CeraPro-Medium', sans-serif;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
}

.plant__short-text {
  margin-bottom: 24px;
  color: #727272;
  font-family: 'CeraPro-Regular', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
}

.plant__order {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 24px;
}

.order {
  width: 85px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 14px;
}

.order__less,
.order__more {
  width: 21px;
  height: 25px;
  border-radius: 29px;
  background-color: #46A358;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s all;
}

.order__less:active,
.order__more:active {
  background-color: #fff;
  color: #46A358;
}

.order__pcs {
  font-family: 'CeraPro-Regular', sans-serif;
  font-size: 17px;
  color: #3D3D3D;
}

.plant__wishlist {
  display: flex;
  align-content: center;
  justify-content: center;
  padding: 11px;
  border: 1px solid #46A358;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.5s all;
}

.plant__wishlist:active {
  background-color: rgba(70, 163, 88, 0.1);
}

.plant__wishlist_active path {
  fill: #46A358;
}

.plant__data {
  color: #A5A5A5;
  font-family: 'CeraPro-Regular', sans-serif;
  font-size: 15px;
  font-weight: 400;
  line-height: 16px;
  margin-bottom: 10px;
}

.plant__data span {
  color: #727272;
}

.plant__text-title {
  margin-bottom: 2px;
  color: #3D3D3D;
  font-family: 'CeraPro-Bold', sans-serif;
  font-size: 14px;
  font-weight: 700;
  line-height: 24px;
}

.plant__text {
  margin-bottom: 18px;
  color: #727272;
  font-family: 'CeraPro-Regular', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
}

.plant__text:last-of-type {
  margin-bottom: 100px;
}

.plant__add-btn {
  padding: 11px 19px;
  color: #46A358;
  font-family: 'CeraPro-Bold', sans-serif;
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
  text-transform: uppercase;
  border-radius: 6px;
  background-color: transparent;
  border: 1px solid #46A358;
  cursor: pointer;
  transition: 0.5s all;
}

.plant__add-btn:active {
  background-color: rgba(70, 163, 88, 0.1);
}

.plant__titles {
  display: flex;
  border-bottom: 1px solid #46A358;
  padding-bottom: 12px;
  margin-bottom: 18px;
}

.plant__bottom-title {
  color: #46A358;
  font-family: 'CeraPro-Bold', sans-serif;
  font-size: 17px;
  font-style: normal;
  font-weight: 700;
  line-height: 16px;
}
</style>
