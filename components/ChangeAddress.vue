<script setup lang="ts">
import NButton from "~/components/ui/NButton.vue"
import {useAuthStore} from "~/store/auth"
import type {addressDataType} from "~/utils/types";

const authStore = useAuthStore()
const { users, selectedAddressId } = storeToRefs(authStore)

const emit = defineEmits<{ (emit: 'close-modal', addressData?: addressDataType): void }>()

const addressData = computed(() => {
  return {
    id: selectedAddressId.value,
    addressName: addressNameChange.value,
    streetHouse: streetHouseChange.value,
    city: cityChange.value,
    state: stateChange.value,
    country: countryChange.value,
    zip: zipChange.value,
  }
})

const idChange = ref('')
const countryChange = ref('')
const cityChange = ref('')
const streetHouseChange = ref('')
const appartmentChange = ref('')
const stateChange = ref('')
const zipChange = ref('')
const addressNameChange = ref('')

onMounted(() => {
  const addressToChange = users.value.buyer.savedAddresses.find(item => item.id === selectedAddressId.value)

  countryChange.value = addressToChange!.country
  cityChange.value = addressToChange!.city
  streetHouseChange.value = addressToChange!.streetHouse
  appartmentChange.value = addressToChange!.appartment
  stateChange.value = addressToChange!.state
  zipChange.value = addressToChange!.zip
  addressNameChange.value = addressToChange!.addressName
  idChange.value = addressToChange!.id
})

const saveChanges = () => {
  emit('close-modal', addressData.value)
}

const closeModal = () => {
  emit('close-modal')
}
</script>

<template>
  <div class="addresses__modal">
    <div class="addresses__modal-body">
      <div class="addresses__modal-close" @click="closeModal">
        <img src="@/assets/svg/close-icon.svg" class="addresses__modal-close-icon"/>
      </div>

      <div class="personal__row">
        <div>
          <div class="personal__label">Address name</div>
          <input v-model="addressNameChange" class="personal__input"/>
        </div>
      </div>

      <div class="personal__row">
        <div>
          <div class="personal__label">Country / Region</div>
          <input v-model="countryChange" class="personal__input"/>
        </div>
        <div>
          <div class="personal__label">Town / City</div>
          <input v-model="cityChange" class="personal__input"/>
        </div>
      </div>

      <div class="personal__row">
        <div>
          <div class="personal__label">Street Address</div>
          <input v-model="streetHouseChange" class="personal__input" placeholder="House number and street name"/>
        </div>
        <div>
          <div class="personal__label"> Additional info</div>
          <input v-model="appartmentChange" class="personal__input"
                 placeholder="Appartment, suite, unit, etc. (optional)"/>
        </div>
      </div>

      <div class="personal__row">
        <div>
          <div class="personal__label">State</div>
          <input v-model="stateChange" class="personal__input"/>
        </div>
        <div>
          <div class="personal__label">Zip</div>
          <input v-model="zipChange" class="personal__input"/>
        </div>
      </div>
      <NButton btn-title="Save changes" @btn-click="saveChanges"/>

    </div>
  </div>
</template>

<style scoped>
.addresses__modal {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(229, 229, 229, 0.4);
}

.addresses__modal-body {
  position: absolute;
  top: 20%;
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

</style>
