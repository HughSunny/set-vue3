import type { App } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '@/layout/index.vue';
import routes from '@/router/routes';
/**
 * 初始化基础路由
 */
const constantRoutes: any[] = [];
export const HomeLayoutRoutes = {
  path: '/',
  name: 'layout',
  redirect: '/home',
  component: MainLayout,
  meta: {
    title: '首页',
    isPublic: true,
  },
  children: [...routes],
};

constantRoutes.push(HomeLayoutRoutes);

// 实例化 vue-router
const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
});

export function setupRouter(app: App) {
  app.use(router);
}
