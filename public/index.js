const chars1 = "尝候兴都急谁壮阳非怎暖钱些王如肉面校处刚送死直所圆岁光羽这吓升迟群太讲像外新夜方洋举原借请勇道间排乱事豆饱身样课怕信茶丢体热吹运安因病然球温忙该种冰吃床窗教跳傻机朵百角汽动晴流棉平咚命游别池虹蚊主肚跟叫凉踢雷就电跑忘裙害猴捉保常闷做告井伙燕忽鬼野喜镜场想近脸爱晶颜";
const chars2 = "更语笑昨雨儿进说办服小爬子娃虫森胖旁参开拿众我月不妹法每闪彩力尺关笔是田眼学们花巴黑同路去工站穿您皮许蛙她你刀快香口长最才很业文蓝点半本以门果苹芽放字红色医尖问早吵晚灯他呀画的国台什洗还数海发无反姐中觉久尘双过甜院多洞来绿会挂丽毛叔串左今师朋边时住友玩音男弯家数加纸用睡鸭比变找星马冬一二三四五六七八九十";
const chars3 = "亲秋书足么牙山当雪坐衣旗夏车青吗下吧真歌把再鸦远两莲写回向上妈哥河风大可火鸟乐气在木船鱼条女心贝包给耳日兔土几叶对孩听正活己亮鼻作牛弟年它狗目鸡黄奶前高桥影金成也了短得水西飞只少要猫步分起桌个好伞草午为出从地空云走人右村故千后生爸美着那林明里春又片吐打自全采白公见乌没和看有立声北米老东南爷桃天头到石尾手";
const unfamiliarChar = "经物让腰唱往腿结荷停舌食转";

var chars_array = chars1.split("");
var tested = Array(chars_array.length).fill(0);
var total = 0;

document.getElementById("next-btn").addEventListener("click", nextHandler)
document.getElementById("error-btn").addEventListener("click", errorHandler)
document.getElementById("learn").innerHTML = chars1.length + chars2.length + chars3.length;
const character = document.getElementById("character");
const totalD = document.getElementById("total");

let setSelect = document.querySelectorAll('input[name="char_set"]');
for (let i = 0; i < setSelect.length; i++) {
  setSelect[i].addEventListener("change", function() {
    if (this.value == 0){
      chars_array = unfamiliarChar.split("");
      tested = Array(chars_array.length).fill(0);
      nextHandler();
    }
    else if (this.value == 1){
      chars_array = chars1.split("");
      tested = Array(chars_array.length).fill(0);
      nextHandler();
    }
  else if (this.value == 2){
    chars_array = chars2.split("");
    tested = Array(chars_array.length).fill(0);
    nextHandler();
  }
  else {
    chars_array = chars3.split("");
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

  if (total >= 50){
    document.getElementById("cat1").style.visibility = "visible";
  }
  if (total >= 100){
    document.getElementById("cat2").style.visibility = "visible";
  }
  if (total >= 150){
    document.getElementById("cat3").style.visibility = "visible";
  }
  if (total >= 200){
    document.getElementById("cat4").style.visibility = "visible";
  }
  if (total >= 250){
    document.getElementById("cat5").style.visibility = "visible";
  }
  if (total >= 300){
    document.getElementById("cat6").style.visibility = "visible";
  }
  if (total >= 350){
    document.getElementById("cat7").style.visibility = "visible";
  }
  if (total >= 400){
    document.getElementById("cat8").style.visibility = "visible";
  }     
  if (total >= 450){
    document.getElementById("song").style.visibility = "visible";
  }       
  return;
};

function errorHandler() {
  var index = chars_array.indexOf(character.innerText);
  tested[index] -= 2; total -= 1;
  nextHandler();
  return;
};
