import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';
dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);
dayjs.extend(duration)
dayjs.extend(utc)

export default {
  install(Vue) {
    Vue.prototype.$dayjs = dayjs
  },
};
