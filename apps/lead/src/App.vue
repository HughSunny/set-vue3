<template>
  <LeadApp></LeadApp>
</template>

<script setup lang="ts" name="App">
import { LeadApp } from '@xdc/core';
import { onMounted } from 'vue';
onMounted(() => {
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>App mounted');
});
</script>

<style lang="less" scoped></style>
