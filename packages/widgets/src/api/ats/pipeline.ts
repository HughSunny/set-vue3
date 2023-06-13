import { stringify } from 'qs';
import { convertPageRequestParam } from '@/utils/helper';
const apiHeader = '/api/careers'
export function getPipelineList(params, request) {
  return request(`${apiHeader}/candidate/candidate-list`, {
    method: 'GET',
    params: convertPageRequestParam(params, 'current'),
    token: true,
  });
}

export function applyJob(params, request) {
  return request(`${apiHeader}/candidate/apply-job`, {
    method: 'POST',
    data: {
      ...params,
    },
    token: true,
  });
}
