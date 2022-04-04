import React from 'react'
import DragContainer from '../DragContainer/DragContainer'

import styles from './DragCardContainer.module.scss'

interface TemplateCardContainerProps {
  children: React.ReactNode
}

const TemplateCardContainer = ({ children }: TemplateCardContainerProps) => {

  return (
    <DragContainer>
      <div className={styles.card}>
        { children }
      </div>
    </DragContainer>
  )
}

export default TemplateCardContainer
