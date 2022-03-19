export const formate = (data, format) => {
  data = new Date(data);
  var o = {
    "M+": data.getMonth() + 1, //月
    "d+": data.getDate(), //日
    "h+": data.getHours(), //时
    "m+": data.getMinutes(), //分
    "s+": data.getSeconds(), //秒
  };
  if (/(y+)/.test(format)) {
    format = format.replace(
      RegExp.$1,
      (data.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return format;
};

export const getToday = (style = "yyyy-MM-dd") => {
  return formate(new Date(), style);
};

export const searchColumns = [
  {
    label: "追赔单号",
    prop: "carrierClaimCode",
    clearable: true,
    placeholder: "请输入追赔单号",
  },
  {
    label: "追赔日期",
    prop: "applyDate",
    clearable: true,
    placeholder: "选择日期",
    isTime: "daterangeholdtime",
    queryFieldSplit: ["claimStartDate", "claimEndDate"],
    defaultValue: [getToday(), getToday()],
  },
  {
    label: "状态",
    prop: "statusCode",
    clearable: true,
    placeholder: "选择单据状态",
    isSelect: true,
    options: [
      {
        prop: "1030",
        name: "待出账",
      },
      {
        prop: "1040",
        name: "已出账",
      },
      {
        prop: "1050",
        name: "已核销",
      },
    ],
  },
  {
    label: "枚举状态",
    prop: "queryList",
    clearable: true,
    placeholder: "选择单据状态",
    isSelect: true,
    options: [],
  },
];

export const tableColumns = [
  {
    prop: "carrierClaimCode",
    label: "追赔单号",
    width: 150,
    overflow: true,
    expandFunc: true,
    isMultiCell: true,
    render: (params) => {
      return `<span style="color:var(--el-color-primary)" onclick="clickFun('${params.row.carrierClaimCode}')">${params.row.carrierClaimCode}</span>`;
    },
  },
  {
    prop: "carrierName",
    label: "承运商名称",
    width: 150,
    overflow: true,
  },
  {
    prop: "applyDate",
    label: "追赔日期",
    width: 150,
    overflow: true,
    expandFunc: true,
    isMultiCell: true,
    render: (params) => {
      return params.row.applyDate;
    },
  },

  {
    prop: "statusName",
    label: "状态",
    overflow: true,
  },
  {
    prop: "url",
    label: "缩略图",
    expandFunc: true,
    isMultiCell: true,
    imgW: 500,
  },
];

export const localService = {
  requestName: "123",
};

export const options = {
  canCheck: true, // 是否可选择
  hasIndex: true, // 是否有序号
  checkFixed: "left", // 选择固定位置
  indexFixed: "left", // 表序号固定位置
  opW: 100, // 操作栏宽度
  hideExe: true, // 是否显示操作列
  autoRequest: true, // 自动请求
  startUpdate: Date.now(),
};

// 以上配置文件可以根据业务需要分布配置在不同的文件里
