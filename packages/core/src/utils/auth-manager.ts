import { UserManager, type UserManagerSettings } from 'oidc-client';
import { type Plugin, inject, ref } from 'vue';
import { AppConfig, getOidcClientSetting } from '../bo';

/**
 * 用户信息
 */
interface UserInfo {
  /**
   * 用户 id
   */
  userId: string;
  /**
   * 用户名
   */
  username: string;
  /**
   * token
   */
  token: string;
  /**
   * 姓
   */
  lastName: string;
  /**
   * 名
   */
  firstName: string;
  /**
   * 邮箱
   */
  email: string;
  /**
   * 认证时间
   */
  authTime: number;
  /**
   * 角色
   */
  roles: Array<string>;
}
/**
 * 认证管理器
 */
class AuthManager {
  /**
   * token
   */
  accessToken = ref('');
  /**
   * 用户信息
   */
  userInfo = ref<UserInfo>();
  /**
   * oidc 客户端
   */
  private oidc: UserManager;
  /**
   * 构造函数
   * @param settings oidc 客户端配置
   */
  constructor(settings: UserManagerSettings) {
    this.oidc = new UserManager(settings);
    // 当用户登录时，更新 token 和用户信息
    this.oidc.events.addUserLoaded(user => {
      this.accessToken.value = user.access_token;
      this.userInfo.value = {
        userId: user.profile.sub,
        username: user.profile.preferred_username || '',
        token: user.access_token,
        lastName: '',
        firstName: '',
        email: user.profile.email || '',
        authTime: user.profile.auth_time || +new Date(),
        roles: (user.profile.roles as Array<string>) || [],
      };
      // 开启静默刷新，清除过期状态
      this.oidc.startSilentRenew();
      this.oidc.clearStaleState();
    });
    // 当更新 token 失败时，退出登录
    this.oidc.events.addSilentRenewError(() => {
      this.logout();
    });
    // 当 token 过期时，退出登录
    this.oidc.events.addAccessTokenExpired(() => {
      this.logout();
    });
    // 初始化时加载用户信息
    this.loadUser();
  }
  /**
   * 加载用户信息
   */
  async loadUser() {
    const user = await this.oidc.getUser();
    // 如果能加载出来则将信息放到 Ref 里
    if (user) {
      this.accessToken.value = user.access_token;
      this.userInfo.value = {
        userId: user.profile.sub,
        username: user.profile.preferred_username || '',
        token: user.access_token,
        lastName: '',
        firstName: '',
        email: user.profile.email || '',
        authTime: user.profile.auth_time || +new Date(),
        roles: (user.profile.roles as Array<string>) || [],
      };
      this.oidc.startSilentRenew();
      this.oidc.clearStaleState();
    }
  }
  /**
   * 登录
   */
  loginRedirect() {
    return this.oidc.signinRedirect();
  }
  /**
   * 检查是否已登录
   * @returns 是否已登录
   */
  async checkAccess(): Promise<boolean> {
    const user = await this.oidc.getUser();
    return user != null && !user.expired;
  }
  /**
   * 退出登录
   */
  logout() {
    this.oidc.stopSilentRenew();
    this.accessToken.value = '';
    this.userInfo.value = undefined;
    return this.oidc.signoutRedirect();
  }
  /**
   * 刷新 token
   * @param force 是否强制刷新
   */
  async refresh(force?: boolean) {
    // 如果不是强制刷新，则先检查用户可用，如果用户可用则不刷新
    if (!force) {
      const user = await this.oidc.getUser();
      if (user != null && !user.expired) {
        return user;
      }
    }
    return this.oidc.signinSilent();
  }
  /**
   * 登录回调
   */
  loginRedirectCallback(url?) {
    return this.oidc.signinRedirectCallback(url);
  }
  /**
   * 重置密码
   */
  resetPassword() {
    // 这里使用 keycloak 登录流中的更新密码流实现
    this.oidc.signinRedirect({
      scope: 'openid',
      extraQueryParams: {
        // 这里设置额外参数时，带上 keycloak 的更新密码流
        kc_action: 'UPDATE_PASSWORD',
      },
    });
  }
}

let auth: AuthManager | null = null;

const init = (options): AuthManager => {
  if (!options) {
    throw new Error('未指定有效参数');
  }
  auth = new AuthManager(options);
  return auth;
};

const getInstance = (): AuthManager => {
  if (!auth) {
    const oidcConfig = getOidcClientSetting();
    console.log('oidc 配置', oidcConfig);
    auth = new AuthManager(oidcConfig);
    // throw new Error('未初始化')
  }
  return auth;
};

/**
 * 用于注入的 key
 */
const PROVIDE_KEY = Symbol('oidc-provider');
/**
 * 认证插件 --- 不用
 */
const authPlugin: Plugin<UserManagerSettings> = {
  install: (app, options) => {
    auth = new AuthManager(options);
    app.provide(PROVIDE_KEY, auth);
  },
};

/**
 * 使用认证管理器 --- 不用
 * @returns 认证管理器
 */
const useAuthManager = () => {
  return inject<AuthManager>(PROVIDE_KEY);
};

export { authPlugin, useAuthManager, init, getInstance as getAuthManager };
