import { Calendar as CalIcon } from 'lucide-react'

const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六']

function getCalendarDays() {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()
  const today = now.getDate()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const days: (number | null)[] = []
  for (let i = 0; i < firstDay; i++) days.push(null)
  for (let i = 1; i <= daysInMonth; i++) days.push(i)
  return { days, today }
}

export default function CalendarWidget() {
  const { days, today } = getCalendarDays()
  const now = new Date()
  const monthStr = `${now.getFullYear()}年${now.getMonth() + 1}月`

  return (
    <div className="p-5">
      <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-amber-400">
        <CalIcon size={14} />
        日历
      </div>
      <div className="mb-3 font-display text-lg font-bold">{monthStr}</div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {WEEKDAYS.map((d) => (
          <div key={d} className="py-1 text-xs font-medium text-slate-500">
            {d}
          </div>
        ))}
        {days.map((day, i) => (
          <div
            key={i}
            className={`flex h-7 items-center justify-center text-xs ${
              day === today
                ? 'calendar-today'
                : day
                ? 'text-slate-300'
                : ''
            }`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  )
}
