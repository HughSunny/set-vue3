import { acceptHMRUpdate, defineStore } from 'pinia';
import type { RouteRecordRaw } from 'vue-router';
import ls from '@core/utils/local-storage';
import { AppConfig } from '@core/bo';
import { UserInfo } from '@core/bo/userInfo';
import {
  STORAGE_KEY_USER_INFO,
  STORAGE_KEY_TOKEN,
  type IUserInfo,
  type Role,
} from '@core/interface/IUser';
import { logout } from '@core/api/services/uc';
import { type IFetchMenu, type MetaPermission } from '@core/interface/IRouter';
import { genRoutersByFetchMenu, getInitRouteOptions, resetRouter } from '@core/router/route';
import { genMenuInfo, type MenuInfo } from '@core/utils/menu-util';
import { IndustryOption } from '../app/app-option';
import { getAuthManager } from '../utils/auth-manager';

export interface IUserState {
  user?: IUserInfo;
  role?: Role;
  menuTreeList: RouteRecordRaw[];
  menuInfo: MenuInfo;
  extra?: {
    [key: string]: any;
  };
  [key: string]: any;
}

export const LOGIN = 'LOGIN';

export const SET_ROLE = 'SET_ROLE';
export const RESET_CURRENT_USER = 'RESET_CURRENT_USER';

export const initUserState = (): IUserState => ({
  user: { token: null },
  role: undefined,
  menuInfo: { menus: [], menuKeyMap: {} },
  menuTreeList: [],
  allRouters: [],
  unreadCount: 3,
});

export const useUserStore = defineStore('user', {
  state: initUserState,
  getters: {
    info: state => state.extra,
    currentUser: state => state.user,
  },
  actions: {
    getToken() {
      return AppConfig.token;
    },
    getTenantId() {
      return 0;
    },
    SET_INFO(user: IUserInfo) {
      this.user = {
        ...user,
      };
      this.extra = { ...user };
      UserInfo.sessionId = user.token;
      UserInfo.userCode = user.userCode;
      UserInfo.userName = user.userName;
      UserInfo.userData = user.userData;

      AppConfig.token = user.token;
      AppConfig.userCode = user.userCode;
      AppConfig.userName = user.userName;
      // AppConfig.userFactorys = user.userData?.UserFactorys || []

      ls.set(STORAGE_KEY_TOKEN, user.token);
      // 缓存用户信息
      ls.set(STORAGE_KEY_USER_INFO, user.userData);
    },

    [SET_ROLE](role: IUserState['role']) {
      this.role = role;
    },

    async CHECK_ACCESS(): Promise<boolean> {
      //STEP: 校验用户权限
      const { onCheckAccess } = getInitRouteOptions();
      if (onCheckAccess) {
        return await onCheckAccess();
      }
      // 工业逻辑
      return IndustryOption.onCheckAccess();
    },
    // AuthGuard : Promise<IUserInfo>
    async GET_INFO() {
      const { onGetMenuList, onGetUserInfo, routerOptions, onGetPermission } =
        getInitRouteOptions();
      const { menuHook, routeHook } = routerOptions || {};
      let user: IUserInfo = null;
      //STEP: 获得用户基础数据, 可以请求，可以读缓存
      if (onGetUserInfo) {
        user = await onGetUserInfo();
      } else {
        // 工业逻辑
        user = await IndustryOption.onGetUserInfo();
      }
      this.SET_INFO(user);

      //STEP: 获取用户菜单列表
      let fetchMenuList: IFetchMenu[] = [];
      if (onGetMenuList) {
        fetchMenuList = await onGetMenuList();
      } else {
        // 工业逻辑
        fetchMenuList = await IndustryOption.onGetMenuList();
      }

      //STEP:获取用户操作权限列表
      let opPermission: Recordable<Recordable<MetaPermission>> = {};
      if (onGetPermission) {
        opPermission = await onGetPermission();
      } else {
        // 工业逻辑
        opPermission = await IndustryOption.onGetPermission();
      }
      AppConfig.opPermission = opPermission || {};
      //TODO: 将permission加入到 router中 方便调用
      // 通过fetchMenuList 生成路由
      const { menuTreeList, allRouters } = await genRoutersByFetchMenu(fetchMenuList, opPermission);

      // menuTreeList 是带component的 需要转化成菜单数据
      const menuInfo: MenuInfo = genMenuInfo(menuTreeList as RouteRecordRaw[]);

      if (menuHook) {
        menuInfo.menus = await menuHook({
          user,
          menus: menuInfo.menus,
        });
      }
      this.menuInfo = menuInfo;

      this.menuTreeList = menuTreeList as RouteRecordRaw[];

      if (routeHook) {
        this.allRouters = await routeHook({
          user,
          routes: allRouters,
        });
      } else {
        this.allRouters = allRouters;
      }

      // AppConfig.oauth2Option = await getOAuth2Config()
    },

    async LOGOUT(submit: boolean = true) {
      if (submit) {
        await logout();
      }
      this.SET_INFO({
        token: null,
        id: null,
        userCode: null,
        userName: null,
        userData: null,
        avatar: undefined,
      });
      // 重置路由
      resetRouter();
      // 重置store中的allRouters
      this.allRouters = [];
    },
    async logoutAndJump(submit: boolean = true) {
      await this.LOGOUT(submit);
      if (AppConfig.oauthOption?.enableOidc) {
        getAuthManager().logout();
      } else {
        window.location.href = '/login';
      }
    },
  },
});

// const hot = import.meta.hot || (import.meta as any).hot
// if (hot) {
//   hot.accept(acceptHMRUpdate(useUserStore, hot))
// }
