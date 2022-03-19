/**
 * 文件下载
 * @param {*} url 相对路径地址
 */

/**
 * 获取字典数据
 */

// 处理查询时间字段
export const handleTimeRange = (params = {}, columns = []) => {
  const paramsKey = Object.keys(params);
  let paramsTemp = { ...params };
  for (const sitem of columns) {
    const currKey = sitem.prop;
    if (paramsTemp?.[sitem.prop] && paramsKey.includes(sitem.prop)) {
      // 时间范围选择处理
      if (Array.isArray(paramsTemp[currKey])) {
        if (sitem.queryFieldSplit && sitem?.isTime === "daterange") {
          // 配置了查询拆分字段，则按照配置字段拆分?.substring(0, 10)?.substring(0, 10)
          paramsTemp[sitem.queryFieldSplit?.[0]] = paramsTemp[
            currKey
          ]?.[0]?.substring(0, 10);
          paramsTemp[sitem.queryFieldSplit?.[1]] = paramsTemp[
            currKey
          ]?.[1]?.substring(0, 10);
          delete paramsTemp[currKey];
        } else if (
          sitem.queryFieldSplit &&
          ["datetimerange"].includes(sitem?.isTime)
        ) {
          paramsTemp[sitem.queryFieldSplit?.[0]] = paramsTemp[currKey]?.[0];
          paramsTemp[sitem.queryFieldSplit?.[1]] = paramsTemp[currKey]?.[1];
          delete paramsTemp[currKey];
        } else if (
          sitem.queryFieldSplit &&
          sitem?.isTime === "daterangeholdtime"
        ) {
          // daterangeholdtime为日期范围选择，但是传参保留时间，默认00:00:00 ~ 23:59:59
          paramsTemp[sitem.queryFieldSplit?.[0]] = `${paramsTemp[
            currKey
          ]?.[0].substring(0, 10)}  00:00:00`;
          paramsTemp[sitem.queryFieldSplit?.[1]] = `${paramsTemp[
            currKey
          ]?.[1].substring(0, 10)}  23:59:59`;
          delete paramsTemp[currKey];
        }
      } else if (sitem.queryFieldSplit && sitem?.isTime) {
        // 非数组的情况直接删除key
        delete paramsTemp[currKey];
      }
    }

    // 多级地址处理
    if (sitem.isAddressLinkage && paramsTemp[currKey]) {
      paramsTemp.provinceCode = paramsTemp[currKey]?.[0] ?? "";
      paramsTemp.cityCode = paramsTemp[currKey]?.[1] ?? "";
      paramsTemp.areaCode = paramsTemp[currKey]?.[2] ?? "";
      paramsTemp.streetCode = paramsTemp[currKey]?.[3] ?? "";
      delete paramsTemp[currKey];
    }

    // 字符串数组处理
    if (sitem.isStringList && paramsTemp[currKey]) {
      paramsTemp[currKey] = paramsTemp[currKey].split(",");
    }
  }

  return paramsTemp;
};

export const trimBlank = (str) => {
  return (str || "").replace(/^\s+|\s+$/g, "");
};

/**
 * 展示浮动滚动条
 */
export const renderScrollBar = () => {
  // 获取浏览器可使区域高度
  const offsetHeight = document.body.offsetHeight;
  let tableWrapperDom = "";
  const bodyWrapperNodeList = document.querySelectorAll(
    ".float-scroll-bar .el-table__body-wrapper"
  );
  const bodyWrapperLen = bodyWrapperNodeList.length;
  if (bodyWrapperLen === 0) {
    return;
  }
  for (let i = 0; i < bodyWrapperLen; i++) {
    // 可视化区域
    if (bodyWrapperNodeList[i].clientHeight > 0) {
      tableWrapperDom = bodyWrapperNodeList[i];
      break;
    }
    if (bodyWrapperNodeList[i].clientHeight === 0) {
      bodyWrapperNodeList[i].style.height = "unset";
      bodyWrapperNodeList[i].style.marginBottom = "unset";
    }
  }

  if (tableWrapperDom === "") {
    return;
  }
  // 获取 tableWrapperDom 距离浏览器可视区域顶部 top 的长度
  const { top } = tableWrapperDom
    ? tableWrapperDom.getBoundingClientRect()
    : { top: 0 };
  // 设置 .el-table__body 元素
  let tableDom = "";
  const bodyNodeList = document.querySelectorAll(
    ".float-scroll-bar .el-table__body"
  );
  const bodyLen = bodyNodeList.length;
  if (bodyLen === 0) {
    return;
  }
  for (let i = 0; i < bodyLen; i++) {
    if (bodyNodeList[i].clientHeight > 0) {
      tableDom = bodyNodeList[i];
      break;
    }
  }
  // 获取 .el-table__body 元素
  // const tableDom = document.querySelector('.render-table .el-table__body')
  // 获取 tableDom 底部距离浏览器可视区域顶部 bottom 的长度
  const { bottom } = tableDom
    ? tableDom.getBoundingClientRect()
    : { bottom: 0 };
  // console.log('bottom', bottom)
  // 表在视窗下方不可见区域
  // 视窗内已经可以看到最后一条数据下的滚动条
  // 无滚动条
  if (
    top > offsetHeight ||
    bottom <= offsetHeight ||
    tableWrapperDom?.classList?.contains("is-scrolling-none")
  ) {
    tableWrapperDom.style.height = "unset";
    tableWrapperDom.style.marginBottom = "unset";
  } else {
    // 重新设置 tableWrapperDom 的高度 和 margin-bottom
    const tableWrapperHeight = offsetHeight - top;
    tableWrapperDom.style.height = tableWrapperHeight + "px";
    tableWrapperDom.style.marginBottom =
      bottom - top - tableWrapperHeight + "px";
  }
};
