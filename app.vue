<template>
  <div>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/store/auth";

const authStore = useAuthStore()

onMounted(async () => await authStore.me())
</script>
