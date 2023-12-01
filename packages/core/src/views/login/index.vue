<template>
  <a-layout class="ld-login">
    <a-layout-header style="height: 150px; background: transparent; width: 100%">
      <div class="login-header">
        <div class="left">
          <img class="login-logo" :src="sysLogo" alt="logo" />
          <h2 class="login-title">{{ $t(logoTitle) }}</h2>
        </div>

        <div class="right" v-if="friendUrls">
          <div
            v-for="(item, index) in friendUrls"
            :key="index"
            class="friendUrlItem"
            @click="openUrl(item.url)"
          >
            {{ item.title }}
          </div>
        </div>
      </div>
    </a-layout-header>
    <a-layout style="background: transparent">
      <div class="login-content">
        <div class="login-area">
          <div class="area-title">{{ title }}</div>
          <a-divider></a-divider>
          <div class="area-main">
            <a-form :model="formState" name="basic" autocomplete="off" @finish="handleLogin">
              <a-form-item
                class="loginFormItem"
                name="username"
                :rules="[
                  { required: true, message: $t('sys.action.pleaseInput') + $t('sys.user.account') }
                ]"
              >
                <a-input
                  class="input-style"
                  v-model:value="formState.username"
                  :bordered="false"
                  :placeholder="$t('sys.action.pleaseInput') + $t('sys.user.account')"
                >
                  <template #prefix> <UserOutlined class="site-form-item-icon" /> </template
                ></a-input>
              </a-form-item>

              <a-form-item
                class="loginFormItem"
                name="password"
                :rules="[
                  {
                    required: true,
                    message: $t('sys.action.pleaseInput') + $t('sys.user.password')
                  }
                ]"
              >
                <a-input-password
                  class="input-style"
                  :placeholder="$t('sys.action.pleaseInput') + $t('sys.user.password')"
                  v-model:value="formState.password"
                  :bordered="false"
                >
                  <template #prefix>
                    <LockOutlined class="site-form-item-icon" />
                  </template>
                </a-input-password>
              </a-form-item>
              <a-form-item
                v-if="enableInternational"
                name="language"
                class="loginFormItem"
                :rules="[
                  {
                    required: true,
                    message: $t('sys.action.pleaseSelect') + $t('sys.user.language')
                  }
                ]"
              >
                <div class="language-select-row">
                  <global-outlined class="site-form-item-icon input-style" />
                  <a-select
                    v-model:value="formState.language"
                    class="input-style"
                    :bordered="false"
                    @change="handleLanguageChange"
                  >
                    <a-select-option v-for="lang in languageList" :key="lang.code">{{
                      lang.name
                    }}</a-select-option>
                  </a-select>
                </div>
              </a-form-item>
              <a-checkbox
                style="text-align: right; float: right; margin-bottom: 20px"
                v-model:checked="formState.remember"
                >{{ $t('sys.user.rememberMe') }}</a-checkbox
              >

              <a-button
                class="loginBtn"
                type="primary"
                html-type="submit"
                :loading="self.loading"
                >{{ $t('sys.action.login') }}</a-button
              >
            </a-form>
          </div>
        </div>
      </div>
    </a-layout>
  </a-layout>
</template>
<script setup lang="ts">
defineOptions({
  name: 'LeadLogin'
})
import { reactive, computed, ref } from 'vue'
import { GlobalOutlined } from '@ant-design/icons-vue'

import { useRouter, useRoute } from 'vue-router'
import { AppConfig } from '@core/bo'
import { useI18n } from '@core/hooks/useI18n'
import { useAppStore } from '@core/store/app'
import { useUserStore } from '@core/store/user'
import ls from '@core/utils/local-storage'
import type { FnLoginHook, FnAfterLogin } from '@core/interface/ILeadFrame'
import { getUserInfo, login } from '@core/api/services/uc'
import type { IUserInfo } from '@core/interface/IUser'
import { useCookies } from '@vueuse/integrations/useCookies'
import { useConfigStore } from '@core/store/config'
const cookie = useCookies()
const { t } = useI18n()
const props = defineProps<{
  loginHook?: FnLoginHook
  afterLogin?: FnAfterLogin
}>()
interface FormState {
  username: string
  password: string
  remember: boolean
  language: string
}
const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const userStore = useUserStore()
const configStore = useConfigStore()
// 如果缓存中存在用户名，则认为其登录时选择了‘记住用户名’
const userCode = ls.get('userCode')
const formState = reactive<FormState>({
  username: userCode || '',
  password: '',
  remember: !!userCode,
  language: appStore.lang
})
const logoTitle = ''
// 系统入口下拉框设置  //TODO: 功能需要添加
const multiEntry: boolean = AppConfig.config['multiEntry']
const entrys: any = AppConfig.config['appCodes']
const currentEntry: string = AppConfig.config['appCode']

const self = reactive({
  loading: false,
  version: AppConfig.version,
  showLogin: false,
  authorizationCode: '',
  from: ''
})
const enableInternational = computed(() => configStore.enableInternational)
const languageList = computed(() => configStore.languageList)
const title = computed(() => configStore.loginSysName?.trim() || AppConfig.loginSysName)
const sysLogo = computed(() => configStore.loginSysLogo?.trim() || '/image/lead-logo.png')

const friendUrls = computed(() => {
  return configStore.friendUrls || []
})

// 获取系统状态在 app中处理XX
const handleLanguageChange = (e) => {
  formState.language = e
  AppConfig.lang = e
  appStore.SET_LANG(e)
}

const handleLogin = async (e) => {
  self.loading = true
  let user: IUserInfo = null
  try {
    if (props.loginHook) {
      user = await props.loginHook(formState.username, formState.password)
    } else {
      // 工业逻辑 登录
      const userRet = await login(formState.username, formState.password)
      user = {
        token: userRet.token
      }
    }
    // user是获取的数据
  } catch (error) {
    console.log('handle login exception', error)
  } finally {
    self.loading = false
  }
  if (!user) {
    return
  }
  userStore.SET_INFO(user)
  //记住账号
  ls.remove('userCode')
  if (formState.remember === true) {
    ls.set('userCode', formState.username)
  }
  if (props.afterLogin) {
    props.afterLogin()
  } else {
    // 工业逻辑 登录之后设置值

    // 登录之后跳转
    const redirect = route?.query?.redirect as string
    if (redirect) {
      // 登录成功，跳转redirect页面
      window.location.href = decodeURIComponent(redirect)
      // router.push(decodeURIComponent(redirect))
    } else {
      // 登录成功，跳转至首页
      window.location.href = '/'
      // router.push({ name: 'IndustryPlatformHome' })
    }
  }
}
const openUrl = (url: string) => {
  window.open(url, '_blank')
}
</script>
<style scoped lang="less">
.ld-login {
  //   display: block;
  width: 100%;
  height: 100%;
  overflow: auto;
  //   position: relative;
  background-image: url(/image/mes-login-bg.jpg);
  background-size: cover;
}

.login-header {
  display: flex;
  flex-direction: row;
  margin-left: 30px;
  justify-content: space-between;
  .left {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .right {
    display: flex;
    flex-direction: row;
    color: white;
    gap: 16px;
    .friendUrlItem {
      cursor: pointer;
    }
  }
}
.login-logo {
  height: 150px;
}

.login-title {
  font-size: 32px;
  padding-left: 30px;
  color: white;
}
.login-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: flex-end;
  margin: 5% 10%;
}
.login-area {
  background: #ffffff;
  //   box-shadow: 0px 4px 24px 1px rgba(0, 0, 0, 0.06);
  border-radius: 16px;
  width: 400px;
  min-height: 460px;
  font-size: 20px;
  padding: 36px;
  display: flex;
  flex-direction: column;
  align-items: center;
  float: right;
}

.input-style :deep(*) {
  font-size: 20px !important;
}
.loginFormItem {
  border-width: 1px;
  border-style: solid;
  border-color: #d9d9d9;
  border-radius: 6px;
  &:first-child {
    margin-top: 10px;
  }
  margin-bottom: 32px;
  &:last-child {
    margin-bottom: 24px !important;
  }
}
.language-select-row {
  height: 100%;
  display: flex;
  flex-direction: row;
  padding: 4px 0px 4px 11px;
}
.language-select-row:last-child {
  flex: 1;
  :deep(.ant-select-selector) {
    padding: 0 0 0 4px;
  }
}

.login-form-button {
  float: right;
}

.area-title {
  font-size: 28px;
  color: #666666;
  text-align: left;
  margin: 10px 0 0;
  width: 100%;
}

// .area-main > :first-child {
//   display: flex;
//   font-size: 20px;
//   line-height: 1;
// }

// .area-main > :first-child::before {
//   content: '';
//   width: 9px;
//   background: #1890ff;
//   margin-right: 12px;
// }

.area-main {
  width: 100%;
  display: flex;
  flex-direction: column;

  // font-size: 1em;
}
.loginBtn {
  font-size: 20px;
  height: auto;
  width: 100%;
}

@media (max-width: 754px) {
  .login-content {
    align-items: center;
  }
  .login-logo {
    height: 80px;
  }
  .login-title {
    font-size: 26px;
  }
  .login-area {
    font-size: 15px;
  }
}

@media (max-width: 1180px) {
  .login-logo {
    height: 100px;
  }
  .login-title {
    font-size: 30px;
  }
  .login-area {
    font-size: 18px;
  }
}

@media (max-width: 1600px) {
  .login-area {
    font-size: 24px;
  }
}

@media (max-width: 2000px) {
  .login-area {
    font-size: 28px;
  }
}
</style>
