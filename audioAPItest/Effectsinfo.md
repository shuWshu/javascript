# Tone.js 用のエフェクトリスト

参照：https://tonejs.github.io/docs/r13/Reverb

## reverb

### 概要

-   反響を強化
-   引数は反響のディレイ度合い

### コード例

```
const reverb = new Tone.Reverb(2).toDestination();
piano.connect(reverb);
```

## pitchShift

### 概要

-   音高を変化させる
-   接続するとちょっと割れる？
    -   音量調整で対応

### コード例

```
// 音量調整
Tone.Master.volume.value = -6; // デシベルで設定 (-6dB は約 0.5 倍)

const pitchShift = new Tone.PitchShift().toDestination();
piano.connect(pitchShift);
// 関数：ピッチを変更する
function changePitch(value) {
pitchShift.pitch = value;
}

changePitch(12);
```
