import { useStore } from 'vuex'

export function usePermission(pageName: string, handleName: string) {
  const store = useStore()
  const permissios = store.state.login.permissions
  const verifyPermission = `system:${pageName}:${handleName}`

  return Boolean(permissios.find((item: any) => item === verifyPermission))
}
