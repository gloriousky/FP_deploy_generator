import { useAuthStore } from "@/stores/auth-store";

export default {
  install: (register) => {
    register.request.use((config) => {
      const { noAuth = false } = config;
      if (noAuth) return config;

      const authStore = useAuthStore();
      const accessToken = authStore.accessToken;
      if (accessToken) {
        /** 寫入 header Authorization */
        config.headers.Authorization = accessToken;
      }

      return config;
    });
  },
};
