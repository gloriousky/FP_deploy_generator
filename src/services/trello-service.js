import { defineService } from "@/_app/defines/define-service";
import { useAuthStore } from "@/stores/auth-store";
import { useRouter } from "vue-router";
export const useTrelloService = defineService("trello-service", () => {
  const authStore = useAuthStore();
  const router = useRouter();

  const login = () => {
    const url = new URL("/1/authorize", "https://trello.com");
    url.search = new URLSearchParams({
      expiration: "1day",
      name: "MyPersonalToken",
      scope: "read",
      response_type: "token",
      key: import.meta.env.VITE_API_KEY,
      callback_method: "postMessage",
      return_url: `${location.origin}#/token`,
    });
    window.open(
      url.href,
      "_blank",
      "popup=1,scrollbars=1,menubar=0,toolbar=0,resizable=0,location=0,status=0,top=64,width=980,height=768",
    );

    window.addEventListener(
      "message",
      (event) => {
        if (event.origin !== "https://trello.com") return;
        authStore.$state.accessToken = event.data;
        router.push({ name: "/dashboard" });
      },
      { once: true },
    );
  };

  const switchBoard = (index) => {
    authStore.$state.currentBoardId = authStore.$state.userInfo.idBoards[index];
  };

  const switchList = (index) => {
    authStore.$state.currentListId = authStore.$state.listInfo[index].id;
  };

  const getBoardInfo = async () => {
    const res = await authStore.getBoardInfo();
    return res;
  };

  const getListsInfo = async () => {
    const res = await authStore.getListsInfo();
    return res;
  };

  const getCardsInList = async () => {
    const res = await authStore.getCardsInList();
    return res;
  };

  return {
    login,
    switchBoard,
    switchList,
    getBoardInfo,
    getListsInfo,
    getCardsInList,
  };
});
