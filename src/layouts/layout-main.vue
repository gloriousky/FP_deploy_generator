<template>
  <the-header
    class="fixed left-0 right-0 top-0 z-40"
    @update:aside-shrink="toggleAsideShrink"
  />
  <div class="relative">
    <the-aside
      class="z-20 w-60 flex-shrink-0 transform transition-transform"
      :class="{
        '-translate-x-full': asideShrink,
      }"
    />
    <div
      v-show="!asideShrink"
      class="fixed inset-0 z-10 bg-gray-900 opacity-50 lg:hidden"
      @click="toggleAsideShrink"
    ></div>
    <div
      class="transform pt-14 transition-all"
      :class="{
        'pr-60 lg:translate-x-60': !isMobile && !asideShrink,
      }"
    >
      <div class="px-4 py-4">
        <the-breadcrumb class="pb-4" />
        <slot />
      </div>
    </div>
  </div>
  <the-modal />
  <the-drawer />
</template>
<script setup>
import { ref, provide, watch } from "vue";
import { useMobile } from "@/hooks/use-mobile";

const { isMobile } = useMobile();
const asideShrink = ref(false);

const toggleAsideShrink = () => {
  asideShrink.value = !asideShrink.value;
};

const onLinkClick = () => {
  if (isMobile.value) asideShrink.value = true;
};
provide("onLinkClick", onLinkClick);

watch(
  isMobile,
  (isMobile) => {
    asideShrink.value = isMobile;
  },
  { immediate: true },
);
</script>
