import type { App } from 'vue';
import { acceptHMRUpdate, createPinia } from 'pinia';
// modules

// if (import.meta.hot) {
//   import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot));
// }

const store = createPinia();

export const setupStore = (app: App) => {
  app.use(store);
};

export default store;
