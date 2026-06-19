import { useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  Pencil,
  Save,
  RotateCcw,
  Loader2,
  LayoutGrid,
  Plus,
  X,
  Cloud,
  CheckSquare,
  BarChart3,
  Zap,
  Calendar as CalIcon,
  Bell,
} from 'lucide-react'
import { useLayoutStore, type WidgetType } from '@/store/layoutStore'
import { widgetLabels } from '@/components/widgets'

const widgetIcons: Record<WidgetType, LucideIcon> = {
  weather: Cloud,
  todo: CheckSquare,
  stats: BarChart3,
  shortcuts: Zap,
  calendar: CalIcon,
  notifications: Bell,
}

const ALL_WIDGET_TYPES: WidgetType[] = [
  'weather',
  'todo',
  'stats',
  'shortcuts',
  'calendar',
  'notifications',
]

export default function Toolbar() {
  const { isEditing, isSaving, toggleEditing, saveLayout, resetLayout, addWidget } =
    useLayoutStore()
  const [showPicker, setShowPicker] = useState(false)

  const handleAdd = (type: WidgetType) => {
    addWidget(type)
    setShowPicker(false)
  }

  return (
    <div className="glass-toolbar sticky top-0 z-40 px-6 py-3">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center gap-3">
          <LayoutGrid size={22} className="text-amber-400" />
          <h1 className="font-display text-xl font-bold tracking-tight">
            自定义首页
          </h1>
          {isEditing && (
            <span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 text-xs font-medium text-amber-400">
              编辑中
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {!isEditing ? (
            <button className="btn-ghost flex items-center gap-2" onClick={toggleEditing}>
              <Pencil size={14} />
              编辑布局
            </button>
          ) : (
            <>
              <button
                className="btn-ghost flex items-center gap-2"
                onClick={() => setShowPicker(true)}
              >
                <Plus size={14} />
                添加组件
              </button>
              <button
                className="btn-ghost flex items-center gap-2"
                onClick={resetLayout}
                disabled={isSaving}
              >
                <RotateCcw size={14} />
                重置
              </button>
              <button
                className="btn-amber flex items-center gap-2"
                onClick={saveLayout}
                disabled={isSaving}
              >
                {isSaving ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Save size={14} />
                )}
                {isSaving ? '保存中...' : '保存布局'}
              </button>
            </>
          )}
        </div>
      </div>

      {showPicker && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50"
            onClick={() => setShowPicker(false)}
          />
          <div className="fixed left-1/2 top-1/2 z-50 w-[420px] max-w-[90vw] -translate-x-1/2 -translate-y-1/2">
            <div className="glass-card !rounded-2xl p-5 animate-bounce-in">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-display text-lg font-bold">添加组件</h2>
                <button
                  className="rounded-full p-1.5 text-slate-400 transition-colors hover:bg-white/10 hover:text-slate-200"
                  onClick={() => setShowPicker(false)}
                >
                  <X size={16} />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {ALL_WIDGET_TYPES.map((type) => {
                  const IconComp = widgetIcons[type]
                  return (
                    <button
                      key={type}
                      onClick={() => handleAdd(type)}
                      className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-left transition-all hover:border-amber-500/40 hover:bg-amber-500/10 hover:scale-[1.02]"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-500/15">
                        <IconComp size={20} className="text-amber-400" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-slate-200">
                          {widgetLabels[type]}
                        </div>
                        <div className="text-xs text-slate-500">
                          可重复添加多个
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
