<template>
  <transition
    name="fade"
    leave-active-class="animate__animated animate__fadeOut"
  >
    <div v-show="appStore.requestQueue.length > 0" class="loading">
      <div class="loading__wave"></div>
      <div class="loading__wave"></div>
      <div class="loading__wave"></div>
      <div class="loading__wave"></div>
      <div class="loading__wave"></div>
      <div class="loading__wave"></div>
    </div>
  </transition>
</template>

<script setup>
import { useAppStore } from "@/stores/app-store";
const appStore = useAppStore();
</script>
