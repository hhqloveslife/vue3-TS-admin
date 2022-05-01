<template>
  <div class="main">
    <el-container class="main-container">
      <el-aside width="200px">
        <nav-menu />
      </el-aside>
      <el-container class="page">
        <el-header class="page-header">Header</el-header>
        <el-main class="page-cont">Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import NavMenu from '@/components/nav-menu'
</script>

<style scoped>
.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.main-container {
  height: 100%;
}
.el-aside {
  height: 100%;
}
.el-header {
  display: flex;
  justify-self: center;
  align-items: center;
  height: 50px;
  background-color: red;
}
</style>
