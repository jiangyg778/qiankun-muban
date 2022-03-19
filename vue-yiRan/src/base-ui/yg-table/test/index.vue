<template>
  <div class="yg-table">
    <YgTable
      :contentTableConfig="contentTableConfig"
      :queryData="getData"
      @onSelected="selectionChange"
    >
      <!-- table顶部插槽 -->
      <template #header>
        <div style="display: flex">
          <div>1</div>
          <div>2</div>
        </div>
      </template>
      <!-- table内部插槽 插槽名称需与config里一致 -->
      <template #handler="scope">
        <el-button type="" @click="edit(scope.row)">编辑</el-button>
      </template>
    </YgTable>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { YgTable } from "../../index";
import { contentTableConfig } from "./table.config.js";

export default defineComponent({
  components: {
    YgTable,
  },
  setup() {
    // 此处为axios请求函数 返回一个promise对象包含{dataList,dataCount}
    const getData = (pageInfo) => {
      //pageInfo 为分页信息
      let data = {
        totalCount: 50,
        pageData: [
          {
            id: 1,
            name: "菜单1",
            type: 1,
            createAt: 1,
            children: [{ id: "1-1", name: "菜单1", type: 1, createAt: 2 }],
          },
          { id: 2, name: "菜单2", type: 1, createAt: 2 },
        ],
      };
      return new Promise((resolve, reject) => {
        resolve(data);
      });
    };
    const edit = (i) => {};
    const selectionChange = (i) => {};
    return {
      contentTableConfig,
      getData,
      edit,
      selectionChange,
    };
  },
});
</script>
