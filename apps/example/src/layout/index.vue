<template>
  <header>
    <h1>xhy</h1>
    <p>测试</p>
  </header>
  <router-view v-slot="{ Component, route }">
    <keep-alive v-if="route.meta.keepAlive !== false">
      <component :is="Component" :key="route.path"></component>
    </keep-alive>
    <component v-else :is="Component" :key="route.path"></component>
  </router-view>
</template>
<script>
import { defineComponent, toRef, reactive, computed } from 'vue';
export default defineComponent({
  name: 'mainLayout',
  components: {},
  setup() {
    return {};
  },
});
</script>
<style lang=""></style>
