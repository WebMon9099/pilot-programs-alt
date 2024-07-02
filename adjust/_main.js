// JavaScript Document
var canvas;
var stage;
var sec=0;
var totalQ =0;
var proT,perT,timeT;
var loader;
var currentS =0,targetS =30;
var cm=0,targetM = 120;
var cc=0,targetC = 45;
var inS;

var totalSec=1200;
var leftk,rightk,upk,downk,skey,wkey,spacek = false;
var speed,alt,heading;
var jType;
var tspeed,talt,theading;
var spT,altT,headT,tspT,taltT,theadT,quesT,ansT;
var isGame = false;
var spIn,headingIn,altIn;
var startCont,secondCont,gameCont;
var fieldSky,planeBox;
var manageScr;
var fuelOn,airOn,elecOn,hydOn;
var fuelTask,fuelTaskoff,elecTask,elecTaskoff,hydTask,hydTaskoff,airTask,airTaskoff,tempArray;
var fuelCont,elecCont,airCont,hydCont;
var arithAns;
var isDone = false;
var rotD = "left";
var speedR,altR,headR;
var readCont,readCont2,readCont3;
var score;
var errors =0;
var findex = -1;
var trackTime;
function Main(){
	canvas = document.getElementById("test");
	stage = new createjs.Stage(canvas);
	optimizeForTouchAndScreens();
	stage.enableMouseOver(10);
	manifest = [
		
		{src: "images/btstart.png", id: "Bstart"},
		{src: "images/bend.png", id: "Bend"},
		{src: "images/mask.png", id: "Fmask"},
		{src: "images/title.png", id: "Tlogo"},
		{src: "images/btthree.png", id: "Bthree"},
		{src: "images/btsix.png", id: "Bsix"},
		{src: "images/btnine.png", id: "Bnine"},
		{src: "images/terrain.png", id: "Bterrain"},
		{src: "images/mainDisplay.png", id: "Bdisplay"},
		{src: "images/arrow.png", id: "Barrow"},
		{src: "images/headingArrow.png", id: "Bharrow"},
		{src: "images/air_light_on.png", id: "Airon"},
		{src: "images/elec_light_on.png", id: "Elecon"},
		{src: "images/fuel_light_on.png", id: "Fuelon"},
		{src: "images/hyd_light_on.png", id: "Hydon"},
		{src: "images/air2.png", id: "Ascreen"},
		{src: "images/elec2.png", id: "Escreen"},
		{src: "images/fuel2.png", id: "Fscreen"},
		{src: "images/hyd2.png", id: "Hscreen"},
		{src: "images/speed.png", id: "ISpeed"},
		{src: "images/vermask.png", id: "Vmask"},
		{src: "images/altitude.png", id: "IAltitu"},
		{src: "images/hormask.png", id: "Hmask"},
		{src: "images/heading.png", id: "IHead"}
		
	];
	proT = new createjs.Text("Loading....","600 20px Open Sans","#444");
	proT.y = 350;
	proT.x = 656;
	stage.addChild(proT);
	perT = new createjs.Text("Loading....","400 20px Open Sans","#444");
	perT.y = 350;
	perT.x = 696;
	stage.addChild(perT);
	loader = new createjs.LoadQueue(false);
	loader.installPlugin(createjs.Sound);
	
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
	if (createjs.Touch.isSupported()){
		createjs.Touch.enable(stage);
	}
}
function handleComplete(){
	loader.removeEventListener("progress", handleProgress);
	loader.removeEventListener("complete", handleComplete);
	stage.removeChild(proT);
	stage.removeChild(perT);
	fuelTask = new Array("TURN LH FRONT FUEL PUMP ON","TURN RH FRONT FUEL PUMP ON","TURN LH REAR FUEL PUMP ON","TURN RH REAR FUEL PUMP ON","TURN CROSSFEED VALVE ON");
fuelTaskoff = new Array("TURN LH FRONT FUEL PUMP OFF","TURN RH FRONT FUEL PUMP OFF", 
"TURN LH REAR FUEL PUMP OFF","TURN RH REAR FUEL PUMP OFF","TURN CROSSFEED VALVE OFF");
	elecTask = new Array("OPEN AC TIE BUS","TURN LH GEN ON","TURN RH GEN ON","TURN LH BAT ON","TURN RH BAT ON");
	elecTaskoff = new Array("CLOSE AC TIE BUS","TURN LH GEN OFF","TURN RH GEN OFF","TURN LH BAT OFF","TURN RH BAT OFF");
	
	airTask = new Array("TURN LH HIGH BLEED AIR ON","TURN RH HIGH BLEED AIR ON","TURN LH LOW BLEED AIR ON","TURN RH LOW BLEED AIR ON","OPEN ISOLATION VALVE");
	airTaskoff = new Array("TURN LH HIGH BLEED AIR OFF","TURN RH HIGH BLEED AIR OFF","TURN LH LOW BLEED AIR OFF","TURN RH LOWBLEED AIR OFF","CLOSE ISOLATION VALVE");
	hydTask = new Array("TURN LH ELEC PUMP ON","TURN RH ELEC PUMP ON","TURN AUX PUMP ON","TURN LH ENG PUMP ON","TURN RH ENG PUMP ON");
hydTaskoff = new Array("TURN LH ELEC PUMP OFF","TURN RH ELEC PUMP OFF","TURN AUX PUMP OFF","TURN LH ENG PUMP OFF","TURN RH ENG PUMP OFF");

	
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
	//document.getElementById('tmid').innerHTML =  String("PAT");
	document.getElementById('tside').innerHTML =  String("Adjust");
	document.getElementById('tsider').innerHTML =  String("Welcome");
	
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

	
	
	stage.addChild(startCont);
	
	
}
function showSecondScreen(e){
	//alert("cc");
	e.target.removeEventListener('click',showSecondScreen);
	startCont.removeAllChildren();
	stage.removeChild(startCont);
	stage.update();
	createInterface();
	
	stage.update();
	
}

function createInterface(){
	
	//e.target.removeEventListener('click',createInterface);
	//secondCont.removeAllChildren();
	//stage.removeChild(secondCont);
	gameCont = new createjs.Container();
	bmp = addBmp("Fmask",0,0,false);

	var maskFillter= new createjs.AlphaMaskFilter(bmp.image);
	 gameCont.filters = [maskFillter];
	 gameCont.x = 0;
     gameCont.cache(0,0,1400,790);
	
	
	stage.addChild(gameCont);

	
	fieldSky = addBmp("Bterrain",0,0,true);
	fieldSky.x =stage.canvas.width/2;
	fieldSky.y =270;
	gameCont.addChild(fieldSky);
	planeBox = addBmp("Bdisplay",0,0,true);
	planeBox.x =stage.canvas.width/2;
	planeBox.y =320;
	gameCont.addChild(planeBox);
	stage.update();
	
	spIn = new createjs.Container();
	var bmp = addBmp("Barrow",0,0,false);
	spIn.addChild(bmp);
	bmp.scaleX = .7;
	bmp.scaleY = .6;
	gameCont.addChild(spIn);
	spT = new createjs.Text("250","16px Open Sans","#fff");
	spT.x = 14;
	spT.y = 0;
	spIn.addChild(spT);
	spIn.x = 540;
	spIn.y = 150;
	
	headingIn = new createjs.Container();
	bmp = addBmp("Bharrow",0,0,false);
	bmp.scaleX = .7;
	bmp.scaleY = .6;
	headingIn.addChild(bmp);
	gameCont.addChild(headingIn);
	headT = new createjs.Text("180","16px Open Sans","#fff");
	headT.x = 19;
	headT.y = 0;
	headingIn.addChild(headT);
	headingIn.x = 662;
	headingIn.y = 220;
	
	
	altIn = new createjs.Container();
	bmp = addBmp("Barrow",0,0,false);
	
	bmp.scaleX = -.7;
	bmp.scaleY = .6;
	altIn.addChild(bmp);
	gameCont.addChild(altIn);
	altT = new createjs.Text("5800","16px Open Sans","#fff");
	altT.x = -45;
	altT.y = 0;
	altIn.addChild(altT);
	altIn.x = 855;
	altIn.y = 154;
	speed = 310;
	tspeed = 310;
	alt = 5800;
	talt = 5800;
	heading = 180;
	theading = 180;
	
	theadT = new createjs.Text("180","16px Open Sans","#72b62b");
	theadT.x = 370;
	theadT.y = 385;
	theadT.textAlign = "center";
	gameCont.addChild(theadT);
	
	taltT = new createjs.Text("5800","16px Open Sans","#72b62b");
	taltT.x = 493;
	taltT.y = 385;
	taltT.textAlign = "center";
	gameCont.addChild(taltT);
	
	tspT = new createjs.Text("250","16px Open Sans","#72b62b");
	tspT.x = 613;
	tspT.y = 385;
	tspT.textAlign = "center";
	gameCont.addChild(tspT);
	
	quesT = new createjs.Text("","14px Open Sans","#fff");
	quesT.x = 770;
	quesT.y = 370;
	//quesT.textAlign = "center";
	gameCont.addChild(quesT);
	
	ansT = new createjs.Text("","14px Open Sans","#fff");
	ansT.x = 955;
	ansT.y = 370;
	//quesT.textAlign = "center";
	gameCont.addChild(ansT);
	
	fuelOn = addBmp("Fuelon",0,0,false);
	fuelOn.scaleX = .7;
	fuelOn.scaleY = .7;
	fuelOn.x = 229;
	fuelOn.y = 340;
	fuelOn.name = "fuel";
	fuelOn.cursor = "pointer";
	fuelOn.visible = false;
	gameCont.addChild(fuelOn);
	
	airOn = addBmp("Airon",0,0,false);
	airOn.scaleX = .7;
	airOn.scaleY = .7;
	airOn.x = 229;
	airOn.y = 380;
	airOn.name = "air";
	airOn.cursor = "pointer";
	airOn.visible = false;
	gameCont.addChild(airOn);
	
	elecOn = addBmp("Elecon",0,0,false);
	elecOn.scaleX = .7;
	elecOn.scaleY = .7;
	elecOn.x = 1099;
	elecOn.y = 340;
	elecOn.name = "elec";
	elecOn.cursor = "pointer";
	elecOn.visible = false;
	gameCont.addChild(elecOn);
	
	hydOn = addBmp("Hydon",0,0,false);
	hydOn.scaleX = .7;
	hydOn.scaleY = .7;
	hydOn.x = 1099;
	hydOn.y = 380;
	hydOn.name = "hyd";
	hydOn.cursor = "pointer";
	hydOn.visible = false;
	gameCont.addChild(hydOn);
	
	
	pickATask();
	//pickFuelTask();
	headingAltSpeed();
	arithMatic();
	errors =0;
	currentS =0;
	cm=0;
	cc=0;
	msec=0;
	sec=0;
	score =0;
	isDone = false;
	readCont = new createjs.Container();
	var maskv = addBmp("Vmask",0,0,false);
	//readCont.mask = maskv;
	var maskFillter2= new createjs.AlphaMaskFilter(maskv.image);
	 readCont.filters = [maskFillter2];
	 readCont.x=460;
	  readCont.y=32;
    readCont.cache(0,0,1400,790);
	stage.addChild(readCont);
	
	speedR = addBmp("ISpeed",0,0,false);
	readCont.addChild(speedR);
	
	//alt
	readCont2 = new createjs.Container();
	var maskc = addBmp("Vmask",0,0,false);
	//readCont.mask = maskv;
	var maskFillter3= new createjs.AlphaMaskFilter(maskc.image);
	 readCont2.filters = [maskFillter3];
	 readCont2.x=850;
	  readCont2.y=32;
    readCont2.cache(0,0,1400,790);
	stage.addChild(readCont2);
	
	altR = addBmp("IAltitu",0,0,false);
	readCont2.addChild(altR);
	
	//head
	readCont3 = new createjs.Container();
	var maskd = addBmp("Hmask",0,0,false);
	//readCont.mask = maskv;
	var maskFillter4= new createjs.AlphaMaskFilter(maskd.image);
	 readCont3.filters = [maskFillter4];
	 readCont3.x=560;
	  readCont3.y=250;
   readCont3.cache(0,0,1400,790);
	stage.addChild(readCont3);
	
	headR = addBmp("IHead",0,0,false);
	readCont3.addChild(headR);
	headR.x = -374;
	
	
	
	isGame = true;
	trackTime = setInterval(keepTime,1000);
	document.body.style.backgroundColor = "#3a3a3a";
	window.addEventListener("keydown",getKeyDown);
	window.addEventListener("keyup",getKeyUp);
	
	
	
}
function keepTime(){
	sec++;
	var rsec = totalSec-sec;
	var tStr = String(Math.floor(rsec/60)+ " Minutes " +(rsec%60)+" Seconds left");
	document.getElementById('tsider').innerHTML =  String(tStr);
	manageTest();
	if(sec > totalSec){
		clearInterval(trackTime);
		isGame = false;
		sec =0;
		
		
		gameOver();
	}
	
}
function manageTest(){
		cm++;
		cc++;
		currentS++;
		if(currentS > targetS){
			currentS=0;
		
			calculatePrevious();
			headingAltSpeed();
			
		
			
		}
		if(cm > targetM){
			cm =0;
			var ans = String(ansT.text);
			
			if(!spacek){
				if(ans == arithAns){
					errors++;
		
				}
			}
			spacek = false;
			isDone = false;
				arithMatic();
			
		}
		if(cc > targetC){
			cc =0;
			if(totalQ <= 0){
				pickATask();
				
			}else{
				errors++;
			}
			
		}
		document.getElementById('tside').innerHTML =  String("Errors:"+errors);	
	
}
function startMain(){

	createjs.Ticker.setFPS(60);
	createjs.Ticker.addEventListener("tick",updateGame);
	
}
function updateGame(e){
	if(isGame){
		if(gameCont != null){
			gameCont.updateCache();
		}
		if(readCont != null){
			readCont.updateCache();
		}
		if(readCont2 != null){
			readCont2.updateCache();
		}
		if(readCont3 != null){
			readCont3.updateCache();
		}
		changeSpeed();
		changeAltitude();
		changeHeading();
	//	moveSky();
	
	}
	stage.update();
}
function calculatePrevious(){
	if(jType == "speed"){
		if(proximityCheck(speed,tspeed,11)){
			score++;
			
		}
	}
	if(jType == "head"){
		if(proximityCheck(heading,theading,6)){
			score++;
		}
	}
	if(jType == "alt"){
		if(proximityCheck(alt,talt,11)){
			score++;
		}
	}
	
}
function changeSpeed(){
	if(wkey){
		if(speedR.y < 0){
			speed += .5;	
			//spIn.y -= 1;
			speedR.y += 2.85;
		}
		
		
	}
	if(skey){
		if(speedR.y > -570){
			speedR.y -= 2.85;
		
		
			speed -= .5;	
			//spIn.y += 1;
		}
		
		
	}
	spT.text = String(Math.floor(speed));
}
function changeAltitude(){
	if(upk){
		if(altR.y <0){
			altR.y += 4;
			
		
		
			alt += 7;
			fieldSky.y += .5;
			if(fieldSky.scaleY < 1.2){
				fieldSky.scaleY += .05;
			}
			//altIn.y -= 1;
			
		}
	}
	if(downk){
		if(altR.y > -914){
			altR.y -= 4;
			fieldSky.y -= .5;
			alt -= 7;
			if(fieldSky.scaleY > 1){
				fieldSky.scaleY -= .05;
			}
		}
		
	}
	altT.text = String(Math.floor(alt));
}

function playAgain(e){
	e.target.removeEventListener('click',playAgain);
	
	
}


function changeHeading(){
	if(leftk){
		rotD = "left";
		if(headR.x < 0){
			//headR2.x += 2;
			headR.x += 2;
			heading -= .8;
			if(heading < 300){
			
		//	headingIn.x += 1;
				if(fieldSky.rotation < 10){
					fieldSky.rotation += .095;
				}
			
			}
		}
		
		
		
	}
	if(rightk){
		rotD = "right";
	
		if(headR.x > -660){
			
			headR.x -= 2;
			heading += .8;
			if(heading > 60){
			
			
			//headingIn.x -= 1;
				if(fieldSky.rotation > -10){
					fieldSky.rotation -= .095;
				}
			
			}
		}
		
		
		
	}
	headT.text = String(Math.floor(heading));
}
function headingBack(items){
	
createjs.Tween.get(items).to({rotation:0},2000,createjs.Ease.QuadOut);
		
	
	
}
function altBack(items){
	
createjs.Tween.get(items).to({y:270,scaleY:1},2000,createjs.Ease.QuadOut);
		
	
	
}
function gameOver(){
	createjs.Tween.removeAllTweens();
	sec=0;
	totalQ =0;
	createjs.Sound.stop();
	stage.removeChild(readCont);
	stage.removeChild(readCont2);
	stage.removeChild(readCont3);
	gameCont.removeAllChildren();
	stage.removeChild(gameCont);
	document.body.style.backgroundColor = "#fff";
	window.removeEventListener("keydown",getKeyDown);
	window.removeEventListener("keyup",getKeyUp);
	showEndScreen();
}
function showEndScreen(){
	
	document.getElementById('tside').innerHTML =  String("Adjust");
	document.getElementById('tsider').innerHTML =  String("Welcome");
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
	mT.text = String("You have completed the Adjust test.");
	mT.y = 100;
	mT.x = 525;
	startCont.addChild(mT);
	

	var eT = new createjs.Text("","22px Open Sans","#000000");
	eT.text = String("Errors: "+errors);
	eT.y = 200;
	eT.x = 660;
	startCont.addChild(eT);
	
	var accu = Math.round((score/40)*100);
	
	var aT = new createjs.Text("","22px Open Sans","#000000");
	aT.text = String("Accuracy: "+accu+"%");
	aT.y = 300;
	aT.x = 645;
	startCont.addChild(aT);
	
	stage.addChild(startCont);
	//var accuracy = giveAresult();
	//var accuracy2 = giveAresultd();
	saveLoaded();
	errors =0;
	score =0;
	upk = false;
	downk = false;
	leftk = false;
	rightk = false;
	skey = false;
	wkey = false;
	spacek = false;
	stage.update();
}
function startAgain(e){
	e.target.removeEventListener('click',startAgain);
	startCont.removeAllChildren();
	stage.removeChild(startCont);
	showStartScreen();
	stage.update();
	
}

//save the score
function saveLoaded(){
	// Create our XMLHttpRequest object
    var hr = new XMLHttpRequest();
  	
	var datastring ="";
	var accu = Math.round((score/40)*100);
	datastring += "adjust_errors"+"=" +errors+ "&";
	datastring += "accuracy" + "=" + accu +"&";
	datastring += "duration" + "=" + totalSec;
	hr.open('POST','saveADScore.php');
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
	//gameCont.removeAllChildren();
	
}

function getKeyUp(e){
	switch(e.keyCode){
		case 37:
		leftk = false;
		headingBack(fieldSky);
		//fieldSky.rotation =0;
		break;
		case 38:
		upk = false;
		altBack(fieldSky);
		break;
		case 39:
		rightk = false;
		headingBack(fieldSky);
		//fieldSky.rotation =0;
		break;
		case 40:
		downk = false;
		altBack(fieldSky);
		//fieldSky.y = 270;
	//	fieldSky.scaleY =1;
		break;
		case 83:
		skey = false;
		
		break;
		case 87:
		wkey = false;
		break;
		case 32:
		spacek = false;
		break;
	}
	
}
function getKeyDown(e){
	e.preventDefault();
	switch(e.keyCode){
		case 32:
		spacek = true;
		var ans = String(ansT.text);
		if(!isDone){
			isDone = true;
			if(ans != arithAns){
				errors++;
		
			}
		}
		
		break;
		case 37:
		leftk = true;
		//createjs.Tween.removeAllTweens();
		break;
		case 38:
		upk = true;
	//	
		break;
		case 39:
		rightk = true;
		//createjs.Tween.removeAllTweens();
		break;
		case 40:
		downk = true;
	//	createjs.Tween.removeAllTweens();
		break;
		
		case 83:
		skey = true;
		
		break;
		case 87:
		wkey = true;
		
		
		break;
		
	}
	
}
function pickATask(){
	var ri = Math.floor(Math.random()*4);
	findex = -1;
	//ri = 3;
	hydOn.visible = false;
	airOn.visible = false;
	fuelOn.visible = false;
	elecOn.visible = false;
	if(hydCont != null){
			gameCont.removeChild(hydCont);
			hydOn.removeEventListener('click',pickTheTask);
		}
		if(airCont != null){
			gameCont.removeChild(airCont);
			airOn.removeEventListener('click',pickTheTask);
		}
		if(elecCont != null){
			gameCont.removeChild(elecCont);
			elecOn.removeEventListener('click',pickTheTask);
		}
		if(fuelCont != null){
			gameCont.removeChild(fuelCont);
			fuelOn.removeEventListener('click',pickTheTask);
		}
	//ri = 2;
	switch(ri){
		case 0:
			fuelOn.visible = true;
			fuelOn.addEventListener('click',pickTheTask);
			//
		break;
		case 1:
			//
			airOn.visible = true;
			airOn.addEventListener('click',pickTheTask);
		break;
		case 2:
			//
		
			elecOn.visible = true;
			elecOn.addEventListener('click',pickTheTask);
		break;
		case 3:
			//
			hydOn.visible = true;
			hydOn.addEventListener('click',pickTheTask);
		break;
		
		
		
	}
	
}
function pickTheTask(e){
	e.target.removeEventListener('click',pickTheTask);
	var cname = String(e.target.name);
	switch(cname){
		case "fuel":
		pickFuelTask();
		
		break;
		case "air":
		pickAirTask();
		
		break;
		case "elec":
		pickElecTask();
		
		break;
		case "hyd":
		pickHydTask();
		
		break;
		
		
		
	}
	
	
}
function pickFuelTask(){
	var pM = Math.floor(Math.random()*4)+1;
	var gg = Math.floor(Math.random()*2);
	totalQ = pM;
	var i =0;
	tempArray = new Array();
	var sArray = new Array();
	while(i<pM){
		var qObj = new Object();
		if(gg == 1){
			var gI = Math.floor(Math.random()*fuelTask.length);
			var tStr = String(fuelTask[gI]);
			qObj.state = "on";
		}else{
			gI = Math.floor(Math.random()*fuelTaskoff.length);
			tStr = String(fuelTaskoff[gI]);
			qObj.state = "off";
		}
		
		
		
		qObj.str =tStr;
		qObj.index = i;
		
		if(sArray.indexOf(tStr) == -1){
			
			sArray.push(tStr);
			tStr = (tStr.replace(/\s/g, ""));
			tStr = tStr.toLowerCase();
			qObj.name = tStr;
			tempArray.push(qObj);
			i++;
		}
		
	}
	fuelCont = new createjs.Container();
	manageScr = addBmp("Fscreen",0,0,false);
	manageScr.scaleX = .75;
	manageScr.scaleY = .75;
	fuelCont.x = 730;
	fuelCont.y = 470;
	//manageScr.alpha = 0.2;
	fuelCont.addChild(manageScr);
	for(i =0;i<tempArray.length;i++){
		var cont = makeYellowBox(tempArray[i].str,300,30,"#f2ea1d",false);
		cont.index = i;
		cont.name = tempArray[i].name;
		
		gameCont.addChild(cont);
		setupFuel(tempArray[i].name,i);
		cont.x = 280;
		cont.y = 510+i*32;
		
	}
	
	gameCont.addChild(fuelCont);
}
function pickElecTask(){
	var pM = Math.floor(Math.random()*4)+1;
	totalQ = pM;
	var gg = Math.floor(Math.random()*2);
	var i =0;
	tempArray = new Array();
	var sArray = new Array();
	while(i<pM){
		var qObj = new Object();
		if(gg == 1){
			var gI = Math.floor(Math.random()*elecTask.length);
			var tStr = String(elecTask[gI]);
			qObj.state = "on";
		}else{
			gI = Math.floor(Math.random()*elecTaskoff.length);
			tStr = String(elecTaskoff[gI]);
			qObj.state = "off";
		}
		
		qObj.str = tStr;
		qObj.index = i;
	
		if(sArray.indexOf(tStr) == -1){
			sArray.push(tStr);
			tStr = (tStr.replace(/\s/g, ""));
			tStr = tStr.toLowerCase();
			qObj.name = tStr;
			tempArray.push(qObj);
			
			i++;
		}
		
	}
	elecCont = new createjs.Container();
	manageScr = addBmp("Escreen",0,0,false);
	manageScr.scaleX = .75;
	manageScr.scaleY = .75;
	elecCont.x = 730;
	elecCont.y = 470;
	//manageScr.alpha = 0.2;
	elecCont.addChild(manageScr);
	
	for(i =0;i<tempArray.length;i++){
		var cont = makeYellowBox(tempArray[i].str,300,30,"#f2ea1d",false);
		cont.index = i;
		cont.name = tempArray[i].name;
		gameCont.addChild(cont);
		
		setupElec(tempArray[i].name,i);
		cont.x = 280;
		cont.y = 510+i*32;
		
	}
	gameCont.addChild(elecCont);
}
function pickAirTask(){
	var pM = Math.floor(Math.random()*4)+1;
	totalQ = pM;
	var i =0;
	var gg = Math.floor(Math.random()*2);
	tempArray = new Array();
	var sArray = new Array();
	while(i<pM){
		var qObj = new Object();
		if(gg == 1){
			var gI = Math.floor(Math.random()*airTask.length);
			var tStr = String(airTask[gI]);
			qObj.state = "on";
		}else{
			gI = Math.floor(Math.random()*airTaskoff.length);
			tStr = String(airTaskoff[gI]);
			qObj.state = "off";
		}
		
		qObj.str = tStr;
		qObj.index = i;
		
		if(sArray.indexOf(tStr) == -1){
			sArray.push(tStr);
			tStr = (tStr.replace(/\s/g, ""));
			tStr = tStr.toLowerCase();
			qObj.name = tStr;
			tempArray.push(qObj);
			i++;
		}
		
	}
	airCont = new createjs.Container();
	manageScr = addBmp("Ascreen",0,0,false);
	manageScr.scaleX = .75;
	manageScr.scaleY = .75;
	airCont.x = 730;
	airCont.y = 470;
	//manageScr.alpha = 0.2;
	airCont.addChild(manageScr);
	
	for(i =0;i<tempArray.length;i++){
		var cont = makeYellowBox(tempArray[i].str,300,30,"#f2ea1d",false);
		cont.index =  i;
		cont.name = tempArray[i].name;
		gameCont.addChild(cont);
		setupAir(tempArray[i].name,i);
		cont.x = 280;
		cont.y = 510+i*32;
		
	}
	gameCont.addChild(airCont);
}
function pickHydTask(){
	var pM = Math.floor(Math.random()*4)+1;
	totalQ = pM;
	var gg = Math.floor(Math.random()*2);
	var i =0;
	tempArray = new Array();
	var sArray = new Array();
	while(i<pM){
		var qObj = new Object();
		if(gg == 1){
			var gI = Math.floor(Math.random()*hydTask.length);
			var tStr = String(hydTask[gI]);
			qObj.state = "on";
		}else{
			gI = Math.floor(Math.random()*hydTaskoff.length);
			tStr = String(hydTaskoff[gI]);
			qObj.state = "off";
		}
		
		qObj.str = tStr;
		qObj.index = i;
		
		if(sArray.indexOf(tStr) == -1){
			sArray.push(tStr);
			tStr = (tStr.replace(/\s/g, ""));
			tStr = tStr.toLowerCase();
			qObj.name = tStr;
			tempArray.push(qObj);
			i++;
		}
		
	}
	hydCont = new createjs.Container();
	manageScr = addBmp("Hscreen",0,0,false);
	manageScr.scaleX = .75;
	manageScr.scaleY = .75;
	hydCont.x = 730;
	hydCont.y = 470;
	//manageScr.alpha = 0.2;
	hydCont.addChild(manageScr);
	gameCont.addChild(hydCont);
	
	for(i =0;i<tempArray.length;i++){
		var cont = makeYellowBox(tempArray[i].str,300,30,"#f2ea1d",false);
		cont.index = i;
		cont.name = tempArray[i].name;
		gameCont.addChild(cont);
		setupHyd(tempArray[i].name,i);
		cont.x = 280;
		cont.y = 510+i*32;
		
	}
	
}
function completeTask(e){
	e.target.removeEventListener("click",completeTask);
	var tname = String(e.target.name);
	
	var type = String(e.target.type);
	var ind = parseInt(e.target.index);
	
	var tx = e.target.x;
	var ty = e.target.y;
	gameCont.removeChild(gameCont.getChildByName(tname));
	if(findex == -1){
		
		
		if(ind != 0){
			errors ++;
			
		}
		findex =0;
	}else if(findex == 0){
		
		if(ind != 1){
			
			errors ++;
			
		}
		findex =1;
		
	}else if(findex == 1){
	
		if(ind != 2){
			errors ++;
			
		}
		findex =2;
		
	}else if(findex == 2){
		
		if(ind != 3){
			errors ++;
			
		}
		findex =3;
		
	}
	document.getElementById('tside').innerHTML =  String("Errors: "+errors);
	totalQ--;
	
	switch(type){
		case "fuel":
		fuelCont.removeChild(fuelCont.getChildByName(tname));
		var sname = String(tname+"0");
		fuelCont.removeChild(fuelCont.getChildByName(sname));	
		
		break;
		
		case "air":
		airCont.removeChild(airCont.getChildByName(tname));
		sname = String(tname+"0");
		airCont.removeChild(airCont.getChildByName(sname));	
		
		break;
		case "elec":
		elecCont.removeChild(elecCont.getChildByName(tname));	
		sname = String(tname+"0");
		elecCont.removeChild(elecCont.getChildByName(sname));
		
		break;
		case "hyd":
		hydCont.removeChild(hydCont.getChildByName(tname));	
		sname = String(tname+"0");
		hydCont.removeChild(hydCont.getChildByName(sname));
				
		break;
		
	}
	
	if(totalQ <=0){
		hydOn.visible = false;
		airOn.visible = false;
		fuelOn.visible = false;
		elecOn.visible = false;
		if(hydCont != null){
			gameCont.removeChild(hydCont);
			
		}
		if(airCont != null){
			gameCont.removeChild(airCont);
		}
		if(elecCont != null){
			gameCont.removeChild(elecCont);
		}
		if(fuelCont != null){
			gameCont.removeChild(fuelCont);
		}
	}
	
	
}
function setupFuel(tname,i){
	
	//tname = "turnrhrearfuelpumpon";
	switch(tname){
		case "turnlhfrontfuelpumpon":
			var f1 = makeBlackBox("",90,30,"#000",true);
			var s1 = makeYellowRect("",94,33,"#f2ea1d",true);
			f1.name = tname;
			s1.name = String(tname+"0");
			f1.mouseChildren = false;
			fuelCont.addChild(f1);
			fuelCont.addChild(s1);
			f1.x = 98;
			f1.y = 86;
			s1.x = 98;
			s1.y = 86;
			f1.addEventListener("click",completeTask);
			
		break;
		case "turnlhfrontfuelpumpoff":
			f1 = makeBlackBox("",90,30,"#000",true);
			s1 = makeYellowRect("",94,33,"#f2ea1d",true);
			f1.name = tname;
			s1.name = String(tname+"0");
			f1.mouseChildren = false;
			fuelCont.addChild(f1);
			fuelCont.addChild(s1);
			f1.x = 98;
			f1.y = 86;
			s1.x = 98;
			s1.y = 86;
			f1.addEventListener("click",completeTask);
			
		break;
		case "turnrhfrontfuelpumpon":
			f1 = makeBlackBox("",90,30,"#000",true);
			s1 = makeYellowRect("",94,33,"#f2ea1d",true);
			f1.name = tname;
			s1.name = String(tname+"0");
			f1.mouseChildren = false;
			fuelCont.addChild(f1);
			fuelCont.addChild(s1);
			f1.x = 212;
			f1.y = 86;
			s1.x = 212;
			s1.y = 86;
			f1.addEventListener("click",completeTask);
			
		break;
		case "turnrhfrontfuelpumpoff":
			f1 = makeBlackBox("",90,30,"#000",true);
			s1 = makeYellowRect("",94,33,"#f2ea1d",true);
			f1.name = tname;
			s1.name = String(tname+"0");
			f1.mouseChildren = false;
			fuelCont.addChild(f1);
			fuelCont.addChild(s1);
			f1.x = 212;
			f1.y = 86;
			s1.x = 212;
			s1.y = 86;
			f1.addEventListener("click",completeTask);
			
		break;
		case "turnlhrearfuelpumpon":
			f1 = makeBlackBox("",90,30,"#000",true);
			s1 = makeYellowRect("",94,33,"#f2ea1d",true);
			f1.name = tname;
			s1.name = String(tname+"0");
			f1.mouseChildren = false;
			fuelCont.addChild(f1);
			fuelCont.addChild(s1);
			f1.x = 29;
			f1.y = 144;
			s1.x = 29;
			s1.y = 144;
			f1.addEventListener("click",completeTask);
			
		break;
		case "turnlhrearfuelpumpoff":
			f1 = makeBlackBox("",90,30,"#000",true);
			s1 = makeYellowRect("",94,33,"#f2ea1d",true);
			f1.name = tname;
			s1.name = String(tname+"0");
			f1.mouseChildren = false;
			fuelCont.addChild(f1);
			fuelCont.addChild(s1);
			f1.x = 29;
			f1.y = 144;
			s1.x = 29;
			s1.y = 144;
			f1.addEventListener("click",completeTask);
			
		break;
		case "turncrossfeedvalveon":
			f1 = makeBlackBox("",90,30,"#000",true);
			s1 = makeYellowRect("",94,33,"#f2ea1d",true);
			f1.name = tname;
			s1.name = String(tname+"0");
			f1.mouseChildren = false;
			fuelCont.addChild(f1);
			fuelCont.addChild(s1);
			f1.x = 154;
			f1.y = 143;
			s1.x = 154;
			s1.y = 143;
			f1.addEventListener("click",completeTask);
			
		break;
		case "turncrossfeedvalveoff":
			f1 = makeBlackBox("",93,30,"#000",true);
			s1 = makeYellowRect("",94,33,"#f2ea1d",true);
			f1.name = tname;
			s1.name = String(tname+"0");
			f1.mouseChildren = false;
			fuelCont.addChild(f1);
			fuelCont.addChild(s1);
			f1.x = 154;
			f1.y = 143;
			s1.x = 154;
			s1.y = 143;
			f1.addEventListener("click",completeTask);
			
		break;
		case "turnrhrearfuelpumpon":
			f1 = makeBlackBox("",90,30,"#000",true);
			s1 = makeYellowRect("",94,33,"#f2ea1d",true);
			f1.name = tname;
			s1.name = String(tname+"0");
			f1.mouseChildren = false;
			fuelCont.addChild(f1);
			fuelCont.addChild(s1);
			f1.x = 279;
			f1.y = 143;
			s1.x = 279;
			s1.y = 143;
			f1.addEventListener("click",completeTask);
			
		break;
		case "turnrhrearfuelpumpoff":
			f1 = makeBlackBox("",90,30,"#000",true);
			s1 = makeYellowRect("",94,33,"#f2ea1d",true);
			f1.name = tname;
			s1.name = String(tname+"0");
			f1.mouseChildren = false;
			fuelCont.addChild(f1);
			fuelCont.addChild(s1);
			f1.x = 279;
			f1.y = 143;
			s1.x = 279;
			s1.y = 143;
			f1.addEventListener("click",completeTask);
			
		break;
		
	}
	f1.alpha =.1;
	f1.type = "fuel";
	f1.index =i; 
	f1.cursor = "pointer";
		
	
}

function setupElec(tname,i){
	
	//tname = "openactiebus";
	switch(tname){
		case "openactiebus":
			var f1 = makeBlackCircle("#000");
			var s1 = makeYellowCircle("#f2ea1d");
			s1.name = String(tname+"0");
			f1.name = tname;
			f1.mouseChildren = false;
			elecCont.addChild(f1);
			elecCont.addChild(s1);
			f1.x = 195;
			f1.y = 86;
			s1.x = 195;
			s1.y = 86;
			f1.addEventListener("click",completeTask);
			
		break;
		case "closeactiebus":
			f1 = makeBlackCircle("#000");
			s1 = makeYellowCircle("#f2ea1d");
			s1.name = String(tname+"0");
			f1.name = tname;
			f1.mouseChildren = false;
			elecCont.addChild(f1);
			elecCont.addChild(s1);
			f1.x = 195;
			f1.y = 86;
		s1.x = 195;
			s1.y = 86;
			f1.addEventListener("click",completeTask);
			
		break;
		case "turnlhgenon":
			f1 = makeBlackCircle("#000");
			s1 = makeYellowCircle("#f2ea1d");
			s1.name = String(tname+"0");
			f1.name = tname;
			f1.mouseChildren = false;
			elecCont.addChild(f1);
			elecCont.addChild(s1);
			f1.x = 38;
			f1.y = 164;
			s1.x = 38;
			s1.y = 164;
			f1.addEventListener("click",completeTask);
			
		break;
		case "turnlhgenoff":
			f1 = makeBlackCircle("#000");
			s1 = makeYellowCircle("#f2ea1d");
			s1.name = String(tname+"0");
			f1.name = tname;
			f1.mouseChildren = false;
			elecCont.addChild(f1);
		elecCont.addChild(s1);
			f1.x = 38;
			f1.y = 164;
			s1.x = 38;
			s1.y = 164;
			f1.addEventListener("click",completeTask);
			
		break;
		case "turnrhgenon":
			f1 = makeBlackCircle("#000");
			s1 = makeYellowCircle("#f2ea1d");
			s1.name = String(tname+"0");
			f1.name = tname;
			f1.mouseChildren = false;
			elecCont.addChild(f1);
			elecCont.addChild(s1);
			f1.x = 352;
			f1.y = 164;
			s1.x = 352;
			s1.y = 164;
			f1.addEventListener("click",completeTask);
			
		break;
		case "turnrhgenoff":
			f1 = makeBlackCircle("#000");
			s1 = makeYellowCircle("#f2ea1d");
			s1.name = String(tname+"0");
			f1.name = tname;
			f1.mouseChildren = false;
			elecCont.addChild(f1);
			elecCont.addChild(s1);
			f1.x = 352;
			f1.y = 164;
			s1.x = 352;
			s1.y = 164;
			f1.addEventListener("click",completeTask);
			
		break;
		case "turnlhbaton":
			f1 = makeBlackCircle("#000");
			s1 = makeYellowCircle("#f2ea1d");
			s1.name = String(tname+"0");
			f1.name = tname;
			f1.mouseChildren = false;
			elecCont.addChild(f1);
			elecCont.addChild(s1);
			f1.x = 158;
			f1.y = 156;
			s1.x = 158;
			s1.y = 156;
			f1.addEventListener("click",completeTask);
			
		break;
		case "turnlhbatoff":
			f1 = makeBlackCircle("#000");
			s1 = makeYellowCircle("#f2ea1d");
			s1.name = String(tname+"0");
			f1.name = tname;
			f1.mouseChildren = false;
			elecCont.addChild(f1);
			elecCont.addChild(s1);
				f1.x = 158;
			f1.y = 156;
			s1.x = 158;
			s1.y = 156;
			f1.addEventListener("click",completeTask);
			
		break;
		case "turnrhbaton":
			f1 = makeBlackCircle("#000");
			s1 = makeYellowCircle("#f2ea1d");
			s1.name = String(tname+"0");
			f1.name = tname;
			f1.mouseChildren = false;
			elecCont.addChild(f1);
			elecCont.addChild(s1);
			f1.x = 235;
			f1.y = 156;
			s1.x = 235;
			s1.y = 156;
			f1.addEventListener("click",completeTask);
			
		break;
		case "turnrhbatoff":
			f1 = makeBlackCircle("#000");
			s1 = makeYellowCircle("#f2ea1d");
			s1.name = String(tname+"0");
			f1.name = tname;
			f1.mouseChildren = false;
			elecCont.addChild(f1);
			elecCont.addChild(s1);
			f1.x = 235;
			f1.y = 156;
			s1.x = 235;
			s1.y = 156;
			f1.addEventListener("click",completeTask);
			
		break;
		
	}
	f1.alpha =.1;
	f1.type = "elec";
	f1.index =i; 
	f1.cursor = "pointer";
	
		
	
}

function setupAir(tname,i){
	
	//tname = "openisolationvalve";
	switch(tname){
		case "turnlhhighbleedairon":
			var f1 = makeBlackBox("",70,30,"#000",true);
			var s1 = makeYellowRect("",70,30,"#f2ea1d",true);
			f1.name = tname;
			s1.name = String(tname+"0");
			f1.mouseChildren = false;
			airCont.addChild(f1);
			airCont.addChild(s1);
			f1.x = 97;
			f1.y = 86;
			s1.x = 97;
			s1.y = 86;
			f1.addEventListener("click",completeTask);
			
		break;
		case "turnlhhighbleedairoff":
			f1 = makeBlackBox("",70,30,"#000",true);
			s1 = makeYellowRect("",70,30,"#f2ea1d",true);
			s1.name = String(tname+"0");
			f1.name = tname;
			f1.mouseChildren = false;
			airCont.addChild(f1);
			airCont.addChild(s1);
			f1.x = 97;
			f1.y = 86;
			s1.x = 97;
			s1.y = 86;
			f1.addEventListener("click",completeTask);
			
		break;
		case "turnrhhighbleedairon":
			f1 = makeBlackBox("",69,30,"#000",true);
			s1 = makeYellowRect("",70,30,"#f2ea1d",true);
			s1.name = String(tname+"0");
			f1.name = tname;
			f1.mouseChildren = false;
			airCont.addChild(f1);
			airCont.addChild(s1);
			f1.x = 234;
			f1.y = 86;
			s1.x = 234;
			s1.y = 86;
			f1.addEventListener("click",completeTask);
			
		break;
		case "turnrhhighbleedairoff":
			f1 = makeBlackBox("",70,30,"#000",true);
			s1 = makeYellowRect("",70,30,"#f2ea1d",true);
			f1.name = tname;
			s1.name = String(tname+"0");
			f1.mouseChildren = false;
			airCont.addChild(f1);
			airCont.addChild(s1);
			f1.x = 234;
			f1.y = 86;
			s1.x = 234;
			s1.y = 86;
			f1.addEventListener("click",completeTask);
			
		break;
		case "turnlhlowbleedairon":
			f1 = makeBlackBox("",70,30,"#000",true);
			s1 = makeYellowRect("",70,30,"#f2ea1d",true);
			f1.name = tname;
			s1.name = String(tname+"0");
			f1.mouseChildren = false;
			airCont.addChild(f1);
			airCont.addChild(s1);
			f1.x = 15;
			f1.y = 115;
			s1.x = 15;
			s1.y = 115;
			f1.addEventListener("click",completeTask);
			
		break;
		case "turnlhlowbleedairoff":
			f1 = makeBlackBox("",70,30,"#000",true);
			s1 = makeYellowRect("",70,30,"#f2ea1d",true);
			f1.name = tname;
			s1.name = String(tname+"0");
			f1.mouseChildren = false;
			airCont.addChild(f1);
			airCont.addChild(s1);
			f1.x = 15;
			f1.y = 115;
			s1.x = 15;
			s1.y = 115;
			f1.addEventListener("click",completeTask);
			
		break;
		case "turnrhlowbleedairon":
			f1 = makeBlackBox("",70,30,"#000",true);
			s1 = makeYellowRect("",70,30,"#f2ea1d",true);
			f1.name = tname;
			s1.name = String(tname+"0");
			f1.mouseChildren = false;
			airCont.addChild(f1);
			airCont.addChild(s1);
			f1.x = 316;
			f1.y = 113;
			s1.x = 316;
			s1.y = 113;
			f1.addEventListener("click",completeTask);
			
		break;
		case "turnrhlowbleedairoff":
			f1 = makeBlackBox("",70,30,"#000",true);
			s1 = makeYellowRect("",70,30,"#f2ea1d",true);
			s1.name = String(tname+"0");
			f1.name = tname;
			f1.mouseChildren = false;
			airCont.addChild(f1);
			airCont.addChild(s1);
			f1.x = 316;
			f1.y = 113;
			s1.x = 316;
			s1.y = 113;
			f1.addEventListener("click",completeTask);
			
		break;
		case "openisolationvalve":
			f1 = makeBlackBox("",70,30,"#000",true);
			s1 = makeYellowRect("",70,30,"#f2ea1d",true);
			f1.name = tname;
			s1.name = String(tname+"0");
			f1.mouseChildren = false;
			airCont.addChild(f1);
			airCont.addChild(s1);
			f1.x = 166;
			f1.y = 128;
			s1.x = 166;
			s1.y = 128;
			f1.addEventListener("click",completeTask);
			
		break;
		case "closeisolationvalve":
			f1 = makeBlackBox("",70,30,"#000",true);
			s1 = makeYellowRect("",70,30,"#f2ea1d",true);
			s1.name = String(tname+"0");
			f1.name = tname; 
			f1.mouseChildren = false;
			airCont.addChild(f1);
			airCont.addChild(s1);
			f1.x = 166;
			f1.y = 128;
			s1.x = 166;
			s1.y = 128;
			f1.addEventListener("click",completeTask);
			
		break;
		
	}
	f1.alpha =.1;
	f1.type = "air";
	f1.index =i; 
	f1.cursor = "pointer";
		
	
}
function setupHyd(tname,i){
	
	//tname = "turnauxpumpon";
	switch(tname){
		case "turnlhelecpumpon":
		
			var f1 = makeBlackBox("",92,22,"#000",true);
			var s1 = makeYellowRect("",92,22,"#f2ea1d",true);
			f1.name = tname;
			s1.name = String(tname+"0");
			f1.mouseChildren = false;
			hydCont.addChild(f1);
			hydCont.addChild(s1);
			f1.x = 25;
			f1.y = 106;
			s1.x = 25;
			s1.y = 106;
			f1.addEventListener("click",completeTask);
			
		break;
		case "turnlhelecpumpoff":
			f1 = makeBlackBox("",92,22,"#000",true);
			s1 = makeYellowRect("",92,22,"#f2ea1d",true);
			s1.name = String(tname+"0");
			f1.name = tname;
			f1.mouseChildren = false;
			hydCont.addChild(f1);
			hydCont.addChild(s1);
			f1.x = 25;
			f1.y = 106;
			s1.x = 25;
			s1.y = 106;
			f1.addEventListener("click",completeTask);
			
		break;
		case "turnrhelecpumpon":
			f1 = makeBlackBox("",92,22,"#000",true);
			s1 = makeYellowRect("",92,22,"#f2ea1d",true);
			s1.name = String(tname+"0");
			f1.name = tname;
			f1.mouseChildren = false;
			hydCont.addChild(f1);
			hydCont.addChild(s1);
			f1.x = 275;
			f1.y = 106;
			s1.x = 275;
			s1.y = 106;
			f1.addEventListener("click",completeTask);
			
		break;
		case "turnrhelecpumpoff":
			f1 = makeBlackBox("",92,22,"#000",true);
			s1 = makeYellowRect("",92,22,"#f2ea1d",true);
			s1.name = String(tname+"0");
			f1.name = tname;
			f1.mouseChildren = false;
			hydCont.addChild(f1);
			hydCont.addChild(s1);
			f1.x = 275;
			f1.y = 106;
			s1.x = 275;
			s1.y = 106;
			f1.addEventListener("click",completeTask);
			
		break;
		case "turnlhengpumpon":
			f1 = makeBlackBox("",92,22,"#000",true);
			s1 = makeYellowRect("",92,22,"#f2ea1d",true);
			s1.name = String(tname+"0");
			f1.name = tname;
			f1.mouseChildren = false;
			hydCont.addChild(f1);
			hydCont.addChild(s1);
			f1.x = 26;
			f1.y = 155;
			s1.x = 26;
			s1.y = 155;
			f1.addEventListener("click",completeTask);
			
		break;
		case "turnlhengpumpoff":
			f1 = makeBlackBox("",92,22,"#000",true);
			s1 = makeYellowRect("",92,22,"#f2ea1d",true);
			s1.name = String(tname+"0");
			f1.name = tname;
			f1.mouseChildren = false;
			hydCont.addChild(f1);
			hydCont.addChild(s1);
			f1.x = 26;
			f1.y = 155;
			s1.x = 26;
			s1.y = 155;
			f1.addEventListener("click",completeTask);
			
		break;
		case "turnrhengpumpon":
			f1 = makeBlackBox("",92,22,"#000",true);
			s1 = makeYellowRect("",92,22,"#f2ea1d",true);
			s1.name = String(tname+"0");
			f1.name = tname;
			f1.mouseChildren = false;
			hydCont.addChild(f1);
			hydCont.addChild(s1);
			f1.x = 272;
			f1.y = 154;
			s1.x = 272;
			s1.y = 154;
			f1.addEventListener("click",completeTask);
			
		break;
		case "turnrhengpumpoff":
			f1 = makeBlackBox("",92,22,"#000",true);
			s1 = makeYellowRect("",92,22,"#f2ea1d",true);
			s1.name = String(tname+"0");
			f1.name = tname;
			f1.mouseChildren = false;
			hydCont.addChild(f1);
			hydCont.addChild(s1);
			f1.x = 272;
			f1.y = 154;
			s1.x = 272;
			s1.y = 154;
			f1.addEventListener("click",completeTask);
			
		break;
		case "turnauxpumpon":
			f1 = makeBlackBox("",92,22,"#000",true);
			s1 = makeYellowRect("",92,22,"#f2ea1d",true);
			s1.name = String(tname+"0");
			f1.name = tname;
			f1.mouseChildren = false;
			hydCont.addChild(f1);
			hydCont.addChild(s1);
			f1.x = 150;
			f1.y = 120;
			s1.x = 150;
			s1.y = 120;
			f1.addEventListener("click",completeTask);
			
		break;
		case "turnauxpumpoff":
			f1 = makeBlackBox("",92,22,"#000",true);
			s1 = makeYellowRect("",92,22,"#f2ea1d",true);
			s1.name = String(tname+"0");
			f1.name = tname;
			f1.mouseChildren = false;
			hydCont.addChild(f1);
			hydCont.addChild(s1);
			f1.x = 150;
			f1.y = 120;
			s1.x = 150;
			s1.y = 120;
			f1.addEventListener("click",completeTask);
			
		break;
		
	}
	f1.alpha =.1;
	f1.type = "hyd";
	f1.index =i; 
	f1.cursor = "pointer";
		
	
}
function makeYellowBox(yt,wd,h,color,isC){
	var tCont = new createjs.Container();
	
	var ctd = new createjs.Text(yt,"16px Open Sans","#000");
	ctd.x = 10;
	ctd.y = 10;
	if(isC){
		ctd.textAlign = "center";
		ctd.x = 50;
		ctd.y = 5;
		ctd.font = "14px Open Sans";
	}
	var shape = boxMaker(wd,h,color);
	shape.name = "yellow";
 	tCont.addChild(shape);
	tCont.addChild(ctd);
	return tCont;
	
	
}
function makeYellowRect(yt,wd,h,color,isC){
	var tCont = new createjs.Container();
	
	var ctd = new createjs.Text(yt,"16px Open Sans","#000");
	ctd.x = 10;
	ctd.y = 10;
	if(isC){
		ctd.textAlign = "center";
		ctd.x = 50;
		ctd.y = 5;
		ctd.font = "14px Open Sans";
	}
	var shape = rectMaker(wd,h,color);
	shape.name = "yellow";
 	tCont.addChild(shape);
	tCont.addChild(ctd);
	return tCont;
	
	
}
function makeBlackBox(yt,wd,h,color,isC){
	var tCont = new createjs.Container();
	
	var ctd = new createjs.Text(yt,"16px Open Sans","#000");
	ctd.x = 10;
	ctd.y = 10;
	if(isC){
		ctd.textAlign = "center";
		ctd.x = 50;
		ctd.y = 5;
		ctd.font = "14px Open Sans";
	}
	var shape = boxMaker(wd,h,color);
	shape.name = "black";
 	tCont.addChild(shape);
	tCont.addChild(ctd);
	return tCont;
	
	
}
function boxMaker(wdt,h,color){
	var shape = new createjs.Shape();
 	shape.graphics.beginFill(color).drawRect(0,0,wdt,h);
	return shape;
	
}
function rectMaker(wdt,h,color){
	
	
	var border = new createjs.Shape();
	border.graphics.beginStroke(color);
	border.graphics.setStrokeStyle(2);
	//border.snapToPixel = true;
	border.graphics.drawRect(0,0,wdt,h);
	return border;
	
}
function makeYellowCircle(color){
	var tCont = new createjs.Container();
	
	
	var shape = cirCle2(color);
	
 	tCont.addChild(shape);
	
	return tCont;
	
	
}
function makeBlackCircle(color){
	var tCont = new createjs.Container();
	
	
	var shape = circleMaker(color);
	
 	tCont.addChild(shape);
	
	return tCont;
	
	
}
function circleMaker(color){
	var shape = new createjs.Shape();
 	shape.graphics.beginFill(color).drawCircle(0,0,25);
	
	return shape;
	
}
function cirCle2(color){
	var shape = new createjs.Shape();
	
	shape.graphics.setStrokeStyle(2);
	shape.graphics.beginStroke(color);
	shape.graphics.drawCircle(0,0,28);	
	return shape;
}
function arithMatic(){
	arithAns =0;
	var r = Math.floor(Math.random()*5);
	var fdigit = 0;
	var sdigit = 0;
	if(r == 0){
		fdigit = Math.floor(Math.random()*1000)+1;
		sdigit = Math.floor(Math.random()*1000)+1;
		arithAns = fdigit+sdigit;
		quesT.text = String(fdigit+"+"+sdigit+" ?");
		var ran = Math.round(Math.random()*1000)+1;
	}
	if(r == 1){
		fdigit = Math.floor(Math.random()*1000)+1;
		sdigit = Math.floor(Math.random()*1000)+1;
		arithAns = fdigit-sdigit;
		quesT.text = String(fdigit+"-"+sdigit+" ?");
		
		ran = Math.round(Math.random()*500)+1;
	}
	if(r == 2){
		fdigit = Math.floor(Math.random()*900)+100;
		sdigit = Math.floor(Math.random()*10)+1;
		arithAns = Math.round(fdigit*sdigit);
		quesT.text = String(fdigit+"x"+sdigit+" ?");
		ran = Math.round(Math.random()*2000)+100;
	}
	if(r == 3){
		fdigit = Math.floor(Math.random()*500)+100;
		sdigit = Math.floor(Math.random()*100)+1;
		arithAns = Math.round(fdigit/sdigit);
		quesT.text = String(fdigit+"÷"+sdigit+" ?");
		ran = Math.round(Math.random()*200)+10;
	}
	if(r == 4){
		fdigit = Math.floor(Math.random()*90)+9;
		sdigit = Math.floor(Math.random()*900)+102;
		arithAns = Math.round((fdigit/sdigit)*100);
		quesT.text = String(fdigit+"% off "+sdigit+" ?");
		ran = Math.round(Math.random()*500)+10;
	}
	
	var r = Math.floor(Math.random()*2);
	if(r == 1){
		ansT.text = String(arithAns);
		
	}else{
		
		ansT.text = String(ran);
	}
	
	
}
function headingAltSpeed(){
	
	var r = Math.floor(Math.random()*3);
	
	if(r == 0){
		var isD = false;
		while(!isD){
			tspeed = Math.floor(Math.random()*100)+210;
			if(tspeed%5 == 0){
				tspT.text = String(tspeed);
				isD = true;	
			}
			
		}
		jType = "speed";
	}
	if(r == 1){
		talt = Math.floor(Math.random()*16)+1;
		var fstr = String(talt+"00");
		var intr = parseInt(fstr);
		intr += 4200;
		talt = intr;
		taltT.text = String(talt);
		jType = "alt";
	}
	
	if(r == 2){
		isD = false;
		while(!isD){
		
			theading = Math.floor(Math.random()*240)+60;
			
			if(theading%5 == 0){
				theadT.text= String(theading);
				isD = true;	
			}
			
		}
		
		jType = "head";
		
	}
	
	
}
function proximityCheck(at,tar,r){
	for(var i =0; i<r;i++){
		if(parseInt(at+i) == parseInt(tar) || parseInt(at-i) == parseInt(tar)){
			return true;
			
			break;
		}
		
	}
	
	return false;
}

	
