<script setup lang="ts">

import NButton from "~/components/ui/NButton.vue";
import {useAuthStore} from "~/store/auth";

const authStore = useAuthStore()
const { users, isAuth, userRole } = storeToRefs(authStore)

const firstName = ref()
const secondName = ref()
const password = ref()
const email = ref()
const phone = ref()

onMounted(()=> {
  if (  isAuth.value  && userRole.value === 'buyer') {
    firstName.value = users.value.buyer.firstName
    secondName.value = users.value.buyer.secondName
    password.value = users.value.buyer.password
    email.value = users.value.buyer.email
    phone.value = users.value.buyer.phone
  }
})

const savePersonalData = () => {
  const data = {
    firstName: firstName.value,
    secondName: secondName.value,
    password: password.value,
    email: email.value,
    phone: phone.value,
  }
  authStore.savePersonalData(data)
}
</script>

<template>
  <div class="personal">
    <div class="personal__row">
      <div>
        <div class="personal__label">First Name</div>
        <input v-model="firstName" class="personal__input"/>
      </div>
      <div>
        <div class="personal__label">Last Name</div>
        <input v-model="secondName" class="personal__input"/>
      </div>
      <div>
        <div class="personal__label">Phone</div>
        <input v-model="phone" class="personal__input"/>
      </div>
    </div>
    <div class="personal__row">
      <div>
        <div class="personal__label">Email</div>
        <input v-model="email" class="personal__input"/>
      </div>
      <div>
        <div class="personal__label">Password</div>
        <input v-model="password" class="personal__input"/>
      </div>
    </div>

    <NButton
        btn-title="Save Personal Data"
        style="margin-bottom: 16px"
        @btn-click="savePersonalData"/>
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
}
</style>
