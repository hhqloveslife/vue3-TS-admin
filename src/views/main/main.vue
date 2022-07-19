<template>
  <div class="main">
    <el-container class="main-container">
      <el-aside width="210px">
        <nav-menu :collapse="isCollapse" />
      </el-aside>
      <el-container class="page">
        <el-header class="page-header"><nav-header @fold-change="handleFoldChange" /></el-header>
        <el-main class="page-cont"><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import NavMenu from '@/components/nav-menu'
import NavHeader from '@/components/nav-header'
import { ref } from 'vue'

const isCollapse = ref(false)
const handleFoldChange = (isFold: boolean) => {
  isCollapse.value = isFold
}
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
}
</style>
