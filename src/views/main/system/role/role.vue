<template>
  <div>
    <page-search :searchFormConfig="searchFormConfig"></page-search>
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="role"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    ></page-content>
    <page-modal
      ref="pageModalRef"
      :modalConfig="modalConfig"
      pageName="role"
      :defaultInfo="defaultInfo"
      :otherInfo="otherInfo"
    >
      <el-tree
        ref="elTreeRef"
        class="el-tree"
        :data="menus"
        show-checkbox
        node-key="id"
        :props="{ children: 'children', label: 'name' }"
        @check="handleCheckChange"
      />
    </page-modal>
  </div>
</template>

<script setup lang="ts">
import PageContent from '@/components/page-content'
import { contentTableConfig } from './config/content.config'
import PageSearch from '@/components/page-search'
import { searchFormConfig } from './config/search.config'
import PageModal from '@/components/page-modal'
import { modalConfig } from './config/modal.config'
import { usePageModal } from '@/hooks/usePageModal'
import { useStore } from 'vuex'
import { computed, nextTick, ref } from 'vue'
import { menuMapLeafKeys } from '@/utils/map-menus'

const elTreeRef = ref()
const editCallBack = (item: any) => {
  const leafKeys = menuMapLeafKeys(item.menuList)
  nextTick(() => {
    elTreeRef.value.setCheckedKeys(leafKeys, false)
  })
}
const [pageModalRef, defaultInfo, handleNewData, handleEditData] = usePageModal(
  undefined,
  editCallBack
)

const store = useStore()
const menus = computed(() => store.state.entireMenu)
const otherInfo = ref({})
const handleCheckChange = (data1: any, data2: any) => {
  console.log(data1)
  console.log(data2)
  const checkedKeys = data2.checkedKeys
  const halfCheckedKeys = data2.halfCheckedKeys
  const menuList = [...checkedKeys, ...halfCheckedKeys]
  otherInfo.value = { menuList }
}
</script>

<style scoped>
.el-tree {
  margin-left: 35px;
}
</style>
