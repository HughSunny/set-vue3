import { createApp } from 'vue';
// antd
import Antd from 'ant-design-vue';
import VueViewer from 'v-viewer';
import * as Icons from '@ant-design/icons-vue';
import { createFromIconfontCN } from '@ant-design/icons-vue';
import XdcCore from '@xdc/core';
import XdcWidgets from '@xdc/widgets';
import { setupRouter } from '@/router';
import { setupStore } from '@/store';
import App from './App.vue';

import 'uno.css';
import 'ant-design-vue/dist/reset.css';
import '@xdc/core/dist/style.css';
import '@xdc/widgets/dist/style.css';
// viewerjs
import 'viewerjs/dist/viewer.css';
import './global.less';

const app = createApp(App);
// 初始化 pinia
setupStore(app);

const registerComponents = app => {
  // const IconFont = createFromIconfontCN({
  //   scriptUrl: 'low_code/iconfont/iconfont.js',
  // });
  // app.component('icon-font', IconFont);
  // 注册 组件
  for (const i in Icons) {
    app.component(i);
    const icon = (Icons as any)[i];
    app.component(i, icon);
  }

  app.use(Antd);
  app.use(VueViewer);
  app.use(XdcWidgets);
  app.use(XdcCore);
};

registerComponents(app);

// 初始化路由
setupRouter(app);

/* 全局注册 */
// 如果需要用http请求，那么就在这边全局注入http
// app.config.globalProperties.$http = http

app.config.globalProperties.$antIcons = Icons;

// 挂载
app.mount('#app');
