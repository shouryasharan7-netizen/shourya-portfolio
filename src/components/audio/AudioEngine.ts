// Web Audio API Synthesizer & Audio Engine
// Procedural music generation & interactive haptic sound effects with zero external MP3 assets

class AudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isMusicPlaying: boolean = false;
  private musicInterval: any = null;
  private masterGain: GainNode | null = null;
  private musicGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private currentStep: number = 0;
  private listeners: Set<(isPlaying: boolean, isMuted: boolean) => void> = new Set();

  constructor() {
    // Lazy initialize on first interaction
  }

  private initContext() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.8, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);

        this.musicGain = this.ctx.createGain();
        this.musicGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
        this.musicGain.connect(this.masterGain);

        this.sfxGain = this.ctx.createGain();
        this.sfxGain.gain.setValueAtTime(0.25, this.ctx.currentTime);
        this.sfxGain.connect(this.masterGain);
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  public subscribe(cb: (isPlaying: boolean, isMuted: boolean) => void) {
    this.listeners.add(cb);
    cb(this.isMusicPlaying, this.isMuted);
    return () => {
      this.listeners.delete(cb);
    };
  }

  private notify() {
    this.listeners.forEach((cb) => cb(this.isMusicPlaying, this.isMuted));
  }

  public toggleMute() {
    this.initContext();
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : 0.8, this.ctx.currentTime, 0.05);
    }
    this.notify();
    return this.isMuted;
  }

  public setMute(muted: boolean) {
    this.initContext();
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : 0.8, this.ctx.currentTime, 0.05);
    }
    this.notify();
  }

  // --- Sound Effects ---

  // Interactive Hover Tick
  public playHover() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = "highpass";
      filter.frequency.setValueAtTime(2000, this.ctx.currentTime);

      osc.type = "sine";
      osc.frequency.setValueAtTime(1400, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.03);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.035);
    } catch {
      // AudioContext policy
    }
  }

  // Resonant Click
  public playClick() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    try {
      const now = this.ctx.currentTime;
      // Sub click
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.08);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start();
      osc.stop(now + 0.09);

      // Gold shimmer bell
      const bell = this.ctx.createOscillator();
      const bellGain = this.ctx.createGain();
      bell.type = "sine";
      bell.frequency.setValueAtTime(880, now);
      bell.frequency.exponentialRampToValueAtTime(1760, now + 0.15);

      bellGain.gain.setValueAtTime(0.12, now);
      bellGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      bell.connect(bellGain);
      bellGain.connect(this.sfxGain);

      bell.start();
      bell.stop(now + 0.16);
    } catch {
      // Ignore
    }
  }

  // Camera Shutter Snap (HIMYM photo style)
  public playShutter() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    try {
      const now = this.ctx.currentTime;
      // Noise burst for mechanical shutter
      const bufferSize = this.ctx.sampleRate * 0.06;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1800, now);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.3, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);

      whiteNoise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.sfxGain);

      whiteNoise.start(now);
      whiteNoise.stop(now + 0.06);

      // Mechanical click
      const click = this.ctx.createOscillator();
      const clickGain = this.ctx.createGain();
      click.type = "square";
      click.frequency.setValueAtTime(600, now);
      click.frequency.exponentialRampToValueAtTime(200, now + 0.04);
      clickGain.gain.setValueAtTime(0.2, now);
      clickGain.gain.exponentialRampToValueAtTime(0.01, now + 0.04);

      click.connect(clickGain);
      clickGain.connect(this.sfxGain);
      click.start(now);
      click.stop(now + 0.045);
    } catch {
      // Ignore
    }
  }

  // Warp / Whoosh
  public playWarp() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(640, now + 0.25);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.15, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now);
      osc.stop(now + 0.32);
    } catch {
      // Ignore
    }
  }

  // --- Fast-Paced Upbeat Intro & Soundtrack Synthesizer ---
  // HIMYM style upbeat pop-rock chord progression with catchy rhythmic rhythm

  public playIntroTheme() {
    this.initContext();
    this.startMusic();
  }

  public startMusic() {
    if (this.isMusicPlaying) return;
    this.initContext();
    if (!this.ctx || !this.musicGain) return;

    this.isMusicPlaying = true;
    this.currentStep = 0;
    this.notify();

    // HIMYM Theme style chord progression in D Major:
    // D -> G -> A -> Bm -> G -> A -> D
    // Fast 16th note rhythm (160 BPM)
    const bpm = 165;
    const stepDuration = (60 / bpm) / 4; // 16th notes

    const chords = [
      // D Major (D4, F#4, A4, D5)
      { root: 146.83, notes: [293.66, 369.99, 440.00, 587.33] },
      // G Major (G3, B3, D4, G4)
      { root: 196.00, notes: [246.94, 293.66, 392.00, 493.88] },
      // A Major (A3, C#4, E4, A4)
      { root: 220.00, notes: [277.18, 329.63, 440.00, 554.37] },
      // B minor (B3, D4, F#4, B4)
      { root: 246.94, notes: [293.66, 369.99, 493.88, 587.33] },
      // G Major (G3, B3, D4, G4)
      { root: 196.00, notes: [246.94, 293.66, 392.00, 493.88] },
      // A Major (A3, C#4, E4, A4)
      { root: 220.00, notes: [277.18, 329.63, 440.00, 554.37] },
      // D Major Finale
      { root: 146.83, notes: [293.66, 369.99, 440.00, 587.33] },
      // D Major Ringing
      { root: 146.83, notes: [293.66, 369.99, 440.00, 587.33] },
    ];

    let step = 0;
    this.musicInterval = setInterval(() => {
      if (!this.ctx || !this.musicGain || !this.isMusicPlaying) return;
      const now = this.ctx.currentTime;
      const chordIndex = Math.floor((step % 64) / 8);
      const chord = chords[chordIndex % chords.length];
      const beatInChord = step % 8;

      // Bass note on beats 0, 3, 4, 6
      if ([0, 3, 4, 6].includes(beatInChord)) {
        this.synthBassNote(chord.root, now, 0.15);
      }

      // Upbeat Acoustic/Synth Strum on every 16th/8th
      if ([0, 2, 4, 5, 6, 7].includes(beatInChord)) {
        const note = chord.notes[beatInChord % chord.notes.length];
        this.synthPluck(note, now, 0.12);
      }

      // Snare / Hi-hat pulse on beats 2, 6
      if (beatInChord === 2 || beatInChord === 6) {
        this.synthPercussion(now);
      }

      step++;
      this.currentStep = step;
    }, stepDuration * 1000);
  }

  public stopMusic() {
    this.isMusicPlaying = false;
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
    this.notify();
  }

  public toggleMusic() {
    if (this.isMusicPlaying) {
      this.stopMusic();
    } else {
      this.startMusic();
    }
    return this.isMusicPlaying;
  }

  private synthPluck(freq: number, time: number, duration: number) {
    if (!this.ctx || !this.musicGain || this.isMuted) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, time);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(3200, time);
      filter.frequency.exponentialRampToValueAtTime(600, time + duration);

      gain.gain.setValueAtTime(0.18, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.musicGain);

      osc.start(time);
      osc.stop(time + duration + 0.01);
    } catch {}
  }

  private synthBassNote(freq: number, time: number, duration: number) {
    if (!this.ctx || !this.musicGain || this.isMuted) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(freq / 2, time);

      gain.gain.setValueAtTime(0.22, time);
      gain.gain.exponentialRampToValueAtTime(0.01, time + duration);

      osc.connect(gain);
      gain.connect(this.musicGain);

      osc.start(time);
      osc.stop(time + duration + 0.01);
    } catch {}
  }

  private synthPercussion(time: number) {
    if (!this.ctx || !this.musicGain || this.isMuted) return;
    try {
      // Snare snap
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(220, time);
      osc.frequency.exponentialRampToValueAtTime(50, time + 0.05);

      gain.gain.setValueAtTime(0.15, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);

      osc.connect(gain);
      gain.connect(this.musicGain);

      osc.start(time);
      osc.stop(time + 0.055);
    } catch {}
  }
}

export const audioEngine = new AudioEngine();
