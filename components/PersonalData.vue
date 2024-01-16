<script setup lang="ts">

import NButton from "~/components/ui/NButton.vue";

const firstName = ref('')
const secondName = ref('')
const password = ref('')
const email = ref('')
const phone = ref('')
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

    <NButton btn-title="Save Personal Data" style="margin-bottom: 16px"/>
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
