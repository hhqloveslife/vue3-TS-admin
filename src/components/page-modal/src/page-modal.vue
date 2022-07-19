<template>
  <div class="page-modal">
    <el-dialog v-model="dialogVisible" title="新建用户" width="30%" center>
      <my-form v-bind="modalConfig" v-model="formData"></my-form>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineExpose, watch } from 'vue'
import MyForm from '@/base-ui/form'
import { useStore } from 'vuex'

const props = defineProps({
  modalConfig: {
    type: Object,
    required: true
  },
  //表单初始数据
  defaultInfo: {
    type: Object,
    default: () => ({})
  },
  otherInfo: {
    type: Object,
    default: () => ({})
  },
  pageName: {
    type: String,
    required: true
  }
})
//是否显示弹窗
const dialogVisible = ref(false)
//双向绑定表单数据
const formData = ref<any>({})
watch(
  () => props.defaultInfo,
  (newValue) => {
    for (const item of props.modalConfig.formItems) {
      formData.value[`${item.field}`] = newValue[`${item.field}`]
    }
  }
)
defineExpose({ dialogVisible })
//确定按钮的逻辑
const store = useStore()
const handleConfirmClick = () => {
  dialogVisible.value = false
  if (Object.keys(props.defaultInfo).length) {
    //编辑
    store.dispatch('system/editPageDataAction', {
      pageName: props.pageName,
      editData: { ...formData.value, ...props.otherInfo },
      id: props.defaultInfo.id
    })
  } else {
    //新建
    store.dispatch('system/createPageDataAction', {
      pageName: props.pageName,
      newData: { ...formData.value, ...props.otherInfo }
    })
  }
}
</script>

<style scoped></style>
