import { defineService } from "@/_app/defines/define-service";
import { useHttpProvider } from "@/providers/http-provider/http-provider";
import logger from "@/providers/http-provider/interceptors/logger";
import auth from "@/providers/http-provider/interceptors/auth";
import effect from "@/providers/http-provider/interceptors/effect";
import request from "@/providers/http-provider/interceptors/request";
import response from "@/providers/http-provider/interceptors/response";

export const useHttpService = defineService("http-service", () => {
  const provider = useHttpProvider();

  provider.setbaseURL(import.meta.env.VITE_API_URL);

  /** registers */
  provider.use(
    auth,
    request,
    import.meta.env.DEV ? logger : {},
    effect,
    response,
  );

  return provider;
});
