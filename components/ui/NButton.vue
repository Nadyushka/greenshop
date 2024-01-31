<script setup lang="ts">
import LoginLogout from 'public/svg/LoginLogout.svg'
import ArrowIcon from 'public/svg/arrow-icon.svg'

interface PropsType {
  leftIcon?: 'login' | 'logout'
  rightIcon?: 'arrow'
  btnTitle: string
}

const { leftIcon , rightIcon, btnTitle } = defineProps<PropsType>()

defineEmits<{ (emit: 'btnClick'): void }>()

</script>

<template>
  <button
      class="button"
      @click="$emit('btnClick')">

    <LoginLogout
        v-if="leftIcon"
        :style="{
          transform: leftIcon == 'logout' ? 'scaleX(-1)' : 'none'
        }"
        class="button__left-icon"
        :filled="true"/>

    {{ btnTitle }}

    <ArrowIcon
        v-if="rightIcon === 'arrow'"
        class="button__right-icon"
        :filled="true"
    />

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
}

button:active {
  background-color: #fff;
  border: 1px solid #46A358;
  color: #46A358;
}

.button__left-icon {
  margin-right: 5px;
  transition: 0.2s all;
}

.button__right-icon {
  margin-left: 5px;
}

.button .button__left-icon path,
.button .button__right-icon path {
  transition: 0.2s all;
  stroke: #46A358;
}

.button:active .button__left-icon path,
.button:active .button__right-icon path {
  stroke: #46A358;
}
</style>
