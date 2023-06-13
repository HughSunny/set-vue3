import { computed } from 'vue';
import dayjs from 'dayjs';

export default function useDateFormat() {
  const dateFormat = (date, format = 'YYYY-MM-DD HH:mm:ss') =>
    computed(() => {
      return dayjs(date).isValid() ? dayjs(date).format(format) : '';
    });

  return {
    dateFormat,
  };
}
