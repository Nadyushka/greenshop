<script setup lang="ts">
interface PropsType {
  title: string
  inputValue: string
  errors: string | undefined
  star?: boolean
}

const props = defineProps<PropsType>()
const { title, inputValue, star, errors } = toRefs(props)

const emit = defineEmits<{
  (emit: 'update:inputValue', data: string): void,
  (emit: 'inputFocus'): void
}>()

</script>

<template>
  <div class="input">
    <div
        class="input__label"
        :class="{'input__star':star}"
    >{{ title }}
    </div>
    <input
        :value="inputValue"
        @input="$emit('update:inputValue', $event.target.value)"
        @focus="$emit('inputFocus')"
        class="input__body"
        :class="{
                    'input_error': errors
                  }"/>
    <div v-if="errors" class="input__error-text"> {{ errors }}</div>
  </div>
</template>

<style scoped>
.input__label {
  font-size: 15px;
  font-family: 'CeraPro-Regular', sans-serif;
  font-weight: 400;
  color: #3D3D3D;
  margin-bottom: 10px;
}

.input__body {
  border-radius: 3px;
  border: 1px solid #EAEAEA;
  margin-bottom: 10px;
  width: 500px;
  color: #727272;
}

.input__body:focus,
.input__body:focus {
  border: 1px solid #46A358;
}

.input__body::placeholder {
  color: #A5A5A5;
}

.input__error-text {
  margin-top: -5px;
  margin-bottom: 10px;
  color: rgba(255, 0, 0, 0.6);
  font-size: 12px;
}

.input_error {
  border: 1px solid rgba(255, 0, 0, 0.6) !important;
}

.input__star {
  padding-right: 14px;
  background-image: url('/svg/star-icon.svg');
  background-repeat: no-repeat;
  background-position: right top;
  display: inline-block;
}
</style>
