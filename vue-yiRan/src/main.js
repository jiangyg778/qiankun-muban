import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import hljs from "highlight.js";
import "highlight.js/styles/color-brewer.css";
import { routes } from "./router";
import { createRouter, createWebHistory } from "vue-router";

let history;
let router;
let app;

function render(props = {}) {
  history = createWebHistory("/vue-yiRan");
  router = createRouter({
    history,
    routes,
  });
  app = createApp(App);
  let { container = "" } = props;
  app.directive("highlight", function (el) {
    let blocks = el.querySelectorAll("pre code");
    blocks.forEach((block) => {
      hljs.highlightBlock(block);
    });
  });

  app
    .use(ElementPlus)
    .use(router)
    .mount(container ? container.querySelector("#app") : "#app");
}

if (!window.__POWERED_BY_QIANKUN__) {
  render();
}
export async function bootstrap(app) {
  console.log("vue3 app bootstrap");
}
export async function mount(props) {
  console.log("vue3 app mount", props.container);
  render(props);
}
export async function unmount(app) {
  console.log("vue3 app unmount");
  history = null;
  app = null;
  router = null;
}
