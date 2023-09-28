import { createApp } from "vue";
import App from "./App.vue";
import install from "@/_app/install";
import "./main.scss";

/**
 * mock api
 */
import "../api";

const app = createApp(App);
app.use(install);
app.mount("#app");
