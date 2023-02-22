type IFormItemType = 'input' | 'password' | 'select' | 'datepicker'

export interface IFormItem {
  field: string
  type: IFormItemType
  label: string
  rules?: any[]
  placeholder?: any
  // 针对select
  options?: any[]
  // 针对其他
  otherOptions?: any
}

export interface IForm {
  formItems: IFormItem[]
  formSize?: string
  labelWidth?: string
  itemStyle?: any
  colLayout?: any
}
