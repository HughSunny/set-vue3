<template>
  <a-dropdown
    class="ant-pro-dropdown ant-pro-dropdown-action"
    placement="bottomRight"
    :trigger="['click']"
    v-model:open="visible"
    overlayClassName="pro-components-header-notice-icon-index-container"
  >
    <span :class="['xdc-header-notice-noticeButton', { opened: visible }]">
      <a-badge :count="count" :style="{ boxShadow: 'none' }" class="xdc-header-notice-badge">
        <slot name="bell">
          <bell-outlined class="xdc-header-notice-icon" />
        </slot>
      </a-badge>
    </span>
    <template #overlay>
      <div>
        <a-spin :spinning="loading" :delay="300">
          <slot />
        </a-spin>
      </div>
    </template>
  </a-dropdown>
</template>
<script lang="ts" setup>
import type { SlotsType } from 'vue'
import { ref } from 'vue'
import { BellOutlined } from '@ant-design/icons-vue'
defineOptions({
  name: 'NoticeDropdown'
})
const props = defineProps({
  count: Number,
  loading: Boolean
})
const visible = ref(false)
</script>
