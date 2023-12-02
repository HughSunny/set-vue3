<template>
  <a-result status="500" title="500" :sub-title="subTitle">
    <template #extra>
      <a-button type="primary" @click="toHome"> 返回首页 </a-button>
    </template>
  </a-result>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
defineOptions({
  name: 'Exception500Page',
});
const router = useRouter();
const route = useRoute();
const subTitle = computed(() => {
  return route.query?.msg || '抱歉，服务端报了一个异常。';
});
const toHome = () => {
  router.push({ path: '/' });
};
</script>
