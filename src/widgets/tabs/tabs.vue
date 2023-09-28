<template>
  <el-tabs
    tab-position="top"
    @tab-change="onChange"
    :before-leave="onBeforeLeave"
  >
    <slot />
  </el-tabs>
</template>
<script setup>
defineProps({
  /** (name: TabPaneName) => void */
  onChange: Function,

  /** (activeName, oldActiveName) => Boolean */
  onBeforeLeave: Function,
});
</script>
