<template>
  <a-style-provider
    :hash-priority="hashPriority"
    :transformers="[legacyLogicalPropertiesTransformer]"
  >
    <a-config-provider :locale="locale" :theme="themeConfig">
      <site-token>
        <router-view />
      </site-token>
    </a-config-provider>
  </a-style-provider>
</template>

<script lang="ts" setup name="Antd-Pro-App">
defineOptions({
  name: 'AntdApp',
});
// 页面级别的APP
import { useI18n } from 'vue-i18n';
import { computed, provide, ref, watch } from 'vue';
import { legacyLogicalPropertiesTransformer, theme as antdTheme } from 'ant-design-vue';
import type { ConfigProviderProps } from 'ant-design-vue';
import { useRoute } from 'vue-router';
import { getActivePinia } from 'pinia';
import { STORAGE_LANG_KEY, useAppStore } from '@core/store';
import { getLocalStorage } from '@core/utils/storage';
import useMediaQuery from '@core/hooks/useMediaQuery';
import useMenuState, { MenuStateSymbol } from '@core/hooks/useMenuState';
import SiteToken from '@core/home/site-token';
import { getSystemInitOptions } from '@core/router/route';
import { useMultiTabStateProvider } from '@core/home/multi-tab';
import { defaultLang } from '@core/locale';
const i18n = useI18n();
const { store } = getSystemInitOptions();

console.warn('AntdApp Setup -----------------------------------------------remote store', store);
console.warn(
  'AntdApp Setup -----------------------------------------------remote ActivePinia',
  getActivePinia(),
);
const appStore = useAppStore();
const multiTabState = useMultiTabStateProvider({});
const colSize = useMediaQuery();
const isMobile = computed(() => colSize.value === 'sm' || colSize.value === 'xs');
const menuState = useMenuState(
  {
    collapsed: isMobile.value,
    openKeys: [] as string[],
    selectedKeys: [] as string[],
    isMobile,
  },
  multiTabState,
);
const route = useRoute();
watch(
  () => route.name,
  () => {
    if (!route.name || route.name === 'login' || route.name === 'register') {
      return;
    }
    if (isMobile.value) {
      return;
    }
  },
  { immediate: true },
);
// 语言设置
const lang = getLocalStorage(STORAGE_LANG_KEY) || defaultLang;
if (lang) {
  appStore.SET_LANG(lang);
}
const themeConfig = computed(() => {
  return {
    algorithm: [antdTheme.defaultAlgorithm],
    token: { colorPrimary: appStore.primaryColor, colorInfo: appStore.primaryColor },
  };
});
const theme = computed(() => appStore.navTheme);
document.getElementsByTagName('html')[0].setAttribute('data-pro-theme', 'antdv-pro-theme-light');
const hashPriority = ref('high' as const);
watch(hashPriority, () => {
  location.reload();
});
provide('isMobile', isMobile);

provide(MenuStateSymbol, menuState);
const locale = computed(() => {
  return i18n.getLocaleMessage(i18n.locale.value).antd as ConfigProviderProps['locale'];
});
</script>
