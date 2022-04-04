import React from 'react'

import styles from './DragContainer.module.scss'

interface DragContainerProps {
  children: React.ReactNode
}

const DragContainer = ({ children }: DragContainerProps) => {
  return (
    <div className={styles.container}>
      { children }
    </div>
  )
}

export default DragContainer