import type { App } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { AppConfig } from '@xdc/core';
import { getConstantRoutes } from './constant';

const systemType = AppConfig.sysType; // MDM MES INDUSTRY

export function setupRouter(app: App) {
  app.use(router);
  // initAppOptions(getInitConfig(systemType));
  // return router;
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: getConstantRoutes(systemType),
  scrollBehavior: (to, from) => {
    if (to.path !== from.path) {
      setTimeout(() => {
        document.getElementById('app').scrollTop = 0;
      });
    }
    return { top: 0 };
  },
});

export default router;
