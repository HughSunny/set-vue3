
/**
 * 获取表单
 *@param {siteId,positionType}
 */
export function getFormList(request, params) {
  return request({
    url: '/api/cms/manager/form',
    method: 'GET',
    params,
    token: true,
  });
}

/**
 * 根据id获取表单数据
 * @param {*} params
 * @returns
 */
export function getFormById(request, id) {
  return request({
    url: `/api/cms/form/${id}`,
    method: 'GET',
    token: true,
  });
}
