<script setup lang="ts">

interface PropsType {
  leftIcon?: 'login' | 'logout'
  rightIcon?: 'arrow'
  btnTitle: string
}

const {leftIcon , rightIcon, btnTitle} = defineProps<PropsType>()

defineEmits<{ (emit: 'btnClick'): void }>()

</script>

<template>
  <button
      class="button"
      @click="$emit('btnClick')">

    <svg v-if="leftIcon === 'login'" class="button__left-icon" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.1601 9.10057H7.12598" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M14.7212 6.67059L17.1612 9.10059L14.7212 11.5306" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12.6342 5.35823C12.3592 2.3749 11.2425 1.29156 6.80082 1.29156C0.883322 1.29156 0.883322 3.21656 0.883322 8.9999C0.883322 14.7832 0.883322 16.7082 6.80082 16.7082C11.2425 16.7082 12.3592 15.6249 12.6342 12.6416" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>

    <svg v-if="leftIcon === 'logout'" class="button__left-icon" style="transform: scaleX(-1);" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.1601 9.10057H7.12598" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M14.7212 6.67059L17.1612 9.10059L14.7212 11.5306" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12.6342 5.35823C12.3592 2.3749 11.2425 1.29156 6.80082 1.29156C0.883322 1.29156 0.883322 3.21656 0.883322 8.9999C0.883322 14.7832 0.883322 16.7082 6.80082 16.7082C11.2425 16.7082 12.3592 15.6249 12.6342 12.6416" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>

    {{ btnTitle }}

    <svg v-if="rightIcon === 'arrow'"  class="button__right-icon" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.8126 8.79419H3.56258" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M10.2748 4.27587C10.2748 4.27587 14.8123 6.72162 14.8123 8.79312C14.8123 10.8661 10.2748 13.3126 10.2748 13.3126" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </button>
</template>

<style scoped>
.button {
  background-color: #46A358;
  border-radius: 6px;
  padding: 10px 17px;
  border: 1px solid #46A358;
  transition: 0.5s all;
  cursor: pointer;
  color: #fff;
  font-family: 'CeraPro-Medium', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
}

button:hover {
  background-color: #fff;
  border: 1px solid #46A358;
  color: #46A358;
}

button:active {
  background-color: #46A358;
  color: #fff;
}

.button__left-icon {
  margin-right: 5px;
  transition: 0.5s all;
}

.button__right-icon {
  margin-left: 5px;
}

.button__left-icon path,
.button__right-icon path {
  transition: 0.5s all;
}

.button:hover .button__left-icon path,
.button:hover .button__right-icon path {
  stroke: #46A358;
}

.button:active .button__left-icon path,
.button:active .button__right-icon path {
  stroke: #fff;
}
</style>
