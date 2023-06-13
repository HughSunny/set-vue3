
import { stringify } from 'qs';
const apiHeader = '/api/careers'
/**
 *
 * @param {guid} id
 * 简历Id
 */
export function getResumeAllInfoById(id, request) {
  return request({
    url: `${apiHeader}/resume/resume-all-info-by-id?${stringify({ id })}`,
    method: 'GET',
    token: true,
  });
}



export function createResumeItem(type, data, request) {
  return request({
    url: `${apiHeader}/resume${type === 'Resume' || type === 'resume' ? '' : '/' + type}`,
    method: 'POST',
    data,
    token: true,
  });
}

export function saveResumeItems(type, resumeId, data, request) {
  return request({
    url: `${apiHeader}/resume/save-${type}/${resumeId}`,
    method: 'POST',
    data,
    token: true,
  });
}

export function updateResumeItem(type, data, request) {
  return request({
    url: `${apiHeader}/resume/${data.id}${type === 'Resume' || type === 'resume' ? '' : '/' + type}`,
    method: 'PUT',
    data,
    token: true,
  });
}

export function removeResumeItem(type, data, request) {
  return request({
    url: `${apiHeader}/resume/${data.id}/${type}`,
    method: 'DELETE',
    data,
    token: true,
  });
}

export function getResumeItemById(type, data, request) {
  return request({
    url: `${apiHeader}/resume/${data.id}/${type}`,
    method: 'GET',
    data,
    token: true,
  });
}

export function getResumeById(id, request) {
  return request({
    url: `${apiHeader}/resume/${id}`,
    method: 'GET',
    token: true,
  });
}

export function getUserInfo(request) {
  return request({
    url: `${apiHeader}/resume/user-info`,
    token: true
  });
}


