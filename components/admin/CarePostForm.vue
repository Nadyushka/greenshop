<script setup lang="ts">
import NButton from "~/components/ui/NButton.vue"
import {usePlantsStore} from "~/store/plants"
import type {PostCareType} from "~/utils/types"
import {carePostValidationSchema} from "~/utils/validation"
import NInput from "~/components/ui/NInput.vue";

const plantsStore = usePlantsStore()
const {plantCareData} = storeToRefs(plantsStore)

const emit = defineEmits<{ (emit: 'close-modal'): void }>()

const closeModal = () => emit('close-modal')

const props = defineProps<{ id: string | null | undefined }>()
const { id } = toRefs(props)

const {
  handleSubmit,
  errors,
  values,
  setValues,
} = useForm({
  validationSchema: carePostValidationSchema,
})

const title = useField('title')
const text = useField('text')
const fullText = useField('fullText')
const img = useField('img')

const post = ref({} as PostCareType)

const onSubmit = handleSubmit(async formValues => {
      const preparedData = {
        ...formValues,
        id: id.value ?? undefined,
      } as PostCareType

      if (id.value) {
        await plantsStore.saveCarePostChanges(preparedData)
      } else {
        await plantsStore.addCarePost(preparedData)
      }

      emit('close-modal')
    }, error => console.error(error)
)

onMounted(() => {
  if (id.value) {
    post.value = plantCareData.value.find(post => post.id === id.value)!

    setValues({
      title: post.value.title,
      text: post.value.text,
      fullText: post.value.fullText,
      img: post.value.img,
    })

  }
})
</script>

<template>
  <div class="post">
    <div class="post__modal-overlay">
      <div class="post__modal-body">
        <form @submit.prevent="onSubmit" class="post__modal-form">
          <div class="post__modal-close" @click="closeModal">
            <img src="/svg/close-icon.svg" class="post__modal-close-icon"/>
          </div>

          <div class="post__row">
            <NInput
                title="Title"
                v-model:input-value="title.value.value"
                :errors="errors.title"/>
          </div>

          <div class="post__row">
            <NInput
                title="Introduction"
                v-model:input-value="text.value.value"
                :errors="errors.text"/>
          </div>

          <div class="post__row">
            <div>
              <div class="post__label">Full text</div>
              <textarea
                  v-model="fullText.value.value"
                  class="post__textarea"
                  :class="{
                    'post__input_error': errors.fullText
                  }"
              />
              <div v-if="errors.fullText" class="post__error"> {{ errors.fullText }}</div>
            </div>
          </div>

          <NButton btn-title="Save" type="submit"/>

        </form>
        <div class="bottom"/>
      </div>
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
  left: 50%;
  transform: translateX(-50%);
}

.post__modal-form {
  background-color: #E5E5E5;
  display: inline-block;
  padding: 32px;
  border-radius: 14px;
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

.post__textarea:focus {
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

.post__error {
  margin-top: -10px;
  margin-bottom: 10px;
  color: rgba(255, 0, 0, 0.6);
  font-size: 12px;
}

.post__input_error {
  border: 1px solid rgba(255, 0, 0, 0.6) !important;
}
</style>
