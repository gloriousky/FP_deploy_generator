import { useAppStore } from "@/stores/app-store";

export default {
  install: (register) => {
    register.request.use((config) => {
      const requestId = `request--${Math.random().toString(36).substring(7)}`;
      config.requestId = requestId;
      const appStore = useAppStore();
      appStore.addRequestQueue(requestId);
      return config;
    });
    register.response.use(
      (response) => {
        const appStore = useAppStore();
        appStore.removeRequestQueue(response.config.requestId);
        return response;
      },
      (error) => {
        const appStore = useAppStore();
        appStore.removeRequestQueue(error?.response?.config?.requestId);
        return Promise.reject(error);
      },
    );
  },
};
