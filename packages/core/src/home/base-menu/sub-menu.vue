<template>
  <a-sub-menu v-if="!menu.meta?.hideInMenu" :key="menu.path" class="main-layout-submenu">
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
        <component v-else :is="menu.meta.icon" />
      </template>

      <component
        v-else-if="collapsed && menu.meta.collapsedIcon !== undefined"
        :is="menu.meta.collapsedIcon"
        :key="menu.meta.collapsedIcon"
      />
    </template>
    <template #title>
      <!-- {{ menu.meta.title }} -->
      {{ $t(menu.meta.title) }}
    </template>
    <template v-for="child in menu.children">
      <a-menu-item
        @mouseenter="$emit('itemHover', { key: child.path })"
        v-if="(!child.children || child.meta?.hideChildrenInMenu) && !child.meta?.hideInMenu"
        :key="child.path"
      >
        <template #icon>
          <template v-if="child.meta.icon">
            <template v-if="child.meta.icon.startsWith('fa')">
              <i style="color: white" :class="child.meta.icon"></i>
            </template>

            <component v-else :is="child.meta.icon" />
          </template>
          <component
            v-else-if="collapsed && child.meta.collapsedIcon !== undefined"
            :is="child.meta.collapsedIcon"
            :key="child.meta.collapsedIcon"
          />
        </template>
        {{ $t(`${child.meta.title}`) }}
        <!-- {{ $t('1234') }} 11 -->
      </a-menu-item>
      <template v-else>
        <sub-menu :menu="child" :key="child.path" :collapsed="collapsed" />
      </template>
    </template>
  </a-sub-menu>
</template>

<script lang="ts" name="SubMenu" setup>
import { useI18n } from 'vue-i18n'
import { UnorderedListOutlined } from '@ant-design/icons-vue'
defineProps({
  menu: {
    type: Object,
    required: true
  },
  collapsed: {
    type: Boolean,
    default: false
  }
})
defineEmits(['itemHover'])
const { t } = useI18n()
</script>

<style scoped></style>
