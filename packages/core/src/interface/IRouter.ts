import type { VNodeChild } from 'vue'
import type { VNode } from 'vue'
import type {
  RouteMeta,
  RouteComponent,
  RouteRecordRedirectOption,
  RouteRecordName,
  RouteRecordRaw
} from 'vue-router'
import type { Pinia } from 'pinia'
import type { Router } from 'vue-router'
import type { IUserInfo } from '@core/interface/IUser'
type Lazy<T> = () => Promise<T>


export interface IInitRouterOptions {
  /**
   * 初始化路由，非权限控制路由
   */
  initRoutes?: MenuRouteItem[]
  /**
   * 布局组件，用于配置特殊参数等
   */
  layoutComponent?: any
  /**
   * main布局路由，权限控制路由，附加
   */
  layoutRoutes?: any[]
  /**
   * main布局路由，权限控制路由, 权限控制，通过menu 筛选
   * 注意使用route-view(用于tab检测,消费者模式) 和 BlankPage
   */
  accessRoutes?: any[]
  /**
   * 路由组件映射
   * accessRoutes 存在的情况下，不自动生成路由, 在缺少组件的情况下，可以从中取组件
   * TODO: 后期可以用于实现功能, 替换原先业务组件,方便重写，不需要核心组件重新打包
   */
  routeComponents: Record<string, any>
  /**
   * 白名单 路由name
   */
  whiteList?: string[]

  /**
   * 处理菜单原始数据，可以通过路由配置添加特殊场景或特殊角色的路由菜单
   */
  menuHook?: (params: IMenuHookParams) => Promise<any[]>
  /**
   * 处理已生成路由菜单，可以通过路由配置添加特殊场景或特殊角色的路由菜单
   */
  routeHook?: (params: IRouteHookParams) => Promise<MenuRouteItem[]>
}

/**
 * 处理菜单原始数据参数
 */
export interface IMenuHookParams extends IRouteConfigHookParams {
  /**
   * 从服务器获取菜单数据
   */
  menus: any[];
}
/**
 * 对生成的路由菜单再处理
 */
export interface IRouteHookParams extends IRouteConfigHookParams {
  /**
   * 生成的路由配置
   */
  routes: MenuRouteItem[]
}

/**
 * 路由处置回调参数
 */
export interface IRouteConfigHookParams {
  /**
   * 当前登录人信息
   */
  user: IUserInfo
}

export enum MenuTypeEnum {
  Menu = 0, // 菜单
  Page = 1, // 页面
  ChildPage = 2, // 子页面 在菜单中隐藏
  Button = 3, //按钮
}
/**
 * 客户端请求获取的菜单项
 */
export interface IFetchMenu extends Record<string, any> {
  id: string | number
  parentId: string | number
  name: string
  path: string //不能为空，唯一
  title: string
  icon?: string //暂时只支持antd 和 fa
  menuType: number // 菜单/页面/影藏子页面/button
  activeMenu?: string // 如果子页面是 影藏子页面 需要有一个activeMenu属性 表示当前激活的菜单， 应该是上一层菜单

  description?: string
  sort: number
  roleId?: string | number
  extension?: any
  [key: string]: any
}
// mes
// "AppId": 0,
// "Name": "首页",
// "PageType": "index",
// "Icon": "fa fa-home",
// "ResponsiblePeo": null,
// "Description": "首页",
// "Remark": "",
// "ParentId": 0,
// "IsPage": true,
// "Sort": 0,
// "IsUsed": true,
// "Image": null,
// "SImage": null,
// "Extension": null,
// "SExtension": null,
// "RoleId": 0,
// "Path": null,
// "Operations": [],
// "Id": 364,
// "Creator": null,
// "CreateDate": "0001-01-01 00:00:00",
// "Modifier": null,
// "ModifyDate": null

/**
 * 生成的路由 extends RouteRecordRaw
 */
export interface MenuRouteItem {
  path: string
  name?: RouteRecordName
  children?: MenuRouteItem[]
  meta?: MenuRouteMeta
  redirect?: RouteRecordRedirectOption
  component?: RouteComponent | Lazy<RouteComponent>
}


/**
 * 生成的路由meta数据
 */
export interface MenuRouteMeta extends RouteMeta {
  /**
   * 描述
   */
  desc?: string
  /**
   * 路由id 源自服务端
   */
  id?: string | number
  /**
   * 路由上级id 源自服务端
   */
  parentId?: string | number
  /**
   * 图标
   */
  icon?: string | VNodeChild | JSX.Element

  /**
   *  排序号
   */
  sort?: number

  /**
   * 菜单类型
   */
  menuType?: MenuTypeEnum
  /**
   * 菜单树中，只有最后一级可以设置为true
   */
  keepAlive?: boolean

  permissions?: Recordable<IFramePermission>
  /**
   * 子菜单隐藏
   */
  hideInMenu?: boolean

  //antd-pro可以支持的其他菜单自行组织方式
  hideChildrenInMenu?: boolean
  hideInBreadcrumb?: boolean
  authority?: string | string[]
  target?: '_blank' | '_self' | '_parent' | '_top'
  lock?: boolean
  mergeTab?: boolean
}


export interface MetaRecord {
  icon?: VNode | JSX.Element
  title?: string
  authority?: string | string[]
  [key: string]: any
}


export type TargetType = '_blank' | '_self' | unknown
export interface RouteProps {
  X
  [x: string]: any
  key?: string | symbol
  path: string
  name?: string | symbol
  meta?: MetaRecord
  target?: TargetType
  children?: RouteProps[]
  redirect?: any
}

export interface SubMenuProps {
  menu: RouteProps
}

// code: string  // 权限编码 唯一（在页面中唯一）
export interface IFramePermission {
  name: string // 权限名称 可以不唯一 只是一个标识

  type: string // 权限操作，默认 visible
}
