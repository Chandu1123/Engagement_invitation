import React, { useState, useEffect, useRef, useCallback } from 'react';

/**
 * AudioPlayer Component
 * Renders a floating Play/Pause control for optional background music.
 * Supports a local MP3 file (e.g. /audio/nasheed.mp3) and automatically
 * falls back to a gentle, peaceful Web Audio API ambient chime melody
 * if no MP3 file has been added yet.
 */
export default function AudioPlayer({ config, triggerAutoPlay }) {
  const { audio } = config;
  const [isPlaying, setIsPlaying] = useState(false);
  const [useWebAudioFallback, setUseWebAudioFallback] = useState(false);

  const htmlAudioRef = useRef(null);
  const audioCtxRef = useRef(null);
  const intervalRef = useRef(null);
  const hasAutoPlayedRef = useRef(false);

  // Gentle Hijaz / Pentatonic inspired serene notes (Hz)
  const startAmbientSynth = useCallback(() => {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;

      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContextClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Warm, peaceful harmonic scale (D4, F#4, G4, A4, Bb4, D5, A4, F#4)
      const scale = [293.66, 369.99, 392.0, 440.0, 466.16, 587.33, 440.0, 369.99];
      let step = 0;

      const playSoftNote = () => {
        if (!audioCtxRef.current || audioCtxRef.current.state !== 'running') return;
        const now = ctx.currentTime;
        const freq = scale[step % scale.length];
        step += 1;

        const osc = ctx.createOscillator();
        const subOsc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        subOsc.type = 'triangle';
        subOsc.frequency.setValueAtTime(freq / 2, now);

        // Very gentle envelope so it feels calm and ambient
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.035, now + 0.35);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.6);

        osc.connect(gain);
        subOsc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        subOsc.start(now);
        osc.stop(now + 2.7);
        subOsc.stop(now + 2.7);
      };

      playSoftNote();
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(playSoftNote, 2400);
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  }, []);

  const stopAmbientSynth = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
      audioCtxRef.current.suspend();
    }
    setIsPlaying(false);
  }, []);

  const startPlayback = useCallback(async () => {
    if (!audio?.enabled) return;

    if (!useWebAudioFallback && htmlAudioRef.current && audio.customMp3Url) {
      try {
        htmlAudioRef.current.volume = 0.45;
        await htmlAudioRef.current.play();
        setIsPlaying(true);
        return;
      } catch {
        // Fallback to gentle ambient synthesizer if MP3 file isn't present or fails
        setUseWebAudioFallback(true);
      }
    }

    startAmbientSynth();
  }, [audio, useWebAudioFallback, startAmbientSynth]);

  const stopPlayback = useCallback(() => {
    if (htmlAudioRef.current) {
      htmlAudioRef.current.pause();
    }
    stopAmbientSynth();
    setIsPlaying(false);
  }, [stopAmbientSynth]);

  const togglePlay = () => {
    if (isPlaying) {
      stopPlayback();
    } else {
      startPlayback();
    }
  };

  // Trigger optional auto-play when user clicks "Open Invitation" on Welcome Screen
  useEffect(() => {
    if (triggerAutoPlay && audio?.enabled && audio?.autoPlayOnOpen && !hasAutoPlayedRef.current) {
      hasAutoPlayedRef.current = true;
      startPlayback();
    }
  }, [triggerAutoPlay, audio, startPlayback]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  if (!audio?.enabled) return null;

  return (
    <div className="floating-audio-control">
      {audio.customMp3Url && (
        <audio
          ref={htmlAudioRef}
          src={audio.customMp3Url}
          loop
          preload="none"
          onError={() => setUseWebAudioFallback(true)}
        />
      )}

      <button
        type="button"
        onClick={togglePlay}
        className={`audio-toggle-btn ${isPlaying ? 'audio-toggle-btn--playing' : ''}`}
        aria-pressed={isPlaying}
        aria-label={isPlaying ? 'Pause background audio' : 'Play background audio'}
        title={isPlaying ? 'Pause background audio' : 'Play background audio'}
      >
        <span className="audio-icon-wrap" aria-hidden="true">
          {isPlaying ? (
            <span className="sound-bars">
              <span className="bar bar-1" />
              <span className="bar bar-2" />
              <span className="bar bar-3" />
            </span>
          ) : (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <polygon points="6 4 20 12 6 20 6 4" />
            </svg>
          )}
        </span>
        <span className="audio-btn-text">
          {isPlaying ? 'Pause Audio' : 'Play Audio'}
        </span>
      </button>
    </div>
  );
}
