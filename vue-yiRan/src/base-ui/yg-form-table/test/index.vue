<!--  -->
<template>
  <div class="">
    <YgFormTable
      :config="formTableConfig"
      v-model="data"
      @selected="selected"
      ref="formTableRef"
    >
      <!-- 表单顶部插槽 -->
      <template #header>
        <el-button @click="handleAdd" type="primary">新增一行</el-button>
      </template>
      <!-- 表单内部单元插槽 -->
      <template #action="scope">
        <el-button type="text" @click="handleDel(scope)">删除</el-button>
      </template>
      <template #status="scope">
        <el-button type="" @click="getDetail(scope.row)">内部插槽</el-button>
      </template>
    </YgFormTable>
    <div class="footer">
      <el-button @click="submit" type="primary">提交</el-button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { YgFormTable } from "@/base-ui";
import { formTableConfig } from "./formTable.config.js";

export default {
  components: { YgFormTable },
  setup() {
    //formTable 数据
    let data = ref([]);

    //获取实例
    const formTableRef = ref(null);

    //demo内部插槽
    const getDetail = (i) => {
      console.log(i);
    };

    //增加一行
    const handleAdd = () => {
      data.value.push({});
    };

    //删除一行
    const handleDel = ({ row: { $index } }) => {
      data.value.splice($index, 1);
    };

    //勾选项
    const selected = (item) => {
      console.log(item);
    };

    //提交
    const submit = () => {
      //校验是否通过
      let isPass = formTableRef.value.verifyIsPass();

      //校验失败结束
      if (!isPass) return;
      //无数据失败
      if (!data.value.length) return;
      //正常提交逻辑
      console.log(data.value);
    };
    return {
      formTableConfig,
      data,
      formTableRef,
      getDetail,
      handleAdd,
      handleDel,
      submit,
      selected,
    };
  },
};
</script>
<style scoped>
.footer {
  margin-top: 10px;
  text-align: right;
}
</style>
