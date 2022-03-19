<template>
  <YgForm
    :config="config"
    @resetBtnClick="handleResetClick"
    @queryBtnClick="handleQueryClick"
  >
    <template #header>
      <div>form 预览</div>
    </template>
    <template #footer="scope">
      <el-button @click="customBtn(scope)">其他</el-button>
    </template>
  </YgForm>
</template>

<script>
import { YgForm } from "@/base-ui";
import { config } from "./form.config.js";
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
      console.log("插槽按钮", item);
    };
    return { handleResetClick, customBtn, handleQueryClick, config };
  },
};
</script>
