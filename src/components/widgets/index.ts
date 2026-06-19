import type { WidgetType } from '@/store/layoutStore'
import WeatherWidget from './WeatherWidget'
import TodoWidget from './TodoWidget'
import StatsWidget from './StatsWidget'
import ShortcutsWidget from './ShortcutsWidget'
import CalendarWidget from './CalendarWidget'
import NotificationsWidget from './NotificationsWidget'

export const widgetComponents: Record<WidgetType, React.FC> = {
  weather: WeatherWidget,
  todo: TodoWidget,
  stats: StatsWidget,
  shortcuts: ShortcutsWidget,
  calendar: CalendarWidget,
  notifications: NotificationsWidget,
}

export const widgetLabels: Record<WidgetType, string> = {
  weather: '天气',
  todo: '待办事项',
  stats: '数据统计',
  shortcuts: '快捷入口',
  calendar: '日历',
  notifications: '通知',
}
