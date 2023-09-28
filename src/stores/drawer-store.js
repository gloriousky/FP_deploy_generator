import { defineStore } from "pinia";
import { markRaw } from "vue";

export const useDrawerStore = defineStore("drawer-store", {
  state: () => ({
    $display: false,
    $timestamp: -1,
    $resolve: () => {},
    payload: {},
  }),
  actions: {
    close() {
      this.$display = false;
    },
    async fire(option = {}) {
      const {
        title = null,
        text = null,
        component = null,
        confirmButtonText = "Confirm",
        props = {},
      } = option;

      this.$display = true;
      this.$timestamp = Date.now();
      this.payload = {
        title,
        text,
        component: component ? markRaw(component) : null,
        confirmButtonText,
        props,
      };
      return new Promise((resolve) => {
        this.$resolve = resolve;
      });
    },
  },
});
