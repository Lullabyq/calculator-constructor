import React from 'react'

interface RemoveItemContainerProps {
  handleRemove(): void,
  children: React.ReactNode
}

const RemoveItemContainer = ({ handleRemove, children }:RemoveItemContainerProps) => {

  return (
    <div onDoubleClick={handleRemove}>
      { children }
    </div>
  )
}

export default RemoveItemContainer