import http from '@core/api/http/http'
import { AppConfig } from '@core/bo/app-config'
import { convertPageRequestParam } from '../helper'
enum Api {
  entity = '/api/basic/User'
}
function getUrl(service?: string) {
  return `${Api.entity}${service ? `/${service}` : ''}`
}

export async function login(account: string, password: string,) {
  return http.post({ url: getUrl('Login'), data: { account, password } })
}

export async function getUserInfo() {
  return http.get({ url: getUrl('info')})
}

export async function updatePassword(params) {
  return http.post({ url: getUrl('UpdatePassword'), data: params})
}

export async function resetPassword(id) {
  return http.post({ url: getUrl(['ResetPassword', id].join('/' ))})
}
export async function logout() {
  return http.post({ url: getUrl('Logout'), data: { appCode: AppConfig.appCode } })
}

export async function getUserList(params) {
  return http.get({ url: getUrl('List'), params: convertPageRequestParam(params) })
}

export async function updateUser(data) {
  return http.put({ url: getUrl(), data })
}

export async function createUser(data) {
  return http.post({ url: getUrl(), data })
}

export async function deleteUser(id) {
  return http.delete({ url: getUrl(id) })
}

export async function getUserById(id) {
  return http.get({ url: getUrl(id) })
}

/**
 *
 * @param roleId 角色id
 * @returns
 */
export async function getRoleUserList(roleId) {
  return http.get({ url: getUrl(['Role', roleId].join('/')) })
}
