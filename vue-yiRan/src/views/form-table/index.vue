<!--  -->
<template>
  <div class="form">
    <HeaderDesc
      title="Form-Table 表单"
      desc="用于结合form和table 提供布局和表单。"
      tip="基于Element 快速配置生成Form-Table表单"
    />
    <div class="preview">
      <Preview />
    </div>
    <el-divider></el-divider>
    <h2>组件使用</h2>
    <p><span>config：</span> 必填项,组件相关的配置信息</p>
    <p><span>v-model：</span> 必填项,接收组件表单项的值信息</p>
    <p><span>selected：</span> 选填项,用于接收组件的勾选项的值信息</p>
    <p>
      <span>ref：</span>

      选填项,该属性提供verifyIsPass方法,返回一个布尔值,来确定表单校验是否通过
    </p>
    <div class="todo" v-highlight>
      <pre><code class="html">{{toUse}}</code></pre>
    </div>
    <el-divider></el-divider>
    <h2>配置信息</h2>
    <p>
      <span>formItems：</span>
      必填项,列表信息[注意:table-column的原生配置可直接在该属性添加]
    </p>
    <p class="child"><span>lable </span>column 的 key(名称)</p>
    <p class="child"><span>prop </span>对应列内容的字段名</p>
    <p class="child"><span>type </span>对应列表单元素的类型</p>
    <p class="child"><span>placeholder </span>placeholder内容</p>
    <p class="child"><span>rules </span>表单元素的校验规则</p>
    <p class="child"><span>slotName </span>放置的插槽名称</p>
    <p class="child"><span>options </span>select的枚举项</p>
    <p class="child">
      <span>otherOptions </span
      >form-item里表单元素的原生配置信息可直接在该属性添加
    </p>

    <p><span>showIndexColumn：</span> 是否展示序号</p>
    <p><span>showSelectColumn：</span> 是否展示勾选</p>

    <div class="todo" v-highlight>
      <pre><code class="html">{{toConfigCode}}</code></pre>
    </div>
    <el-divider></el-divider>
  </div>
</template>

<script setup>
import {} from "vue";
import HeaderDesc from "@/components/header-desc";
import Preview from "./preview";
import { toUse, toConfigCode } from "./code";
</script>
<style lang="less" scoped>
.preview {
  width: 80%;
}
.todo {
  width: 80%;
  font-size: 15px;
  max-height: 500px;
  overflow: auto;
  position: relative;
  z-index: 1;
  margin: 0;
  padding: 5px;
  background: transparent;
  border: 1px solid #c0c4cc;
}
p {
  margin: 1rem 0;
  line-height: 1.7;
  span {
    background-color: var(--el-color-primary-light-9);
  }
}
.child {
  margin-left: 50px;
  span {
    margin-right: 5px;
  }
}
</style>
