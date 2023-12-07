/**
 * 转换页面page参数为请求参数
 * @param params 页面参数
 */
export function convertPageRequestParam(params: Record<string, any> = {}) {
  const { current } = params;
  const par = { ...params };
  if (current) {
    par.pageIndex = current;
  }
  delete par.current;
  delete par.total;
  return par;
}
