import type { RouteRecordRaw } from 'vue-router';
import type { MenuRouteItem, RouteProps } from '@core/interface/IRouter';

export const filterMenu = (routes: MenuRouteItem[]) => {
  return routes.find(item => item.name === 'IndustryPlatformHome')?.children || [];
};
export interface MenuInfo {
  menus: RouteProps[];
  menuKeyMap: MenuKeyMap;
}
export interface MenuMap {
  parentKeys?: string[];
}
type MenuKeyMap = Record<string, MenuMap>;

export const genMenuInfo = (routes: RouteRecordRaw[]): MenuInfo => {
  const menuKeyMap: MenuKeyMap = {};
  const getMenuInfo = (routes: RouteRecordRaw[], parentKeys: string[] = []): RouteProps[] => {
    return routes.map(route => {
      const currentRouter: RouteProps = {
        ...route,
      };
      if (currentRouter.meta?.activeMenu) {
        // 将当前的激活的菜单强行插入菜单队列中
        const activeMenu = currentRouter.meta.activeMenu;
        if (
          !parentKeys ||
          parentKeys.length === 0 ||
          parentKeys[parentKeys.length - 1] !== activeMenu
        )
          menuKeyMap[currentRouter.path] = {
            parentKeys: [...parentKeys, currentRouter.meta.activeMenu],
          };
      } else {
        menuKeyMap[currentRouter.path] = { parentKeys: parentKeys };
      }
      // menuKeyMap[currentRouter.path] = { parentKeys: parentKeys };
      if (route.meta?.hideChildrenInMenu) {
        route.children &&
          route.children
            .map(item => item.path)
            .forEach(
              value => (menuKeyMap[value] = { parentKeys: [...parentKeys, currentRouter.path] }),
            );
      }
      // 是否有子菜单，并递归处理
      if (route.children && route.children.length > 0 && !route.meta?.hideChildrenInMenu) {
        // Recursion
        currentRouter.children = getMenuInfo(route.children, [...parentKeys, currentRouter.path]);
      } else {
        currentRouter.children = undefined;
      }

      return currentRouter;
    });
  };
  const menus = getMenuInfo(routes);
  // console.log('genMenuInfo --------------------->menus, ', menus),
  // console.log('genMenuInfo --------------------->menuKeyMap, ', menuKeyMap)
  return {
    menus,
    menuKeyMap,
  };
};

export const getMenuFirstChildren = (menus: RouteProps[]) => {
  return menus.map(menu => {
    // eslint-disable-next-line
    const { children: _children, ...rest } = menu;
    return rest;
  });
};

export const findMenuChildren = (
  menus: RouteProps[] | undefined,
  key: string | symbol | undefined,
) => {
  return (menus && menus.find(item => item.name === key)?.children) || [];
};
