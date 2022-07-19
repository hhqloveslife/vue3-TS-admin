export const contentTableConfig = {
  title: '用户列表',
  propList: [
    { prop: 'name', label: '角色名', minWidth: '80', slotName: 'name' },
    { prop: 'intro', label: '权限介绍', minWidth: '80', slotName: 'realname' },
    { prop: 'cellphone', label: '电话号码', minWidth: '100', slotName: 'cellphone' },
    { prop: 'createAt', label: '创建时间', minWidth: '180', slotName: 'createAt' },
    { prop: 'updateAt', label: '更新时间', minWidth: '180', slotName: 'updateAt' },
    { label: '操作', minWidth: '150', slotName: 'handler' }
  ],
  showIndexColumn: true,
  showSelectColumn: true
}
