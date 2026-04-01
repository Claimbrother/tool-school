'use client';

import React, { useRef, useState } from 'react';

interface VideoModalProps {
  src: string;
  onClose: () => void;
}

export default function VideoModal({ src, onClose }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  
  // NEU: State für den Fortschritt in Prozent (0 bis 100)
  const [progress, setProgress] = useState(0);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const stopVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  // NEU: Berechnet den Fortschritt, während das Video läuft
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      // Verhindert NaN Fehler, falls duration noch nicht geladen ist
      if (duration > 0) {
        setProgress((current / duration) * 100);
      }
    }
  };

  // NEU: Erlaubt das Klicken auf die Leiste, um im Video zu springen
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const bar = e.currentTarget;
      const clickPosition = e.clientX - bar.getBoundingClientRect().left;
      const percentage = clickPosition / bar.offsetWidth;
      videoRef.current.currentTime = percentage * videoRef.current.duration;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-5xl bg-black rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-red-500 text-white rounded-full transition-all"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <video
          ref={videoRef}
          src={src}
          autoPlay
          className="w-full aspect-video object-contain"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
          onTimeUpdate={handleTimeUpdate} // NEU: Event-Listener hinzugefügt
        />

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent pt-12">
          
          {/* NEU: Die Fortschrittsleiste */}
          <div 
            className="w-full h-1.5 bg-white/20 cursor-pointer hover:h-2 transition-all"
            onClick={handleSeek}
          >
            <div 
              className="h-full bg-teal-500 transition-all duration-75 ease-linear" 
              style={{ width: `${progress}%` }} 
            />
          </div>

          {/* Steuerelemente (Play, Stopp) */}
          <div className="p-4 flex items-center justify-center gap-6">
            <button 
              onClick={togglePlay}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors backdrop-blur-md"
            >
              {isPlaying ? (
                <>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                  Pause
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
                  Play
                </>
              )}
            </button>

            <button 
              onClick={stopVideo}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-red-500/80 text-white rounded-lg transition-colors backdrop-blur-md"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" /></svg>
              Stopp
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}