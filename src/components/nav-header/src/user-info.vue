<!--
 * @Description: 头部--用户信息
 * @Version: 0.1
 * @Author: Hwx
-->
<template>
  <div class="user-info">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar :size="30" :src="circleUrl" />
        <span> {{ name }} </span>
      </span>

      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item icon="el-icon-circle-close" @click="handleLoginOut">退出登陆</el-dropdown-item>
          <el-dropdown-item icon="el-icon-folder-opened" divided>用户信息</el-dropdown-item>
          <el-dropdown-item icon="el-icon-edit">系统管理</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  setup() {
    const circleUrl = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')
    const store = useStore()
    const name = computed(() => store.state.login.userInfo.name)

    const handleLoginOut = () => {
      store.dispatch('login/accountLoginOut')
    }
    return {
      name,
      circleUrl,
      handleLoginOut
    }
  }
})
</script>

<style scoped lang="less">
.user-info {
  ::v-deep .el-dropdown-link {
    display: flex;
    align-items: center;
    cursor: pointer;
    & > span {
      margin-left: 12px;
    }
  }
}
</style>
