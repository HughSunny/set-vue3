<template>
  <LeadLogin :login-hook="handleLogin"></LeadLogin>
  <!-- :after-login="handleAfterLogin"  -->
</template>

<script setup lang="ts">
import type { FnAfterLogin, FnLoginHook, IUserInfo } from '@xdc/core';
import { message } from 'ant-design-vue';
import { useCookies } from '@vueuse/integrations/useCookies';
import { AppConfig, useI18n, useMessage } from '@xdc/core';
import { login } from '@/api/mes-services/uc';

defineOptions({
  name: 'MesLoginView',
});

const { t } = useI18n();
console.log('------------------------------> MES LOGIN setup');
const cookie = useCookies();
const { createMessage, createErrorModal } = useMessage();

const handleAfterLogin: FnAfterLogin = () => {};

const handleLogin: FnLoginHook = (username, password) => {
  return new Promise((resolve, reject) => {
    login(username, password).then(res => {
      if (res.Data && res.Code === 1) {
        const userData = JSON.parse(res.Data);
        let user: IUserInfo = {
          token: res.SessionId,
          userCode: userData.UserCode,
          userName: userData.UserName,
          userData,
        };
        cookie.set('sid', user.token);
        cookie.set('uid', user.userCode);
        cookie.set('un', user.userName);
        cookie.set('entry', AppConfig.appCode || AppConfig.config?.appCode);
        cookie.set('sname', AppConfig.sysName);
        cookie.set('v=', AppConfig.version);
        resolve(user);
      } else {
        // 正常返回，返回错误信息
        message.error(res?.ErrMessage || t('请求错误'));
      }
    });
  });
};
</script>

<style lang="less" scoped></style>
