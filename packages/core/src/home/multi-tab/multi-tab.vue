<template>
  <template v-if="cacheListLength">
    <div class="ant-pro-multi-tab-fixed" v-if="fixed"></div>
    <a-tabs
      type="editable-card"
      v-bind="$attrs"
      :activeKey="activeKey"
      :style="{
        margin: 0,
        paddingTop: '6px',
        width: sideWidth,
      }"
      hide-add
      :class="{ 'ant-pro-multi-tab-wrap': true, 'ant-pro-multi-tab-wrap-fixed': fixed }"
      @change="handleActiveKeyChange"
    >
      <template #rightExtra>
        <a-dropdown placement="bottomRight">
          <ellipsis-outlined
            :rotate="90"
            class="ant-dropdown-link ant-pro-multi-tab-dropdown-menu-btn"
          />
          <template #overlay>
            <a-menu>
              <a-menu-item
                key="close-other"
                @click="closeOther(route.path)"
                :disabled="cacheListLength === 1"
              >
                {{ $t('sys.route.closeOthers') }}
              </a-menu-item>
              <a-menu-item key="refresh" @click="handleReloadPage()">
                {{ $t('sys.route.reloadCurrentPage') }}</a-menu-item
              >
            </a-menu>
          </template>
        </a-dropdown>
      </template>
      <a-tab-pane
        class="contextmenu-wrap"
        :key="item.route.path"
        v-for="(item, index) in store.cacheList"
        :closable="false"
      >
        <template #tab>
          <a-dropdown :trigger="['contextmenu']">
            <span class="ant-pro-multi-tab-title">
              {{ item.tabTitle ? t(`${item.tabTitle}`) : t(`${item.route.meta.title}`) }}
              <reload-outlined
                v-if="store.current === item.route.path"
                class="ant-pro-multi-tab-reload-btn"
                @click="handleReloadPage(item.route.path)"
                :spin="spin"
              />
              <close-outlined
                v-if="cacheListLength > 1 && !item.lock"
                class="ant-pro-multi-tab-close-btn"
                @click="e => handleClose(e, item.route.path)"
              />
            </span>
            <template #overlay>
              <a-menu>
                <a-menu-item
                  :disabled="cacheListLength === 1"
                  key="close-other"
                  @click="closeOther(item.route.path)"
                >
                  {{ $t('sys.route.closeOthers') }}
                </a-menu-item>
                <a-menu-item
                  key="close-left"
                  :disabled="index === 0"
                  @click="closeLeft(item.route.path)"
                >
                  {{ $t('sys.route.closeLeft') }}
                </a-menu-item>
                <a-menu-item
                  :disabled="index + 1 === cacheListLength"
                  key="close-right"
                  @click="closeRight(item.route.path)"
                >
                  {{ $t('sys.route.closeRight') }}
                </a-menu-item>
                <a-menu-item @click="handleReloadPage(item.route.path)">{{
                  $t('sys.route.reloadCurrentPage')
                }}</a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </template>
      </a-tab-pane>
    </a-tabs>
  </template>
</template>

<script lang="ts" setup name="multi-tab">
import { ref, computed, inject } from 'vue';
import { ReloadOutlined, EllipsisOutlined, CloseOutlined } from '@ant-design/icons-vue';
import { useI18n } from 'vue-i18n';
import { injectMultiTabStore, useMultiTab } from './multi-tab-store';
import { injectMenuState } from '@core/hooks/useMenuState';
import { useRoute } from 'vue-router';

const props = withDefaults(defineProps<{ fixed?: boolean; defaultHomePage?: string }>(), {
  fixed: false,
  defaultHomePage: '/index', //Home
});
defineOptions({
  inheritAttrs: false,
});
const menuState = injectMenuState();
const store = injectMultiTabStore();
const cacheListLength = computed(() => (store ? store.cacheList.length : 0));
const route = useRoute();
const activeKey = computed(() => {
  const key =
    menuState.selectedKeys && menuState.selectedKeys.value[menuState.selectedKeys.value.length - 1];
  // console.log('TAB---------------------------------> activeKey', key)
  return key;
});
const isMobile = inject('isMobile', ref(false));
const sideWidth = computed(
  () =>
    (menuState.sideWidth &&
      menuState.sideWidth.value &&
      !isMobile.value &&
      props.fixed &&
      `calc(100% - ${menuState.sideWidth.value}px)`) ||
    '100%',
);
const { t } = useI18n();
const spin = ref(false);
const [{ refresh, close, closeLeft, closeRight, closeOther }] =
  useMultiTab(/*{ defaultHomePage: props.defaultHomePage }*/);

const handleActiveKeyChange = (key: string) => {
  menuState.selectedKeys!.value = [key];
};
const handleReloadPage = async (key?: string) => {
  spin.value = true;
  await refresh(key);
  spin.value = false;
};

const handleClose = (e: Event, target: string) => {
  close(target);
  e.stopPropagation();
};
</script>
