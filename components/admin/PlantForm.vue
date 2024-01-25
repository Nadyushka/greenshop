<script setup lang="ts">
import NButton from "~/components/ui/NButton.vue"
import {usePlantsStore} from "~/store/plants"
import type {PlantType} from "~/utils/types"
import {validationSchema} from "~/utils/validation"

const plantsStore = usePlantsStore()
const {plants} = storeToRefs(plantsStore)

const emit = defineEmits<{ (emit: 'close-modal'): void }>()

const props = defineProps<{ id: string | null }>()
const { id } = toRefs(props)

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
        addedToCart: formValues.addedToCart,
        saved: formValues.saved,
        id: selectedPlant.value.id?? undefined,
        size: formValues.size.toLowerCase(),
        price: formValues.price && +formValues.price,
        discount: formValues.discount ? +formValues.discount : undefined,
        img: formValues.img,
      } as PlantType

      if (selectedPlant.value.id) {
        await plantsStore.savePlantChanges(preparedFormData)
      } else {
        await plantsStore.addPlant(preparedFormData)
      }

      emit('close-modal')
    }
)

const categories = ["House Plants", "Potter Plants", "Seeds", "Small Plants", "Big Plants", "Succulents", "Trerrariums"]

const isCategoriesListVisible = ref(false)
const toggleCategoriesList = (isVisible: boolean) => isCategoriesListVisible.value = isVisible

const setCategory = (category: string) => {
  setFieldValue('type', category)
  toggleCategoriesList(false)
}

const isSizeListVisible = ref(false)
const toggleSizeList = (isVisible: boolean) => {
  toggleCategoriesList(false)
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
      'title': selectedPlant.value.title,
      'price': selectedPlant.value.price,
      'discount': selectedPlant.value.discount,
      'addedToCart': selectedPlant.value.addedToCart,
      'saved': selectedPlant.value.saved,
      'img': selectedPlant.value.img,
      'type': selectedPlant.value.type,
      'size': selectedPlant.value.size,
      'rate': selectedPlant.value.rate,
    })
  }
})
</script>

<template>
  <div class="plant">
    <div class="plant__modal-overlay">
      <form @submit.prevent="onSubmit" class="plant__modal-body">
        <div class="plant__modal-close" @click="closeModal">
          <img src="@/assets/svg/close-icon.svg" class="plant__modal-close-icon"/>
        </div>

        <div class="plant__row">
          <div>
            <div class="plant__label">Title</div>
            <input
                v-model="title.value.value"
                class="plant__input"
                :class="{
                  'plant__input_error': errors.title
            }"
            />
            <div v-if="errors.title" class="plant__error">{{ errors.title }}</div>
          </div>
        </div>

        <div class="plant__row">
          <div>
            <div class="plant__label">Price</div>
            <input
                v-model="price.value.value"
                class="plant__input"
                :class="{
                  'plant__input_error': errors.price
            }"
            />
            <div v-if="errors.price" class="plant__error"> {{ errors.price }}</div>
          </div>
        </div>

        <div class="plant__row">
          <div>
            <div class="plant__label">Discount</div>
            <input v-model="discount.value.value" class="plant__input"/>
          </div>
        </div>

        <div class="plant__row plant__row-type">
          <div>
            <div class="plant__label">Type</div>
            <input
                :value="type.value.value"
                class="plant__input plant__input-type"
                @focus="toggleCategoriesList(true)"
                readonly
                :class="{
                  'plant__input_error': errors.type
            }"
            />
            <div v-if="errors.type" class="plant__error"> {{ errors.type }}</div>
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

        <div class="plant__row plant__row-size">
          <div>
            <div class="plant__label">Size</div>
            <input
                :value="size.value.value"
                readonly
                class="plant__input"
                @focus="toggleSizeList(true)"
                :class="{
                  'plant__input_error': errors.size
            }"
            />
            <div v-if="errors.size" class="plant__error"> {{ errors.size }}</div>
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

        <div class="plant__row">
          <div>
            <div class="plant__label">Rate</div>
            <input v-model="rate.value.value" class="plant__input"/>
          </div>
        </div>

        <NButton
            attr-type="submit"
            type="submit"
            btn-title="Save"/>

      </form>
      <div class="plant_transparent"/>
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
  background-color: #E5E5E5;
  display: inline-block;
  padding: 32px;
  border-radius: 14px;
  left: 50%;
  transform: translateX(-50%);
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

.plant_transparent {
  height: 50px;
  background-color: transparent;
}

.plant__input:focus {
  border: 1px solid #46A358;
}

.plant__input_error {
  border: 1px solid rgba(255, 0, 0, 0.6);;
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
