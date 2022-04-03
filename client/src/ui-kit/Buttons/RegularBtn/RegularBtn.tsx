import React from 'react'
import { Button } from '@mui/material'

import styles from './RegularBtn.module.scss'

interface RegularBtnProps {
  onClick(): void,
  children: React.ReactNode,
}

const RegularBtn = ({ onClick, children }: RegularBtnProps) => {
  return (
    <Button className={styles.btn} onClick={onClick}>
      { children }
    </Button>
  )
}

export default RegularBtn
