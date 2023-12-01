import { createApp } from 'vue';
import antd from 'ant-design-vue';
import XdcWidgets from '@xdc/widgets';
import { setupRouter } from '@/router';
import { setupStore } from '@/store';
import App from './App.vue';

import 'uno.css';
import 'viewerjs/dist/viewer.css';
import 'ant-design-vue/dist/reset.css';
import './global.less';

const app = createApp(App);
const registerComponents = app => {
  app.use(antd);
  app.use(XdcWidgets, { uploadLibrary: 'File' });
};

registerComponents(app);

// 初始化 pinia
setupStore(app);

// 初始化路由
setupRouter(app);

// 挂载
app.mount('#app');
