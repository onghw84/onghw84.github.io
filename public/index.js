const chars1 = "尝候兴都急谁壮阳非怎暖钱些王如肉面校处刚送死直所圆岁光羽这吓升迟群太讲像外新夜方洋举原借请勇道间排乱事豆饱身样课怕信茶丢体热吹运安因病然球温忙该种冰吃床窗教跳傻机朵百角汽动晴流棉平咚命游别池虹蚊主肚跟叫凉踢雷就电跑忘裙害猴捉保常闷做告井伙燕忽鬼野喜镜场想近脸爱晶颜更语笑昨雨儿进说办服";
const chars2 = "小爬子娃虫森胖旁参开拿众我月不妹法每闪彩力尺关笔是田眼学们花巴黑同路去工站穿您皮许蛙她你刀快香口长最才很业文蓝点半本以门果苹芽放字红色医尖问早吵晚灯他呀画的国台什洗还数海发无反姐中觉久尘双过甜院多洞来绿会挂丽毛叔串左今师朋边时住友玩音男弯家数加纸用睡鸭比变找星马冬一二三四五六七八九十";
const chars3 = "亲秋书足么牙山当雪坐衣旗夏车青吗下吧真歌把再鸦远两莲写回向上妈哥河风大可火鸟乐气在木船鱼条女心贝包给耳日兔土几叶对孩听正活己亮鼻作牛弟年它狗目鸡黄奶前高桥影金成也了短得水西飞只少要猫步分起桌个好伞草午为出从地空云走人右村故千后生爸美着那林明里春又片吐打自全采白公见乌没和看有立声北米老东南爷桃天头到石尾手";
const unfamiliarChar = "经物让腰唱往腿结荷停舌食转";

const pinyin1 = ['cháng','hòu','xìng','dōu/dū','jí','shuí','zhuàng','yáng','fēi','zěn','nuǎn','qián','xiē','wáng','rú','ròu','miàn','xiào/jiào','chǔ','gāng','sòng','sǐ','zhí','suǒ','yuán','suì','guāng','yǔ','zhè','xià','shēng','chí','qún','tài','jiǎng','xiàng','wài','xīn','yè','fāng','yáng','jǔ','yuán','jiè','qǐng','yǒng','dào','jiān','pái','luàn','shì','dòu','bǎo','shēn','yàng','kè','pà','xìn','chá','diū','tǐ','rè','chuī','yùn','ān','yīn','bìng','rán','qiú','wēn','máng','gāi','zhǒng','bīng','chī','chuáng','chuāng','jiào','tiào','shǎ','jī','duǒ','bǎi','jiǎo','qì','dòng','qíng','liú','mián','píng','dōng','mìng','yóu','bié','chí','hóng','wén','zhǔ','dù','gēn','jiào','liáng','tī','léi','jiù','diàn','pǎo','wàng','qún','hài','hóu','zhuō','bǎo','cháng','mèn','zuò','gào','jǐng','huǒ','yàn','hū','guǐ','yě','xǐ','jìng','cháng','xiǎng','jìn','liǎn','ài','jīng','yán','gēng','yǔ','xiào','zuó','yǔ','ér','jìn','shuō','bàn','fú'];
const pinyin2 = ['xiǎo','pá','zǐ','wá','chóng','sēn','pàng','páng','cān','kāi','ná','zhòng','wǒ','yuè','bù','mèi','fǎ','měi','shǎn','cǎi','lì','chǐ','guān','bǐ','shì','tián','yǎn','xué','mén','huā','bā','hēi','tóng','lù','qù','gōng','zhàn','chuān','nín','pí','xǔ','wā','tā','nǐ','dāo','kuài','xiāng','kǒu','cháng','zuì','cái','hěn','yè','wén','lán','diǎn','bàn','běn','yǐ','mén','guǒ','píng','yá','fàng','zì','hóng','sè','yī','jiān','wèn','zǎo','chǎo','wǎn','dēng','tā','yā','huà','de','guó','tái','shén','xǐ','huán','shù','hǎi','fā','wú','fǎn','jiě','zhōng','jué','jiǔ','chén','shuāng','guò','tián','yuàn','duō','dòng','lái','lǜ','huì','guà','lì','máo','shū','chuàn','zuǒ','jīn','shī','péng','biān','shí','zhù','yǒu','wán','yīn','nán','wān','jiā','shù','jiā','zhǐ','yòng','shuì','yā','bǐ','biàn','zhǎo','xīng','mǎ','dōng','yī','èr','sān','sì','wǔ','liù','qī','bā','jiǔ','shí'];
const pinyin3 = ['qīn','qiū','shū','zú','me','yá','shān','dāng','xuě','zuò','yī','qí','xià','chē','qīng','má','xià','bā','zhēn','gē','bǎ','zài','yā','yuǎn','liǎng','lián','xiě','huí','xiàng','shàng','mā','gē','hé','fēng','dà','kě','huǒ','niǎo','lè','qì','zài','mù','chuán','yú','tiáo','nǚ','xīn','bèi','bāo','gěi','ěr','rì','tù','tǔ','jī','yè','duì','hái','tīng','zhèng','huó','jǐ','liàng','bí','zuò','niú','dì','nián','tā','gǒu','mù','jī','huáng','nǎi','qián','gāo','qiáo','yǐng','jīn','chéng','yě','liǎo','duǎn','dé','shuǐ','xī','fēi','zhī','shǎo','yào','māo','bù','fēn','qǐ','zhuō','gè','hǎo','sǎn','cǎo','wǔ','wéi','chū','cóng','dì','kōng','yún','zǒu','rén','yòu','cūn','gù','qiān','hòu','shēng','bà','měi','zhuó','nà','lín','míng','lǐ','chūn','yòu','piàn','tǔ','dǎ','zì','quán','cǎi','bái','gōng','jiàn','wū','méi','hé','kàn','yǒu','lì','shēng','běi','mǐ','lǎo','dōng','nán','yé','táo','tiān','tóu','dào','shí','wěi','shǒu'];
const pinyin_unfamiliar = ['jīng','wù','ràng','yāo','chàng','wǎng','tuǐ','jié','hé','tíng','shé','shí','zhuàn']
let reward = new Reward();

var chars_array = chars1.split("");
var pinyin_array = [...pinyin1];
var tested = Array(chars_array.length).fill(0);
var total = 0;

document.getElementById("next-btn").addEventListener("click", nextHandler)
document.getElementById("error-btn").addEventListener("click", errorHandler)
document.getElementById("learn").innerHTML = chars1.length + chars2.length + chars3.length;
const character = document.getElementById("character");
const count = document.getElementById("count");
const pinyin = document.getElementById("pinyin");
const totalD = document.getElementById("total");

const setSelect = document.querySelectorAll('input[name="char_set"]');
for (let i = 0; i < setSelect.length; i++) {
  setSelect[i].addEventListener("change", function() {
    if (this.value == 0){
      chars_array = unfamiliarChar.split("");
      pinyin_array = [...pinyin_unfamiliar];
    }
    else if (this.value == 1){
      chars_array = chars1.split("");
      pinyin_array = [...pinyin1];
    }
    else if (this.value == 2){
      chars_array = chars2.split("");
      pinyin_array = [...pinyin2];
    }
    else {
      chars_array = chars3.split("");
      pinyin_array = [...pinyin3];
    }     
    tested = Array(chars_array.length).fill(0);
    nextHandler();	
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
  count.innerText = tested[index]+1;
  if (index <= pinyin_array.length){
    pinyin.style.visibility = "visible";
    pinyin.innerText = pinyin_array[index];
  }
  else {pinyin.style.visibility = "hidden";}
  tested[index] += 1;
  total += 1;
  totalD.innerHTML = total;

  reward.showReward(total, 30);
  return;
};

function errorHandler() {
  var index = chars_array.indexOf(character.innerText);
  tested[index] -= 2; total -= 1;
  nextHandler();
  return;
};

document.getElementById("song").addEventListener("click", function (){
  total = 0;  
  totalD.innerHTML = total;
  reward.showReward(total, 30);
});
