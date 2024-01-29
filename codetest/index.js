// グローバル変数
let inputNum = [];
let activation = [false];

// エンターキーの有効化判定
function enterActivate(){
  if(inputNum.length == 10 && inputNum[0] == 0 ||
     inputNum.length == 11 && inputNum[0] == 0 && inputNum[2] == 0){
    activation[0] = true;
  }else{
    activation[0] = false;
  }
}

// エンターキーを押した時の処理
function clickEnter(){
  inputNum = [];
  inputViewUpdate();
  const body = document.querySelector("body");
  body.classList.remove("nomal");
  body.classList.add("blink");
  setTimeout(function(){
    body.classList.remove("blink");
    body.classList.add("nomal");
  }, 250);
}

// 電話番号の出力
function getPhoneNumber(){
  let PhoneNumber = "";
  const numberViewList = document.querySelectorAll(".o-input--num-display");
  for(const numberView of numberViewList){
    PhoneNumber = PhoneNumber + numberView.textContent;
  }
  console.log(PhoneNumber);
  return PhoneNumber;
}

// 画面のアップデート
function inputViewUpdate(){
  // インプット
  for(let i = 0; i <= 10; ++i){
    const digit = document.querySelector("#digit"+i);
    const digitView = digit.querySelector(".number");
    const digitUnderLine = digit.querySelector(".underLine");
    const num = inputNum[i];
    if(num == undefined){
      digitView.textContent = ""
      digitUnderLine.classList.remove("c1");
      digitUnderLine.classList.add("c0");
    }else{
      digitView.textContent = num;
      digitUnderLine.classList.remove("c0");
      digitUnderLine.classList.add("c1");
    }
  }
  getPhoneNumber();
  // エンターキー
  enterActivate();
  const enterView = document.querySelector("#keypad-enter");
  if(activation[0]){
    enterView.classList.remove("disabled");
    enterView.querySelector(".circle").classList.remove("inactive");
  }else{
    enterView.classList.add("disabled");
    enterView.querySelector(".circle").classList.add("inactive");
  }
}

// キー判定リスナーの設定
const keypads = []; // 数字キー
for(let i = 0; i <= 9; ++i){
  keypads.push(document.querySelector("#keypad-"+i)); 
  keypads[i].addEventListener("click", function(event){
    const keyElement = event.currentTarget;
    const keyNum = keyElement.querySelector(".keyNumber").textContent;
    console.log("push key: "+keyNum);
    if(inputNum.length < 11){ inputNum.push(keyNum); }
    inputViewUpdate();
    return keyNum;
  });
}
const keyDelete = document.querySelector("#keypad-delete");
keyDelete.addEventListener("click", function(){
  console.log("push key: delete");
  inputNum.pop();
  inputViewUpdate();
});
const keyEnter = document.querySelector("#keypad-enter");
keyEnter.addEventListener("click", function(event){
  const keyElement = event.currentTarget;
  const state = keyElement.classList.contains("disabled");
  if(!state){
    console.log("push key: enter");
    clickEnter();
  }
});
