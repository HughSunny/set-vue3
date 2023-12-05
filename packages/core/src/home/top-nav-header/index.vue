<template>
  <div :class="classNames">
    <div ref="headRef" :class="headerClassName" :style="headerStyle">
      <div :class="`${prefixedClassName}-main-left`" @click="handleMenuHeaderClick">
        <div :class="`${prefixedClassName}-logo`" key="logo" id="logo">
          <slot v-if="hasLogoSlot" name="logo" />
          <div v-else>
            <router-link :to="{ name: 'IndustryPlatformHome' }">
              <img :src="appLogo" alt="logo" style="height: 48px" />
              <!-- <h1>{{ appName }}</h1> -->
            </router-link>
          </div>
        </div>
      </div>
      <div :style="{ flex: 1 }" :class="`${prefixedClassName}-menu`">
        <!-- 头部菜单 忽略 -->
        <base-menu
          v-if="menus && menus.length > 0"
          mode="horizontal"
          :theme="theme"
          :menus="menus"
          :open-keys="openKeys"
          :selected-keys="selectedKeys"
          @update:openKeys="handleOpenKeys"
          @update:selectedKeys="handleSelectedKeys"
        />

        <h2 style="color: white; text-align: center">{{ appName }}</h2>
      </div>
      <right-content>
        <slot name="rightContent" />
      </right-content>
    </div>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, computed, toRefs } from 'vue';
import type { MenuTheme } from 'ant-design-vue';
import { useProProvider } from '@core/hooks';
import type { RouteProps } from '@core/interface/IRouter';
import BaseMenu from '@core/home/base-menu/index.vue';
import { AppConfig } from '@core/bo';
import RightContent from './right-content.vue';
import { useConfigStore } from '@core/store/config';

export default defineComponent({
  props: {
    prefixCls: {
      type: String,
      default: undefined,
    },
    layout: {
      type: String,
      default: 'side',
    },
    theme: {
      type: String as PropType<MenuTheme>,
      default: 'dark',
    },
    contentWidth: {
      type: String,
      default: 'Fluid',
    },

    // menu
    menus: {
      type: Array as PropType<RouteProps[]>,
      default: () => [],
    },
    openKeys: {
      type: Array as PropType<string[]>,
      required: true,
    },
    selectedKeys: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },
  emits: ['update:openKeys', 'update:selectedKeys'],
  setup(props, { slots, emit }) {
    const { theme, contentWidth, prefixCls: customizePrefixCls } = toRefs(props);
    const { getPrefixCls } = useProProvider();
    const prefixedClassName = customizePrefixCls.value || getPrefixCls('top-nav-header');
    const hasMix = computed(() => props.layout === 'mix');
    const classNames = computed(() => {
      console.log('------------------->', prefixedClassName);
      return {
        [prefixedClassName]: true,
        ['light']: theme.value === 'light',
      };
    });
    const headerClassName = computed(() => {
      return {
        [`${prefixedClassName}-main`]: true,
        ['wide']: contentWidth.value === 'Fixed',
      };
    });
    const { logo: hasLogoSlot } = slots;

    /** events */
    const handleSelectedKeys = (selectedKeys: string[]): void => {
      emit('update:selectedKeys', selectedKeys);
    };
    const handleOpenKeys = (openKeys: string[]): void => {
      emit('update:openKeys', openKeys);
    };
    const handleMenuHeaderClick = (): void => {};
    const configStore = useConfigStore();
    const appName = computed(() => {
      return configStore.sysName || AppConfig.sysName;
    });
    const appLogo = computed(() => {
      return configStore.sysLogo; // || '/image/logo.png';
    });
    const headerStyle = computed(() => {
      if (configStore.headerImage) {
        return {
          background: `url(${configStore.headerImage})`,
        };
      } else {
        return null;
      }
    });
    return {
      classNames,
      headerClassName,
      prefixedClassName,
      hasMix,
      hasLogoSlot,

      handleSelectedKeys,
      handleOpenKeys,
      handleMenuHeaderClick,
      appName,
      appLogo,
      headerStyle,
    };
  },
  components: {
    BaseMenu,
    RightContent,
  },
});
</script>
