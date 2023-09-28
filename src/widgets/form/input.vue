<template>
  <Validate
    :title="title"
    :required="required"
    :validator="validator"
    :hint="hint"
  >
    <template #control="{ isInvalid }">
      <input
        class="form-control"
        :class="{ 'form-control--invalid': isInvalid }"
        :type="type"
        :placeholder="isInvalid ? '' : placeholder"
        :value="modelValue"
        @input="onChanged"
        :readonly="readonly"
        :disabled="readonly"
        autocomplete="new-password"
      />
    </template>
    <template v-if="'hint' in slots" #hint>
      <slot name="hint"></slot>
    </template>
  </Validate>
</template>

<script setup>
import { useSlots } from "vue";
import Validate from "./validate.vue";

defineProps({
  type: {
    type: String,
    default: "text",
  },
  modelValue: {
    type: [String, Number, Object],
    default: "",
  },
  required: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  title: String,
  validator: Object,
  placeholder: String,
  hint: String,
});

const emit = defineEmits(["update:modelValue"]);
const slots = useSlots();
const onChanged = (e) => {
  emit("update:modelValue", e.currentTarget.value);
};
</script>
