import http from '@core/api/http/http'
enum Api {
  entity = '/api/basic/Healthz'
}
function getUrl(service?: string) {
  return Api.entity + (service ? `/${service}` : '')
}
export async function getHealthz(params?:any | {}) {
  return http.get({ url: getUrl(), params })
}
export async function getHealthzPing(params?: any) {
  return http.get({ url: getUrl['Ping'], params })
}

