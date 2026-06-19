import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  arrayMove,
} from '@dnd-kit/sortable'
import { useLayoutStore } from '@/store/layoutStore'
import SortableWidget from '@/components/SortableWidget'

export default function WidgetGrid() {
  const { layout, isEditing, reorderLayout } = useLayoutStore()

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      const oldIndex = layout.findIndex((item) => item.id === active.id)
      const newIndex = layout.findIndex((item) => item.id === over.id)
      reorderLayout(arrayMove(layout, oldIndex, newIndex))
    }
  }

  const sorted = [...layout].sort((a, b) => a.order - b.order)
  const ids = sorted.map((item) => item.id)

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={ids} strategy={undefined}>
        <div className="widget-grid">
          {sorted.map((item) => (
            <SortableWidget key={item.id} item={item} isEditing={isEditing} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}
