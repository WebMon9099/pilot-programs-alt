// JavaScript Document
var canvas;
var stage;

var sec = 0;
//this is the time when the cross hair changes direction
var cSec = 4;
var pSec = 0,
  hSec = 0;
var loader;
var screen1, screen2, bScr;
var EFcont, Colorcont, Numbercont;
var crossHair;
var TDS = 5;
var CX = 825,
  CY = 195;
var currentS = 0;
var crossSec = 0;
//cross hairs original speed
var cOspeedx = 4,
  cOspeedy = 4;
//when the user press the keyboard speed;
var cKspeedy = 10,
  cKspeedx = 10;
var directionQuestion;
var directionAnswer;
var directionI;
var FCD = 70;
var ECD = 69;
var qState;
var leftk,
  rightk,
  upk,
  downk = false;
var targetSec = 3;
var totalSec = 180;
var gameSec = 0;
var colorArray = new Array('Red', 'Green', 'Blue', 'Yellow');
var pickedColor;
var pickedNumber;
var isA = 'Y';
var tContainer;
var cContainer;
var spacek = false;
var tTime, tError;
var errors = 0,
  score = 0;
var randomQ = 0;
var isResponse = false;
var totalAccuracy;
var isDone = false;
var timeCounter;
var pieTimer;
var playingAudio;

function Main() {
  canvas = document.getElementById('test');
  stage = new createjs.Stage(canvas);
  stage.x = 100;
  optimizeForTouchAndScreens();
  stage.enableMouseOver(10);

  manifest = [
    { src: 'sounds/1.ogg', id: 'S1' },
    { src: 'sounds/2.ogg', id: 'S2' },
    { src: 'sounds/3.ogg', id: 'S3' },
    { src: 'sounds/4.ogg', id: 'S4' },
    { src: 'sounds/5.ogg', id: 'S5' },
    { src: 'sounds/6.ogg', id: 'S6' },
    { src: 'sounds/7.ogg', id: 'S7' },
    { src: 'sounds/8.ogg', id: 'S8' },
    { src: 'sounds/9.ogg', id: 'S9' },
    { src: 'sounds/20.ogg', id: 'S20' },
    { src: 'sounds/30.ogg', id: 'S30' },
    { src: 'sounds/40.ogg', id: 'S40' },
    { src: 'sounds/50.ogg', id: 'S50' },
    { src: 'sounds/60.ogg', id: 'S60' },
    { src: 'sounds/Direction.ogg', id: 'Direction' },
    { src: 'sounds/Miles.ogg', id: 'Miles' },
    { src: 'sounds/Distance.ogg', id: 'Distance' },
    { src: 'sounds/East.ogg', id: 'East' },
    { src: 'sounds/West.ogg', id: 'West' },
    { src: 'sounds/North.ogg', id: 'North' },
    { src: 'sounds/South.ogg', id: 'South' },
    { src: 'sounds/North East.ogg', id: 'North East' },
    { src: 'sounds/North West.ogg', id: 'North West' },
    { src: 'sounds/South West.ogg', id: 'South West' },
    { src: 'sounds/South East.ogg', id: 'South East' },
    { src: 'sounds/red.ogg', id: 'Red' },
    { src: 'sounds/green.ogg', id: 'Green' },
    { src: 'sounds/blue.ogg', id: 'Blue' },
    { src: 'sounds/yellow.ogg', id: 'Yellow' },
    { src: 'images/screen1.png', id: 'Screen1' },
    { src: 'images/screen2.png', id: 'Screen2' },
    { src: 'images/BottomScrM.png', id: 'BScreen' },
    { src: 'images/crosshairs.png', id: 'ICross' },
    { src: 'images/green.png', id: 'IGreen' },
    { src: 'images/yellow.png', id: 'IYellow' },
    { src: 'images/red.png', id: 'IRed' },
    { src: 'images/blue.png', id: 'IBlue' },
    { src: 'images/y_inactive.png', id: 'BIY' },
    { src: 'images/y_active.png', id: 'BAY' },
    { src: 'images/n_inactive.png', id: 'BIN' },
    { src: 'images/n_active.png', id: 'BAN' },
    { src: 'images/e_inactive.png', id: 'BIE' },
    { src: 'images/e_active.png', id: 'BAE' },
    { src: 'images/f_inactive.png', id: 'BIF' },
    { src: 'images/f_active.png', id: 'BAF' },
    { src: 'images/spacebar_inactive.png', id: 'BIspace' },
    { src: 'images/spacebar_active.png', id: 'BAspace' },
    { src: 'images/pie.png', id: 'Bpie' },
  ];
  loader = new createjs.LoadQueue(false);
  loader.installPlugin(createjs.Sound);
  createjs.Sound.alternateExtensions = ['mp3'];
  //createjs.Sound.registerPlugins([createjs.HTMLAudioPlugin]);
  //createjs.Sound.registerPlugins([createjs.WebAudioPlugin, createjs.HTMLAudioPlugin]);
  loader.addEventListener('progress', handleProgress);
  loader.addEventListener('complete', handleComplete);
  loader.loadManifest(manifest, true);
  directionQuestionsAnswer();
}
//direction question and answer array
function directionQuestionsAnswer() {
  directionQuestion = new Array(
    { M: 50, D: 'West', A: 'E' },
    { M: 40, D: 'North West', A: 'E' },
    { M: 40, D: 'West', A: 'E' },
    { M: 50, D: 'South', A: 'F' },
    { M: 30, D: 'North East', A: 'F' },
    { M: 20, D: 'West', A: 'E' },
    { M: 40, D: 'East', A: 'E' },
    { M: 30, D: 'West', A: 'F' },
    { M: 20, D: 'North', A: 'E' },
    { M: 30, D: 'East', A: 'E' },
    { M: 30, D: 'North West', A: 'F' },
    { M: 40, D: 'North East', A: 'F' },
    { M: 50, D: 'East', A: 'F' },
    { M: 50, D: 'North East', A: 'E' },
    { M: 50, D: 'North West', A: 'F' }
  );
  //alert(directionQuestion.length);
}
function questionDir() {
  directionI = Math.floor(Math.random() * directionQuestion.length);
  directionAnswer = String(directionQuestion[directionI].A);
  directionAudioPlayer();
}
function handleProgress() {
  var progresPrecentage = Math.round(loader.progress * 100);
  $('#load_percent').text(`${progresPrecentage}% loaded`);
  // stage.update();
}
function optimizeForTouchAndScreens() {
  if (createjs.Touch.isSupported()) {
    createjs.Touch.enable(stage);
  }
}
function handleComplete() {
  loader.removeEventListener('progress', handleProgress);
  loader.removeEventListener('complete', handleComplete);
  var element = document.getElementById('loader');
  element.parentNode.removeChild(element);
  showStartScreen();
  //showSecondScreen();
  //createInterface();
  stage.update();
}
function showStartScreen() {
  showScreen('#logo-screen');
  document.getElementById('tside').innerHTML = String(
    'MultiTasker<span>Legacy</span>'
  );
  document.getElementById('tsider').innerHTML = String('Start of Exam');
  document
    .querySelector('#start-button')
    .addEventListener('click', showSecondScreen);
}
function showSecondScreen() {
  showScreen('#time-screen');
}
$(document).on('click', '#time-screen #time-buttons .time-button', function () {
  totalSec = Number($(this).attr('data-time'));
  createInterface();
});
function mouseOverButton(e) {
  var bname = String(e.target.name);
  switch (bname) {
    case 'bie':
      EFcont.getChildByName(bname).image = loader.getResult('BAE');
      break;
    case 'bif':
      EFcont.getChildByName(bname).image = loader.getResult('BAF');
      break;
    case 'bin':
      Numbercont.getChildByName(bname).image = loader.getResult('BAN');
      break;
    case 'biy':
      Numbercont.getChildByName(bname).image = loader.getResult('BAY');
      break;
    case 'bispace':
      Colorcont.getChildByName(bname).image = loader.getResult('BAspace');
      break;
  }
  stage.update();
}
function mouseOutButton(e) {
  var bname = String(e.target.name);
  switch (bname) {
    case 'bie':
      EFcont.getChildByName(bname).image = loader.getResult('BIE');
      break;
    case 'bif':
      EFcont.getChildByName(bname).image = loader.getResult('BIF');
      break;
    case 'bin':
      Numbercont.getChildByName(bname).image = loader.getResult('BIN');
      break;
    case 'biy':
      Numbercont.getChildByName(bname).image = loader.getResult('BIY');
      break;
    case 'bispace':
      Colorcont.getChildByName(bname).image = loader.getResult('BIspace');
      break;
  }
  stage.update();
}

function createInterface() {
  showScreen('#test');

  //load screen 1
  screen1 = new createjs.Bitmap(loader.getResult('Screen1'));
  screen1.regX = 0;
  screen1.regY = 0;
  screen1.x = 0;
  screen1.y = 0;
  stage.addChild(screen1);
  // ------------------------------ PieTimer ----------------------------
  pieTimer = new createjs.Shape().set({ x: 0, y: 0 });
  stage.addChild(pieTimer);

  // createjs.Tween.get(pieTimer.strokeCmd).to({endAngle:Math.PI*2}, 2000, createjs.Ease.quadInOut);

  // ------------------------------ EFcont ----------------------------
  EFcont = new createjs.Container();
  EFcont.x = -100;
  EFcont.y = 0;

  bmp = new createjs.Bitmap(loader.getResult('BIE'));
  bmp.x = 25;
  bmp.y = 70;
  bmp.name = 'bie';
  bmp.addEventListener('click', selectKeyboard);
  bmp.addEventListener('mouseover', mouseOverButton);
  bmp.addEventListener('mouseout', mouseOutButton);
  bmp.cursor = 'pointer';
  EFcont.addChild(bmp);

  bmp = new createjs.Bitmap(loader.getResult('BIF'));
  bmp.x = 25;
  bmp.y = 140;
  bmp.name = 'bif';
  bmp.addEventListener('click', selectKeyboard);
  bmp.addEventListener('mouseover', mouseOverButton);
  bmp.addEventListener('mouseout', mouseOutButton);
  bmp.cursor = 'pointer';
  EFcont.addChild(bmp);

  stage.addChild(EFcont);

  // ------------------------------ Color content ----------------------------
  Colorcont = new createjs.Container();
  Colorcont.x = 0;
  Colorcont.y = stage.canvas.height - 100;

  bmp = new createjs.Bitmap(loader.getResult('BIspace'));
  bmp.x = 0;
  bmp.y = 20;
  bmp.name = 'bispace';
  bmp.addEventListener('click', selectKeyboard);
  bmp.addEventListener('mouseover', mouseOverButton);
  bmp.addEventListener('mouseout', mouseOutButton);
  bmp.cursor = 'pointer';
  Colorcont.addChild(bmp);

  stage.addChild(Colorcont);

  // ------------------------------ Number content ----------------------------
  Numbercont = new createjs.Container();
  Numbercont.x = stage.canvas.width - 200;
  Numbercont.y = stage.canvas.height - 100;

  bmp = new createjs.Bitmap(loader.getResult('BIY'));
  bmp.regX = bmp.image.width;
  bmp.x = -75;
  bmp.y = 20;
  bmp.name = 'biy';
  bmp.addEventListener('click', selectKeyboard);
  bmp.addEventListener('mouseover', mouseOverButton);
  bmp.addEventListener('mouseout', mouseOutButton);
  bmp.cursor = 'pointer';
  Numbercont.addChild(bmp);

  bmp = new createjs.Bitmap(loader.getResult('BIN'));
  bmp.regX = bmp.image.width;
  bmp.x = 0;
  bmp.y = 20;
  bmp.name = 'bin';
  bmp.addEventListener('click', selectKeyboard);
  bmp.addEventListener('mouseover', mouseOverButton);
  bmp.addEventListener('mouseout', mouseOutButton);
  bmp.cursor = 'pointer';
  Numbercont.addChild(bmp);

  stage.addChild(Numbercont);

  //load screen 2
  screen2 = new createjs.Bitmap(loader.getResult('Screen2'));
  screen2.regX = 0;
  screen2.regY = 0;
  screen2.x = 575;
  screen2.y = 0;
  stage.addChild(screen2);
  //load bottom left screen
  bScr = new createjs.Bitmap(loader.getResult('BScreen'));
  bScr.regX = 0;
  bScr.regY = 0;
  bScr.x = 0;
  bScr.y = 496;
  stage.addChild(bScr);

  //load crosshair
  crossHair = new createjs.Bitmap(loader.getResult('ICross'));
  crossHair.regX = crossHair.width / 2;
  crossHair.regY = crossHair.height / 2;
  crossHair.x = CX;
  //crossHair.x =600;
  crossHair.y = CY;
  stage.addChild(crossHair);

  startMain();
}
function tickPie(event) {
  stage.update(event);
}
function hideKeybord() {
  playingAudio = true;

  EFcont.visible = false;
  Colorcont.visible = false;
  Numbercont.visible = false;
  pieTimer.visible = false;

  EFcont.getChildByName('bie').image = loader.getResult('BIE');
  EFcont.getChildByName('bif').image = loader.getResult('BIF');
  Numbercont.getChildByName('bin').image = loader.getResult('BIN');
  Numbercont.getChildByName('biy').image = loader.getResult('BIY');
  Colorcont.getChildByName('bispace').image = loader.getResult('BIspace');

  stage.removeChild(pieTimer);
  stage.update();
}
function selectKeyboard(e) {
  if (playingAudio) return;
  var btnKey = String(e.target.name);
  switch (btnKey) {
    case 'bif':
      if (qState == 'Direction') {
        isResponse = true;
        EFcont.getChildByName('bif').image = loader.getResult('BAF');
        if (directionAnswer == 'F') {
          score++;
        } else {
          errors++;
        }
        document.getElementById('tsiderx').innerHTML = String(
          'Score: ' + score
        );
        sec = 0;
        isDone = false;
        pickNextQuestion();
      }
      break;
    case 'bie':
      if (qState == 'Direction') {
        isResponse = true;
        EFcont.getChildByName('bie').image = loader.getResult('BAE');
        if (directionAnswer == 'E') {
          score++;
        } else {
          errors++;
        }
        document.getElementById('tsiderx').innerHTML = String(
          'Score: ' + score
        );
        sec = 0;
        isDone = false;
        pickNextQuestion();
      }
      break;
    case 'bispace':
      if (qState == 'Color') {
        spacek = true;
        isResponse = true;
        Colorcont.getChildByName('bispace').image = loader.getResult('BAspace');
        if (isA == 'Y') {
          score++;
        } else {
          errors++;
        }
        document.getElementById('tsiderx').innerHTML = String(
          'Score: ' + score
        );
        sec = 0;
        isDone = false;
        pickNextQuestion();
      }
      break;
    case 'bin':
      if (qState == 'Number') {
        isResponse = true;
        Numbercont.getChildByName('bin').image = loader.getResult('BAN');
        if (isA == 'N') {
          score++;
        } else {
          errors++;
        }
        document.getElementById('tsiderx').innerHTML = String(
          'Score: ' + score
        );
        sec = 0;
        isDone = false;
        pickNextQuestion();
      }
      break;
    case 'biy':
      if (qState == 'Number') {
        isResponse = true;
        Numbercont.getChildByName('biy').image = loader.getResult('BAY');
        if (isA == 'Y') {
          score++;
        } else {
          errors++;
        }
        document.getElementById('tsiderx').innerHTML = String(
          'Score: ' + score
        );
        sec = 0;
        isDone = false;
        pickNextQuestion();
      }
      break;
  }
  stage.update();
}
function showPieTimer(xPos, yPos, time) {
  pieTimer = new createjs.Shape().set({ x: xPos, y: yPos });
  pieTimer.graphics
    .beginFill('#d4d4d4')
    .arc(0, 0, 25, 0, Math.PI * 2, false)
    .lineTo(0, 0)
    .closePath();
  pieTimer.strokeCmd = pieTimer.graphics
    .s('#737373')
    .ss(20, 'rect')
    .arc(0, 0, 10, 0, 0).command;
  createjs.Tween.get(pieTimer.strokeCmd).to(
    { startAngle: 0, endAngle: Math.PI * 2 },
    time * 1000,
    createjs.Ease.quadInOut
  );
  stage.addChild(pieTimer);
  stage.update();
}
function startMain() {
  sec = 0;
  errors = 0;
  score = 0;
  randomQ = 0;
  currentS = 0;
  gameSec = 0;
  pSec = 0;
  hSec = 0;
  isDone = false;
  crossSec = 0;
  playingAudio = true;
  isResponse = false;
  totalAccuracy = new Array();
  qState = 'Direction';
  targetSec = 7;
  document.getElementById('tsiderx').innerHTML = String('Score: ' + score);
  //e.target.removeEventListener('click',startMain);
  window.addEventListener('keydown', getKeyDown);
  window.addEventListener('keyup', getKeyUp);
  createjs.Ticker.addEventListener('tick', mainEnterFrame);
  createjs.Ticker.setFPS(30);
  timeCounter = setInterval('countTimeMain()', 1000);

  createjs.Ticker.timingMode = createjs.Ticker.RAF;
  createjs.Ticker.on('tick', tickPie);

  askQuestion();

  //questionColor();
  //questionNumber();
}
function askQuestion() {
  hideKeybord();
  switch (qState) {
    case 'Direction':
      questionDir();
      break;
    case 'Color':
      questionColor();
      break;
    case 'Number':
      questionNumber();
      break;
  }
}
function questionColor() {
  var xOff = 140;
  pickedColor = new Array();
  cContainer = new createjs.Container();
  var r = Math.floor(Math.random() * 2);
  if (r == 1) {
    isA = 'Y';
  } else {
    isA = 'N';
  }

  for (var i = 0; i < colorArray.length; i++) {
    var rI = Math.floor(Math.random() * colorArray.length);
    pickedColor[i] = String(colorArray[rI]);
    var bName = String('I' + colorArray[rI]);
    var bmp = new createjs.Bitmap(loader.getResult(bName));
    bmp.regX = 0;
    bmp.regY = 0;

    bmp.x = i * (48 + 20);
    bmp.y = 0;
    cContainer.addChild(bmp);
  }
  if (isA == 'N') {
    for (i = 0; i < colorArray.length; i++) {
      rI = Math.floor(Math.random() * colorArray.length);
      pickedColor[i] = String(colorArray[rI]);
    }
  }
  stage.addChild(cContainer);
  cContainer.x = xOff;
  cContainer.y = 535;
  colorAudio();
  //stage.update();
}
function questionNumber() {
  var xOff = 690;
  pickedNumber = new Array();
  tContainer = new createjs.Container();
  var r = Math.floor(Math.random() * 5);

  for (var i = 0; i < 3; i++) {
    if (r == i) {
      isA = 'Y';
    } else {
      isA = 'N';
    }

    var sStr = '';
    for (var j = 0; j < 5; j++) {
      var rI = Math.floor(Math.random() * 9) + 1;
      sStr += String(rI);
      if (isA == 'Y' && pickedNumber.length < 5) {
        pickedNumber[j] = rI;
      }
    }

    var cT = new createjs.Text(sStr, '25px Open Sans', '#f4bd22');
    cT.y = 0;
    cT.x = i * 120;
    tContainer.addChild(cT);
  }
  if (isA == 'N') {
    for (j = 0; j < 5; j++) {
      rI = Math.floor(Math.random() * 9) + 1;
      pickedNumber[j] = rI;
    }
  }
  tContainer.x = xOff;
  tContainer.y = 545;
  stage.addChild(tContainer);
  numberAudio();
  //stage.update();
}
function getKeyUp(e) {
  switch (e.keyCode) {
    case 37:
      leftk = false;
      break;
    case 38:
      upk = false;
      break;
    case 39:
      rightk = false;
      break;
    case 40:
      downk = false;
      break;
    case 65:
      leftk = false;
      break;
    case 87:
      upk = false;
      break;
    case 68:
      rightk = false;
      break;
    case 83:
      downk = false;
      break;
  }
}
function getKeyDown(e) {
  e.preventDefault();
  // if(playingAudio) return;
  switch (e.keyCode) {
    case 70: // F
      if (!playingAudio && qState == 'Direction') {
        isResponse = true;
        EFcont.getChildByName('bif').image = loader.getResult('BAF');
        if (directionAnswer == 'F') {
          score++;
        } else {
          errors++;
        }
        document.getElementById('tsiderx').innerHTML = String(
          'Score: ' + score
        );
        sec = 0;
        isDone = false;
        setTimeout(pickNextQuestion, 1000);
      }
      break;
    case 69: // E
      if (!playingAudio && qState == 'Direction') {
        isResponse = true;
        EFcont.getChildByName('bie').image = loader.getResult('BAE');
        if (directionAnswer == 'E') {
          score++;
        } else {
          errors++;
        }
        document.getElementById('tsiderx').innerHTML = String(
          'Score: ' + score
        );
        sec = 0;
        isDone = false;
        setTimeout(pickNextQuestion, 1000);
      }
      break;
    case 32: // Space
      if (!playingAudio && qState == 'Color') {
        spacek = true;
        isResponse = true;
        Colorcont.getChildByName('bispace').image = loader.getResult('BAspace');
        if (isA == 'Y') {
          score++;
        } else {
          errors++;
        }
        document.getElementById('tsiderx').innerHTML = String(
          'Score: ' + score
        );
        sec = 0;
        isDone = false;
        setTimeout(pickNextQuestion, 1000);
      }
      break;
    case 37:
      leftk = true;
      break;
    case 38:
      upk = true;
      break;
    case 39:
      rightk = true;
      break;
    case 40:
      downk = true;
      break;
    case 65: // A
      leftk = true;
      break;
    case 87: // W
      upk = true;
      break;
    case 68: // D
      rightk = true;
      break;
    case 83: // S
      downk = true;
      break;
    case 78: // N
      if (!playingAudio && qState == 'Number') {
        isResponse = true;
        Numbercont.getChildByName('bin').image = loader.getResult('BAN');
        if (isA == 'N') {
          score++;
        } else {
          errors++;
        }
        document.getElementById('tsiderx').innerHTML = String(
          'Score: ' + score
        );
        sec = 0;
        isDone = false;
        setTimeout(pickNextQuestion, 1000);
      }
      break;
    case 89: // Y
      if (!playingAudio && qState == 'Number') {
        isResponse = true;
        Numbercont.getChildByName('biy').image = loader.getResult('BAY');
        if (isA == 'Y') {
          score++;
        } else {
          errors++;
        }
        document.getElementById('tsiderx').innerHTML = String(
          'Score: ' + score
        );
        sec = 0;
        isDone = false;
        setTimeout(pickNextQuestion, 1000);
      }
      break;
    default:
      break;
  }
  stage.update();
}
function countTimeMain() {
  if (isDone) {
    sec++;
  }
  gameSec++;

  if (gameSec >= totalSec) {
    gameSec = 0;
    clearInterval(timeCounter);
    gameOver();
  }
  var rsec = totalSec - gameSec;
  var tStr = String(
    Math.floor(rsec / 60) + ' minutes ' + (rsec % 60) + ' seconds'
  );
  document.getElementById('tsider').innerHTML = String(tStr);
  if (sec >= targetSec) {
    sec = 0;
    isDone = false;
    pickNextQuestion();
  }
}
function countTime() {
  hSec++;
  crossSec++;

  if (hSec > 3) {
    pSec++;
    hSec = 0;
  }

  if (crossSec >= 10) {
    crossSec = 0;
    measureAccuracy();
  }

  if (pSec > cSec) {
    pSec = 0;
    changeCSpeed();
  }
}
function pickNextQuestion() {
  randomQ = Math.floor(Math.random() * 3);
  if (qState == 'Direction') {
    if (!isResponse) {
      errors++;
      // document.getElementById('tsiderx').innerHTML = String(
      //     'Errors: ' + errors
      // );
    }
  } else if (qState == 'Color') {
    stage.removeChild(cContainer);
    if (spacek == false && isA == 'Y') {
      errors++;
      // document.getElementById('tsiderx').innerHTML = String(
      //     'Errors: ' + errors
      // );
    }
    spacek = false;
  } else if (qState == 'Number') {
    stage.removeChild(tContainer);
    if (!isResponse) {
      errors++;
      // document.getElementById('tsiderx').innerHTML = String(
      //     'Errors: ' + errors
      // );
    }
  }

  if (randomQ == 1) {
    qState = 'Direction';
    targetSec = 7;
  }
  if (randomQ == 0) {
    qState = 'Color';
    targetSec = 4;
  }
  if (randomQ == 2) {
    qState = 'Number';
    targetSec = 4;
  }

  currentS = 0;

  isA = 'N';

  isResponse = false;
  playingAudio = true;
  askQuestion();
}
function changeCSpeed() {
  cOspeedx = Math.floor(Math.random() * 4) + 4;
  cOspeedy = Math.floor(Math.random() * 4) + 4;
  var mI = Math.floor(Math.random() * 3);
  if (mI == 1) {
    cOspeedx *= -1;
  } else if (mI == 0) {
    cOspeedy *= -1;
  }
}
function measureAccuracy() {
  var xOffc = Math.abs(CX - crossHair.x);
  var yOffc = Math.abs(CY - crossHair.y);
  var yavg = (yOffc / 150) * 100;
  var xavg = (xOffc / 200) * 100;
  var bavg = Math.round((yavg + xavg) / 2);
  totalAccuracy.push(bavg);
}
function giveAresult() {
  var tV = 0;
  for (var i = 0; i < totalAccuracy.length; i++) {
    tV += totalAccuracy[i];
  }
  var avg = Math.round(tV / totalAccuracy.length);
  var res = 100 - avg;

  return res;
  //var per = Math.round((avg*100)/tV);
}
function playAgain(e) {
  e.target.removeEventListener('click', playAgain);
}
function mainEnterFrame(event) {
  // this set makes it so the stage only re-renders when an event handler indicates a change has happened.

  countTime();
  moveCrossHair();

  //update = false; // only update once
  stage.update(event);
}

function moveCrossHair() {
  const gp = navigator.getGamepads()[0];
  if (leftk) {
    crossHair.x -= cKspeedx;
  } else if (rightk) {
    crossHair.x += cKspeedx;
  } else if (upk) {
    crossHair.y -= cKspeedy;
  } else if (downk) {
    crossHair.y += cKspeedy;
  } else if (gp && (gp.axes[0] !== 0 || gp.axes[1] !== 0)) {
    crossHair.x += cKspeedx * gp.axes[0];
    crossHair.y += cKspeedy * gp.axes[1];
  } else {
    crossHair.x += cOspeedx;
    crossHair.y += cOspeedy;
  }
  if (crossHair.x < 610) {
    cOspeedx *= -1;
    crossHair.x += 20;
  }
  if (crossHair.x > 1025) {
    cOspeedx *= -1;
    crossHair.x -= 20;
  }
  if (crossHair.y > 360) {
    cOspeedy *= -1;
    crossHair.y -= 20;
  }
  if (crossHair.y < 30) {
    cOspeedy *= -1;
    crossHair.y += 20;
  }
}
function directionAudioPlayer() {
  var aName;

  switch (currentS) {
    case 0:
      aName = 'Distance';
      break;
    case 1:
      aName = String('S' + directionQuestion[directionI].M);
      break;
    case 2:
      aName = String('Miles');
      break;
    case 3:
      aName = String('Direction');
      break;
    case 4:
      aName = String(directionQuestion[directionI].D);
      break;
  }

  var instance = createjs.Sound.play(aName); // play using id.  Could also use full source path or event.src.
  instance.on('complete', createjs.proxy(this.handleCompleteSoundD, this));
  instance.volume = 1;
}
function handleCompleteSoundD() {
  if (currentS == TDS - 1) {
    isDone = true;
    EFcont.visible = true;
    playingAudio = false;
    showPieTimer(-50, 25, targetSec);
  }
  if (currentS < TDS - 1) {
    currentS++;
    setTimeout(() => directionAudioPlayer(), 50);
  } else {
    currentS = 0;
  }
}
//color audi
function colorAudio() {
  var aName = String(pickedColor[currentS]);
  var instance = createjs.Sound.play(aName); // play using id.  Could also use full source path or event.src.
  instance.on('complete', createjs.proxy(this.handleCompleteSoundC, this));
  instance.volume = 1;
}
function handleCompleteSoundC() {
  if (currentS == colorArray.length - 1) {
    isDone = true;
    Colorcont.visible = true;
    playingAudio = false;
    showPieTimer(-50, stage.canvas.height - 155, targetSec);
  }
  if (currentS < colorArray.length - 1) {
    currentS++;
    colorAudio();
  } else {
    currentS = 0;
  }
}
//audio number
//color audi
function numberAudio() {
  var aName = String('S' + pickedNumber[currentS]);
  var instance = createjs.Sound.play(aName); // play using id.  Could also use full source path or event.src.
  instance.on('complete', createjs.proxy(this.handleCompleteSoundN, this));
  instance.volume = 1;
}
function handleCompleteSoundN() {
  if (currentS == TDS - 1) {
    isDone = true;
    Numbercont.visible = true;
    playingAudio = false;
    showPieTimer(
      stage.canvas.width - 155,
      stage.canvas.height - 155,
      targetSec
    );
  }

  if (currentS < TDS - 1) {
    currentS++;
    numberAudio();
  } else {
    currentS = 0;
  }
}
function removeOldNumbers() {
  stage.removeChild(tContainer);
}
function gameOver() {
  window.removeEventListener('keydown', getKeyDown);
  window.removeEventListener('keyup', getKeyUp);
  createjs.Ticker.removeEventListener('tick', mainEnterFrame);
  stage.removeChild(cContainer);
  stage.removeChild(tContainer);
  stage.removeChild(screen1);
  stage.removeChild(screen2);
  stage.removeChild(bScr);
  stage.removeChild(crossHair);
  createjs.Sound.stop();
  showEndScreen();
}
function showEndScreen() {
  hideKeybord();
  document.getElementById('tsider').innerHTML = String('End of Exam');
  document.getElementById('tsiderx').innerHTML = String('- / -');
  $('#results span').text(score);
  var _percent = giveAresult();
  $('#percentage-recalls').text(_percent);
  $('#percentage-lights').text(((score / (score + errors)) * 100).toFixed(0));
  showScreen('#results-screen');

  var accuracy = giveAresult();
  saveLoaded(accuracy);
  sec = 0;
  errors = 0;
  score = 0;
  randomQ = 0;
  currentS = 0;
  gameSec = 0;
  pSec = 0;
  hSec = 0;
  crossSec = 0;
  isDone = false;
  isResponse = false;
  playingAudio = true;
  totalAccuracy = new Array();
  qState = 'Direction';
  targetSec = 5;
  leftk = false;
  rightk = false;
  upk = false;
  downk = false;
  stage.update();

  document
    .querySelector('#restart-button')
    .addEventListener('click', startAgain);
}
function startAgain() {
  showStartScreen();
}
//save the score
function saveLoaded(accuracy) {
  // Create our XMLHttpRequest object
  // var hr = new XMLHttpRequest();

  // var datastring = "";
  accuracy = giveAresult();
  // datastring += "Errors" + "=" + errors + "&";
  // datastring += "Duration" + "=" + totalSec + "&";
  // datastring += "Accuracy" + "=" + accuracy;
  var answers = (score / (score + errors)) * 100;

  insertResults(Math.round((answers + accuracy) / 2), totalSec);

  // hr.open("POST", "savePatScore.php");
  // // Set content type header information for sending url encoded variables in the request
  // hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  // // Access the onreadystatechange event for the XMLHttpRequest object
  // hr.onreadystatechange = function () {
  //     if (hr.readyState == 4 && hr.status == 200) {
  //         var return_data = hr.responseText;
  //         //alert(return_data);
  //     }
  // };
  // // Send the data to PHP now... and wait for response to update the status div
  // hr.send(datastring); // Actually execute the re
}

function insertResults(score, duration) {
  fetch('/wp-content/plugins/pat/api/insert-result.php', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      score,
      duration,
      mode: 'normal',
    }),
  });
}
