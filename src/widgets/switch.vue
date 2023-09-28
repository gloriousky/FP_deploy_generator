<template>
  <el-switch :disabled="readonly" :before-change="onChange" />
</template>
<script setup>
defineProps({
  readonly: {
    type: Boolean,
    default: false,
  },
  onChange: Function,
});
</script>
