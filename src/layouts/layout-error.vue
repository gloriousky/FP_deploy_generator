<template>
  <div
    class="relative flex min-h-screen flex-col justify-center overflow-hidden"
  >
    <div
      class="m-auto w-full rounded bg-white shadow-lg ring-2 ring-slate-300/50 dark:bg-slate-800/60 dark:ring-slate-700/50 lg:max-w-md"
    >
      <div class="rounded-t bg-slate-900 p-6 text-center">
        <a href="#" @click.prevent="goBack">
          <img
            src="@/assets/images/logo-sm.png"
            alt=""
            class="mx-auto mb-2 h-14 w-14"
          />
        </a>
        <h3 class="mb-1 text-xl font-semibold text-white">
          Oops! Sorry page does not found
        </h3>
        <p class="text-xs text-slate-400">Back to dashboard of Base-Admin.</p>
      </div>

      <form class="p-6">
        <div class="text-center">
          <img
            src="@/assets/images/error.png"
            alt=""
            class="mx-auto my-6 block h-32 w-32"
          />
          <h1 class="text-7xl font-bold dark:text-slate-200">404!</h1>
          <h5 class="text-lg font-medium text-slate-400">
            Somthing went wrong
          </h5>
        </div>
        <div class="mt-6">
          <a
            href="#"
            class="block w-full transform rounded bg-blue-500 px-4 py-2 text-center tracking-wide text-white transition-colors duration-200 hover:bg-blue-600 focus:bg-blue-600 focus:outline-none"
            @click.prevent="goBack"
          >
            Back to Dashboard
          </a>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const goBack = () => {
  if (router.options.history.state.back) {
    router.back();
  } else {
    router.replace({
      name: "default-path",
    });
  }
};
</script>
