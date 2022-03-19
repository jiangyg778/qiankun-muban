<template>
  <div class="container-self">
    <router-view></router-view>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Header from "./Header";
const router = useRouter();

let menuList = ref([
  { name: "form表单", path: "/form" },
  { name: "table列表", path: "/table" },
  { name: "form-table组合", path: "/form-table" },
  { name: "search-table组合", path: "/search-table" },
]);
const handleGO = ({ path }) => {
  router.push(path);
};
</script>

<style lang="less">
.container-self {
  // position: fixed;
  // top: 0;
  // left: 0;
  // width: 100%;
  // height: 100%;
  // .content {
  //   padding: 10px 10px 10px 40px;
  //   overflow: auto;
  // }
}
.el-header {
  position: relative;
  background-color: var(--bg-color);
  color: var(--el-text-color-primary);
  border-bottom: 1px solid #c0c4cc;
}
.el-aside {
  width: 240px;
  color: var(--el-text-color-primary);
  background: #fff !important;
  border-right: solid 1px #e6e6e6;
  box-sizing: border-box;
}
.el-menu {
  border-right: none;
}
.el-main {
  padding: 0;
}
.toolbar {
  position: absolute;
  display: inline-flex;
  align-items: center;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
}
.el-container {
  // height: 100%;
  height: 100%;
  height: calc(100% - 60px);
}
</style>
