'use client'
import { Button } from "@/components/ui/button";
import { Particles } from "./_components/Particles";
import { WaterRippleEffect } from "./_components/Scene";
import { ArrowUpRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen relative">
      <WaterRippleEffect />
      <Particles />
      
      {/* CTA Button */}
      <div className="absolute inset-x-0 bottom-[32%] flex justify-center z-90">
        <Button
          variant="default"
          size='lg'
          className='text-lg tracking-wide group'
          onClick={() => {}}
        >
          Go to Store <ArrowUpRight className="h-16 w-16 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 shrink-0" />
        </Button>
      </div>

    </div>
  );
}
