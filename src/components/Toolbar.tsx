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
  Layers,
  Briefcase,
  LineChart,
  Home,
} from 'lucide-react'
import { useLayoutStore, type WidgetType, type LayoutTemplate } from '@/store/layoutStore'
import { widgetLabels } from '@/components/widgets'

const widgetIcons: Record<WidgetType, LucideIcon> = {
  weather: Cloud,
  todo: CheckSquare,
  stats: BarChart3,
  shortcuts: Zap,
  calendar: CalIcon,
  notifications: Bell,
}

const templateIcons: Record<string, LucideIcon> = {
  default: Home,
  productivity: Briefcase,
  analytics: LineChart,
  lifestyle: Cloud,
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
  const {
    isEditing,
    isSaving,
    isApplyingTemplate,
    templates,
    toggleEditing,
    saveLayout,
    resetLayout,
    addWidget,
    applyTemplate,
  } = useLayoutStore()
  const [showPicker, setShowPicker] = useState(false)
  const [showTemplates, setShowTemplates] = useState(false)

  const handleAdd = (type: WidgetType) => {
    addWidget(type)
    setShowPicker(false)
  }

  const handleApplyTemplate = (templateId: string) => {
    applyTemplate(templateId)
    setShowTemplates(false)
  }

  const getTypeCounts = (template: LayoutTemplate): Record<string, number> => {
    return template.layout.reduce((acc, item) => {
      acc[item.type] = (acc[item.type] || 0) + 1
      return acc
    }, {} as Record<string, number>)
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
            <>
              <button
                className="btn-ghost flex items-center gap-2"
                onClick={() => setShowTemplates(true)}
              >
                <Layers size={14} />
                应用模板
              </button>
              <button className="btn-ghost flex items-center gap-2" onClick={toggleEditing}>
                <Pencil size={14} />
                编辑布局
              </button>
            </>
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
                onClick={() => setShowTemplates(true)}
              >
                <Layers size={14} />
                应用模板
              </button>
              <button
                className="btn-ghost flex items-center gap-2"
                onClick={resetLayout}
                disabled={isSaving || isApplyingTemplate}
              >
                <RotateCcw size={14} />
                重置
              </button>
              <button
                className="btn-amber flex items-center gap-2"
                onClick={saveLayout}
                disabled={isSaving || isApplyingTemplate}
              >
                {isSaving || isApplyingTemplate ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Save size={14} />
                )}
                {isSaving ? '保存中...' : isApplyingTemplate ? '应用中...' : '保存布局'}
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

      {showTemplates && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50"
            onClick={() => setShowTemplates(false)}
          />
          <div className="fixed left-1/2 top-1/2 z-50 w-[480px] max-w-[90vw] -translate-x-1/2 -translate-y-1/2">
            <div className="glass-card !rounded-2xl p-5 animate-bounce-in">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-display text-lg font-bold">应用布局模板</h2>
                <button
                  className="rounded-full p-1.5 text-slate-400 transition-colors hover:bg-white/10 hover:text-slate-200"
                  onClick={() => setShowTemplates(false)}
                >
                  <X size={16} />
                </button>
              </div>
              <div className="space-y-3">
                {templates.map((template) => {
                  const IconComp = templateIcons[template.id] || Layers
                  const counts = getTypeCounts(template)
                  return (
                    <button
                      key={template.id}
                      onClick={() => handleApplyTemplate(template.id)}
                      disabled={isApplyingTemplate}
                      className="flex w-full items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 text-left transition-all hover:border-amber-500/40 hover:bg-amber-500/10"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-amber-500/15">
                        <IconComp size={24} className="text-amber-400" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-base font-semibold text-slate-200">
                          {template.name}
                        </div>
                        <div className="mt-1 flex flex-wrap gap-2 text-xs text-slate-400">
                          {Object.entries(counts).map(([type, count]) => (
                            <span
                              key={type}
                              className="rounded-full bg-white/5 px-2 py-0.5"
                            >
                              {widgetLabels[type as WidgetType]} ×{count}
                            </span>
                          ))}
                        </div>
                      </div>
                      {isApplyingTemplate && (
                        <Loader2 size={18} className="animate-spin text-amber-400" />
                      )}
                    </button>
                  )
                })}
                {templates.length === 0 && (
                  <div className="p-8 text-center text-sm text-slate-500">
                    暂无可用模板
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
