import { useDraggable } from '@dnd-kit/core'
import React from 'react'
import { CSS } from '@dnd-kit/utilities'

import DragContainer from '../DragContainer/DragContainer'

interface DraggableItemProps {
  id: string,
  children: React.ReactNode
}

const DraggableItem = ({ id, children }: DraggableItemProps) => {
  const { setNodeRef, listeners, attributes, transform,} = useDraggable({ id })

  return (
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        style={{
          transform: CSS.Translate.toString(transform),
        }}
      >
        <DragContainer>
          { children }
        </DragContainer>
      </div>
  )
}

export default DraggableItem