<template>
  <a-layout-content :class="classNames">
    <slot />
  </a-layout-content>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs } from 'vue';
import { useProProvider } from '@core/hooks';

export default defineComponent({
  name: 'WrapContent',
  setup() {
    const { getPrefixCls } = toRefs(useProProvider());
    const prefixCls = getPrefixCls.value('basicLayout');
    const classNames = ref({
      [`${prefixCls}-content`]: true,
      [`${prefixCls}-has-header`]: true,
    });
    return {
      classNames,
    };
  },
});
</script>
