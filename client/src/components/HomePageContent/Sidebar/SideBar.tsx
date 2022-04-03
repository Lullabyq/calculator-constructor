import { Stack } from '@mui/material'
import React, { useState } from 'react'
import ButtonContainer from './ButtonContainer/ButtonContainer'
import Display from './Display/Display'
import OperationsBlock from './OperationsBlock/OperationsBlock'
import SubmitBlock from './SubmitBlock/SubmitBlock'

import styles from './SideBar.module.scss'

const SideBar = () => {
  const [activeStatuses, setActiveStatuses] = useState({
    display: true,
    operations: true,
    buttons: true,
    submit: true
  })

  const elements = [
    { component: <Display isActive={ activeStatuses.display }/>, id: 'display' },
    { component: <OperationsBlock />, id: 'operations' },
    { component: <ButtonContainer />, id: 'digits' },
    { component: <SubmitBlock />, id: 'submit' },
  ]

  return (
    <Stack spacing={'12px'}>
      {elements.map(el => (
        <div className={styles.card} key={el.id} >
          { el.component }
        </div>
      ))}
    </Stack>
  )
}

export default SideBar