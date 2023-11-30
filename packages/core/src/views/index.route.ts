import type { RouteRecordRaw } from 'vue-router'
import systemModule from './system/index.route'
import RouteView from 'lead-lib/home/route-view'
import BlankPage from 'lead-lib/views/BlankPage.vue'
// 视图文件夹导出的路由


// route-view 需要手动添加
const commonRoutes: Array<RouteRecordRaw> = [
  {
    path: '/system',
    meta: { title: '系统设置' },
    component: RouteView,
    children: [...systemModule]
  },

  // gridPanel: 通用匹配模式
]
export default commonRoutes
