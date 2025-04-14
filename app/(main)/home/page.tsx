'use client'
import { AudioPlayer } from "@/app/_components/AudioPlayer";
import { Particles } from "@/app/_components/Particles";
import { WaterRippleEffect } from "@/app/_components/Scene";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [show, setShow]= useState(false)
  const router = useRouter()
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true)
    }, 1000)
    
    return () => {clearTimeout(timeout); setShow(false)}
  }, [])
  return show && (
    <motion.div 
      className="flex flex-col min-h-screen relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        transition: {
          duration: 1,
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
      <WaterRippleEffect />
      {/* <NewScene /> */}
      <Particles />
      {/* CTA Button */}
      <div className="absolute inset-x-0 bottom-8 flex justify-center z-90">
      {/* <Image src="/seagull.png" alt="Coralis" width={100} height={100} className="z-[9999] opacity-50" /> */}
        <Button
          className='text-lg tracking-wide group rounded-full bg-black py-5 px-4 hover:bg-white hover:text-black transition-all duration-300'
          onClick={() => {router.push('/shop')}}
        >
          Go to Store <ArrowUpRight className="h-16 w-16 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 shrink-0" />
        </Button>
      </div>

      <AudioPlayer />

    </motion.div>
  );
}
