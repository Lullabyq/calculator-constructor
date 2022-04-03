import React from 'react'
import { Card } from '@mui/material'

interface ItemsContainerProps {
  children: React.ReactNode;
}

const ItemsContainer = ({ children }: ItemsContainerProps) => {
  return (
    <Card>
      { children }
    </Card>
  )
}

export default ItemsContainer