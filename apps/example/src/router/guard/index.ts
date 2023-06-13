import { Router } from 'vue-router';
import store from '@/store';
import { vuexOidcCreateRouterMiddleware } from 'vuex-oidc';
import { logData } from '@/utils/helper';

export async function setupRouterGuard(router: Router) {
  // createPageNotFoundGuard(router);
  if (!import.meta.env.SSR) {
    createIdsGuard(router);
    createPermissionGuard(router);
  }
}
function createPermissionGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    // document.title = to.meta ? to.meta.title : 'mix';
    if (to.meta && to.meta.title) document.title = to.meta.title;

    console.log('createPermissionGuard', to);

    const accessToken = store.getters['oidcStore/oidcAccessToken'];
    if (accessToken) {
      if (
        to.path === '/oidc-callback' ||
        to.path === '/401' ||
        to.path === '/404' ||
        to.path === '/login'
      ) {
        // console.log('has accessToken, exception 1 :', to.path);
        next();
      } else {
        const hasAccess = store.dispatch('oidcStore/oidcCheckAccess', to);
        let user = store.getters.user;
        // console.log('user', user);
        if (!user.userName) {
          try {
            const userData = await store.dispatch('user/getInfo');
            user = userData.currentUser;
          } catch (error) {
            // Message.error(error || 'Has Error');
          }
          next();
          logData('mix-site', 'view', to.fullPath, store);
        } else {
          logData('mix-site', 'view', to.fullPath, store);

          next();
        }
      }
    } else {
      console.log('has accessToken,--------------------------------none1', to);
      if (
        to.path === '/oidc-callback' ||
        to.path === '/401' ||
        to.path === '/404' ||
        to.path === '/login'
      ) {
        console.log('has accessToken1--------------------------------none2', to);
        // console.log('not login exception 2 ', to.path);
        logData('mix-site', 'view', to.fullPath, store);
        next();
      } else {
        console.log('has accessToken2--------------------------------none3', to);
        logData('mix-site', 'view', to.fullPath, store);
        next();
        // console.log('not login next ', to.path);
      }
    }
  });
}

function createIdsGuard(router: Router) {
  console.log('createIdsGuard');
  router.beforeEach(vuexOidcCreateRouterMiddleware(store, 'oidcStore'));
}
