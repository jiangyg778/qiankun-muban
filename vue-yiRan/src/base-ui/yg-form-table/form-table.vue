<template>
  <div>
    <el-form :model="jsonData" :inline="true" ref="formRef">
      <el-table
        :data="jsonData"
        style="width: 100%"
        border
        @selection-change="handleSelectionChange"
      >
        <!-- 勾选 -->
        <el-table-column
          type="selection"
          width="55"
          align="center"
          v-if="showSelectColumn"
        >
        </el-table-column>
        <!-- 序号 -->
        <el-table-column
          v-if="showIndexColumn"
          type="index"
          label="序号"
          align="center"
          width="80"
        ></el-table-column>
        <!-- 主体 -->
        <el-table-column
          align="center"
          v-for="(item, index) in formItems"
          :key="index"
          v-bind="item"
        >
          <template #header>
            <span>{{ item.label }}</span>
            <i style="color: var(--el-color-danger)" v-if="item.rules">*</i>
          </template>
          <template #default="scope">
            <!-- 表单项 -->
            <el-form-item
              :prop="scope.$index + '.' + item.prop"
              :rules="item.rules"
            >
              <!-- 输入框 -->
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  :placeholder="item.placeholder"
                  :model-value="scope.row[item.prop]"
                  @update:modelValue="
                    handleValueChange($event, item.prop, scope.$index)
                  "
                  :show-password="item.type === 'password'"
                  v-bind="item.otherOptions"
                />
              </template>
              <!-- 选择器 -->
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  style="width: 100%"
                  :model-value="scope.row[item.prop]"
                  @update:modelValue="
                    handleValueChange($event, item.prop, scope.$index)
                  "
                  v-bind="item.otherOptions"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                    :label="option.title"
                    >{{ option.title }}</el-option
                  >
                </el-select>
              </template>
              <!-- 日期 -->
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  style="width: 100%"
                  :model-value="scope.row[item.prop]"
                  @update:modelValue="
                    handleValueChange($event, item.prop, scope.$index)
                  "
                  v-bind="item.otherOptions"
                ></el-date-picker>
              </template>
              <!-- 自定义 -->
              <template v-else-if="item.type === 'text'">
                <slot :name="item.slotName" :row="scope">
                  {{ scope.row[item.prop] }}
                </slot>
              </template>
            </el-form-item>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
  </div>
</template>
<script>
import { ref } from "vue";
export default {
  props: {
    formItems: {
      type: Array,
      default: () => [],
    },
    showIndexColumn: {
      type: Boolean,
      default: false,
    },
    showSelectColumn: {
      type: Boolean,
      default: false,
    },
    jsonData: {
      type: Object,
      default: () => {},
    },
  },
  emits: ["update:jsonData", "selectedRow"],
  setup(props, { emit }) {
    let formRef = ref(null);

    //保证数据单项流
    const handleValueChange = (value, field, index) => {
      let copyData = JSON.parse(JSON.stringify(props.jsonData));
      copyData[index][field] = value;
      emit("update:jsonData", [...copyData]);
    };

    //table选择项
    const handleSelectionChange = (i) => {
      emit("selectedRow", [...i]);
    };

    return {
      formRef,
      handleValueChange,
      handleSelectionChange,
    };
  },
};
</script>
<style>
/* .el-radio__input {
  position: relative;
  left: 5px;
} 
 .el-table__header-wrapper .el-checkbox {
  display: none;
} */
</style>
