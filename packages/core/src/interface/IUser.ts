export interface IUserInfo {
  token: string;
  id?: string;
  userCode?: string;
  userName?: string;
  userData?: any;
  avatar?: string;
}

export const STORAGE_KEY_USER_INFO = 'user_info';
export const STORAGE_KEY_TOKEN = 'access_token';
// 下面的接口需要调整

export enum Action {
  ADD = 'add',
  DELETE = 'delete',
  UPDATE = 'update',
  QUERY = 'query',
  IMPORT = 'import',
  EXPORT = 'export',
}
export type LoginType = 'account' | 'telephone';
export type LoginStatus = 'ok' | 'error';
export interface LoginParams {
  type: LoginType;
  username: string;
  password: string;
}
export interface LoginResp {
  type: LoginType;
  success: boolean;
  token: string;
  // currentAuthority: string;
}

export interface Permission {
  /* 权限ID */
  id: string | number;
  /* 权限归属的角色 */
  roleId?: string | number;
  /* 权限名称 */
  name: string;
  /* 权限显示的名字 */
  label?: string;
  /* 权限拥有的操作 [增,删,改,查] */
  actions?: Action[];
}

export interface Role {
  /* 角色ID */
  id: string | number;
  /* 角色名称 */
  name: string;
  /* 角色描述 */
  describe: string;
  /* 角色绑定的权限 */
  permissions?: Permission[];
}

// 后端的结构体定义
export type RouteItem = {
  id: number | string;
  parentId: number | string;
  name: string;
  path: string;
  redirect: string;
  component: string;
  meta: {
    title: string | false;
    icon?: string;
    target?: '_blank' | '_self';
    hideInMenu?: boolean;
    hideChildrenInMenu?: boolean;
    hideInBreadcrumb?: boolean;
    authority?: string | string[];
    [key: string]: any;
  };
};
