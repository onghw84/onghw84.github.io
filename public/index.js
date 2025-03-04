//const chars = "尝候兴都急谁壮阳非怎暖钱些王如肉面校处刚送死直所圆岁光羽这吓升迟群太讲像外新夜方洋举原借请勇道间排乱事豆饱身样课怕信茶丢体热吹运安因病然球温忙该种冰吃床窗教跳傻机朵百角汽动晴流棉平咚命游别池虹蚊主肚跟叫凉踢雷就电跑忘裙害猴捉保常闷做告井伙燕忽鬼野喜镜场想近脸爱晶颜一二三四五六七八九十";
const chars = "一二三四";
const unfamiliarChar = "经物让腰唱往腿结荷停舌食转";

var chars_array = chars.split("");
var tested = Array(chars_array.length).fill(0);
var total = 0;

document.getElementById("next-btn").addEventListener("click", nextHandler)
document.getElementById("error-btn").addEventListener("click", errorHandler)
const character = document.getElementById("character");
const totalD = document.getElementById("total");

let setSelect = document.querySelectorAll('input[name="char_set"]');
for (let i = 0; i < setSelect.length; i++) {
  setSelect[i].addEventListener("change", function() {
    if (this.value == 1){
      chars_array = chars.split("");
      tested = Array(chars_array.length).fill(0);
      nextHandler();
    }
    else {
      chars_array = unfamiliarChar.split("");
      tested = Array(chars_array.length).fill(0);
      nextHandler();
    }
  });
}

function nextHandler() {  
  var index = Math.floor(Math.random()*chars_array.length);
  var max = Math.max(...tested);
  if (Math.min(...tested) == max){max += 1;}
  while (tested[index] >= max){
    index = Math.floor(Math.random()*chars_array.length);  
  }
  character.innerText = chars_array[index];
  tested[index] += 1;
  total += 1;
  totalD.innerHTML = total;
  /*const data = await fetch("/api/character", {
    method: "get",
    headers: {
      "Accept": "application/json",
      "Content-type": "application/json"
    },
    body: JSON.stringify({"text": textArea.value, "locale": localeArea.value})
  });

  const parsed = await data.json();
  if (parsed.error) {
    errorArea.innerText = JSON.stringify(parsed);
    return;
  }

  translatedArea.innerHTML = parsed.translation;*/
  return;
};

function errorHandler() {
  var index = chars_array.indexOf(character.innerText);
  tested[index] -= 2; total -= 1;
  nextHandler();
  return;
};


//document.getElementById('input[name="char_set"]').addEventListener("change", console.log("charset1"));
