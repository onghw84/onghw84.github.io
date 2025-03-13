const rewardDiv = document.getElementById("reward");

song_list = ["https://www.youtube.com/watch?v=Ywgpv1pYvb4",
    "https://www.youtube.com/watch?v=EGHQecqF4V0&list=PLr-zkbNcUmXaJ30A2bHwTPd7_0ohwRBL7&index=7",
    "https://www.youtube.com/watch?v=Ql8kUKyuHXc&list=PLr-zkbNcUmXaJ30A2bHwTPd7_0ohwRBL7&index=4",
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
    "https://www.youtube.com/watch?v=bWUgZm_AE64"
];

rewardDiv.innerHTML =  `
      <img id="cat1" src="https://www.animatedimages.org/data/media/1250/animated-hello-kitty-image-0146.gif" alt="cat1" >
	  <img id="bee1" src="https://www.animatedimages.org/data/media/185/animated-bee-image-0130.gif" alt="bee1" >
      <img id="cat2" src="https://www.animatedimages.org/data/media/1250/animated-hello-kitty-image-0024.gif" alt="cat2" >
	  <img id="bee2" src="https://www.animatedimages.org/data/media/185/animated-bee-image-0153.gif" alt="bee2" >	  
      <img id="cat3" src="https://www.animatedimages.org/data/media/1250/animated-hello-kitty-image-0058.gif" alt="cat3" >
	  <img id="bee3" src="https://www.animatedimages.org/data/media/185/animated-bee-image-0167.gif" alt="bee3" >
      <img id="cat4" src="https://www.animatedimages.org/data/media/1250/animated-hello-kitty-image-0150.gif" alt="cat4" >
	  <img id="bee4" src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGZod29ubGN0cjBqczhpZzFxaWljdjQ3dXg5YTZ1eWc4aHR3MWp3biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/QXJa2uAa44fYRSats0/giphy.gif" alt="bee4" >
      <img id="cat5" src="https://www.animatedimages.org/data/media/1250/animated-hello-kitty-image-0149.gif" alt="cat5" >
	  <img id="bee5" src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExdThrc3B0cTJsc3JpczV4ZTJzeDZ1cmhramZncnh3amw2cGtxM3kweCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/SVa1GVyrxRkyxsknr9/giphy.gif" alt="bee5" >
      <img id="cat6" src="https://www.animatedimages.org/data/media/1250/animated-hello-kitty-image-0061.gif" alt="cat6" >
	  <img id="bee6" src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExaGM4NmZ5MHcyNXNhcHFkdnFpdnQzZHNkanB5ZjU5eHBrdGVrZGh1MyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/8shyTgbZKKLzW/giphy.gif" alt="bee6">
      <img id="cat7" src="https://www.animatedimages.org/data/media/1250/animated-hello-kitty-image-0139.gif" alt="cat7" >
      <img id="cat8" src="https://www.animatedimages.org/data/media/1250/animated-hello-kitty-image-0154.gif" alt="cat8" >
	  
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
