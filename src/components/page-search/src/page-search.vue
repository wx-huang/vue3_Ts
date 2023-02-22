<!--
 * @Description: 通用查询组件
 * @Version: 0.1
 * @Author: Hwx
-->
<template>
  <!-- 查询条件 -->
  <div class="page-serach">
    <wx-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h2>高级检索</h2>
      </template>

      <template #footer>
        <div class="search-btns">
          <el-button icon="el-icon-refresh">重置</el-button>
          <el-button type="primary" icon="el-icon-search" @click="handleSearch">查询</el-button>
        </div>
      </template>
    </wx-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import WxForm from '@/base-ui/form'
export default defineComponent({
  components: { WxForm },
  props: {
    searchFormConfig: {
      type: Object,
      require: true
    }
  },
  emits: ['handleSearch'],
  setup(props, { emit }) {
    const formData = ref({
      id: '',
      name: '',
      password: '',
      sport: '',
      createTime: ''
    })

    const handleSearch = () => {
      emit('handleSearch')
    }
    return { formData, handleSearch }
  }
})
</script>

<style scoped lang="less">
.page-serach {
  .search-btns {
    display: flex;
    justify-content: right;
    padding: 0 50px 22px 0;
  }
}
</style>
