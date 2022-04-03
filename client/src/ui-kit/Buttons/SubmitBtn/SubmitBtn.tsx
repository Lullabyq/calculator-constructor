import React from 'react'
import { LoadingButton } from '@mui/lab'

import styles from './SubmitBtn.module.scss'

interface RegularBtnProps {
  onClick(): void,
  children: React.ReactNode,
  isLoading: boolean,
  isDisabled: boolean
}

const SubmitBtn = ({ onClick, children, isLoading, isDisabled }: RegularBtnProps) => {
  return (
    <LoadingButton
      variant='contained'
      className={styles.btn}
      onClick={onClick}
      loading={isLoading}
      disabled={isDisabled}
    >
      { children }
    </LoadingButton>
  )
}

export default SubmitBtn
