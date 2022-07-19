import { ref } from 'vue'
import PageModal from '@/components/page-modal'

type callBackType = (item?: any) => void

export function usePageModal(
  newCallBack?: callBackType,
  editCallBack?: callBackType
) {
  const pageModalRef = ref<InstanceType<typeof PageModal>>()
  const defaultInfo = ref({})

  const handleNewData = () => {
    //这里如果用？的话ts会报错提示左边的值可能为空，那只能用！来表示该值一定不为空就不会报错了
    defaultInfo.value = {}
    pageModalRef.value!.dialogVisible = true
    //当有值时调用它
    newCallBack && newCallBack()
  }

  const handleEditData = (item: any) => {
    defaultInfo.value = { ...item }
    pageModalRef.value!.dialogVisible = true
    //当有值时调用
    editCallBack && editCallBack(item)
  }

  return [pageModalRef, defaultInfo, handleNewData, handleEditData]
}
