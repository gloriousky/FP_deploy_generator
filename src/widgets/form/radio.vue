<template>
  <Validate
    :title="title"
    :required="required"
    :validator="validator"
    :hint="hint"
  >
    <template #control>
      <Radio
        :readonly="readonly"
        :model-value="modelValue"
        @update:model-value="onUpdate"
        @change="onChange"
        @command="onCommand"
      >
        <slot />
      </Radio>
    </template>
    <template v-if="'hint' in slots" #hint>
      <slot name="hint"></slot>
    </template>
  </Validate>
</template>

<script setup>
import { useSlots } from "vue";
import Validate from "./validate.vue";
import Radio from "@/widgets/radio.vue";

defineProps({
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
  onChange: Function,
  onCommand: Function,
  title: String,
  validator: Object,
  hint: String,
});

const emit = defineEmits(["update:modelValue", "click"]);
const slots = useSlots();
const onUpdate = (val) => {
  emit("update:modelValue", val);
};
</script>
