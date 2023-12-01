import type { App, Plugin, DefineComponent, Component } from 'vue';

export const withInstall = <T extends Component | DefineComponent>(comp: T) => {
  const c = comp as any;
  c.install = function (app: App) {
    app.component(c.displayName || c.name, comp);
  };

  return comp as T & Plugin;
};
