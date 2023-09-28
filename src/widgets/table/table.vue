<template>
  <div>
    <el-table
      :data="data"
      @selection-change="selection?.change"
      @sort-change="sort?.change"
      :default-sort="sort?.default"
    >
      <el-table-column
        v-if="!!selection"
        type="selection"
        width="60"
        align="center"
      ></el-table-column>
      <el-table-column
        v-if="index"
        type="index"
        width="60"
        align="center"
        class-name="cell-index"
      ></el-table-column>
      <slot></slot>
    </el-table>
    <div v-if="'footer' in slots" class="table-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<script setup>
import { useSlots } from "vue";

defineProps({
  data: {
    type: Array,
    required: true,
  },
  index: {
    type: Boolean,
    default: true,
  },

  /**
   * 勾選操作
   * @property {Function} change (selectionRows: Array) => void
   */
  selection: Object,

  /**
   * 勾選操作
   * @property {Function} change ({ column, prop, order }) => void
   * @property {Object<prop:String, order: 'ascending' | 'descending'>} default
   */
  sort: Object,
});

const slots = useSlots();
</script>
