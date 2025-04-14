'use client';

import { Button } from '@/components/ui/button';
import { Music, Pause } from 'lucide-react';
import { useRef, useState } from 'react';

export function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play()
          .catch(error => console.log("Audio playback failed:", error));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/beach.mp3"
        loop
        preload="auto"
        className="hidden"
      />
      <Button 
        onClick={toggleAudio} 
        className="absolute top-6 left-6 z-50 bg-black/10 backdrop-blur-sm hover:bg-black/20 text-white/90 rounded-full p-3 transition-all duration-300"
        aria-label={isPlaying ? "Pause background music" : "Play background music"}
      >
        {isPlaying ? (
          <Pause className="w-6 h-6" />
        ) : (
          <Music className="w-6 h-6" />
        )}
      </Button>
    </>
  );
} 