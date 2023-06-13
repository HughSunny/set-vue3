import 'ant-design-vue/dist/antd.less';
import 'viewerjs/dist/viewer.css';
import '@set/widgets/dist/style.css';

import { createApp } from 'vue';
import { setupRouter } from '@/router';
import { setupStore } from '@/store';
import App from './App.vue';

import './global.less';

const app = createApp(App);

// 初始化 pinia
setupStore(app);

// 初始化路由
setupRouter(app);

// 挂载
app.mount('#app');
