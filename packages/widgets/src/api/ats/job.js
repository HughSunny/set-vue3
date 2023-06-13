
const apiHeader = '/api/careers'

/**
 *
 * @param params
 * SiteId
 * Keywords
 * DepartmentId
 * CityId
 * LocationId
 * SkipCount
 * MaxResultCount
 * @returns
 */
export function getJobList(params, request) {
  return request({
    url: `${apiHeader}/job/relation-job-list`,
    method: 'GET',
    params,
    // host: atsHost,
  });
}

/**
 * 获取职位详情
 * @param id
 * @returns
 */
export function getJobDetail(params, request) {
  return request({
    url: `${apiHeader}/job/job-detail`,
    method: 'GET',
    params,
  });
}
