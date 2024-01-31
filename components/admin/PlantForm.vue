<script setup lang="ts">
import NButton from "~/components/ui/NButton.vue"
import {usePlantsStore} from "~/store/plants"
import type {PlantType} from "~/utils/types"
import {validationSchema} from "~/utils/validation"
import NInput from "~/components/ui/NInput.vue";

const plantsStore = usePlantsStore()
const {plants} = storeToRefs(plantsStore)

const emit = defineEmits<{ (emit: 'close-modal'): void }>()

const props = defineProps<{ id: string | null | undefined }>()
const {id} = toRefs(props)

const {
  handleSubmit,
  errors,
  values,
  setValues,
  setFieldValue,
} = useForm({
  validationSchema,
})

const title = useField('title', validationSchema)
const price = useField('price', validationSchema)
const discount = useField('discount', validationSchema)
const addedToCart = useField('addedToCart', undefined, {initialValue: false})
const saved = useField('saved', undefined, {initialValue: false})
const img = useField('img')
const type = useField('type', validationSchema)
const size = useField('size', validationSchema)
const rate = useField('rate', validationSchema, {initialValue: null})

const selectedPlant = ref({} as PlantType)
const closeModal = () => emit('close-modal')

const onSubmit = handleSubmit(async formValues => {

      const preparedFormData = {
        ...formValues,
        id: id.value ?? undefined,
        size: formValues.size.toLowerCase(),
        price: formValues.price && +formValues.price,
        discount: formValues.discount ? +formValues.discount : undefined,
      } as PlantType

      if (id.value) {
        await plantsStore.savePlantChanges(preparedFormData)
      } else {
        await plantsStore.addPlant(preparedFormData)
      }

      emit('close-modal')
    }, error => console.error(error)
)

const categories = ["House Plants", "Potter Plants", "Seeds", "Small Plants", "Big Plants", "Succulents", "Trerrariums"]

const isCategoriesListVisible = ref(false)
const toggleCategoriesList = (isVisible: boolean) => {
  isSizeListVisible.value && toggleSizeList(false)
  isCategoriesListVisible.value = isVisible
}

const setCategory = (type: string) => {
  setFieldValue('type', type)
  toggleCategoriesList(false)
}

const isSizeListVisible = ref(false)
const toggleSizeList = (isVisible: boolean) => {
  isCategoriesListVisible.value && toggleCategoriesList(false)
  isSizeListVisible.value = isVisible
}

const setSize = (size: string) => {
  setFieldValue('size', size)
  toggleSizeList(false)
}

onMounted(() => {
  if (id.value) {
    selectedPlant.value = plants.value.find(plant => plant.id === id.value)!

    setValues({
      title: selectedPlant.value.title,
      price: selectedPlant.value.price,
      discount: selectedPlant.value.discount,
      addedToCart: selectedPlant.value.addedToCart,
      saved: selectedPlant.value.saved,
      img: selectedPlant.value.img,
      type: selectedPlant.value.type,
      size: selectedPlant.value.size,
      rate: selectedPlant.value.rate,
    })
  }
})
</script>

<template>
  <div class="plant">
    <div class="plant__modal-overlay">
      <div class="plant__modal-body">
        <form @submit.prevent="onSubmit" class="plant__modal-form">

          <div class="plant__modal-close" @click="closeModal">
            <img src="/svg/close-icon.svg" class="plant__modal-close-icon"/>
          </div>

          <div class="plant__row">
            <NInput
                title="Title"
                v-model:input-value="title.value.value"
                :errors="errors.title"/>
          </div>

          <div class="plant__row">
            <NInput
                title="Price"
                v-model:input-value="price.value.value"
                :errors="errors.price"/>
          </div>

          <div class="plant__row">
            <NInput
                title="Discount"
                v-model:input-value="discount.value.value"
            />
          </div>

          <div class="plant__row plant__row-type">
            <NInput
                @input-focus="toggleCategoriesList(true)"
                readonly
                title="Type"
                v-model:input-value="type.value.value"
                :errors="errors.type"/>

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

          <div class="plant__row plant__row-size">
            <NInput
                @input-focus="toggleSizeList(true)"
                readonly
                title="Size"
                v-model:input-value="size.value.value"
                :errors="errors.size"/>

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

          <div class="plant__row">
            <NInput
                title="Rate"
                v-model:input-value="rate.value.value"
            />
          </div>

          <NButton
              attr-type="submit"
              type="submit"
              btn-title="Save"/>

        </form>
        <div class="bottom"/>
      </div>


    </div>
  </div>
</template>

<style scoped>
.plant {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(229, 229, 229, 0.4);
}

.plant__modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(10, 13, 18, 0.2);
  z-index: 1;
  overflow-y: auto;
}

.plant__modal-body {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
}

.plant__modal-form {
  background-color: #E5E5E5;
  display: inline-block;
  padding: 32px;
  border-radius: 14px;
}

.plant__modal-close {
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
}

.plant__modal-close-icon {
  width: 20px;
  height: 20px;
  transition: 0.5s all;
}

.plant__modal-close-icon:hover {
  scale: 1.1;
}

.plant__row {
  display: flex;
  gap: 10px;
  width: 50%;
}

.plant__label {
  font-size: 15px;
  font-family: 'CeraPro-Regular', sans-serif;
  font-weight: 400;
  color: #3D3D3D;
  margin-bottom: 10px;
}

.plant__input {
  border-radius: 3px;
  border: 1px solid #EAEAEA;
  margin-bottom: 10px;
  width: 500px;
  color: #727272;
  transition: 0.5s all;
}

.plant__input:focus {
  border: 1px solid #46A358;
}

.plant__input_error {
  border: 1px solid rgba(255, 0, 0, 0.6) !important;
}

.plant__input::placeholder {
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

.plant__error {
  margin-top: -5px;
  margin-bottom: 10px;
  color: rgba(255, 0, 0, 0.6);
}
</style>
