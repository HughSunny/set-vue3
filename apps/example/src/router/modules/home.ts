import { defineAsyncComponent, h } from 'vue';
import RouteView from '@/layout/route-view.vue';

const workplace = defineAsyncComponent(
  () => import(/* webpackChunkName: "dashboard" */ '@/views/home/index.vue'),
);

const routeName = 'home';
const routes = [
  {
    path: '/home',
    name: routeName,
    component: () => import('@/views/home/index.vue'),
    // component: h(RouteView, null, () => h(workplace)),
    meta: {
      title: '首页',
    },
  },
];
export default routes;
