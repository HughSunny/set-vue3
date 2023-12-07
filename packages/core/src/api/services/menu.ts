import http from '@core/api/http/http';
import { convertPageRequestParam } from '../helper';
import { AppConfig } from '@core/bo';
enum Api {
  entity = '/api/basic/Menu',
}
function getUrl(service?: string) {
  return `${Api.entity}${service ? `/${service}` : ''}`;
}

export async function getAllMenuList(params?) {
  return http.get({ url: getUrl('ListAll'), params: { appId: AppConfig.appId } });
}

export async function getMenuList(params?) {
  return http.get({ url: getUrl('List'), params: { appId: AppConfig.appId } });
}
export async function getRoleMenuList(roleId) {
  return http.get({
    url: getUrl(['Role', roleId].join('/')),
    params: { appId: AppConfig.appId },
  });
}

export async function updateMenu(data) {
  return http.put({ url: getUrl(), data });
}

export async function createMenu(data) {
  return http.post({ url: getUrl(), data });
}

export async function deleteMenu(id) {
  return http.delete({ url: getUrl(id) });
}

export async function getMenuById(id) {
  return http.get({ url: getUrl(id) });
}
