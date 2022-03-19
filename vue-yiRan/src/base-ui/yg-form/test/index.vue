<template>
  <YgForm
    :formConfig="searchFormConfig"
    @resetBtnClick="handleResetClick"
    @queryBtnClick="handleQueryClick"
  >
    <template #header>
      <div>你好啊</div>
    </template>
    <template #footer="scope">
      <el-button @click="customBtn(scope)">其他</el-button>
    </template>
  </YgForm>
</template>

<script>
import { YgForm } from "../../index";
import { searchFormConfig } from "./search.config.js";
export default {
  components: { YgForm },
  setup() {
    //重置
    const handleResetClick = (item) => {
      console.log(item);
    };
    //确定
    const handleQueryClick = (item) => {
      console.log(item);
    };
    //其他按钮
    const customBtn = (item) => {
      console.log(item);
    };
    return { handleResetClick, customBtn, handleQueryClick, searchFormConfig };
  },
};
</script>
