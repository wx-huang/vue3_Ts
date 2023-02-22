<!--
 * @Description: table组件
 * @Version: 0.1
 * @Author: Hwx
-->

<template>
  <div class="wx-table">
    <div class="header">
      <slot name="header">
        <div class="title">
          {{ tableTitle }}
        </div>
        <div class="handler">
          <slot name="header-handler">
            <el-button size="mini" type="primary">新增</el-button>
          </slot>
        </div>
      </slot>
    </div>

    <el-table :data="tableData" @selection-change="handleSelectChange" style="width: 100%">
      <el-table-column v-if="isShowSelection" type="selection" width="60" align="center" />
      <el-table-column v-if="isShowIndex" type="index" min-width="80" label="序号" align="center"></el-table-column>

      <template v-for="propItem in propData" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center">
          <template #default="scope">
            <slot :name="propItem.slotName" :row="scope.row">{{ scope.row[propItem.prop] }}</slot>
          </template>
        </el-table-column>
      </template>
    </el-table>

    <div class="footer">
      <slot name="footer">
        <el-pagination v-if="tableData.length > 0" v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[100, 200, 300, 400]" :small="small" :disabled="true" :background="background" layout="total, sizes, prev, pager, next, jumper" :total="400" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
export default defineComponent({
  props: {
    tableTitle: {
      type: String,
      default: ''
    },
    tableData: {
      type: Array,
      require: true,
      default: () => []
    },
    propData: {
      type: Array as PropType<any[]>,
      require: true
    },
    isShowIndex: {
      type: Boolean,
      default: false
    },
    isShowSelection: {
      type: Boolean,
      default: false
    }
  },
  emits: ['selectChange'],
  setup(props, { emit }) {
    const handleSelectChange = (selection: any) => {
      emit('selectChange', selection)
    }

    const currentPage = ref(4)
    const pageSize = ref(100)
    const small = ref(false)
    const background = ref(false)
    const disabled = ref(false)

    const handleSizeChange = (val: number) => {
      console.log(`${val} items per page`)
    }
    const handleCurrentChange = (val: number) => {
      console.log(`current page: ${val}`)
    }

    return {
      handleSelectChange,

      handleSizeChange,
      handleCurrentChange,
      currentPage,
      pageSize,
      small,
      background,
      disabled
    }
  }
})
</script>

<style scoped lang="less">
.wx-table {
  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .title {
      font-size: 18px;
      font-weight: bold;
    }
    .handler {
      margin-right: 50px;
    }
  }
  .footer {
    padding: 12px 20px 0 0;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
