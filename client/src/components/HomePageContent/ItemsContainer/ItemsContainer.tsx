import React from 'react'
import { Card } from '@mui/material'

interface Props {
  children: React.ReactNode;
}

const ItemsContainer = ({ children }: Props) => {
  return (
    <Card>
      { children }
    </Card>
  )
}

export default ItemsContainer