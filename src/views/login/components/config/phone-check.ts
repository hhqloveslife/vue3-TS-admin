export const rules = {
  number: [
    {
      required: true,
      message: '请输入手机号',
      trigger: 'blur'
    },
    {
      pattern: /^[0-9]{11}$/,
      message: '不符合手机号码要求',
      trigger: 'blur'
    }
  ],
  verifyCode: [
    {
      required: true,
      message: '请输入验证码',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{6-}$/,
      message: '验证码错误',
      trigger: 'blur'
    }
  ]
}
