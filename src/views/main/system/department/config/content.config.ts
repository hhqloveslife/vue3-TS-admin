export const contentTableConfig = {
  title: '用户列表',
  propList: [
    { prop: 'name', label: '部门名称', minWidth: '100' },
    { prop: 'leader', label: '部门领导', minWidth: '100' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '160',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '160',
      slotName: 'updateAt'
    },
    { label: '操作', minWidth: '120', slotName: 'handler' }
  ],
  showIndexColumn: true,
  showSelectColumn: true
}
