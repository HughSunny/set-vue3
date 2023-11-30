import type {
  FnGetMenu,
  FnCheckAccess,
  FnInitSysConfig,
  FnGetSysConfig,
  ISysInit,
  FnGetUserInfo,
  FnGetPermission
} from 'lead-lib/interface/ILeadFrame'
import { STORAGE_KEY_TOKEN } from 'lead-lib/interface/IUser'
import { Modal } from 'ant-design-vue'
import {
  MenuTypeEnum,
  type IFetchMenu,
  type IFramePermission
} from 'lead-lib/interface/IRouter'
import ls from 'lead-lib/utils/local-storage'
import { AppConfig } from 'lead-lib/bo/app-config'
import { type IUserInfo } from 'lead-lib/interface/IUser'
import { getAllMenuList, getMenuList } from 'lead-lib/api/services/menu'
import { getLanguageList } from 'lead-lib/api/services/common'
import { getHealthz } from 'lead-lib//api/services/healthz'
import { getSystemCodesByGroupName } from 'lead-lib/api/services/system-code'
import { SYSTEM_CODE_GROUP } from 'lead-lib/utils/constants'
import { getUserInfo } from 'lead-lib/api/services/uc'
import { useI18n } from 'lead-lib/hooks/useI18n'
import { treeToArray } from 'lead-lib/utils'
const onInitConfig: FnInitSysConfig = () => {
  const config: ISysInit = {} as ISysInit
  config.token = ls.get(STORAGE_KEY_TOKEN)
  // 缓存获取 配置
  return config
}

const onGetConfig: FnGetSysConfig = async () => {
  const { t } = useI18n()
  const config: Partial<ISysInit> = {}
  // const sysConfigCodeList = await getSystemCodesByGroupName(SYSTEM_CODE_GROUP)
  // const convertConfig = convertSystemCode2Config(sysConfigCodeList, config)
  const languageRet = await getLanguageList()
  config.languageList = languageRet.map((item) => {
    return {
      code: item.Culture,
      name: item.DisplayName
    }
  })

  const healthRet = await getHealthz()
  const { entries, status } = healthRet
  const checkStatus = (statusObj) => {
    const { status, exception } = statusObj
    return status.indexOf(t('sys.status.healthy')) === -1 || !exception
  }
  if (!checkStatus(healthRet)) {
    for (const key in entries) {
      const obj = entries[key]
      const { status, exception } = obj
      if (!checkStatus(obj)) {
        Modal.warning({
          title: t('sys.status.warning'),
          content: key + t('sys.status.exception') + '(' + exception + ')'
        })
      }
    }
  }

  return config
}

const onGetUserInfo: FnGetUserInfo = async () => {
  const userInfo = await getUserInfo()
  const user: IUserInfo = {
    token: AppConfig.token,
    id: userInfo.id,
    avatar: userInfo.avatar,
    userCode: userInfo.account,
    userName: userInfo.displayName || userInfo.name,
    userData: userInfo
  }
  return user
}

const onCheckAccess: FnCheckAccess = async () => {
  if (AppConfig.token) {
    return true
  }
  return false
}
const onGetMenuList: FnGetMenu = async () => {
  let fetchMenuList: IFetchMenu[] = []
  const menuRet = await getMenuList()

  const serverArray = (treeList, parentMenuKey?) => {
    const newArr = []
    for (let mIndex = 0; mIndex < treeList.length; mIndex++) {
      const xx = treeList[mIndex]
      const hasChild = xx?.children?.length > 0
      if (!hasChild) {
        delete xx.children
      }
      // enabled === 0 隐藏的不需要显示  MenuTypeEnum.Button 是按钮权限
      // menu的url可能是空
      const path = getPath(xx.url || xx.code) //必须以/为开头
      if (xx.enabled && xx.menuType < MenuTypeEnum.Button) {
        const menuName = xx.code //name是路由的主键，必须唯一!
        const menuObj: IFetchMenu = {
          id: xx.id,
          parentId: xx.parentId,
          name: menuName,
          path,
          title: xx.name,
          icon: xx.icon,
          sort: xx.sortNo,
          menuType: xx.menuType
        }
        if (xx.menuType === MenuTypeEnum.ChildPage) {
          //需要有一个activeMenu属性 表示当前激活的菜单， 应该是上一层菜单
          menuObj.activeMenu = parentMenuKey
        }

        if (hasChild) {
          menuObj.children = serverArray(xx?.children, path).sort((a, b) => {
            return a.sort - b.sort
          })
        }
        newArr.push(menuObj)
      }
    }
    return newArr
  }

  const menuList = []
  if (menuRet && menuRet.length > 0) {
    AppConfig.menuPermission = menuRet.sort((a, b) => {
      return a.sortNo - b.sortNo
    })
    const serveList = serverArray(menuRet).sort((a, b) => {
      return a.sort - b.sort
    })
    serveList.forEach((xx) => {
      menuList.push(...treeToArray(xx))
    })
    fetchMenuList = menuList
  }
  return fetchMenuList
}

const onGetPermission: FnGetPermission = async () => {
  // 从 AppConfig.menuPermission中获取，因为是连在一起的
  const menuList = AppConfig.menuPermission
  const permissionObj: Recordable<Recordable<IFramePermission>> = {}
  const serverArray = (treeList) => {
    for (let mIndex = 0; mIndex < treeList.length; mIndex++) {
      const xx = treeList[mIndex]
      const { id, menuType, enabled } = xx
      const hasChild = xx?.children?.length > 0
      if (menuType === MenuTypeEnum.Button) {
        continue
      }
      if (!hasChild) {
        continue
      }
      // enabled === 0 隐藏的不需要显示  MenuTypeEnum.Button 是按钮权限
      if (!enabled) {
        continue
      }
      const menuName = xx.code //name 是路由的主键，必须唯一
      const buttonList = xx?.children.filter((child) => child.menuType === MenuTypeEnum.Button)
      if (buttonList && buttonList.length) {
        const pagePermission: Recordable<IFramePermission> = {}
        buttonList.forEach((xx) => {
          const item: IFramePermission = {
            name: xx.name,
            type: xx.enabled ? 'visible' : 'invisible'
          }
          pagePermission[xx.code] = item
        })
        permissionObj[menuName] = pagePermission
      }

      // permissionObj[menuName] = []
      if (hasChild) {
        serverArray(xx?.children)
      }
    }
  }

  serverArray(menuList)
  return permissionObj
}
// 判断path是否带/
const getPath = (path: string) => {
  if (path && path.startsWith('/')) {
    return path
  }
  return `/${path}`
}
export const IndustryOption = {
  onInitConfig,
  onGetConfig,
  onGetUserInfo,
  onGetMenuList,
  onCheckAccess,
  onGetPermission
}
