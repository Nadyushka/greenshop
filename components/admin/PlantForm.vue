<script setup lang="ts">

import NButton from "~/components/ui/NButton.vue"
import {usePlantsStore} from "~/store/plants"
import type {PlantType, PostType} from "~/utils/types"


const plantsStore = usePlantsStore()
const {plants} = storeToRefs(plantsStore)

const emit = defineEmits<{ (emit: 'close-modal'): void }>()

const closeModal = () => emit('close-modal')

const props = defineProps<{ id: string | null }>()
const {id} = toRefs(props)

const formData = reactive({
  title: '',
  price: undefined,
  discount: undefined,
  addedToCart: false,
  saved: false,
  img: '',
  type: '',
  size: '',
  productStatus: '',
  rate: null
} as PlantType)

onMounted(() => {
  if (id.value) {
    const plant = plants.value.find(post => post.id === id.value)

    formData.id = plant.id
    formData.title = plant.title
    formData.price = plant.price
    formData.discount = plant.discount
    formData.addedToCart = plant.addedToCart
    formData.saved = plant.saved
    formData.img = plant.img
    formData.type = plant.type
    formData.size = plant.size
    formData.productStatus = plant.productStatus
    formData.rate = plant.rate
  }
})

const saveFormData = async () => {
  const preparedFormData = {
    ...formData,
    size: formData.size.toLowerCase(),
    price: formData.price && +formData.price,
    discount: formData.discount ? +formData.discount : undefined,
  }

  if (id.value) {
    await plantsStore.savePlantChanges(preparedFormData)
  } else {
    await plantsStore.addPlant(preparedFormData)
  }

  emit('close-modal')
}

const categories = ["House Plants", "Potter Plants", "Seeds", "Small Plants", "Big Plants", "Succulents", "Trerrariums"]

const isCategoriesListVisible = ref(false)
const toggleCategoriesList = (isVisible: boolean) => isCategoriesListVisible.value = isVisible

const setCategory = (category: string) => {
  formData.type = category
  toggleCategoriesList(false)
}

const isSizeListVisible = ref(false)
const toggleSizeList = (isVisible: boolean) =>  {
  toggleCategoriesList(false)
  isSizeListVisible.value = isVisible
}

const setSize = (size: string) => {
  formData.size = size
  toggleSizeList(false)
}
</script>

<template>
  <div class="post">
    <div class="post__modal-overlay">
      <div class="post__modal-body">
        <div class="post__modal-close" @click="closeModal">
          <img src="@/assets/svg/close-icon.svg" class="post__modal-close-icon"/>
        </div>

        <div class="post__row">
          <div>
            <div class="post__label">Title</div>
            <input v-model="formData.title" class="post__input"/>
          </div>
        </div>

        <div class="post__row">
          <div>
            <div class="post__label">Price</div>
            <input v-model="formData.price" class="post__input"/>
          </div>
        </div>

        <div class="post__row">
          <div>
            <div class="post__label">Discount</div>
            <input v-model="formData.discount" class="post__input"/>
          </div>
        </div>

        <div class="post__row plant__row-type">
          <div>
            <div class="post__label">Type</div>
            <input
                :value="formData.type"
                class="post__input post__input-type"
                @focus="toggleCategoriesList(true)"
                readonly
            />
          </div>

          <ul class="plant__list" v-if="isCategoriesListVisible">
            <li
                v-for="category in categories"
                :key="category"
                class="plant__item"
                @click="setCategory(category)"
            > {{ category }}
            </li>
          </ul>

        </div>

        <div class="post__row plant__row-size">
          <div>
            <div class="post__label">Size</div>
            <input
                :value="formData.size"
                readonly
                class="post__input"
                @focus="toggleSizeList(true)"
            />
          </div>

          <ul class="plant__list" v-if="isSizeListVisible">
            <li
                v-for="size in ['Small', 'Medium', 'Large']"
                :key="size"
                class="plant__item"
                @click="setSize(size)"
            > {{ size }}
            </li>
          </ul>

        </div>

        <div class="post__row">
          <div>
            <div class="post__label">Rate</div>
            <input v-model="formData.rate" class="post__input"/>
          </div>
        </div>

        <NButton btn-title="Save" @btn-click="saveFormData"/>

      </div>
      <div class="post_transparent"/>
    </div>
  </div>
</template>

<style scoped>
.post {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(229, 229, 229, 0.4);
}

.post__modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(10, 13, 18, 0.2);
  z-index: 1;
  overflow-y: auto;
}

.post__modal-body {
  position: absolute;
  top: 10%;
  background-color: #E5E5E5;
  display: inline-block;
  padding: 32px;
  border-radius: 14px;
  left: 50%;
  transform: translateX(-50%);
}

.post__modal-close {
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
}

.post__modal-close-icon {
  width: 20px;
  height: 20px;
  transition: 0.5s all;
}

.post__modal-close-icon:hover {
  scale: 1.1;
}

.post__row {
  display: flex;
  gap: 10px;
  width: 50%;
}

.post__label {
  font-size: 15px;
  font-family: 'CeraPro-Regular', sans-serif;
  font-weight: 400;
  color: #3D3D3D;
  margin-bottom: 10px;
}

.post__input {
  border-radius: 3px;
  border: 1px solid #EAEAEA;
  margin-bottom: 10px;
  width: 500px;
  color: #727272;
}

.post_transparent {
  height: 50px;
  background-color: transparent;
}

.post__input:focus {
  border: 1px solid #46A358;
}

.post__textarea {
  min-height: 152px;
  width: 490px;
  border: 1px solid #EAEAEA;
  border-radius: 4px;
  margin-bottom: 10px;
  color: #727272;
  padding: 16px;
}

.post__input::placeholder {
  color: #A5A5A5;
}

.plant__row-type,
.plant__row-size {
  position: relative;
}

.plant__list {
  position: absolute;
  z-index: 20;
  padding: 8px;
  background-color: #FBFBFB;
  top: 55px;
  border-radius: 0 0 6px 6px;
}

.plant__item {
  padding: 8px 8px 8px 20px;
  color: #3D3D3D;
  cursor: pointer;
  transition: 0.2s all;
  font-weight: 400;
  width: 480px;
}

.plant__item:hover {
  scale: 1.02;
  color: #46A358;
}
</style>
