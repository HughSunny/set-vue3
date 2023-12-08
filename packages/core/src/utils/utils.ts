import { cloneDeep, groupBy, without } from 'lodash-es';
import { isObject } from '@core/utils/is';
/**
 * * 判断是否是开发环境
 * @return { Boolean }
 */
export const isDev = () => {
  return import.meta.env.DEV;
};
/**
 * 将字符串中的中文url-encode处理
 * @param str
 * @returns
 */
export const urlEncodeChineseChars = str => {
  // 定义一个正则表达式,用于匹配中文字符
  const regex = /[\u4e00-\u9fa5]/g;

  // 使用 replace() 方法将字符串中的中文字符替换为对应的 URL 编码格式字符
  const urlencodedStr = str.replace(regex, function (char) {
    // 将字节序列转换为 URL 编码格式
    const encodeStr = encodeURIComponent(char);

    // 返回 URL 编码格式字符串
    return encodeStr;
  });

  // 返回 URL 编码格式字符串
  return urlencodedStr;
};

/**
 * * 生成一个不重复的ID
 * @param { Number } randomLength
 */
export const getUUID = (randomLength = 10) => {
  return Number(Math.random().toString().substring(2, randomLength) + Date.now()).toString(36);
};

/**
 * Add the object as a parameter to the URL
 * @param baseUrl url
 * @param obj
 * @returns {string}
 * eg:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 */
export function setObjToUrlParams(baseUrl: string, obj: any): string {
  let parameters = '';
  for (const key in obj) {
    parameters += key + '=' + encodeURIComponent(obj[key]) + '&';
  }
  parameters = parameters.replace(/&$/, '');
  return /\?$/.test(baseUrl) ? baseUrl + parameters : baseUrl.replace(/\/?$/, '?') + parameters;
}

/**
 * * 判断是否是 mac
 * @returns boolean
 */
export const isMac = () => {
  return /macintosh|mac os x/i.test(navigator.userAgent);
};

/**
 * * file转url
 */
export const fileToUrl = (file: File): string => {
  const Url = URL || window.URL || window.webkitURL;
  const ImageUrl = Url.createObjectURL(file);
  return ImageUrl;
};

/**
 * * file转base64
 */
export const fileTobase64 = (file: File, callback: Function) => {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function (e: ProgressEvent<FileReader>) {
    if (e.target) {
      let base64 = e.target.result;
      callback(base64);
    }
  };
};

/**
 * * JSON序列化，支持函数和 undefined
 * @param data
 */
export const JSONStringify = <T>(data: T) => {
  return JSON.stringify(
    data,
    (key, val) => {
      // 处理函数丢失问题
      if (typeof val === 'function') {
        return `${val}`;
      }
      // 处理 undefined 丢失问题
      if (typeof val === 'undefined') {
        return null;
      }
      return val;
    },
    2,
  );
};

export const evalFn = (fn: string) => {
  var Fun = Function; // 一个变量指向Function，防止前端编译工具报错
  return new Fun('return ' + fn)();
};

/**
 * * JSON反序列化，支持函数和 undefined
 * @param data
 */
export const JSONParse = (data: string) => {
  return JSON.parse(data, (k, v) => {
    // // 过滤函数字符串
    // if (excludeParseEventKeyList.includes(k)) return v
    // // 过滤函数值表达式
    // if (typeof v === 'string') {
    //   const someValue = excludeParseEventValueList.some(excludeValue => v.indexOf(excludeValue) > -1)
    //   if (someValue) return v
    // }
    // 还原函数值
    if (
      typeof v === 'string' &&
      v.indexOf &&
      (v.indexOf('function') > -1 || v.indexOf('=>') > -1)
    ) {
      return evalFn(`(function(){return ${v}})()`);
    } else if (typeof v === 'string' && v.indexOf && v.indexOf('return ') > -1) {
      const baseLeftIndex = v.indexOf('(');
      if (baseLeftIndex > -1) {
        const newFn = `function ${v.substring(baseLeftIndex)}`;
        return evalFn(`(function(){return ${newFn}})()`);
      }
    }
    return v;
  });
};

/**
 * * 修改顶部标题
 * @param title
 */
export const setTitle = (title?: string) => {
  title && (document.title = title);
};

export function convertKeyCamelCase(obj) {
  if (!obj) {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map(xx => {
      return convertKeyCamelCase(xx);
    });
  } else if (typeof obj === 'object') {
    const newObj = {};
    for (const key in obj) {
      // 判断key是否是这个对象的
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        // 全局匹配下划线 然后转换为大写字母
        // let newKey = key.replace(/_([a-z])/g, (res) => res[1].toUpperCase())
        const newKey = `${key.substring(0, 1).toLowerCase()}${key.substring(1)}`;
        // 递归
        newObj[newKey] = convertKeyCamelCase(obj[key]);
      }
    }
    return newObj;
  }
  return obj;
}
