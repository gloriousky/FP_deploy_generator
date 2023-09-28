<template>
  <div class="mb-4 flex flex-wrap items-end justify-between">
    <div class="items-center">
      <h1 class="block text-xl font-medium dark:text-slate-100">
        <slot name="title"></slot>
      </h1>
    </div>
    <div class="flex items-center gap-1">
      <slot name="actions"></slot>
    </div>
  </div>
</template>
