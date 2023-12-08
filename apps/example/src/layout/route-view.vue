<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" v-if="Component"></component>
    <slot v-else></slot>
  </router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'RouteView',
  components: {},
});
</script>
