<template>
  <div
    :class="{
      [prefixedCls]: true,
      wide: wide,
    }"
  >
    <div :class="childClassNames">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'PageGridContent',
});
import { ref, computed, toRefs } from 'vue';
import { useProProvider } from '@core/hooks';
import { useRoute } from 'vue-router';
const props = defineProps({
  contentWidth: {
    type: String,
    default: () => undefined,
  },
  prefixCls: {
    type: String,
    default: () => undefined,
  },
  usePermission: {
    type: Boolean,
    default: () => false,
  },
});

const route = useRoute();
defineExpose({
  $route: route,
});
if (props.usePermission) {
}

const { getPrefixCls, contentWidth: proContentWidth } = toRefs(useProProvider());
const prefixedCls = props.prefixCls || getPrefixCls.value('grid-content');
const wide = computed(() => (props.contentWidth || proContentWidth?.value) === 'Fixed');

const childClassNames = ref(`${prefixedCls}-children`);
</script>

<style lang="less">
#app-body {
  @import url('./index.less');
}
</style>
