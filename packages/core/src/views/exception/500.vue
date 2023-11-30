<template>
  <a-result status="500" title="500" sub-title="抱歉，服务端报了一个异常。">
    <template #extra>
      <a-button type="primary" @click="toHome"> 返回首页 </a-button>
    </template>
  </a-result>
</template>

<script lang="ts">
export default {
  name: 'Exception500',
  computed: {
    subTitle() {
      return this.$route.query?.msg || '抱歉，服务端报了一个异常。';
    },
  },
  methods: {
    toHome() {
      this.$router.push({ path: '/' });
    },
  },
};
</script>
