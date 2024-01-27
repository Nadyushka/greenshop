<script setup lang="ts">
import NButton from "~/components/ui/NButton.vue"
import { useAuthStore } from "~/store/auth"
import AddressEditForm from "~/components/personal/AddressEditForm.vue"
import type { addressDataType, PersonalAddressType } from "~/utils/types"
import { personalAddressValidationSchema } from "~/utils/validation"

const authStore = useAuthStore()
const { users } = storeToRefs(authStore)

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
        <div>
          <div class="personal__label">Address name</div>
          <input
              v-model="addressName.value.value"
              class="personal__input"
              :class="{
              'personal__input_error': errors.addressName
            }"
          />
          <div v-if="errors.addressName" class="personal__error"> {{ errors.addressName }}</div>
        </div>
      </div>
      <div class="personal__row">
        <div>
          <div class="personal__label">Country / Region</div>
          <input
              v-model="country.value.value"
              class="personal__input"
              :class="{
              'personal__input_error': errors.country
            }"
          />
          <div v-if="errors.country" class="personal__error"> {{ errors.country }}</div>
        </div>
        <div>
          <div class="personal__label">Town / City</div>
          <input
              v-model="city.value.value"
              class="personal__input"
              :class="{
              'personal__input_error': errors.city
            }"
          />
          <div v-if="errors.city" class="personal__error"> {{ errors.city }}</div>
        </div>
      </div>
      <div class="personal__row">
        <div>
          <div class="personal__label">Street Address</div>
          <input v-model="streetHouse.value.value"
                 class="personal__input"
                 placeholder="House number and street name"
                 :class="{
                  'personal__input_error': errors.streetHouse
                }"
          />
          <div v-if="errors.streetHouse" class="personal__error"> {{ errors.streetHouse }}</div>
        </div>
        <div>
          <div class="personal__label">Additional info</div>
          <input
              v-model="appartment.value.value"
              class="personal__input"
              placeholder="Appartment, suite, unit, etc. (optional)"
              :class="{
                  'personal__input_error': errors.appartment
                }"
          />
          <div v-if="errors.appartment" class="personal__error"> {{ errors.appartment }}</div>
        </div>
      </div>
      <div class="personal__row">
        <div>
          <div class="personal__label">State</div>
          <input
              v-model="state.value.value"
              class="personal__input"
              :class="{
                  'personal__input_error': errors.state
                }"
          />
          <div v-if="errors.state" class="personal__error"> {{ errors.state }}</div>
        </div>
        <div>
          <div class="personal__label">Zip</div>
          <input
              v-model="zip.value.value"
              class="personal__input"
              :class="{
                  'personal__input_error': errors.zip
                }"
          />
          <div v-if="errors.zip" class="personal__error"> {{ errors.zip }}</div>
        </div>
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
