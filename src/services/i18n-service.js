import { defineService } from "@/_app/defines/define-service";
import { useI18nProvider } from "@/providers/i18n-provider";
import { useAppStore } from "@/stores/app-store";
import messages from "@/_app/locales";

export const useI18nService = defineService("i18n-service", () => {
  const i18n = useI18nProvider();

  const initial = () => {
    const appStore = useAppStore();
    if (appStore.locale) setLocale(appStore.locale);
  };

  const setLocale = (locale) => {
    const appStore = useAppStore();
    appStore.setLocale(locale);
    i18n.setLocale(locale);
  };

  const scope = (val) => {
    const t = (str, params = {}) => i18n.t(`${val}.${str}`, params);
    return {
      t,
    };
  };

  return {
    ...i18n,
    initial,
    scope,
    setLocale,
    locales: Object.keys(messages),
  };
});
