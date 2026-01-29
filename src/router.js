import { createRouter, createWebHashHistory } from "vue-router";

import DetailedView from "./views/DetailedView.vue";
import FavoriteView from "./views/FavoriteView.vue";
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
      component: FavoriteView,
      path: "/favorites",
    },
    {
      component: HomeView,
      path: "/",
    },
  ],
});
