import type { RouteRecordRaw } from 'vue-router';
import { RouteView } from '@xdc/core';
import systemModule from './system/index.route';
// 视图文件夹导出的路由

// route-view 需要手动添加
const commonRoutes: Array<RouteRecordRaw> = [
  {
    path: '/system',
    meta: { title: '系统设置' },
    component: RouteView,
    children: [...systemModule],
  },

  // gridPanel: 通用匹配模式
];
export default commonRoutes;
