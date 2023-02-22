import { reactive } from 'vue'

export const rules = reactive({
  name: [
    { required: true, message: '用户名称为必填', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{5,10}$/,
      message: '用户名必须是5-10个字母或者数字',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '密码为必填', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{5,}$/,
      message: '密码必须是5位以上的字母或者数字',
      trigger: 'blur'
    }
  ]
})
