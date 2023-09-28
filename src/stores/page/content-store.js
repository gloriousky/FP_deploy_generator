import { defineStore } from "pinia";
import { useHttpService } from "@/services/http-service";

export const usePageContentStore = defineStore("page-content-store", {
  state: () => {
    return {
      records: [],
      totalRecords: 0,
      perPage: 10,
      page: 1,
    };
  },
  actions: {
    async readList(payload) {
      const http = useHttpService();
      const res = await http.get("/page", {
        // mockjs 帶 parmas 會錯
        // params: {
        //   keyword: payload.keyword,
        //   status: payload.status,
        //   perPage: payload.perPage,
        //   page: payload.page
        // }
      });
      if (res.code === 0) {
        this.records = res.data;
        this.page = payload.page;
      }
      return res.code;
    },

    async readTotal() {
      const http = useHttpService();
      const res = await http.get("/page/total");
      if (res.code === 0) {
        this.totalRecords = res.data;
      }
      return res.code;
    },

    async create(payload) {
      const http = useHttpService();
      const res = await http.post("/page", {
        title: payload.title,
        content: payload.content,
        status: payload.status,
      });
      return res.code;
    },

    async update(payload) {
      const http = useHttpService();
      const res = await http.put("/page", {
        id: payload.id,
        title: payload.title,
        content: payload.content,
        status: payload.status,
      });
      return res.code;
    },

    async delete(payload) {
      const http = useHttpService();
      const res = await http.put("/page/delete", {
        id: payload.id,
      });
      return res.code;
    },
  },
});
