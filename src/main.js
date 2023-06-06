import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";

import store from "./store";
import vuetify from "./pulgins/vuetify";
import router from "./router/router";

const app = createApp(App);

app.use(store).use(router).use(vuetify).mount("#app");
