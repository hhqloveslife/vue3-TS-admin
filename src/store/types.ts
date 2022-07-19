import { ILoginState } from './loginModule/types'
import { ISystemState } from './main/system/types'
import { IDashboardState } from './main/anaylsis/types'

export interface IRootState {
  name: string
  age: number
  entireDepartment: any[]
  entireRole: any[]
  entireMenu: any[]
}

export interface IRootWithModule {
  login: ILoginState
  system: ISystemState
  dashboard: IDashboardState
}

export type IStoreType = IRootState & IRootWithModule
