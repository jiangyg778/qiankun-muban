<template>
  <div class="render">
    <!-- 按钮区域 -->
    <slot name="btnGroup"></slot>
    <!-- 表格展示区域 -->
    <div class="render-data">
      <div :class="['render-table', { 'float-scroll-bar': isFloatBar }]">
        <!-- 表格展示 -->
        <slot></slot>
        <!-- 分页标签 -->
        <slot name="pagination"></slot>
      </div>
    </div>
  </div>
</template>
<script>
import {
  defineComponent,
  onUpdated,
  onBeforeUnmount,
  onActivated,
  onDeactivated,
  ref,
} from "vue";
import { renderScrollBar } from "../../utils/utils";
export default defineComponent({
  props: {
    isFloatBar: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  setup(props) {
    const isFloatBar = props.isFloatBar;
    let count = ref(0);
    // 激活
    onActivated(() => {
      if (isFloatBar) {
        window.addEventListener("scroll", renderScrollBar, true);
        window.addEventListener("resize", renderScrollBar, true);
      }
    });
    // 取消激活
    onDeactivated(() => {
      if (isFloatBar) {
        window.removeEventListener("scroll", renderScrollBar);
        window.removeEventListener("resize", renderScrollBar);
        count.value = 0;
      }
    });
    // 实例销毁前
    onBeforeUnmount(() => {
      if (isFloatBar) {
        window.removeEventListener("scroll", renderScrollBar);
        window.removeEventListener("resize", renderScrollBar);
      }
    });

    onUpdated(() => {
      if (isFloatBar && count.value === 0) {
        setTimeout(renderScrollBar, 1000);
        count.value++;
      }
    });

    return {};
  },
});
</script>
<style>
.render {
  flex: auto;
  margin-top: 12px;
  padding: 24px;
  /* min-height: 600px; */
  background-color: #ffffff;
  border-radius: 4px;
}

.render .btn-group {
  margin-bottom: 24px;
}

.render .render-data {
  display: flex;
  flex-flow: row;
}

.render .render-table {
  flex: 1;
  width: 0;
  overflow-x: auto;
}
</style>
<style lang="css" scoped>
:deep(.float-scroll-bar .el-table--scrollable-y .el-table__body-wrapper) {
  overflow-y: hidden !important;
}
</style>
