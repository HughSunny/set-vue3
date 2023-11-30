<template>
  <a-result status="404" title="404" :sub-title="subTitle">
    <template #extra>
      <a-button type="primary" @click="toHome"> 返回首页 </a-button>
    </template>
  </a-result>
</template>

<script lang="ts">
export default {
  name: 'Exception404',
  computed: {
    subTitle() {
      return this.$route.query?.msg || '抱歉，您访问的这个页面不存在。';
    },
  },
  methods: {
    toHome() {
      this.$router.push({ path: '/' });
    },
  },
};
</script>
