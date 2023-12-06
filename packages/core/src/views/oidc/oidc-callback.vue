<template>
  <div></div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { useUserStore } from '@core/store';
import { init } from '@core/utils/auth-manager';
import { AppConfig, getOidcClientSetting } from '@core/bo';
const router = useRouter();
const userStore = useUserStore();
const authManager = init(getOidcClientSetting());
try {
  authManager?.loginRedirectCallback().then(user => {
    // // 手动获取用户信息
    // authManager.loadUser().then(() => {
    //   const userInfo = authManager.userInfo.value
    // })

    if (user) {
      // 设置token
      AppConfig.token = user.access_token;
      // AppConfig.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiI1MDkxNzE2MzkxNTg2MjAxNjAiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEwNzMwIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6Iuefs-aZk-aYnyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL3N1cm5hbWUiOiIxMDczMCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvZ3JvdXBzaWQiOiJEZWZhdWx0IiwibmJmIjoxNzAxMTQ5NTYzLCJleHAiOjE3MDEyMzU5NjMsImlzcyI6Imh0dHA6Ly93d3cueGRjcGx1cy5jb20iLCJhdWQiOiJwbGF0Zm9ybSJ9.9HOyoUkNabgtOpwFQ8jHDnY0aQBDE2_vqayO8aEobH4"

      // 跳转到redirectUrl
      router.push('/');
    } else {
      authManager.loginRedirect();
    }
  });
} catch (error) {
  console.log('CallBack 错误信息', error);
  router.push('/oidc-signin-error');
}
</script>
