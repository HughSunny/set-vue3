import type { App } from 'vue';
import { ComponentPlugin } from './components';

const install = (app: App, options: InitWidgetOptions) => {
  app.use(ComponentPlugin);
  if (options) {
    Object.keys(options).forEach((key) => {
      _initWidgetOption[key] = options[key];
    })
  }
};

let _initWidgetOption: InitWidgetOptions = {};
export interface InitWidgetOptions {
  /**
   * 上传请求 (参数是)
   */
  uploadRequest?: (file, library) => Promise<string>;

  /**
   * 上传的默认文件夹名字
   */
  uploadLibrary?: string;
}

export function getInitOptions(): InitWidgetOptions {
  return _initWidgetOption;
}

export * from './components';
export * from './entity';
export * from './utils';

export default {
  install,
};
