"use client";

import LeafyBackground from "@modules/layout/components/leafy-background";
import { motion } from "motion/react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-teal-50 to-white">
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            <h1 className="text-6xl lg:text-8xl font-extralight text-slate-700 leading-tight">
              About
            </h1>
            <div className="text-7xl lg:text-9xl font-extralight tracking-wide text-coralis-base font-seasons">
              Coralis
            </div>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg lg:text-xl text-slate-600 font-light leading-relaxed max-w-3xl mx-auto mt-12"
            >
              Our ode to Ocean. We design resort wear and beachwear that captures 
              the calm, wavy, and quiet luxury of the sea.
            </motion.p>
          </motion.div>
          <LeafyBackground />
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:col-span-5 space-y-8"
            >
              <div className="space-y-6">
                <h2 className="text-4xl lg:text-5xl font-extralight text-slate-900 leading-tight">
                  Our Story
                </h2>
                <div className="w-20 h-px bg-gradient-to-r from-rose-400 to-pink-400"></div>
              </div>
              
              <div className="space-y-6 text-base lg:text-lg text-slate-600 leading-relaxed">
                <p>
                  Coralis wasn't born in a boardroom — it was born on a quiet evening, 
                  watching the sun melt into the sea. It came to life in a moment of 
                  stillness, when the sky blushed pink and the waves whispered stories 
                  only the ocean knows.
                </p>
                
                <p className="text-slate-700 font-medium">
                  Every piece we create echoes that connection — effortless, fluid, and bold.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="lg:col-span-7"
            >
              <div className="relative">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/beach-banner.jpg"
                    alt="Ocean inspiration"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-xl border border-rose-100">
                  <div className="text-2xl font-light text-slate-900">2025</div>
                  <div className="text-sm text-rose-500 font-medium">Founded</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy Grid Section */}
      <section className="py-24 lg:py-32 bg-gradient-to-b from-rose-50/30 to-pink-50/30">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl lg:text-5xl font-extralight text-slate-900 mb-6">
              Our Collections
            </h2>
            <div className="w-20 h-px bg-gradient-to-r from-rose-400 to-pink-400 mx-auto"></div>
            <p className="text-lg text-slate-600 leading-relaxed max-w-4xl mx-auto mt-8">
              Each collection is born from moments spent watching the sea change colour 
              with the sky — from soft pastels at dawn to deep indigos at dusk.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 shadow-sm border border-rose-100/50"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-pink-400 rounded-2xl mb-6 flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded-full"></div>
              </div>
              <h3 className="text-xl font-light text-slate-900 mb-4">Fluid Movement</h3>
              <p className="text-slate-600 leading-relaxed">
                The silhouettes are crafted to move with you, breathe with you, and 
                remind you of the boundless spirit that the ocean embodies.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 shadow-sm border border-rose-100/50"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-400 rounded-2xl mb-6 flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded-full"></div>
              </div>
              <h3 className="text-xl font-light text-slate-900 mb-4">Premium Fabrics</h3>
              <p className="text-slate-600 leading-relaxed">
                Proudly designed in India, we work with premium fabrics and refined 
                silhouettes that breathe the beauty of coastal living.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 shadow-sm border border-rose-100/50 md:col-span-2 lg:col-span-1"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-500 rounded-2xl mb-6 flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded-full"></div>
              </div>
              <h3 className="text-xl font-light text-slate-900 mb-4">Ocean Inspiration</h3>
              <p className="text-slate-600 leading-relaxed">
                Every piece we create echoes the ocean's connection — effortless, 
                fluid, and bold, celebrating confidence, chaos, and beauty.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Designer Spotlight */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <h2 className="text-4xl lg:text-5xl font-extralight text-slate-900 leading-tight">
                  Meet Our Founder
                </h2>
                <div className="text-2xl font-light text-rose-500">Kanyaka Mukherjee</div>
                <div className="w-20 h-px bg-gradient-to-r from-rose-400 to-pink-400"></div>
              </div>
              
              <div className="space-y-6 text-base lg:text-lg text-slate-600 leading-relaxed">
                <p>
                  In 2025, Kanyaka Mukherjee — a lifelong sea lover — envisioned a clothing line 
                  inspired by the untamed elegance of the ocean. Her dream was to dedicate a brand 
                  for the ocean which crafts garments that celebrate confidence, chaos, and beauty 
                  — just like the waves themselves.
                </p>
                
                <p>
                  From early memories of collecting shells on quiet shores to chasing sunsets across 
                  distant coastlines, the sea has always been her muse. Its wild serenity, its 
                  unpredictable rhythm — they became her language of expression.
                </p>
                
                <p className="text-slate-700 font-medium italic">
                  Coralis is that language, translated into threads, textures, and silhouettes.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/kanyaka.jpeg"
                  alt="Kanyaka Mukherjee"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-gradient-to-br from-rose-500 to-pink-500 rounded-3xl p-6 shadow-xl text-white">
                <div className="text-sm font-medium opacity-90">Designed in</div>
                <div className="text-2xl font-light">India</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 lg:py-32 bg-gradient-to-b from-pink-50/30 to-rose-50/30">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-12"
          >
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-extralight text-slate-900 leading-tight">
                What We Believe
              </h2>
              <div className="w-20 h-px bg-gradient-to-r from-rose-400 to-pink-400 mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-center space-y-4"
              >
                <div className="text-3xl font-extralight text-rose-500">Resort Wear</div>
                <p className="text-slate-600 leading-relaxed">
                  We design resort wear and beachwear that captures the calm, 
                  wavy, and quiet luxury of the sea.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center space-y-4"
              >
                <div className="text-3xl font-extralight text-pink-500">Ocean Spirit</div>
                <p className="text-slate-600 leading-relaxed">
                  Our garments celebrate confidence, chaos, and beauty — 
                  just like the waves themselves.
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-rose-100 max-w-3xl mx-auto"
            >
              <div className="flex items-center justify-center gap-6 mb-6">
                <div className="w-3 h-3 rounded-full bg-rose-300"></div>
                <div className="w-3 h-3 rounded-full bg-pink-300"></div>
                <div className="w-3 h-3 rounded-full bg-rose-400"></div>
              </div>
              <p className="text-lg lg:text-xl text-slate-700 leading-relaxed italic text-center">
                "Coralis is that language, translated into threads, textures, and silhouettes."
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Closing Statement */}
      <section className="py-24 lg:py-32">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-2xl lg:text-5xl font-extralight text-slate-700 leading-tight">
              Welcome to
            </h2>
            <div className="text-6xl lg:text-8xl font-extralight text-rose-500 font-seasons">
              Coralis
            </div>
            
            <p className="text-lg lg:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
              Where every thread tells the story of the sea, and every silhouette 
              celebrates the boundless spirit within you.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-rose-200"></div>
                <div className="w-6 h-6 rounded-full bg-pink-300"></div>
                <div className="w-6 h-6 rounded-full bg-rose-400"></div>
                <div className="w-6 h-6 rounded-full bg-pink-500"></div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}