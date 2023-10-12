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
    window.open(url.href, "_blank");

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

  const getBoardInfo = async() => {
    const res = await authStore.getBoardInfo();
    return res;
  }

  const swtichBoard = (index) => {
    authStore.$state.currentBoardId = authStore.$state.userInfo.idBoards[index];
  }

  const swtichList = (index) => {
    authStore.$state.currentListId = authStore.$state.listInfo[index].id;
  }

  const getListsInfo = async() => {
    await authStore.getListsInfo();
  }

  const getCardsInList = async() => {
    const res = await authStore.getCardsInList();
    return res;
  }

  return { login, swtichBoard, swtichList, getBoardInfo, getListsInfo, getCardsInList };
});
