/**
 * 表格浮动滚动条工具类
 */
import { getCurrentInstance } from "vue";

const handleFixedMousewheel = (refName) => {
  const floatScrollBarDOM = document.querySelector(".float-scroll-bar");
  if (!floatScrollBarDOM) {
    return;
  }
  const { proxy } = getCurrentInstance();
  const tableRef = proxy.$refs[refName];
  tableRef.handleFixedMousewheel = (event, data) => {
    const contentDOM = document.querySelector(".content");
    if (Math.abs(data.spinY) > 0) {
      const currentScrollTop = contentDOM.scrollTop;
      if (data.pixelY < 0 && currentScrollTop !== 0) {
        event.preventDefault();
      }
      if (
        data.pixelY > 0 &&
        contentDOM.scrollHeight - contentDOM.clientHeight > currentScrollTop
      ) {
        event.preventDefault();
      }
      contentDOM.scrollTop += Math.ceil(data.pixelY / 1);
    }
  };
};

export { handleFixedMousewheel };
