<template>
  <div v-if="!list || list.length === 0" class="xdc-header-notice-notFound">
    <img
      src="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
      alt="not found"
    />
    <div>{{ emptyText }}</div>
  </div>
  <div v-else>
    <a-list class="xdc-header-notice-list" :dataSource="list">
      <template #renderItem="{ item }">
        <a-list-item
          :class="{ item: true, read: item.read }"
          :key="item.key"
          @click="handleClick(item)"
        >
          <a-list-item-meta class="meta">
            <template v-if="item.avatar" #avatar>
              <a-avatar v-if="typeof item.avatar === 'string'" class="avatar" :src="item.avatar" />
              <span v-else class="iconElement">{{ item.avatar }}</span>
            </template>
            <template #title>
              <div class="title">
                {{ item.title }}
                <div class="extra">
                  <slot name="extra" v-bind="item">{{ item.extra }}</slot>
                </div>
              </div>
            </template>
            <template #description>
              <div>
                <div class="description">{{ item.description }}</div>
                <div class="datetime">{{ item.datetime }}</div>
              </div>
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
    </a-list>
  </div>
  <div v-if="showClear || showViewMore" class="xdc-header-notice-bottomBar">
    <div v-if="showClear" @click="$emit('clear')">{{ clearText }} {{ title }}</div>
    <div v-if="showViewMore" @click="$emit('viewMore')">
      {{ viewMoreText }}
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { NoticeItem } from './index';
defineOptions({ name: 'NoticeList' });
const props = defineProps({
  count: Number,
  showClear: Boolean,
  showViewMore: Boolean,
  list: Array,
  emptyText: String,
  clearText: {
    type: String,
    default: 'Empty',
  },
  viewMoreText: {
    type: String,
    default: 'See more',
  },
  title: String,
});
const emit = defineEmits(['itemClick', 'clear', 'viewMore']);

const handleClick = (item: NoticeItem) => {
  emit('itemClick', item);
};
</script>
