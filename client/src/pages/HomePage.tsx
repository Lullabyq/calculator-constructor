import React, { useState } from 'react'
import SideBar from '../components/HomePageContent/Sidebar/SideBar'
import ModeToggler from '../components/HomePageContent/ModeToggler/ModeToggler'
import Canvas from '../components/HomePageContent/Canvas/Canvas'
import { Box } from '@mui/material'
import {
  DndContext,
  DragStartEvent,
  DragEndEvent,
  closestCorners,
  closestCenter
} from '@dnd-kit/core'
import Display from '../components/HomePageContent/Sidebar/Display/Display'
import OperationsBlock from '../components/HomePageContent/Sidebar/OperationsBlock/OperationsBlock'
import ButtonContainer from '../components/HomePageContent/Sidebar/ButtonContainer/ButtonContainer'
import SubmitBlock from '../components/HomePageContent/Sidebar/SubmitBlock/SubmitBlock'
import DragOverlay from '../components/DndHelpers/DragOverlay/DragOverlay'

import styles from './HomePage.module.scss'
import { useSelector } from 'react-redux'
import { getCurrentMode } from '../store/calculator/calculatorSlice'
import { ConstructorMode } from '../ts/enums'
import { arrayMove } from '@dnd-kit/sortable'
import type { DraggableItemType } from '../ts/types'
import addIdSuffix from '../helpers/addIdSuffix'
import removeIdSuffix from '../helpers/removeIdSuffix'


const HomePage = () => {
  const mode = useSelector(getCurrentMode)
  const [draggableItems, setDraggableItems] = useState([
    { component: <Display />, id: 'display', isOnCanvas: false },
    { component: <OperationsBlock />, id: 'operations', isOnCanvas: false },
    { component: <ButtonContainer />, id: 'digits', isOnCanvas: false },
    { component: <SubmitBlock />, id: 'submit', isOnCanvas: false },
  ])
  const [clonedItems, setClonedItems] = useState(
    addIdSuffix<DraggableItemType>(draggableItems)
  )
  const [activeId, setActiveId] = useState<null | string>(null)

  // const handleDragOver = ({ active, over }) => {
  //   const overId = over?.id

  // }

  const handleMoveToSidebar = (id: string): void => {
    setClonedItems(() => clonedItems.map(el =>
      removeIdSuffix(el.id) !== id ? el : ({
        ...el,
        isOnCanvas: false
      })
    ))

    setDraggableItems(() => draggableItems.map(el =>
      el.id !== id ? el : ({
        ...el,
        isOnCanvas: false
      })
    ))
  }

  const handleDragStart = ({ active }: DragStartEvent) =>
    setActiveId(removeIdSuffix(active.id))
  const handleDragCancel = () => setActiveId(null)

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over) {
      return handleDragCancel()
    }

    const draggingItem = draggableItems.find(el => el.id === activeId)

    if (!draggingItem) return

    if (!draggingItem.isOnCanvas) {
      draggingItem.isOnCanvas = true

      setDraggableItems(() => {
        const newItems = draggableItems
          .map(el => el.id === activeId ? draggingItem : el)
        const oldIndex = draggableItems
          .findIndex(el => el.id === activeId)

        return arrayMove(newItems, oldIndex, draggableItems.length - 1)
      })

      setClonedItems(() => clonedItems
        .map(el => el.id === active.id ? { ...el, isOnCanvas: true } : el)
      )

      return setActiveId(null)
    }

    if (activeId !== over.id) {
      setDraggableItems(() => {
        const oldIndex = draggableItems.findIndex(el => el.id === active.id)
        const newIndex = draggableItems.findIndex(el => el.id === over.id)

        return arrayMove(draggableItems, oldIndex, newIndex)
      })
    }
  }

  const isDevMode = mode === ConstructorMode.Constructor

  const activeComponent = draggableItems.find(el => el.id === activeId) ?? null

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
      collisionDetection={activeComponent?.isOnCanvas
        ? closestCorners
        : closestCenter
      }
      // onDragOver={handleDragOver}
    >
      <DragOverlay activeItem={activeComponent} />
      <Box className={styles.container}>
        <Box className={styles.sidebar}>
          {isDevMode &&
            <SideBar items={clonedItems} activeId={activeId} />
          }
        </Box>
        <Box className={styles.section}>
          <ModeToggler />
          <Canvas
            items={draggableItems}
            handleRemove={handleMoveToSidebar}
          />
        </Box>
      </Box>
    </DndContext>
  )
}

export default HomePage
