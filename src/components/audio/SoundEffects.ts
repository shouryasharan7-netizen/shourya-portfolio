"use client";

// Web Audio API Synthesizer for macOS Desktop UI, Guitar Strings, and Iron Man FX
class SoundEffectsEngine {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;
  private masterVolume: number = 0.85;
  private masterGain: GainNode | null = null;

  private getContext(): AudioContext | null {
    if (!this.soundEnabled || typeof window === "undefined") return null;
    try {
      if (!this.ctx) {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === "suspended") {
        this.ctx.resume().catch(() => {});
      }
      return this.ctx;
    } catch {
      return null;
    }
  }

  public setSoundEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
  }

  public isEnabled(): boolean {
    return this.soundEnabled;
  }

  public setMasterVolume(volume: number) {
    this.masterVolume = Math.max(0, Math.min(1, volume));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.masterVolume, this.ctx.currentTime);
    }
  }

  public getMasterVolume(): number {
    return this.masterVolume;
  }

  private getMasterDestination(ctx: AudioContext): AudioNode {
    if (!this.masterGain) {
      this.masterGain = ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.masterVolume, ctx.currentTime);
      this.masterGain.connect(ctx.destination);
    }
    return this.masterGain;
  }

  // macOS Iconic Startup Chime (F# Major Chord)
  public playBootChime() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const dest = this.getMasterDestination(ctx);

    // F# Maj chord notes: F#2, C#3, F#3, A#3, C#4, F#4
    const notes = [92.5, 138.59, 185.0, 233.08, 277.18, 369.99];

    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = i < 2 ? "triangle" : "sine";
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.08, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);

      osc.connect(gain);
      gain.connect(dest);

      osc.start(now);
      osc.stop(now + 2.9);
    });
  }

  // macOS Window Click / Pop
  public playWindowClick() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const dest = this.getMasterDestination(ctx);

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.04);

    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(gain);
    gain.connect(dest);

    osc.start(now);
    osc.stop(now + 0.05);
  }

  // macOS Dock Hover Tick
  public playDockTick() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const dest = this.getMasterDestination(ctx);

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(1400, now);
    osc.frequency.exponentialRampToValueAtTime(700, now + 0.02);

    gain.gain.setValueAtTime(0.02, now);
    gain.gain.exponentialRampToValueAtTime(0.0005, now + 0.02);

    osc.connect(gain);
    gain.connect(dest);

    osc.start(now);
    osc.stop(now + 0.025);
  }

  // macOS App Launch Swoosh
  public playAppLaunch() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const dest = this.getMasterDestination(ctx);

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(640, now + 0.09);

    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

    osc.connect(gain);
    gain.connect(dest);

    osc.start(now);
    osc.stop(now + 0.11);
  }

  // Realistic Acoustic Guitar String Pluck Synthesizer
  // String indices: 0: Low E (82.4Hz), 1: A (110.0Hz), 2: D (146.8Hz), 3: G (196.0Hz), 4: B (246.9Hz), 5: High E (329.6Hz)
  public playGuitarString(stringIndex: number) {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const dest = this.getMasterDestination(ctx);

    const frequencies = [82.41, 110.0, 146.83, 196.0, 246.94, 329.63];
    const baseFreq = frequencies[stringIndex] || 196.0;

    const harmonics = [
      { mult: 1, gain: 0.14, decay: 1.8 },
      { mult: 2, gain: 0.08, decay: 1.2 },
      { mult: 3, gain: 0.04, decay: 0.7 },
      { mult: 4, gain: 0.02, decay: 0.4 },
    ];

    harmonics.forEach(({ mult, gain: hGain, decay }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = mult === 1 ? "triangle" : "sine";
      osc.frequency.setValueAtTime(baseFreq * mult, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(hGain, now + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + decay);

      osc.connect(gain);
      gain.connect(dest);

      osc.start(now);
      osc.stop(now + decay + 0.05);
    });
  }

  // Play Full Strummed Acoustic Guitar Chord
  public playGuitarStrum() {
    [0, 1, 2, 3, 4, 5].forEach((idx) => {
      setTimeout(() => {
        this.playGuitarString(idx);
      }, idx * 35);
    });
  }

  // Iron Man Infinity Gauntlet Power Surge & Cosmic Snap
  public playIronManSnap() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const dest = this.getMasterDestination(ctx);

    // 1. Cosmic Power Surge (Sub rumble rising to energy peak)
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = "sawtooth";
    subOsc.frequency.setValueAtTime(45, now);
    subOsc.frequency.exponentialRampToValueAtTime(280, now + 0.4);

    subGain.gain.setValueAtTime(0.001, now);
    subGain.gain.linearRampToValueAtTime(0.12, now + 0.35);
    subGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

    subOsc.connect(subGain);
    subGain.connect(dest);
    subOsc.start(now);
    subOsc.stop(now + 0.45);

    // 2. High-energy metallic snap transient at t + 0.4s
    setTimeout(() => {
      if (!ctx) return;
      const snapTime = ctx.currentTime;

      const bufferSize = ctx.sampleRate * 0.15;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.02));
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "highpass";
      filter.frequency.value = 1200;

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.2, snapTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, snapTime + 0.15);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(dest);

      noise.start(snapTime);

      // Resonant harmonic chime that radiates outward
      const chime = ctx.createOscillator();
      const chimeGain = ctx.createGain();
      chime.type = "sine";
      chime.frequency.setValueAtTime(880, snapTime);
      chime.frequency.exponentialRampToValueAtTime(1760, snapTime + 0.8);

      chimeGain.gain.setValueAtTime(0.1, snapTime);
      chimeGain.gain.exponentialRampToValueAtTime(0.0001, snapTime + 1.2);

      chime.connect(chimeGain);
      chimeGain.connect(dest);

      chime.start(snapTime);
      chime.stop(snapTime + 1.2);
    }, 400);
  }

  // Chess Piece Placement Tactile Wood Click
  public playChessMove() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const dest = this.getMasterDestination(ctx);

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(75, now + 0.04);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(gain);
    gain.connect(dest);

    osc.start(now);
    osc.stop(now + 0.045);
  }
}

export const soundEngine = new SoundEffectsEngine();
