const _config = _APP_CONFIG_ || {};
import { acceptHMRUpdate, defineStore } from 'pinia';
import { type IAppConfig, AppConfig, defaultValue } from '@core/bo/app-config';
export const initConfigState = (): IAppConfig =>
  Object.assign(defaultValue, { ..._config, config: _config });

export const useConfigStore = defineStore('config', {
  // persist: true,
  state: initConfigState,
  actions: {
    setConfig(newConfig) {
      this.$patch({ ...newConfig });
      console.log(
        'useConfigStore setConfig -------------------------------->',
        this.$state,
        AppConfig,
      );
    },

    setConfigItem(key: string, value: any) {
      this[key] = value;
    },
  },
  getters: {},
});
