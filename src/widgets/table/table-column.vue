<template>
  <el-table-column
    v-if="!(mobileHidden && isMobile)"
    :prop="field"
    :label="title"
    :class-name="className"
    :sortable="sortable"
    :sort-method="sortMethod"
    :align="align"
    :width="width"
    :minWidth="minWidth"
  >
    <template v-slot="scope">
      <slot
        v-if="'default' in slots"
        v-bind="{ ...scope, data: scope.row[field] }"
      />
      <template v-else>
        {{ scope.row[field] }}
      </template>
    </template>
  </el-table-column>
</template>
<script setup>
import { useSlots } from "vue";
import { useMobile } from "@/hooks/use-mobile";

defineProps({
  field: String,
  title: String,
  className: String,
  sortable: Boolean,
  sortMethod: Function /** function(a, b) */,
  align: String,
  width: [String, Number],
  minWidth: [String, Number],
  mobileHidden: {
    type: Boolean,
    default: false,
  },
});

const slots = useSlots();
const { isMobile } = useMobile();
</script>
