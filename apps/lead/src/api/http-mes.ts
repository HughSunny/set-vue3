import { AppConfig, ContentTypeEnum, createAxios } from '@xdc/core';

// import { createAxios } from 'lead-lib/api/http/axios'
// import { ContentTypeEnum } from 'lead-lib/enum/httpEnum'
// import { AppConfig } from 'lead-lib/bo'
const defaultConfig = {
  baseURL: AppConfig.baseUrl,
  headers: { 'Content-Type': ContentTypeEnum.JSON },
  requestOptions: {
    apiUrl: AppConfig.baseUrl,
    isTransformResponse: false, // 如果是工业平台不需要转换数据
  },
};
// MES 新版本的axios
const http = createAxios(defaultConfig);

export default http;
