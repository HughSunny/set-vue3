/**
 * blog list
 * @param { BlogCategoryId}
 * @returns
 */
export function getNewsList(request, params) {
  return request({
    url: '/api/cms/blog-post/news-list',
    method: 'GET',
    params,
  });
}

/**
 *
 * @param id
 * @returns
 */
export function getNewsById(request, params) {
  return request({
    url: `/api/cms/blog-post/${params}`,
    method: 'GET',
  });
}
