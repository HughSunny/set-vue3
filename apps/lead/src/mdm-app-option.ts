import type {
  FnCheckAccess,
  FnGetMenu,
  FnGetPermission,
  FnGetSysConfig,
  FnGetUserInfo,
  FnInitSysConfig,
  IFetchMenu,
  ISysInit,
  IUserInfo,
  MenuRouteItem,
  MetaPermission,
} from '@xdc/core';
import {
  AppConfig,
  localStorage as ls,
  STORAGE_KEY_TOKEN,
  STORAGE_KEY_USER_INFO,
  treeToArray,
} from '@xdc/core';
import routes from '@/router/modules/extra-layout-routes';
import mdmRoutes from '@/router/modules/mdm-access';
import { routeComponents } from './init';
import { getConstantRoutes } from './router/constant';

const mdmInitConfig: FnInitSysConfig = () => {
  const config: ISysInit = {};
  return config;
};

const mdmInitGetConfig: FnGetSysConfig = async () => {
  const config: ISysInit = {};

  return config;
};

const getMdmMenuList: FnGetMenu = async () => {
  // 取值来源1：userStore， 2: 自定义登录中，自存，然后自取
  const userInfo = ls.get(STORAGE_KEY_USER_INFO);
  const menuList = userInfo.menuList || [];
  return treeToArray(menuList.filter(f => f.systemMark === '1')) as IFetchMenu[];
};

const handleMdmCheckAccess: FnCheckAccess = async () => {
  const token = ls.get(STORAGE_KEY_TOKEN);
  return !!token;
};

const onGetPermission: FnGetPermission = async () => {
  const permissionObj: Recordable<Recordable<MetaPermission>> = {};
  return permissionObj;
};

const onGetUserInfo: FnGetUserInfo = async () => {
  const userData = ls.get(STORAGE_KEY_USER_INFO);
  const user: IUserInfo = {
    token: userData.token,
  };
  return user;
};

export const getMdmInitConfig = () => {
  return {
    onInitConfig: mdmInitConfig,
    onGetConfig: mdmInitGetConfig,
    onCheckAccess: handleMdmCheckAccess,
    onGetMenuList: getMdmMenuList,
    onGetUserInfo,
    onGetPermission,
    routerOptions: {
      initRoutes: getConstantRoutes(AppConfig.sysType) as MenuRouteItem[], // AppConfig.sysType = 'MDM'
      accessRoutes: mdmRoutes,
      layoutRoutes: [...routes],
      routeComponents,
      routeHook: params => {
        // 路由数据再加工处理
        return Promise.resolve(params.routes);
      },
    },
  };
};
