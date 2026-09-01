// Web Audio API Synthesizer & JARVIS Sound Engine
// Authentic HIMYM Theme ("Hey Beautiful" by The Solids) + Stark Industries Tactical SFX

class AudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isMusicPlaying: boolean = false;
  private musicInterval: any = null;
  private masterGain: GainNode | null = null;
  private musicGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private listeners: Set<(isPlaying: boolean, isMuted: boolean) => void> = new Set();

  constructor() {
    // Lazy initialized on first user interaction
  }

  private initContext() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.85, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);

        this.musicGain = this.ctx.createGain();
        this.musicGain.gain.setValueAtTime(0.38, this.ctx.currentTime);
        this.musicGain.connect(this.masterGain);

        this.sfxGain = this.ctx.createGain();
        this.sfxGain.gain.setValueAtTime(0.3, this.ctx.currentTime);
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
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : 0.85, this.ctx.currentTime, 0.05);
    }
    this.notify();
    return this.isMuted;
  }

  // --- JARVIS & Tactical Sound Effects ---

  // High-Tech Hover Tick
  public playHover() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = "bandpass";
      filter.frequency.setValueAtTime(2800, now);
      filter.Q.setValueAtTime(4, now);

      osc.type = "sine";
      osc.frequency.setValueAtTime(1800, now);
      osc.frequency.exponentialRampToValueAtTime(900, now + 0.025);

      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now);
      osc.stop(now + 0.03);
    } catch {}
  }

  // Tactical Confirmation Click
  public playClick() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    try {
      const now = this.ctx.currentTime;
      // Resonant sub thump
      const sub = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      sub.type = "triangle";
      sub.frequency.setValueAtTime(320, now);
      sub.frequency.exponentialRampToValueAtTime(80, now + 0.07);

      subGain.gain.setValueAtTime(0.3, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

      sub.connect(subGain);
      subGain.connect(this.sfxGain);
      sub.start(now);
      sub.stop(now + 0.08);

      // Gold shimmer bell
      const bell = this.ctx.createOscillator();
      const bellGain = this.ctx.createGain();
      bell.type = "sine";
      bell.frequency.setValueAtTime(1200, now);
      bell.frequency.exponentialRampToValueAtTime(2400, now + 0.12);

      bellGain.gain.setValueAtTime(0.14, now);
      bellGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      bell.connect(bellGain);
      bellGain.connect(this.sfxGain);
      bell.start(now);
      bell.stop(now + 0.13);
    } catch {}
  }

  // JARVIS EMP Shockwave Pulse
  public playEMP() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    try {
      const now = this.ctx.currentTime;
      // Low sub rumble
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.6);

      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(400, now);
      filter.frequency.exponentialRampToValueAtTime(60, now + 0.6);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now);
      osc.stop(now + 0.65);
    } catch {}
  }

  // Laser Scanner Sweep
  public playScanner() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(2200, now);
      osc.frequency.linearRampToValueAtTime(3600, now + 0.15);
      osc.frequency.linearRampToValueAtTime(1400, now + 0.3);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(now);
      osc.stop(now + 0.34);
    } catch {}
  }

  // Hologram / X-Ray Toggle Chime
  public playHoloToggle() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    try {
      const now = this.ctx.currentTime;
      [880, 1320, 1760, 2640].forEach((freq, i) => {
        if (!this.ctx || !this.sfxGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + i * 0.04);

        gain.gain.setValueAtTime(0.12, now + i * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.04 + 0.1);

        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(now + i * 0.04);
        osc.stop(now + i * 0.04 + 0.11);
      });
    } catch {}
  }

  // Camera Shutter Snap (HIMYM Polaroid Photo Montage)
  public playShutter() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    try {
      const now = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * 0.05;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(2000, now);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.3, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.045);

      whiteNoise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.sfxGain);

      whiteNoise.start(now);
      whiteNoise.stop(now + 0.05);

      const click = this.ctx.createOscillator();
      const clickGain = this.ctx.createGain();
      click.type = "square";
      click.frequency.setValueAtTime(700, now);
      click.frequency.exponentialRampToValueAtTime(150, now + 0.035);
      clickGain.gain.setValueAtTime(0.2, now);
      clickGain.gain.exponentialRampToValueAtTime(0.01, now + 0.035);

      click.connect(clickGain);
      clickGain.connect(this.sfxGain);
      click.start(now);
      click.stop(now + 0.04);
    } catch {}
  }

  // Warp Whoosh
  public playWarp() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(720, now + 0.28);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(now);
      osc.stop(now + 0.34);
    } catch {}
  }

  // --- Authentic HIMYM Theme ("Hey Beautiful" by The Solids) ---
  // Transcribing the famous melody: "Pa-pa-pa-pa, pa-pa-pa-pa, pa, pa, da-da-da-da, da-da-da-da-da!"
  // Chords in F# / D major at 162 BPM upbeat rock tempo

  public playIntroTheme() {
    this.initContext();
    this.startMusic();
  }

  public startMusic() {
    if (this.isMusicPlaying) return;
    this.initContext();
    if (!this.ctx || !this.musicGain) return;

    this.isMusicPlaying = true;
    this.notify();

    // 162 BPM -> 16th note step = ~92.6ms
    const bpm = 162;
    const stepDuration = 60 / bpm / 4;

    // Iconic HIMYM "Pa-pa-pa-pa" Melody Line Notes (F#4, G#4, A#4, B4, C#5...)
    // F#4=369.99, G#4=415.30, A#4=466.16, B4=493.88, C#5=554.37, D#5=622.25
    const Fs4 = 369.99;
    const Gs4 = 415.3;
    const As4 = 466.16;
    const B4 = 493.88;
    const Cs5 = 554.37;
    const Ds5 = 622.25;

    // Pattern across 64 steps (4 bars of 16 steps):
    // Bar 1: Pa-pa-pa-pa, pa-pa-pa-pa (Fs4, Fs4, Fs4, Fs4, Gs4, Gs4, Gs4, Gs4)
    // Bar 2: Pa, pa, da-da-da-da (As4, B4, Cs5, Cs5, Cs5, Cs5)
    // Bar 3: Da-da-da-da-da! (Ds5, Cs5, B4, As4, Gs4, Fs4)
    // Bar 4: Rock strum resolution (Fs4, Cs5, Fs4)
    const melodyMap: { [step: number]: number } = {
      // Bar 1: "Pa-pa-pa-pa"
      0: Fs4,
      2: Fs4,
      4: Fs4,
      6: Fs4,
      8: Gs4,
      10: Gs4,
      12: Gs4,
      14: Gs4,
      // Bar 2: "Pa, pa, da-da-da-da"
      16: As4,
      18: B4,
      20: Cs5,
      22: Cs5,
      24: Cs5,
      26: Cs5,
      28: Cs5,
      30: Cs5,
      // Bar 3: "Da-da-da-da-da"
      32: Ds5,
      34: Cs5,
      36: B4,
      38: As4,
      40: Gs4,
      42: Fs4,
      44: Gs4,
      46: As4,
      // Bar 4: Climax hook & sustained chord
      48: Cs5,
      50: Cs5,
      52: Fs4,
      54: Fs4,
      56: Cs5,
      60: Fs4,
    };

    // Power chord bass roots (F# -> B -> C# -> D#m)
    const chordRoots = [
      184.99, // F#3
      246.94, // B3
      277.18, // C#4
      311.13, // D#4
    ];

    let step = 0;
    this.musicInterval = setInterval(() => {
      if (!this.ctx || !this.musicGain || !this.isMusicPlaying) return;
      const now = this.ctx.currentTime;
      const current16th = step % 64;
      const barIndex = Math.floor(current16th / 16);
      const rootFreq = chordRoots[barIndex % chordRoots.length];

      // 1. Vocal Melody Lead Synth ("Pa-pa-pa-pa")
      if (melodyMap[current16th]) {
        this.synthVocalLead(melodyMap[current16th], now, 0.16);
      }

      // 2. Driving Rock Power Chord / Bass on 8th notes (0, 2, 4, 6, 8, 10, 12, 14)
      if (current16th % 2 === 0) {
        this.synthGuitarStrum(rootFreq, now, 0.14);
      }

      // 3. Drum Groove: Kick on 0, 8; Snare on 4, 12; Hi-hat on every 8th
      if (current16th % 8 === 0) {
        this.synthKick(now);
      }
      if (current16th % 8 === 4) {
        this.synthSnare(now);
      }

      step++;
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

  // Upbeat Vocal Lead Synth (mimicking the iconic "Pa-pa-pa-pa" voice)
  private synthVocalLead(freq: number, time: number, duration: number) {
    if (!this.ctx || !this.musicGain || this.isMuted) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const formant = this.ctx.createBiquadFilter();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(freq, time);

      // Formant vowel filter ('Ah' / 'Pa' sound)
      formant.type = "bandpass";
      formant.frequency.setValueAtTime(1400, time);
      formant.Q.setValueAtTime(3.5, time);

      gain.gain.setValueAtTime(0.24, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

      osc.connect(formant);
      formant.connect(gain);
      gain.connect(this.musicGain);

      osc.start(time);
      osc.stop(time + duration + 0.01);
    } catch {}
  }

  // Driving Rock Guitar Strum
  private synthGuitarStrum(freq: number, time: number, duration: number) {
    if (!this.ctx || !this.musicGain || this.isMuted) return;
    try {
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc1.type = "triangle";
      osc1.frequency.setValueAtTime(freq, time);

      // Fifth harmonic for rock power chord
      osc2.type = "sawtooth";
      osc2.frequency.setValueAtTime(freq * 1.5, time);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(2400, time);
      filter.frequency.exponentialRampToValueAtTime(600, time + duration);

      gain.gain.setValueAtTime(0.18, time);
      gain.gain.exponentialRampToValueAtTime(0.005, time + duration);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(this.musicGain);

      osc1.start(time);
      osc2.start(time);
      osc1.stop(time + duration + 0.01);
      osc2.stop(time + duration + 0.01);
    } catch {}
  }

  // Snappy Kick Drum
  private synthKick(time: number) {
    if (!this.ctx || !this.musicGain || this.isMuted) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(150, time);
      osc.frequency.exponentialRampToValueAtTime(38, time + 0.08);

      gain.gain.setValueAtTime(0.35, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.08);

      osc.connect(gain);
      gain.connect(this.musicGain);
      osc.start(time);
      osc.stop(time + 0.085);
    } catch {}
  }

  // Snappy Snare Drum
  private synthSnare(time: number) {
    if (!this.ctx || !this.musicGain || this.isMuted) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(240, time);
      osc.frequency.exponentialRampToValueAtTime(80, time + 0.06);

      gain.gain.setValueAtTime(0.2, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.06);

      osc.connect(gain);
      gain.connect(this.musicGain);
      osc.start(time);
      osc.stop(time + 0.065);
    } catch {}
  }
}

export const audioEngine = new AudioEngine();
