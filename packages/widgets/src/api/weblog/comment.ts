
const host = import.meta.env.VITE_APP_CMS;
/**
 * blog list
 * @param { BlogCategoryId}
 * @returns
 */
export function getBlogCommentList(request, params) {
  return request({
    url: '/api/cms/blog-comment-public',
    method: 'GET',
    params,
    token: true,
  });
}

/**
 *
 * @param id
 * @returns
 */
export function getBlogCommentById(request, id) {
  return request({
    url: `/api/cms/blog-comment-public/${id}`,
    method: 'GET',
    token: true,
  });
}

/**
 * 新建WeblogPost
 * @param params
 */
export function createBlogComment(request, params) {
  return request({
    url: `/api/cms/blog-comment-public`,
    method: 'POST',
    data: params,
    token: true,
  });
}
