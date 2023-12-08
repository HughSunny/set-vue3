<template>
  <div :class="classNames">
    <!-- 231013 去掉前面的图标 文字最好放在后面 -->
    <!-- <span v-if="isMobile" :class="`${baseClassName}-logo`">
      <router-link :to="{ name: 'IndustryPlatformHome' }">
        <img :src="appLogo" alt="logo" style="height: 48px;"/>
      </router-link>
    </span> -->
    <div
      id="header-collapsed-button"
      v-if="isMobile || collapsedButton"
      :class="`${baseClassName}-collapsed-button`"
    >
      <slot name="collapsedButton">
        <menu-unfold-outlined @click="handleClick" v-if="collapsed" />
        <menu-fold-outlined @click="handleClick" v-else />
      </slot>
    </div>
    <div v-if="layout === 'mix' && !isMobile" :class="`${baseClassName}-logo`">
      <router-link :to="{ name: 'IndustryPlatformHome' }">
        <img :src="appLogo" alt="logo" style="height: 48px" />
        <h1>{{ appName }}</h1>
      </router-link>
    </div>
    <!-- 231013 Mobile下添加appName -->
    <div :class="`${baseClassName}-logo`" v-else>
      <router-link :to="{ name: 'IndustryPlatformHome' }">
        <h1>{{ appName }}</h1>
      </router-link>
    </div>
    <div :style="{ flex: 1 }">
      <slot />
    </div>
    <slot name="rightContent" />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { AppConfig } from '@core/bo';
import { useConfigStore } from '@core/store';
defineOptions({
  name: 'GlobalHeader',
});
const props = defineProps({
  prefixCls: {
    type: String,
    default: 'ant-pro',
  },
  layout: {
    type: String,
    default: 'side',
  },
  theme: {
    type: String,
    default: 'dark',
  },
  isMobile: {
    type: Boolean,
    default: () => false,
  },
  collapsed: {
    type: Boolean,
  },
  collapsedButton: {
    type: Boolean,
    default: () => true,
  },
});
const emit = defineEmits(['collapse']);
const baseClassName = `${props.prefixCls}-global-header`;
const classNames = ref({
  [baseClassName]: true,
  [`${baseClassName}-layout-${props.layout}`]: props.layout,
});
const isSide = computed(() => props.layout === 'side');
const isLeft = computed(() => props.layout === 'left');
const handleClick = (): void => {
  emit('collapse', !props.collapsed);
};
const configStore = useConfigStore();
const appName = computed(() => {
  return configStore.sysName || AppConfig.sysName;
});
const appLogo = computed(() => {
  return configStore.sysLogo || '/image/logo.png';
});
</script>
