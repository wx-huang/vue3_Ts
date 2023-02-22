<!--
 * @Description: form组件
 * @Version: 0.1
 * @Author: Hwx
-->
<template>
  <div class="wx-form">
    <div class="form-header">
      <slot name="header"></slot>
    </div>

    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item :label="item.label" :style="itemStyle">
              <template v-if="item.type === 'input' || item.type === 'password'">
                <el-input :placeholder="item.placeholder" v-bind="item.otherOptions" :model-value="modelValue[`${item.field}`]" @update:modelValue="handleValueChange($event, item.field)" :show-password="item.type === 'password'" />
              </template>

              <template v-else-if="item.type === 'select'">
                <el-select :placeholder="item.placeholder" v-bind="item.otherOptions" :model-value="modelValue[`${item.field}`]" @update:modelValue="handleValueChange($event, item.field)" style="width: 100%">
                  <el-option v-for="option in item.options" :key="option.value" :value="option.title">
                    {{ option.title }}
                  </el-option>
                </el-select>
              </template>

              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker v-bind="item.otherOptions" :model-value="modelValue[`${item.field}`]" @update:modelValue="handleValueChange($event, item.field)" style="width: 100%" />
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>

    <div class="form-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, watch } from 'vue'

import { IFormItem } from '../types'
export default defineComponent({
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    formItems: {
      type: Array as PropType<IFormItem[]>,
      default: () => []
    },
    labelWidth: {
      type: String,
      default: '120px'
    },
    itemStyle: {
      type: Object,
      default: () => ({ padding: '5px 20px' })
    },
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6, //1920px
        lg: 8, //1200px
        md: 12, //992px
        sm: 24, //768px
        xs: 24 //<768px
      })
    }
  },
  emits: ['update:modelValue', 'handleReset', 'handleReset'],
  setup(props, { emit }) {
    // 表单数据双向绑定
    const handleValueChange = (value: any, field: string) => {
      emit('update:modelValue', { ...props.modelValue, [field]: value })
    }

    const handleReset = () => {
      emit('handleReset')
    }

    const handleSearch = () => {
      emit('handleReset')
    }

    return { handleValueChange, handleReset, handleSearch }

    // const formData = ref({ ...props.modelValue })
    // watch(
    //   formData,
    //   (newValue) => {
    //     console.log(newValue, 'newValue')
    //     emit('update:modelValue', newValue)
    //   },
    //   {
    //     deep: true
    //   }
    // )
  }
})
</script>

<style scoped lang="less">
.wx-form {
  padding-top: 22px;
}
</style>
