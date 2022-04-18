<template>
  <div>
    <el-form :rules="rules" :model="phoneLogin">
      <el-form-item prop="number">
        <el-input
          placeholder="请输入手机号码"
          v-model="phoneLogin.number"
          size="large"
        />
      </el-form-item>

      <el-form-item prop="verifyCode">
        <div class="codeContainer">
          <el-input
            placeholder="请输入验证码"
            v-model="phoneLogin.verifyCode"
            size="large"
          />
          <el-button type="primary" class="get-button" size="large"
            >获取验证码</el-button
          >
        </div>
      </el-form-item>
      <div class="ctrlBox">
        <el-checkbox
          v-model="remeberPassword"
          label="记住密码"
          class="checkBox"
        />
        <el-link href="" target="_blank" class="forgetPassword"
          >忘记密码</el-link
        >
      </div>
      <el-button type="primary" class="login-button" size="large"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { rules } from './config/phone-check'

const phoneLogin = reactive({
  number: '',
  verifyCode: ''
})
const remeberPassword = ref()
</script>

<style scoped>
@import './css/inputStyle.css';
.codeContainer {
  display: flex;
}
.login-button {
  width: 100%;
}
.get-button {
  margin-left: 15px;
}
.checkBox,
.forgetPassword {
  margin-bottom: 15px;
}
.ctrlBox {
  display: flex;
  justify-content: space-between;
}
</style>
