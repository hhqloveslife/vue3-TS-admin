<template>
  <div class="login-account">
    <el-form :model="info" :rules="rules">
      <el-form-item class="inputDeep" prop="account">
        <el-input
          placeholder="请输入账号"
          v-model="info.account"
          size="large"
        />
      </el-form-item>

      <el-form-item class="inputDeep" prop="password">
        <el-input
          placeholder="请输入密码"
          v-model="info.password"
          size="large"
        />
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
import { rules } from './config/account-check'

const info = reactive({
  account: '',
  password: ''
})

const remeberPassword = ref()
</script>

<style scoped>
@import './css/inputStyle.css';
.login-button {
  width: 100%;
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
