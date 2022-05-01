export interface IAccount {
  name: string
  password: string
}

export interface ILoginResult {
  id: number
  name: string
  token: string
}
export interface Role {
  id: number
  name: string
  intro: string
  createAt?: string
  updateAt?: string
}

export interface Department {
  id: number
  name: string
  parentId?: any
  createAt: string
  updateAt: string
  leader: string
}

export interface Data {
  id: number
  name: string
  realname: string
  cellphone: number
  enable: number
  createAt: string
  updateAt: string
  role: Role
  department: Department
}

export interface RootObject {
  code: number
  data: Data
}
export interface IDataType<T = any> {
  code: number
  data: T
}
