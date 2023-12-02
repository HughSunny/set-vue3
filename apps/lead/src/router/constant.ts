import { FrameLoginView } from '@xdc/core';
import MdmLoginView from '@/views/login/mdm-login.vue';
import MesLoginView from '@/views/login/mes-login.vue';
// import oidcRoutes from 'lead-lib/views/oidc/index.route'
export function getConstantRoutes(systemType) {
  const routes = [];
  if (systemType === 'MDM') {
    routes.push({
      path: '/login',
      name: 'Login',
      component: MdmLoginView,
      meta: {},
    });
  } else if (systemType === 'MES') {
    routes.push({
      path: '/login',
      name: 'Login',
      component: MesLoginView,
      meta: {},
    });
  } else {
    routes.push(
      {
        path: '/login',
        name: 'Login',
        component: FrameLoginView,
        meta: {},
      },
      //
    );
  }
  //sso

  // routes.push({ path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound })
  // routes.push(...oidcRoutes)
  return routes;
}

export function getConstantLayoutRoutes() {
  // layout 附加路由
  return [
    // 1. 隐藏路由
    // {
    //   path: '/grid-panel/:name',
    //   name: 'gridPanel1',
    //   props: true,
    //   component: GridPanel,
    //   meta: { title: 'gridPanel' }
    // }
  ];
}
