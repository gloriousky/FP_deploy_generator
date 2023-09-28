import { defineStore } from "pinia";
import { markRaw } from "vue";

export const useModalStore = defineStore("modal-store", {
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
        showCancelButton = false,
        showConfirmButton = true,
        cancelButtonText = "Cancel",
        confirmButtonText = "Confirm",
        props = {},
      } = option;

      this.$display = true;
      this.$timestamp = Date.now();
      this.payload = {
        title,
        text,
        component: component ? markRaw(component) : null,
        showCancelButton,
        showConfirmButton,
        cancelButtonText,
        confirmButtonText,
        props,
      };
      return new Promise((resolve) => {
        this.$resolve = resolve;
      });
    },
  },
});
