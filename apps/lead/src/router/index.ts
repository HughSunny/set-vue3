import type { App, Component } from 'vue';
import { defineAsyncComponent, h } from 'vue';
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import { AppConfig, type IInitAppOptions, initAppOptions, LeadProLayout } from '@xdc/core';
import { getMdmInitConfig } from '@/mdm-app-option';
import { getMesInitConfig } from '@/mes-app-option';
import store from '@/store';
// import SystemModuleMap from '@/lead-lib/views/system/index.route.map';
import accessRoutes from './access';
import { getConstantLayoutRoutes, getConstantRoutes } from './constant';

const systemType = AppConfig.sysType; // MDM MES INDUSTRY
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

export function setupRouter(app: App) {
  app.use(router);
  initAppOptions(getInitConfig(systemType));
  return router;
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: getConstantRoutes(systemType),
  scrollBehavior: (to, from) => {
    if (to.path !== from.path) {
      setTimeout(() => {
        document.getElementById('app').scrollTop = 0;
      });
    }
    return { top: 0 };
  },
});
const getInitConfig = (systemType?) => {
  if (systemType === 'MDM') {
    return mdmInitConfig;
  }
  if (systemType === 'MES') {
    return mesInitConfig;
  }
  return defaultInitConfig;
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
