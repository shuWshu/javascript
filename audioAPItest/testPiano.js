// 音声ファイルの読み込み
// 開いているディレクトリからのパスを指定
const pianoSamples = {
    "C4": "/sound_piano/maou_se_inst_piano2_1do.mp3",
    "D4": "/sound_piano/maou_se_inst_piano2_2re.mp3",
    "E4": "/sound_piano/maou_se_inst_piano2_3mi.mp3",
    "F4": "/sound_piano/maou_se_inst_piano2_4fa.mp3",
    "G4": "/sound_piano/maou_se_inst_piano2_5so.mp3",
    "A4": "/sound_piano/maou_se_inst_piano2_6ra.mp3",
    "B4": "/sound_piano/maou_se_inst_piano2_7si.mp3"
};

let pianoID = undefined;

// Tone.Samplerを初期化
const piano = new Tone.Sampler(pianoSamples).toDestination();
// エフェクトを追加
// https://tonejs.github.io/docs/r13/Reverb
const reverb = new Tone.Reverb(2).toDestination();
piano.connect(reverb);

// エフェクトを追加
const pitchShift = new Tone.PitchShift().toDestination();
piano.connect(pitchShift);
// 関数：ピッチを変更する
function changePitch(value) {
    pitchShift.pitch = value;
}

// 複数ある場合はconnectで繋ぐべきかも
// reverb.connect(pitchshift)

// 音量調整
// 音割れの防止
Tone.Master.volume.value = -6; // デシベルで設定 (-6dBは約0.5倍)



function startPiano(){
    if(pianoID){ 
        // const notes = ["C4", "D4", "E4", "F4", "G4", "A4", "B4"];
        // const randomNote = notes[Math.floor(Math.random() * notes.length)];
        // // すでに流れているならランダムに音程変化
        // // 音程を変化させて再生
        // piano.triggerAttackRelease(randomNote, "4n");
        
        // 音が重なっている感じがする？
        changePitch(12);
        
        return
    }
    piano.triggerAttack("C4");
    
    pianoID = 1;
}

function stopAudio(){
    if(pianoID){
        piano.triggerRelease();
        clearInterval(pianoID);
        pianoID = undefined;
    }
}

function startAudio(){
    startPiano();
}


