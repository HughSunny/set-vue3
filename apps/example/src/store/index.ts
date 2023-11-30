import type { App } from 'vue';
import { acceptHMRUpdate, createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
// modules
// import { useAppStore } from 'lead-lib/store/app';
// if (import.meta.hot) {
//   import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot));
// }

const store = createPinia();
store.use(piniaPluginPersistedstate);

export const setupStore = (app: App) => {
  app.use(store);
  return store;
};

export default store;
