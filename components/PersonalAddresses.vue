<script setup lang="ts">
import NButton from "~/components/ui/NButton.vue";

const savedAddresses = ref([
  {
    id: '1',
    addressName: 'Home',
    streetHouse: '100 Jericho avenue, Westbury',
    city: 'NY',
    state: 'NY',
    country: 'USA',
    zip: '11590'
  }, {
    id: '2',
    addressName: 'Office',
    streetHouse: '100 Jericho avenue, Westbury',
    city: 'NY',
    state: 'NY',
    country: 'USA',
    zip: '11590'
  },
])

const country = ref('')
const city = ref('')
const streetHouse = ref('')
const appartment = ref('')
const state = ref('')
const zip = ref('')
const addressName = ref('')

const idChange = ref('')
const countryChange = ref('')
const cityChange = ref('')
const streetHouseChange = ref('')
const appartmentChange = ref('')
const stateChange = ref('')
const zipChange = ref('')
const addressNameChange = ref('')

const isModalOpen = ref(false)

const openModal = (id: string) => {
  const addressToChange = savedAddresses.value.find(item => item.id === id)
  countryChange.value = addressToChange.country
  cityChange.value = addressToChange.city
  streetHouseChange.value = addressToChange.streetHouse
  appartmentChange.value = addressToChange.appartment
  stateChange.value = addressToChange.state
  zipChange.value = addressToChange.zip
  addressNameChange.value = addressToChange.addressName
  idChange.value = id
  isModalOpen.value = true
}
const closeModal = () => isModalOpen.value = false
const saveChanges = (id: string) => {
  savedAddresses.value = savedAddresses.value.map( address => {
    if (address.id === id) {
      return {
        id: id,
        addressName: addressNameChange.value,
        streetHouse: streetHouseChange.value,
        city: cityChange.value,
        state: stateChange.value,
        country: countryChange.value,
        zip: zipChange.value,
      }
    } else {
      return address
    }
  })
  isModalOpen.value = false
}

const deleteAddress = (id: string) => {
  savedAddresses.value = savedAddresses.value.filter(address => address.id !== id)
}

const addAddress = () => {
  const newAddress = {
    id: (savedAddresses.value.length + 1).toString(),
    addressName: addressName.value,
    streetHouse: streetHouse.value,
    city: city.value,
    state: state.value,
    country: country.value,
    zip: zip.value,
  }
  const allAddresses = [...savedAddresses.value, newAddress]
  savedAddresses.value = allAddresses
}
</script>

<template>
  <div class="addresses">
    <div
        v-for="address in savedAddresses"
        class="addresses__saved"
    >
      <div class="addresses__actions">
        <img src="@/assets/svg/delete-icon.svg" @click="deleteAddress(address.id)"/>

        <img src="@/assets/svg/edit-icon.svg" @click="openModal(address.id)"/>
      </div>
      <div class="addresses__name"> {{ address.addressName }}</div>
      <div class="addresses__address">{{
          address.streetHouse + ', ' + address.city + ', ' + address.state + ', ' + address.country + ', ' + address.zip
        }}
      </div>
    </div>

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

    <div class="addresses__modal" v-if="isModalOpen">
      <div class="addresses__modal-body">
        <div class="addresses__modal-close" @click="closeModal">
          <img src="@/assets/svg/close-icon.svg" class="addresses__modal-close-icon" />
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
        <NButton btn-title="Save changes" @btn-click="saveChanges(idChange)"/>

      </div>
    </div>
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
  height:  20px;
  transition: 0.5s all;
}

.addresses__modal-close-icon:hover {
  scale: 1.1;
}

</style>
