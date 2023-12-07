import type { App } from 'vue';
import { acceptHMRUpdate, createPinia, getActivePinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
// modules
import { useAppStore, useConfigStore, useUserStore } from '@xdc/core';

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot));
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
  import.meta.hot.accept(acceptHMRUpdate(useConfigStore, import.meta.hot));
}

const store = createPinia();
console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>store createPinia', store);
// store.use(piniaPluginPersistedstate);

export const setupStore = (app: App) => {
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>store setupStore', store);
  app.use(store);
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>store ActivePinia', getActivePinia());

  // const userStore = useUserStore();
  // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>store setupStore ', userStore);
  // const configStore = useConfigStore();
  // const appStore = useAppStore();
};

export default store;
