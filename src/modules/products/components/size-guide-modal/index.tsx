'use client'

import Modal from '@modules/common/components/modal'
import Image from 'next/image'
import React from 'react'

interface SizeGuideModalProps {
  isOpen: boolean
  onClose: () => void
  url?: string | null
}

const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose, url }) => {
  return (
    <Modal isOpen={isOpen} close={onClose} size="large" data-testid="size-guide-modal">
      <Modal.Title>Size Guide</Modal.Title>
      <Modal.Body>
        <div className="w-full">

           {url ? <Image src={url} alt="Ocean inspiration" width={1000} height={1000} className="object-cover w-max h-full" /> : <p>No size guide available</p>}
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default SizeGuideModal
