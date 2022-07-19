import { IBreadcrumb } from '@/base-ui/breadcrunmb'
import { RouteRecordRaw } from 'vue-router'

let firstMenu: any = null

export function mapMenuToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  //1.先加载默认的所有routes
  const allRoutes: RouteRecordRaw[] = []
  const routeFiles = require.context('../router/main', true, /\.ts/)
  routeFiles.keys().forEach((key) => {
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })

  //2.根据菜单获取需要添加的routes
  const getRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) {
          routes.push(route)
        }
        if (!firstMenu) {
          firstMenu = menu
        }
      } else {
        getRoute(menu.children)
      }
    }
  }
  getRoute(userMenus)
  return routes
}

export function pathMapBreadcrumbs(userMenus: any[], currentPath: string) {
  const breadcrunmbs: IBreadcrumb[] = []
  pathMapToMenu(userMenus, currentPath, breadcrunmbs)
  return breadcrunmbs
}

export function pathMapToMenu(
  userMenus: any[],
  currentPath: string,
  breadcrunmbs?: IBreadcrumb[]
): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        breadcrunmbs?.push({ name: menu.name })
        breadcrunmbs?.push({ name: findMenu.name })
        return findMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}

// export function pathMapBreadcrumbs(userMenus: any[], currentPath: string) {
//   const breadcrunmbs: IBreadcrumb[] = []
//   for (const menu of userMenus) {
//     if (menu.type === 1) {
//       const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
//       if (findMenu) {
//         breadcrunmbs.push({ name: menu.name, path: menu.url })
//         breadcrunmbs.push({ name: findMenu.name, path: findMenu.url })
//         return findMenu
//       }
//     } else if (menu.type === 2 && menu.url === currentPath) {
//       return menu
//     }
//   }
//   return breadcrunmbs
// }

// export function pathMapToMenu(userMenus: any[], currentPath: string): any {
//   for (const menu of userMenus) {
//     if (menu.type === 1) {
//       const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
//       if (findMenu) {
//         return findMenu
//       }
//     } else if (menu.type === 2 && menu.url === currentPath) {
//       return menu
//     }
//   }
// }

export function mapMenusToPermissions(userMenus: any[]) {
  const permissions: string[] = []
  const _recurseGetPermission = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermission(menu.children ?? [])
      } else if (menu.type === 3) {
        permissions.push(menu.permission)
      }
    }
  }
  _recurseGetPermission(userMenus)
  return permissions
}

export function menuMapLeafKeys(menuList: any[]) {
  const leafKeys: number[] = []
  const _recurseGetMenuLeafKeys = (menuList: any[]) => {
    for (const menu of menuList) {
      if (menu.children) {
        _recurseGetMenuLeafKeys(menu.children)
      } else {
        leafKeys.push(menu.id)
      }
    }
  }
  _recurseGetMenuLeafKeys(menuList)
  return leafKeys
}
export { firstMenu }
