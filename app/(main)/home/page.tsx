"use client";
import { AudioPlayer } from "@/app/_components/AudioPlayer";
import { LoadingOverlay } from "@/app/_components/LoadingOverlay";
import { Particles } from "@/app/_components/Particles";
import { WaterRippleEffect } from "@/app/_components/Scene";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const handleUserInteraction = (withAudio: boolean) => {
    setIsAudioPlaying(withAudio);
    
    // Remove loading overlay
    setIsLoading(false);
  };

  return (
    <AnimatePresence mode="wait">
      {isLoading && <LoadingOverlay key='loading-overlay' onUserInteraction={handleUserInteraction} />}
      {(
        <motion.div
          className="flex flex-col min-h-screen relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              duration: 1,
              ease: "easeOut",
            },
          }}
          exit={{
            opacity: 0,
            y: -20,
            transition: {
              duration: 0.3,
              ease: "easeIn",
            },
          }}
        >
          <WaterRippleEffect />
          {/* <NewScene /> */}
          <Particles />
          <motion.div
            initial={{
              rotate: 0,
            }}
            animate={{
              rotate: 20,
              transition: {
                duration: 6,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "mirror",
              },
            }}
            className="absolute bottom-[-10%] left-[-20%] z-[50] opacity-50 blur-sm pointer-events-none"
          >
            <Image
              src="/palm1.png"
              alt="palm1"
              width={700}
              height={700}
              className="max-md:max-w-[80vw] max-md:h-[40vh]"
            />
          </motion.div>
          <motion.div
            initial={{
              rotate: 0,
              originX: 1,
              originY: 1,
            }}
            animate={{
              rotate: -5,
              transition: {
                duration: 6,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "mirror",
              },
            }}
            className="absolute bottom-[-50vh] right-[-20vw] z-[50] opacity-50 blur-xs pointer-events-none"
          >
            <Image
              src="/palm2.png"
              alt="palm2"
              width={1000}
              height={1000}
              className="max-md:max-w-[80vw] max-md:h-[40vh]"
            />
          </motion.div>
          {/* CTA Button */}
          <div className="absolute inset-x-0 bottom-8 flex justify-center z-90">
            {/* <Image src="/seagull.png" alt="Coralis" width={100} height={100} className="z-[9999] opacity-50" /> */}
            <Button
              className="text-lg tracking-wide group rounded-full bg-black py-5 px-4 hover:bg-white hover:text-black transition-all duration-300"
              onClick={() => {
                // router.push("/shop");
              }}
            >
              COMING{" "}SOON
              {/* <ArrowUpRight className="h-16 w-16 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 shrink-0" /> */}
            </Button>
          </div>

          <AudioPlayer isPlaying={isAudioPlaying} setIsPlaying={setIsAudioPlaying} />
          
        </motion.div>
      )}
    </AnimatePresence>
  );
}
