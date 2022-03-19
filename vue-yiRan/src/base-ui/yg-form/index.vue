<template>
  <div class="page-search">
    <YgForm v-bind="config" v-model="formData" ref="ygFormRef">
      <template #header>
        <slot name="header"></slot>
      </template>
      <template #footer>
        <div class="handle-btns">
          <slot name="footer" v-bind="formData"></slot>
          <el-button
            @click="handleResetClick"
            v-if="config?.btnSettings?.[1] ?? true"
            >重置</el-button
          >
          <el-button
            type="primary"
            @click="handleQueryClick"
            v-if="config?.btnSettings?.[0] ?? true"
            >{{ config?.btnSettings?.[0] ?? "搜索" }}</el-button
          >
        </div>
      </template>
    </YgForm>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import YgForm from "./form";

export default defineComponent({
  components: { YgForm },
  props: {
    config: {
      type: Object,
      default: () => {},
    },
  },

  emits: ["resetBtnClick", "queryBtnClick"],
  setup(props, { emit }) {
    const formOriginData = {};
    // 1. formData中的属性由配置文件动态决定
    const formItems = props.config?.formItems ?? [];
    for (const item of formItems) {
      formOriginData[item.field] = "";
    }
    const formData = ref(formOriginData); //表单数据
    const ygFormRef = ref(null);
    // 2.当用户点击重置
    const handleResetClick = () => {
      formData.value = formOriginData;
      emit("resetBtnClick");
    };

    // 3.当用户点击搜索
    const handleQueryClick = () => {
      ygFormRef.value.formRef.validate((validate) => {
        if (validate) {
          //表达校验通过传递值
          emit("queryBtnClick", formData.value);
        }
      });
    };

    return {
      formData,
      ygFormRef,
      handleResetClick,
      handleQueryClick,
    };
  },
});
</script>

<style scoped>
.header {
  color: red;
}
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
