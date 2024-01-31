<script setup lang="ts">
import NButton from "~/components/ui/NButton.vue"
import {useAuthStore} from "~/store/auth"
import {personalDataValidationSchema} from "~/utils/validation"
import type {PersonalDataType} from "~/utils/types"
import NInput from "~/components/ui/NInput.vue"

const authStore = useAuthStore()
const {users} = storeToRefs(authStore)

const {
  handleSubmit,
  errors,
  values,
  setValues,
} = useForm({
  validationSchema: personalDataValidationSchema,
})

const firstName = useField('firstName')
const secondName = useField('secondName')
const password = useField('password')
const email = useField('email')
const phone = useField('phone')

const onSubmit = handleSubmit(async formValues => {

  const data: PersonalDataType = {
    firstName: formValues.firstName,
    secondName: formValues.secondName,
    password: formValues.password,
    email: formValues.email,
    phone: formValues.phone,
  }
  debugger
  await authStore.savePersonalData(data)
}, error => console.error(error))

onMounted(() => {
  setValues({
    firstName: users.value.buyer.firstName,
    secondName: users.value.buyer.secondName,
    password: users.value.buyer.password,
    email: users.value.buyer.email,
    phone: users.value.buyer.phone,
  })
})
</script>

<template>
  <form @submit.prevent="onSubmit" class="personal">
    <div class="personal__row">

      <NInput
          title="First Name"
          v-model:input-value="firstName.value.value"
          :errors="errors.firstName"
          class="personal__input"
      />

      <NInput
          title="Last Name"
          v-model:input-value="secondName.value.value"
          :errors="errors.secondName"
          class="personal__input"
      />

      <NInput
          title="Phone"
          v-model:input-value="phone.value.value"
          :errors="errors.phone"
          class="personal__input"
      />

    </div>
    <div class="personal__row">

      <NInput
          title="Email"
          v-model:input-value="email.value.value"
          :errors="errors.email"
          class="personal__input"
      />

      <NInput
          title="Password"
          v-model:input-value="password.value.value"
          :errors="errors.password"
          class="personal__input"
      />

    </div>

    <NButton
        attr-type="submit"
        btn-title="Save Personal Data"
        class="personal__btn"
        type="submit"/>
  </form>
</template>

<style scoped>
.personal__row {
  display: flex;
  gap: 20px;
}

.personal__btn {
  margin-top: 8px;
  margin-bottom: 32px;
}

:deep(.input__body) {
  width: 300px;
}

</style>
