<template>
  <a-popover
    placement="bottomRight"
    v-if="currentUser"
    class="frame-header-user-popup"
    :overlayInnerStyle="{ padding: '0px' }"
  >
    <span style="padding-left:12px;">
      <a-avatar
        size="small"
        :src="currentUser.avatar || defaultAvatar"
        class="ant-pro-header-account-avatar"
      />
      <!-- <h3 class="ant-pro-header-account-name anticon">{{ currentUser.userName }}</h3> -->
    </span>
    <template #content>
      <div class="frame-header-user-overlay">
        <a-menu
          class="frame-header-user-overlay-menu"
          :selected-keys="[]"
          mode="vertical"
          style="width: 200px"
        >
          <a-menu-item>
            <template #icon>
              <a-avatar
                size="small"
                :src="currentUser.avatar || defaultAvatar"
                class="ant-pro-header-account-avatar"
            /></template>
            {{ currentUser.userName }}
          </a-menu-item>

          <a-divider style="height: 2px; margin: 8px 0" />
          <!-- <template #icon><user-outlined /></template> -->
          <!-- <template #icon><setting-outlined /></template> -->
          <!-- <a-menu-item v-for="item in state.systemData" :key="item.name">
            <template #icon>
              <img v-if="item.icon" :src="`/image/icon/${item.icon}`" />
              <LinkOutlined v-else />
            </template>
            <a :href="item.url" target="_blank">{{ item.name }}</a>
          </a-menu-item> -->

          <a-menu-item key="changePassword" @click="handleChangePwd">
            <template #icon><edit-outlined /></template>
            {{ $t('sys.user.changePassword')}}
            <i class="ant-menu-submenu-arrow" />
          </a-menu-item>
          <a-popover placement="left" :overlayInnerStyle="{ padding: '0px' }">
            <a-menu-item key="language" v-if="enableInternational">
              <template #icon> <global-outlined /></template>
              {{ $t('Language') }}
              <i class="ant-menu-submenu-arrow" />
            </a-menu-item>
            <template #content>
              <a-menu
                class="frame-header-user-overlay-menu"
                :selected-keys="[currentLang]"
                @click="handleLanguageSelect"
              >
                <a-menu-item v-for="locale in languageList" :key="locale.code">
                  <template #icon>
                    <span role="img" :aria-label="locale.name" style="margin-right: 8px">
                      {{ locale.code }}
                    </span>
                  </template>
                  {{ locale.name }}
                </a-menu-item>
              </a-menu>
            </template>
          </a-popover>

          <a-divider style="height: 2px; margin: 8px 0" />
          <a-menu-item key="logout" @click="handleLogout">
            <template #icon><logout-outlined /></template>
             {{ $t('sys.action.logout')}}
          </a-menu-item>
        </a-menu>
      </div>
    </template>
  </a-popover>
  <span v-else>
    <a-spin size="small" :style="{ marginLeft: 8, marginRight: 8 }" />
  </span>

  <ChangePasswordModal v-model:visible="state.showChangePassword" @callback="handlePwdCallback" />
</template>

<script lang="ts" setup>
defineOptions({
  name: 'AvatarDropdown'
})
import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAppStore } from 'lead-lib/store/app'
import { useConfigStore } from 'lead-lib/store/config'
import ChangePasswordModal from 'lead-lib/home/change-password'
import { useUserStore } from 'lead-lib/store/user'
const props = defineProps({
  currentUser: {
    type: Object,
    default: () => {}
  },
  menu: {
    type: Boolean,
    default: true
  }
})
const appStore = useAppStore()
const configStore = useConfigStore()
const enableInternational = computed(() => configStore.enableInternational)
const currentLang = computed(() => appStore.lang)
const languageList = computed(() => configStore.languageList)
const defaultAvatar =
  'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'

const router = useRouter()
const userStore = useUserStore()
const { t } = useI18n()

const state = reactive({
  showChangePassword: false,
  // 用户菜单属性 需要配置
  systemData: [
    {
      name: '工厂大脑-EPM',
      icon: 'EPM',
      url: 'https://www.baidu.com' // env.xxx
    },
    {
      name: '工厂大脑-SPC',
      icon: 'SPC',
      url: 'www.baidu.com' // env.xxx
    }
  ]
})
const handleLogout = () => {
  userStore.logoutAndJump().then(() => {
    // 登出之后 操作
  })
}
const handleChangePwd = () => {
  state.showChangePassword = true
}
const handlePwdCallback = (success) => {
  // 修改密码回调
}
const handleLanguageSelect = ({ key }) => {
  appStore.SET_LANG(key)
}
const handleToCenter = () => {
  router.push({ path: '/account/center' })
}
const handleToSettings = () => {
  router.push({ path: '/account/settings' })
}
</script>

<style lang="less">
body {
  @import './header-dropdown.less';
  .ant-pro-header-account-name {
    margin-left: 8px;
    vertical-align: center;
  }
  .ant-pro-header-account-avatar {
    margin: 12px 8px 12px 0;
    color: @primary-color;
    vertical-align: top;
    background: hsla(0, 0%, 100%, 0.85);
  }
  .frame-header-user-overlay {
    background: white;
    display: flex;
    flex-direction: column;
  }
  .frame-header-user-overlay-menu {
    border-right: 0px solid rgba(5, 5, 5, 0.06) !important;
  }
  .frame-header-user-popup {
    ::v-deep(.ant-popover-inner) {
      padding: 0px;
    }
  }
}
</style>
