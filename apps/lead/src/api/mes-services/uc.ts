import { AppConfig } from '@xdc/core';
import http from '../http-mes';
function getUrl(service: string) {
  return '/UCService/' + service;
}

/**
 * 登录
 * @param userCode 用户编码
 * @param password 密码
 */
export async function login(userCode: string, password: string) {
  return http.post({
    url: getUrl('Login'),
    data: { appCode: AppConfig.appCode || 'lead-mes', userCode: userCode, password: password },
  });
}

/**
 * session校验
 * @param token 访问凭据
 * @param userCode 用户编码
 */
export async function checkSession(token: string, userCode: string) {
  const url = getUrl('CheckSession');

  return http.post({
    url,
    data: { sessionId: token, userCode: userCode },
  });
}

/**
 * 获取用户的菜单
 */
export async function getMenusOfUser() {
  const url = getUrl('GetMenusOfUser');
  return http.post({
    url,
    data: { appCode: AppConfig.appCode, userCode: AppConfig.userCode },
  });
}

/**
 * 获取用户所有操作权限
 * @param userCode 用户编码
 * @param appCode 系统编码
 */
export async function getOperationsOfUser(userCode: string, appCode: string) {
  const url = getUrl('GetOperationsOfUser');
  return http.post({
    url,
    data: { userCode, appCode },
  });
}
/**
 * 登出
 * @param callback 回调函数
 * @param error 异常函数
 * @param complete 完成函数
 */
export async function logout() {}
