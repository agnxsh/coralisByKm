'use client'
import { AnimatePresence, motion } from "motion/react";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function AboutPage() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true)
    }, 100)
    
    return () => {
      clearTimeout(timeout)
      setShow(false)
    }
  }, [])

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div 
          className="flex flex-col min-h-screen relative overflow-x-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            transition: {
              duration: 0.5,
              ease: "easeOut"
            }
          }}
          exit={{ 
            opacity: 0,
            y: -20,
            transition: {
              duration: 0.3,
              ease: "easeIn"
            }
          }}
        >
          {/* Hero Section */}
          <div className="relative h-[70vh] w-full overflow-hidden">
            <Image
              src="/beach-banner.jpg"
              alt="Luxury beachfront property"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/30" />
            <motion.div 
              className="absolute inset-0 flex items-center justify-center text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { delay: 0.3, duration: 0.6 }
              }}
            >
              <div className="px-4">
                <h1 className="text-4xl md:text-6xl font-playfair text-white font-light mb-6">
                  Crafting Paradise
                </h1>
                <p className="text-xl md:text-2xl text-white/90 font-montserrat font-light max-w-2xl mx-auto">
                  Where luxury meets the horizon
                </p>
              </div>
            </motion.div>
          </div>

          {/* Content Sections */}
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
              {/* Vision Section */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ 
                  opacity: 1, 
                  x: 0,
                  transition: { duration: 0.6 }
                }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-playfair text-sky-blue-900">Our Vision</h2>
                <p className="text-sky-blue-800/80 leading-relaxed">
                  At Corialis, we don't just develop properties – we craft sanctuaries where the gentle whisper of ocean waves meets unparalleled luxury. Our vision is to redefine coastal living by creating spaces that harmoniously blend with their natural surroundings while offering the pinnacle of comfort and sophistication.
                </p>
              </motion.div>

              {/* Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ 
                  opacity: 1, 
                  scale: 1,
                  transition: { duration: 0.6 }
                }}
                viewport={{ once: true }}
                className="relative h-[400px] rounded-3xl overflow-hidden"
              >
                <Image
                  src="/landing1.jpg"
                  alt="Luxury beachfront living"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>

            {/* Values Section */}
            <motion.div 
              className="mt-24 md:mt-32 grid grid-cols-1 md:grid-cols-3 gap-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.6 }
              }}
              viewport={{ once: true }}
            >
              {/* Sustainability */}
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-sky-blue-100/20 shadow-lg">
                <h3 className="text-xl font-playfair text-sky-blue-900 mb-4">Sustainability</h3>
                <p className="text-sky-blue-800/70">
                  Our commitment to environmental stewardship ensures that each development preserves and enhances its natural surroundings for future generations.
                </p>
              </div>

              {/* Innovation */}
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-sky-blue-100/20 shadow-lg">
                <h3 className="text-xl font-playfair text-sky-blue-900 mb-4">Innovation</h3>
                <p className="text-sky-blue-800/70">
                  We integrate cutting-edge sustainable technologies and design principles to create homes that are as efficient as they are beautiful.
                </p>
              </div>

              {/* Community */}
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-sky-blue-100/20 shadow-lg">
                <h3 className="text-xl font-playfair text-sky-blue-900 mb-4">Community</h3>
                <p className="text-sky-blue-800/70">
                  Every Corialis property is thoughtfully designed to foster a sense of community while respecting individual privacy and space.
                </p>
              </div>
            </motion.div>

            {/* Legacy Section */}
            <motion.div 
              className="mt-24 md:mt-32 text-center max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.6 }
              }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-playfair text-sky-blue-900 mb-8">Our Legacy</h2>
              <p className="text-sky-blue-800/80 leading-relaxed mb-12">
                For over two decades, Corialis has been pioneering luxury coastal living. Our portfolio spans the world's most prestigious shorelines, from the sun-kissed beaches of the Mediterranean to the pristine coasts of the Pacific. Each property is a testament to our unwavering commitment to excellence and our deep understanding of what makes a house a home.
              </p>
              <div className="relative h-[300px] md:h-[500px] rounded-3xl overflow-hidden">
                <Image
                  src="/landing2.jpg"
                  alt="Corialis legacy"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
