<template>
  <a-sub-menu v-if="!menu.meta?.hideInMenu" :key="menu.path" class="xdc-main-base-submenu">
    <template #icon>
      <template v-if="menu.meta.icon">
        <template v-if="menu.meta.icon.startsWith('fa')">
          <i style="color: white" :class="menu.meta.icon"></i>
        </template>
        <template v-else-if="menu.meta.icon.startsWith('x')">
          <!-- x 开头的图标 -->
          <UnorderedListOutlined />
        </template>
        <!-- <div v-else> {{ menu.meta.icon }}</div> -->
        <component :is="menu.meta.icon" v-else />
      </template>

      <component
        :is="menu.meta.collapsedIcon"
        v-else-if="collapsed && menu.meta.collapsedIcon !== undefined"
        :key="menu.meta.collapsedIcon"
      />
    </template>
    <template #title>
      <!-- {{ menu.meta.title }} -->
      {{ $t(menu.meta.title) }}
    </template>
    <template v-for="child in menu.children">
      <a-menu-item
        v-if="(!child.children || child.meta?.hideChildrenInMenu) && !child.meta?.hideInMenu"
        :key="child.path"
        @mouseenter="$emit('itemHover', { key: child.path })"
      >
        <template #icon>
          <template v-if="child.meta.icon">
            <template v-if="child.meta.icon.startsWith('fa')">
              <i style="color: white" :class="child.meta.icon"></i>
            </template>

            <component :is="child.meta.icon" v-else />
          </template>
          <component
            :is="child.meta.collapsedIcon"
            v-else-if="collapsed && child.meta.collapsedIcon !== undefined"
            :key="child.meta.collapsedIcon"
          />
        </template>
        {{ $t(`${child.meta.title}`) }}
        <!-- {{ $t('1234') }} 11 -->
      </a-menu-item>
      <template v-else>
        <XdcBaseSubmenu :key="child.path" :menu="child" :collapsed="collapsed" />
      </template>
    </template>
  </a-sub-menu>
</template>

<script lang="ts" name="XdcBaseSubmenu" setup>
defineOptions({
  name: 'XdcBaseSubmenu',
});
import { useI18n } from 'vue-i18n';
import { UnorderedListOutlined } from '@ant-design/icons-vue';
defineProps({
  menu: {
    type: Object,
    required: true,
  },
  collapsed: {
    type: Boolean,
    default: false,
  },
});
defineEmits(['itemHover']);
const { t } = useI18n();
</script>
