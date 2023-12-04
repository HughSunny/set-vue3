<template>
  <LeadLogin :login-hook="handleLogin"></LeadLogin>
  <!-- :after-login="handleAfterLogin"  -->
</template>

<script setup lang="ts">
import type { FnAfterLogin, FnLoginHook } from '@xdc/core';
import { arrayToTree, MenuTypeEnum, reduceArr, treeToArray, useMessage } from '@xdc/core';
import http from '@/api/http-mdm';
import { login } from '@/api/mdm-services/uc';

defineOptions({
  name: 'MdmLoginView',
});

console.log('------------------------------> MDM LOGIN');

const { createMessage } = useMessage();

const handleAfterLogin: FnAfterLogin = () => {};

const handleLogin: FnLoginHook = (username, password) => {
  return new Promise((resolve, reject) => {
    login(username, password).then(response => {
      let token = '';
      const { status, data, headers } = response;
      if (data.code !== 0) {
        createMessage.error(data.message);
        return;
      }
      if (headers.authorization) {
        token = headers.authorization;
      }
      const ret = data.data;
      // console.log('===============================> result.data', ret)
      let menuList = [];
      // 先把所有的权限都放到数组里
      ret.roles.map(item => {
        if (item.permissions) {
          item.permissions.forEach(d => {
            menuList.push(d);
          });
        }
      });
      console.log('===============================> menuList', menuList);
      let temp = treeToArray(menuList, true);
      //去重

      menuList = arrayToTree(reduceArr(temp, 'id'), true);
      menuList = iterationDeleteMenuChildren(
        serverArray(menuList)
          .sort((a, b) => {
            return a.sort - b.sort;
          })
          .filter(item => {
            return item.title !== 'PDA';
          }),
      );

      const userData = { ...ret, menuList: menuList };
      // 给http设置特殊的header
      http.setHeader({
        id: ret.id,
      });
      resolve({
        token,
        userCode: ret.account,
        userName: ret.name,
        userData,
      });
    });
  });
};
// 数组递归
const serverArray = arr => {
  let newArr = [];
  for (let item = 0; item < arr.length; item++) {
    let isPage = !arr[item].children || arr[item].children.length === 0;
    const hasChild = arr[item]?.children?.length > 0;
    if (!hasChild) {
      delete arr[item].children;
    }
    // if (arr[item].resourceType === 'menu'){
    // arr[item].hide === 0 隐藏的不需要显示
    if (arr[item].resourceType === 'menu' && arr[item].hide === 0) {
      const menuType = isPage ? MenuTypeEnum.Page : MenuTypeEnum.Menu;
      const menuItem = {
        systemMark: arr[item].systemMark,
        title: arr[item].name,
        path: arr[item].route,
        name: arr[item].code,
        icon: arr[item].icon,
        sort: arr[item].serialNumber,
        children: arr[item].children,
        parentId: arr[item].parentId,
        id: arr[item].id,
        menuType,
      };
      if (hasChild) {
        menuItem.children = serverArray(arr[item]?.children).sort((a, b) => {
          return a.sort - b.sort;
        });
      }
      newArr.push(menuItem);
    }
  }
  return newArr;
};
const iterationDeleteMenuChildren = arr => {
  if (arr.length) {
    for (let i in arr) {
      if (arr[i].children && arr[i].children.length) {
        iterationDeleteMenuChildren(arr[i].children);
      } else {
        delete arr[i].children;
      }
    }
  }
  return arr;
};
</script>

<style lang="less" scoped></style>
@/api/http-mdm
