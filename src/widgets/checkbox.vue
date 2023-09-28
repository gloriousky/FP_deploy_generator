<template>
  <el-checkbox-group :disabled="readonly" @change="onChange">
    <el-checkbox
      v-for="item in options"
      :key="item.value ?? `checkbox-item--${idx}`"
      :label="item.value"
      @change="
        (value) =>
          onCommand?.(value, {
            value: item.value,
            ...item.props,
          })
      "
    >
      <component v-if="item.isComponent" :is="item.children"></component>
      <template v-else>
        {{ item.children }}
      </template>
    </el-checkbox>
  </el-checkbox-group>
</template>

<script setup>
import { computed, useSlots, markRaw, isVNode } from "vue";

import { map, reduce, flatten } from "ramda";

defineProps({
  readonly: {
    type: Boolean,
    default: false,
  },

  /** (value: string[] | number[]) => void */
  onChange: Function,

  /** (value: string | number | boolean , scope: Object) => void */
  onCommand: Function,
});

const slot = useSlots();
const options = computed(() => {
  const omitFromOption = (option) => {
    if (Array.isArray(option.children) && option.children.length > 1)
      throw "[widget select] Component inside <option> renders non-element root node";

    const isComponent = isVNode(option.children[0]);

    const { value, disabled = false, ...props } = option.props ?? {};

    return {
      children: isComponent ? markRaw(option.children[0]) : option.children,
      isComponent,
      value: value ?? (isComponent ? null : option.children),
      disabled,
      props,
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
</script>
