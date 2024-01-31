<script setup lang="ts">
import NButton from "~/components/ui/NButton.vue"
import {useAuthStore} from "~/store/auth"
import AddressEditForm from "~/components/personal/AddressEditForm.vue"
import type {addressDataType, PersonalAddressType} from "~/utils/types"
import {personalAddressValidationSchema} from "~/utils/validation"
import NInput from "~/components/ui/NInput.vue";

const authStore = useAuthStore()
const {users} = storeToRefs(authStore)

const {
  handleSubmit,
  errors,
  values,
  handleReset
} = useForm({
  validationSchema: personalAddressValidationSchema,
})

const country = useField('country')
const city = useField('city')
const streetHouse = useField('streetHouse')
const appartment = useField('appartment')
const zip = useField('zip')
const state = useField('state')
const addressName = useField('addressName')

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

const onSubmit = handleSubmit(async formValues => {
  const newAddress: PersonalAddressType = {
    id: (users.value.buyer.savedAddresses.length + 1).toString(),
    addressName: formValues.addressName,
    streetHouse: formValues.streetHouse,
    city: formValues.city,
    state: formValues.state,
    country: formValues.country,
    zip: formValues.zip,
  }

  await authStore.addAddress(newAddress)

  handleReset()
})

watch(() => isModalOpen.value,
    (value) => {
      const body = document.body
      if (value) {
        body.style.overflow = 'hidden'
      } else {
        body.style.overflow = 'auto'
      }
    })
</script>

<template>
  <div class="addresses">

    <SavedAddresses @open-modal="(id: string) => openModal(id)" delete-edit="true"/>

    <form @submit.prevent="onSubmit">
      <div class="personal__row">

        <NInput
            title="Address name"
            v-model:input-value="addressName.value.value"
            :errors="errors.addressName"/>

      </div>
      <div class="personal__row">

        <NInput
            title="Country / Region"
            v-model:input-value="country.value.value"
            :errors="errors.country"/>

        <NInput
            title="Town / City"
            v-model:input-value="city.value.value"
            :errors="errors.city"/>

      </div>
      <div class="personal__row">
        <NInput
            title="Street Address"
            v-model:input-value="streetHouse.value.value"
            :errors="errors.streetHouse"/>

        <NInput
            title="Additional info"
            v-model:input-value="appartment.value.value"
            :errors="errors.appartment"/>

      </div>
      <div class="personal__row">
        <NInput
            title="State"
            v-model:input-value="state.value.value"
            :errors="errors.state"/>

        <NInput
            title="Zip"
            v-model:input-value="zip.value.value"
            :errors="errors.zip"/>

      </div>

      <NButton btn-title="Save address" class="personal__btn" type="submit"/>
    </form>

    <AddressEditForm v-if="isModalOpen" @close-modal="address => closeModal(address)"/>
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

.personal__btn {
  margin-top: 16px;
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
