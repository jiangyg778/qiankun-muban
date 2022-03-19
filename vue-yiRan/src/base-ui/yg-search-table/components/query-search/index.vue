<template>
  <div class="query-area" ref="ref">
    <slot></slot>
    <span class="expand-collapse" v-if="isShow" @click="handlerExpandAndCollapse">{{ expandCollapse }}</span>
  </div>
</template>
<script>
import { defineComponent, nextTick, reactive, toRefs } from 'vue'

export default defineComponent({
  props: {
    expandCollapse: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  setup(props) {
    // 原来按钮偏移量
    let sourceOffset = ''
    // 常量
    const constant = {
      EXPAND: '∨ 展开',
      COLLAPSE: '∧ 收起'
    }
    // 对模版暴露的变量
    const foreign = reactive({
      ref: null,
      expandCollapse: constant.EXPAND, // props.expandCollapse ? constant.EXPAND : '',
      isShow: false
    })

    // 初始化查询区域
    const initSearchStyle = () => {
      hiddenElement()
    }

    // 处理展开和收起
    const handlerExpandAndCollapse = () => {
      if (foreign.expandCollapse === constant.EXPAND) {
        // 1、切换名称
        foreign.expandCollapse = constant.COLLAPSE
        // 显示元素
        showElement()
      } else if (foreign.expandCollapse === constant.COLLAPSE) {
        // 1、切换名称
        foreign.expandCollapse = constant.EXPAND
        // 隐藏元素
        hiddenElement()
      }
      // 重新计算浮动滚动条位置
      setTimeout(renderScrollBar, 0)
    }

    // 隐藏元素
    const hiddenElement = () => {
      // 获取到 ref
      const $ref = foreign.ref
      // 获取到 ref 下的 form
      const $form = $ref.children[0]
      // 获取到 form 下面的元素；两种情况：1、多个 el-row；2、一个 row 多个 col
      const formChildren = $form.children
      const formChildLen = formChildren.length
      if (formChildLen > 2) {
        // 多个 el-row 的情况，显示第一个 el-row 和最后一个 el-row 中的最后一个 按钮区域
        for (let i = 0; i < formChildLen; i++) {
          if (i < 1) {
            continue
          }
          if (i === formChildLen - 1) {
            foreign.isShow = true
            handlerRowTowHidden(formChildren[i], formChildren[i - 1])
            return
          }
          formChildren[i].className = formChildren[i].className + ' hide-elem'
        }
      }
      if (formChildLen === 1) {
        console.log('一个 el-row')
        const $elRow = $form.children[0]
        const $cols = $elRow.children
        let colsLen = $cols.length
        // 判断 colsLen 是否大于 8，如果大于 8 走下面循环分支
        if (colsLen > 8) {
          for (let i = 0; i < colsLen; i++) {
            if (i < 7) {
              continue
            }
            if (i === colsLen - 1) {
              foreign.isShow = true
              handlerColOffset($cols[i])
              return
            }
            $cols[i].className = $cols[i].className + ' hide-elem'
          }
        }
      }
    }

    // 处理 el-row 中的元素，隐藏其他元素只显示按钮
    // currentNode 当前元素
    // previousNode 上一个元素
    const handlerRowTowHidden = (currentParentNode, previousParentNode) => {
      // debugger
      // 获取当前元素的长度
      const len = currentParentNode.children.length
      // 等于 1 说明只有按钮，不需要显示 展开/收起
      if (len === 1) {
        const classNameArr = previousParentNode.className.split(' ')
        previousParentNode.className = classNameArr.filter((item) => item !== 'hide-elem').join(' ')
        foreign.isShow = false
      }
      // const len = children.length
      // // 等于 1，说明只有按钮，没有其他元素，不进行处理
      // if (len === 1) {
      //   return
      // }
      // for (let i = 0; i < len; i++) {
      //   if (i === len - 1) {
      //     children[i].className = children[i].className
      //       .split(' ')
      //       .map((item) => {
      //         if (item.indexOf('offset') > -1) {
      //           // 记录原有的偏移量
      //           sourceOffset = item
      //           return 'el-col-offset-18'
      //         }
      //         return item
      //       })
      //       .join(' ')
      //     return
      //   }
      //   children[i].className = children[i].className + ' hide-elem'
      // }
    }

    // 处理 el-row 中的元素，显示其他元素和按钮
    const handlerRowTowShow = (currentParentNode) => {
      if (sourceOffset.indexOf('offset-18') > -1) {
        // 获取到按钮元素节点
        const btnEle = currentParentNode.children[3]
        handlerColOffsetToRecover(btnEle)
        currentParentNode.innerHTML = ''
        currentParentNode.appendChild(btnEle)
      }
      // let len = children.length
      // // 等于 1，说明只有按钮，没有其他元素，不进行处理
      // if (len === 1) {
      //   return
      // }
      // for (let i = 0; i < len; i++) {
      //   if (i === len - 1) {
      //     children[i].className = children[i].className
      //       .split(' ')
      //       .map((item) => {
      //         if (item.indexOf('offset') > -1) {
      //           const temp = sourceOffset
      //           // 清空原有的偏移量
      //           sourceOffset = ''
      //           return temp
      //         }
      //         return item
      //       })
      //       .join(' ')
      //     return
      //   }
      //   // children[i].className = children[i].className + ' hide-elem'
      //   // 移除隐藏元素的 className
      //   const classNameArr = children[i].className.split(' ')
      //   children[i].className = classNameArr.filter((item) => item !== 'hide-elem').join(' ')
      // }
    }

    // 处理 col 中的偏移
    const handlerColOffset = (col) => {
      if (col.className.indexOf('offset') > -1) {
        col.className = col.className
          .split(' ')
          .map((item) => {
            if (item.indexOf('offset') > -1) {
              // 记录原有的偏移量
              sourceOffset = item
              return 'el-col-offset-0'
            }
            return item
          })
          .join(' ')
      } else {
        const classNameArr = col.className.split(' ')
        classNameArr.push('el-col-offset-0')
        col.className = classNameArr.join(' ')
        sourceOffset = ''
      }
    }

    // 恢复 col 原有的偏移量
    const handlerColOffsetToRecover = (col) => {
      col.className = col.className
        .split(' ')
        .map((item) => {
          if (item.indexOf('offset') > -1) {
            const temp = sourceOffset
            // 记录原有的偏移量
            sourceOffset = ''
            return temp
          }
          return item
        })
        .join(' ')
    }

    // 显示元素
    const showElement = () => {
      // 获取到 ref
      const $ref = foreign.ref
      // 获取到 ref 下的 form
      const $form = $ref.children[0]
      // 获取到 form 下面的元素；两种情况：1、多个 el-row；2、一个 row 多个 col
      const formChildren = $form.children
      const formChildLen = formChildren.length
      if (formChildLen > 1) {
        // 多个 el-row 的情况，显示第一个 el-row 和最后一个 el-row
        for (let i = 0; i < formChildLen; i++) {
          if (i < 1) {
            continue
          }
          if (i === formChildLen - 1) {
            handlerRowTowShow(formChildren[i])
            return
          }
          // 移除隐藏元素的 className
          const classNameArr = formChildren[i].className.split(' ')
          formChildren[i].className = classNameArr.filter((item) => item !== 'hide-elem').join(' ')
        }
      }
      if (formChildLen === 1) {
        // todo
        const $elRow = $form.children[0]
        const $cols = $elRow.children
        let colsLen = $cols.length
        for (let i = 0; i < colsLen; i++) {
          if (i <= 6) {
            continue
          }
          if (i === colsLen - 1) {
            handlerColOffsetToRecover($cols[i])
            return
          }
          // 移除隐藏元素的 className
          const classNameArr = $cols[i].className.split(' ')
          $cols[i].className = classNameArr.filter((item) => item !== 'hide-elem').join(' ')
        }
      }
    }

    nextTick(() => {
      initSearchStyle()
      // if (props.expandCollapse) {
      //   initSearchStyle()
      // }
    })

    return {
      ...toRefs(foreign),
      handlerExpandAndCollapse
    }
  }
})
</script>
<style>
.query-area {
  width: 100%;
  /* min-height: 84px; */
  padding-top: 22px;
  background-color: #ffffff;
  border-radius: 4px;
  position: relative;
}
.query-area .el-select {
  width: 100%;
}
.query-area .el-row {
  padding-right: 20px;
}

.query-area .expand-collapse {
  position: absolute;
  color: #409eff;
  bottom: 20px;
  right: 190px;
  font-size: 14px;
  cursor: pointer;
}
.query-area .hide-elem {
  display: none;
}

/* 有些页面单独设置了 margin-right，这里取消设置 */
.el-form--inline .el-form-item {
  margin-right: unset;
}
</style>
