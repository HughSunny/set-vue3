import { stringify } from 'qs';
const apiHeader = '/api/careers'
/**
 * 获取城市信息
 * @param siteId
 * @returns
 */
export function getCitys(params, request) {
  return request({
    url: `${apiHeader}/city`,
    method: 'GET',
    params,
    token: true,
  });
}


/**
 * @param siteId
 * @returns
 */
export function getDepartment(params, request) {
  return request({
    url: `${apiHeader}/private-category`,
    method: 'GET',
    params,
    token: true,
  });
}
