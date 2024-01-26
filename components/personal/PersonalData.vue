<script setup lang="ts">

import NButton from "~/components/ui/NButton.vue";
import {useAuthStore} from "~/store/auth";
import {personalDataValidationSchema} from "~/utils/validation";

const authStore = useAuthStore()
const {users, isAuth, userRole} = storeToRefs(authStore)

const {
  handleSubmit,
  errors,
  values,
  setValues,
  setFieldValue,
} = useForm({
  validationSchema: personalDataValidationSchema,
})

const firstName = useField('firstName')
const secondName = useField('secondName')
const password = useField('password')
const email = useField('email')
const phone = useField('phone')


onMounted(() => {
  if (isAuth.value && userRole.value === 'buyer') {
    setValues({
      firstName: users.value.buyer.firstName,
      secondName: users.value.buyer.secondName,
      password: users.value.buyer.password,
      email: users.value.buyer.email,
      phone: users.value.buyer.phone,
    })
  }
})

const onSubmit = handleSubmit(async formValues => {
  const data = {
    firstName: formValues.firstName,
    secondName: formValues.secondName,
    password: formValues.password,
    email: formValues.email,
    phone: formValues.phone,
  }
  authStore.savePersonalData(data)
})
</script>

<template>
  <div class="personal">
    <form @click.prevent="onSubmit" class="personal__row">
      <div>
        <div class="personal__label">First Name</div>
        <input
            v-model="firstName.value.value"
            class="personal__input"
            :class="{
              'personal__input_error': errors.firstName
            }"
        />
        <div v-if="errors.firstName" class="personal__error"> {{ errors.firstName }}</div>
      </div>
      <div>
        <div class="personal__label">Last Name</div>
        <input
            v-model="secondName.value.value"
            class="personal__input"
            :class="{
              'personal__input_error': errors.secondName
            }"
        />
        <div v-if="errors.secondName" class="personal__error"> {{ errors.secondName }}</div>
      </div>
      <div>
        <div class="personal__label">Phone</div>
        <input
            v-model="phone.value.value"
            class="personal__input"
            :class="{
              'personal__input_error': errors.phone
            }"
        />
        <div v-if="errors.phone" class="personal__error"> {{ errors.phone }}</div>
      </div>
    </form>
    <div class="personal__row">
      <div>
        <div class="personal__label">Email</div>
        <input
            v-model="email.value.value"
            class="personal__input"
            :class="{
              'personal__input_error': errors.email
            }"
        />
        <div v-if="errors.email" class="personal__error"> {{ errors.email }}</div>
      </div>
      <div>
        <div class="personal__label">Password</div>
        <input
            v-model="password.value.value"
            class="personal__input"
            :class="{
              'personal__input_error': errors.password
            }"
        />
        <div v-if="errors.password" class="personal__error"> {{ errors.password }}</div>
      </div>
    </div>

    <NButton
        btn-title="Save Personal Data"
        class="personal__btn"
        type="submit"/>
  </div>
</template>

<style scoped>
.personal__row {
  display: flex;
  gap: 10px;
}

.personal__label {
  font-size: 15px;
  font-family: 'CeraPro-Regular', sans-serif;
  font-weight: 400;
  color: #3D3D3D;
  margin-bottom: 10px;
}

.personal__input {
  border-radius: 3px;
  border: 1px solid #EAEAEA;
  margin-bottom: 10px;
  width: 300px;
  cursor: pointer;
}

.personal__input:focus {
  border: 1px solid #46A358;
}

.personal__btn {
  margin-top: 8px;
  margin-bottom: 32px;
}

.personal__input_error {
  border: 1px solid rgba(255, 0, 0, 0.6) !important;
}

.personal__error {
  margin-top: -5px;
  margin-bottom: 10px;
  color: rgba(255, 0, 0, 0.6);
}
</style>
