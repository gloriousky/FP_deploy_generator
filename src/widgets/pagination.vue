<template>
  <ul class="pagination">
    <li
      class="pagination__item pagination__item--start"
      :class="{
        'pagination__item--disabled': isFirstDisabled,
      }"
      @click.prevent="onFirstClick"
    >
      «
    </li>
    <li
      v-for="num in pageNums"
      :key="num"
      class="pagination__item"
      :class="{
        'pagination__item--active': page === num,
      }"
      @click.prevent="onPageClick(num)"
    >
      {{ num }}
    </li>
    <li
      class="pagination__item pagination__item--end"
      :class="{
        'pagination__item--disabled': isLastDisabled,
      }"
      @click.prevent="onLastClick"
    >
      »
    </li>
  </ul>
</template>

<script setup>
import { computed } from "vue";
import { times, inc, add, max } from "ramda";

const props = defineProps({
  total: Number,
  page: Number,
  perpage: Number,
});
const emit = defineEmits(["changed", "update:page"]);

const totalPages = computed(() =>
  max(Math.ceil(props.total / props.perpage), 1),
);
const page = computed(() => {
  if (props.page < 1) return 1;
  if (props.page > totalPages.value) return totalPages.value;
  return props.page;
});

const isFirstDisabled = computed(() => page.value <= 1);
const isLastDisabled = computed(() => page.value >= totalPages.value);

const onFirstClick = () => {
  if (isFirstDisabled.value) return false;
  onPageChanged(1);
};
const onLastClick = () => {
  if (isLastDisabled.value) return false;
  onPageChanged(totalPages.value);
};
const onPageClick = (page) => {
  if (props.page === page) return false;
  onPageChanged(page);
};
const onPageChanged = (page) => {
  emit("update:page", page);
  emit("changed");
};

const pageNums = computed(() => {
  if (totalPages.value <= 5) return times(inc, totalPages.value);

  const startNum = Math.max(page.value - 2, 1);
  const endNum = Math.min(page.value + 2, totalPages.value);

  return times(add(startNum), endNum - startNum + 1);
});
</script>
