import type { Pinia } from 'pinia';
import type { RouteRecordRaw, Router } from 'vue-router';
import { Modal } from 'ant-design-vue';
import type {
  IFetchMenu,
  MetaPermission,
  MenuRouteItem,
  IInitAppOptions,
  FnGetMenu,
  FnCheckAccess,
  FnInitSysConfig,
  FnGetSysConfig,
  ISysInit,
  FnGetUserInfo,
  FnGetPermission,
} from '@core/interface';
import { mergeInitRouteOptions, initFrameRouter } from '@core/router';

let _initAppOptions: IInitAppOptions = { store: {} as Pinia, router: {} as Router };
/**
 * 获取初始化路由配置
 */
export function getSystemInitOptions(): IInitAppOptions {
  return _initAppOptions || { store: {} as Pinia, router: {} as Router };
}

/**
 * 应用----初始应用配置
 */
export function initAppOptions(options: IInitAppOptions) {
  console.log('App initAppOptions -----------------------------------------------');
  if (!options?.router) {
    throw new Error('未指定有效 router 参数，路由实例用户初始化路由导航配置');
  }
  if (!options?.store) {
    throw new Error('未指定有效 store 参数，状态管理需要初始化');
  }
  const opts = mergeInitRouteOptions(options);

  _initAppOptions = opts;
  // setActivePinia(_initAppOptions.store);

  initFrameRouter();
}
