import { defineAsyncComponent, h } from 'vue'
import type { RouteMeta, RouteRecordRaw } from 'vue-router'
import { camelCase, cloneDeep } from 'lodash-es'
import RouteView from '@core/home/route-view'
import BlankLayout from '@core/home/blank-layout'

import {
  MenuTypeEnum,
  type IFetchMenu,
  type MenuRouteMeta,
  type MenuRouteItem
} from '@core/interface/IRouter'
import { urlEncodeChineseChars } from '@core/utils'

/**
 * 菜单树 主要是用于显示
 * 根据菜单数组和componentMap菜单配置生成菜单路由树 --- attachComp 是否带component， 如果带，那么就可以当做路由
 * @param menuList menuList 菜单
 * @param componentMap  componentMap 组件映射
 * @param attachComp 是否带组件
 * @returns
 */
export function genMenuTreeRoutes(
  menuList: IFetchMenu[],
  componentMap,
  attachComp = true
): MenuRouteItem[] {
  // 菜单
  if (!Array.isArray(menuList) || menuList.length === 0) {
    return []
  }
  menuList = cloneDeep(menuList)
  // 菜单
  let menus: IFetchMenu[] = []
  const menuObj = {}
  // fix: 去重 id去重就算了，可能path 一样，但是id不一样， 要命
  menuList.forEach((menu) => {
    const { id, path } = menu
    if (menuObj[id]) {
      return
    }
    menus.push(menu)
    menuObj[id] = true
  })

  // menuList = Array.from(new Set(menuList))

  // 菜单排序
  // const treeMenus = arrayToTree(menus)
  // menus = treeToArray(treeMenus)
  // 组件异常处理
  const checkComponents: any[] = []
  // 处理后的路由信息
  const routes: MenuRouteItem[] = []
  menus.forEach((menu: IFetchMenu) => {
    const { name, menuType, id, path } = menu

    // 传统逻辑
    const isUrlPath = path && path.startsWith('http')

    const menuPath = path //不能空
    const menuName = name // name 是路由的主键，必须唯一!!
    // 路由path和组件映射处理
    let component = null

    if (attachComp) {
      component = getComponentByMenuInMap(menu, componentMap)

      if (!component && !isUrlPath) {
        checkComponents.push(menu)
        // 如果没有组件，就用空组件代替
        // return
      }
    }

    // 菜单
    const route: RouteRecordRaw = {
      path: urlEncodeChineseChars(menuPath),
      name: menuName,
      component
    }

    // 重复的 name 造成路由跳转404问题
    // if (sysMenuNames.includes(name)) {
    //   delete route.name;
    // }
    // mes parentId: 0 |  mdm parentId: '0'
    // 菜单元数据
    const meta: MenuRouteMeta = {
      id: menu.id,
      parentId: !menu.parentId || menu.parentId === '0' ? undefined : menu.parentId,
      // parentId: menu.parentId,
      desc: menu.description || undefined,
      title: menu.title,
      icon: menu.icon || undefined,
      // 如果不是页面，keepalive 为false
      keepAlive: !!isPage(menuType),
      // hideInMenu 子页面不需要显示
      hideInMenu: menuType === MenuTypeEnum.ChildPage,
      menuType,
    }
    // 子菜单因为是隐藏 显示激活的菜单
    if (menu.activeMenu) {
      meta.activeMenu = menu.activeMenu
    }
    // url 菜单特殊处理
    if (isUrlPath) {
      meta.target = '_blank'
      Reflect.deleteProperty(route, 'name')
      Reflect.deleteProperty(route, 'component')
    }
    // 元数据赋值
    route.meta = meta

    // 重定向
    // if (component && linkUrl) {
    //   route.redirect = linkUrl
    // }

    routes.push(route)
  })
  // 如果有配置问题，抛出异常
  if (checkComponents.length) {
    const names = checkComponents.map((s) => `${s.path}`).join('\n')
    console.warn(`部分菜单配置的前端组件无效:${names}`)
  }
  // 子级路由都隐藏，则隐藏菜单
  const handleCheckHideRoute = (routes, parent = undefined) => {
    if (!routes) {
      return
    }

    if (Array.isArray(routes)) {
      routes.forEach((s) => {
        handleCheckHideRoute(s, parent)
      })
    }

    // 当前菜单或下级隐藏，不处理
    if (routes.hideInMenu || routes.hideChildrenInMenu) {
      return
    }

    const { children } = routes
    if (!Array.isArray(children) || children.length === 0) {
      return
    }

    if (children.filter((s) => s.meta?.hideInMenu).length === children.length) {
      routes.meta.hideChildrenInMenu = true
      return
    }

    handleCheckHideRoute(children, routes)
  }

  handleCheckHideRoute(routes)

  const menuTree: MenuRouteItem[] = fixMenuRoutes(routes)

  if (attachComp) {
    // 一级菜单需要在组件上套一个route-view
    menuTree.forEach((node) => {
      if (!node.children || node.children.length === 0) {
        if (node.component) {
          if (node.component.render) {
            // 是一个静态组件
            node.component = h(RouteView, null, h(node.component))
          } else {
            // （）=> 引入的组件
            node.component = h(RouteView, null, h(defineAsyncComponent({ loader: node.component })))
          }
        }
      }
    })
  }

  return menuTree
}

/**
 * 从 componentMap中取menu对应的组件
 * @param menu 菜单
 * @param componentMap
 * @returns
 */
export function getComponentByMenuInMap(menu, componentMap) {
  let component = null
  //componentMap 逻辑
  if (isMenu(menu.menuType)) {
    if (!menu.parentId || menu.parentId === '0') {
      //一级父级路由，就用自定义router-view(带tab-customer) 作为component
      component = componentMap['RouteView'] || RouteView
    } else {
      // 二级父路由, 用 BlankLayout(简单route-view)
      component = componentMap['BlankLayout'] || BlankLayout
    }
  } else {
    //如果是页面，但是又找不到组件，那么就加入异常
    const cpName = menu.path
    component = componentMap[cpName] || componentMap[getPath(cpName)]
  }
  return component
}

/**
 * 同步菜单的信息到权限路由中 主要是同步name和meta
 * 注:注:注!!!!通过path 匹配
 * @param {object[]} menuList 菜单列表
 * @param {object} accessRouteTreeList 原始的权限路由
 * @param {object} componentMap 组件映射
 * @returns {object[]}
 */
export function syncMenu2AccessRoutes(
  menuList: MenuRouteItem[],
  accessRouteTreeList: Array<RouteRecordRaw>,
  componentMap?: Record<string, any>
) {
  const useGetAllowRoute = (
    asyncRoute: Array<RouteRecordRaw>,
    menus: Array<MenuRouteItem>
  ): Array<RouteRecordRaw> => {
    const userAsyncRouter: Array<RouteRecordRaw> = []
    asyncRoute.forEach((route: RouteRecordRaw) => {
      const temp = { ...route }
      const hasChild = temp?.children?.length > 0

      if (hasChild) {
        // 迭代
        temp.children = useGetAllowRoute(temp.children, menus).sort((a, b) => {
          return a.meta?.sort - b.meta?.sort
        })
        //父路由重定向
        if (!temp.redirect || !temp.children.find((s) => s.path === temp.redirect)) {
          temp.redirect = temp.children[0]?.path
        }
      }
      // 路径可能有中文字符
      temp.path = urlEncodeChineseChars(temp.path)
      // 通过path 匹配
      const targetMenu: MenuRouteItem = menus.find((r) => r.path === route.path)

      // 如果首层路由存在，直接加入
      if (targetMenu) {
        // 合并route信息
        if (!temp.name) {
          //name是用本地的还是menu的?
          temp.name = targetMenu.name
        }
        // 合并route的meta
        const tempMeta = { ...temp.meta, ...targetMenu.meta }
        temp.meta = tempMeta

        // 根据targetMenu 判断component
        if (temp.component) {
          if (
            isPage(tempMeta.menuType) &&
            (!tempMeta.parentId || tempMeta.parentId === '0') // 根菜单
          ) {
            // 如果是一级菜单
            if (temp.component.type?.name !== 'CustomRouterView') {
              // 判断头结点是否有route-view 包裹
              console.error(
                'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx>',
                temp.path,
                ' 的路由组件必须有route-view包裹'
              )
            }
          }
          if (!isPage(tempMeta.menuType)) {
            if (typeof temp.component === 'object') {
              const componentName = temp.component.name
              if (componentName !== 'CustomRouterView' && componentName !== 'BlankLayout') {
                console.error(
                  'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx>',
                  temp.path,
                  ' 的路由组件只能使用 CustomRouterView 或者 BlankLayout'
                )
              }
            }
          } else {
            //页面 子节点
          }
        } else {
          // 没有组件的路由
          // temp.component = getComponentByMenuInMap(targetMenu, componentMap)
        }
      }
      const targetComponent = getComponentByMenuInMap(temp, componentMap)
      if (targetComponent) {
        // console.log(temp.path, '------------------------------------->has targetComponent')
        //TODO: 替换原先路由下的component，可灵活运用
      }

      userAsyncRouter.push(temp)
    })
    return userAsyncRouter.sort((a, b) => {
      return a.meta?.sort - b.meta?.sort
    })
  }
  const routeTree = useGetAllowRoute(accessRouteTreeList, menuList)
  return routeTree
}

/**
 * 从权限路由中 结合菜单数据 得到菜单 交集处理
 *  主要是同步name和meta
 * 注:注:注!!!!通过path 匹配
 * @param {object[]} menuList 菜单
 * @param {object} accessRouteTreeList 原始的权限路由
 * @param {object} componentMap 组件映射
 * @returns {object[]}
 */
export function getMenuFromAccessRoutes(
  menuList: IFetchMenu[],
  accessRouteTreeList: Array<RouteRecordRaw>,
  componentMap: Record<string, any>
) {
  const useGetAllowRoute = (asyncRoute: Array<RouteRecordRaw>, menus: Array<IFetchMenu>) => {
    const userAsyncRouter: Array<MenuRouteItem> = []
    asyncRoute.forEach((route: RouteRecordRaw) => {
      const temp: MenuRouteItem = { ...route }
      // 通过path 匹配
      const targetMenu = menus.find((r) => r.path === route.path)
      // 如果首层路由存在，直接加入
      if (targetMenu) {
        if (temp.children) {
          // 迭代
          temp.children = useGetAllowRoute(temp.children, menus).sort((a, b) => {
            return a.meta?.sort - b.meta?.sort
          })
        }
        // 合并route信息
        if (!temp.name) {
          //name是用本地的还是menu的?
          temp.name = targetMenu.name
        }
        temp.path = urlEncodeChineseChars(temp.path)

        // 合并route的meta
        const tempMeta = { ...temp.meta, ...targetMenu }
        delete tempMeta.path
        temp.meta = tempMeta

        // component 判断
        if (temp.component) {
          if (
            isPage(targetMenu.menuType) &&
            (!targetMenu.parentId || targetMenu.parentId === '0') // 根菜单
          ) {
            // 如果是一级菜单
            if (temp.component.type?.name !== 'CustomRouterView') {
              // 判断头结点是否有route-view 包裹
              console.error(
                'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx>',
                temp.path,
                ' 的路由组件必须有route-view包裹'
              )
            }
          }
          if (!isPage(targetMenu.menuType)) {
            if (typeof temp.component === 'object') {
              const componentName = temp.component.name
              if (componentName !== 'CustomRouterView' && componentName !== 'BlankLayout') {
                console.error(
                  'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx>',
                  temp.path,
                  ' 的路由组件只能使用 CustomRouterView 或者 BlankLayout'
                )
              }
            }
          } else {
            //页面 子节点
          }
        } else {
          //TODO: 没有组件的路由,从组件map中寻找
          temp.component = getComponentByMenuInMap(targetMenu, componentMap)
        }

        userAsyncRouter.push(temp)
      } else {
        // 公共路由放行，这里预留出不需要鉴权的路由，在meta里面添加 {guest: true}
        if (route.path === '/' || route.meta?.guest) {
          if (temp.children) {
            temp.children = useGetAllowRoute(temp.children, menus)
          }
          userAsyncRouter.push(temp)
        }
      }
    })
    return userAsyncRouter.sort((a, b) => {
      return a.meta?.sort - b.meta?.sort
    })
  }
  const routeTree = useGetAllowRoute(accessRouteTreeList, menuList)
  return routeTree
}

/**
 * 修复路由菜单，做特殊处理，比如同级路由问题。
 * 1.由于业务的特殊性，可能出现特殊的详情页，比如一个列表页下有个详情页，为了实现面包屑导航及兼容vue-router，将子级的页面提高到和当前页面同一级
 * @param menuRoutes 已被简单的解析后的路由菜单
 * @returns {[]|*[]}
 */
export function fixMenuRoutes(menuRoutes) {
  if (!Array.isArray(menuRoutes)) {
    return []
  }

  const tree = []

  // 菜单数组转换为树形结构
  // @ts-ignore
  menuListToTree(menuRoutes, tree)

  return tree
}
// 判断path是否带/
const getPath = (path: string) => {
  if (path && path.startsWith('/')) {
    return path
  }
  return `/${path}`
}

/**
 * Menu数组转树形结构
 * @param {object[]} list 源数组
 * @param {object[]} [tree] 树
 * @param {string} [parentId] 父ID
 */
const menuListToTree = (list, tree, parentId) => {
  list.forEach((item) => {
    // 判断是否为父级菜单
    if (item.meta.parentId !== parentId) {
      return
    }

    const child = {
      ...item,
      children: []
    }
    // 找到当前菜单相符合的所有子菜单
    menuListToTree(list, child.children, item.meta.id)

    // 删掉不存在 children 值的属性
    if (child.children.length === 0) {
      delete child.children
    }

    // 处理 redirect
    const { children } = child
    // 1.如果子菜单，清除该属性
    // 2.如果子菜单中没有指定的跳转连接，选择跳转到第一个子菜单项
    if (!Array.isArray(children)) {
      if (child.redirect) {
        delete child.redirect
      }
    } else if (!children.find((s) => s.path === child.redirect)) {
      // 如果子菜单中没有父节点的redirect
      child.redirect = children[0].path
    }
    // 加入到树中
    tree.push(child)
  })
}
export function isPage(menuType) {
  return menuType === MenuTypeEnum.Page || menuType === MenuTypeEnum.ChildPage
}

export function isMenu(menuType) {
  return menuType === MenuTypeEnum.Menu
}
