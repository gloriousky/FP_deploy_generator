<template>
  <div
    class="relative flex min-h-screen flex-col justify-center overflow-hidden"
  >
    <div
      class="m-auto w-full rounded bg-white shadow-lg ring-2 ring-slate-300/50 dark:bg-slate-800/60 dark:ring-slate-700/50 lg:max-w-md"
    >
      <div class="rounded-t bg-slate-900 p-6 text-center">
        <img
          src="@/assets/images/logo-sm.png"
          alt=""
          class="mx-auto mb-2 h-14 w-14"
        />
        <h3 class="mb-1 text-xl font-semibold text-white">Base-Admin</h3>
        <p class="text-xs text-slate-400">Sign in as a Admin User</p>
      </div>
      <slot></slot>
    </div>
  </div>
</template>
