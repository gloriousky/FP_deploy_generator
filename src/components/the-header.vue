<template>
  <div
    class="block border-gray-200 bg-gray-900 px-2.5 py-2.5 shadow-sm dark:bg-slate-800 print:hidden sm:px-4"
  >
    <div
      class="container mx-0 flex max-w-full flex-wrap items-center lg:mx-auto"
    >
      <button
        class="mr-2 inline-flex items-center rounded-lg text-sm text-gray-300 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-0 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        @click="switchAsideShrink"
      >
        <span class="sr-only">Open main menu</span>
        <i class="ti ti-menu-2 h-6 w-6 text-lg leading-6"></i>
        <i class="ti ti-X hidden h-6 w-6 text-lg leading-6"></i>
      </button>

      <div class="flex items-center">
        <a href="#" class="flex items-center outline-none">
          <img src="@/assets/images/logo-sm.png" alt="" class="h-6" />
          <div class="ml-2 hidden text-xl font-bold text-white xl:block">
            Base Admin
          </div>
        </a>
      </div>

      <div class="order-1 ml-auto flex items-center gap-3 md:order-2">
        <div>
          <button id="toggle-theme" class="relative" @click="switchDarkMode">
            <i v-if="darkMode" class="ti ti-sun top-icon"></i>
            <i v-else class="ti ti-moon top-icon"></i>
          </button>
        </div>
        <Dropdown :arrow="false">
          <i class="ti ti-bell text-2xl text-gray-400"></i>
          <template #menu>
            <option disabled>None.</option>
          </template>
        </Dropdown>
        <Dropdown :arrow="false">
          <a href="#" class="flex items-center rounded-full text-sm">
            <img
              class="h-8 w-8 rounded-full"
              :src="`${userInfo.avatarUrl}/50.png`"
              alt="user photo"
            />
          </a>
          <template #top>
            <div>
              <span
                class="block text-sm font-medium text-gray-900 dark:text-white"
              >
                {{ userInfo.fullName }}
              </span>
              <span
                class="block truncate text-sm font-normal text-gray-500 dark:text-gray-400"
              >
                {{ userInfo.username }}
              </span>
            </div>
          </template>
          <template #menu>
            <option divided>個人資料</option>
            <option>
              <a @click.prevent="onLogout">登出系統</a>
            </option>
          </template>
        </Dropdown>
      </div>
    </div>
  </div>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth-store";
import { useAppStore } from "@/stores/app-store";

/** services */
import { useDialogService } from "@/services/dialog-service";
import { useI18nService } from "@/services/i18n-service";

/** components */
import Dropdown from "@/widgets/dropdown.vue";

/** defines */
const emit = defineEmits(["update:aside-shrink"]);

/** hooks */
const router = useRouter();
const appStore = useAppStore();
const authStore = useAuthStore();
const { darkMode } = storeToRefs(appStore);
const { userInfo } = storeToRefs(authStore);
const dialogService = useDialogService();
const { t } = useI18nService();

const switchAsideShrink = () => {
  emit("update:aside-shrink");
};

const switchDarkMode = () => {
  appStore.setDarkMode(!darkMode.value);
};

const onLogout = async () => {
  const { isConfirmed } = await dialogService.confirmWarning({
    title: t("app.logout.confirm.title"),
    message: t("app.logout.confirm.text"),
    confirmButtonText: t("button.ok"),
    cancelButtonText: t("button.cancel"),
  });
  if (isConfirmed) {
    await authStore.logout();
    router.push({ name: "/login" });
  }
};
</script>
