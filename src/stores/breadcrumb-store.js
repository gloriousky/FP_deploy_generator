import { defineStore } from "pinia";

export const useBreadcrumbStore = defineStore("breadcrumb-store", {
  state: () => ({
    breadcrumbs: [],
  }),
  actions: {
    set(values) {
      this.breadcrumbs = values;
    },
  },
});
