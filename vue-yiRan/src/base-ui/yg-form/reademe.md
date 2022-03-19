# YgForm快速配置form表单  --By [ jyg ]
## 组件基于
> * "element-plus": "^1.3.0-beta.5",
> * "vue": "^3.0.0",
## 使用Demo
```javascript
<template>
  <YgForm
    :formConfig="searchFormConfig"
    @resetBtnClick="handleResetClick"
    @queryBtnClick="handleQueryClick"
  >
    <template #header>
      <div>你好啊</div>
    </template>
    <template #footer="scope">
      <el-button @click="customBtn(scope)">其他</el-button>
    </template>
  </YgForm>
</template>
```
### 配置信息
> * #header -表单顶部插槽
> * #footer -底部除确认和重置外自定义按钮scope为当前表单值
> * formConfig -表单配置信息
> * resetBtnClick -重置按钮的回调
> * queryBtnClick -确定按钮的回调 回调参数为表单的值对象

#### formConfig 配置信息
```javascript
{
  labelWidth: "120px",//label宽度
  //item样式设置
  itemStyle: {
    padding: "10px 40px",
  },
  btnSettings: ["确定"],//修改底部按钮描述文字,如不需要重置['确定',false]
  //栅格布局设置 不传则响应式处理
  colLayout: {
    span:8
  },
  formItems: [
    {
      field: "enable",//字段
      type: "select",//使用的表单组件
      label: "用户状态",//描述
      placeholder: "请选择用户状态",
      //正则
      rules: [{ required: true, message: "请选择用户状态", trigger: "blur" }],
      //配置信息
      options: [
        { title: "启用", value: 1 },
        { title: "禁用", value: 0 },
      ],
    },
    {
      field: "createAt",
      type: "datepicker",
      label: "创建时间",
      //element其他表单属性可以在这里自定义添加
      otherOptions: {
        startPlaceholder: "开始时间",
        endPlaceholder: "结束时间",
        type: "daterange",
      },
    },
  ],
}
```