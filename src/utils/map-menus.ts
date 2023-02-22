import { IBreadcrumb } from '@/base-ui/breadcrumb/types/index'
import type { RouteRecordRaw } from 'vue-router'

let firstMenu: any = null //第一次有路径的菜单

// 路由与菜单映射
export function mapMenuToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  // 1、加载默认所有的routes
  const allRoutes: RouteRecordRaw[] = []

  const routeFiles = require.context('../router/main', true, /\.ts/)
  routeFiles.keys().forEach((key) => {
    // ../router/main ./analysis/dashboard/dashboard.ts
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })

  // 2、根据菜单获取需要加载的routes
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url)
        if (!firstMenu) {
          firstMenu = menu
        }
        if (route) routes.push(route)
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }

  _recurseGetRoute(userMenus)

  return routes
}

export function pathMapToMenu(userMenus: any[], currentPath: string, breadcrumbs?: IBreadcrumb[]): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        breadcrumbs?.push({ name: menu.name })
        breadcrumbs?.push({ name: findMenu.name })
        return findMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}

// 面包屑数据
export function pathMapBreadcrumbs(userMenus: any[], currentPath: string): any {
  const breadcrumbs: IBreadcrumb[] = []
  pathMapToMenu(userMenus, currentPath, breadcrumbs)
  return breadcrumbs
}

export { firstMenu }
