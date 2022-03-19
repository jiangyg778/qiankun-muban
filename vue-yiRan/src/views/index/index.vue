<!--  -->
<template>
  <div class="title">
    <h1>控制台导航</h1>
  </div>
  <div class="container">
    <div v-for="item in actionList" class="card-item">
      <el-card class="box-card" :key="item.key">
        <div @click="linkTo(item.url)" class="active">{{ item.name }}</div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const actionList = ref([
  { key: 1, name: "NPM私服包管理", url: "http://124.221.131.186:4873/" },
  { key: 2, name: "Jenkins自动发布", url: "http://124.221.131.186:8080/" },
  { key: 3, name: "YiRan-Vue组件库", url: "http://124.221.131.186/#/UI" },
  { key: 3, name: "gitLab私有仓库", url: "http://124.221.131.186:8082/" },
]);
const router = useRouter();
const linkTo = (url) => {
  router.push("/form");
};
</script>
<style lang="less" scoped>
.title {
  text-align: center;
}
.container {
  display: flex;
  padding: 50px;
  flex-wrap: wrap;
  justify-content: space-between;
  .card-item {
    box-sizing: border-box;
    width: 48%;
    margin-bottom: 20px;
    &:hover {
      cursor: pointer;
      .active {
        color: red;
      }
    }
  }
}
</style>
