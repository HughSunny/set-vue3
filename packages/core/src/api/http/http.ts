import { createAxios } from '@core/api/http/axios';
import { ContentLanguageTypeEnum, ContentTypeEnum } from '@core/enum/httpEnum';
import { AppConfig } from '@core/bo';
//工业平台 的axios // baseURL: 'http://10.30.121.131:5000',
const http = createAxios({
  baseURL: AppConfig.baseUrl,
  headers: { 'Content-Type': ContentTypeEnum.JSON },
  authenticationScheme: 'Bearer',
  requestOptions: {
    apiUrl: AppConfig.baseUrl,
    // contentLanguageType: ContentLanguageTypeEnum.CULTURE
  },
});

export default http;
