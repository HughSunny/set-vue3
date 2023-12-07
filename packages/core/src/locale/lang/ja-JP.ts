import antd from 'ant-design-vue/es/locale/ja_JP';
import dayjs from 'dayjs/locale/ja';

// antd dayjs 也需要
const locales = {
  localeName: 'jaJP',
  dayjsLocaleName: 'ja',
  antd,
  dayjs,
};
export default {
  ...locales,
};
