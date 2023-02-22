import { App } from 'vue'
import { formatTime } from '@/utils/data-format'
export default function (app: App) {
  app.config.globalProperties.$filters = {
    formatTime(utcString: string, format: string) {
      return formatTime(utcString, format)
    }
  }
}
