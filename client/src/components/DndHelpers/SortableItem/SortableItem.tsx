import React from 'react'
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities'
import DragContainer from '../DragContainer/DragContainer'


interface SortableItemProps {
  id: string,
  children: React.ReactNode
}

const SortableItem = ({ id, children }: SortableItemProps) => {
  const {
    setNodeRef,
    listeners,
    attributes,
    transition,
    transform,
  } = useSortable({ id })

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
    >
      <DragContainer>
        {children}
      </DragContainer>
    </div>
  )
}

export default SortableItem