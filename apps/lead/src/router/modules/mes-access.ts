import type { RouteRecordRaw } from 'vue-router';
import { RouteView } from '@xdc/core';

const routeName = 'bd';

const routes: Array<RouteRecordRaw> = [
  {
    path: `/${routeName}`,
    name: routeName,
    component: RouteView,
    meta: {},
    children: [
      /**基础数据-工厂模型**/
      {
        path: `/region-mgt`,
        component: () => import('@/views/test.vue'),
      },
      {
        path: `/warehouse-mgt`,
        component: () => import('@/views/test.vue'),
      },
      {
        path: `/work-type`,
        component: () => import('@/views/test.vue'),
      },
      {
        path: `/group-mgt`,
        component: () => import('@/views/test.vue'),
      },
      {
        path: `/org-structure`,
        component: () => import('@/views/test.vue'),
      },
      {
        path: `/org-type`,
        component: () => import('@/views/test.vue'),
      },
      {
        path: `/station-mgt`,
        component: () => import('@/views/test.vue'),
      },
      {
        path: `/factory-calendar`,
        component: () => import('@/views/test.vue'),
      },
      /**产品模型 */
      {
        path: `/mat-info`,
        component: () => import('@/views/test.vue'),
      },
      {
        path: `/prod-bom`,
        component: () => import('@/views/test.vue'),
      },
      {
        path: `/unit-mgt`,
        component: () => import('@/views/test.vue'),
      },
      /**产品模型 */
      {
        path: `/encoding-rule`,
        component: () => import('@/views/test.vue'),
      },
      {
        path: `/decoding-rule`,
        component: () => import('@/views/test.vue'),
      },
    ],
  },
];
export default routes;
