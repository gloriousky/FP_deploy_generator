import { createRouter, createWebHashHistory } from "vue-router";
import createRoutes from "@/_app/routes";
import { defineProvider } from "@/_app/defines/define-provider";

export const useRouterProvider = defineProvider("router-probider", () => {
  const options = {
    defaultPath: "/dashboard",
  };

  const router = createRouter({
    history: createWebHashHistory(
      import.meta.env.BASE_URL /* read from vite.config.js */,
    ),
    routes: createRoutes(options),
  });

  const custom = {
    beforeResolve: null,
  };
  const registerBeforeResolve = (fn) => {
    custom.beforeResolve = fn;
  };

  router.beforeResolve(async (to, from, next) => {
    /* 分頁切換 */
    if (to.path === from.path) {
      next();
      return;
    }

    /** 404 */
    if (to.name === "not-found") {
      next();
      return;
    }

    if (custom.beforeResolve) {
      await custom.beforeResolve(to, from, next);
      return;
    }

    next();
  });

  return {
    router,
    install: router.install.bind(router),
    registerBeforeResolve,
  };
});
