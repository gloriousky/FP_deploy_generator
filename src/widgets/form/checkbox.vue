<template>
  <Validate
    :title="title"
    :required="required"
    :validator="validator"
    :hint="hint"
  >
    <template #control>
      <Checkbox
        :readonly="readonly"
        :model-value="modelValue"
        @update:model-value="onUpdate"
        @change="onChange"
        @command="onCommand"
      >
        <slot />
      </Checkbox>
    </template>
    <template v-if="'hint' in slots" #hint>
      <slot name="hint"></slot>
    </template>
  </Validate>
</template>

<script setup>
import { useSlots } from "vue";
import Validate from "./validate.vue";
import Checkbox from "@/widgets/checkbox.vue";

defineProps({
  modelValue: Array,
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
