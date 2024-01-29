const audioContext = new AudioContext();
let oscillator;

function startAudio() {
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }

    oscillator = audioContext.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
    oscillator.connect(audioContext.destination);
    oscillator.start();
}

function stopAudio() {
    if (oscillator) {
        oscillator.stop();
        oscillator.disconnect();
    }
}

function changeFrequency(value) {
    if (oscillator) {
        oscillator.frequency.setValueAtTime(value, audioContext.currentTime);
        console.log(value);
    }
}
