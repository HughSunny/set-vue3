

import type { App } from 'vue';
import { ComponentPlugin } from './components';
const install = (app: App) => {
  app.use(ComponentPlugin);
}

export * from './components';
export * from './entity';
export * from './utils';

export default {
  install,
};
