<template>
  <div class="login-panel">
    <h1>后台管理系统</h1>
    <el-tabs type="border-card" class="demo-tabs" stretch>
      <el-tab-pane>
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><user-filled /></el-icon>
            <span>账号登录</span>
          </span>
        </template>
        <login-account />
      </el-tab-pane>
      <el-tab-pane>
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><cellphone /></el-icon>
            <span>短信登录</span>
          </span>
        </template>
        <login-phone />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'
import { UserFilled } from '@element-plus/icons-vue'
import { Cellphone } from '@element-plus/icons-vue'
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
}
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.demo-tabs .custom-tabs-label .el-icon {
  vertical-align: middle;
}
.demo-tabs .custom-tabs-label span {
  vertical-align: middle;
  margin-left: 4px;
}
.demo-tabs {
  width: 320px;
  border-radius: 10px;
  // border: 1px solid rgba(64, 158, 255, 0.2);
  border: none;
  box-shadow: 0px 0px 20px 5px rgba(64, 158, 255, 0.1);
}
.login-panel {
  margin-bottom: 200px;
}
::v-deep .el-tabs__item {
  border-top-left-radius: 10px;
}
::v-deep .el-tabs__header {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border: none;
}
::v-deep #tab-0,
#tab-1 {
  border-top-left-radius: 10px;
  border: none;
}
::v-deep .el-tabs--border-card > .el-tabs__header .el-tabs__item {
  border: none;
}
::v-deep .el-tabs__item {
  border-top-left-radius: 10px;
}
</style>
