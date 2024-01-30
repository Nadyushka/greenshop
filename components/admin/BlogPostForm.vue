<script setup lang="ts">
import NButton from "~/components/ui/NButton.vue"
import {usePlantsStore} from "~/store/plants"
import type {PostType} from "~/utils/types"
import {postValidationSchema} from "~/utils/validation";

const plantsStore = usePlantsStore()
const {blogPostsData} = storeToRefs(plantsStore)

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
  validationSchema: postValidationSchema,
})

const date = useField('date')
const length = useField('length')
const title = useField('title')
const text = useField('text')
const fullText = useField('fullText')
const img = useField('img')

const post = ref({} as PostType)

const onSubmit = handleSubmit(async formValues => {

      const preparedData = {
        ...formValues,
        id: id.value ?? undefined,
      } as PostType

      if (id.value) {

        await plantsStore.savePostChanges(preparedData)
      } else {
        await plantsStore.addPost(preparedData)
      }

      emit('close-modal')
    }, error => console.error(error)
)

onMounted(() => {
  if (id.value) {
    post.value = blogPostsData.value.find(post => post.id === id.value)!

    setValues({
      date: post.value.date,
      length: post.value.length,
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
            <div>
              <div class="post__label">Date</div>
              <input
                  v-model="date.value.value"
                  class="post__input"
                  :class="{
                    'post__input_error': errors.date
                  }"
                  placeholder="example: September 12"/>
              <div v-if="errors.date" class="post__error"> {{ errors.date }}</div>
            </div>
          </div>

          <div class="post__row">
            <div>
              <div class="post__label">Time to read</div>
              <input
                  v-model="length.value.value"
                  class="post__input"
                  placeholder="example: Read in 6 minutes"
                  :class="{
                    'post__input_error': errors.length
                  }"
              />
              <div v-if="errors.length" class="post__error"> {{ errors.length }}</div>
            </div>
          </div>

          <div class="post__row">
            <div>
              <div class="post__label">Title</div>
              <input
                  v-model="title.value.value"
                  class="post__input"
                  :class="{
                    'post__input_error': errors.title
                  }"
              />
              <div v-if="errors.title" class="post__error"> {{ errors.title }}</div>
            </div>
          </div>

          <div class="post__row">
            <div>
              <div class="post__label">Introduction</div>
              <input
                  v-model="text.value.value"
                  class="post__input"
                  :class="{
                    'post__input_error': errors.text
                  }"
              />
              <div v-if="errors.text" class="post__error"> {{ errors.text }}</div>
            </div>
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

          <NButton btn-title="Save" type="type"/>

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

.post__input:focus,
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

.post__input::placeholder {
  color: #A5A5A5;
}

.post__error {
  margin-top: -5px;
  margin-bottom: 10px;
  color: rgba(255, 0, 0, 0.6);
}

.post__input_error {
  border: 1px solid rgba(255, 0, 0, 0.6) !important;
}
</style>
