import type {
  FnGetMenu,
  FnCheckAccess,
  IInitAppOptions,
  FnInitSysConfig,
  FnGetSysConfig,
  ISysInit,
  FnGetUserInfo,
  FnGetPermission,
} from '@xdc/core';
import { Modal } from 'ant-design-vue'
import { useCookies } from '@vueuse/integrations/useCookies'
import {
  MenuTypeEnum,
  type IFetchMenu,
  type MenuRouteItem,
  type MetaPermission
} from '@xdc/core'
import { convertKeyCamelCase } from '@xdc/core';
import { localStorage as ls } from '@xdc/core';
import { AppConfig } from '@xdc/core';
import type { ISysConfig } from '@xdc/core';
import { STORAGE_KEY_USER_INFO, type IUserInfo } from '@xdc/core'
import { useI18n } from '@xdc/core';

import { checkSession, getMenusOfUser } from '@/api/mes-services/uc'
import { getOAuth2Config, getSysConfig } from '@/api/mes-services/sys.service'
import { getLanguageList, getServiceStatus } from '@/api/mes-services/common.service'

import { routeComponents } from './router/index'
import { getConstantRoutes } from './router/constant'
import routes from '@/router/modules/extra-layout-routes'

const cookie = useCookies()
const mesInitConfig: FnInitSysConfig = () => {
  // 从localstorage中获取数据
  const sysConfig = ls.get(AppConfig.appCode + '_sys_config') || {}
  // 从cookie中取得数据
  const hasCookie = cookie.get('sid')
  const config: ISysInit = {
    // 用户相关
    userCode: cookie.get('uid'),
    userName: cookie.get('un'),
    token: cookie.get('sid'),
    // 动态配置相关
    sysName: cookie.get('sname') || sysConfig.SysName,
    sysLogo: sysConfig.SysLogo?.trim(),
    headerImage: sysConfig.HeaderImage?.trim(),
    loginSysName: sysConfig.LoginSysName?.trim(),
    loginSysLogo: sysConfig.LoginSysLogo?.trim(),
    friendUrls: sysConfig.FriendUrls,
    languageList: []
    // 静态配置不需要
    // appCode: cookie.get('entry'),
    // version: cookie.get('v'),
  }
  return config
}

const mesInitGetConfig: FnGetSysConfig = async () => {
  const { t } = useI18n()
  const config: Partial<ISysInit> = {}
  const fetchConfig: ISysConfig = await getSysConfig()

  if (fetchConfig) {
    config.sysName = fetchConfig.SysName
    config.sysLogo = fetchConfig.SysLogo?.trim()
    config.headerImage = fetchConfig.HeaderImage?.trim()
    config.loginSysName = fetchConfig.LoginSysName?.trim()
    config.loginSysLogo = fetchConfig.LoginSysLogo?.trim()
    config.friendUrls = fetchConfig.FriendUrls
    ls.set(AppConfig.appCode + '_sys_config', JSON.stringify(fetchConfig))
  }
  const languageRet = await getLanguageList()
  // 获取语言列表
  config.languageList = languageRet.map((item) => {
    return {
      code: item.Code,
      name: item.Name
    }
  })
  // TODO: 需要转换数据
  config.ssoConfig = await getOAuth2Config()

  //获取系统状态 异步就可以,
  getServiceStatus().then((sysStatusMsg) => {
    for (const key in sysStatusMsg) {
      const objs = sysStatusMsg[key]
      for (const item in objs) {
        if (objs[item]?.indexOf(t('异常')) !== -1) {
          Modal.warning({
            title: '警告',
            content: key + t('异常(') + item + ')'
          })
          return
        }
      }
    }
  })
  return config
}

const onGetUserInfo: FnGetUserInfo = async () => {
  const userData = ls.get(STORAGE_KEY_USER_INFO)
  const user: IUserInfo = {
    userCode: cookie.get('uid'),
    userName: cookie.get('un'),
    token: cookie.get('sid'),
    userData
  }
  return user
}

const handleMesCheckAccess: FnCheckAccess = async () => {
  if (!AppConfig.token) {
    return false
  }
  try {
    // checkSession请求逻辑严格意义上来说不符合逻辑
    if (AppConfig.token && AppConfig.userCode) {
      const checkResult = await checkSession(AppConfig.token, AppConfig.userCode)
      return checkResult === true
    }
  } catch (err) {
    console.error(err)
  }
  return false
}

const getMesMenuList: FnGetMenu = async () => {
  const userMenuList = await getMenusOfUser()
  // 测试
  // const userMenuList = convertKeyCamelCase(demoFetchRouters)
  const fetchMenuList = convertKeyCamelCase(userMenuList)

  const convertMenus: IFetchMenu[] = fetchMenuList.map((xx) => {
    const { pageType, id } = xx
    // 源数据 xx.pageType 就是 path, pageType 不带/ 可能是空, path为空
    const path = pageType ? `/${pageType}` : `/${id}`
    //20231023 route的内部逻辑以name为主键，数据以id为主键， name + id 保持唯一性
    const mm: IFetchMenu = {
      ...xx,
      title: xx.name,
      name: name + ',' + id,
      path,
      menuType: xx.isPage ? MenuTypeEnum.Page : MenuTypeEnum.Menu
    }
    return mm
  })
  return convertMenus
}
const onGetPermission: FnGetPermission = async () => {
  const permissionObj: Recordable<Recordable<MetaPermission>> = {}
  // const fetchPermissionList = await getOperationsOfUser(
  //   AppConfig.userCode,
  //   AppConfig.config['appCode']
  // )
  return permissionObj
}

export const getMesInitConfig = () => {
  return {
    onInitConfig: mesInitConfig,
    onGetConfig: mesInitGetConfig,
    onCheckAccess: handleMesCheckAccess,
    onGetMenuList: getMesMenuList,
    onGetUserInfo,
    onGetPermission,
    routerOptions: {
      initRoutes: getConstantRoutes(AppConfig.sysType) as MenuRouteItem[], // AppConfig.sysType = 'MES'
      layoutRoutes: [...routes],
      routeComponents,
      routeHook: (params) => {
        // 路由数据再加工处理
        return Promise.resolve(params.routes)
      }
    }
  }
}
