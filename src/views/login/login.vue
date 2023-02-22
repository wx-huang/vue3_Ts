<!--
 * @Description: 登陆页面
 * @Version: 0.1
 * @Author: Hwx
-->
<template>
  <div class="login">
    <loginPanel />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import loginPanel from './cpns/login-panel.vue'

export default defineComponent({
  name: 'login',
  components: {
    loginPanel
  },
  setup() {
    const handleOpen = () => {
      console.log('111')
    }
    const handleClose = () => {
      console.log('222')
    }
    return {
      handleOpen,
      handleClose
    }
  }
})
</script>

<style scoped lang="less">
.login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('~@/assets/img/login-bg.svg');
}
</style>
