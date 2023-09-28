import { createI18n } from "@arshown/vue3-i18n";
import { defineProvider } from "@/_app/defines/define-provider";
import messages from "@/_app/locales";

export const useI18nProvider = defineProvider("i18n-provider", () => {
  const i18n = createI18n({
    initLocale: import.meta.env.VITE_INIT_LOCALE, //使用語系
    fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE, //語系無資料時，備用語系
    messages, //語系資料
  });
  return i18n;
});
