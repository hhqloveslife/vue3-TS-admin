<template>
  <div class="page-content">
    <my-table
      :listData="dataList"
      v-bind="contentTableConfig"
      :dataCount="dataCount"
      v-model:page="pageInfo"
    >
      <!-- header中的插槽 -->
      <template #headerHandler>
        <el-button class="button" @click="handleRefreshCilck"
          ><el-icon class="icon"><Refresh /></el-icon>刷新</el-button
        >
        <el-button
          class="button"
          type="primary"
          v-if="isCreate"
          @click="handleNewClick"
          ><el-icon class="icon"><Plus /></el-icon>新建用户</el-button
        >
      </template>
      <!-- 列表中的插槽 -->
      <template #status="scope">
        <el-button
          size="small"
          plain
          :type="scope.row.enable ? 'success' : 'danger'"
          >{{ scope.row.enable ? '启用' : '禁用' }}</el-button
        >
      </template>
      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <template #handler="scope">
        <div class="handle-btns">
          <el-button
            size="small"
            type="text"
            class="btn"
            v-if="isUpdate"
            @click="handleEditClick(scope.row)"
            ><el-icon class="icon"><Edit /></el-icon>编辑</el-button
          >
          <el-button
            size="small"
            type="text"
            class="btn"
            v-if="isDelete"
            @click="handleDeleteClick(scope.row)"
            ><el-icon class="icon"><Delete /></el-icon>删除</el-button
          >
        </div>
      </template>
      <!-- 动态插入其他插槽 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <slot :name="item.slotName" :row="scope.row"></slot>
      </template>
    </my-table>
  </div>
</template>

<script setup lang="ts">
import MyTable from '@/base-ui/table'
import { Edit, Delete, Plus, Refresh } from '@element-plus/icons-vue'
import {
  defineProps,
  computed,
  defineExpose,
  ref,
  watch,
  defineEmits
} from 'vue'
import { useStore } from 'vuex'
import { usePermission } from '@/hooks/usePermission'

const props = defineProps({
  contentTableConfig: {
    type: Object,
    required: true
  },
  pageName: {
    type: String,
    required: true
  }
})
const emit = defineEmits(['newBtnClick', 'editBtnClick'])

const store = useStore()
//获取权限
const isCreate = usePermission(props.pageName, 'create')
const isUpdate = usePermission(props.pageName, 'update')
const isDelete = usePermission(props.pageName, 'delete')
const isQuery = usePermission(props.pageName, 'query')

//双向绑定pageInfo
const pageInfo = ref({ currentPage: 1, pageSiza: 10 })
watch(pageInfo, () => {
  getPageData()
})
//发送网络请求
const getPageData = (searchInfo: any = {}) => {
  if (!isQuery) {
    return
  }
  store.dispatch('system/getPageListAction', {
    pageName: props.pageName,
    queryInfo: {
      offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSiza,
      size: pageInfo.value.pageSiza,
      ...searchInfo
    }
  })
}
getPageData()
defineExpose({ getPageData })

//从vuex中获取动态数据
const dataList = computed(() =>
  store.getters[`system/pageListData`](props.pageName)
)
const dataCount = computed(() =>
  store.getters[`system/pageDataCount`](props.pageName)
)

//获取其他动态插槽的名称
const otherPropSlots = props.contentTableConfig?.propList.filter(
  (item: any) => {
    if (item.slotName === 'status') return false
    if (item.slotName === 'createAt') return false
    if (item.slotName === 'updateAt') return false
    if (item.slotName === 'handler') return false
    return true
  }
)

//删除按钮
const handleDeleteClick = (item: any) => {
  store.dispatch('system/deletePageDataAction', {
    pageName: props.pageName,
    id: item.id
  })
}

//刷新按钮
const handleRefreshCilck = () => {
  getPageData()
}

//新建用户按钮
const handleNewClick = () => {
  emit('newBtnClick')
}

//编辑按钮
const handleEditClick = (item: any) => {
  emit('editBtnClick', item)
}
</script>

<style scoped>
.header {
  text-align: center;
}
.icon {
  padding: 0 5px 0 0;
}
.content {
  margin-top: 50px;
}
</style>
