<template>
  <slot />
</template>
<script lang="ts">
import type { RenderFunction, App, PropType, SetupContext, InjectionKey } from 'vue';
import { reactive, readonly, provide, inject, toRefs, defineComponent } from 'vue';
import type { ContentWidth } from '@core/interface/IBaseLayout';
import { injectProConfigKey } from '@core/hooks/useProProvider';
export default defineComponent({
  name: 'ProProvider',
  props: {
    prefixCls: {
      type: String as PropType<string>,
      default: 'ant-pro',
    },
    contentWidth: {
      type: String as PropType<ContentWidth>,
      default: 'Fluid',
    },
  },
  setup(props, { slots }: SetupContext): RenderFunction | void {
    const { contentWidth } = toRefs(props);
    const getPrefixCls = (suffixCls = '', customizePrefixCls?: string) => {
      if (customizePrefixCls) return customizePrefixCls;
      return suffixCls ? `${props.prefixCls}-${suffixCls}` : props.prefixCls;
    };

    const proConfigProvider = reactive({
      contentWidth,
      getPrefixCls,
    });

    provide(injectProConfigKey, readonly(proConfigProvider));
  },
});
</script>
