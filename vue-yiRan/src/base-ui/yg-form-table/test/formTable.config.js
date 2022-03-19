export const formTableConfig = {
  // labelWidth: "120px",
  // itemStyle: {
  //   padding: "10px 40px",
  // },
  // btnSettings: ["确定啊"],
  // colLayout: { span: 8 },

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
      width: 200,
      slotName: "action",
    },
    {
      label: "用户名",
      prop: "userName",
      type: "input",
      placeholder: "请输入用户名",
      width: 300,
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
      width: 100,
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
  showSelectColumn: true,
};
