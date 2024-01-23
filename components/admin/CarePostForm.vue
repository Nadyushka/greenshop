<script setup lang="ts">

import NButton from "~/components/ui/NButton.vue"
import {usePlantsStore} from "~/store/plants"
import type {PostType} from "~/utils/types"


const plantsStore = usePlantsStore()
const { plantCareData } = storeToRefs(plantsStore)

const emit = defineEmits<{ (emit: 'close-modal'): void }>()

const closeModal = () => emit('close-modal')

const props = defineProps<{ id:string | null }>()
const { id } = toRefs(props)

const formData = reactive({
  title: '',
  text: '',
  fullText: '',
} as PostType)

onMounted(()=> {
  if (id.value) {
    const post = plantCareData.value.find(post => post.id === id.value)

    formData.title = post.title
    formData.text = post.text
    formData.fullText = post.fullText
    formData.id = post.id
    formData.img = post.img
  }
})

const saveFormData = async () => {
  if (id.value) {
    await plantsStore.saveCarePostChanges(formData)
  } else {
    await plantsStore.addCarePost(formData)
  }

  emit('close-modal')
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
            <div class="post__label">Introduction</div>
            <input v-model="formData.text" class="post__input"/>
          </div>
        </div>

        <div class="post__row">
          <div>
            <div class="post__label">Full text</div>
            <textarea v-model="formData.fullText" class="post__textarea"/>
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
  top: 20px;
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
</style>
