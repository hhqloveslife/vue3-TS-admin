<template>
  <div class="login-account">
    <el-form :model="account" :rules="rules" ref="formRef">
      <el-form-item class="inputDeep" prop="name">
        <el-input
          placeholder="请输入账号"
          v-model="account.name"
          size="large"
        />
      </el-form-item>

      <el-form-item class="inputDeep" prop="password">
        <el-input
          placeholder="请输入密码"
          v-model="account.password"
          size="large"
          showPassword
        />
      </el-form-item>
      <div class="ctrlBox">
        <el-checkbox
          v-model="isKeepPassword"
          label="记住密码"
          class="checkBox"
        />
        <el-link href="" target="_blank" class="forgetPassword"
          >忘记密码</el-link
        >
      </div>
      <el-button
        type="primary"
        class="login-button"
        size="large"
        @click="handleLogin"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ElForm } from 'element-plus'
import { reactive, ref } from 'vue'
import { rules } from './config/account-check'
import localCache from '@/utils/cache'
import { useStore } from 'vuex'
// import { throwStatement } from '@babel/types'

const account = reactive({
  name: localCache.getCache('name'),
  password: localCache.getCache('password')
})

const isKeepPassword = ref(false)

const formRef = ref<InstanceType<typeof ElForm>>()
//获取store
const store = useStore()
const loginAction = (isKeepPassword: boolean) => {
  formRef.value?.validate((valid) => {
    if (valid) {
      //判断是否需要记住密码，密码存到localStorage
      if (isKeepPassword) {
        localCache.setCache('name', account.name)
        localCache.setCache('password', account.password)
      } else {
        localCache.deleteCache('name')
        localCache.deleteCache('password')
      }
      //登录
      store.dispatch('login/accountLoginAction', { ...account })
    }
  })
}

const handleLogin = (isKeepPassword: boolean) => {
  loginAction(isKeepPassword)
}
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
