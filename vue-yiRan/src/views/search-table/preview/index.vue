<!--  -->
<template>
  <YgSearchTable
    :searchColumns="searchColumnsData"
    :tableColumns="tableColumns"
    :service="localService"
    :options="tabOptions"
    :searchFormTemp="searchFormTemp"
    @onformchange="handleChange"
    @rowselectchange="handleRowSelectChange"
    :paramsSon="paramsSon"
  >
    <!-- table顶部插槽 -->
    <template v-slot:under-search-slot>
      <div>
        <el-button size="medium" type="default" @click="exports"
          >导出</el-button
        >
      </div>
    </template>
    <!-- 操作栏插槽 -->
    <template v-slot:op="scope">
      <el-button type="text" @click="getDetail">详情</el-button>
    </template>
  </YgSearchTable>
</template>

<script>
import { reactive, onMounted } from "vue";
import { searchColumns, tableColumns, localService, options } from "./config";
import { YgSearchTable } from "@/base-ui";
import { isTemplateNode } from "vue/node_modules/@vue/compiler-core";

export default {
  components: { YgSearchTable },
  setup() {
    let tabOptions = reactive(options);

    // 设置默认值
    let paramsSon = { carrierClaimCode: 12345 };

    let searchColumnsData = reactive(searchColumns);
    onMounted(() => {
      for (const sitem of searchColumnsData) {
        if (sitem.prop === "queryList") {
          sitem.options = [
            {
              prop: "1030",
              name: "动态值",
            },
          ];
          sitem.defaultValue = sitem.options[0].prop;
        }
      }
    }),
      //注册table操作事件
      (window.clickFun = () => {
        alert("触发了");
      });

    // 详情触发
    const getDetail = () => {
      alert("详情触发了");
    };

    //
    const exports = () => {
      alert("导出触发了");
    };

    //table勾选时触发
    const handleRowSelectChange = (i) => {
      console.log(i, "选中的");
    };

    //搜索项输入改变时触发
    const handleChange = (i) => {
      console.log(i, "修改了");
    };
    return {
      searchColumns,
      tableColumns,
      localService,
      tabOptions,
      paramsSon,
      getDetail,
      exports,
      handleRowSelectChange,
      handleChange,
      searchColumnsData,
    };
  },
};
</script>
<style lang="less" scoped></style>
