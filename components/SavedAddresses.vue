<script setup lang="ts">
import {useAuthStore} from "~/store/auth";
import type {addressDataType} from "~/utils/types";

const authStore = useAuthStore()
const {users, isAuth, userRole} = storeToRefs(authStore)

const emit = defineEmits<{
  (emit: 'open-modal', id: string): void
  (emit: 'set-selected-address', address: string): void
}>()

const props = defineProps<{ selectedAddress: string, deleteEdit?: boolean }>()

const deleteAddress = async (id: string) => {
  await authStore.deleteAddress(id)
}

const openModal = (id: string) => {
  emit('open-modal', id)
}

const setSelectedAddress = (address: string) => {
  emit('set-selected-address', address)
}

const fullAddress = (address: addressDataType) => {
  return (address.streetHouse || '') +
      (address.city ? ', ' + address.city : '') +
      (address.state ? ', ' + address.state : '') +
      (address.country ? ', ' + address.country : '') +
      (address.zip ? ', ' + address.zip : '')
}

</script>

<template>
  <div
      v-for="address in users.buyer.savedAddresses"
      class="addresses__saved"
  >

    <div
        v-if="props.deleteEdit"
        class="addresses__actions"
    >
      <img src="@/assets/svg/delete-icon.svg" @click="deleteAddress(address.id)" alt="delete icon"/>
      <img src="@/assets/svg/edit-icon.svg" @click="openModal(address.id)" alt="edit icon"/>
    </div>

    <div
        v-if="!props.deleteEdit"
        class="addresses__actions"
        @click="setSelectedAddress(address.addressName)"
    >
      <img v-if="selectedAddress !== address.addressName" src="@/assets/svg/radio-icon.svg" alt/>
      <img v-else src="@/assets/svg/radio-icon_active.svg" alt/>
    </div>

    <div class="addresses__name"> {{ address.addressName }}</div>
    <div class="addresses__address"> {{ fullAddress(address) }}</div>
  </div>

</template>

<style scoped>
.addresses__saved {
  border-radius: 14px;
  background-color: #F9F9F9;
  padding: 15px;
  width: max-content;
  margin-bottom: 10px;
  margin-right: 10px;
  display: inline-block;
}

.addresses__actions {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.addresses__actions img {
  width: 14px;
  height: 14px;
  cursor: pointer;
  transition: 0.5s all;
}

.addresses__actions img:hover {
  scale: 1.1;
}

.addresses__name {
  font-size: 16px;
  font-family: 'CeraPro-Medium', sans-serif;
  font-weight: 500;
  color: #3D3D3D;
  margin-bottom: 6px;
}

.addresses__address {
  color: #727272;
  font-size: 14px;
  font-family: 'CeraPro-Regular', sans-serif;
}
</style>
