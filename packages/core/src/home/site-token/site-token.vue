<template>
  <slot></slot>
</template>
<script lang="ts" setup name="site-token-view">
defineOptions({
  name: 'SiteTokenView',
});
import { useSiteToken } from '@core/hooks';
useSiteToken();
</script>
