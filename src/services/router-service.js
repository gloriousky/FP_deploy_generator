import { defineService } from "@/_app/defines/define-service";
import { useRouterProvider } from "@/providers/router-provider";
import { useAuthStore } from "@/stores/auth-store";
import { useBreadcrumbStore } from "@/stores/breadcrumb-store";
import { path } from "ramda";

export const useRouterService = defineService("router-service", () => {
  const router = useRouterProvider();

  const initial = () => {
    router.registerBeforeResolve(async (to, from, next) => {
      if (to.name === "/login") {
        next();
        return;
      }

      const authStore = useAuthStore();
      const breadcrumbStore = useBreadcrumbStore();

      const { breadcrumbs = [] } = path(
        ["matched", 0, "components", "default"],
        to,
      );

      /* 更新個人資訊 */
      await authStore.fetchInfo();

      /* 沒有登入就導向登入頁 */
      if (!authStore.isLogin) {
        next({ name: "/login" });
        return;
      }

      /* 清掉暫存的東西 */
      breadcrumbStore.$reset();

      /* 寫入麵包屑 */
      if (breadcrumbs.length > 0) {
        breadcrumbStore.set(breadcrumbs);
      }

      next();
    });
  };

  return {
    ...router,
    initial,
  };
});
