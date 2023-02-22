export const listConfig = {
  tableTitle: '用户信息列表',

  propData: [
    { prop: 'name', label: '用户名', minWidth: '60' },
    { prop: 'realname', label: '真实姓名', minWidth: '60' },
    { prop: 'cellphone', label: '手机号码', minWidth: '60' },
    { prop: 'enable', label: '状态', minWidth: '60', slotName: 'enable' },
    { prop: 'createAt', label: '创建时间', minWidth: '', slotName: 'createAt' },
    { prop: 'updateAt', label: '更新时间', minWidth: '', slotName: 'updateAt' },
    { label: '操作', minWidth: '100', slotName: 'handler' }
  ],

  isShowIndex: true,
  isShowSelection: true
}
