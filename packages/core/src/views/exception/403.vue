<template>
  <a-result status="403" title="403" :sub-title="subTitle">
    <template #extra>
      <a-button type="primary" @click="toHome"> 返回首页 </a-button>
    </template>
  </a-result>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
defineOptions({
  name: 'Exception403Page',
});
const router = useRouter();
const route = useRoute();
const subTitle = computed(() => {
  return route.query?.msg || '抱歉，您没有权限访问这个页面。';
});
const toHome = () => {
  router.push({ path: '/' });
};
</script>
