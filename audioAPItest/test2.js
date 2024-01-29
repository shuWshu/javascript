const audioContext = new AudioContext();

function playNote(frequency, duration) {
    const now = audioContext.currentTime;

    // オシレーターの作成
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'triangle';  // ピアノに近い波形
    oscillator.frequency.setValueAtTime(frequency, now);

    // ゲインノードの作成（エンベロープ用）
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // ADSRエンベロープの設定
    const attackTime = 0.2;
    const decayTime = 0.3;
    const sustainLevel = 0.7;
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(1, now + attackTime);
    gainNode.gain.linearRampToValueAtTime(sustainLevel, now + attackTime + decayTime);
    
    // ノートの持続時間に基づいてリリースを開始
    gainNode.gain.setValueAtTime(sustainLevel, now + duration);
    gainNode.gain.linearRampToValueAtTime(0, now + duration + 1);  // リリース時間

    // オシレータの開始と停止
    oscillator.start(now);
    oscillator.stop(now + duration + 1);
}

function startAudio() {
    // 例：A4の音（440Hz）を1秒間鳴らす
    playNote(440, 1);
}