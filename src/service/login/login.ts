import hqRequest from '../index'
import { IAccount, ILoginResult } from './type'
import { IDataType } from '../types'

enum LoginAPI {
  AccountLogin = '/login',
  UserInfo = '/users/',
  UserMenus = '/role/'
}
export function accountLoginRequest(account: IAccount) {
  return hqRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

export function userInfoRequestById(id: number) {
  return hqRequest.get<IDataType>({
    url: LoginAPI.UserInfo + id
  })
}

export function userMenusRequestById(id: number) {
  return hqRequest.get<IDataType>({
    url: LoginAPI.UserMenus + id + '/menu'
  })
}
