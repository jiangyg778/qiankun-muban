<template>
  <div class="yg-table">
    <YgTable
      :config="contentTableConfig"
      :queryData="getData"
      @selected="selectionChange"
    >
      <!-- table顶部插槽 -->
      <template #header>
        <div style="display: flex">
          <div>顶部插槽</div>
        </div>
      </template>
      <!-- table内部插槽 插槽名称需与config里一致 -->
      <template #type="scope">
        <span>{{ scope.row.type === 1 ? "是" : "否" }}</span>
      </template>
      <template #url="scope">
        <el-image :src="scope.row.url"></el-image>
      </template>
      <template #handler="scope">
        <el-button type="text" @click="edit(scope.row)">编辑</el-button>
      </template>
    </YgTable>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { YgTable } from "@/base-ui";
import { contentTableConfig } from "./table.config.js";

export default defineComponent({
  components: {
    YgTable,
  },
  setup() {
    // 此处为axios请求函数 返回一个promise对象包含{dataList,dataCount}
    const getData = (pageInfo) => {
      console.log(pageInfo);

      //pageInfo 为分页信息
      let data = {
        totalCount: 50,
        pageData: [
          {
            id: 1,
            name: "人事部",
            type: 1,
            url: "https://www.baidu.com/img/flexible/logo/pc/result.png",
            createAt: new Date().getTime(),
            children: [
              {
                id: "1-1",
                name: "外包",
                type: 0,
                createAt: 1642580993140,
                url: "http://www.soso.com/soso/images/logo_index_soso.png?v=2",
              },
            ],
          },
          {
            id: 2,
            name: "后勤部",
            type: 0,
            createAt: 1642580993140,
            url: "https://p.ssl.qhimg.com/t012cdb572f41b93733.png",
          },
        ],
      };
      return new Promise((resolve, reject) => {
        resolve(data);
      });
    };
    const edit = (i) => {
      console.log(i);
    };
    //选中
    const selectionChange = (i) => {
      console.log(i);
    };
    return {
      contentTableConfig,
      getData,
      edit,
      selectionChange,
    };
  },
});
</script>
