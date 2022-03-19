# YgForm快速配置Table列表  --By [ jyg ]
## 组件基于
> * "element-plus": "^1.3.0-beta.5",
> * "vue": "^3.0.0",
## 使用Demo 详见test
```javascript
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
```
### 配置信息
> * #header -table顶部插槽
> * #xxx -table内置插槽,名称与配置信息一致
> * formConfig -表单配置信息
> * queryData -传递给table组件的请求回调函数
> * onSelected -table勾选值
#### formConfig 配置信息
```javascript
export const contentTableConfig = {
  title: "菜单列表",//table顶部左侧名称
  
  /*
  prop:每列对应的字段,
  lable:描述信息,
  minWidth:宽度,
  slotName:插槽名称
  showIndexColumn:是否展示序号
  showSelectColumn:是否开启选择
  childrenProps:是否内部还有table
  rowKey对应的key
  treeProp内部对应的值包裹对象
  */
  propList: [
    { prop: "name", label: "菜单名称", minWidth: "100" },
    { prop: "type", label: "类型", minWidth: "60" },
    { prop: "url", label: "菜单url", minWidth: "100" },
    { prop: "icon", label: "菜单icon", minWidth: "100" },
    { prop: "permission", label: "按钮权限", minWidth: "100" },
    {
      prop: "createAt",
      label: "创建时间",
      minWidth: "220",
      slotName: "createAt",
    },
    {
      prop: "updateAt",
      label: "更新时间",
      minWidth: "220",
      slotName: "updateAt",
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

```