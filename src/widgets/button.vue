<template>
  <el-button
    tag="div"
    :type="type"
    :size="{ sm: 'small', lg: 'large' }[size] ?? null"
    :loading="loading"
    :disabled="disabled"
    :round="rounded"
    :icon="icon"
    :class="{
      'w-full': full,
    }"
  >
    <slot />
  </el-button>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: "primary",
  },
  size: {
    type: String,
    default: "base",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  rounded: {
    type: Boolean,
    default: false,
  },
  icon: {},
  full: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});
</script>
