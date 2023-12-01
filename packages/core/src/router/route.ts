import type { Pinia } from 'pinia'
import { defineAsyncComponent, h } from 'vue'
import type { RouteRecordRaw, Router } from 'vue-router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { message, notification } from 'ant-design-vue'
import { cloneDeep, concat, uniq, uniqWith } from 'lodash-es'
import type { IFetchMenu, IFramePermission, MenuRouteItem } from '@core/interface/IRouter'
import type { IInitAppOptions } from '@core/interface/ILeadFrame'
import { withoutArrayNil, setDocumentTitle, mergeArray, treeToArray } from '@core/utils'
import { useAppStore } from '@core/store/app'
import { useUserStore } from '@core/store/user'
import { AppConfig, getOidcClientSetting } from '@core/bo'

import Layout from '@core/home/index.vue'
import NotFound from '@core/views/exception/404.vue'
import RouteView from '@core/home/route-view'

import { genMenuTreeRoutes, syncMenu2AccessRoutes } from './menu'
import { getAuthManager } from '@core/utils/auth-manager'

let _initAppOptions: IInitAppOptions = { store: {} as Pinia, router: {} as Router }
/**
 * 获取初始化路由配置
 */
export function getInitRouteOptions(): IInitAppOptions {
  return _initAppOptions || { store: {} as Pinia, router: {} as Router }
}

/**
 * 重置路由
 */
export function resetRouter() {
  const { router, routerOptions } = _initAppOptions
  const { whiteList } = routerOptions || {}

  // 获取所有路由
  router.getRoutes().forEach((route) => {
    const { name } = route //获取路由name
    if (name && !whiteList.includes(name as string)) {
      //路由不属于白名单,则删除
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}
/**
 * 应用----初始应用配置
 */
export function initAppOptions(options: IInitAppOptions) {
  console.log('App initAppOptions -----------------------------------------------')
  if (!options?.router) {
    throw new Error('未指定有效 router 参数，路由实例用户初始化路由导航配置')
  }
  const opts = mergeInitRouteOptions(options)
  _initAppOptions = cloneDeep(opts)
  const { router, routerOptions } = opts
  const { initRoutes, whiteList, accessRoutes } = routerOptions || {}
  // 初始默认化路由
  if (Array.isArray(initRoutes)) {
    initRoutes.forEach((route) => {
      router.addRoute(route as RouteRecordRaw)
    })
  }

  NProgress.configure({ showSpinner: false })
  router.beforeEach(async (to, from, next) => {
      console.log('App router beforeEach-----------------------------------------------')

    startLoading()
    const userStore = useUserStore()
    const appTitle = AppConfig.sysName
    // 浏览器标题
    if (to.meta?.title) {
      let docTitle = to.meta.title as string
      if (appTitle) {
        docTitle += ` - ${appTitle}`
      }
      setDocumentTitle(docTitle)
    } else if (appTitle) {
      setDocumentTitle(appTitle)
    }
    const enableOidc = AppConfig.oauthOption?.enableOidc // AppConfig.oauthOption?.authenticationUrl

    const is404: boolean = to.name === '404'
    // 白名单 不用权限校验 直接跳转
    // 白名单路由列表检查
    // 因为动态加载 要跳转的路由不存在 to 变成了 404
    if (whiteList.includes(to.name as string) && !is404) {
      next()
      return
    }
    // token check 以及登录
    let hasAccess = false
    if (enableOidc) {
      const authManager = getAuthManager()
      hasAccess = await authManager.checkAccess()
      if (!hasAccess) {
        // 如果使用 oidc
        if (enableOidc) {
          await authManager.loginRedirect() // 执行重定向
          return
        }
      }
    } else {
      hasAccess = await userStore.CHECK_ACCESS()
      if (!hasAccess) {
        if (to.fullPath !== AppConfig.loginRoutePath) {
          // 未登录，进入到登录页
          stopLoading()

          // 未登录，进入到登录页
          next({
            path: AppConfig.loginRoutePath,
            // 登录后跳转到之前页面，如不需要，直接删除 query 即可
            query: { redirect: encodeURIComponent(to.fullPath) },
            replace: true
          })
        }

        return
      }
    }

    // allRouter 必须获取数据之后才有值，而且肯定不会为空
    const { allRouters } = useUserStore()
    if (allRouters && allRouters.length) {
      // 说明已经初始化，存在就进入页面
      next()
      return
    }

    // 当前用户不存在, 获取用户,加载路由信息
    //STEP: 获取用户信息，获取菜单，获取权限
    await userStore.GET_INFO()
    try {
      const { allRouters, menuTreeList } = useUserStore()
      // 动态添加可访问路由表
      if (Array.isArray(allRouters) && allRouters.length) {
        const checkAddRouter = (treeList, parentName) => {
          for (let mIndex = 0; mIndex < treeList.length; mIndex++) {
            const xx = treeList[mIndex]
            const hasChild = xx?.children?.length > 0

            if (xx.component || xx.redirect) {
              const routeItem = { ...xx }
              delete routeItem.children
              if (parentName) {
                router.addRoute(parentName, routeItem)
              } else {
                router.addRoute(routeItem)
              }
            }

            if (hasChild) {
              xx.children = checkAddRouter(xx.children, xx.name)
            }
          }
        }
        const routes = cloneDeep(allRouters)
        checkAddRouter(routes, undefined)

        // const routeList = treeToArray(homeRoute.children)
        // routeList.forEach(xx => {
        //   if (xx.component) {
        //      router.addRoute(xx)
        //   }
        // })
        // console.log('--------------------------->allRouters', allRouters)
        console.log('--------------------------->menuTreeList', menuTreeList)
        console.log('--------------------------->router.getRoutes()', router.getRoutes())
      }
      // 这边to可能已经变成notfound, 保留原始的路径，继续导航
      next({ path: to.fullPath, replace: true })
    } catch (e) {
      console.error(e)
      // goLogin(to, next)
    }
  })
  router.afterEach(() => {
    stopLoading()
  })
  router.onError((error) => {
    // vue-router 在跳路由加载对应页面js文件失败时，错误信息是 Loading .. failed
    const pattern = /Loading .*failed/g
    if (pattern.test(error)) {
      // 这里可以提示一小段时间，然后刷新页面解决
      window.location.reload() // 刷新后重新请求main.js，这时记录的chunk.js则是服务器最新文件，再次跳路由时则正确请求文件
    }
  })
}

/**
 * 通过请求得到的menuList 得到路由相关信息
 * @param fetchMenuList
 * @param user
 * @returns
 */
export async function genRoutersByFetchMenu(
  fetchMenuList: IFetchMenu[],
  opPermission: Recordable<Recordable<IFramePermission>>
) {
  const { routerOptions } = getInitRouteOptions()
  const { initRoutes, layoutRoutes, accessRoutes, layoutComponent, routeComponents } =
    routerOptions || {}
  try {
    const homeLayoutRoute: MenuRouteItem = {
      path: '/',
      name: 'IndustryPlatformHome',
      component: layoutComponent,
      meta: { title: '首页' }
    }
    const hasAccess = accessRoutes && accessRoutes.length > 0
    // 主路由
    let routeTrees:RouteRecordRaw[] = []
    // 将原始的菜单数据转换为前端使用的菜单
    let menuTrees: MenuRouteItem[] = genMenuTreeRoutes(fetchMenuList, routeComponents, !hasAccess)

    //如果有accessRouters 那么所有的路由都在里面
    if (hasAccess) {
      routeTrees = syncMenu2AccessRoutes(
        treeToArray(menuTrees),
        accessRoutes,
        routeComponents
      ).concat(layoutRoutes || [])
    } else {
      routeTrees = (menuTrees || []).concat(layoutRoutes || [])
    }
    // 生成layout菜单路由

    // 合并layoutRoutes路由
    // layoutRoutes 是固定页面 主要是示范作用，正常不使用
    menuTrees = (menuTrees || []).concat(layoutRoutes || [])

    // 重新找一下对应的redirect, 因为fetchMenuList可能是空
    homeLayoutRoute.redirect =
      Array.isArray(menuTrees) && menuTrees.length > 0 ? menuTrees[0].path : ''
    homeLayoutRoute.children = routeTrees

    // //Step 可以省略 权限注入 遍历所有页面，将页面权限放入route的meta中
    // const attachPermissionToRoute = (treeList: MenuRouteItem[]) => {
    //   for (let mIndex = 0; mIndex < treeList.length; mIndex++) {
    //     const route: MenuRouteItem = treeList[mIndex]
    //     const { name, meta } = route
    //     const hasChild = route?.children?.length > 0
    //     const menuName = name as string //name是路由的主键，必须唯一
    //     const routePermission = opPermission[menuName]
    //     if (routePermission) {
    //       meta.permissions = routePermission
    //     }
    //     if (hasChild) {
    //       attachPermissionToRoute(route.children)
    //     }
    //   }
    // }
    // attachPermissionToRoute(homeLayoutRoute.children)

    // 考虑 parentPath 是否是要存储在Meta中?
    const routes: MenuRouteItem[] = []
    routes.push(homeLayoutRoute)
    const allRouters: MenuRouteItem[] = mergeArray(
      'path',
      cloneDeep(initRoutes || []),
      cloneDeep(routes)
    ) as MenuRouteItem[]

    return {
      menuTreeList: menuTrees,
      allRouters
    }
  } catch (e) {
    console.error(e)
    notification.error({
      message: '菜单配置错误',
      description: '菜单配置有异常问题，请联系管理员',
      duration: 0
    })
  }
}

/**
 * 合并默认的初始化配置参数
 */
function mergeInitRouteOptions(options: IInitAppOptions) {
  let {
    initRoutes = [],
    layoutRoutes = [],
    whiteList = [],
    layoutComponent
  } = options?.routerOptions || {}

  // 初始化路由
  {
    initRoutes = concat([], getSystemInitRoutes(), withoutArrayNil(initRoutes))
    initRoutes = uniqWith(initRoutes, (a, b) => a.name === b.name)
  }
  // layout路由
  {
    layoutRoutes = concat([], getSystemLayoutRoutes(true), withoutArrayNil(layoutRoutes))
    layoutRoutes = uniqWith(layoutRoutes, (a, b) => a.name === b.name)
  }

  // 白名单 合并initRoutes中的路由名字
  {
    whiteList = concat(
      [],
      whiteList,
      initRoutes.map((s) => s.name || '')
    )
    // 去除Home
    whiteList = withoutArrayNil(uniq(whiteList)).filter((s) => s !== 'IndustryPlatformHome')
  }

  // layout 组件
  if (!layoutComponent) {
    layoutComponent = Layout
  }

  // 非layout 路由暂时不考虑

  // 路由配置
  const routerOptions = Object.assign({}, options?.routerOptions, {
    initRoutes,
    layoutRoutes,
    whiteList,
    layoutComponent
  })

  return Object.assign({}, options, { routerOptions })
}
/**
 * 默认路由页面路由，主要用于初始化
 */
export const getSystemInitRoutes = () => [
  //可以放一些403/404/500页面
]
const AsyncGridPanelComponent = defineAsyncComponent(() => import('@core/components/grid-panel/index.vue'))
/**
 * 系统 layout 路由，需要登录
 */
export const getSystemLayoutRoutes = (hideInMenu = true) => [
  // 个人中心
  // 用户管理，权限控制

  // gridPanel: 通用匹配模式
  {
    path: `/grid-panel/:name`,
    props: true,
    meta: { guest: true, hideInMenu: true, title: '' },
    component: h(RouteView, null, () => h(AsyncGridPanelComponent))
  },
  // 404页 登录之后，系统内部的404页面
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    meta: { guest: true, hideInMenu: true, title: '' },
    component: NotFound
  }
]

// 开始loading
function startLoading() {
  NProgress.start() // start progress bar
  const { user } = useUserStore()
  if (user && user.token) {
    return
  }

  const store = useAppStore()
  store.SET_LOADING(true)
}

// 停止loading
function stopLoading() {
  NProgress.done()

  const store = useAppStore()
  store.SET_LOADING(false)
}
