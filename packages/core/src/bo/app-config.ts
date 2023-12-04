const _config = _APP_CONFIG_ || {};
import type { CreateAxiosOptions } from '@core/api/http/axios/axiosTransform';
import { type UserManagerSettings } from 'oidc-client';
import type { MetaPermission } from '@core/interface/IRouter';

export const defaultValue = {
  //配置
  token: '',
  loginSysName: null,
  loginSysLogo: null,
  sysName: '',
  sysLogo: null,
  friendUrls: [],
  headerImage: null,
  //静态
  sysType: 'INDUSTRY', // MDM or MES or INDUSTRY
  version: '',
  appCode: '',
  appId: '0',
  enableInternational: true,
  //用户
  userCode: '',
  userName: '',

  loginRoutePath: '/login',
  userFactorys: [],
  menuPermission: [],
  currentMenuName: '',
  opPermission: [],
  menuButtonRole: [],
  sysConfig: {},
  localLanguages: {},
  languageList: [],
  uploadStorePath: 'Files',
  oauthOption: {
    enableOidc: false,
    authenticationUrl: 'https://auth.zmecloud.com',
    clientId: 'spa',
    scope: 'email openid profile api',
    // clientId: 'lead',
    // scope: 'openid profile',
    response_type: 'id_token token',

    isUseThirdAuthServer: false,
  },
};
export const flag = 'RUN_ENV';
export const AppConfig: IAppConfig = Object.assign(defaultValue, { ..._config, config: _config });

if (flag.indexOf('DOCKER') !== -1) {
  // docker image 构建时替换为环境变量
}

// console.log('_config ====================>', _config)
// console.log('AppConfig ====================>', AppConfig)
export interface ILocalConfig {
  // [key: string]: any;
  i18nServiceUrl: string; // 多语言服务地址
  servicePre: string;
  maxFileSize: number;
  commonServiceUrl: string;
  approvalServiceUrl: string;
  fileServiceUrl: string;
  ucServiceUrl: string;
  messageServiceUrl: string;
  sysConfigServiceUrl: string;
}
export interface ILanguageItem {
  code: string;
  name: string;
}

export interface IAppConfig {
  sysName: string; // 当前系统名称
  sysLogo: string; // 首页Logo

  loginSysName?: string; // 登录页系统名称
  loginSysLogo?: string; //登录页显示的logo

  headerImage: string; // 首页头背景图片
  config: ILocalConfig; // 环境配置信息
  version: string; // 当前系统版本
  appCode: string; // 应用编码
  appId: string; // 应用Id 菜单传参
  lang: string; // 当前语言
  token: string; // 当前登录用户的token
  userCode: string; // 当前登录用户
  userName: string; // 当前登录用户的用户名
  userFactorys: any[]; // 用户工厂

  menuPermission: any[]; // 菜单权限 保存的是当前用户的路由
  opPermission: Recordable<Recordable<MetaPermission>>; // 操作权限
  currentMenuName: string;
  enableInternational: boolean; //多语言
  oauthOption: OauthOption; // SSO配置信息
  friendUrls?: any[]; //登录页友好链接
  uploadStorePath: string; // 上传文件存储路径
  loginRoutePath?: string;
  //
  menuOps: any[]; // 当前菜单的操作权限
  menuButtonRole: any[]; // 页面的按钮权限
  localLanguages: Recordable<object>; //语言列表
  languageList: ILanguageItem[]; //语言列表

  sysType: string; //系统类型 MDM or MES or INDUSTRY
  // sessionId: string
  baseUrl: string;
  httpConfig: Partial<CreateAxiosOptions>;
}

export const getOidcClientSetting = () => {
  const env = AppConfig.oauthOption;
  const localUrl = `${window.location.protocol}//${window.location.hostname}${
    window.location.port ? `:${window.location.port}` : ''
  }`;
  const oidcRedirectUri = env.clientRedirectUri || localUrl;
  const openIdConnectSettings: UserManagerSettings = {
    authority: `${env.authenticationUrl}`, // 认证服务器
    client_id: `${env.clientId}`, // 服务器 clientId
    client_secret: env.client_secret,
    response_type: env.response_type,
    scope: env.scope, //权限范围 作用域
    automaticSilentRenew: true,

    redirect_uri: `${oidcRedirectUri}/oidc-callback`, // 回调地址（登录成功访问地址）
    post_logout_redirect_uri: `${oidcRedirectUri}/oidc-logout`, // 登出地址

    extraQueryParams: {
      // loginPage: oidcRedirectUri + '/user/login' // 可以设置自定义登录页面
    },
  };
  return openIdConnectSettings;
};
export interface OauthOption {
  enableOidc: boolean;
  /**
   * 客户端作用域/权限范围
   */
  scope: string;
  /**
   * 客户端ID
   */
  clientId: string;
  /**
   * 客户端重定向
   */
  clientRedirectUri: string;
  /**
   * 认证服务器URL
   */
  authenticationUrl: string;
  /**
   * 退出登录后跳转
   */
  logoutUri: string;
  /**
   * 认证之后返回类型
   */
  response_type: string;
  /**
   * 客户端秘钥
   */
  client_secret: string;

  /**
   * 是否使用第三方认证服务
   */
  isUseThirdAuthServer: boolean;
  /**
   * 附加查询参数 oidc-client可能会用
   */
  extraQueryParams?: Record<string, any>;
  /**
   * 其他参数， 合并到到配置后面
   */
  extra?: Record<string, any>;
}
