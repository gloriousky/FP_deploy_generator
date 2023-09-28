<template>
  <el-dropdown trigger="click" @command="onCommand">
    <span class="el-dropdown-link">
      <slot name="default"></slot>
      <el-icon v-if="arrow" class="el-icon--right">
        <ArrowDown />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-if="'top' in slots">
          <slot name="top" />
        </el-dropdown-item>

        <el-dropdown-item
          v-for="(option, idx) in options"
          :key="option.value ?? `dropdown-item--${idx}`"
          :command="option.value"
          :disabled="option.disabled"
          :divided="option.divided"
        >
          <component
            v-if="option.isComponent"
            :is="option.children"
          ></component>
          <template v-else>
            {{ option.children }}
          </template>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup>
import { computed, useSlots, markRaw, isVNode } from "vue";
import { ArrowDown } from "@element-plus/icons-vue";
import { map, reduce, flatten } from "ramda";

defineProps({
  arrow: {
    type: Boolean,
    default: true,
  },

  /** (value: string | number) => void */
  onCommand: Function,
});

const slots = useSlots();
const options = computed(() => {
  const omitFromOption = (option) => {
    if (Array.isArray(option.children) && option.children.length > 1)
      throw "[widget dropdown] Component inside <option> renders non-element root node";

    const isComponent = isVNode(option.children[0]);

    return {
      children: isComponent ? markRaw(option.children[0]) : option.children,
      isComponent,
      divided: "divided" in (option.props ?? {}),
      disabled: "disabled" in (option.props ?? {}),
      value: option.props?.value ?? (isComponent ? null : option.children),
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
    slots.menu ? markRaw(slots.menu)() : [],
  );
});
</script>
