import type { CSSProperties } from 'vue';
export type NoticeIconData = {
  avatar?: string;
  title?: string;
  description?: string;
  datetime?: string;
  extra?: string;
  style?: CSSProperties;
  key?: string | number;
  read?: boolean;
};

export type NoticeItem = {
  id: string;
  type: string;
  status: string;
} & NoticeIconData;

export { default } from './index.vue';
