import antd from 'ant-design-vue/es/locale/zh_TW'
import dayjs from 'dayjs/locale/zh-tw'

// antd dayjs 也需要中文化
const locales = {
  localeName: 'zhTW',
  dayjsLocaleName: 'zh-cn',
  antd,
  dayjs
}
export default {
  ...locales
}