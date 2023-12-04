import { createAxios, ContentTypeEnum } from '@xdc/core';
const baseUrl = 'http://10.30.123.132';
//工业平台 的axios
const http = createAxios({
  // baseURL: AppConfig.mdmUrl,
  baseURL: baseUrl,
  headers: { 'Content-Type': ContentTypeEnum.JSON },
  authenticationScheme: 'Bearer',
  requestOptions: {
    apiUrl: baseUrl,
  },
});

export default http;
