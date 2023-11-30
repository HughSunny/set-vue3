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
// 页面级别的APP 
import { useI18n } from 'vue-i18n';
import { computed, provide, ref, watch} from 'vue';
import { legacyLogicalPropertiesTransformer, theme as antdTheme } from 'ant-design-vue';
import type { ConfigProviderProps } from 'ant-design-vue';
import { useRoute } from 'vue-router';
import { STORAGE_LANG_KEY, useAppStore } from 'lead-lib/store/app';
import { localStorage } from 'lead-lib/utils/local-storage';
import useMediaQuery from 'lead-lib/hooks/useMediaQuery';
import useMenuState, { MenuStateSymbol } from 'lead-lib/hooks/useMenuState';
import SiteToken from 'lead-lib/home/site-token';
import { useMultiTabStateProvider } from 'lead-lib/home/multi-tab';
import { defaultLang } from 'lead-lib/i18n';
import { useUserStore } from 'lead-lib/store/user';

const i18n = useI18n();
const appStore = useAppStore();
const userStore = useUserStore();
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
const lang = localStorage.get(STORAGE_LANG_KEY, defaultLang);
if (lang) {
  appStore.SET_LANG(lang);
}
const themeConfig = computed(() => {
  return {
    algorithm: [antdTheme.defaultAlgorithm ],
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