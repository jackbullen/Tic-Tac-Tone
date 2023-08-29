let currentTime;

export function createAudioContext() {
    return new (window.AudioContext || window.webkitAudioContext)();
  }

export function toggleAudio() {
    const audio = document.getElementById('background-audio');
    audio.volume = 0.1;
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}

export function toggleVolumeUp() {
    const audio = document.getElementById('background-audio');
    audio.volume = Math.min(audio.volume + 0.1, 1);
}

export function toggleVolumeDown() {
    const audio = document.getElementById('background-audio');
    audio.volume = Math.max(audio.volume - 0.1, 0);
}

function createToneOscillator(context, frequency) {
    var oscillator = context.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.value = frequency; 
    // Set gain
    var gainNode = context.createGain();
    gainNode.gain.value = 0.2; 
    oscillator.connect(gainNode).connect(context.destination);
  
    currentTime = context.currentTime;
    oscillator.start(currentTime);
    // Create a fade-out effect
    gainNode.gain.exponentialRampToValueAtTime(0.001, currentTime + 1.3); // Adjust the duration as needed
  
    setTimeout(function(s) {
      s.stop(currentTime + 1); // Stop the oscillator after the fade-out
      s.disconnect(); // Disconnect the oscillator to release resources
    }, 1000, oscillator);
  }
  
export function playChord(context, notes) {
    const frequencies = getChordFrequencies(notes);
    frequencies.forEach((frequency) => createToneOscillator(context, frequency));
}

function getChordFrequencies(chord) {
    const chordNotes = {
        'E7': ['E', 'G#', 'B', 'D'],
        'G': ['G', 'B', 'D'],
        'Dm': ['D', 'F', 'A'],
        'C': ['C', 'E', 'G'],
        'F': ['F', 'A', 'C'],
        'A7': ['A', 'C#', 'E', 'G'],
        'A#': ['A#', 'D', 'F'],
        'D7': ['F#', 'A', 'C', 'D'],
    };
    return chordNotes[chord].map((note) => getNoteFrequency(note));
}

function getNoteFrequency(noteName) {
    const noteFrequencies = {
        'C': 261.63,
        'C#': 277.18,
        'D': 293.66,
        'D#': 311.13,
        'E': 329.63,
        'F': 349.23,
        'F#': 369.99,
        'G': 392.00,
        'G#': 415.30,
        'A': 440.00,
        'A#': 466.16,
        'B': 493.88,
    };
    return noteFrequencies[noteName];
}