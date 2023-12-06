<template>
  <a-dropdown class="ant-pro-dropdown ant-pro-dropdown-action" placement="bottomRight">
    <global-outlined style="font-size: 18px; margin-top: 4px" />
    <template #overlay>
      <a-menu class="ant-pro-dropdown-menu" :selected-keys="[currentLang]" @click="handleMenuClick">
        <!-- :disabled="!languageSupports[locale]" -->
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
  </a-dropdown>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import type { MenuProps } from 'ant-design-vue';

import { useAppStore, useConfigStore } from '@core/store';
const appStore = useAppStore();
const configStore = useConfigStore();
const languageList = computed(() => configStore.languageList);

const currentLang = computed(() => appStore.lang);

const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
  appStore.SET_LANG(key);
};
</script>
