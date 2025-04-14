import React from 'react'
import { Navbar } from '../_components/Navbar'
import { AnimatePresence } from 'motion/react'

type Props = {
    children: React.ReactNode
}

const InnerLayout = ({ children }: Props) => {
  return (
    <AnimatePresence mode="wait">
    <div>
        <Navbar />
        {children}
    </div>
    </AnimatePresence>
  )
}

export default InnerLayout