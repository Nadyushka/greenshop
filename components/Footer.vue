<script setup lang="ts">
import NButton from "~/components/ui/NButton.vue"

const aboutUsItems: { title: string, text: string, img: string }[] = [
  {
    title: 'Garden Care',
    text: 'We are an online plant shop offering a wide range of cheap and trendy plants.',
    img: 'footer__aboutOne'
  },
  {
    title: 'Plant Renovation',
    text: 'We are an online plant shop offering a wide range of cheap and trendy plants.',
    img: 'footer__aboutTwo'
  },
  {
    title: 'Watering Graden',
    text: 'We are an online plant shop offering a wide range of cheap and trendy plants.',
    img: 'footer__aboutThree'
  }
]
</script>

<template>
  <footer class="footer">
    <div class="footer__about">
      <AboutUs
          v-for="(item, idx) in aboutUsItems"
          :img="item.img"
          :title="item.title"
          :text="item.text"
          :lastItem="aboutUsItems.length -1 === idx"
      />
      <div class="footer__newsletters">
        <h4 class="footer__newsletters-title">Would you like to join newsletters?</h4>
        <div class="footer__input-block">
          <input class="footer__input" placeholder="enter your email address..."/>
          <NButton btn-title="Join" style="border-radius: 0 6px 6px 0"/>
        </div>
        <p class="footer__newsletters-text">We usually post offers and challenges in newsletter. We’re your online
          houseplant destination. We offer a
          wide range of houseplants and accessories shipped directly from our (green)house to yours! </p>
      </div>
    </div>
    <div class="footer__contact">
      <img src="/svg/logo.svg" class="footer__logo"/>
      <div class="footer__address">70 West Buckingham Ave. Farmingdale, NY 11735</div>
      <div class="footer__email">contact@greenshop.com</div>
      <div class="footer__phone">+88 01911 717 490</div>
    </div>
    <div class="footer__nav">
      <div class="footer__bottom">
        <h4 class="footer__bottom-title">My Account</h4>
        <ul class="footer__bottom-list">
          <li class="footer__bottom-item">My Account</li>
          <li class="footer__bottom-item">Our stores</li>
          <li class="footer__bottom-item">Contact us</li>
          <li class="footer__bottom-item">Career</li>
          <li class="footer__bottom-item">Specials</li>
        </ul>
      </div>
      <div class="footer__bottom">
        <h4 class="footer__bottom-title">Help & Guide</h4>
        <ul class="footer__bottom-list">
          <li class="footer__bottom-item">Help Center</li>
          <li class="footer__bottom-item">How to Buy</li>
          <li class="footer__bottom-item">Shipping & Delivery</li>
          <li class="footer__bottom-item">Product Policy</li>
          <li class="footer__bottom-item">How to Return</li>
        </ul>
      </div>
      <div class="footer__bottom">
        <h4 class="footer__bottom-title">Categories</h4>
        <ul class="footer__bottom-list">
          <li class="footer__bottom-item">House Plants</li>
          <li class="footer__bottom-item">Potter Plants</li>
          <li class="footer__bottom-item">Seeds</li>
          <li class="footer__bottom-item">Small Plants</li>
          <li class="footer__bottom-item">Accessories</li>
        </ul>
      </div>
      <div class="footer__media-payment">
        <div class="footer__media">
          <h4 class="footer__media-title">Social Media</h4>
          <div class="footer__media-list">
            <img class="footer__media-item" alt="facebook" src="/svg/facebook.svg"/>
            <img class="footer__media-item" alt="instagram" src="/svg/instagram.svg"/>
            <img class="footer__media-item" alt="twitter" src="/svg/twitter.svg"/>
            <img class="footer__media-item" alt="linkedin" src="/svg/linkedin.svg"/>
            <img class="footer__media-item" alt="youtube" src="/svg/youtube.svg"/>
          </div>
        </div>
        <div class="footer__payment">
          <h4 class="footer__payment-title">We accept</h4>
          <img src="/png/payments.png"/>
        </div>
      </div>
    </div>
    <div class="footer__rights">
      © 2021 GreenShop. All Rights Reserved.
    </div>
  </footer>
</template>

<style scoped>
.footer__about {
  display: flex;
  background-color: #FBFBFB;
  padding: 25px 25px 25px 0;
}

.footer__newsletters {
  padding-left: 24px;
  padding-right: 24px;
}

.footer__newsletters-title {
  margin-bottom: 18px;
  font-family: 'CeraPro-Bold', sans-serif;
  font-size: 17px;
  font-weight: 700;
}

.footer__input-block {
  display: flex;
  margin-bottom: 17px;
  width: 100%;
}

.footer__input {
  width: 100%;
  border-radius: 6px 0 0 6px;
}

.footer__newsletters-text {
  font-family: 'CeraPro-Regular', sans-serif;
  font-size: 13px;
  line-height: 22px;
  color: #727272;
}

.footer__contact {
  background-color: rgba(70, 163, 88, 0.1);
  display: flex;
  padding: 25px 0 25px 25px;
  border-top: 1px solid #46A358;
  border-bottom: 1px solid #46A358;
  align-items: center;
  gap: 10px;
}

.footer__logo {
  padding-right: 27px;
  margin-right: 20px;
}

.footer__address,
.footer__email,
.footer__phone {
  padding-left: 29px;
  color: #3D3D3D;
  font-size: 14px;
  line-height: 22px;
  max-width: 205px;
  font-family: 'CeraPro-Regular', sans-serif;
  background-repeat: no-repeat;
  background-position: 0 center;
  width: 236px;
}

.footer__address {
  background-image: url('/svg/address-icon.svg');
}

.footer__email {
  background-image: url('/svg/email-icon.svg');
}

.footer__phone {
  background-image: url('/svg/phone-icon.svg');
}

.footer__nav {
  display: flex;
  padding-left: 23px;
  padding-top: 33px;
  background-color: #FBFBFB;
  border-bottom: 1px solid #46A358;
  margin-bottom: 10px;
}

.footer__bottom {
  padding-right: 34px;
  display: inline-block;
  width: 204px;
}

.footer__bottom-title,
.footer__media-title,
.footer__payment-title {
  font-size: 18px;
  font-family: 'CeraPro-Bold', sans-serif;
  font-weight: 700;
  margin-bottom: 8px;
  color: #3D3D3D;
}

.footer__bottom-item {
  font-size: 14px;
  font-family: 'CeraPro-Regular', sans-serif;
  margin-bottom: 8px;
  color: #3D3D3D;
  cursor: pointer;
  transition: 0.3s all;
}

.footer__bottom-item:hover {
  transform: scale(1.03);
}

.footer__bottom-item:active {
  color: #46A358;
}

.footer__media-list {
  display: flex;
  gap: 10px;
  margin-bottom: 33px;
}

.footer__media-item {
  width: 20px;
  height: 20px;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid rgba(70, 163, 88, 0.1);
  cursor: pointer;
  transition: 0.5s all;
}

.footer__media-item:hover {
  transform: scale(1.1);
}

.footer__media-item:active {
 background-color: rgba(70, 163, 88, 0.1);
}

.footer__rights {
  text-align: center;
  color: #3D3D3D;
  font-size: 14px;
  font-family: 'CeraPro-Regular', sans-serif;
  margin-bottom: 10px;
}
</style>
