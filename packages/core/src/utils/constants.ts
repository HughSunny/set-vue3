import type { ISysInit } from '../interface/ILeadFrame'
import { MenuTypeEnum } from '../interface/IRouter'

export const getMenuTypeTitle = (key) => {
  if (key === MenuTypeEnum.Menu) {
    return '菜单'
  } else if (key === MenuTypeEnum.Page) {
    return '页面'
  } else if (key === MenuTypeEnum.ChildPage) {
    return '子页面'
  } else if (key === MenuTypeEnum.Button) {
    return '按钮'
  }
  return ''
}

export const systemConfigValue = {
  loginSysName: '',
  loginSysLogo: null,
  sysName: '',
  sysLogo: '',
  headerImage: null
}

export const SYSTEM_CODE_GROUP = 'SystemConfig'

export const convertSystemCode2Config = (codeList, sysConfig:Partial<ISysInit> ) => {
  Object.keys(systemConfigValue).forEach((key) => {
    sysConfig[key] = codeList.find((xx) => xx.code === key)?.value
  })
}