<template>
  <AntdApp></AntdApp>
</template>

<script setup lang="ts" name="LeadApp">
defineOptions({ name: 'LeadApp' });
import { onBeforeMount, onMounted } from 'vue';
import { getSystemInitOptions } from '@core/app';
import { AppConfig } from '@core/bo';
import type { ISysInit } from '@core/interface/ILeadFrame';
import { useAppStore, useConfigStore } from '@core/store';
import { IndustryOption } from './app-option';
const { onInitConfig } = getSystemInitOptions();
let initConfig: ISysInit = {} as ISysInit;
if (onInitConfig) {
  //如果存在钩子，则执行钩子
  initConfig = onInitConfig();
} else {
  // 工业逻辑
  initConfig = IndustryOption.onInitConfig();
}
const configStore = useConfigStore();
configStore.setConfig(initConfig);

const appStore = useAppStore();
appStore.setLanguageList(initConfig.languageList || []);

// console.warn('App Setup -----------------------------------------------');
onBeforeMount(async () => {
  // console.warn('App onBeforeMount -----------------------------------------------');
  const { onGetConfig } = getSystemInitOptions();
  let config: Partial<ISysInit> = {};

  if (onGetConfig) {
    //如果存在钩子，则执行钩子 更新配置
    config = await onGetConfig();
  } else {
    // 工业逻辑
    config = await IndustryOption.onGetConfig();
  }
  const configStore = useConfigStore();
  configStore.setConfig(config);
  console.warn('App onBeforeMount -----------------------------------------------done');
});

onMounted(async () => {
  console.warn('App onMounted -----------------------------------------------');
  // console.warn('App onMounted -----------------------------------------------done');
});
</script>
