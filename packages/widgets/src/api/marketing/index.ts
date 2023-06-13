export function postInquiry(params, request) {
  return request({
    url: `/api/marketing/inquiry`,
    method: 'POST',
    data: params,
    token: true
  });
}

export function postReview(params, request) {
  return request({
    url: `/api/marketing/product-review`,
    method: 'POST',
    data: params,
    token: true
  });
}

/**
 * @param ProductName:string,
 * @param ProductCode:string,
 * @param CategoryId:string,
 * @param SkipCount:integer,
 * @param MaxResultCount:integer,*/

export function getProduct(params, request) {
  return request({
    url: `/api/marketing/product`,
    method: 'GET',
    params
  });
}

/**
 *
 * @param id
 * @param request
 * @returns
 */
export function getProductById(id, request) {
  return request({
    url: `/api/marketing/product/${id}`,
    method: 'GET'
  });
}

/**
 *
 * @param ParentCategoryId
 * @param SkipCount
 * @param MaxResultCount
 */
export function getProductCategory(params, request) {
  return request({
    url: `/api/marketing/category`,
    method: 'GET',
    params
  });
}

/**
 *
 * @param id
 * @param request
 * @returns
 */
export function getProductCategoryById(id, request) {
  return request({
    url: `/api/marketing/category/${id}`,
    method: 'GET'
  });
}

/**
 *
 * @param SkipCount
 * @param MaxResultCount
 */
export function getProductAttribute(params, request) {
  return request({
    url: `/api/marketing/product/product-attribute`,
    method: 'GET',
    params
  });
}

/**
 *
 * @param id
 * @param request
 * @returns
 */
export function getProductAttributeById(id, request) {
  return request({
    url: `/api/marketing/product/product-attribute/${id}`,
    method: 'GET'
  });
}

/**
 *
 * @param ProductId
 * @param SkipCount
 * @param MaxResultCount
 */
export function getProductImage(params, request) {
  return request({
    url: `/api/marketing/product/product-image`,
    method: 'GET',
    params
  });
}

/**
 *
 * @param id
 * @param request
 * @returns
 */
export function getProductImageById(id, request) {
  return request({
    url: `/api/marketing/product/product-image/${id}`,
    method: 'GET'
  });
}
