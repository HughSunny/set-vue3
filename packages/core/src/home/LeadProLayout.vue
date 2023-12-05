<template>
  <pro-provider :content-width="contentWidth">
    <a-layout class="ant-pro-basicLayout">
      <!-- 手机模式 -->
      <template v-if="isMobile">
        <a-drawer
          :bodyStyle="{ padding: 0, height: '100%' }"
          placement="left"
          :width="sideWidth"
          :closable="false"
          :open="!collapsed"
          @update:open="updateCollapsed"
        >
          <sider-menu
            style="height: 100%"
            :theme="theme"
            :layout="layout"
            :fixed="fixedSidebar"
            :menus="menus"
            :sider-width="sideWidth"
            :split-menus="false"
            :collapsed-button="false"
            :collapsed="false"
            v-model:open-keys="openKeys"
            v-model:selected-keys="selectedKeys"
          />
        </a-drawer>
      </template>
      <sider-menu
        v-else-if="!hasTopMenu"
        :theme="theme"
        :layout="layout"
        :fixed="fixedSidebar"
        :menus="menus"
        :sider-width="sideWidth"
        :split-menus="splitMenus"
        :collapsed-button="!splitMenus"
        v-model:collapsed="collapsed"
        v-model:open-keys="openKeys"
        v-model:selected-keys="selectedKeys"
      />
      <a-layout>
        <header-view
          :theme="theme"
          :layout="layout"
          :menus="menus"
          :sider-width="sideWidth"
          :has-sider-menu="hasSideMenu"
          :fixed-header="fixedHeader"
          :split-menus="splitMenus"
          v-model:collapsed="collapsed"
          v-model:open-keys="openKeys"
          v-model:selected-keys="selectedKeys"
        >
          <div style="text-align: right; margin-right: 16px">
            <notice-icon />
            <avatar-dropdown :current-user="currentUser" />
          </div>
        </header-view>
        <multi-tab-vue v-if="multiTab" :fixed="multiTabFixed" :sider-width="sideWidth" />
        <router-view v-slot="{ Component, route }">
          <wrap-content>
            <!-- <keep-alive v-if="route.meta.keepAlive !== false">
              <component :is="Component" :key="route.path"></component>
            </keep-alive> -->
            <!-- :key="route.path" key 由MultiTabStoreConsumer 管理 -->
            <component :is="Component"></component>
          </wrap-content>
        </router-view>
      </a-layout>
    </a-layout>
    <!-- <setting-drawer /> -->
  </pro-provider>
</template>

<script lang="ts">
import { defineComponent, computed, inject, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { default as AvatarDropdown } from './avatar-dropdown/index.vue'
import { default as WrapContent } from './wrap-content/index.vue'
import { default as HeaderView } from './header/index.vue'
import { default as SiderMenu } from './sider-menu/index.vue'
import { default as NoticeIcon } from './notice-icon/index.vue'
import { SelectLang} from '@core/components'

import { MultiTab as MultiTabVue } from './multi-tab'
import { injectMenuState } from '@core/hooks/useMenuState'
import { useUserStore } from '@core/store/user'
import { useConfigStore } from '@core/store/config'

export default defineComponent({
  name: 'LeadProLayout',
  setup() {
    const userStore = useUserStore()
    const { t } = useI18n()
    const menuState = injectMenuState()
    const isMobile = inject('isMobile', ref(false))
    const currentUser = computed(() => userStore.user)
    const configStore = useConfigStore()
    const enableInternational = computed(() => configStore.enableInternational)
    const hasSideMenu = computed(
      () => menuState.layout.value === 'side' || menuState.layout.value === 'left'
    )
    const hasTopMenu = computed(() => menuState.layout.value === 'top')
    const menus = computed(() => userStore.menuInfo.menus)
    return {
      t,
      currentUser,
      menus,
      ...menuState,
      hasSideMenu,
      hasTopMenu,
      isMobile,
      enableInternational
    }
  },
  components: {
    MultiTabVue,
    WrapContent,
    HeaderView,
    SiderMenu,
    SelectLang,
    AvatarDropdown,
    NoticeIcon
  }
})
</script>
