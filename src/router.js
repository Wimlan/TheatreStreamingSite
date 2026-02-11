import { createRouter, createWebHashHistory } from "vue-router";

import DetailedView from "./views/DetailedView.vue";
import HomeView from "./views/HomeView.vue";

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      //Behöver lägga till specifik product
      component: DetailedView,
      path: "/show/:showId",
    },
    {
      component: HomeView,
      path: "/",
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});
