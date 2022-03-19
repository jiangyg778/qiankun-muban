<!--  -->
<template>
  <div class="yg-form-table">
    <div class="header">
      <!-- 顶部插槽 -->
      <slot name="header"></slot>
    </div>
    <YgFormTable
      ref="ygFormTableRef"
      v-bind="config"
      :data="modelValue"
      :jsonData="modelValue"
      @update:jsonData="update"
      @selectedRow="selectedRow"
    >
      <!-- 内部插槽[管理form-table内部 并暴露给父组件] -->
      <template v-for="(item, index) in propSlots" :key="index" #[item]="scope">
        <slot :name="item" :row="scope.row"></slot>
      </template>
    </YgFormTable>
  </div>
</template>

<script>
import { ref } from "vue";
import YgFormTable from "./form-table.vue";
export default {
  components: { YgFormTable },
  props: {
    config: {
      type: Object,
      default: () => {},
    },
    modelValue: {
      type: Object,
      default: () => {},
    },
  },
  emits: ["update:modelValue", "selected"],
  setup(props, { emit }) {
    const ygFormTableRef = ref(null);

    //插槽集合
    const propSlots = props.config?.formItems
      ?.map((item) => item?.slotName)
      .filter(Boolean);

    //校验是否通过
    const verifyIsPass = () => {
      let isPass = false;
      ygFormTableRef.value.formRef.validate((validate) => {
        isPass = validate;
      });
      return isPass;
    };

    //更新父组件值
    const update = (data) => {
      emit("update:modelValue", data);
    };

    //传递选中项
    const selectedRow = (selected) => {
      emit("selected", selected);
      console.log(selected);
    };

    return {
      ygFormTableRef,
      propSlots,
      update,
      selectedRow,
      verifyIsPass,
    };
  },
};
</script>
<style scoped>
.yg-form-table .header {
  text-align: start;
  margin-bottom: 10px;
}
</style>
