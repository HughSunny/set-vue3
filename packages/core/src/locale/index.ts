import { ref } from 'vue';
import { createI18n } from 'vue-i18n';
import { getLanguageResources } from '@core/api';
import { AppConfig } from '@core/bo/app-config';
import dayjs from 'dayjs';
import defaultLangValue from './lang/zh-CN';

export const defaultLang = AppConfig.lang; // 'zh' / 'zh-CN'
export const defaultLocale = 'zh-CN';
export const i18nLocaleMap = {
  zh: 'zh-CN',
  en: 'en-US',
  cht: 'zh-TW',
  jp: 'ja-JP',
};
const loadedLanguages = ref([defaultLocale]);
const i18n = createI18n({
  legacy: false,
  missingWarn: false,
  fallbackWarn: false,
  locale: defaultLocale,
  fallbackLocale: defaultLocale,
  messages: {
    [defaultLocale]: defaultLangValue as any,
  },
  silentTranslationWarn: true,
});
dayjs.locale(defaultLangValue.dayjs);

function setI18nLanguage(lang) {
  i18n.global.locale.value = lang;
  // request.headers['Accept-Language'] = lang
  const HTML = document.querySelector('html');
  HTML && HTML.setAttribute('lang', lang);
  return lang;
}

export const loadCoreLanguageModule = lang => {
  const files = import.meta.glob('./lang/*.ts', { eager: true });
  const keys = Object.keys(files);
  for (let i = 0; i < keys.length; i++) {
    const filePath = keys[i];
    const fileName = filePath.split('/').pop();
    const name = fileName?.replace(/\.\/|\.ts/g, '');
    if (name === lang) {
      return files[filePath]?.default
    }
  }
  return {};
};

const loadExtraLanguage = lang => {
  return AppConfig.localLanguages[lang] || {};
};
export function loadLanguageAsync(lang = defaultLang): Promise<string> {
  return new Promise<string>(resolve => {
    const currentLocale = i18n.global;
    const locale = i18nLocaleMap[lang] || lang;
    if (!loadedLanguages.value.includes(locale)) {
      const core = loadCoreLanguageModule(locale);
      const extra = loadExtraLanguage(locale);
      if (AppConfig.config.i18nServiceUrl) {
        getLanguageResources(lang).then(ret => {
          const loadedLang = { ...core, ...ret, ...extra };
          // set vue-i18n lang
          currentLocale.setLocaleMessage(locale, loadedLang);
          // set dayjs lang
          dayjs.locale(loadedLang.dayjsLocaleName);
          // save loaded
          loadedLanguages.value.push(locale);
          return resolve(setI18nLanguage(locale));
        });
        return;
      } else {
        const loadedLang = { ...core, ...extra };
        // set vue-i18n lang
        currentLocale.setLocaleMessage(locale, loadedLang);
        // set dayjs lang
        dayjs.locale(loadedLang.dayjsLocaleName);
        // save loaded
        loadedLanguages.value.push(locale);
        return resolve(setI18nLanguage(locale));
      }
    }

    return resolve(setI18nLanguage(locale));
    // resolve(lang)
  });
}

export const _t = i18n.global.t;
export default i18n;
