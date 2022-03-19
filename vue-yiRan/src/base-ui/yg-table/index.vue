<template>
  <div class="page-content">
    <YgTable
      :listData="dataList"
      :listCount="dataCount"
      v-bind="config"
      v-model:page="pageInfo"
      @selectionChange="selectionChange"
    >
      <!-- 1.header中的插槽 -->
      <template #headerHandler>
        <slot name="header"></slot>
      </template>
      <template v-for="(item, index) in propSlots" :key="index" #[item]="scope">
        <slot :name="item" :row="scope.row"></slot>
      </template>
    </YgTable>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from "vue";

import YgTable from "./table.vue";

export default defineComponent({
  components: {
    YgTable,
  },
  props: {
    config: {
      type: Object,
      require: true,
    },
    queryData: {
      type: Function,
      require: true,
    },
  },
  emits: ["selected"],
  setup(props, { emit }) {
    //data数据
    let dataList = ref([]);
    //分页总数量
    let dataCount = ref(0); //分页数量
    //分页信息
    const pageInfo = ref({ currentPage: 1, pageSize: 10 });

    // 2.发送网络请求
    const getPageData = async () => {
      const { pageData = [], totalCount = 0 } = await props.queryData(
        pageInfo.value
      );
      dataList.value = pageData;
      dataCount.value = totalCount;
    };
    getPageData();

    //分页改变时更新数据
    watch(pageInfo, () => getPageData());

    //插槽集合
    const propSlots = props.config?.propList
      ?.map((item) => item?.slotName)
      .filter(Boolean);

    //选择列表项
    const selectionChange = (i) => {
      emit("selected", i);
    };

    return {
      dataList,
      dataCount,
      pageInfo,
      propSlots,
      getPageData,
      selectionChange,
    };
  },
});
</script>

<style scoped>
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
