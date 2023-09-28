import { createPinia } from "pinia";
import persist from "pinia-plugin-persist";
import { defineProvider } from "@/_app/defines/define-provider";

export const useStoreProvider = defineProvider("store-provider", () => {
  const pinia = createPinia();
  pinia.use(persist);
  return pinia;
});
