const oidcRoutes = [
  {
    path: '/oidc-callback',
    name: 'oidcCallback',
    component: () => import('./oidc-callback.vue'),
    meta: { title: 'OIDC回调地址' },
  },
  {
    path: '/oidc-callback-error',
    name: 'oidcCallbackError',
    component: () => import('./oidc-callback-error.vue'),
    meta: {
      title: 'OIDC回调异常',
      // isPublic: 'true'
    },
  },
  {
    path: '/oidc-logout',
    name: 'oidcLogout',
    component: () => import('./oidc-logout.vue'),
    meta: {
      title: 'OIDC登出',
    },
  },
];

export default oidcRoutes;
