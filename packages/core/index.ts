import 'lead-lib/api/http';
import i18n from './i18n';
import type { App } from 'vue';
// import { ComponentPlugin } from './components'
import { DirectivePlugin } from './directive';
export default {
  //Vue.use()方法接收一个对象作为参数，并且会默认调用对象中的install方法
  install: (app: App, options: any): any => {
    app.use(DirectivePlugin);
    app.use(ComponentPlugin);
    app.use(ViewsPlugin);
    app.use(i18n);
  }
};
