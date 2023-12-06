<template>
  <notice-dropdown class="action" :count="userInfo && unreadCount" :loading="loading">
    <a-tabs v-model:activeKey="activeKey" class="xdc-header-notice-tab" centered>
      <template
        v-for="{ key, title, emptyText, showViewMore, showClear } in noticesConfig"
        :key="key"
      >
        <a-tab-pane v-if="key" :key="key" :tab="title">
          <notice-list
            :title="title"
            :count="unreadMsgs[key]"
            :list="noticeData[key]"
            :empty-text="emptyText"
            :show-view-more="showViewMore"
            :show-clear="showClear"
            @itemClick="handleWatchNotice"
            @clear="handleNoticeClear(title, key)"
            @viewMore="handleViewMore(key)"
          >
            <template #extra="notice">
              <a-tag
                v-if="notice.extra && notice.status"
                style="margin-right: 0"
                :color="color[notice.status]"
              >
                {{ notice.extra }}
              </a-tag>
              <template v-else>
                {{ notice.extra }}
              </template>
            </template>
          </notice-list>
        </a-tab-pane>
      </template>
    </a-tabs>
  </notice-dropdown>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, onBeforeUnmount } from 'vue';
import { message } from 'ant-design-vue';
import { groupBy } from 'lodash-es';
import { useUserStore } from '@core/store';
import NoticeDropdown from './notice-dropdown.vue';
import NoticeList from './notice-list.vue';
import type { NoticeItem } from './index';
// 如需要实时更新提醒通知，可以配置 realtime 为 true 打开该轮询，或者自行尝试配置 websocket 功能
// 注意：目前未读数量是通过 currentUSer 接口取回的，如果更改成实时，未读数量也建议更改成独立接口 或者 合并到 getNoticeData 中
const useFetchNotice = (getNoticeData: () => Promise<void>, realtime?: boolean) => {
  let interval: number;
  onMounted(() => {
    getNoticeData();
    if (realtime) {
      interval = window.setInterval(() => {
        getNoticeData();
      }, 5000);
    }
  });

  onBeforeUnmount(() => {
    clearInterval(interval);
  });
};
defineOptions({
  name: 'NoticeIcon',
});

const userStore = useUserStore();
const userInfo = computed(() => userStore.currentUser);
const unreadCount = computed(() => userStore.unreadCount);
const list = ref<NoticeItem[]>([]);
const loading = ref(true);
const activeKey = ref('notification');
const color = {
  todo: '',
  processing: 'blue',
  urgent: 'red',
  doing: 'gold',
};
const noticesConfig = ref([
  {
    key: 'notification',
    title: '通知',
    emptyText: '暂无通知消息',
    showViewMore: true,
    showClear: false,
  },
  {
    key: 'warning',
    title: '预警',
    emptyText: '暂无预警消息',
    showViewMore: true,
    showClear: false,
  },
  {
    key: 'alarm',
    title: '报警',
    emptyText: '暂无报警消息',
    showViewMore: true,
    showClear: false,
  },
]);
const getNoticeData = async () => {
  // const notices = await queryNotices();

  const notices = [
    {
      id: '000000001',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
      title: '你收到了一个通知',
      datetime: '2017-08-09',
      type: 'notification',
      extra: '进行中',
      status: 'processing',
    },
    {
      id: '000000006',
      title: '这是一条预警',
      description: '描述信息描述信息描述信息',
      datetime: '2017-08-07',
      type: 'warning',
      clickClose: true,
    },
    {
      id: '000000012',
      title: '这是一条报警',
      description: '冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务',
      // "extra": "进行中",
      // "status": "processing",
      type: 'alarm',
    },
  ];
  if (!notices || notices.length === 0 || !Array.isArray(notices)) {
    list.value = [];
  } else {
    const newNotices = notices.map(notice => {
      const newNotice = { ...notice };

      if (notice.datetime) {
        // newNotice.datetime = dayjs(notice.datetime)?.fromNow()
        // newNotice.datetime = dayjs('1999-01-01').fromNow()
      }

      if (newNotice.id) {
        newNotice.key = newNotice.id;
      }
      return newNotice;
    });
    list.value = newNotices;
  }
  loading.value = false;
};

const noticeData = computed(() => groupBy(list.value, 'type'));

const unreadMsgs = computed(() => {
  const unreadMsg: Record<string, number> = {};
  Object.keys(noticeData.value).forEach(key => {
    const value = noticeData.value[key];

    if (!unreadMsg[key]) {
      unreadMsg[key] = 0;
    }

    if (Array.isArray(value)) {
      unreadMsg[key] = value.filter(item => !item.read).length;
    }
  });
  return unreadMsg;
});

useFetchNotice(getNoticeData);

const handleWatchNotice = (clickedItem: NoticeItem) => {
  const { id } = clickedItem;
  const index = list.value.findIndex(item => item.id === id);
  list.value[index].read = true;
  list.value = [...list.value];
  userStore.setNotification({
    totalCount: list.value.length,
    unreadCount: list.value.filter(item => !item.read).length,
  });
  // 你应该通过接口告诉后端更改数据库数据
};
const handleViewMore = (key: string) => {
  message.info(`Click on view more ${key}`);
  //TODO: 跳转到通知中心
};
const handleNoticeClear = (title: string, key: string) => {
  message.success(`Emptied ${title}`);
  list.value = list.value.filter(item => item.type !== key);
  userStore.setNotification({
    totalCount: list.value.length,
    unreadCount: list.value.filter(item => !item.read).length,
  });
  // 你应该通过接口告诉后端更改数据库数据
};
</script>

<style lang="less" scoped>
.xdc-header-notice-tab :deep(.ant-tabs-nav-list) {
  .ant-tabs-tab {
    flex: 1;
    justify-content: center;
  }
}
</style>
