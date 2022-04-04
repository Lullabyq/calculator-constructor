import { Stack } from '@mui/material'
import React from 'react'
import type { DraggableItemType } from '../../../ts/types'
import DraggableItem from '../../DndHelpers/DraggableItem/DraggableItem'
import DragCardContainer from '../../DndHelpers/DragCardContainer/DragCardContainer'

import styles from './SideBar.module.scss'
import DragContainer from '../../DndHelpers/DragContainer/DragContainer'

interface SidebarProps {
  items: DraggableItemType[],
  activeId: string | null
}

const SideBar = ({ items, activeId }: SidebarProps) => {
  return (
    <Stack spacing={'12px'}>
      {items.map(el => {
        if (el.isOnCanvas || el.id === activeId) {
          return (
            <DragContainer key={el.id}>
              <div className={styles.lockedCard}>
                { el.component }
              </div>
            </DragContainer>
          )
        }

        return (
          <DraggableItem id={el.id} key={el.id}>
            <DragCardContainer>
              { el.component }
            </DragCardContainer>
          </DraggableItem>
        )
        })}
    </Stack>
  )
}

export default SideBar
