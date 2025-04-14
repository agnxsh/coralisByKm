'use client';

import { motion } from 'motion/react';


interface AnimatedHeadingProps {
  title: string;
  subtitle?: string;
}

export default function AnimatedHeading({ title, subtitle }: AnimatedHeadingProps) {
  return (
    <div className="mb-16 text-center max-w-2xl mx-auto">
      <motion.div 
        className="relative mb-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        {/* Decorative elements */}
        <motion.div 
          className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-[1px] bg-primary/50"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        />
      </motion.div>
      
      <motion.h1 
        className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-foreground relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {title}
        <div className="h-[3px] w-24 bg-primary mx-auto mt-6 rounded-full"></div>
      </motion.h1>
      
      {subtitle && (
        <motion.p 
          className="mt-6 mx-auto text-lg text-muted-foreground font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
} 