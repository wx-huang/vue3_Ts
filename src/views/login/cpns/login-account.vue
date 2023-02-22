<!--
 * @Description: 账号登录
 * @Version: 0.1
 * @Author: Hwx
-->
<template>
  <div>
    <el-form ref="formAccount" :rules="rules" :model="account" label-width="60px">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" show-password v-model="account.password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import type { ElForm } from 'element-plus'
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { rules } from '../config/index'

import localCache from '@/utils/cache'
export default defineComponent({
  setup() {
    const store = useStore()

    const account = reactive({
      name: 'coderwhy',
      password: '123456'
    })

    const formAccount = ref<InstanceType<typeof ElForm>>()

    const loginAccount = (isKeepPassword: boolean) => {
      formAccount.value?.validate((valid) => {
        if (valid) {
          // 1、判断是否记住密码
          if (isKeepPassword) {
            localCache.setCache('name', account.name)
            localCache.setCache('password', account.password)
          } else {
            localCache.deleteCache('name')
            localCache.deleteCache('password')
          }

          // 调用vuex中登录
          store.dispatch('login/accountLoginAction', { ...account })
        } else {
          console.log('校验失败')
        }
      })
    }

    return {
      account,
      rules,
      loginAccount,
      formAccount
    }
  }
})
</script>

<style scoped lang="less"></style>
