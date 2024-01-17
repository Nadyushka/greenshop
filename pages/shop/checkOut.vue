<script setup lang="ts">

</script>

<template>
  <main class="checkout">
    <div class="checkout__bread-crumbs"><span>Home</span> / Shop / Checkout</div>
    <div class="checkout__info">
      <div class="checkout__billing">
        <div class="checkout__title">Billing Address</div>
        <div class="checkout__row">
          <div>
            <div class="checkout__label">First Name</div>
            <input v-model="addressName" class="checkout__input"/>
          </div>
          <div>
            <div class="checkout__label">Last Name</div>
            <input v-model="addressName" class="checkout__input"/>
          </div>
        </div>
        <div class="checkout__row">
          <div>
            <div class="checkout__label">Country / Region</div>
            <input v-model="addressName" class="checkout__input"/>
          </div>
          <div>
            <div class="checkout__label">Town / City</div>
            <input v-model="addressName" class="checkout__input"/>
          </div>
        </div>
        <div class="checkout__row">
          <div>
            <div class="checkout__label">Street Address</div>
            <input v-model="addressName" class="checkout__input"/>
          </div>
          <div>
            <div class="checkout__label checkout__no-star">Additional Address</div>
            <input v-model="addressName" class="checkout__input"/>
          </div>
        </div>
        <div class="checkout__row">
          <div>
            <div class="checkout__label">State</div>
            <input v-model="addressName" class="checkout__input"/>
          </div>
          <div>
            <div class="checkout__label">Zip</div>
            <input v-model="addressName" class="checkout__input"/>
          </div>
        </div>
        <div class="checkout__row">
          <div>
            <div class="checkout__label">Email address</div>
            <input v-model="addressName" class="checkout__input"/>
          </div>
          <div>
            <div class="checkout__label">Phone Number</div>
            <input v-model="addressName" class="checkout__input"/>
          </div>
        </div>
        <div class="checkout__different">
          <div class="checkout__different-address checkout__different-address_active"/>
          <div>Ship to a different address?</div>
        </div>
        <div class="checkout__additional">
          <div class="checkout__additional-label">Order notes (optional)</div>
          <textarea class="checkout__additional-text"/>
        </div>
      </div>
      <div class="checkout__order">
        <div class="checkout__title">Your Order</div>

        
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

.checkout__row {
  display: flex;
  gap: 10px;
  width: 50%;
  margin-bottom: 30px;
}

.checkout__label {
  font-size: 15px;
  font-family: 'CeraPro-Regular', sans-serif;
  font-weight: 400;
  color: #3D3D3D;
  margin-bottom: 10px;
  padding-right: 14px;
  background-image: url('@/assets/svg/star-icon.svg');
  background-repeat: no-repeat;
  background-position: right top;
  display: inline-block;
}

.checkout__no-star {
  background-image: none;
}

.checkout__input {
  border-radius: 3px;
  border: 1px solid #EAEAEA;
  width: 300px;
}

.checkout__different {
  margin-bottom: 54px;
  display: flex;
  gap: 7px;
  align-items: center;
}

.checkout__different-address {
  width: 15px;
  height: 15px;
  border: 2px solid #46A358;
  border-radius: 15px;
}

.checkout__different div:nth-of-type(2) {
  font-size: 15px;
  font-family: 'CeraPro-Medium', sans-serif;
  font-weight: 500;
  color: #3D3D3D;
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
}
</style>
