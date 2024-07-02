// JavaScript Document
var canvas;
var stage;
var sec=0,msec =0;

var proT,perT,timeT;
var loader;
var currentS = 0;
var inS;
var qState;

var targetSec =6;
var totalSec=180;


var totalC =0;
var errors=0,score=0;
var resultA;

var isGame = false;

var startCont,secondCont,gameCont;
var PlaneSp;
var pDir,pColor;

function Main(){
	canvas = document.getElementById("test");
	stage = new createjs.Stage(canvas);
	optimizeForTouchAndScreens();
	stage.enableMouseOver(10);
	manifest = [

		{src: "images/btstart.png", id: "Bstart"},
		{src: "images/bend2.png", id: "Bend"},
		{src: "images/title.png", id: "Tlogo"},
		{src: "images/btthree.png", id: "Bthree"},
		{src: "images/btsix.png", id: "Bsix"},
		{src: "images/btnine.png", id: "Bnine"},
		{src: "images/Plan_0.png", id: "Plane0"},
		{src: "images/Plan_1.png", id: "Plane1"},
		{src: "images/Plan_2.png", id: "Plane2"},
		{src: "images/Plan_3.png", id: "Plane3"},
		{src: "images/audio.png", id: "Saudio"},
		{src: "images/grey.png", id: "Grey"},
		{src: "images/orange.png", id: "Orange"},
		{src: "sounds/blue.ogg", id: "SBlue"},
		{src: "sounds/red.ogg", id: "SRed"},
		{src: "sounds/right.ogg", id: "SRight"},
		{src: "sounds/left.ogg", id: "SLeft"}

	];
	proT = new createjs.Text("Loading....","600 20px Open Sans","#444");
	proT.y = 350;
	proT.x = 436;
	stage.addChild(proT);
	perT = new createjs.Text("Loading....","400 20px Open Sans","#444");
	perT.y = 350;
	perT.x = 476;
	stage.addChild(perT);
	loader = new createjs.LoadQueue(false);
	loader.installPlugin(createjs.Sound);
	createjs.Sound.alternateExtensions = ["mp3"];
	loader.addEventListener("progress", handleProgress);
	loader.addEventListener("complete", handleComplete);
	loader.loadManifest(manifest, true);

}


function handleProgress(){
	var progresPrecentage = Math.round(loader.progress*100);
	proT.text = String(progresPrecentage+"%");
	perT.text = String(" loaded");
	stage.update();
}
function optimizeForTouchAndScreens () {
	if (createjs.Touch.isSupported()) {
		createjs.Touch.enable(stage);
	}
}
function handleComplete(){
	loader.removeEventListener("progress", handleProgress);
	loader.removeEventListener("complete", handleComplete);
	stage.removeChild(proT);
	stage.removeChild(perT);

	qState = "no";
	isGame = false;
	var element = document.getElementById("loader");
	element.parentNode.removeChild(element);
	showStartScreen();
	//showSecondScreen();
	//createInterface();
	stage.update();
	startMain();


}
function showStartScreen(){
	document.getElementById('tside').innerHTML =  String("Aspects<span>Legacy</span>");
	document.getElementById('tsider').innerHTML =  String("Start of Exam");

	startCont = new createjs.Container();
	var bmp = new createjs.Bitmap(loader.getResult("Bstart"));
	bmp.regX =bmp.image.width/2;
	bmp.regY =bmp.image.height/2;
	bmp.x =stage.canvas.width/2;
	bmp.y =480;
	bmp.name ="bg";

	startCont.addChild(bmp);
	bmp.addEventListener('click',showSecondScreen);
	bmp.cursor = "pointer";

	bmp = new createjs.Bitmap(loader.getResult("Tlogo"));
	bmp.regX =bmp.image.width/2;
	bmp.regY =bmp.image.height/2;
	bmp.x =stage.canvas.width/2;
	bmp.y =240;
	bmp.name ="Title";

	startCont.addChild(bmp);

	addPlaneSprite();

	stage.addChild(startCont);


}
function showSecondScreen(e){
	//alert("cc");
	e.target.removeEventListener('click',showSecondScreen);
	startCont.removeAllChildren();
	stage.removeChild(startCont);
	stage.update();
	secondCont = new createjs.Container();


	var bmp = new createjs.Bitmap(loader.getResult("Bthree"));
	bmp.regX =bmp.image.width/2;
	bmp.regY =bmp.image.height/2;
	bmp.x =stage.canvas.width/2;
	bmp.y =280;
	bmp.name ="bthree";

	bmp.addEventListener('click',chooseAndStart);
	secondCont.addChild(bmp);
	bmp.cursor = "pointer";


	bmp = new createjs.Bitmap(loader.getResult("Bsix"));
	bmp.regX =bmp.image.width/2;
	bmp.regY =bmp.image.height/2;
	bmp.x =stage.canvas.width/2;
	bmp.y =360;
	bmp.name ="bsix";

	bmp.addEventListener('click',chooseAndStart);
	secondCont.addChild(bmp);
	bmp.cursor = "pointer";

	bmp = new createjs.Bitmap(loader.getResult("Bnine"));
	bmp.regX =bmp.image.width/2;
	bmp.regY =bmp.image.height/2;
	bmp.x =stage.canvas.width/2;
	bmp.y =440;
	bmp.name ="bnine";

	bmp.addEventListener('click',chooseAndStart);
	secondCont.addChild(bmp);
	bmp.cursor = "pointer";
	var mT = new createjs.Text("","24px Open Sans","#444445");
	mT.text = String("Select a duration:");
	mT.y = 160;
	mT.x = 398;
	secondCont.addChild(mT);

	stage.addChild(secondCont);
	stage.update();

}
function chooseAndStart(e){
	var bname = String(e.target.name);
	switch(bname){
		case "bthree":
			totalSec=180;
		break;
		case "bsix":
			totalSec=360;
		break;
		case "bnine":
			totalSec=540;
		break;

	}
	secondCont.getChildByName("bthree").removeEventListener('click',chooseAndStart);
	secondCont.getChildByName("bsix").removeEventListener('click',chooseAndStart);
	secondCont.getChildByName("bnine").removeEventListener('click',chooseAndStart);
	createInterface();
}
function createInterface(){

	//e.target.removeEventListener('click',createInterface);
	secondCont.removeAllChildren();
	stage.removeChild(secondCont);
	gameCont = new createjs.Container();


	stage.addChild(gameCont);

	qState = "no";
	pickQuestion();


	stage.update();
	isGame = true;



}
function pickQuestion(){
	inS =0;
	targetSec = 8;
	resultA = new Array();
	var sD = Math.floor(Math.random()*2);
	if(sD == 0){
		 pColor = String("Blue");

	}else{
		pColor = String("Red");
	}

	var cD = Math.floor(Math.random()*2);
	if(cD == 0){
		pDir = String("Right");

	}else{
		pDir = String("Left");
	}

	var bmp = addBmp("Saudio",500,300,true);
	gameCont.addChild(bmp);
	playeAudioMain();

}
function startMain(){

	createjs.Ticker.setFPS(60);
	createjs.Ticker.addEventListener("tick",updateGame);

}
function updateGame(e){
	if(isGame){
	msec++;
	if(msec >= 60){
		msec =0;
		sec++;
		var rsec = totalSec-sec;
		var tStr = String(Math.floor(rsec/60)+ " minutes " +(rsec%60)+" seconds");
		document.getElementById('tsider').innerHTML =  String(tStr);

		if(qState == "yes"){
			targetSec--;
			timeT.text = String(targetSec+" second(s) remaining!");
			if(targetSec <= 0){
				qState = "no";
				clearGameWindow();
				checkAnswer();

			}

		}
	}
	if(sec > totalSec){
		isGame = false;
		sec =0;
		qState = "no";
		clearGameWindow();
		checkAnswer();
		gameOver();
	}
	}
	stage.update();
}

function playAgain(e){
	e.target.removeEventListener('click',playAgain);


}



//color audi
function playeAudioMain(){
	if(inS == 0){
		var aName = String("S"+pColor);
	}else{
		aName = String("S"+pDir);
	}

	var instance = createjs.Sound.play(aName);
	instance.on("complete", createjs.proxy(this.handleCompleteSoundC, this));
  	instance.volume = 1;


}
function handleCompleteSoundC(){
	inS++;
	if(inS < 2){

		playeAudioMain();
	}else{
			inS =0;
			gameCont.removeAllChildren();
			showImages();

		}

}

function showImages(){

	var isDone = false;
	var allFrame = PlaneSp.animations;

	var selFrame = new Array();
	while(!isDone){
		totalC =0;
		var rD = Math.floor(Math.random()*allFrame.length);
		var rName = String(allFrame[rD]);
		if(selFrame.indexOf(rName) == -1){
			selFrame.push(rName);
		}
		if(selFrame.length >= 4){
			var tStr = String(pColor+pDir);
			for(var i =0;i<selFrame.length;i++){
				var sStr = String(selFrame[i]);
				sStr = sStr.slice(0,-1);

				if(sStr == tStr){
					totalC++;
					isDone = true;

				}

			}
			if(!isDone){
				selFrame = [];
			}

		}

	}
	if(isDone){
	i =0;
	for(var r =0; r<2;r++){
		for(var c=0; c<2;c++){
			var pFr = String(selFrame[i]);
			var cFr = String(pFr.slice(0,-1));
			var grayC =  addBmp("Grey",0,0,true);
			gameCont.addChild(grayC);
			grayC.x = c*grayC.image.width+grayC.image.width/2-35+130;
			grayC.y = r*grayC.image.height+grayC.image.height/2+35;
			grayC.name = String(cFr+String(r)+String(c));
			grayC.type = cFr;

			grayC.cursor = "pointer";
			grayC.addEventListener("click",selectPlane);
			var OrangeC =  addBmp("Orange",0,0,true);
			gameCont.addChild(OrangeC);

			OrangeC.x = c*OrangeC.image.width+OrangeC.image.width/2-35+130;
			OrangeC.y = r*OrangeC.image.height+OrangeC.image.height/2+35;
			OrangeC.name = String(cFr+String(r)+String(c)+"o");
			OrangeC.visible = false;

			var planeC =  new createjs.Sprite(PlaneSp,pFr);
			gameCont.addChild(planeC);
			//stage.addChild(planeC);

			planeC.x = 68+c*380;
			planeC.y = r*(planeC.getBounds().height-140)+30;

			pFr = pFr.slice(0,-1);
			planeC.name = pFr;


			i++

		}

	}
	}
	selFrame=[];

	qState = "yes";
	//var bmp = addBmp("Sback",394,0,false);
	//gameCont.addChild(bmp);
	timeT = new createjs.Text("Loading....","400 20px Open Sans","#313131");
	timeT.y = 12;
	timeT.x = 385;

	gameCont.addChild(timeT);
}

function selectPlane(e){
	var tbP = e.target;
	var tName = String(tbP.name);
	var tType = String(tbP.type);

	tName = String(tName+"o");

	gameCont.getChildByName(tName).visible = true;
	var tStr = String(pColor+pDir);
	if(tType == tStr){
		resultA.push(1);

	}else{
		resultA.push(0);
	}

	if(resultA.length >=  4){

		qState = "no";
		clearGameWindow();
		checkAnswer();

	}



}
function checkAnswer(){

	if(resultA.length > 0){
	if(resultA.indexOf(0) == -1){
		var total =0;
		for(var i =0; i<resultA.length;i++){
			total += resultA[i];
		}
		if(total == totalC){
			score++;
		}else{
			errors++;
		}
	}else{
		errors++;

	}
	}else{
		errors++;

	}
	document.getElementById('tsiderx').innerHTML =  String("Errors: "+errors);
	pickQuestion();

}
//audio number

function gameOver(){


	msec =0;
	sec=0;
	createjs.Sound.stop();
	gameCont.removeAllChildren();
	showEndScreen();
}
function showEndScreen(){

	document.getElementById('tside').innerHTML =  String("Aspects<span>Legacy</span>");
	document.getElementById('tsider').innerHTML =  String("End of Exam");
	startCont = new createjs.Container();
	var bmp = new createjs.Bitmap(loader.getResult("Bend"));
	bmp.regX =bmp.image.width/2;
	bmp.regY =bmp.image.height/2;
	bmp.x =stage.canvas.width/2;
	bmp.y =480;
	bmp.name ="bg";
	bmp.cursor = "pointer";
	startCont.addChild(bmp);
	bmp.addEventListener('click',startAgain);

	var mT = new createjs.Text("","24px Open Sans","#444445");
	mT.text = String("You have completed the Aspect Activity.");
	mT.y = 100;
	mT.x = 275;
	startCont.addChild(mT);


	var eT = new createjs.Text("","22px Open Sans","#000000");
	eT.text = String("Errors: "+errors);
	eT.y = 200;
	eT.x = 435;
	startCont.addChild(eT);

	stage.addChild(startCont);
	//var accuracy = giveAresult();
	//var accuracy2 = giveAresultd();
	saveLoaded();
	errors =0;
	score =0;
	stage.update();
}
function startAgain(e){
	e.target.removeEventListener('click',startAgain);
	startCont.removeAllChildren();
	stage.removeChild(startCont);
	showStartScreen();
	stage.update();

}
function addPlaneSprite(){

	var data ={
"framerate":24,
"images":["images/Plan_0.png", "images/Plan_1.png", "images/Plan_2.png", "images/Plan_3.png"],
"frames":[
    [2, 2, 508, 508, 0, -82, -53],
    [518, 2, 508, 508, 0, -82, -53],
    [1034, 2, 508, 508, 0, -82, -53],
    [2, 518, 508, 508, 0, -82, -53],
    [518, 518, 508, 508, 0, -82, -53],
    [1034, 518, 508, 508, 0, -82, -53],
    [2, 1034, 508, 508, 0, -82, -53],
    [518, 1034, 508, 508, 0, -82, -53],
    [1034, 1034, 508, 508, 0, -82, -53],
    [2, 2, 508, 508, 1, -82, -53],
    [518, 2, 508, 508, 1, -82, -53],
    [1034, 2, 508, 508, 1, -82, -53],
    [2, 518, 508, 508, 1, -82, -53],
    [518, 518, 508, 508, 1, -82, -53],
    [1034, 518, 508, 508, 1, -82, -53],
    [2, 1034, 508, 508, 1, -82, -53],
    [518, 1034, 508, 508, 1, -82, -53],
    [1034, 1034, 508, 508, 1, -82, -53],
    [2, 2, 508, 508, 2, -82, -53],
    [518, 2, 508, 508, 2, -82, -53],
    [1034, 2, 508, 508, 2, -82, -53],
    [2, 518, 508, 508, 2, -82, -53],
    [518, 518, 508, 508, 2, -82, -53],
    [1034, 518, 508, 508, 2, -82, -53],
    [2, 1034, 508, 508, 2, -82, -53],
    [518, 1034, 508, 508, 2, -82, -53],
    [1034, 1034, 508, 508, 2, -82, -53],
    [2, 2, 508, 508, 3, -82, -53],
    [518, 2, 508, 508, 3, -82, -53],
    [1034, 2, 508, 508, 3, -82, -53]
],
"animations":{
    "RedRight5": {"speed": 1, "frames": [26]},
    "BlueLeft1": {"speed": 1, "frames": [0]},
    "RedRight8": {"speed": 1, "frames": [29]},
    "BlueLeft5": {"speed": 1, "frames": [4]},
    "BlueRight3": {"speed": 1, "frames": [9]},
    "BlueLeft4": {"speed": 1, "frames": [3]},
    "BlueRight4": {"speed": 1, "frames": [10]},
    "RedLeft1": {"speed": 1, "frames": [15]},
    "BlueRight8": {"speed": 1, "frames": [14]},
    "BlueLeft7": {"speed": 1, "frames": [6]},
    "RedRight1": {"speed": 1, "frames": [22]},
    "BlueRight7": {"speed": 1, "frames": [13]},
    "RedLeft3": {"speed": 1, "frames": [17]},
    "RedLeft2": {"speed": 1, "frames": [16]},
    "BlueRight1": {"speed": 1, "frames": [7]},
    "RedLeft6": {"speed": 1, "frames": [20]},
    "BlueRight6": {"speed": 1, "frames": [12]},
    "BlueLeft6": {"speed": 1, "frames": [5]},
    "BlueRight2": {"speed": 1, "frames": [8]},
    "RedLeft4": {"speed": 1, "frames": [18]},
    "RedRight4": {"speed": 1, "frames": [25]},
    "BlueRight5": {"speed": 1, "frames": [11]},
    "BlueLeft3": {"speed": 1, "frames": [2]},
    "RedRight7": {"speed": 1, "frames": [28]},
    "RedRight2": {"speed": 1, "frames": [23]},
    "RedLeft7": {"speed": 1, "frames": [21]},
    "BlueLeft2": {"speed": 1, "frames": [1]},
    "RedLeft5": {"speed": 1, "frames": [19]},
    "RedRight3": {"speed": 1, "frames": [24]},
    "RedRight6": {"speed": 1, "frames": [27]}
}
};
PlaneSp = new createjs.SpriteSheet(data);


}
//save the score
function saveLoaded(){
	// Create our XMLHttpRequest object
    var hr = new XMLHttpRequest();

	var datastring ="";

	datastring += "aspectErrors"+"="+errors+"&";
	datastring += "duration"+"="+totalSec;


  	 hr.open('POST','saveASScore.php');
    // Set content type header information for sending url encoded variables in the request
    hr.setRequestHeader("Content-type","application/x-www-form-urlencoded");

    // Access the onreadystatechange event for the XMLHttpRequest object
    hr.onreadystatechange = function() {
	    if(hr.readyState == 4 && hr.status == 200) {
		  	 var return_data =hr.responseText;
			//alert(return_data);



	    }
    }
    // Send the data to PHP now... and wait for response to update the status div
    hr.send(datastring); // Actually execute the re


}
function addBmp(bname,tx,ty,isR){
	var bmp = new createjs.Bitmap(loader.getResult(bname));
	if(isR){
		bmp.regX =bmp.image.width/2;
		bmp.regY = bmp.image.height/2;
	}
	bmp.y = ty;
	bmp.x = tx;
	return bmp;

}

function clearGameWindow(){
	for(var i =0; i<gameCont.numChildren;i++){
		if(gameCont.getChildAt(i).hasEventListener("click")){
			gameCont.getChildAt(i).removeEventListener("click",selectPlane);
		}

	}
	gameCont.removeAllChildren();
}