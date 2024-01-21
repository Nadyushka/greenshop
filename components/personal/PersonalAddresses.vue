<script setup lang="ts">
import NButton from "~/components/ui/NButton.vue";
import {useAuthStore} from "~/store/auth";
import ChangeAddress from "~/components/ChangeAddress.vue";
import type {addressDataType} from "~/utils/types";

const authStore = useAuthStore()
const { users } = storeToRefs(authStore)

const country = ref('')
const city = ref('')
const streetHouse = ref('')
const appartment = ref('')
const state = ref('')
const zip = ref('')
const addressName = ref('')

const isModalOpen = ref(false)

const openModal = (id: string) => {
  authStore.setSelectedAddressId(id)
  isModalOpen.value = true
}

const closeModal = (address?: addressDataType) => {
  if (address) {
    authStore.saveAddress(address)
  }

  isModalOpen.value = false
}

const clearNewAddressData = () => {
  country.value = ''
  city.value = ''
  streetHouse.value = ''
  appartment.value = ''
  state.value = ''
  zip.value = ''
  addressName.value = ''
}

const addAddress = () => {
  const newAddress = {
    id: (users.value.buyer.savedAddresses.length + 1).toString(),
    addressName: addressName.value,
    streetHouse: streetHouse.value,
    city: city.value,
    state: state.value,
    country: country.value,
    zip: zip.value,
  }

  authStore.addAddress(newAddress)
  clearNewAddressData()
}
</script>

<template>
  <div class="addresses">

    <SavedAddresses @open-modal="(id: string) => openModal(id)" delete-edit="true"/>

    <div class="personal__row">
      <div>
        <div class="personal__label">Address name</div>
        <input v-model="addressName" class="personal__input"/>
      </div>
    </div>
    <div class="personal__row">
      <div>
        <div class="personal__label">Country / Region</div>
        <input v-model="country" class="personal__input"/>
      </div>
      <div>
        <div class="personal__label">Town / City</div>
        <input v-model="city" class="personal__input"/>
      </div>
    </div>
    <div class="personal__row">
      <div>
        <div class="personal__label">Street Address</div>
        <input v-model="streetHouse" class="personal__input" placeholder="House number and street name"/>
      </div>
      <div>
        <div class="personal__label">Additional info</div>
        <input v-model="appartment" class="personal__input" placeholder="Appartment, suite, unit, etc. (optional)"/>
      </div>
    </div>
    <div class="personal__row">
      <div>
        <div class="personal__label">State</div>
        <input v-model="state" class="personal__input"/>
      </div>
      <div>
        <div class="personal__label">Zip</div>
        <input v-model="zip" class="personal__input"/>
      </div>
    </div>

    <NButton btn-title="Save address" style="margin-bottom: 16px" @btn-click="addAddress"/>

    <ChangeAddress v-if="isModalOpen" @close-modal="address => closeModal(address)"/>
  </div>
</template>

<style scoped>
.personal__row {
  display: flex;
  gap: 10px;
  width: 50%;
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
