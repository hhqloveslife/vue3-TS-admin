<template>
  <div class="login">
    <LoginPanel />
  </div>
</template>

<script setup lang="ts">
import LoginPanel from './components/login-panel.vue'
</script>

<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>
