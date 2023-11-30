// axios配置  可自行根据项目进行更改，只需更改该文件即可，其他文件可以不动
// The axios configuration can be changed according to the project, just change the file, other files can be left unchanged

import type { AxiosResponse } from 'axios';
import type { ICommonResModel, RequestOptions, Result } from '#/axios';
import type { AxiosTransform, CreateAxiosOptions } from './axiosTransform';
import { VAxios } from './Axios';
import { checkStatus } from './checkStatus';
import { useMessage } from 'lead-lib/hooks/useMessage';
import { RequestEnum, ResultEnum, ContentTypeEnum, ConfigEnum, ContentLanguageTypeEnum } from 'lead-lib/enum/httpEnum'
import { isString } from 'lead-lib/utils/is'

import { setObjToUrlParams, deepMerge } from 'lead-lib/utils'
import { useI18n } from 'lead-lib/hooks/useI18n'
import { joinTimestamp, formatRequestDate } from './helper';
import { useUserStore } from 'lead-lib/store/user';
import { useAppStore } from 'lead-lib/store/app'
import i18n from 'lead-lib/i18n'
// # 接口前缀
const urlPrefix = '';
const { createMessage, createErrorModal } = useMessage();

/**
 * @description: 数据处理，方便区分多种处理方式
 */
const transform: AxiosTransform = {
  /**
   * @description: 处理请求数据。如果数据不是预期格式，可直接抛出错误
   */
  transformRequestHook: (res: AxiosResponse<Result>, options: RequestOptions) => {
    const { t } = useI18n()
    // const { t } = i18n.global
    const { isTransformResponse, isReturnNativeResponse, convertResponseData } = options
    // 是否返回原生响应头 比如：需要获取响应头时使用该属性
    if (isReturnNativeResponse) {
      return res
    }
    // 不进行任何处理，直接返回
    // 用于页面代码可能需要直接获取code，data，message这些信息时开启
    if (!isTransformResponse) {
      return res.data
    }
    // 错误的时候返回
    if (!res.data) {
      // return '[HTTP] Request has no return value';
      throw new Error(t('sys.api.apiRequestFailed'))
    }
    //  这里 code，data，message为 后台统一的字段，需要在 types.ts内修改为项目自己的接口返回格式
    let commonRes: ICommonResModel = res.data as ICommonResModel
    if (convertResponseData) {
      commonRes = convertResponseData(res.data)
    }
    const { code, data, message } = commonRes
    // 这里逻辑可以根据项目进行修改  
    // data 可能为空
    const hasSuccess = (code === 0 || code === '0') && (res.status === ResultEnum.SUCCESS_204 || res.status === ResultEnum.SUCCESS_200)
    if (hasSuccess) {
      if (message && options.successMessageMode === 'success') {
        //信息成功提示
        createMessage.success(message)
      }
      return data
    }

    // 在此处根据自己项目的实际情况对不同的code执行不同的操作
    // 如果不希望中断当前请求，请return数据，否则直接抛出异常即可
    let timeoutMsg = ''
    const store = useUserStore()
    switch (code) {
      case ResultEnum.TIMEOUT:
        timeoutMsg = t('sys.api.timeoutMessage')
        store.logoutAndJump(false)
        break
      default:
        if (message) {
          timeoutMsg = message
        }
    }

    // errorMessageMode=‘modal’的时候会显示modal错误弹窗，而不是消息提示，用于一些比较重要的错误
    // errorMessageMode='none' 一般是调用时明确表示不希望自动弹出错误提示
    const errorMsg = timeoutMsg || t('sys.api.apiRequestFailed')
    if (options.errorMessageMode === 'modal') {
      createErrorModal({ title: t('sys.api.errorTip'), content: timeoutMsg })
    } else if (options.errorMessageMode === 'message') {
      createMessage.error(errorMsg)
    }

    throw new Error(timeoutMsg || t('sys.api.apiRequestFailed'))
  },

  // 请求之前处理config
  beforeRequestHook: (config, options) => {
    const { apiUrl, joinPrefix, joinParamsToUrl, formatDate, joinTime = true, urlPrefix } = options;

    if (joinPrefix) {
      config.url = `${urlPrefix}${config.url}`;
    }

    if (apiUrl && isString(apiUrl)) {
      config.url = `${apiUrl}${config.url}`;
    }
    const params = config.params || {};
    const data = config.data || false;
    formatDate && data && !isString(data) && formatRequestDate(data);
    if (config.method?.toUpperCase() === RequestEnum.GET) {
      if (!isString(params)) {
        // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
        config.params = Object.assign(params || {}, joinTimestamp(joinTime, false));
      } else {
        // 兼容restful风格
        config.url = config.url + params + `${joinTimestamp(joinTime, true)}`;
        config.params = undefined;
      }
    } else {
      if (!isString(params)) {
        formatDate && formatRequestDate(params);
        if (Reflect.has(config, 'data') && config.data && Object.keys(config.data).length > 0) {
          config.data = data;
          config.params = params;
        } else {
          // 非GET请求如果没有提供data，则将params视为data
          config.data = params;
          config.params = undefined;
        }
        if (joinParamsToUrl) {
          config.url = setObjToUrlParams(config.url as string, Object.assign({}, config.params, config.data));
        }
      } else {
        // 兼容restful风格
        config.url = config.url + params;
        config.params = undefined;
      }
    }
    return config;
  },

  /**
   * @description: 请求拦截器处理
   */
  requestInterceptors: (config: Recordable, options) => {
    const store = useUserStore()
    // 请求之前处理config
    const token = store.getToken()
    const tenantId = store.getTenantId()
    const appStore = useAppStore()
    const {
      authenticationScheme,
      requestOptions: { contentLanguageType }
    } = options
    // 设置语言 
    // config.headers[ConfigEnum.LANGUAGE] = appStore.lang
    config.headers[ConfigEnum.LANGUAGE] =
      contentLanguageType == ContentLanguageTypeEnum.CULTURE
        ? `App.Culture=c&3D${appStore.lang}|uic&3D${appStore.lang};`
        : appStore.lang
    
    // 增加vue3标记
    config.headers[ConfigEnum.VERSION] = 'v3'
    if (token && (config as Recordable)?.requestOptions?.withToken !== false) {
      // jwt token
      config.headers.Authorization =authenticationScheme
        ? `${authenticationScheme} ${token}`
        : token
      config.headers[ConfigEnum.TOKEN] = token
      config.headers[ConfigEnum.TENANT_ID] = tenantId || 0
    }
    return config
  },

  /**
   * @description: 响应拦截器处理
   */
  responseInterceptors: (res: AxiosResponse<any>) => {
    return res;
  },

  /**
   * @description: 响应错误处理
   */
  responseInterceptorsCatch: (error: any) => {
    const { t } = useI18n();
    // 错误日志处理
    // const errorLogStore = useErrorLogStoreWithOut();
    // errorLogStore.addAjaxErrorInfo(error);
    const { response, code, message, config } = error || {};
    const errorMessageMode = config?.requestOptions?.errorMessageMode || 'none';
    //scott 20211022 token失效提示信息
    //const msg: string = response?.data?.error?.message ?? '';
    const msg: string = response?.data?.message ?? '';
    const err: string = error?.toString?.() ?? '';
    let errMessage = '';

    try {
      if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
        errMessage = t('sys.api.apiTimeoutMessage');
      }
      if (err?.includes('Network Error')) {
        errMessage = t('sys.api.networkExceptionMsg');
      }

      if (errMessage) {
        if (errorMessageMode === 'modal') {
          createErrorModal({ title: t('sys.api.errorTip'), content: errMessage });
        } else if (errorMessageMode === 'message') {
          createMessage.error(errMessage);
        }
        return Promise.reject(error);
      }
    } catch (error) {
      throw new Error(error);
    }
    checkStatus(error?.response?.status, msg, errorMessageMode);
    return Promise.reject(error);
  },
};

export function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new VAxios(
    deepMerge(
      {
        // See https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#authentication_schemes
        // authentication schemes，e.g: Bearer
        // authenticationScheme: 'Bearer',
        authenticationScheme: '',
        timeout: 10 * 1000,
        // 基础接口地址
        // baseURL: globSetting.apiUrl,
        headers: { 'Content-Type': ContentTypeEnum.JSON },
        // 如果是form-data格式
        // headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
        // 数据处理方式
        transform,
        // 配置项，下面的选项都可以在独立的接口请求中覆盖
        requestOptions: {
          // 默认将prefix 添加到url
          joinPrefix: true,
          // 是否返回原生响应头 比如：需要获取响应头时使用该属性
          isReturnNativeResponse: false,
          // 需要对返回数据进行处理
          isTransformResponse: true,
          // post请求的时候添加参数到url
          joinParamsToUrl: false,
          // 格式化提交参数时间
          formatDate: true,
          // 异常消息提示类型
          errorMessageMode: 'message',
          // 成功消息提示类型
          successMessageMode: 'none',
          // 接口地址
          // apiUrl: globSetting.apiUrl,
          // 接口拼接地址
          urlPrefix: urlPrefix,
          //  是否加入时间戳
          joinTime: true,
          // 忽略重复请求
          ignoreCancelToken: true,
          // 是否携带token
          withToken: true,
          // 消息头Content-Language 的模式
          contentLanguageType: ContentLanguageTypeEnum.VALUE,
        }
      },
      opt || {}
    )
  )
}
export const defHttp = createAxios();

// other api url
// export const otherHttp = createAxios({
//   requestOptions: {
//     apiUrl: 'xxx',
//   },
// });
