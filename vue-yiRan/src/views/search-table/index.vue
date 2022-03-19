<!--  -->
<template>
  <div class="form">
    <HeaderDesc
      title="SearchTable 表格"
      desc="整合搜索栏和结果列表并进行对应操作。"
      tip="基于Element 快速配置生成Table表单"
    />
    <div class="form-preview">
      <Preview />
    </div>
    <el-divider></el-divider>
    <h2>组件使用</h2>
    <!-- <p><span>config：</span> 必填项,组件相关的配置信息</p>
    <p><span>queryData：</span> 必填项,列表数据查询方法,返回data</p>
    <p><span>selected：</span> 选填项,用于接收组件的勾选项的值信息</p>
    <div class="todo" v-highlight>
      <pre><code class="html">{{toUse}}</code></pre>
    </div>
    <el-divider></el-divider>
    <h2>配置信息</h2>
    <p>
      <span>propList：</span>
      必填项,列表信息
    </p>
    <p class="child"><span>lable </span>column 的 key(名称)</p>
    <p class="child"><span>prop </span>对应列内容的字段名</p>
    <p class="child"><span>slotName </span>放置的插槽名称</p>
    <p><span>showIndexColumn：</span> 是否展示序号</p>
    <p><span>childrenProps：</span> 树形结构配置信息</p>
    <p class="child"><span>rowKey </span>行数据的 Key，用来优化 Table 的渲染</p>
    <p class="child"><span>treeProp </span>渲染嵌套数据的配置选项</p>
    <p><span>showSelectColumn：</span> 是否展示勾选</p>
    <p><span>showFooter：</span> 是否展示分页</p>
    <p><span>title：</span> table标题</p>
    <div class="todo" v-highlight>
      <pre><code class="html">{{toConfigCode}}</code></pre>
    </div> -->
  </div>
</template>

<script setup>
import {} from "vue";
import HeaderDesc from "@/components/header-desc";
import Preview from "./preview";
import { toUse, toConfigCode } from "./code";
</script>
<style lang="less" scoped>
.form-preview {
  width: 100%;
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
