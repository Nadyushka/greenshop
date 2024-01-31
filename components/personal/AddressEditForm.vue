<script setup lang="ts">
import NButton from "~/components/ui/NButton.vue"
import {useAuthStore} from "~/store/auth"
import type {addressDataType} from "~/utils/types"
import {personalAddressValidationSchema} from "~/utils/validation";
import NInput from "~/components/ui/NInput.vue";

const authStore = useAuthStore()
const {users, selectedAddressId} = storeToRefs(authStore)

const emit = defineEmits<{ (emit: 'close-modal', addressData?: addressDataType): void }>()

const {
  handleSubmit,
  errors,
  values,
  setValues
} = useForm({
  validationSchema: personalAddressValidationSchema,
})

const id = useField('id')
const country = useField('country')
const city = useField('city')
const streetHouse = useField('streetHouse')
const appartment = useField('appartment')
const zip = useField('zip')
const state = useField('state')
const addressName = useField('addressName')

onMounted(() => {
  const addressToChange = users.value.buyer.savedAddresses.find(item => item.id === selectedAddressId.value)

  setValues({
    country: addressToChange!.country,
    city: addressToChange!.city,
    streetHouse: addressToChange!.streetHouse,
    appartment: addressToChange!.appartment,
    state: addressToChange!.state,
    zip: addressToChange!.zip,
    addressName: addressToChange!.addressName,
    id: addressToChange!.id,
  })

})

const onSubmit = handleSubmit(async formValues => {
  emit('close-modal', formValues as addressDataType)
})

const closeModal = () => {
  emit('close-modal')
}
</script>

<template>
  <div class="addresses__modal">
    <div class="addresses__modal-overlay">
      <form @submit.prevent="onSubmit" class="addresses__modal-body">
        <div class="addresses__modal-close" @click="closeModal">
          <img src="../../public/svg/close-icon.svg" class="addresses__modal-close-icon"/>
        </div>

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

        <NButton btn-title="Save changes" type="submit"/>

      </form>
    </div>
  </div>
</template>

<style scoped>
.addresses__modal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(229, 229, 229, 0.4);
}

.addresses__modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(10, 13, 18, 0.2);
  z-index: 1;
  overflow-y: auto;
}

.addresses__modal-body {
  position: absolute;
  top: 10%;
  background-color: #E5E5E5;
  display: inline-block;
  padding: 32px;
  border-radius: 14px;
  left: 50%;
  transform: translateX(-50%);
}

.addresses__modal-close {
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
}

.addresses__modal-close-icon {
  width: 20px;
  height: 20px;
  transition: 0.5s all;
}

.addresses__modal-close-icon:hover {
  scale: 1.1;
}

.personal__row {
  display: flex;
  gap: 10px;
  width: 50%;
}
</style>
