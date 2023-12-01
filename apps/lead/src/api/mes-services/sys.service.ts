import http from '../http-mes'
import type { ISysConfig } from '@/api/classes'
function getUrl(service: string) {
  return '/SysConfigService/' + service
}
// 获取OAuth2配置信息
export async function getOAuth2Config() {
  const url = getUrl('GetOAuth2Config')
  // return getAsync(url)
  return http.get({ url })
}

/**
 * 获取系统配置
 * @param callback 回调方法
 */
export const getSysConfig = (): Promise<ISysConfig> => {
  const url = getUrl('GetSysConfig')
  return http.get<ISysConfig>({ url })
  // return getAsync(url)
}
