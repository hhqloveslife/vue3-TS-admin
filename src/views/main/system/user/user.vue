<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @searchBtnClick="handleSearchClick"
    />
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="users"
      @editBtnClick="handleEditData"
      @newBtnClick="handleNewData"
    ></page-content>
    <page-modal
      :modalConfig="modalConfigRef"
      ref="pageModalRef"
      :defaultInfo="defaultInfo"
      pageName="users"
    ></page-modal>
  </div>
</template>

<script setup lang="ts">
import PageContent from '@/components/page-content/src/page-content.vue'
import PageSearch from '@/components/page-search'
import PageModal from '@/components/page-modal'
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'
import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageModal } from '@/hooks/usePageModal'
import { useStore } from 'vuex'
import { computed } from 'vue'

//动态添加部门和角色
const store = useStore()
const modalConfigRef = computed(() => {
  const departmentItem = modalConfig.formItems.find(
    (item) => item.field === 'departmentId'
  )

  departmentItem!.options = store.state.entireDepartment.map((item: any) => {
    return {
      title: item.name,
      value: item.id
    }
  })
  const roleItem = modalConfig.formItems.find((item) => item.field === 'roleId')
  roleItem!.options = store.state.entireRole.map((item: any) => {
    return {
      title: item.name,
      value: item.id
    }
  })
  return modalConfig
})
const [pageContentRef, handleResetClick, handleSearchClick]: any =
  usePageSearch()

//调用hook获取公共变量和函数
const newCallBack = () => {
  const passwordItem = modalConfig.formItems.find(
    (item) => item.field === 'password'
  )
  passwordItem!.isHidden = false
}
const editCallBack = () => {
  const passwordItem = modalConfig.formItems.find(
    (item) => item.field === 'password'
  )
  passwordItem!.isHidden = true
}
const [pageModalRef, defaultInfo, handleNewData, handleEditData]: any =
  usePageModal(newCallBack, editCallBack)

console.log(store.state.userMenus)
</script>

<style scoped></style>
