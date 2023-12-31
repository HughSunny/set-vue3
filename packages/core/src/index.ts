import i18n from './locale';
import type { App } from 'vue';
import { ComponentPlugin } from './components';
import { DirectivePlugin } from './directive';
import { ViewsPlugin } from './views';
// core
export * from './app';
export * from './home';
export * from './components';
export * from './directive';
export * from './hooks';
export * from './router';
export * from './store';
export * from './api';
export * from './bo';
export * from './interface';
export * from './enum';
export * from './utils';

export { default as i18n } from './locale';
// views
export * from './views';

const install = (app: App, options?) => {
  app.use(DirectivePlugin);
  app.use(ComponentPlugin);
  app.use(ViewsPlugin);
  app.use(i18n);
};
export default {
  //Vue.use()方法接收一个对象作为参数，并且会默认调用对象中的install方法
  install,
};
