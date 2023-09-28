<template>
  <el-tab-pane :label="label" :name="name" :disabled="disabled">
    <template v-if="'label' in slots" #label>
      <slot name="label" />
    </template>
    <slot />
  </el-tab-pane>
</template>

<script setup>
import { useSlots } from "vue";

defineProps({
  label: String,
  name: String,
  disabled: {
    type: Boolean,
    default: false,
  },
});

const slots = useSlots();
</script>
