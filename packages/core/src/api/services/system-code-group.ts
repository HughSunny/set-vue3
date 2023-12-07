import http from '@core/api/http/http';
import { convertPageRequestParam } from '../helper';
import { AppConfig } from '@core/bo';
enum Api {
  entity = '/api/basic/SystemCodeGroup',
}
function getUrl(service?: string) {
  return `${Api.entity}${service ? `/${service}` : ''}`;
}

export async function getSystemCodeGroupList(params?) {
  return http.get({
    url: getUrl('List'),
    params: { ...convertPageRequestParam(params) },
  });
}
export async function updateSystemCodeGroup(data) {
  return http.put({ url: getUrl(), data });
}

export async function createSystemCodeGroup(data) {
  return http.post({ url: getUrl(), data });
}

export async function deleteSystemCodeGroup(id) {
  return http.delete({ url: getUrl(id) });
}

export async function getSystemCodeGroupById(id) {
  return http.get({ url: getUrl(id) });
}

export async function getSystemCodesByGroupCode(groupName) {
  return http.get({
    url: getUrl(['Code', groupName].join('/')),
  });
}
