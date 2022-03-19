<template>
  <div class="jsontable">
    <!-- 表单查询 -->
    <querySearch v-if="searchColumnsList.length > 0">
      <el-form
        :inline="true"
        size="medium"
        :model="searchForm"
        class="json-table-form"
        :inline-message="true"
        ref="formRef"
      >
        <el-row :gutter="20">
          <el-col
            :span="6"
            v-for="(item, index) in searchColumnsList"
            :key="item.prop + index"
          >
            <el-form-item
              class="search-item"
              :label="item.label"
              :prop="item.prop"
            >
              <!-- input -->
              <el-input
                class="formitem-cmp"
                :disabled="item.disabled"
                v-if="
                  !(
                    item.isSelect ||
                    item.isTime ||
                    item.isCascader ||
                    item.isRadio ||
                    item.isSearchSpu
                  )
                "
                :clearable="item.clearable"
                v-model="searchForm[item.prop]"
                :placeholder="item.placeholder || '请输入内容'"
                :readonly="item.readonly"
                @change="handleChange"
              ></el-input>
              <!-- select -->
              <el-select
                class="formitem-cmp"
                :disabled="item.disabled"
                v-if="item.isSelect"
                :multiple="item.multiple"
                :clearable="item.clearable"
                v-model="searchForm[item.prop]"
                :placeholder="item.placeholder || '请选择'"
                :filterable="item.filterable || true"
                @change="handleChange(item.prop)"
              >
                <el-option
                  v-for="(option, optionInd) in item.options"
                  :key="option.prop + optionInd"
                  :label="option.name"
                  :value="option.prop"
                ></el-option>
              </el-select>

              <template v-if="item.isRadio">
                <el-radio
                  v-for="item in item.options"
                  :key="item.value"
                  v-model="searchForm[item.prop]"
                  :label="item.lable"
                  >{{ item.lable }}</el-radio
                >
              </template>

              <!-- cascader -->
              <el-cascader
                class="formitem-cmp"
                v-if="item.isCascader"
                :disabled="item.disabled"
                v-model="searchForm[item.prop]"
                :clearable="item.clearable"
                :options="item.options"
                @change="handleChange"
                :placeholder="item.placeholder || '请选择'"
              ></el-cascader>
              <!-- date -->
              <el-date-picker
                class="formitem-cmp"
                :disabled="item.disabled"
                :clearable="item.clearable ?? true"
                v-if="item.isTime === 'date'"
                v-model="searchForm[item.prop]"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                type="date"
                placeholder="选择日期"
                @change="
                  (val) => {
                    formatDate(val, searchForm, item.prop);
                  }
                "
              ></el-date-picker>
              <!-- daterange -->
              <el-date-picker
                class="formitem-cmp"
                :disabled="item.disabled"
                :clearable="item.clearable ?? true"
                v-if="['daterangeholdtime', 'daterange'].includes(item.isTime)"
                v-model="searchForm[item.prop]"
                type="daterange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="YYYY-MM-DD"
                format="YYYY-MM-DD"
                @change="
                  (val) => {
                    formatDate(val, searchForm, item.prop);
                  }
                "
              ></el-date-picker>
              <!-- datetimerange -->
              <el-date-picker
                :disabled="item.disabled"
                :clearable="item.clearable ?? true"
                class="formitem-cmp"
                v-if="item.isTime === 'datetimerange'"
                v-model="searchForm[item.prop]"
                type="datetimerange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="YYYY-MM-DD HH:mm:ss"
                format="YYYY-MM-DD HH:mm:ss"
                @change="
                  (val) => {
                    formatDate(val, searchForm, item.prop);
                  }
                "
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="queryBtnOffset">
            <el-form-item class="submit-btn">
              <el-button type="primary" @click="handleQuery">查询</el-button>
              <el-button @click="handleReset">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </querySearch>
    <queryBody is-float-bar>
      <!-- 表单与表格中间插入内容 -->
      <div
        class="under-search-slot btn-group"
        v-if="searchColumnsList.length > 0"
      >
        <slot name="under-search-slot"></slot>
      </div>
      <!-- 表格内容 -->
      <div class="table">
        <el-table
          ref="tableRef"
          :data="tableData"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          border
          :show-summary="summary"
          :summary-method="(result) => getSummaries(result, requestData)"
        >
          <el-table-column
            :fixed="tableOptions.checkFixed"
            v-if="tableOptions.canCheck"
            :selectable="checkBoxDisable"
            type="selection"
            width="55"
          ></el-table-column>
          <el-table-column
            :fixed="tableOptions.indexFixed"
            v-if="tableOptions.hasIndex"
            type="index"
            width="60"
            label="序号"
          ></el-table-column>
          <el-table-column
            v-for="(item, index) in tableColumnsList"
            :key="item.prop + index"
            :prop="item.prop"
            :label="item.label"
            :min-width="item.width"
            :show-overflow-tooltip="item.overflow"
          >
            <template #default="scope" v-if="item.expandFunc">
              <el-tooltip v-if="item.imgW" placement="right">
                <template #content>
                  <img
                    referrerpolicy="no-referrer"
                    :src="scope.row[item.prop]"
                    :width="item.imgW || 300"
                    class="img-height"
                    alt="此图不存在，请检查url"
                  />
                </template>
                <el-button type="primary" size="mini">预览</el-button>
              </el-tooltip>
              <span
                v-if="item.isMultiCell && item.render"
                v-html="item.render(scope)"
              ></span>
              <span
                style="color: #2440b3"
                v-if="item.clickEvent"
                @click="(e) => handleSpanClick(e, item.prop, scope)"
                >{{ scope.row[item.prop] }}</span
              >
            </template>
          </el-table-column>

          <el-table-column
            v-if="tableOptions.hideExe"
            fixed="left"
            :label="tableOptions?.exeTitle || '操作'"
            :width="tableOptions.opW || 150"
          >
            <!-- 操作栏插槽 -->
            <template #default="scope">
              <slot name="op" v-bind:scope="scope"></slot>
            </template>
          </el-table-column>
          <el-table-column
            v-if="tableOptions.lastColumn"
            fixed="right"
            :label="tableOptions.lastColumn.title"
            :width="tableOptions.lastColumn.width || 250"
          >
            <!-- 最后列插槽 -->
            <template #default="scope">
              <slot name="last" v-bind:scope="scope"></slot>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination" v-if="showPage == true">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagination.page"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="pagination.psize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pagination.total"
          ></el-pagination>
        </div>
      </div>
    </queryBody>
  </div>
</template>

<script>
// 处理表格固定列浮动滚动条
import { handleFixedMousewheel } from "./utils/float-scroll-bar";
import {
  ref,
  onMounted,
  watch,
  computed,
  getCurrentInstance,
  inject,
} from "vue";
import querySearch from "./components/query-search";
import queryBody from "./components/query-body";
import dayjs from "dayjs";
import { useInitSearchForm } from "./composition/useSearchForm.js";

export default {
  props: {
    searchColumns: Array,
    service: Object,
    tableColumns: Array,
    options: Object,
    searchFormTemp: Object,
    height: Number,
    paramsSon: Object,
    showPage: {
      type: Boolean,
      default: true,
    },
    summary: {
      type: Boolean,
      default: false,
    },

    detailForm: Object,
    getSummaries: {
      type: Function,
      default: null,
    },
    parent: Object,
    checkBoxDisable: Function,
  },
  components: { querySearch, queryBody },
  name: "json-table",
  emits: ["onformchange", "rowselectchange", "handleSpanClick"],
  setup(props, { emit, attrs }) {
    let { proxy } = getCurrentInstance();
    // 初始化属性值
    let {
      searchForm,
      formatDate,
      handleSubmit,
      tableData,
      requestData,
      pagination,
      isLoading,
      searchFormTemp,
    } = useInitSearchForm(props);

    // 查询按钮偏移计算
    const queryBtnOffset = computed(() => {
      return props.searchColumns.length % 4 !== 0
        ? (3 - (props.searchColumns.length % 4)) * 6
        : 18;
    });

    //条件查询
    const handleQuery = () => {
      //条件查询时需要重置分页
      pagination.page = 1;
      handleSubmit();
    };
    // 分页相关
    const handleSizeChange = (val) => {
      pagination.psize = val;
      handleSubmit();
    };
    const handleCurrentChange = (val) => {
      pagination.page = val;
      handleSubmit();
    };

    // change事件
    const handleChange = (val) => {
      emit("onformchange", searchForm, val);
    };

    // selectChange事件
    const handleSelectionChange = (val) => {
      emit("rowselectchange", val);
    };

    const handleSpanClick = (e, propkey, scope) => {
      emit("handleSpanClick", propkey, scope);
    };

    // 重置
    const handleReset = (val) => {
      proxy.$refs.formRef.resetFields();
      // 强制赋值的需保留
      if (props?.searchColumns) {
        for (const sitem of props?.searchColumns) {
          if (sitem?.forceValue) {
            searchForm[sitem.prop] = sitem?.forceValue;
          }
        }
      }
      handleSubmit();
    };

    // 表格高度计算
    const tableRef = ref(null);
    const tableHeight = ref(0);

    watch(
      () => props.options.startUpdate,
      () => {
        handleSubmit();
      }
    );

    watch(
      () => searchForm,
      () => {
        if (props.searchFormTemp != null) {
          for (const skey of Object.keys(searchForm)) {
            props.searchFormTemp[skey] = searchForm[skey];
          }
        }
      },
      {
        deep: true,
      }
    );

    const parent = inject("parent");

    // 监听搜索项配置forceValue并赋值
    watch(
      () => props?.searchColumns,
      () => {
        if (props?.searchColumns) {
          for (const sitem of props?.searchColumns) {
            if (
              sitem?.forceValue &&
              searchForm[sitem.prop] !== sitem?.forceValue
            ) {
              // 强制赋值属性不同时，进行赋值并查询
              searchForm[sitem.prop] = sitem?.forceValue;
              handleSubmit();
            }
            if (sitem?.defaultValue && !searchForm[sitem.prop]) {
              // 默认值无值时赋值需要响应
              searchForm[sitem.prop] = sitem?.defaultValue;
            }
          }
        }
      },
      {
        deep: true,
      }
    );

    const checkBoxDisable = (row, index) => {
      // 增加适配特殊处理禁用
      if (props?.checkBoxDisable) {
        const res = props?.checkBoxDisable(row, index);
        return res;
      }
      // 引用情况下通过引用明细key禁用
      const disabledKey = parent?.getDisabledKey
        ? parent?.getDisabledKey()
        : parent?.disabledKey;
      if (parent?.detailForm?.params) {
        if (
          parent.detailForm.params.some(
            (item) => item[disabledKey] === row[disabledKey]
          )
        ) {
          return false;
        }
      }
      return true;
    };

    onMounted(() => {
      // 计算表格高度
      // caculateTableHeight(tableHeight, tableRef)
      // 是否要手动请求
      if (props.options.autoRequest) {
        handleSubmit();
      }
      handleFixedMousewheel("tableRef");
    });

    return {
      pagination, // 分页相关
      tableRef,
      tableHeight,
      dayjs, // 处理日期格式
      handleChange,
      handleSpanClick,
      searchColumnsList: props.searchColumns, // 传递的配置数据
      tableColumnsList: props.tableColumns, // 表格的配置数据
      tableData, // 表格数据
      requestData,
      tableOptions: props.options, // 表格属性
      searchForm, // 双向绑定数据
      searchFormTemp, // 父级temp表单数据
      handleSubmit, // 提交
      formatDate, // 日期change
      handleSelectionChange, // 行选择事件
      handleSizeChange,
      handleCurrentChange,
      isLoading,
      queryBtnOffset,
      handleReset,
      handleQuery,
      checkBoxDisable,
    };
  },
};
</script>
<style lang="less">
.search-item {
  width: 100%;
  .formitem-cmp {
    width: 100%;
  }
}
label.el-form-item__label {
  width: 35%;
  text-align: end;
  display: block;
}
div.el-form-item__content {
  width: 65%;
  word-wrap: break-word;
  word-break: break-all;
  justify-content: end;
}
.submit-btn {
  width: 100%;
  text-align: end;
}
.pagination {
  text-align: right;
  margin-top: 15px;
}
</style>
