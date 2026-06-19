import { Zap, Mail, Settings, Users, FileText, HelpCircle } from 'lucide-react'

const shortcuts = [
  { icon: Zap, label: '快速创建', color: 'text-amber-400' },
  { icon: Mail, label: '消息中心', color: 'text-blue-400' },
  { icon: Users, label: '团队空间', color: 'text-mint-400' },
  { icon: FileText, label: '文档库', color: 'text-purple-400' },
  { icon: Settings, label: '系统设置', color: 'text-slate-400' },
  { icon: HelpCircle, label: '帮助支持', color: 'text-pink-400' },
]

export default function ShortcutsWidget() {
  return (
    <div className="p-5">
      <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-amber-400">
        <Zap size={14} />
        快捷入口
      </div>
      <div className="grid grid-cols-3 gap-3">
        {shortcuts.map((item) => (
          <div
            key={item.label}
            className="flex flex-col items-center gap-2 rounded-xl p-3 transition-all duration-200 hover:scale-105 hover:bg-white/5 cursor-pointer"
          >
            <item.icon size={22} className={item.color} />
            <span className="text-center text-xs text-slate-400">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
