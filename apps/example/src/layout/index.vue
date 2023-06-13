<template>
  <header>
    <h1>xhy</h1>
    <p>测试</p>
  </header>
  <!-- <router-view :key="$route.fullPath"></router-view> -->
  <router-view v-slot="{ Component }" :key="$route.fullPath">
    <transition name="why">
      <component :is="Component"></component>
    </transition>
  </router-view>
</template>
<script>
  import { defineComponent, toRef, reactive, computed } from 'vue';
  export default defineComponent({
    name: 'mainLayout',
    components: {
    },
    setup() {
      return {
      };
    },
  });
</script>
<style lang=""></style>
