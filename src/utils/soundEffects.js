// TinyMind Web Audio API Synthesizer Sound Effects
// Pure code sounds - no assets to load!

let audioCtx = null;
let isMuted = true; // Muted by default to satisfy browser policies

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export const toggleMute = (mutedState) => {
  isMuted = mutedState !== undefined ? mutedState : !isMuted;
  if (!isMuted) {
    getAudioContext(); // Initialize context on first interaction
  }
  return isMuted;
};

export const getMuteStatus = () => isMuted;

// 1. Tactile click - high-pitch bouncy pop
export const playClickSound = () => {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'triangle';
    // Fast pitch sweep up for a "pop"
    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(700, now + 0.08);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

    osc.start(now);
    osc.stop(now + 0.09);
  } catch (e) {
    console.error('Audio failed', e);
  }
};

// 2. Success chime - sweet ascending happy arpeggio
export const playSuccessSound = () => {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // Play three notes rapidly: C5, E5, G5, C6
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);
      
      gain.gain.setValueAtTime(0.2, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.08 + 0.25);
      
      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.26);
    });
  } catch (e) {
    console.error('Audio failed', e);
  }
};

// 3. Failure buzz - funny low-frequency down-sliding buzz
export const playFailureSound = () => {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'sawtooth';
    const now = ctx.currentTime;
    
    // Slump frequency downwards
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.linearRampToValueAtTime(80, now + 0.25);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.26);

    osc.start(now);
    osc.stop(now + 0.27);
  } catch (e) {
    console.error('Audio failed', e);
  }
};

// 4. Level Unlock Fanfare - magical ascending retro sequence
export const playUnlockSound = () => {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // 8-bit style ascending bleeps
    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50, 1318.51];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = idx % 2 === 0 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.06);
      
      gain.gain.setValueAtTime(0.15, now + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.06 + 0.15);
      
      osc.start(now + idx * 0.06);
      osc.stop(now + idx * 0.06 + 0.16);
    });
  } catch (e) {
    console.error('Audio failed', e);
  }
};

// 5. Sound of clicking a locked item - tight double bump
export const playLockedSound = () => {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    [0, 0.08].forEach((delay) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(120, now + delay);
      
      gain.gain.setValueAtTime(0.2, now + delay);
      gain.gain.exponentialRampToValueAtTime(0.01, now + delay + 0.06);
      
      osc.start(now + delay);
      osc.stop(now + delay + 0.07);
    });
  } catch (e) {
    console.error('Audio failed', e);
  }
};
