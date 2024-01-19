<script setup lang="ts">
import NButton from "~/components/ui/NButton.vue";
import RelatedProducts from "~/components/RelatedProducts.vue";

const cartItemsData = ref([
  {
    id: '1',
    title: 'Barberton Daisy',
    img: 'cart-item-one.png',
    price: 119,
    pcs: 2,
  },
  {
    id: '2',
    title: 'Blushing Bromeliad',
    img: 'cart-item-two.png',
    price: 139,
    pcs: 3,
  },
  {
    id: '3',
    title: 'Aluminum Plant',
    img: 'cart-item-three.png',
    price: 179,
    pcs: 1,
  }
])

const changePcs = (id: string, increment: boolean) => {
  cartItemsData.value = [...cartItemsData.value].map(product => {
    if (product.id == id) {
      return {
        ...product,
        pcs: increment ? product.pcs + 1 : product.pcs - 1,
      }
    } else {
      return product
    }
  })
}

const deleteProduct = (id: string) => {
  cartItemsData.value = [...cartItemsData.value].filter(product => product.id !== id)
}

const totalWithoutShipping = computed(() => cartItemsData.value.reduce((acc, next) => acc + (next.pcs * next.price), 0));

const router = useRouter()

const openPage = (page: string) =>  router.push(page)
</script>

<template>
  <main class="cart">
    <div class="cart__bread-crumbs"><span>Home</span> / Shop / Shopping Cart</div>

    <div class="cart__info">
      <div class="cart__products">
        <div class="cart__row cart__titles">
          <div class="cart__product">Products</div>
          <div class="cart__price">Price</div>
          <div class="cart__quantity">Quantity</div>
          <div class="cart__total">Total</div>
          <div class="cart__delete"></div>
        </div>
        <div
            class="cart__row cart__plants-data"
            v-for="product in cartItemsData"
        >
          <div class="cart__product">
            <img :src="`http://localhost:3000/_nuxt/assets/png/cart/${product.img}`"/>
            <div class="cart__data">
              <div class="cart__title">{{ product.title }}</div>
              <div class="cart__sku">SKU: <span> {{ product.id }} </span></div>
            </div>
          </div>
          <div class="cart__price cart__price-item"> ${{ product.price }}.00</div>
          <div class="cart__quantity">
            <div class="cart__less" @click="changePcs(product.id, false)">-</div>
            <div class="cart__pcs">{{ product.pcs }}</div>
            <div class="cart__more" @click="changePcs(product.id, true)">+</div>
          </div>
          <div class="cart__total cart__total-item">${{ product.price * product.pcs }}.00</div>
          <img
              @click="deleteProduct(product.id)"
              class="cart__delete cart__delete-item"
              src="@/assets/svg/delete-icon.svg"/>
        </div>
      </div>

      <div class="cart__totals">
        <div class="cart__titles">
          <div>Cart Totals</div>
        </div>
        <div class="cart__additional">
          <div>Subtotal</div>
          <div> ${{ totalWithoutShipping }},00</div>
        </div>
        <div class="cart__additional">
          <div>Shipping</div>
          <div> $16,00</div>
        </div>
        <div class="cart__shipping--charges">View shipping charge</div>
        <div class="cart__total-amount">
          <div>Total</div>
          <div> ${{ 16 + totalWithoutShipping }},00</div>
        </div>

        <NButton btn-title="Proceed To Checkout" style="width: 100%; margin-bottom:14px" @btn-click="openPage('/shop/checkout')"/>

        <div class="cart__continue" @click="openPage('shop')">Continue Shopping</div>
      </div>
    </div>

    <RelatedProducts title="You may be interested in"/>
  </main>
</template>

<style scoped>
.cart {
  padding-top: 32px;
}

.cart__bread-crumbs {
  font-family: 'CeraPro-Regular', sans-serif;
  font-weight: 400;
  font-size: 15px;
  color: #3D3D3D;
  margin-bottom: 51px;
}

.cart__bread-crumbs span {
  font-family: 'CeraPro-Bold', sans-serif;
  font-weight: 700;
}

.cart__info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 117px;
}

.cart__row {
  display: flex;
  justify-content: space-between;
  width: 782px;
}

.cart__plants-data {
  padding: 11px 22px 11px 2px;
  background-color: #FBFBFB;
  margin-bottom: 10px;
}

.cart__titles {
  padding-bottom: 11px;
  margin-bottom: 11px;
  border-bottom: 1px solid rgba(70, 163, 88, 0.5);
}

.cart__titles div {
  font-size: 16px;
  font-family: 'CeraPro-Medium', sans-serif;
  font-weight: 600;
  color: #3D3D3D;
}

.cart__product {
  width: 240px;
  display: flex;
  gap: 14px;
  align-items: center;
}

.cart__title {
  font-weight: 600;
  font-family: 'CeraPro-Medium', sans-serif;
  font-size: 16px;
  margin-bottom: 6px;
  color: #3D3D3D;
}

.cart__sku {
  color: #A5A5A5;
  font-family: 'CeraPro-Regular', sans-serif;
  font-weight: 400;
  font-size: 14px;
}

.cart__sku span {
  color: #727272;
}

.cart__price {
  width: 60px;
}

.cart__price-item {
  font-size: 16px;
  font-family: 'CeraPro-Medium', sans-serif;
  font-weight: 500;
  color: #727272;
  display: flex;
  align-items: center;
}

.cart__quantity {
  width: 85px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.cart__less,
.cart__more {
  width: 21px;
  height: 25px;
  border-radius: 29px;
  background-color: #46A358;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s all;
}

.cart__less:active,
.cart__more:active {
  background-color: #fff;
  color: #46A358;
}

.cart__pcs {
  font-family: 'CeraPro-Regular', sans-serif;
  font-size: 17px;
  color: #3D3D3D;
}

.cart__total {
  width: 70px;
}

.cart__total-item {
  font-size: 16px;
  font-family: 'CeraPro-Medium', sans-serif;
  font-weight: 500;
  color: #46A358;
  display: flex;
  align-items: center;
}

.cart__delete {
  width: 24px;
  padding-right: 25px;

}

.cart__delete-item {
  cursor: pointer;
  transition: 0.5s all;
}

.cart__delete-item:hover {
  scale: 1.1;
}

.cart__totals {
  width: 328px;
}

.cart__additional {
  display: flex;
  justify-content: space-between;
  align-self: center;
  margin-bottom: 15px;
}

.cart__additional div {
  color: #3D3D3D;
  font-size: 15px;
  font-family: 'CeraPro-Regular', sans-serif;
  font-weight: 400;
}

.cart__additional div:last-of-type {
  font-family: 'CeraPro-Medium', sans-serif;
  font-weight: 400;
  font-size: 18px;
}

.cart__shipping--charges {
  text-align: right;
  color: #46A358;
  font-size: 12px;
  margin-top: -8px;
  font-family: 'CeraPro-Regular', sans-serif;
  cursor: pointer;
  margin-bottom: 26px;
}

.cart__total-amount {
  display: flex;
  justify-content: space-between;
  align-self: center;
  margin-bottom: 15px;
}

.cart__total-amount  div {
  color: #3D3D3D;
  font-size: 16px;
  font-family: 'CeraPro-Bold', sans-serif;
  font-weight: 700;
}

.cart__total-amount  div:last-of-type {
  font-family: 'CeraPro-Bold', sans-serif;
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 17px;
  color: #46A358;
}

.cart__continue {
  text-align: center;
  font-family: 'CeraPro-Regular', sans-serif;
  font-weight: 400;
  font-size: 15px;
  cursor: pointer;
  color: #46A358;
  border: 1px solid transparent;
  border-radius: 6px;
  transition: 0.5s all;
  padding-top: 12px;
  padding-bottom: 12px;
}

.cart__continue:hover {
  border: 1px solid  #46A358;
}

.cart__continue:active {
  background-color: rgba(70, 163, 88, 0.1);
}
</style>
