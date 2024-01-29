<script setup lang="ts">
import NButton from "~/components/ui/NButton.vue"
import {useAuthStore} from "~/store/auth"
import type {addressDataType} from "~/utils/types"
import {personalAddressValidationSchema} from "~/utils/validation";

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
            <input
                v-model="streetHouse.value.value"
                class="personal__input"
                placeholder="House number and street name"
                :class="{
                'personal__input_error': errors.streetHouse
            }"
            />
            <div v-if="errors.streetHouse" class="personal__error"> {{ errors.streetHouse }}</div>
          </div>
          <div>
            <div class="personal__label"> Additional info</div>
            <input v-model="appartment.value.value"
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

.personal__input_error {
  border: 1px solid rgba(255, 0, 0, 0.6) !important;
}

.personal__error {
  margin-top: -5px;
  margin-bottom: 10px;
  color: rgba(255, 0, 0, 0.6);
}
</style>
