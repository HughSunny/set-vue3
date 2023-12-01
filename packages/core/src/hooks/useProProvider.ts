import type { RenderFunction, App, PropType, SetupContext, InjectionKey } from 'vue';
import { reactive, readonly, provide, inject, toRefs, defineComponent } from 'vue';
import { withInstall } from '@core/utils/withInstall';
export const injectProConfigKey: InjectionKey<ProProviderData> = Symbol();
import type { ContentWidth } from '@core/interface/IBaseLayout';
// 全局组件，provide  layout的样式 prefixCls和contentWidth，在子组件中 Inject 就可以使用
const defaultPrefixCls = 'ant-pro';
export interface ProProviderProps {
  prefixCls: string;
  contentWidth: ContentWidth;
}

export interface ProProviderData {
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string;
  contentWidth: ContentWidth;
}

export const defaultProProviderProps: ProProviderData = {
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => {
    if (customizePrefixCls) return customizePrefixCls;
    return `${defaultPrefixCls}-${suffixCls}`;
  },
  contentWidth: 'Fluid',
};

export const useProProvider = () => {
  return inject(injectProConfigKey, defaultProProviderProps);
};
