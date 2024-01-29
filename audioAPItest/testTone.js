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

let beepID = undefined;
let pianoID = undefined;

// Tone.Synthを初期化
const synth = new Tone.Synth().toDestination();
// Tone.Samplerを初期化
const piano = new Tone.Sampler(pianoSamples).toDestination();
// エフェクトを追加
const reverb = new Tone.Reverb(2).toDestination();
piano.connect(reverb);

function startBeep(){
    if(beepID){
        return
    }
    // Tone.jsのオーディオコンテキストを開始
    Tone.start();

    // C4の音を鳴らし始める
    synth.triggerAttack("C4");
    // 一定時間ごとに音程を変更する
    beepID = setInterval(() => {
        // ランダムな音程を生成
        const note = ["C4", "D4", "E4", "F4", "G4", "A4", "B4"][Math.floor(Math.random() * 7)];
        // シンセサイザーの周波数を更新
        synth.frequency.setValueAtTime(Tone.Frequency(note), Tone.now());
    }, 1000); // 1秒ごとに更新
}

function startPiano(){
    if(pianoID){ return }
    // // C4の音を鳴らし始める
    // piano.triggerAttack("C4");

    // // 一定時間ごとに音程を変更する
    // pianoID = setInterval(() => {
    //     // ランダムな音程を生成
    //     const note = ["C4", "D4", "E4", "F4", "G4", "A4", "B4"][Math.floor(Math.random() * 7)];
    //     // ピアノの音程を更新
    //     piano.triggerAttack(note);
    // }, 1000); // 1秒ごとに更新

    // TODO:音が千切れがち
    // 音程を変化させる関数
    function playRandomNote() {
        const notes = ["C4", "D4", "E4", "F4", "G4", "A4", "B4"];
        const randomNote = notes[Math.floor(Math.random() * notes.length)];

        // 音程を変化させつつ再生
        piano.triggerAttackRelease(randomNote, "8n");
    }

    // 一定間隔で音程を変化させる
    pianoID = setInterval(playRandomNote, 1000); // 2秒ごとに変化
}

function stopAudio(){
    if(beepID){
        synth.triggerRelease();
        clearInterval(beepID);
        beepID = undefined;
    }else if(pianoID){
        piano.triggerRelease();
        clearInterval(pianoID);
        pianoID = undefined;
    }
}

function startAudio(){
    let type = document.getElementById('type');
    console.log(type.value)
    if(type.value ==  "beep"){
        startBeep();
    }else if(type.value ==  "piano"){
        startPiano();
    }
}
