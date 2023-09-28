<template>
  <Validate
    :title="title"
    :required="required"
    :validator="validator"
    :hint="hint"
  >
    <template #control="{ isInvalid }">
      <Select
        :class="{ 'is-invalid': isInvalid }"
        :placeholder="placeholder"
        :readonly="readonly"
        :model-value="modelValue"
        @update:model-value="onUpdate"
      >
        <slot />
      </Select>
    </template>
    <template v-if="'hint' in slots" #hint>
      <slot name="hint"></slot>
    </template>
  </Validate>
</template>

<script setup>
import { useSlots } from "vue";
import Validate from "./validate.vue";
import Select from "@/widgets/select.vue";

defineProps({
  modelValue: {
    type: [String, Number, Object],
    default: "",
  },
  placeholder: String,
  readonly: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  title: String,
  validator: Object,
  hint: String,
});
const emit = defineEmits(["update:modelValue"]);
const slots = useSlots();
const onUpdate = (val) => {
  emit("update:modelValue", val);
};
</script>
