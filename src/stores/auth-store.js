import { defineStore } from "pinia";
import { useAppStore } from "./app-store";
import { useHttpService } from "@/services/http-service";
import { definePerms, toPerms } from "./_lib/permission-discern";
import { cookiesStorage } from "./_lib/storages/cookies-storage";
import { pipe } from "ramda";

export const useAuthStore = defineStore("auth-store", {
  state: () => ({
    accessToken: null,
    userInfo: {},
    currentBoardId: null,
    listInfo: [],
    currentListId: null,
    authKeep: null,
  }),
  getters: {
    isLogin: (state) => "id" in state.userInfo,
    permissions: (state) => state.userInfo.perms ?? [],
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: "accessToken",
        storage: cookiesStorage(),
        paths: ["accessToken"],
      },
      {
        key: "authKeep",
        storage: cookiesStorage(),
        paths: ["authKeep"],
      },
    ],
  },
  actions: {
    hasPermission(permStr) {
      if (permStr === "") return true;
      /**
       * Sample
       * const validPerm = definePerms(["CREATE", "READ", "DELETE"])
       * pipe(toPerms, validPerm)("READ + UPDATE"); // = false
       * pipe(toPerms, validPerm)("READ + ( CREATE | UPDATE )"); // = true
       * pipe(toPerms, validPerm)("! UPDATE"); // = true
       */
      const validPerm = definePerms(this.permissions);
      return pipe(toPerms, validPerm)(permStr);
    },

    /** API */
    async login(payload) {
      const http = useHttpService();
      const res = await http.post("/login", {
        account: payload.account,
        password: payload.password,
      });
      if (res.code === 0) {
        this.accessToken = res.data.token;
        /** keep account */
        if (payload.remember) {
          this.authKeep = payload.account;
        }
      }
      return res;
    },

    clearAuthKeep() {
      this.authKeep = null;
    },

    async logout() {
      const appStore = useAppStore();

      /** this states reset */
      this.accessToken = null;
      this.userInfo = {};

      appStore.$reset();
    },

    async fetchInfo() {
      const http = useHttpService();
      const res = await http.get("/members/me", {
        params: {
          key: import.meta.env.VITE_API_KEY,
          token: this.accessToken,
        },
      });
      this.userInfo = res;
      return res;
    },

    async getBoardInfo() {
      const http = useHttpService();
      const res = await http.get(`/boards/${this.currentBoardId}`, {
        params: {
          key: import.meta.env.VITE_API_KEY,
          token: this.accessToken,
        },
      });
      return res;
    },
    async getListsInfo() {
      const http = useHttpService();
      const res = await http.get(`/boards/${this.currentBoardId}/lists`, {
        params: {
          key: import.meta.env.VITE_API_KEY,
          token: this.accessToken,
        },
      });
      this.listInfo = res;
      return res;
    },
    async getCardsInList() {
      const http = useHttpService();
      const res = await http.get(`/lists/${this.currentListId}/cards`, {
        params: {
          key: import.meta.env.VITE_API_KEY,
          token: this.accessToken,
        },
      });
      return res;
    }
  },
});
