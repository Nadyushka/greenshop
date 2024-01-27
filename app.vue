<template>
  <div>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import {useAuthStore} from "~/store/auth";

const authStore = useAuthStore()

onMounted(() => {
  if (window.location.href.includes('localhost')) {
    console.log('http://localhost:3000/')
  } else {
    console.log('')
  }
})
</script>
