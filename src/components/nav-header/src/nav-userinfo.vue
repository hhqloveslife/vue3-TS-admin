<template>
  <div class="userInfo">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar :size="35" />
        <span>{{ name }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleExitClick">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'
import localCaceh from '@/utils/cache'
import { useRouter } from 'vue-router'

const store = useStore()
const name = computed(() => store.state.login.userInfo.name)
const router = useRouter()
//退出登录按钮
const handleExitClick = () => {
  localCaceh.deleteCache('token')
  router.push('/main ')
}
</script>

<style lang="scss" scoped>
.el-dropdown-link {
  display: flex;
  align-items: center;
  cursor: pointer;
  span {
    margin: 5px;
  }
}
</style>
