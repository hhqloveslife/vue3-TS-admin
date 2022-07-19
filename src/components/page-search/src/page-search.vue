<template>
  <div class="page-search">
    <my-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h1 class="header">高级检索</h1>
      </template>
      <template #footer>
        <div class="button">
          <el-button @click="handleResetClick">
            <el-icon class="icon"><Refresh /></el-icon>重置</el-button
          >
          <el-button type="primary" @click="handleSearchClick">
            <el-icon class="icon"><Search /></el-icon>查找</el-button
          >
        </div>
      </template>
    </my-form>
  </div>
</template>

<script setup lang="ts">
import MyForm from '@/base-ui/form'
import { ref, defineProps, defineEmits } from 'vue'
import { Refresh, Search } from '@element-plus/icons-vue'

const props = defineProps({
  searchFormConfig: {
    type: Object,
    required: true
  }
})
const emit = defineEmits(['resetBtnClick', 'searchBtnClick'])
const formItems = props.searchFormConfig?.formItems ?? []
const formOriginData: any = {}
for (const item of formItems) {
  formOriginData[item.field] = ''
}
const formData = ref(formOriginData)

// 重置按钮
const handleResetClick = () => {
  formData.value = formOriginData
  emit('resetBtnClick')
}

// 搜索按钮
const handleSearchClick = () => {
  emit('searchBtnClick', formData.value)
}
</script>

<style scoped>
.button {
  padding: 0 40px;
}
.header {
  text-align: center;
}
</style>
