import http from '@core/api/http/http'
import { convertPageRequestParam } from '../helper'
enum Api {
  entity = '/api/basic/SystemCode'
}
function getUrl(service?: string) {
  return `${Api.entity}${service ? `/${service}` : ''}`
}

export async function getSystemCodeList(params?) {
  return http.get({
    url: getUrl('List'),
    params: { ...convertPageRequestParam(params) }
  })
}
export async function updateSystemCode(data) {
  return http.put({ url: getUrl(), data })
}

export async function createSystemCode(data) {
  return http.post({ url: getUrl(), data })
}

export async function deleteSystemCode(id) {
  return http.delete({ url: getUrl(id) })
}

export async function getSystemCodeById(id) {
  return http.get({ url: getUrl(id) })
}

export async function batchCodes(data) {
  return http.post({
    url: getUrl('Batch'),
    data
  })
}
