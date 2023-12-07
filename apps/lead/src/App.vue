<template>
  <LeadApp></LeadApp>
</template>

<script setup lang="ts" name="App">
import { computed, onMounted } from 'vue';
import { LeadApp, useAppStore, useConfigStore, useUserStore } from '@xdc/core'; // useAppStore
import store from '@/store';
import { useAppTestStore } from './store/app';

defineOptions({
  name: 'LeadApplication',
});
const appTestStore = useAppTestStore();
console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>App setup appTestStore ', appTestStore);

const appStore = useAppStore();
console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>App setup appStore ', appStore);
const userStore = useUserStore();
console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>App userStore ', userStore.user);
const configStore = useConfigStore();
console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>App configStore ', configStore.sysName);

onMounted(() => {
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>App mounted');
});
</script>
