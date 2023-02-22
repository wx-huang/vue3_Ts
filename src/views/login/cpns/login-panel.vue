<!--
 * @Description: 登陆选项
 * @Version: 0.1
 * @Author: Hwx
-->
<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>

    <el-tabs stretch type="border-card">
      <el-tab-pane>
        <template #label>
          <span>
            <i class="el-icon-user-solid"> </i>
            账号登录
          </span>
        </template>
        <login-account ref="accountRef" />
      </el-tab-pane>

      <el-tab-pane>
        <template #label>
          <span class="custom-tabs-label">
            <i class="el-icon-mobile-phone"> </i>
            手机登录
          </span>
        </template>
        <login-mobile />
      </el-tab-pane>
    </el-tabs>

    <div class="account-contorl">
      <el-checkbox v-model="isKeepPassword" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>

    <el-button type="primary" class="login-btn" @click="handleLogin">立即登陆</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginAccount from './login-account.vue'
import LoginMobile from './login-mobile.vue'
export default defineComponent({
  components: {
    LoginAccount,
    LoginMobile
  },
  setup() {
    const isKeepPassword = ref(true)

    const accountRef = ref<InstanceType<typeof LoginAccount>>()

    const handleLogin = () => {
      accountRef.value?.loginAccount(isKeepPassword.value)
    }

    return {
      isKeepPassword,
      accountRef,
      handleLogin
    }
  }
})
</script>

<style scoped lang="less">
.login-panel {
  margin-bottom: 150px;
  width: 380px;

  .title {
    text-align: center;
    margin-bottom: 30px;
  }

  .account-contorl {
    display: flex;
    justify-content: space-between;
    padding: 8px 4px;
  }

  .login-btn {
    width: 100%;
    margin-top: 12px;
  }
}
</style>
