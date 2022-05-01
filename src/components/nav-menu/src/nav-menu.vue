<template>
  <div class="nav-menu">
    <div class="logo">
      <h1>Vue+TS</h1>
    </div>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      active-text-color="#ffd04b"
      background-color="#545c64"
    >
      <template v-for="item in userMenus" :key="item.id">
        <template v-if="item.type === 1">
          <template v-for="subitem in item.children" :key="subitem.id">
            <el-sub-menu>
              <span>{{ item.name }}</span>
            </el-sub-menu>
          </template>
        </template>
        <template v-else>
          <el-menu-item>{{ item.name }}</el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const userMenus = computed(() => store.state.login.userMenus)
</script>

<style scoped>
.logo {
  text-align: center;
}
</style>
