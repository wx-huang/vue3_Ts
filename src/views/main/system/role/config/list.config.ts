export const listConfig = {
  tableTitle: '角色信息列表',

  propData: [
    { prop: 'name', label: '用户名', minWidth: '60' },
    { prop: 'intro', label: '用户权限', minWidth: '60' },
    { prop: 'createAt', label: '创建时间', minWidth: '', slotName: 'createAt' },
    { prop: 'updateAt', label: '更新时间', minWidth: '', slotName: 'updateAt' },
    { label: '操作', minWidth: '100', slotName: 'handler' }
  ],

  isShowIndex: true,
  isShowSelection: true
}
