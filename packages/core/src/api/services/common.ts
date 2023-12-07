import http from '@core/api/http/http';
import { AppConfig } from '@core/bo';
enum Api {
  languageResource = '/Assets/I18n',
}
function getLanguageUrl(service?: string) {
  return AppConfig.config.i18nServiceUrl
    ? AppConfig.config.i18nServiceUrl + '/' + (service || '')
    : '';
}
/**
 * 获取多语言资源
 * @param lang
 * @returns
 */
export async function getLanguageResources(lang) {
  const url = getLanguageUrl(`${lang}.json`);
  if (url) {
    return http.get(
      { url },
      {
        isTransformResponse: false,
      },
    );
  }
  return Promise.resolve({});
}

// 语言列表
export async function getLanguageList() {
  const url = getLanguageUrl('supportedCultures.json');
  return http.get(
    { url },
    {
      isTransformResponse: false,
    },
  );
}
