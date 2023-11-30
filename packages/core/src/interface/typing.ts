
import type { Ref } from 'vue';

export type Breakpoint = 'xxxl' | 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';

export type MaybeRef<T> = T | Ref<T>;
