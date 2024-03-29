<script setup lang="ts">
import NButton from "~/components/ui/NButton.vue"
import { usePlantsStore } from "~/store/plants"
import { useAuthStore } from "~/store/auth"
import { ERouteName } from "~/shared/routes"
import { checkoutValidationSchema } from "~/utils/validation"
import NInput from "~/components/ui/NInput.vue"

definePageMeta({
  name: ERouteName.PAGE_SHOP_CHECKOUT,
  middleware: ['auth'],
  layout: "default",
})

const plantsStore = usePlantsStore()
const { cartItemsData, paymentMethodId, paymentMethods } = storeToRefs(plantsStore)

const authStore = useAuthStore()
const { isAuth, userRole, users } = storeToRefs(authStore)

const setPaymentMethod = (selectedPaymentId: number) => {
  plantsStore.setPaymentMethod(selectedPaymentId)
}

const totalWithoutShipping = computed(() => cartItemsData.value.reduce((acc, next) => acc + (next.pcs * next.price), 0))

const {
  handleSubmit,
  errors,
  values,
  resetForm,
  setFieldValue,
  resetField
} = useForm({
  validationSchema: checkoutValidationSchema,
})

const firstName = useField('firstName')
const lastName = useField('lastName')
const country = useField('country')
const town = useField('town')
const street = useField('street')
const additionalAddress = useField('additionalAddress')
const state = useField('state')
const zip = useField('zip')
const orderNotes = useField('orderNotes')
const email = useField('email')
const phone = useField('phone')

const router = useRouter()

const onSubmit = handleSubmit(async formValues => {
  await toggleModalConfirmedOrder(true)
}, error => console.log(error))

const isModalConfirmedOrderOpen = ref(false)
const toggleModalConfirmedOrder = async (isModalOpen: boolean) => {
  isModalConfirmedOrderOpen.value = isModalOpen
  if (!isModalOpen) {
    await plantsStore.clearCart()
    await router.push('/shop')
  }
}

const selectedAddress = ref('Use another address')

const clearAddress = () => {
  resetField('country')
  resetField('town')
  resetField('street')
  resetField('additionalAddress')
  resetField('state')
  resetField('zip')
}

const setAddress = (addressType: string) => {
  selectedAddress.value = addressType
  if (addressType !== 'Use another address') {
    const address = users.value.buyer.savedAddresses.find(address => address.addressName === selectedAddress.value)!

    setFieldValue('country', address.country)
    setFieldValue('town', address.city)
    setFieldValue('street', address.streetHouse)
    setFieldValue('additionalAddress', address.appartment)
    setFieldValue('zip', address.zip)
    setFieldValue('state', address.state)

  } else {
    clearAddress()
  }
}

const setUserData = () => {
  if (isAuth.value && userRole.value === 'buyer') {

    setFieldValue('firstName', users.value.buyer.firstName)
    setFieldValue('lastName', users.value.buyer.secondName)
    setFieldValue('email', users.value.buyer.email)
    setFieldValue('phone', users.value.buyer.phone)

  }
}

onMounted(() => {
  setUserData()
})

watch(() => isModalConfirmedOrderOpen.value,
    (value) => {
      const body = document.body
      if (value) {
        body.style.overflow = 'hidden'
      } else {
        body.style.overflow = 'auto'
      }
    })

watch(() => isAuth.value,
    () => {
      if (isAuth.value) {
        setUserData()
      } else {
        resetForm()
      }
    })

const imageAddressUrl = computed(() => {
  if (selectedAddress.value === 'Use another address') {
    return '/svg/radio-icon_active.svg'
  } else {
    return '/svg/radio-icon.svg'
  }
})
</script>

<template>
  <main class="checkout">
    <div class="checkout__bread-crumbs"><span>Home</span> / Shop / Checkout</div>
    <form @submit.prevent="onSubmit" class="checkout__info">
      <div class="checkout__billing">
        <div class="checkout__title">Billing Address</div>
        <div class="checkout__row">

          <NInput
              title="First Name"
              v-model:input-value="firstName.value.value"
              :errors="errors.firstName"
              :star="true"
          />

          <NInput
              title="Last Name"
              v-model:input-value="lastName.value.value"
              :errors="errors.lastName"
              :star="true"
          />

        </div>
        <div class="checkout__row">

          <NInput
              title="Country / Region"
              v-model:input-value="country.value.value"
              :errors="errors.country"
              :star="true"
          />

          <NInput
              title="Town / City"
              v-model:input-value="town.value.value"
              :errors="errors.town"
              :star="true"
          />

        </div>
        <div class="checkout__row">

          <NInput
              title="Street Address"
              v-model:input-value="street.value.value"
              :errors="errors.street"
              :star="true"
          />

          <NInput
              title="Additional Address"
              v-model:input-value="additionalAddress.value.value"
              :errors="errors.additionalAddress"
              :star="true"
          />

        </div>
        <div class="checkout__row">

          <NInput
              title="State"
              v-model:input-value="state.value.value"
              :errors="errors.state"
              :star="true"
          />

          <NInput
              title="Zip"
              v-model:input-value="zip.value.value"
              :errors="errors.zip"
              :star="true"
          />

        </div>
        <div class="checkout__row">

          <NInput
              title="Email address"
              v-model:input-value="email.value.value"
              :errors="errors.email"
              :star="true"
          />

          <NInput
              title="Phone Number"
              v-model:input-value="phone.value.value"
              :errors="errors.phone"
              :star="true"
          />

        </div>

        <div
            v-if="isAuth && userRole === 'buyer'"
            class="checkout__address"
            @click="setAddress('Use another address')">
          <img :src="imageAddressUrl"/>
          <span>Use another address</span>
        </div>

        <SavedAddresses
            v-if="isAuth && userRole === 'buyer'"
            :selected-address="selectedAddress"
            @set-selected-address="address => setAddress(address)"/>

        <div class="checkout__additional checkout__additional-textarea">
          <div class="checkout__additional-label">Order notes (optional)</div>
          <textarea class="checkout__additional-text" v-model="orderNotes.value.value"/>
        </div>

      </div>

      <div class="checkout__order">
        <div class="checkout__title">Your Order</div>

        <div class="checkout__row checkout__titles">
          <div class="checkout__product">Products</div>
          <div class="checkout__quantity">Qty</div>
          <div class="checkout__total">Subtotal</div>
        </div>
        <div
            class="checkout__row checkout__plants-data"
            v-for="product in cartItemsData"
        >
          <div class="checkout__product">
            <img :src="`/plants/${product.img}`" class="checkout__img"/>
            <div class="checkout__data">
              <div class="checkout__title">{{ product.title }}</div>
              <div class="checkout__sku">SKU: <span> {{ product.id }} </span></div>
            </div>
          </div>
          <div class="checkout__pcs">(x {{ product.pcs }} )</div>
          <div class="checkout__total checkout__total-item">${{ product.price * product.pcs }}.00</div>
        </div>

        <div class="checkout__additional">
          <div>Subtotal</div>
          <div> ${{ totalWithoutShipping }},00</div>
        </div>
        <div class="checkout__additional">
          <div>Shipping</div>
          <div> $16,00</div>
        </div>
        <div class="checkout__shipping--charges">View shipping charge</div>
        <div class="checkout__total-amount">
          <div>Total</div>
          <div> ${{ 16 + totalWithoutShipping }},00</div>
        </div>

        <div class="checkout__payment">Payment Method</div>
        <div v-for="payment in paymentMethods"
             :key="payment.id"
             class="checkout__payment-type"
             :class="{'checkout__payment-type_active': payment.id == paymentMethodId}"
             @click="setPaymentMethod(payment.id)"
        >
          <div
              class="checkout__payment-radio"
              :class="{'checkout__payment-radio_active': payment.id == paymentMethodId}"
          />
          <div v-if="payment.title !== 'Card'"> {{ payment.title }}</div>
          <img src="/png/payments.png" v-else/>
        </div>

        <NButton type="submit" btn-title="Place Order"/>
      </div>
    </form>
    <div class="checkout__modal" v-if="isModalConfirmedOrderOpen">
      <div class="checkout__modal-overlay">
        <ConfirmedOrder @close-modal="toggleModalConfirmedOrder(false)"/>
      </div>
    </div>
  </main>
</template>

<style scoped>
.checkout {
  padding-top: 38px;
}

.checkout__bread-crumbs {
  font-family: 'CeraPro-Regular', sans-serif;
  font-weight: 400;
  font-size: 15px;
  color: #3D3D3D;
  margin-bottom: 51px;
}

.checkout__bread-crumbs span {
  font-family: 'CeraPro-Bold', sans-serif;
  font-weight: 700;
}

.checkout__info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 117px;
}

.checkout__billing {
  width: 722px;
}

.checkout__title {
  font-size: 17px;
  font-family: 'CeraPro-Bold', sans-serif;
  font-weight: 700;
  color: #3D3D3D;
  margin-bottom: 21px;
}

.checkout__order {
  display: flex;
  flex-direction: column;
}

.checkout__row {
  display: flex;
  gap: 10px;
  width: 50%;
  margin-bottom: 30px;
}

:deep(.input__body) {
  width: 300px;
}

.checkout__different div:nth-of-type(2) {
  font-size: 15px;
  font-family: 'CeraPro-Medium', sans-serif;
  font-weight: 500;
  color: #3D3D3D;
}

.checkout__additional {
  display: flex;
  flex-direction: column;
  align-self: flex-end;
  width: 80%;
}

.checkout__additional-label {
  font-size: 15px;
  font-family: 'CeraPro-Regular', sans-serif;
  color: #3D3D3D;
  font-weight: 400;
  margin-bottom: 10px;
}

.checkout__additional-text {
  resize: none;
  min-height: 152px;
  width: 352px;
  border: 1px solid #EAEAEA;
  border-radius: 4px;
}


.checkout__row {
  display: flex;
  justify-content: space-between;
  width: 405px;
}

.checkout__plants-data {
  padding: 4px 16px 4px 6px;
  background-color: #FBFBFB;
  margin-bottom: 10px;
  align-items: center;
}

.checkout__titles {
  padding-bottom: 11px;
  margin-bottom: 11px;
  border-bottom: 1px solid rgba(70, 163, 88, 0.5);
}

.checkout__titles div {
  font-size: 16px;
  font-family: 'CeraPro-Medium', sans-serif;
  font-weight: 600;
  color: #3D3D3D;
}

.checkout__product {
  width: 240px;
  display: flex;
  gap: 14px;
  align-items: center;
}

.checkout__title {
  font-weight: 600;
  font-family: 'CeraPro-Medium', sans-serif;
  font-size: 16px;
  color: #3D3D3D;
}

.checkout__sku {
  color: #A5A5A5;
  font-family: 'CeraPro-Regular', sans-serif;
  font-weight: 400;
  font-size: 14px;
}

.checkout__sku span {
  color: #727272;
}

.checkout__pcs {
  font-family: 'CeraPro-Regular', sans-serif;
  font-size: 17px;
  color: #3D3D3D;
}

.checkout__total {
  width: 70px;
}

.checkout__total-item {
  font-size: 16px;
  font-family: 'CeraPro-Medium', sans-serif;
  font-weight: 500;
  color: #46A358;
  display: flex;
  align-items: center;
}

.checkout__additional {
  display: flex;
  justify-content: space-between;
  align-self: flex-end;
  margin-bottom: 15px;
  flex-direction: row;
}

.checkout__additional-textarea {
  flex-direction: column;
}

.checkout__additional div {
  color: #3D3D3D;
  font-size: 15px;
  font-family: 'CeraPro-Regular', sans-serif;
  font-weight: 400;
}

.checkout__additional div:last-of-type {
  font-family: 'CeraPro-Medium', sans-serif;
  font-weight: 400;
  font-size: 18px;
}

.checkout__shipping--charges {
  text-align: right;
  color: #46A358;
  font-size: 12px;
  margin-top: -8px;
  font-family: 'CeraPro-Regular', sans-serif;
  cursor: pointer;
  margin-bottom: 26px;
  padding-bottom: 17px;
  width: 80%;
  align-self: flex-end;
  border-bottom: 1px solid rgba(70, 163, 88, 0.5);
}

.checkout__payment {
  margin-bottom: 20px;
  font-family: 'CeraPro-Bold', sans-serif;
  font-size: 17px;
  color: #3D3D3D;
  font-weight: 700;
}

.checkout__total-amount {
  display: flex;
  justify-content: space-between;
  align-self: flex-end;
  margin-bottom: 15px;
  width: 80%;
}

.checkout__total-amount div {
  color: #3D3D3D;
  font-size: 16px;
  font-family: 'CeraPro-Bold', sans-serif;
  font-weight: 700;
}

.checkout__total-amount div:last-of-type {
  font-family: 'CeraPro-Bold', sans-serif;
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 17px;
  color: #46A358;
}

.checkout__payment-type {
  padding-top: 11px;
  padding-left: 11px;
  padding-bottom: 11px;
  border-radius: 4px;
  border: 1px solid #EAEAEA;
  display: flex;
  gap: 6px;
  margin-bottom: 15px;
  align-items: center;
  cursor: pointer;
  transition: 0.5s all;
}

.checkout__payment-type_active {
  border: 1px solid #46A358;
}

.checkout__payment-radio {
  width: 16px;
  height: 16px;
  background-image: url('/svg/radio-icon.svg');
  background-position: center center;
  background-repeat: no-repeat;
}

.checkout__payment-type div {
  color: #3D3D3D;
  font-weight: 400;
  font-size: 15px;
  font-family: 'CeraPro-Regular', sans-serif;
}

.checkout__payment-radio_active {
  transition: 0.5s all;
  background-image: url('/svg/radio-icon_active.svg');
}

.checkout__modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.checkout__modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(10, 13, 18, 0.2);
  z-index: 1;
  overflow-y: auto;
}

.checkout__img {
  width: 70px;
  height: 70px;
  object-fit: contain;
}

.checkout__address {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  align-items: center;
}

.checkout__address span {
  font-family: 'CeraPro-Medium', sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: #3D3D3D;
}

.checkout__address img {
  width: 14px;
  height: 14px;
  cursor: pointer;
  transition: 0.5s all;
}

.checkout__address img:hover {
  scale: 1.1;
}
</style>
