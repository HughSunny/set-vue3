import type { App } from 'vue';
import Exception403 from './exception/403.vue';
import Exception404 from './exception/404.vue';
import Exception500 from './exception/500.vue';
import BlankPage from './BlankPage.vue';
import FrameLoginView from './login/index.vue';

export { Exception403, Exception404, Exception500, BlankPage, FrameLoginView };

const install = (app: App) => {
  app.component(FrameLoginView.name, FrameLoginView);
  // 如果导出成组件的，那么就这里注册组件
};

/**
 * 页面
 */
export const ViewsPlugin = {
  install,
};
