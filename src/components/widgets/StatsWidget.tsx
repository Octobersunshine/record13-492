import { BarChart3 } from 'lucide-react'

const stats = [
  { label: '用户', value: 12480, color: 'bg-amber-500', pct: 85 },
  { label: '收入', value: '¥28.6K', color: 'bg-mint-400', pct: 72 },
  { label: '订单', value: 1842, color: 'bg-blue-400', pct: 60 },
  { label: '转化率', value: '3.2%', color: 'bg-purple-400', pct: 45 },
]

export default function StatsWidget() {
  return (
    <div className="p-5">
      <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-amber-400">
        <BarChart3 size={14} />
        数据统计
      </div>
      <div className="mb-4 font-display text-2xl font-bold">本月概览</div>
      <div className="space-y-4">
        {stats.map((stat) => (
          <div key={stat.label}>
            <div className="mb-1.5 flex items-center justify-between text-sm">
              <span className="text-slate-400">{stat.label}</span>
              <span className="font-semibold text-slate-200">{stat.value}</span>
            </div>
            <div className="stat-bar h-2">
              <div
                className={`stat-fill h-full ${stat.color}`}
                style={{ width: `${stat.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
