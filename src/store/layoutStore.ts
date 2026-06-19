import { create } from 'zustand'

export type WidgetType = 'weather' | 'todo' | 'stats' | 'shortcuts' | 'calendar' | 'notifications'

export interface LayoutItem {
  id: string
  type: WidgetType
  order: number
}

export interface LayoutTemplate {
  id: string
  name: string
  description: string
  layout: LayoutItem[]
}

interface LayoutState {
  layout: LayoutItem[]
  isEditing: boolean
  isLoading: boolean
  isSaving: boolean
  templates: LayoutTemplate[]
  isApplyingTemplate: boolean
  fetchLayout: () => Promise<void>
  saveLayout: () => Promise<void>
  resetLayout: () => Promise<void>
  reorderLayout: (newLayout: LayoutItem[]) => void
  toggleEditing: () => void
  setEditing: (value: boolean) => void
  addWidget: (type: WidgetType) => void
  removeWidget: (id: string) => void
  fetchTemplates: () => Promise<void>
  applyTemplate: (templateId: string) => Promise<void>
}

const DEFAULT_LAYOUT: LayoutItem[] = [
  { id: 'w1_weather', type: 'weather', order: 0 },
  { id: 'w2_todo', type: 'todo', order: 1 },
  { id: 'w3_stats', type: 'stats', order: 2 },
  { id: 'w4_shortcuts', type: 'shortcuts', order: 3 },
  { id: 'w5_calendar', type: 'calendar', order: 4 },
  { id: 'w6_notifications', type: 'notifications', order: 5 },
]

let idCounter = 1000

const generateId = (type: WidgetType): string => {
  idCounter += 1
  return `${type}_${Date.now()}_${idCounter}`
}

export const useLayoutStore = create<LayoutState>((set, get) => ({
  layout: DEFAULT_LAYOUT,
  isEditing: false,
  isLoading: true,
  isSaving: false,
  templates: [],
  isApplyingTemplate: false,

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

  addWidget: (type: WidgetType) => {
    set((state) => {
      const newId = generateId(type)
      const newItem: LayoutItem = {
        id: newId,
        type,
        order: state.layout.length,
      }
      return { layout: [...state.layout, newItem] }
    })
  },

  removeWidget: (id: string) => {
    set((state) => {
      const filtered = state.layout.filter((item) => item.id !== id)
      return {
        layout: filtered.map((item, index) => ({ ...item, order: index })),
      }
    })
  },

  fetchTemplates: async () => {
    try {
      const res = await fetch('/api/layout/templates')
      if (res.ok) {
        const data = await res.json()
        set({ templates: data.templates })
      }
    } catch {
    }
  },

  applyTemplate: async (templateId: string) => {
    const { templates } = get()
    const template = templates.find((t) => t.id === templateId)
    if (!template) return
    set({ isApplyingTemplate: true })
    try {
      const reordered = template.layout.map((item, index) => ({ ...item, order: index }))
      const res = await fetch('/api/layout', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ layout: reordered }),
      })
      if (res.ok) {
        const data = await res.json()
        set({ layout: data.layout, isApplyingTemplate: false, isEditing: false })
      } else {
        set({ isApplyingTemplate: false })
      }
    } catch {
      set({ isApplyingTemplate: false })
    }
  },
}))
