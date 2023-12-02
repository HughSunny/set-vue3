import type { RouteRecordRaw } from 'vue-router'
import { defineAsyncComponent, h } from 'vue';
import {RouteView} from '@xdc/core'
// import commonRoutes from 'lead-lib/views/index.route'

const AsyncComponent =
  defineAsyncComponent(
    () => import('@/views/test.vue')
  )

const routes: Array<RouteRecordRaw> = [
  {
    path: '/workplace',
    name: '首页',
    meta: {
      icon: 'home-outlined',
      title: '工作台',
      guest: true
    },
    component: h(RouteView, null, () => h(AsyncComponent))
  },
  // ...commonRoutes,

]

export default routes
