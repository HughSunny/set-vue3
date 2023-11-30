<template>
  <a-result status="403" title="403" :sub-title="subTitle">
    <template #extra>
      <a-button type="primary" @click="toHome"> 返回首页 </a-button>
    </template>
  </a-result>
</template>

<script lang="ts">
export default {
  name: 'Exception403',
  computed: {
    subTitle() {
      return this.$route.query?.msg || '抱歉，您没有权限访问这个页面。';
    },
  },
  methods: {
    toHome() {
      this.$router.push({ path: '/' });
    },
  },
};
</script>
