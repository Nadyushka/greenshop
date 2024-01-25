<script setup lang="ts">
import {usePlantsStore} from "~/store/plants";

const plantsStore = usePlantsStore()
const {cartItemsData, paymentMethodId, paymentMethods} = storeToRefs(plantsStore)

const totalWithoutShipping = computed(() => cartItemsData.value.reduce((acc, next) => acc + (next.pcs * next.price), 0));

const emit = defineEmits<{ (emit: 'close-modal'): void }>()

const closeModal = () => emit('close-modal')

const today = new Date()
const options = { day: 'numeric', month: 'short', year: 'numeric' }
const formattedDate = today.toLocaleDateString('en-US', options)

const shortDataTitles = ['Order Number', 'Date', 'Total', 'Payment Method']
const data = ref([
  195866,
  formattedDate,
  `$${totalWithoutShipping.value + 16},00`,
  paymentMethods.value[paymentMethodId.value - 1].title])
</script>

<template>
  <div class="wrapper">
    <div class="confirmed">
      <img src="@/assets/svg/close-icon.svg" class="confirmed__close" @click="closeModal"/>
      <div class="confirmed__head">
        <img src="@/assets/svg/confirmed-order.svg" class="confirmed__head-img"/>
        <h2 class="confirmed__title">Your order has been received</h2>
      </div>

      <div class="confirmed__short">
        <div
            v-for="(title, idx) in shortDataTitles"
            class="confirmed__block"
        >
          <div class="confirmed__block_title"> {{ title }}</div>
          <div class="confirmed__block_text"> {{ data[idx] }}</div>
        </div>
      </div>
      <div class="confirmed__details">
        <h3 class="confirmed__details-title">Order Details</h3>

        <div class="confirmed__row confirmed__titles">
          <div class="confirmed__product">Products</div>
          <div class="confirmed__quantity">Qty</div>
          <div class="confirmed__total">Subtotal</div>
        </div>
        <div
            class="confirmed__row confirmed__plants-data"
            v-for="product in cartItemsData"
        >
          <div class="confirmed__product">
            <img :src="`http://localhost:3000/_nuxt/assets/png/plants/${product.img}`" class="confirmed__img"/>
            <div class="checkout__data">
              <div class="confirmed__item-title">{{ product.title }}</div>
              <div class="confirmed__sku">SKU: <span> {{ product.id }} </span></div>
            </div>
          </div>
          <div class="confirmed__pcs">(x {{ product.pcs }} )</div>
          <div class="confirmed__total confirmed__total-item">${{ product.price * product.pcs }}.00</div>
        </div>

        <div class="confirmed__additional">
          <div>Shipping</div>
          <div> $16,00</div>
        </div>
        <div class="confirmed__total-amount">
          <div>Total</div>
          <div> ${{ 16 + totalWithoutShipping }},00</div>
        </div>
      </div>
      <p class="confirmed__bottom">Your order is currently being processed. You will receive an order confirmation email
        shortly with the expected delivery date for your items.</p>
    </div>
    <div class="bottom"/>
  </div>
</template>

<style scoped>
.wrapper {
  position: absolute;
  width: 578px;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
}

.confirmed {
  position: relative;
  background-color: #fff;
  padding-bottom: 50px;
}

.confirmed__close {
  position: absolute;
  top: 17px;
  right: 17px;
  width: 20px;
  height: 20px;
  transition: 0.5s all;
  cursor: pointer;
}

.confirmed__close:hover {
  scale: 1.1;

}

.confirmed__head {
  padding-top: 29px;
  padding-bottom: 15px;
  background-color: #BEDAC8FF;
  border-bottom: 1px solid rgba(70, 163, 88, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.confirmed__head-img {
  margin-bottom: 16px;
}

.confirmed__title {
  font-size: 16px;
  font-family: 'CeraPro-Regular', sans-serif;
  font-weight: 400;
  color: #727272
}

.confirmed__short {
  padding: 15px 20px;
  display: flex;
}

.confirmed__block {
  flex: 1 1 auto;
  border-right: 1px solid rgba(70, 163, 88, 0.5);
  padding-left: 22px;
  padding-right: 22px;
  padding-bottom: 10px;
}

.confirmed__block:first-of-type {
  padding-left: 22px;
}

.confirmed__block:last-of-type {
  border-right: 1px solid transparent;
}

.confirmed__block_title,
.confirmed__block_text {
  font-family: 'CeraPro-Regular', sans-serif;
  font-size: 14px;
  color: #727272;
  font-weight: 400;
  margin-bottom: 3px;
}

.confirmed__block_text {
  font-size: 15px;
  font-weight: 700;
  font-family: 'CeraPro-Bold', sans-serif;
}

.confirmed__details {
  padding-left: 42px;
  padding-right: 42px;
  display: flex;
  flex-direction: column;
  border-top: 1px solid rgba(70, 163, 88, 0.5);
  padding-top: 18px;
}

.confirmed__details-title {
  font-size: 15px;
  font-family: 'CeraPro-Bold', sans-serif;
  font-weight: 700;
  color: #3D3D3D;
  margin-bottom: 12px;
}

.confirmed__row {
  display: flex;
  justify-content: space-between;
}

.confirmed__plants-data {
  padding: 4px 16px 4px 6px;
  background-color: #FBFBFB;
  margin-bottom: 10px;
  align-items: center;
}

.confirmed__titles {
  padding-bottom: 11px;
  margin-bottom: 11px;
  border-bottom: 1px solid rgba(70, 163, 88, 0.5);
}

.confirmed__titles div {
  font-size: 16px;
  font-family: 'CeraPro-Medium', sans-serif;
  font-weight: 600;
  color: #3D3D3D;
}

.confirmed__product {
  width: 240px;
  display: flex;
  gap: 14px;
  align-items: center;
}

.confirmed__item-title {
  font-weight: 600;
  font-family: 'CeraPro-Medium', sans-serif;
  font-size: 16px;
  margin-bottom: 6px;
  color: #3D3D3D;
}

.confirmed__sku {
  color: #A5A5A5;
  font-family: 'CeraPro-Regular', sans-serif;
  font-weight: 400;
  font-size: 14px;
}

.confirmed__sku span {
  color: #727272;
}

.confirmed__pcs {
  font-family: 'CeraPro-Regular', sans-serif;
  font-size: 17px;
  color: #3D3D3D;
}

.confirmed__total {
  width: 70px;
}

.confirmed__total-item {
  font-size: 16px;
  font-family: 'CeraPro-Medium', sans-serif;
  font-weight: 500;
  color: #46A358;
  display: flex;
  align-items: center;
}

.confirmed__additional {
  display: flex;
  justify-content: space-between;
  align-self: flex-end;
  margin-bottom: 15px;
  width: 80%;
  padding-top: 10px;
}

.confirmed__additional div {
  color: #3D3D3D;
  font-size: 15px;
  font-family: 'CeraPro-Regular', sans-serif;
  font-weight: 400;
}

.confirmed__additional div:last-of-type {
  font-family: 'CeraPro-Medium', sans-serif;
  font-weight: 400;
  font-size: 18px;
}

.confirmed__total-amount {
  display: flex;
  justify-content: space-between;
  align-self: flex-end;
  margin-bottom: 21px;
  width: 80%;
}

.confirmed__total-amount div {
  color: #3D3D3D;
  font-size: 16px;
  font-family: 'CeraPro-Bold', sans-serif;
  font-weight: 700;
}

.confirmed__total-amount div:last-of-type {
  font-family: 'CeraPro-Bold', sans-serif;
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 17px;
  color: #46A358;
}

.confirmed__bottom {
  margin: 0 auto;
  width: 483px;
  border-top: 1px solid rgba(70, 163, 88, 0.5);
  padding-top: 18px;
  text-align: center;
  font-family: 'CeraPro-Regular', sans-serif;
  font-size: 14px;
  color: #727272;
  line-height: 22px;
}

.confirmed__img {
  width: 70px;
  height: 70px;
  object-fit: contain;
}
</style>
