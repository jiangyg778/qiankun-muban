export const contentTableConfig = {
  title: "菜单列表",
  propList: [
    { prop: "name", label: "菜单名称", minWidth: "100" },
    { prop: "type", label: "类型", minWidth: "60", slotName: "type" },
    { prop: "url", label: "菜单url", minWidth: "100", slotName: "url" },
    {
      prop: "createAt",
      label: "创建时间",
      minWidth: "220",
      slotName: "createAt",
    },
    { label: "操作", minWidth: "120", slotName: "handler" },
  ],
  showIndexColumn: true,
  showSelectColumn: true,
  childrenProps: {
    rowKey: "id",
    treeProp: {
      children: "children",
    },
  },
  showFooter: true,
};
