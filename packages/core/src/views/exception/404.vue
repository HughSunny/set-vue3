<template>
  <a-result status="404" title="404" :sub-title="subTitle">
    <template #extra>
      <a-button type="primary" @click="toHome"> 返回首页 </a-button>
    </template>
  </a-result>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
defineOptions({
  name: 'Exception404Page',
});
const router = useRouter();
const route = useRoute();
const subTitle = computed(() => {
  return route.query?.msg || '抱歉，您访问的这个页面不存在。';
});
const toHome = () => {
  router.push({ path: '/' });
};
</script>
