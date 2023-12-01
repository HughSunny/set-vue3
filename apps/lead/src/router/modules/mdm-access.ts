import type { RouteRecordRaw } from 'vue-router'
import { defineAsyncComponent, h } from 'vue';
import { RouteView, BlankLayout } from '@xdc/core';

const AsyncComponent =
  defineAsyncComponent(
    () => import(/* webpackChunkName: "workplace" */ '@/views/test.vue')
  )

const routes: Array<RouteRecordRaw> = [
  {
    path: '/workplace',
    name: '首页',
    meta: {
      icon: 'home-outlined',
      title: '工作台'
    },
    component: h(RouteView, null, () => h(AsyncComponent))
  },

  // 岗位任务
  {
    path: '/mywork',
    name: 'mywork',
    component: RouteView,
    meta: { title: '岗位任务', icon: 'insert-row-below-outlined' },
    children: [
      {
        path: '/mywork/tobedone',
        name: 'tobedone',
        component: () => import('@/views/test.vue'),
        meta: { title: '待办' }
      },
      {
        path: '/mywork/done',
        name: 'done',
        component: () => import('@/views/test.vue'),
        meta: { title: '已办' }
      },

      {
        path: '/mywork/workhistory',
        name: 'workhistory',
        component: () => import('@/views/test.vue'),
        meta: { title: '历史记录' }
      },
      {
        path: '/mywork/createtask',
        name: 'createtask',
        component: () => import('@/views/test.vue'),
        meta: { title: '任务发布' }
      },

      {
        name: 'processconfigmanagement',
        path: '/mywork/processconfigmanagement',
        meta: { title: '任务流程', keepAlive: false },
        component: BlankLayout,
        children: [
          {
            path: '/mywork/processconfig',
            name: 'processconfig',
            component: () => import('@/views/test.vue'),
            meta: { title: '流程配置' }
          },
          {
            path: '/mywork/formtypes',
            name: 'formtypes',
            component: () => import('@/views/test.vue'),
            meta: { title: '表单类型' }
          }
        ]
      },
      {
        path: '/mywork/functionalstrategy',
        name: 'functionalstrategy',
        component: () => import('@/views/test.vue'),
        meta: { title: '功能策略', guest: true }
      }
    ]
  }
]

export default routes
