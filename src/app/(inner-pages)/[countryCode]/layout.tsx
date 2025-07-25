import LeafyBackground from '@modules/layout/components/leafy-background'
import React from 'react'


type Props = {
    children: React.ReactNode
}

const StoreLayout = ({ children }: Props) => {
  return (
    <main className="relative overflow-hidden">
      <LeafyBackground />
      {children}
    </main>
  )
}

export default StoreLayout