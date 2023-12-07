<template>
  <slot></slot>
</template>
<script lang="ts" setup name="SiteTokenView">
defineOptions({
  name: 'SiteTokenView',
});
import { useSiteToken } from '@core/hooks';
const { mergedToken } = useSiteToken();
</script>
