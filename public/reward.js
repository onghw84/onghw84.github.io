const rewardDiv = document.getElementById("reward");

song_list = [
	"https://www.youtube.com/watch?v=bWUgZm_AE64",
	"https://www.youtube.com/watch?v=V5Bs9xydba0",
];
/*
	"https://www.youtube.com/watch?v=Ywgpv1pYvb4",
    "https://www.youtube.com/watch?v=EGHQecqF4V0",
    "https://www.youtube.com/watch?v=Ql8kUKyuHXc",
    "https://www.youtube.com/shorts/SCV_cizxtf8",
    "https://www.youtube.com/shorts/l1StGzLX7LY",
    "https://www.youtube.com/shorts/rYaokGRva_w",
    "https://www.youtube.com/shorts/Vgd10ASuZP0",
    "https://www.youtube.com/shorts/3YG4t_42_XY",
    "https://www.youtube.com/watch?v=OnThkOMc658",
    "https://www.youtube.com/watch?v=wV9UUVkWJLk",
    "https://www.youtube.com/watch?v=DVsGVkZXaMs",
    "https://www.youtube.com/watch?v=lTK79WBzgUA",
    "https://www.youtube.com/shorts/8ENpdX4QGTo",
    "https://www.youtube.com/watch?v=bWUgZm_AE64",
	"https://www.youtube.com/watch?v=x9rAaK0lC7s",
	"https://www.youtube.com/shorts/092rsFvciJY",		
	"https://www.youtube.com/watch?v=e81A9pw59tM",
	"https://www.youtube.com/shorts/onadBK5OgXE",
	"https://www.youtube.com/shorts/WrThhFosciA",
	"https://www.youtube.com/watch?v=Lcp2lrZhC6E",
	"https://www.youtube.com/watch?v=n4OFVR3V6G8",
	"https://www.youtube.com/watch?v=lTK79WBzgUA",
	"https://www.youtube.com/watch?v=Gkysb_8N9os",
	"https://www.youtube.com/shorts/SeXDsT1whyQ",
	"https://www.youtube.com/watch?v=EgiQ6GliTrI",
	"https://www.youtube.com/watch?v=_RIRdEXZAFQ",
	"https://www.youtube.com/watch?v=XTwg-Ki1X70",
	"https://www.youtube.com/watch?v=5aJKBNKDPw8",
	"https://www.youtube.com/watch?v=uw4MnVm01Fg",
	"https://www.youtube.com/watch?v=Ix1bH7ExYtg",
	"https://www.youtube.com/watch?v=E1_ceyOpRZ0",
	"https://www.youtube.com/watch?v=y1vcz_qZjNk&t=34s",
	"https://www.youtube.com/watch?v=qAna4oPVPnc&t=32s",
	"https://www.youtube.com/watch?v=Z1oUicAW_lc&t=34s",
	"https://www.youtube.com/watch?v=ugv0IpltKBM&t=39s",
	"https://www.youtube.com/watch?v=zSKs_LJ3-K8&t=44s",
	"https://www.youtube.com/watch?v=eTyisKTA9mo&t=32s",
	"https://www.youtube.com/watch?v=ThudFFly5qQ&t=44s",
	"https://www.youtube.com/watch?v=oY89rbSIX_Q&t=37s"
	
];*/

rewardDiv.innerHTML =  `
      <img id="cat1" src="./public/reward/kitty1.gif" alt="cat1" >
	  <img id="bee1" src="./public/reward/bee1.gif" alt="bee1" >
      <img id="cat2" src="./public/reward/kitty2.gif" alt="cat2" >
	  <img id="bee2" src="./public/reward/bee2.gif" alt="bee2" >	  
      <img id="cat3" src="./public/reward/kitty3.gif" alt="cat3" >
	  <img id="bee3" src="./public/reward/bee3.gif" alt="bee3" >
      <img id="cat4" src="./public/reward/kitty4.gif" alt="cat4" >
	  <img id="bee4" src="./public/reward/bee4.gif" alt="bee4" >
      <img id="cat5" src="./public/reward/kitty5.gif" alt="cat5" >
	  <img id="bee5" src="./public/reward/bee5.gif" alt="bee5" >
      <img id="cat6" src="./public/reward/kitty6.gif" alt="cat6" >
	  <img id="bee6" src="./public/reward/bee6.gif" alt="bee6">
      <img id="cat7" src="./public/reward/kitty7.gif" alt="cat7" >
      <img id="cat8" src="./public/reward/kitty8.gif" alt="cat8" >
	  
      <a id="song" class="button" href="https://www.youtube.com/watch?v=Ywgpv1pYvb4" target="_blank">REWARD!</a>
`

class Reward {

    showReward(total, scale) {
        if (total >= scale*1){
            document.getElementById("cat1").style.visibility = "visible";
        }
        else {document.getElementById("cat1").style.visibility = "hidden";}
        if (total >= scale*2){
            document.getElementById("bee1").style.visibility = "visible";
        }
		else {document.getElementById("bee1").style.visibility = "hidden";}
		if (total >= scale*3){
            document.getElementById("cat2").style.visibility = "visible";
        }
		else {document.getElementById("cat2").style.visibility = "hidden";}
        if (total >= scale*4){
            document.getElementById("bee2").style.visibility = "visible";
        }		
		else {document.getElementById("bee2").style.visibility = "hidden";}
        if (total >= scale*5){
            document.getElementById("cat3").style.visibility = "visible";
        }
        else {document.getElementById("cat3").style.visibility = "hidden";}
        if (total >= scale*6){
            document.getElementById("bee3").style.visibility = "visible";
        }
        else {document.getElementById("bee3").style.visibility = "hidden";}
        if (total >= scale*7){
            document.getElementById("cat4").style.visibility = "visible";
        }
        else {document.getElementById("cat4").style.visibility = "hidden";}
        if (total >= scale*8){
            document.getElementById("bee4").style.visibility = "visible";
        }
        else {document.getElementById("bee4").style.visibility = "hidden";}
        if (total >= scale*9){
            document.getElementById("cat5").style.visibility = "visible";
        }
        else {document.getElementById("cat5").style.visibility = "hidden";}
        if (total >= scale*10){
            document.getElementById("bee5").style.visibility = "visible";
        }
        else {document.getElementById("bee5").style.visibility = "hidden";}		
        if (total >= scale*11){
            document.getElementById("cat6").style.visibility = "visible";
        }
        else {document.getElementById("cat6").style.visibility = "hidden";}
        if (total >= scale*12){
            document.getElementById("bee6").style.visibility = "visible";
        }
        else {document.getElementById("bee6").style.visibility = "hidden";}		
        if (total >= scale*13){
            document.getElementById("cat7").style.visibility = "visible";
        }
        else {document.getElementById("cat7").style.visibility = "hidden";}
        if (total >= scale*14){
            document.getElementById("cat8").style.visibility = "visible";
        }     
        else {document.getElementById("cat8").style.visibility = "hidden";}
        if (total >= scale*15){
            var index = Math.floor(Math.random()*song_list.length);
            console.log(index);
            document.getElementById("song").href=song_list[index];
            document.getElementById("song").style.visibility = "visible";
        }
        else {document.getElementById("song").style.visibility = "hidden";}
        return;
    }
}
