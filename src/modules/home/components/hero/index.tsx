'use client'

import { Button } from '@medusajs/ui'
import { motion } from 'motion/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const Hero = () => {
  const router = useRouter()
  return (
    <div className="relative h-[80vh] w-full bg-gradient-to-br from-stone-50 to-neutral-100 overflow-hidden">
      {/* Background decorative elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute top-20 right-10 opacity-20"
      >
        <Image
          src="/palm1.png"
          alt=""
          width={800}
          height={800}
          className="object-contain w-[1000px] h-[1000px] md:w-[80vw] md:h-[80vw] blur-sm md:blur-md"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute bottom-20 md:bottom-20 -right-[50vw] md:left-10 opacity-15"
      >
        <Image
          src="/palm2.png"
          alt=""
          width={1000}
          height={1000}
          className="object-contain w-[1000px] h-[1000px] md:w-[80vw] md:h-[80vw] blur-sm md:blur-md"
        />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 flex items-center h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-left space-y-8"
          >
            <div className="space-y-6 mt-40 md:mt-0">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-5xl lg:text-6xl xl:text-7xl font-light tracking-tight text-gray-900"
              >
                Beachwear
                <br />
                <span className="text-4xl lg:text-5xl xl:text-6xl text-gray-600">
                  for the whole family
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-lg lg:text-xl text-gray-600 max-w-md leading-relaxed"
              >
                Rediscover the joy of beachwear with our collection of stylish and comfortable
                clothing.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="space-y-6"
            >
              <div className="text-2xl lg:text-3xl font-light text-gray-900">
                Starting at <span className="font-medium">$7.99</span>
              </div>

              <Button
                size="base"
                className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 text-lg font-medium rounded-none transition-all duration-300 hover:scale-105"
                onClick={() => router.push('/store')}
              >
                Shop Now
              </Button>
            </motion.div>
          </motion.div>

          {/* Right content - Model image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative h-[600px] lg:h-[700px] xl:h-[800px]">
              <Image
                src="/model1.png"
                alt="Beachwear Model"
                fill
                className="object-contain object-center"
                priority
              />

              {/* Subtle background accent */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-blue-50/30 to-green-50/30 rounded-2xl transform rotate-3 scale-105"></div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/20 to-transparent"></div>
    </div>
  )
}

export default Hero
