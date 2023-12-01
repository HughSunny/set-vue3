import type { VNode, Ref } from 'vue';

export type MenuTheme = 'dark' | 'light'

export type LayoutType = 'mix' | 'side' | 'left' | 'top'

export type ContentWidth = 'Fluid' | 'Fixed'

export type Breakpoint = 'xxxl' | 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';

export type MaybeRef<T> = T | Ref<T>;
