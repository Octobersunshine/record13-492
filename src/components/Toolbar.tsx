import { Pencil, Save, RotateCcw, Loader2, LayoutGrid } from 'lucide-react'
import { useLayoutStore } from '@/store/layoutStore'

export default function Toolbar() {
  const { isEditing, isSaving, toggleEditing, saveLayout, resetLayout } =
    useLayoutStore()

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
    </div>
  )
}
