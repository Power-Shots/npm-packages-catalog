import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";

const routes = [
  {
    path: "/",
    component: Home,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory("/"),
});

export default router;
