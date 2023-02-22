<!--
 * @Description: 用户页面
 * @Version: 0.1
 * @Author: Hwx
-->
<template>
  <div class="user">
    <PageSearch :searchFormConfig="searchFormConfig" @handleSearch="handleSearch" />
    <PageList :listConfig="listConfig" @selectChange="handleSelectChange" @handleAdd="handleAdd" pageName="users" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'

import PageSearch from '@/components/page-search'
import PageList from '@/components/page-list'

import { searchFormConfig } from './config/search.config'
import { listConfig } from './config/list.config'

export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    PageList
  },
  setup() {
    // search 操作
    const store = useStore()
    const handleSearch = () => {
      store.dispatch('system/getPageListAction', {
        pageName: 'users',
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    }

    // list 操作
    const handleSelectChange = (selection: any) => {
      console.log(selection, '表格选择的selection')
    }
    const handleAdd = () => {
      console.log('添加用户信息')
    }

    return {
      searchFormConfig,
      listConfig,
      handleSelectChange,
      handleSearch,
      handleAdd
    }
  }
})
</script>

<style scoped lang="less"></style>
