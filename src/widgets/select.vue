<template>
  <el-select-v2
    class="w-full"
    :options="options"
    :placeholder="placeholder"
    :multiple="isMultiple"
    :disabled="readonly"
    :filterable="filterable"
    :model-value="modelValue"
    @update:model-value="onUpdate"
  >
    <template #default="{ item }">
      <component v-if="item.isComponent" :is="item.label"></component>
      <template v-else>
        {{ item.label }}
      </template>
    </template>
  </el-select-v2>
</template>
<script setup>
import { computed, useSlots, markRaw, isVNode } from "vue";

import { map, reduce, flatten } from "ramda";

const props = defineProps({
  modelValue: {},
  placeholder: String,
  filterable: {
    type: Boolean,
    default: true,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["update:modelValue"]);

const slot = useSlots();
const options = computed(() => {
  const omitFromOption = (option) => {
    if (Array.isArray(option.children) && option.children.length > 1)
      throw "[widget select] Component inside <option> renders non-element root node";

    const isComponent = isVNode(option.children[0]);

    return {
      label: isComponent ? markRaw(option.children[0]) : option.children,
      isComponent,
      value: option.props?.value ?? (isComponent ? null : option.children),
      disabled: "disabled" in (option.props ?? {}),
    };
  };

  const decodeChild = (slot) => {
    switch (slot.type.toString()) {
      case "Symbol(v-fgt)":
        //v-for
        return map(decodeChild, slot.children);
      case "option":
        return [omitFromOption(slot)];
      default:
        return [];
    }
  };

  return reduce(
    (arr, slot) => flatten([...arr, ...decodeChild(slot)]),
    [],
    slot.default ? markRaw(slot.default)() : [],
  );
});

/** 由綁定的型別去識別單選還是多選 */
const isMultiple = computed(() => Array.isArray(props.modelValue));

const onUpdate = (val) => {
  emit("update:modelValue", val);
};
</script>
