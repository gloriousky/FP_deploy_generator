import { defineStore } from "pinia";
import { reject, equals } from "ramda";

export const useAppStore = defineStore("app-store", {
  state: () => {
    return {
      locale: null,
      darkMode: false,
      requestQueue: [],
    };
  },
  actions: {
    setLocale(payload) {
      this.locale = payload;
    },
    setDarkMode(payload) {
      this.darkMode = payload;
    },
    addRequestQueue(apiDesc) {
      this.requestQueue = [...this.requestQueue, apiDesc];
    },
    removeRequestQueue(apiDesc) {
      this.requestQueue = reject(equals(apiDesc), this.requestQueue);
    },
    $reset() {
      this.requestQueue = [];
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: "locale",
        storage: localStorage,
        paths: ["locale"],
      },
      {
        key: "darkMode",
        storage: localStorage,
        paths: ["darkMode"],
      },
    ],
  },
});
