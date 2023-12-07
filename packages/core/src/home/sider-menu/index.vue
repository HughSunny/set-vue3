<template>
  <template v-if="computedMenus.length">
    <div
      v-if="fixed"
      class="ant-pro-fixed-stuff"
      :style="{
        width: `${runtimeSideWidth}px`,
        overflow: 'hidden',
      }"
    />
    <a-layout-sider
      v-bind="$attrs"
      :class="{
        [currentPrefixCls]: true,
        [`${currentPrefixCls}-${runtimeTheme}`]: true,
        [`${currentPrefixCls}-${layout}`]: true,
        [`${currentPrefixCls}-fixed`]: fixed,
      }"
      :breakpoint="breakpoint"
      :width="runtimeSideWidth"
      :collapsed="collapsed"
      :collapsible="false"
      :collapsed-width="collapsedWidth"
      :theme="runtimeTheme"
      :style="{
        overflow: 'hidden',
        paddingTop: isMix ? `${headerHeight}px` : undefined,
      }"
    >
      <div v-if="!isMix" class="ant-pro-sider-logo">
        <router-link :to="{ name: 'IndustryPlatformHome' }">
          <img :src="appLogo" alt="logo" style="height: 48px" />
          <!-- <h1 v-if="!collapsed">{{ appName }}</h1> -->
        </router-link>
      </div>
      <div style="flex: 1; overflow: hidden auto">
        <slot name="header" />
        <base-menu
          :theme="runtimeTheme"
          :menus="computedMenus"
          :collapsed="collapsed"
          :selected-keys="selectedKeys"
          :open-keys="openKeys"
          @update:openKeys="handleOpenKeys"
          @update:selectedKeys="handleSelectedKeys"
          @mouseenter="$emit('mouseenter', $event)"
          @mouseleave="$emit('mouseleave', $event)"
          @itemHover="$emit('itemHover', $event)"
          :customItem="customItem"
          under-sider
        />
      </div>
      <div :class="`${currentPrefixCls}-links`">
        <a-menu
          v-if="collapsedButton"
          :class="`${currentPrefixCls}-link-menu`"
          :inline-indent="16"
          :theme="runtimeTheme"
          :selected-keys="[]"
          :open-keys="[]"
          mode="inline"
        >
          <a-menu-item
            key="collapsed-button"
            :class="`${currentPrefixCls}-collapsed-button`"
            :title="undefined"
            @click="handleCollapse"
          >
            <template #icon>
              <slot name="collapsedButton">
                <menu-unfold-outlined v-if="collapsed" />
                <menu-fold-outlined v-else />
              </slot>
            </template>
          </a-menu-item>
        </a-menu>
      </div>
    </a-layout-sider>
  </template>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import { useRoute } from 'vue-router';
import { computed, toRefs } from 'vue';
import type { MenuTheme, MenuProps } from 'ant-design-vue';
import { useProProvider } from '@core/components/pro-provider/index';
import BaseMenu from '@core/home/base-menu/index.vue';
import { findMenuChildren } from '@core/utils/menu-util';
import type { LayoutType, Breakpoint } from '@core/interface/IBaseLayout';
import { AppConfig } from '@core/bo';
import { useConfigStore } from '@core/store';
import type { RouteProps } from '@core/interface/IRouter';

const emit = defineEmits([
  'update:openKeys',
  'update:selectedKeys',
  'update:collapsed',
  'mouseenter',
  'mouseleave',
  'itemHover',
]);
const props = defineProps({
  locale: {
    type: Boolean,
    default: false,
  },
  menus: {
    type: Array as PropType<RouteProps[]>,
    required: true,
  },
  mode: {
    type: String as PropType<MenuProps['mode']>,
    default: 'inline',
  },
  openKeys: {
    type: Array as PropType<string[]>,
    required: true,
  },
  selectedKeys: {
    type: Array as PropType<string[]>,
    required: true,
  },

  underSider: Boolean,
  prefixCls: {
    type: String,
    default: () => undefined,
  },
  breakpoint: {
    type: String as PropType<Breakpoint>,
    default: 'lg',
  },
  siderWidth: {
    type: Number,
    default: 208,
  },
  splitMenus: {
    type: Boolean,
    default: false,
  },
  collapsedButton: {
    type: Boolean,
    default: () => true,
  },
  collapsedWidth: {
    type: Number,
    default: 48,
  },
  headerHeight: {
    type: Number,
    default: 48,
  },
  theme: {
    type: String as PropType<MenuTheme>,
    default: () => undefined,
  },
  layout: {
    type: String as PropType<LayoutType>,
    default: 'side',
  },
  fixed: {
    type: Boolean,
    default: () => false,
  },
  collapsible: {
    type: Boolean,
    default: false,
  },
  collapsed: {
    type: Boolean,
    default: false,
  },
  customItem: {
    type: Function,
    default: undefined,
  },
});

const { layout, collapsed, collapsedWidth, siderWidth, splitMenus } = toRefs(props);
const route = useRoute();
const { getPrefixCls } = useProProvider();
const currentPrefixCls = computed(() => props.prefixCls || getPrefixCls('sider'));
const isMix = computed(() => layout.value === 'mix');
const runtimeTheme = computed(() => props.theme);
const runtimeSideWidth = computed(() =>
  collapsed.value ? collapsedWidth.value : siderWidth.value,
);
const computedMenus = computed(() =>
  splitMenus.value ? findMenuChildren(props.menus, route.matched[1].name) : props.menus,
);

const handleSelectedKeys = (selectedKeys: string[]): void => {
  emit('update:selectedKeys', selectedKeys);
};
const handleOpenKeys = (openKeys: string[]): void => {
  emit('update:openKeys', openKeys);
};
const handleCollapse = () => {
  emit('update:collapsed', !collapsed.value);
};
const configStore = useConfigStore();
const appName = computed(() => {
  return configStore.sysName || AppConfig.sysName;
});
const appLogo = computed(() => {
  return configStore.sysLogo || '/image/logo.png';
});
</script>
