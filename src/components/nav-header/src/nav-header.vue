<!--
 * @Description: 头部
 * @Version: 0.1
 * @Author: Hwx
-->
<template>
  <div class="nav-header">
    <!-- 收缩图标 -->
    <i class="fold-menu" :class="isFold ? 'el-icon-s-fold' : 'el-icon-s-unfold'" @click="handleClickFold"></i>

    <div class="content">
      <!-- 面包屑 -->
      <wx-breadcrumb :breadcrumbs="breadcrumbs" />
      <!-- 用户信息 -->
      <user-info />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { ArrowRight } from '@element-plus/icons-vue'
import UserInfo from './user-info.vue'
import WxBreadcrumb, { IBreadcrumb } from '@/base-ui/breadcrumb'

import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { pathMapBreadcrumbs } from '@/utils/map-menus'
export default defineComponent({
  components: {
    UserInfo,
    WxBreadcrumb
  },
  emits: ['foldChange'],
  setup(props, { emit }) {
    // 收缩侧边栏
    const isFold = ref(false)
    const handleClickFold = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }

    // 面包屑数据 [{name: '',path: ''}]
    const store = useStore()

    const breadcrumbs = computed(() => {
      const userMenus = store.state.login.userMenus
      const route = useRoute()
      const currentPath = route.path
      return pathMapBreadcrumbs(userMenus, currentPath)
    })

    return {
      isFold,
      handleClickFold,
      ArrowRight,
      breadcrumbs
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;
  min-width: 400px;
  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }

  .content {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
  }
}
</style>
