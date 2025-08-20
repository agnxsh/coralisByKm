"use client"

import { HttpTypes } from "@medusajs/types"
import { Container } from "@medusajs/ui"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { AnimatePresence, motion } from "motion/react"
import Image from "next/image"
import { useState } from "react"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToImage = (index: number) => {
    setCurrentIndex(index)
  }

  if (!images || images.length === 0) {
    return null
  }

  return (
    <div className="flex items-start relative">
      <div className="flex flex-col flex-1 small:mx-16 gap-y-4">
        {/* Main carousel container */}
        <div className="relative">
          <Container className="relative aspect-[29/34] w-full overflow-hidden bg-ui-bg-subtle">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                {!!images[currentIndex]?.url && (
                  <Image
                    src={images[currentIndex].url}
                    priority={true}
                    className="absolute inset-0 rounded-rounded"
                    alt={`Product image ${currentIndex + 1}`}
                    fill
                    sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
                    style={{
                      objectFit: "cover",
                    }}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </Container>

          {/* Navigation arrows - only show if more than 1 image */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white shadow-md rounded-full p-3 transition-all duration-300 hover:scale-105 z-10"
              >
                <ChevronLeft size="20" color="#374151" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white shadow-md rounded-full p-3 transition-all duration-300 hover:scale-105 z-10"
              >
                <ChevronRight size="20" color="#374151" />
              </button>
            </>
          )}

          {/* Image counter */}
          {images.length > 1 && (
            <motion.div
              className="absolute bottom-4 left-1/2 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {currentIndex + 1} / {images.length}
            </motion.div>
          )}
        </div>

        {/* Thumbnail navigation - only show if more than 1 image */}
        {images.length > 1 && (
          <motion.div
            className="flex gap-2 justify-center mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            {images.map((image, index) => (
              <motion.button
                key={image.id}
                onClick={() => goToImage(index)}
                className={`relative w-16 h-16 rounded-md overflow-hidden transition-all duration-300 ${
                  index === currentIndex
                    ? "ring-2 ring-gray-900 scale-105"
                    : "hover:scale-105 opacity-70 hover:opacity-100"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {!!image.url && (
                  <Image
                    src={image.url}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default ImageGallery
