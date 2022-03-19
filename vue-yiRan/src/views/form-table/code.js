export const toUse = `
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


`;

export const toConfigCode = `
export const formTableConfig = {
  /**
   *   el-table-column的其他原生配置可以在formItems直接添加
   *   el-form-item每个表单元素的属性原生配置可以在otherOptions直接添加
   *
   */
  formItems: [
    {
      label: "操作",
      prop: "action",
      type: "text",
      width: 100,
      slotName: "action",
    },
    {
      label: "用户名",
      prop: "userName",
      type: "input",
      placeholder: "请输入用户名",
      width: 200,
      align: "left",
      rules: [
        {
          required: true,
          message: "请输入用户名",
          trigger: "blur",
        },
      ],
    },

    {
      label: "状态",
      prop: "enable",
      type: "select",
      placeholder: "请选择用户状态",
      width: 180,
      options: [
        { title: "启用", value: "1" },
        { title: "禁用", value: "0" },
      ],
    },
    {
      label: "类型",
      prop: "status",
      type: "text",
      slotName: "status",
    },
    {
      label: "日期",
      prop: "createAt",
      type: "datepicker",
      otherOptions: {
        startPlaceholder: "开始时间",
        endPlaceholder: "结束时间",
        type: "daterange",
      },
    },
  ],
  showIndexColumn: true,
  showSelectColumn: false,
};

`;
