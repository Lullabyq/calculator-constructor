import React from 'react'
import { DragOverlay as DndOverlay } from '@dnd-kit/core'
import { DraggableItemType } from '../../../ts/types'
import DragCardContainer from '../DragCardContainer/DragCardContainer'

interface DragOverlayProps {
  activeItem: DraggableItemType | null,
}

const DragOverlay = ({ activeItem }: DragOverlayProps) => {
  if (!activeItem || activeItem.isOnCanvas ) {
    return null
  }

  return (
    <DndOverlay>
      <DragCardContainer>
        { activeItem.component }
      </DragCardContainer>
    </DndOverlay>
  )
}

export default DragOverlay
