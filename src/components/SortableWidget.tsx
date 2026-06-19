import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical } from 'lucide-react'
import type { LayoutItem } from '@/store/layoutStore'
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
        <div
          className="drag-handle flex items-center gap-2 border-b border-white/5 px-4 py-2"
          {...attributes}
          {...listeners}
        >
          <GripVertical size={16} className="text-amber-400" />
          <span className="text-xs font-medium text-slate-400">{label}</span>
        </div>
      )}
      <WidgetComponent />
    </div>
  )
}
