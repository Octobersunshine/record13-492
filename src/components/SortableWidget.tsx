import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Trash2 } from 'lucide-react'
import type { LayoutItem } from '@/store/layoutStore'
import { useLayoutStore } from '@/store/layoutStore'
import { widgetComponents, widgetLabels } from '@/components/widgets'

interface SortableWidgetProps {
  item: LayoutItem
  isEditing: boolean
}

export default function SortableWidget({ item, isEditing }: SortableWidgetProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id, disabled: !isEditing })

  const removeWidget = useLayoutStore((s) => s.removeWidget)

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const WidgetComponent = widgetComponents[item.type]
  const label = widgetLabels[item.type]

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`glass-card ${isDragging ? 'glass-card-dragging' : ''} ${
        isEditing ? 'cursor-default' : ''
      }`}
    >
      {isEditing && (
        <div className="flex items-center justify-between border-b border-white/5 px-4 py-2">
          <div
            className="drag-handle flex items-center gap-2"
            {...attributes}
            {...listeners}
            style={{ opacity: 1 }}
          >
            <GripVertical size={16} className="text-amber-400" />
            <span className="text-xs font-medium text-slate-400">{label}</span>
          </div>
          <button
            onClick={() => removeWidget(item.id)}
            className="rounded-md p-1.5 text-slate-500 transition-colors hover:bg-red-500/15 hover:text-red-400"
            title="删除组件"
          >
            <Trash2 size={14} />
          </button>
        </div>
      )}
      <WidgetComponent />
    </div>
  )
}
