import type {
  FnCheckAccess,
  FnGetMenu,
  FnGetPermission,
  FnGetSysConfig,
  FnGetUserInfo,
  FnInitSysConfig,
  IInitAppOptions,
  ISysInit,
} from '@xdc/core';
import {
  AppConfig,
  getLocalStorage,
  initAppOptions,
  LeadProLayout,
  STORAGE_KEY_TOKEN,
} from '@xdc/core';
import locales from '@/locale';
import { getMdmInitConfig } from '@/mdm-app-option';
import { getMesInitConfig } from '@/mes-app-option';
import router from '@/router';
import accessRoutes from '@/router/access';
import { getConstantLayoutRoutes, getConstantRoutes } from '@/router/constant';
import store from '@/store';

// import SystemModuleMap from '@/lead-lib/views/system/index.route.map';
const mode = 0; // 0: access 1: map
export const routeComponents: Record<string, any> = {
  // 布局及通用页面
  BasicLayout: LeadProLayout,
  //HOME 页面
  // ['/home']: () => import('@/views/examples/form-test/table.vue'),

  // routeView 会自动添加，不需要自己去包
  // 不支持该模式，会导致页面显示异常
  // ['workplace']: h(RouteView, null, () =>
  //   h(defineAsyncComponent(() => import('@/views/examples/form-test/index.vue')))
  // ),

  //模式1 支持
  // ['/workplace']: () => import('@/views/examples/test.vue'),
  //模式2 支持
  // ['/workplace']: TEST_PAGE2,
  // ['system/user']: () => import('lead-lib/views/system/user-mgt/index.vue'),
};
const systemType = AppConfig.sysType; // MDM MES INDUSTRY

export const getInitConfig = () => {
  if (systemType === 'MDM') {
    return mdmInitConfig;
  }
  if (systemType === 'MES') {
    return mesInitConfig;
  }
  return defaultInitConfig;
};

const onInitConfig: FnInitSysConfig = () => {
  const config: ISysInit = {};
  config.token = getLocalStorage(STORAGE_KEY_TOKEN);
  // 多语言包导入
  config.localLanguages = locales;
  return config;
};

// MES 配置
const defaultInitConfig: IInitAppOptions = {
  store,
  router,
  routerOptions: {
    initRoutes: getConstantRoutes(systemType),
    accessRoutes: [...accessRoutes],
    layoutRoutes: [...getConstantLayoutRoutes()],
    routeComponents,
  },
  onInitConfig,
};
// MES 配置
const mesInitConfig: IInitAppOptions = {
  store,
  router,
  ...getMesInitConfig(),
};

// MDM 配置
const mdmInitConfig: IInitAppOptions = {
  store,
  router,
  ...getMdmInitConfig(),
};
