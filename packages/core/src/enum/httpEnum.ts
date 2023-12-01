/**
 * @description: Request result set
 */
export enum ResultEnum {
  SUCCESS_200 = 200,
  SUCCESS_204 = 204,
  ERROR = 1,
  TIMEOUT = 401,
  TYPE = 'success'
}

export enum SessionTimeoutProcessingEnum {
  ROUTE_JUMP,
  PAGE_COVERAGE
}

export enum ContentLanguageTypeEnum {
  VALUE = 'VALUE',
  CULTURE = 'CULTURE'
}

/**
 * @description: request method
 */
export enum RequestEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

/**
 * @description:  contentTyp
 */
export enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // form-data qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data  upload
  FORM_DATA = 'multipart/form-data;charset=UTF-8',
}

/**
 * 请求header
 * @description:  contentTyp
 */
export enum ConfigEnum {
  // TOKEN
  TOKEN = 'X-Access-Token',
  // TIMESTAMP
  TIMESTAMP = 'X-TIMESTAMP',
  // Sign
  Sign = 'X-Sign',
  // 租户id
  TENANT_ID = 'X-Tenant-Id',
  // 版本
  VERSION = 'X-Version',
  // 低代码应用ID
  X_LOW_APP_ID = 'X-Low-App-ID',
  // 语言
  LANGUAGE='Content-Language',

  // 工业中语言设置
  COOKIE='Cookie',
}
