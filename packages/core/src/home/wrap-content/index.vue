<template>
  <a-layout-content :class="classNames">
    <slot />
  </a-layout-content>
</template>

<script lang="ts" setup>
import { ref, toRefs } from 'vue';
import { useProProvider } from '@core/hooks';
defineOptions({ name: 'WrapContent' });
const { getPrefixCls } = toRefs(useProProvider());
const prefixCls = getPrefixCls.value('basicLayout');
const classNames = ref({
  [`${prefixCls}-content`]: true,
  [`${prefixCls}-has-header`]: true,
});
</script>
