import { createRouter, createWebHashHistory } from "vue-router";
import Home from "@/views/home";
export const routes = [
  {
    path: "/",
    name: "index",
    redirect: "/form",
    component: () =>
      import(/* webpackChunkName: "index" */ "../layouts/index.vue"),
    children: [
      {
        path: "/form",
        name: "Form",
        component: () =>
          import(/* webpackChunkName: "index" */ "../views/form/index.vue"),
      },
      {
        path: "/table",
        name: "Table",
        component: () =>
          import(/* webpackChunkName: "index" */ "../views/table/index.vue"),
      },
      {
        path: "/form-table",
        name: "FormTable",
        component: () =>
          import(
            /* webpackChunkName: "index" */ "../views/form-table/index.vue"
          ),
      },
      {
        path: "/search-table",
        name: "SearchTable",
        component: () =>
          import(
            /* webpackChunkName: "index" */ "../views/search-table/index.vue"
          ),
      },
    ],
  },
];
