import { useRef } from 'react';
export function useAudioSound() {
  const audioRef = useRef(null);
  const play = () => {
    audioRef.current.currentTime = 0;
    audioRef.current.play();
    setTimeout(() => {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }, [2000]);
  };
  return [audioRef, play];
}
