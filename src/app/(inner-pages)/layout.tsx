import { AnimatePresence } from 'motion/react'
import React from 'react'


type Props = {
    children: React.ReactNode
}

const InnerLayout = ({ children }: Props) => {
  return (
    <AnimatePresence mode="wait">
    <div>
        <main className='relative'>
        {children}
        </main>
    </div>
    </AnimatePresence>
  )
}

export default InnerLayout