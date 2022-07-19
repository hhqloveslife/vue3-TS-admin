<template>
  <div class="nav-header">
    <div class="icon" @click="handleFold">
      <el-icon size="30px" class="fold" v-if="isFold"><expand /></el-icon>
      <el-icon size="30px" class="unfold" v-else><fold /></el-icon>
    </div>
    <div class="content">
      <div>
        <my-breadcrumb :breadcrumbs="breadcrumbs" />
      </div>
      <user-info />
    </div>
  </div>
</template>

<script setup lang="ts" scope>
import { Fold } from '@element-plus/icons-vue'
import { Expand } from '@element-plus/icons-vue'
import { ref, defineEmits, computed } from 'vue'
import UserInfo from './nav-userinfo.vue'
import MyBreadcrumb from '@/base-ui/breadcrunmb'
import { pathMapBreadcrumbs } from '@/utils/map-menus'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

//面包屑数据
const store = useStore()
const route = useRoute()
const breadcrumbs = computed(() => {
  const userMenu = store.state.login.userMenus
  const currentPath = route.path
  return pathMapBreadcrumbs(userMenu, currentPath)
})

const emit = defineEmits(['foldChange'])
const isFold = ref(false)
const handleFold = () => {
  isFold.value = !isFold.value
  emit('foldChange', isFold.value)
}
</script>

<style scoped>
.fold {
  cursor: pointer;
}
.unfold {
  cursor: pointer;
}
.nav-header {
  display: flex;
  width: 100%;
  align-items: center;
}
.content {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>
