import { create } from 'zustand'

export type WidgetType = 'weather' | 'todo' | 'stats' | 'shortcuts' | 'calendar' | 'notifications'

export interface LayoutItem {
  id: string
  type: WidgetType
  order: number
}

interface LayoutState {
  layout: LayoutItem[]
  isEditing: boolean
  isLoading: boolean
  isSaving: boolean
  fetchLayout: () => Promise<void>
  saveLayout: () => Promise<void>
  resetLayout: () => Promise<void>
  reorderLayout: (newLayout: LayoutItem[]) => void
  toggleEditing: () => void
  setEditing: (value: boolean) => void
}

const DEFAULT_LAYOUT: LayoutItem[] = [
  { id: 'weather', type: 'weather', order: 0 },
  { id: 'todo', type: 'todo', order: 1 },
  { id: 'stats', type: 'stats', order: 2 },
  { id: 'shortcuts', type: 'shortcuts', order: 3 },
  { id: 'calendar', type: 'calendar', order: 4 },
  { id: 'notifications', type: 'notifications', order: 5 },
]

export const useLayoutStore = create<LayoutState>((set, get) => ({
  layout: DEFAULT_LAYOUT,
  isEditing: false,
  isLoading: true,
  isSaving: false,

  fetchLayout: async () => {
    set({ isLoading: true })
    try {
      const res = await fetch('/api/layout')
      if (res.ok) {
        const data = await res.json()
        set({ layout: data.layout, isLoading: false })
      } else {
        set({ layout: DEFAULT_LAYOUT, isLoading: false })
      }
    } catch {
      set({ layout: DEFAULT_LAYOUT, isLoading: false })
    }
  },

  saveLayout: async () => {
    const { layout } = get()
    set({ isSaving: true })
    try {
      const reordered = layout.map((item, index) => ({ ...item, order: index }))
      const res = await fetch('/api/layout', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ layout: reordered }),
      })
      if (res.ok) {
        const data = await res.json()
        set({ layout: data.layout, isEditing: false, isSaving: false })
      } else {
        set({ isSaving: false })
      }
    } catch {
      set({ isSaving: false })
    }
  },

  resetLayout: async () => {
    set({ isSaving: true })
    try {
      const res = await fetch('/api/layout', { method: 'DELETE' })
      if (res.ok) {
        const data = await res.json()
        set({ layout: data.layout, isEditing: false, isSaving: false })
      } else {
        set({ layout: DEFAULT_LAYOUT, isSaving: false })
      }
    } catch {
      set({ layout: DEFAULT_LAYOUT, isSaving: false })
    }
  },

  reorderLayout: (newLayout: LayoutItem[]) => {
    set({ layout: newLayout.map((item, index) => ({ ...item, order: index })) })
  },

  toggleEditing: () => {
    set((state) => ({ isEditing: !state.isEditing }))
  },

  setEditing: (value: boolean) => {
    set({ isEditing: value })
  },
}))
