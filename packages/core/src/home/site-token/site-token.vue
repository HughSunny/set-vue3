<template>
  <slot></slot>
</template>
<script lang="ts" setup name="site-token-view">
import useSiteToken from '@core/hooks/useSiteToken';
useSiteToken();
</script>
