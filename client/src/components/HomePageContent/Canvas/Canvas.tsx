import React from 'react'
import { Box, Typography } from '@mui/material'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useDroppable } from '@dnd-kit/core'
import classNames from 'classnames'

import styles from './Canvas.module.scss'
import { DraggableItemType } from '../../../ts/types';
import { SortableContext } from '@dnd-kit/sortable';
import SortableItem from '../../DndHelpers/SortableItem/SortableItem'
import { useSelector } from 'react-redux';
import { getCurrentMode } from '../../../store/calculator/calculatorSlice';
import { ConstructorMode } from '../../../ts/enums';
import RemoveItemContainer from '../../DndHelpers/RemoveItemContainer/RemoveItemContainer';
import { verticalListSortingStrategy } from '@dnd-kit/sortable';


interface CanvasProps {
  items: DraggableItemType[],
  handleRemove(id: string): void,
}

const Canvas = ({ items, handleRemove }: CanvasProps) => {
  const mode = useSelector(getCurrentMode)
  const { isOver, setNodeRef } = useDroppable({
    id: 'droppable'
  })

  const displayedBlocks = items.filter(el => el.isOnCanvas)

  const isDevMode = mode === ConstructorMode.Constructor

  if (!displayedBlocks.length) {
    return (
      <Box
        className={classNames({
          [styles.container]: true,
          [styles.emptyContainer]: true,
          [styles.droppable]: isOver
        })}
        ref={setNodeRef}
      >
        <AddPhotoAlternateIcon />
        <Typography variant='h3' className={styles.title}>
          Перетащите сюда
        </Typography>
        <Typography variant='body1' className={styles.body}>
          любой элемент из левой панели
        </Typography>
      </Box>
    )
  }

  return (
    <Box
      className={classNames({
        [styles.container]: true,
      })}
      ref={setNodeRef}
    >
      {isDevMode
        ? (
          <SortableContext
            items={displayedBlocks.map(el => el.id)}
            strategy={verticalListSortingStrategy}
          >
            {displayedBlocks.map(el => {
              const onRemove = () => handleRemove(el.id)

              return (
                <RemoveItemContainer handleRemove={onRemove} key={el.id} >
                  <SortableItem id={el.id} >
                    {el.component}
                  </SortableItem>
                </RemoveItemContainer>
              )
            })}
          </SortableContext>
        ) : (
          <>
            {displayedBlocks.map(el => el.component)}
          </>
        )
      }
    </Box>
  )
}

export default Canvas