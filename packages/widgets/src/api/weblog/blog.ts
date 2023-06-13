
const host = import.meta.env.VITE_APP_CMS;
/**
 * blog list
 * @param { BlogCategoryId}
 * @returns
 */
export function getWeblogList(request, params) {
  return request({
    url: '/api/cms/blog-post/blog-list',
    method: 'GET',
    params,
  });
}

/**
 *
 * @param id
 * @returns
 */
export function getWeblogById(request, params) {
  return request({
    url: `/api/cms/blog-post/${params}`,
    method: 'GET',
  });
}
