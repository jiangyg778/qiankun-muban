import { reactive, ref, nextTick } from "vue";
import dayjs from "dayjs";
export const trimBlank = (str) => {
  return (str || "").replace(/^\s+|\s+$/g, "");
};

export function useInitSearchForm(props) {
  let searchForm = reactive({}); // 初始化表单项
  const isLoading = ref(false); // 控制loading
  const tableData = ref([]); // 表格数据
  let requestData = reactive({});

  // 如果有默认值赋值
  if (props?.searchColumns) {
    for (const sitem of props?.searchColumns) {
      if (sitem?.defaultValue) {
        searchForm[sitem.prop] = sitem?.defaultValue;
      }
    }
  }

  let pagination = reactive({
    // 分页相关
    page: 1,
    psize: 10,
    total: 0,
  });
  let formatDate = (val, searchForm, prop) => {
    // 格式化日期
    if (Array.isArray(val)) {
      let temp = [
        dayjs(val[0]).format("YYYY-MM-DD HH:mm:ss"),
        dayjs(val[1]).format("YYYY-MM-DD HH:mm:ss"),
      ];
      searchForm[prop] = temp;
    } else {
      searchForm[prop] = dayjs(val).format("YYYY-MM-DD");
    }
  };

  //传参，表单默认值初始化
  const paramsSon = props?.paramsSon;
  if (paramsSon) {
    for (let i in paramsSon) {
      searchForm[i] = paramsSon[i];
    }
  }

  let handleSubmit = async () => {
    // 提交
    isLoading.value = true;
    let temp = {
      ...props.service,
      ...searchForm,
    };

    if (props?.options?.isLimitPage) {
      temp.page = pagination.page || 1;
      temp.limit = pagination.psize;
    } else {
      // 默认分页
      temp.pageNum = pagination.page || 1;
      temp.pageSize = pagination.psize;
    }
    // 统一过滤空字符串
    for (const key of Object.keys(temp)) {
      //去除值为null的字段 还有清空日期时值为Invalid Date的bug
      if (
        temp[key] === "" ||
        temp[key] === "Invalid Date" ||
        temp[key] === null
      ) {
        delete temp[key];
      }
      if (Array.isArray(temp[key]) && temp[key].length === 0) {
        delete temp[key];
      }
    }

    if (props.showPage == false) {
      delete temp.pageNum;
      delete temp.pageSize;
    }

    // queryFieldSplit
    // 时间处理
    const paramsKey = Object.keys(temp);
    for (const sitem of props?.searchColumns) {
      if (temp?.[sitem.prop] && paramsKey.includes(sitem.prop)) {
        // 时间范围选择处理
        const currKey = sitem.prop;
        if (sitem.queryFieldSplit && sitem?.isTime === "daterange") {
          // 配置了查询拆分字段，则按照配置字段拆分?.substring(0, 10)?.substring(0, 10)
          temp[sitem.queryFieldSplit?.[0]] = temp[currKey]?.[0]?.substring(
            0,
            10
          );
          temp[sitem.queryFieldSplit?.[1]] = temp[currKey]?.[1]?.substring(
            0,
            10
          );
          delete temp[currKey];
        } else if (
          sitem.queryFieldSplit &&
          ["datetimerange"].includes(sitem?.isTime)
        ) {
          temp[sitem.queryFieldSplit?.[0]] = temp[currKey]?.[0];
          temp[sitem.queryFieldSplit?.[1]] = temp[currKey]?.[1];
          delete temp[currKey];
        } else if (
          sitem.queryFieldSplit &&
          sitem?.isTime === "daterangeholdtime"
        ) {
          // daterangeholdtime为日期范围选择，但是传参保留时间，默认00:00:00 ~ 23:59:59
          temp[sitem.queryFieldSplit?.[0]] = `${temp[currKey]?.[0].substring(
            0,
            10
          )}  00:00:00`;
          temp[sitem.queryFieldSplit?.[1]] = `${temp[currKey]?.[1].substring(
            0,
            10
          )}  23:59:59`;
          delete temp[currKey];
        }

        // 字符串数组处理
        if (sitem.isStringList) {
          temp[sitem.prop] = temp[sitem.prop].split(",");
        }
      }
    }
    //表单多字段分离处理 仅测试
    const separateFields = props?.paramsSon?.separateFields;
    if (separateFields && separateFields.length > 0) {
      separateFields.forEach((item) => {
        let separateArr = [];
        const separateItems = item.values.split(",");
        console.log("separateItems", separateItems);
        for (let i = 0; i < separateItems.length; i++) {
          if (temp[separateItems[i]]) {
            separateArr[separateItems[i]] = temp[separateItems[i]];
            //delete temp[separateItems[i]]
          }
        }
        temp[item.field] = { ...separateArr };
      });
    }
    //传参，比如表单搜索默认值 searchForm
    const paramsSon = props?.paramsSon;
    if (paramsSon) {
      for (let i in paramsSon) {
        if (!temp[i]) {
          temp[i] = paramsSon[i];
        }
      }
    }
    // 重置默认值并清空
    // if (val == '重置') {
    //   for (let key in searchForm) {
    //     searchForm[key] = ''
    //     temp[key] = null
    //   }
    // }
    // console.log('temp', temp)

    // 统一过滤空字符串
    for (const key of Object.keys(temp)) {
      if (temp[key] === "") {
        delete temp[key];
      }
      if (Array.isArray(temp[key]) && temp[key].length === 0) {
        delete temp[key];
      }
      if (typeof temp[key] === "string") {
        // 去除检索字符串的首尾空格
        temp[key] = trimBlank(temp[key]);
      }
    }

    // mock数据
    const res = {
      pageData: [
        {
          carrierClaimCode: 1,
          carrierName: "测试数据1",
          applyDate: "测试日期1",
          url: "https://www.baidu.com/img/flexible/logo/pc/result.png",
        },
        {
          carrierClaimCode: 2,
          carrierName: "测试数据2",
          applyDate: "测试日期2",
          url: "https://www.baidu.com/img/flexible/logo/pc/result.png",
        },
      ],
    };
    if (res) {
      tableData.value = res.pageData;
      pagination.total = res.pageData.length;

      //返回值赋值
      for (let i in res) {
        requestData[i] = res[i];
      }
    } else {
      tableData.value = [];
    }
    isLoading.value = false; // 控制loading
  };

  const caculateTableHeight = (tableHeight, tableRef) => {
    nextTick().then(() => {
      const total =
        tableRef?.value?.$el?.offsetTop +
        tableRef?.value?.$el?.offsetParent?.offsetTop +
        tableRef?.value?.$el?.nextElementSibling?.offsetHeight +
        20;
      const totalHeight = window.innerHeight - total;
      tableHeight.value = totalHeight && totalHeight > 300 ? totalHeight : 300;
    });
  };

  return {
    searchForm,
    formatDate,
    handleSubmit,
    tableData,
    requestData,
    caculateTableHeight,
    pagination,
    isLoading,
  };
}
