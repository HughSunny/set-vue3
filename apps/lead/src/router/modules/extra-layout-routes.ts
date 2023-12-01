import { RouteView } from '@xdc/core';
import { defineAsyncComponent, h } from 'vue';
const AsyncWorkplace = defineAsyncComponent(
  () => import(/* webpackChunkName: "test-single-menu" */ '@/views/home/index.vue'),
);

export default [
  //单个菜单事例
  {
    name: 'test-single-menu',
    path: '/test-single-menu',
    meta: { title: 'pages.basic.title', icon: 'AppstoreAddOutlined' },
    component: h(RouteView, null, () => h(AsyncWorkplace)),
  },
];
