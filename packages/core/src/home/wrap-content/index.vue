<template>
  <a-layout-content :class="classNames">
    <slot />
  </a-layout-content>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs } from 'vue';
import { useProProvider } from 'lead-lib/components/pro-provider/index';

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