import { Bell } from 'lucide-react'

const notifications = [
  { id: 1, title: '系统更新完成', time: '2分钟前', unread: true },
  { id: 2, title: '新成员加入了团队', time: '15分钟前', unread: true },
  { id: 3, title: '报表已生成', time: '1小时前', unread: false },
  { id: 4, title: '服务器维护通知', time: '3小时前', unread: false },
  { id: 5, title: '权限变更审批', time: '昨天', unread: false },
]

export default function NotificationsWidget() {
  return (
    <div className="p-5">
      <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-amber-400">
        <Bell size={14} />
        通知
      </div>
      <div className="mb-3 flex items-center justify-between">
        <span className="font-display text-2xl font-bold">
          {notifications.filter((n) => n.unread).length}
        </span>
        <span className="text-xs text-slate-400">未读消息</span>
      </div>
      <div className="space-y-2">
        {notifications.map((n) => (
          <div
            key={n.id}
            className="flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-white/5"
          >
            <div className="mt-1.5 flex-shrink-0">
              {n.unread && <div className="notification-dot" />}
              {!n.unread && <div className="h-2 w-2 rounded-full bg-slate-600" />}
            </div>
            <div className="min-w-0 flex-1">
              <div className={`text-sm ${n.unread ? 'text-slate-200' : 'text-slate-400'}`}>
                {n.title}
              </div>
              <div className="text-xs text-slate-500">{n.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
