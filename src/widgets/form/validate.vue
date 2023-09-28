<template>
  <div class="mb-4">
    <label
      v-if="title"
      class="label mb-2"
      :class="{ 'text-red-500': isInvalid }"
    >
      {{ title }}<span v-if="required">*</span>
    </label>
    <slot name="control" :is-invalid="isInvalid"></slot>

    <small
      v-if="'hint' in slots"
      class="mt-1 block text-sm text-gray-500 dark:text-gray-400"
    >
      <slot name="hint"></slot>
    </small>

    <small
      v-else-if="hint"
      class="mt-1 block text-sm text-gray-500 dark:text-gray-400"
    >
      {{ hint }}
    </small>

    <small v-if="isInvalid" class="invalid-error mt-1">
      {{ invalidMessage }}
    </small>
  </div>
</template>

<script setup>
import { computed, useSlots } from "vue";

const props = defineProps({
  title: String,
  required: {
    type: Boolean,
    default: false,
  },
  validator: Object,
  hint: String,
});

const slots = useSlots();

const isInvalid = computed(() => props.validator?.$invalid ?? false);

const invalidMessage = computed(() => {
  if (!isInvalid.value) return false;

  const message = props.validator?.$errors[0].$message;
  if (typeof message === "function")
    return message(props.validator?.$errors[0].$params);

  return message;
});
</script>
