import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import store from "@/store";
import Home from "@/views/Home.vue";
import Chat from "@/views/Chat.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/chat",
    name: "Chat",
    component: Chat,
    beforeEnter: (to, from, next) => {
      if (store.state.user) {
        next();
      } else {
        next("/");
      }
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
