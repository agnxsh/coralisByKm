import React from 'react'


type Props = {
    children: React.ReactNode
}

const StoreLayout = ({ children }: Props) => {
  return (
    <main className="relative">{children}</main>
  )
}

export default StoreLayout