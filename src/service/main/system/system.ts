import hqRequest from '../../index'
import { IDataType } from '@/service/types'

export function getPageListData(url: string, queryInfo: any) {
  return hqRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}

//url:/userss/id
export function deletePageData(url: string) {
  return hqRequest.delete<IDataType>({
    url: url
  })
}

export function createPageData(url: string, newData: any) {
  return hqRequest.post<IDataType>({
    url: url,
    data: newData
  })
}

export function editPageData(url: string, editData: any) {
  return hqRequest.patch<IDataType>({
    url: url,
    data: editData
  })
}
