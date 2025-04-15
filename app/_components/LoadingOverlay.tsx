"use client";

import { motion } from "motion/react";

export const LoadingOverlay = () => {

  return  (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900"
      exit={{ 
        opacity: 0,
        transition: { duration: 0.5, ease: "easeInOut" }
      }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center gap-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            transition: { duration: 0.8, ease: "easeOut" }
          }}
          exit={{ scale: 1.2, opacity: 0 }}
        >
          <h1 className="text-white text-xl font-light tracking-wide">
            Bringing Life
          </h1>
        </motion.div>
        
        <motion.div 
          className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            transition: { delay: 0.3, duration: 0.5 }
          }}
        >
          <motion.div 
            className="h-full bg-white"
            initial={{ width: "0%" }}
            animate={{ 
              width: "100%",
              transition: { 
                duration: 2.5,
                ease: "easeInOut"
              }
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}; 