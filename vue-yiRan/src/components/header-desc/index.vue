<!--  -->
<template>
  <div class="header-desc">
    <h1>{{ title }}</h1>
    <p>{{ desc }}</p>
    <div class="custom-block" v-if="tip">
      {{ tip }}
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
defineProps({
  title: {
    type: String,
  },
  desc: {
    type: String,
  },
  tip: {
    type: String,
  },
});
</script>
<style lang="less" scoped>
h1 {
  font-size: 2.2rem;
}
p {
  margin: 1rem 0;
  line-height: 1.7;
}
.custom-block {
  padding: 8px 16px;
  background-color: var(--el-color-primary-light-9);
  border-radius: 4px;
  border-left: 5px solid var(--el-color-primary);
  margin: 20px 0;
}
</style>
