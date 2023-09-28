<template>
  <component :is="layout" :key="locale">
    <router-view v-slot="{ Component }">
      <transition
        name="fade"
        enter-active-class="animate__animated animate__fadeIn"
      >
        <component :is="Component" />
      </transition>
    </router-view>
  </component>
  <the-loading />
  <the-backtop />
</template>

<script setup>
import { computed, watch } from "vue";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { useAppStore } from "./stores/app-store";
import { useI18nService } from "@/services/i18n-service";
import { useRouterService } from "@/services/router-service";
import { isNil, defaultTo, path } from "ramda";

const route = useRoute();
const appStore = useAppStore();
const { darkMode } = storeToRefs(appStore);
const i18nService = useI18nService();
const routerService = useRouterService();
const locale = computed(() => i18nService.locale);
const layout = computed(() => {
  /* 一開始都是 undefined */
  if (isNil(route.path)) return null;
  /* 拿設定的 layout */
  return defaultTo(null)(path(["meta", "layout"], route));
});

/** initial */
i18nService.initial();
routerService.initial();

/** 監聽黑暗模式 */
watch(
  darkMode,
  (darkMode) => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.body.dataset.layoutMode = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      document.body.dataset.layoutMode = "light";
    }
  },
  { immediate: true },
);

/** 監聽語系切換 */
watch(
  i18nService.locale,
  (locale) => {
    document.documentElement.lang = locale;
  },
  { immediate: true },
);
</script>
