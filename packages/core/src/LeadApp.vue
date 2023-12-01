<template>
  <AntdApp></AntdApp>
</template>

<script setup lang="ts" name="App">
import { AntdApp } from '@core/components';
import { onBeforeMount, onMounted } from 'vue';
import { getInitRouteOptions } from '@core/router/route';
import { AppConfig } from '@core/bo/app-config';
import { UserInfo } from '@core/bo/userInfo';
import type { FnInitSysConfig, ISysInit } from '@core/interface/ILeadFrame';
import { useAppStore, useConfigStore } from './store';
import { IndustryOption } from './app-option';

const { onInitConfig, onGetConfig } = getInitRouteOptions();
onBeforeMount(() => {
  // console.log('App onBeforeMount -----------------------------------------------')
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

  UserInfo.userCode = AppConfig.userCode;
  UserInfo.sessionId = AppConfig.token;
  UserInfo.userName = AppConfig.userName;

  const appStore = useAppStore();
  appStore.setLanguageList(initConfig.languageList || []);
  // console.log('App onBeforeMount -----------------------------------------------done')
});

onMounted(async () => {
  // console.log('App onMounted -----------------------------------------------')
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
  console.log('App onMounted -----------------------------------------------done');
});
</script>

<style lang="less" scoped></style>
