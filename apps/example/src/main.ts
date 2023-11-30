
import 'viewerjs/dist/viewer.css';
import 'ant-design-vue/dist/reset.css';
import antd from 'ant-design-vue';
import { createApp } from 'vue';
import { setupRouter } from '@/router';
import { setupStore } from '@/store';
import XdcWidgets from '@xdc/widgets';
import App from './App.vue';

import './global.less';

const app = createApp(App);
const registerComponents = (app) => {
  app.use(antd);
  app.use(XdcWidgets);
};

registerComponents(app);

// 初始化 pinia
setupStore(app);

// 初始化路由
setupRouter(app);

// 挂载
app.mount('#app');
