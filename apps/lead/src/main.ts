import { createApp } from 'vue';
// antd
import Antd from 'ant-design-vue';
import VueViewer from 'v-viewer';
import * as Icons from '@ant-design/icons-vue';
import { createFromIconfontCN } from '@ant-design/icons-vue';
import XdcCore, { AppConfig, initAppOptions, useI18n } from '@xdc/core';
import XdcWidgets, { InitWidgetOptions } from '@xdc/widgets';
import { uploadFile } from '@/api/services/file';
import { setupRouter } from '@/router';
import { setupStore } from '@/store';
import App from './App.vue';
import { getInitConfig } from './init';

import 'uno.css';
import 'ant-design-vue/dist/reset.css';
import 'nprogress/nprogress.css'; // progress bar style
import '@xdc/widgets/dist/style.css';
import '@xdc/core/dist/style.css';
import '@xdc/core/dist/src/index.less';
// viewerjs
import 'viewerjs/dist/viewer.css';
import './global.less';

const app = createApp(App);

const registerComponents = app => {
  // const IconFont = createFromIconfontCN({
  //   scriptUrl: 'low_code/iconfont/iconfont.js',
  // });
  // app.component('icon-font', IconFont);
  // 注册 @ant-design/icons
  for (const i in Icons) {
    app.component(i);
    const icon = (Icons as any)[i];
    app.component(i, icon);
  }
  const widgetOption: InitWidgetOptions = {
    useI18nHook: useI18n,
    uploadRequest: uploadFile,
    uploadLibrary: AppConfig.uploadLibrary,
  };

  app.use(Antd);
  app.use(VueViewer);
  app.use(XdcWidgets, widgetOption);
  app.use(XdcCore);

};
// 初始化 pinia
setupStore(app);
// 注册 组件
registerComponents(app);

// 初始化路由
setupRouter(app);
/* 全局注册 */
// 如果需要用http请求，那么就在这边全局注入http
// app.config.globalProperties.$http = http
app.config.globalProperties.$antIcons = Icons;

//初始化应用
initAppOptions(getInitConfig());
// 挂载
app.mount('#app');
