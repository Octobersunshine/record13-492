import { Cloud, Sun, Droplets, Wind } from 'lucide-react'

export default function WeatherWidget() {
  return (
    <div className="relative overflow-hidden p-5">
      <div className="absolute -right-4 -top-4 opacity-10">
        <Sun size={100} strokeWidth={1} />
      </div>
      <div className="relative z-10">
        <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-amber-400">
          <Cloud size={14} />
          天气
        </div>
        <div className="mb-1 font-display text-4xl font-bold">23°</div>
        <div className="mb-4 text-sm text-slate-400">多云 · 北京</div>
        <div className="grid grid-cols-3 gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Droplets size={12} className="text-blue-400" />
            <span>62%</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Wind size={12} className="text-mint-400" />
            <span>12km/h</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Sun size={12} className="text-amber-400" />
            <span>UV 3</span>
          </div>
        </div>
      </div>
    </div>
  )
}
