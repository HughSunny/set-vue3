import type { App } from 'vue';
import permission from './permission';

function install(app: App) {
  permission(app);
}

/**
 * Vue directives
 */
export const DirectivePlugin = {
  install,
};

export * from './permission';
