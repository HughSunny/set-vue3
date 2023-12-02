<template>
  <a-menu
    class="main-base-menu"
    :theme="theme"
    :mode="mode"
    :open-keys="openKeys"
    :selected-keys="selectedKeys"
    @openChange="handleOpenChange"
    @select="handleSelect"
    v-bind="dynamicProps"
    @mouseenter="$emit('mouseenter', $event)"
    @mouseleave="$emit('mouseleave', $event)"
  >
    <template v-for="menu in menus">
      <transform-vnode
        :key="menu.path"
        v-if="(!menu.children || menu.meta?.hideChildrenInMenu) && !menu.meta?.hideInMenu"
        :by="customItem"
        :opt="menu"
      >
        <a-menu-item @mouseenter="$emit('itemHover', { key: menu.path })" :key="menu.path">
          <template #icon>
            <template v-if="menu.meta.icon">
              <template v-if="menu.meta.icon.startsWith('fa')">
                <i style="color: white" :class="menu.meta.icon"></i>
              </template>
              <template v-else-if="menu.meta.icon.startsWith('x')">
                <!-- x 开头的图标 -->
                <UnorderedListOutlined />
              </template>
              <component v-else :is="menu.meta.icon" />
            </template>
            <template v-else-if="collapsed && menu.meta.collapsedIcon !== undefined">
              <component :is="menu.meta.collapsedIcon" />
            </template>
          </template>
          {{ $t(menu.meta.title) }}
        </a-menu-item>
      </transform-vnode>
      <template v-else-if="menu.children">
        <sub-menu
          :key="menu.path"
          @itemHover="$emit('itemHover', $event)"
          :menu="menu"
          :collapsed="collapsed"
        />
      </template>
    </template>
  </a-menu>
</template>

<script lang="ts">
import type { MenuProps, MenuTheme } from 'ant-design-vue';
import type { ComputedRef, PropType } from 'vue';
import { defineComponent, computed } from 'vue';
import { UnorderedListOutlined } from '@ant-design/icons-vue';
import { useI18n } from 'vue-i18n';
import type { RouteProps } from '@core/interface/IRouter';
import SubMenu from './sub-menu.vue';
import { TransformVnode } from '@core/components';

export function useRootSubmenuKeys(menus: RouteProps[]): ComputedRef<string[]> {
  return computed(() => menus.map(it => it.path));
}

export const BaseMenuProps = {
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
};

export default defineComponent({
  name: 'BaseMenu',
  props: { ...BaseMenuProps },
  emits: ['update:openKeys', 'update:selectedKeys', 'mouseenter', 'mouseleave', 'itemHover'],
  setup(props, { emit }) {
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
    return {
      t,
      isInline,
      dynamicProps,
      handleOpenChange,
      handleSelect,
      handleTest: () => {},
    };
  },
  components: {
    SubMenu,
    TransformVnode,
  },
});
</script>
<style scoped lang="less">
.main-base-menu {
  background: @menu-dark-bg;
  // ::deep(.ant-menu-dark .ant-menu-inline.ant-menu-sub) {

  :deep(.ant-menu-inline) {
    background: @menu-dark-sub-bg !important;
  }
}
</style>
