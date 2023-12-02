import type { Pinia } from 'pinia';
import type { Router } from 'vue-router';
import type { IUserInfo } from '@core/interface/IUser';
import type { IFetchMenu, MetaPermission, IInitRouterOptions } from '@core/interface/IRouter';
import type { CreateAxiosOptions } from '@core/api/http/axios/axiosTransform';
import type { ILanguageItem, OauthOption } from '@core/bo/app-config';

export interface ISysInit {
  token: string; // 当前登录用户的已经保存的令牌
  userCode?: string;
  userName?: string;

  sysName: string; // 当前系统名称
  sysLogo: string; // 首页Logo
  loginSysName?: string; // 登录页系统名称
  loginSysLogo?: string; //登录页显示的logo
  headerImage?: string; //首页登录页面的背景图片
  friendUrls?: any[]; //登录页友好链
  languageList: ILanguageItem[]; //需要指定类型

  sysStatusMsg?: any; // 系统状态消息
  enableOidc?: boolean;
  ssoConfig?: OauthOption; // sso配置
  // 静态配置
  // version: string // 当前系统版本
  // appCode?: string // 应用编码
  // baseUrl?: string
  //TODO: 网络其他拓展，具体业务再说
  //httpConfig / baseUrl 相辅相成
  httpConfig?: Partial<CreateAxiosOptions>;
}

// 应用配置初始化  在App 同步 不能进行长时间的操作 AppConfig.init
export type FnInitSysConfig = () => ISysInit;

// 获取系统配置/字典等非静态数据 -请求
export type FnGetSysConfig = () => Promise<Partial<ISysInit>>;

// 登录: 请求       在login-view
export type FnLoginHook = (username: string, password: string) => Promise<IUserInfo>;

// 登录: 之后操作   在login-view
export type FnAfterLogin = () => void;

// 检测是否可以进入主界面 在 userStore
export type FnCheckAccess = () => Promise<boolean>;

// 获取用户信息   在 userStore 已经登录刷新页面，重新获取用户相关信息
export type FnGetUserInfo = () => Promise<IUserInfo>;

// 获取菜单       在 userStore
export type FnGetMenu = () => Promise<IFetchMenu[]>;

// 获取页面权限   在 userStore TODO
export type FnGetPermission = () => Promise<Recordable<Recordable<MetaPermission>>>;

/**
 * 应用初始化配置
 */
export interface IInitAppOptions {
  /**
   * pinia 实例
   */
  store: Pinia;
  /**
   * 路由实例
   */
  router: Router;
  /**
   * 路由配置
   */
  routerOptions?: IInitRouterOptions;

  /**
   * 初始化本地配置
   */
  onInitConfig?: FnInitSysConfig;
  /**
   * 配置获取
   */
  onGetConfig?: FnGetSysConfig;

  /**
   * 判断是否可以进入主界面
   */
  onCheckAccess?: FnCheckAccess;
  /**
   * 获取用户信息
   */
  onGetUserInfo?: FnGetUserInfo;

  /**
   * 获取menu数据 返回特定的数据方便组装
   */
  onGetMenuList?: FnGetMenu;

  /**
   * 获取权限数据  Record<string, T> string为pageName, T为权限列表
   */
  onGetPermission?: FnGetPermission;

  /**
   * 登录后执行回调，如获取平台其他消息等
   */
  loginHook?: () => Promise<void>;
}
