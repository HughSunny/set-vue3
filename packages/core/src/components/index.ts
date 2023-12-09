import type { App } from 'vue';
import AntdApp from './antd-app';
import GridPanel from './grid-panel';
import PageContainer from './page-container';
import PageGridContent from './page-grid-content/index.vue';
import ProProvider from './pro-provider/index.vue';
import SelectLang from './select-lang';
import TransformVnode from './transform-vnode';

export {
  AntdApp,
  GridPanel,
  PageContainer,
  PageGridContent,
  ProProvider,
  SelectLang,
  TransformVnode,
};

const install = (app: App) => {
  app.component(AntdApp.name, AntdApp);
  app.component(GridPanel.name, GridPanel);
  app.component(PageContainer.name, PageContainer);
  app.component(PageGridContent.name, PageGridContent);
  app.component(ProProvider.name, ProProvider);
  app.component(SelectLang.name, SelectLang);
  app.component(TransformVnode.name, TransformVnode);
};

/**
 * 组件插件
 */
export const ComponentPlugin = {
  install,
};
