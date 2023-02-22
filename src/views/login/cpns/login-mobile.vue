<template>
  <div>
    <el-form ref="formPhone" label-width="60px">
      <el-form-item label="手机号" prop="num">
        <el-input v-model="phone.name" />
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <div class="get-code-box">
          <el-input v-model="phone.code" />
          <el-button type="primary" class="get-code">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
export default defineComponent({
  setup() {
    const phone = reactive({
      name: '',
      code: ''
    })

    return {
      phone
    }
  }
})
</script>

<style scoped lang="less">
.get-code-box {
  display: flex;
  .get-code {
    margin-left: 12px;
  }
}
</style>
