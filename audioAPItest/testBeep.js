

let beepID = undefined;

// Tone.Synthを初期化
const synth = new Tone.Synth().toDestination();

function startBeep(){
    if(beepID){
        return
    }
    // Tone.jsのオーディオコンテキストを開始
    Tone.start();

    // C4の音を鳴らし始める
    synth.triggerAttack("C4");
    beepID = 1;
}

function stopAudio(){
    if(beepID){
        synth.triggerRelease();
        clearInterval(beepID);
        beepID = undefined;
    }
}

function startAudio(){
    startBeep();
}

// 音程変化
function changeFrequency(value) {
    if (beepID) {
        // シンセサイザーの周波数を更新
        synth.frequency.setValueAtTime(Tone.Frequency(value), Tone.now());
        console.log(value);
    }
}
