<template>
  <slot></slot>
</template>
<script lang="ts" setup name="site-token-view">
import useSiteToken from 'lead-lib/hooks/useSiteToken';
useSiteToken();
</script>