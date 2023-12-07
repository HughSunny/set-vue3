import type {
  FnGetMenu,
  FnCheckAccess,
  FnInitSysConfig,
  FnGetSysConfig,
  ISysInit,
  FnGetUserInfo,
  FnGetPermission,
} from '@core/interface/ILeadFrame';
import { STORAGE_KEY_TOKEN } from '@core/interface/IUser';
import { Modal } from 'ant-design-vue';
import {
  MenuTypeEnum,
  type IFetchMenu,
  type MetaPermission,
  type IFetchMenuTree,
} from '@core/interface/IRouter';
import { setLocalStorage, getLocalStorage } from '@core/utils/storage';
import { AppConfig } from '@core/bo/app-config';
import { type IUserInfo } from '@core/interface/IUser';
import { getMenuList } from '@core/api/services/menu';
import { getLanguageList } from '@core/api/services/common';
import { getHealthz } from '@core//api/services/healthz';
import { getSystemCodesByGroupCode } from '@core/api/services/system-code-group';
import { SYSTEM_CODE_GROUP, convertSystemCode2Config } from '@core/utils/constants';
import { getUserInfo } from '@core/api/services/uc';
import { useI18n } from '@core/hooks/useI18n';
import { treeToArray } from '@core/utils';
const onInitConfig: FnInitSysConfig = () => {
  const config: ISysInit = {} as ISysInit;
  config.token = getLocalStorage(STORAGE_KEY_TOKEN);
  // 缓存获取 配置
  return config;
};

const onGetConfig: FnGetSysConfig = async () => {
  const { t } = useI18n();
  const config: Partial<ISysInit> = {};
  const sysGroupCode = await getSystemCodesByGroupCode(SYSTEM_CODE_GROUP);
  convertSystemCode2Config(sysGroupCode.systemCodes, config);
  const languageRet = await getLanguageList();
  config.languageList = languageRet.map(item => {
    return {
      code: item.Culture,
      name: item.DisplayName,
    };
  });

  const healthRet = await getHealthz();
  const { entries, status } = healthRet;
  const checkStatus = statusObj => {
    const { status, exception } = statusObj;
    return status.indexOf(t('sys.status.healthy')) === -1 || !exception;
  };
  if (!checkStatus(healthRet)) {
    for (const key in entries) {
      const obj = entries[key];
      const { status, exception } = obj;
      if (!checkStatus(obj)) {
        Modal.warning({
          title: t('sys.status.warning'),
          content: key + t('sys.status.exception') + '(' + exception + ')',
        });
      }
    }
  }

  return config;
};

const onGetUserInfo: FnGetUserInfo = async () => {
  const userInfo = await getUserInfo();
  const user: IUserInfo = {
    token: AppConfig.token,
    id: userInfo.id,
    avatar: userInfo.avatar,
    userCode: userInfo.account,
    userName: userInfo.displayName || userInfo.name,
    userData: userInfo,
  };
  return user;
};

const onCheckAccess: FnCheckAccess = async () => {
  if (AppConfig.token) {
    return true;
  }
  return false;
};
const onGetMenuList: FnGetMenu = async () => {
  let fetchMenuList: IFetchMenu[] = [];
  const menuRet = await getMenuList();

  const serverArray = (treeList, parentMenuKey?): IFetchMenuTree[] => {
    const newArr: IFetchMenuTree[] = [];
    for (let mIndex = 0; mIndex < treeList.length; mIndex++) {
      const xx = treeList[mIndex];
      const hasChild = xx?.children?.length > 0;
      if (!hasChild) {
        delete xx.children;
      }
      // enabled === 0 隐藏的不需要显示  MenuTypeEnum.Button 是按钮权限
      // menu的url可能是空
      const path = getPath(xx.url || xx.code); //必须以/为开头
      if (xx.enabled && xx.menuType < MenuTypeEnum.Button) {
        const menuName = xx.code; //name是路由的主键，必须唯一!
        const menuObj: IFetchMenu = {
          id: xx.id,
          parentId: xx.parentId,
          name: menuName,
          path,
          title: xx.name,
          icon: xx.icon,
          sort: xx.sortNo,
          menuType: xx.menuType,
        };
        if (xx.menuType === MenuTypeEnum.ChildPage) {
          //需要有一个activeMenu属性 表示当前激活的菜单， 应该是上一层菜单
          menuObj.activeMenu = parentMenuKey;
        }

        if (hasChild) {
          menuObj.children = serverArray(xx?.children, path).sort((a, b) => {
            return a.sort - b.sort;
          });
        }
        newArr.push(menuObj);
      }
    }
    return newArr;
  };

  const menuList: IFetchMenu[] = [];
  if (menuRet && menuRet.length > 0) {
    AppConfig.menuPermission = menuRet.sort((a, b) => {
      return a.sortNo - b.sortNo;
    });
    const treeList: IFetchMenuTree[] = serverArray(menuRet).sort((a, b) => {
      return a.sort - b.sort;
    });
    treeList.forEach((xx: IFetchMenuTree) => {
      const nodeList: IFetchMenu[] = treeToArray(xx);
      menuList.push(...nodeList);
    });
    fetchMenuList = menuList;
  }
  return fetchMenuList;
};

const onGetPermission: FnGetPermission = async () => {
  // 从 AppConfig.menuPermission中获取，因为是连在一起的
  const menuList = AppConfig.menuPermission;
  const permissionObj: Recordable<Recordable<MetaPermission>> = {};
  const serverArray = treeList => {
    for (let mIndex = 0; mIndex < treeList.length; mIndex++) {
      const xx = treeList[mIndex];
      const { id, menuType, enabled } = xx;
      const hasChild = xx?.children?.length > 0;
      if (menuType === MenuTypeEnum.Button) {
        continue;
      }
      if (!hasChild) {
        continue;
      }
      // enabled === 0 隐藏的不需要显示  MenuTypeEnum.Button 是按钮权限
      if (!enabled) {
        continue;
      }
      const menuName = xx.code; //name 是路由的主键，必须唯一
      const buttonList = xx?.children.filter(child => child.menuType === MenuTypeEnum.Button);
      if (buttonList && buttonList.length) {
        const pagePermission: Recordable<MetaPermission> = {};
        buttonList.forEach(xx => {
          const item: MetaPermission = {
            name: xx.name,
            type: xx.enabled ? 'visible' : 'invisible',
          };
          pagePermission[xx.code] = item;
        });
        permissionObj[menuName] = pagePermission;
      }

      // permissionObj[menuName] = []
      if (hasChild) {
        serverArray(xx?.children);
      }
    }
  };

  serverArray(menuList);
  return permissionObj;
};
// 判断path是否带/
const getPath = (path: string) => {
  if (path && path.startsWith('/')) {
    return path;
  }
  return `/${path}`;
};
export const IndustryOption = {
  onInitConfig,
  onGetConfig,
  onGetUserInfo,
  onGetMenuList,
  onCheckAccess,
  onGetPermission,
};
