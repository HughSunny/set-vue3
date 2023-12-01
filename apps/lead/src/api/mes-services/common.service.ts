import http from '@/api/http-mes';
import { AppConfig } from '@xdc/core';

// function getHttp() {
//   return http1
// }

// const http = getHttp()

function getUrl(service: string) {
  return '/' + AppConfig.config.commonServiceUrl + '/' + service;
}
// 语言列表
export async function getLanguageList() {
  const url = getUrl('GetLanguageList');
  return http.get({ url });
}

/**
 * 获取数据库，redis运行状态
 */
export async function getServiceStatus() {
  const url = getUrl('GetServiceStatus');
  return http.get({ url });
}

export async function getLanguageResources(lang) {
  const url = getUrl(`GetLanguageResources/${lang}.json`);
  return http.get({ url });
}
