import React from 'react'
import { Box } from '@mui/material'
import { useSelector } from 'react-redux'
import { getCalculatorInput, getResult } from '../../../../store/calculator/calculatorSlice'
import classNames from 'classnames'

import styles from './Display.module.scss'

const Display = () => {
  const input = useSelector(getCalculatorInput)
  const result = useSelector(getResult)

  let displayedValue = result || input.number2 || input.number1

  if (!displayedValue) {
    displayedValue = '0'
  }

  return (
    <Box className={styles.wrapper}>
      <Box
        className={classNames({
          [styles.display]: true,
        })
      }>
        { displayedValue }
      </Box>
    </Box>

  )
}

export default Display