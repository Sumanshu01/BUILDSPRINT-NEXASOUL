'use client';

class SoundController {
  constructor() {
    this.ctx = null;
    this.droneOsc = null;
    this.droneGain = null;
    this.isMuted = true;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playClick() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1400, this.ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch {
      // Audio safety fallback
    }
  }

  playSuccess() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.08);

        gain.gain.setValueAtTime(0.15, this.ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.08 + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + idx * 0.08);
        osc.stop(this.ctx.currentTime + idx * 0.08 + 0.4);
      });
    } catch {
      // Audio safety fallback
    }
  }

  toggleAmbient(enable) {
    this.init();
    if (!this.ctx) return;

    if (!enable) {
      if (this.droneOsc) {
        try {
          this.droneGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.8);
          setTimeout(() => {
            if (this.droneOsc) {
              this.droneOsc.stop();
              this.droneOsc.disconnect();
              this.droneOsc = null;
            }
          }, 850);
        } catch {
          this.droneOsc = null;
        }
      }
      this.isMuted = true;
    } else {
      this.isMuted = false;
      try {
        if (!this.droneOsc) {
          const osc1 = this.ctx.createOscillator();
          const filter = this.ctx.createBiquadFilter();
          const gain = this.ctx.createGain();

          osc1.type = 'sawtooth';
          osc1.frequency.setValueAtTime(55, this.ctx.currentTime); // Low A1

          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(140, this.ctx.currentTime);

          gain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.04, this.ctx.currentTime + 1.5);

          osc1.connect(filter);
          filter.connect(gain);
          gain.connect(this.ctx.destination);

          osc1.start();
          this.droneOsc = osc1;
          this.droneGain = gain;
        }
      } catch {
        // Audio fallback
      }
    }
  }
}

export const soundManager = new SoundController();
