<template>
  <a-menu
    class="xdc-main-base-menu"
    :theme="theme"
    :mode="mode"
    :open-keys="openKeys"
    :selected-keys="selectedKeys"
    v-bind="dynamicProps"
    @openChange="handleOpenChange"
    @select="handleSelect"
    @mouseenter="$emit('mouseenter', $event)"
    @mouseleave="$emit('mouseleave', $event)"
  >
    <template v-for="menu in menus">
      <transform-vnode
        v-if="(!menu.children || menu.meta?.hideChildrenInMenu) && !menu.meta?.hideInMenu"
        :key="menu.path"
        :by="customItem"
        :opt="menu"
      >
        <a-menu-item :key="menu.path" @mouseenter="$emit('itemHover', { key: menu.path })">
          <template #icon>
            <template v-if="menu.meta?.icon">
              <template v-if="isFaIcon(menu.meta.icon)">
                <i style="color: white" :class="menu.meta.icon"></i>
              </template>
              <template v-else-if="isXIcon(menu.meta.icon)">
                <!-- x 开头的图标 -->
                <UnorderedListOutlined />
              </template>
              <component :is="menu.meta.icon" v-else />
            </template>
            <template v-else-if="collapsed && menu.meta?.collapsedIcon !== undefined">
              <component :is="menu.meta.collapsedIcon" />
            </template>
          </template>
          {{ $t(menu.meta?.title) }}
        </a-menu-item>
      </transform-vnode>
      <template v-else-if="menu.children">
        <XdcBaseSubmenu
          :key="menu.path"
          :menu="menu"
          :collapsed="collapsed"
          @itemHover="$emit('itemHover', $event)"
        />
      </template>
    </template>
  </a-menu>
</template>

<script lang="ts" setup>
import type { MenuProps, MenuTheme } from 'ant-design-vue';
import type { ComputedRef, PropType } from 'vue';
import { computed } from 'vue';
import { UnorderedListOutlined } from '@ant-design/icons-vue';
import { useI18n } from 'vue-i18n';
import type { RouteProps } from '@core/interface/IRouter';
import XdcBaseSubmenu from './sub-menu.vue';
import { TransformVnode } from '@core/components';

defineOptions({ name: 'BaseMenu' });
const props = defineProps({
  locale: {
    type: Boolean,
    default: false,
  },
  menus: {
    type: Array as PropType<RouteProps[]>,
    required: true,
  },
  // top-nav-header: horizontal
  mode: {
    type: String as PropType<MenuProps['mode']>,
    default: 'inline',
  },
  theme: {
    type: String as PropType<MenuTheme>,
    default: 'dark',
  },
  collapsed: {
    type: Boolean,
    default: false,
  },
  openKeys: {
    type: Array as PropType<string[]>,
    required: true,
  },
  selectedKeys: {
    type: Array as PropType<string[]>,
    required: true,
  },
  customItem: {
    type: Function,
    default: undefined,
  },
  underSider: Boolean,
});
const emit = defineEmits([
  'update:openKeys',
  'update:selectedKeys',
  'mouseenter',
  'mouseleave',
  'itemHover',
]);
const isFaIcon = icon => {
  if (icon && icon.startsWith('fa')) {
    return true;
  }
  return false;
};
const isXIcon = icon => {
  if (icon && icon.startsWith('x-')) {
    return true;
  }
  return false;
};

const { t } = useI18n();
const isInline = computed(() => props.mode === 'inline');
const dynamicProps = computed(() => {
  return isInline.value
    ? { [props.underSider ? 'collapsed' : 'inlineCollapsed']: props.collapsed }
    : {};
});
const handleOpenChange = (openKeys: string[]): void => {
  emit('update:openKeys', openKeys);
};
const handleSelect = (ctx: { [key: string]: any }): void => {
  // console.log('BaseMenu----------------------------------->handleSelect ', ctx.selectedKeys )
  emit('update:selectedKeys', ctx.selectedKeys);
};
</script>
