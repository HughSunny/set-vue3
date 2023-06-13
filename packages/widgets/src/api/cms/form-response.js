
/**
 * 创建表单回复
 * @param {*} params
 * @returns
 */
export function createFormResponse(request, data) {
  return request({
    url: `/api/cms/form-response`,
    method: 'POST',
    data,
    token: true,
  });
}
