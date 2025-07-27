'use client';


import { Button } from '@modules/common/components/button';
import { Music, Pause } from 'lucide-react';
import { useEffect, useRef } from 'react';

export function AudioPlayer({isPlaying, setIsPlaying}: {isPlaying: boolean, setIsPlaying: (isPlaying: boolean) => void}) {
  const audioRef = useRef<HTMLAudioElement>(null);

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

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying]);

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
        className="absolute bottom-6 md:top-6 left-6 h-10 w-10 z-50 bg-black/10 backdrop-blur-sm hover:bg-black/20 text-white/90 rounded-full p-3 transition-all duration-300"
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