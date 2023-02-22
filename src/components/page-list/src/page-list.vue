<!--
 * @Description: 通用列表组件
 * @Version: 0.1
 * @Author: Hwx
-->
<template>
  <div class="page-search">
    <WxTable :tableData="dataList" v-bind="listConfig" @selectChange="handleSelectChange">
      <template #header-handler>
        <el-button size="mini" type="primary" @click="handlerClickAdd">添加用户</el-button>
      </template>

      <template #enable="scope">
        <el-button size="mini" plain :type="scope.row.enable > 1 ? 'danger' : 'primary'">{{ scope.row.enable > 1 ? '禁用' : '启用' }}</el-button>
      </template>

      <template #createAt="scope">
        {{ $filters.formatTime(scope.row.createAt) }}
      </template>

      <template #updateAt="scope">
        {{ $filters.formatTime(scope.row.updateAt, 'YYYY-MM-DD') }}
      </template>

      <template #handler>
        <div class="handler-btns">
          <el-button icon="el-icon-edit" size="mini" type="success" plain>编辑</el-button>
          <el-button icon="el-icon-delete" size="mini" type="danger" plain>删除</el-button>
        </div>
      </template>
    </WxTable>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { useStore } from 'vuex'
import WxTable from '@/base-ui/table'
export default defineComponent({
  components: {
    WxTable
  },
  props: {
    tableData: {
      type: Array,
      require: true
    },
    listConfig: {
      type: Object,
      require: true
    },
    pageName: {
      type: String,
      require: true
    }
  },
  emits: ['selectChange', 'handleAdd'],
  setup(props, { emit }) {
    const store = useStore()
    // const dataList = computed(() => store.state.system[`${props.pageName}List`]) //state
    const dataList = computed(() => store.getters[`system/pageListData`](props.pageName)) //getters

    const handleSelectChange = (selection: any) => {
      emit('selectChange', selection)
    }
    const handlerClickAdd = () => {
      emit('handleAdd')
    }

    return {
      dataList,

      handleSelectChange,
      handlerClickAdd
    }
  }
})
</script>

<style scoped lang="less">
.page-search {
  padding: 20px;
  border-top: 20px solid #f0f2f5;
}
</style>
