import React from 'react'
import { Box } from '@mui/material'
import { useSelector } from 'react-redux'
import { getCalculatorInput, getResult } from '../../../../store/calculator/calculatorSlice'
import classNames from 'classnames'

import styles from './Display.module.scss'

interface DisplayProps {
  isActive: boolean,
}

const Display = ({ isActive }: DisplayProps) => {
  const input = useSelector(getCalculatorInput)
  const result = useSelector(getResult)

  let displayedValue = result || input.number2 || input.number1

  if (!displayedValue) {
    displayedValue = '0'
  }

  return (
    <Box
      className={classNames({
        [styles.display]: true,
        [styles.inactive]: !isActive,
      })
    }>
      { displayedValue }
    </Box>
  )
}

export default Display