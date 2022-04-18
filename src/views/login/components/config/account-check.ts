export const rules = {
  account: [
    {
      required: true,
      message: '请输入账号',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{5,}$/,
      message: '账号必须是5~15个数字或者字母的组合',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{6}$/,
      message: '密码必须为6位数以上',
      trigger: 'blur'
    }
  ]
}
