<!--  -->
<template>
  <div class="form">
    <HeaderDesc
      title="Form 表单"
      desc="表单包含 输入框, 单选框, 下拉选择, 多选框 等用户输入的组件。 使用表单，您可以收集、验证和提交数据。"
      tip="基于Element 快速配置生成Form表单"
    />
    <div class="preview">
      <Preview />
    </div>
    <el-divider></el-divider>
    <h2>组件使用</h2>
    <p><span>config：</span> 必填项,组件相关的配置信息</p>
    <p><span>resetBtnClick：</span> 必填项,重置</p>
    <p><span>queryBtnClick：</span> 必填项,确定</p>
    <div class="todo" v-highlight>
      <pre><code class="html">{{toUse}}</code></pre>
    </div>
    <el-divider></el-divider>
    <h2>配置信息</h2>
    <p>
      <span>formItems：</span>
      必填项,表单项配置信息[内部属性参考form-table]
    </p>
    <p>
      <span>btnSettings：</span>
      按钮配置信息[x,null]第二个参数为null则取消重置按钮
    </p>
    <p><span> colLayout：</span> 栅格布局,不传值则响应式</p>
    <p><span> itemStyle：</span> form-item样式</p>
    <p><span> labelWidth：</span> label宽度</p>

    <div class="todo" v-highlight>
      <pre><code class="html">{{toConfigCode}}</code></pre>
    </div>
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
