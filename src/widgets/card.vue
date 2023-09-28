<template>
  <div class="relative w-full rounded-md bg-white shadow dark:bg-slate-800">
    <div
      v-if="'title' in slots"
      class="border-b border-dashed border-slate-200 px-4 py-3 dark:border-slate-700 dark:text-slate-300"
    >
      <h4 class="text-lg font-medium">
        <slot name="title"></slot>
      </h4>
    </div>
    <div class="flex-auto p-4">
      <slot name="default"></slot>
    </div>
  </div>
</template>
<script setup>
import { useSlots } from "vue";
const slots = useSlots();
</script>
