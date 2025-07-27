"use client";

import { Button } from "@modules/common/components/button";
import { siteConfig } from "app/_utils/siteConfig";
import { HeadphoneOff, Headphones } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

type LoadingOverlayProps = {
  onUserInteraction: (withAudio: boolean) => void;
};

export const LoadingOverlay = ({ onUserInteraction }: LoadingOverlayProps) => {
  const [visible, setVisible] = useState(true);
  const [showButton, setShowButton] = useState(false);
  const site = siteConfig();

  useEffect(() => {
    // Show the enter button after progress completes
    const buttonTimer = setTimeout(() => {
      setShowButton(true);
    }, 2500);

    return () => clearTimeout(buttonTimer);
  }, []);

  const handleStart = (withAudio: boolean) => {
    onUserInteraction(withAudio);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      animate={{ 
        opacity: visible ? 1 : 0,
      }}
      exit={{ 
        opacity: 0,
        transition: { duration: 0.5, ease: "easeInOut" }
      }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center gap-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            transition: { duration: 0.8, ease: "easeOut" }
          }}
          exit={{ scale: 1.2, opacity: 0 }}
        >
          <h1 className="text-white text-4xl font-light tracking-widest">
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

        {showButton && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.5, ease: "easeOut" }
            }}
            className="mt-6 flex flex-col md:flex-row gap-4 items-center"
          >
            <Button
              onClick={() => handleStart(true)}
              className="text-sm tracking-wide rounded-full bg-white text-black md:py-5 md:px-8 py-3 px-4 hover:bg-black hover:text-white transition-all duration-300"
            >
              <Headphones className="w-4 h-4 mr-2" />Enter With Audio
            </Button>
            <Button
              onClick={() => handleStart(false)}
              className="text-sm tracking-wide rounded-full bg-white text-black md:py-5 md:px-8 py-3 px-4 hover:bg-black hover:text-white transition-all duration-300"
            >
              <HeadphoneOff className="w-4 h-4 mr-2" />Enter Without Audio
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};