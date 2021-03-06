import React from "react";
import "antd/dist/antd.css";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

reportWebVitals();

function render(props = {}) {
  let { container = "" } = props;
  ReactDOM.render(
    <App />,
    container
      ? container.querySelector("#root")
      : document.getElementById("root")
  );
}
console.log(window.__POWERED_BY_QIANKUN__, 2222);
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}
export async function bootstrap(props) {}
export async function mount(props) {
  console.log("react-yiran", 113333);
  render(props);
}
export async function unmount(props = {}) {
  let { container } = props;
  ReactDOM.unmountComponentAtNode(
    container
      ? container.querySelector("#root")
      : document.getElementById("root")
  );
}
