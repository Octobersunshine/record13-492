import { useEffect } from 'react'
import { useLayoutStore } from '@/store/layoutStore'
import Toolbar from '@/components/Toolbar'
import WidgetGrid from '@/components/WidgetGrid'

export default function Home() {
  const { isLoading, fetchLayout, fetchTemplates } = useLayoutStore()

  useEffect(() => {
    fetchLayout()
    fetchTemplates()
  }, [fetchLayout, fetchTemplates])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-amber-400 border-t-transparent" />
          <p className="text-sm text-slate-400">加载布局配置...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Toolbar />
      <main className="mx-auto max-w-7xl px-6 py-6">
        <WidgetGrid />
      </main>
    </div>
  )
}
