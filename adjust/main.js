// JavaScript Document
var canvas;
var stage;
var sec = 0;
var totalQ = 0;
var timeT;
var loader;
var currentS = 0,
  targetS = 30; //30 headinAltSpeed
var cc = 0,
  targetC = 45; //45 checklist
var cm = 0,
  targetM = 25; //120 Mathmetic
var inS;

var totalSec = 300;
var leftk,
  rightk,
  upk,
  downk,
  skey,
  wkey,
  spacek = false;
var speed, alt, heading;
var jType;
var tspeed, talt, theading;
var spT, altT, headT, tspT, taltT, theadT, quesT, ansT;
var isGame = false;
var spIn, headingIn, altIn;
var gameCont;
var fieldSky, planeBox;
var manageScr;
var fuelOn, airOn, elecOn, hydOn;
var fuelTask,
  fuelTaskoff,
  elecTask,
  elecTaskoff,
  hydTask,
  hydTaskoff,
  airTask,
  airTaskoff,
  tempArray;
var fuelCont, elecCont, airCont, hydCont;
var arithAns;
var isDone = false;
var rotD = 'left';
var speedR, altR, headR;
var readCont, readCont2, readCont3;
var score;
var errors = 0;
var findex = -1;
var trackTime;
var correctAns, inCorrectAns, fakeQuestBox;
var checklistText, clCont;

var headingStatus = true,
  altStatus = true,
  speedStatus = true;
var flightScore = 0,
  flightError = 0;
var checklistScore = 0,
  checklistError = 0;
var mathScore = 0,
  mathError = 0;
var headRCont = new createjs.Container();
var headIndex = 0;

var headOffset = 2.538889;
var cloudMargin = {
  top: 0,
  left: 0,
};
const isSafari = platform.name.toLowerCase() == "safari";

function Main() {
  canvas = document.getElementById('test');
  stage = new createjs.Stage(canvas);
  optimizeForTouchAndScreens();
  stage.enableMouseOver(10);
  manifest = [
    { src: 'images/mask.png', id: 'Fmask' },
    { src: 'images/PAT_exam_logo.png', id: 'Tlogo' },
    { src: 'images/terrain.png', id: 'Bterrain' },
    { src: 'images/mainDisplay.png', id: 'Bdisplay' },
    { src: 'images/arrow.png', id: 'Barrow' },
    { src: 'images/headingArrow.png', id: 'Bharrow' },
    { src: 'images/air2.png', id: 'Ascreen' },
    { src: 'images/elec2.png', id: 'Escreen' },
    { src: 'images/fuel2.png', id: 'Fscreen' },
    { src: 'images/hyd2.png', id: 'Hscreen' },
    { src: 'images/speed.png', id: 'ISpeed' },
    { src: 'images/vermask.png', id: 'Vmask' },
    { src: 'images/altitude.png', id: 'IAltitu' },
    { src: 'images/hormask.png', id: 'Hmask' },
    { src: 'images/heading.png', id: 'IHead' },
    { src: 'images/grey.png', id: 'Bgrey' },
    { src: 'images/grey_hover.png', id: 'BHgrey' },
    { src: 'images/blue.png', id: 'Bblue' },
    { src: 'images/blue_hover.png', id: 'BHblue' },
  ];
  loader = new createjs.LoadQueue(false);
  loader.installPlugin(createjs.Sound);

  loader.addEventListener('progress', handleProgress);
  loader.addEventListener('complete', handleComplete);
  loader.loadManifest(manifest, true);
}
function handleProgress() {
  var progresPrecentage = Math.round(loader.progress * 100);
  $('#load_percent').text(`${progresPrecentage}% loaded`);
}
function optimizeForTouchAndScreens() {
  if (createjs.Touch.isSupported()) {
    createjs.Touch.enable(stage);
  }
}
function handleComplete() {
  loader.removeEventListener('progress', handleProgress);
  loader.removeEventListener('complete', handleComplete);
  fuelTask = new Array(
    'TURN LH FRONT FUEL PUMP ON',
    'TURN RH FRONT FUEL PUMP ON',
    'TURN LH REAR FUEL PUMP ON',
    'TURN RH REAR FUEL PUMP ON',
    'TURN CROSSFEED VALVE ON'
  );
  fuelTaskoff = new Array(
    'TURN LH FRONT FUEL PUMP OFF',
    'TURN RH FRONT FUEL PUMP OFF',
    'TURN LH REAR FUEL PUMP OFF',
    'TURN RH REAR FUEL PUMP OFF',
    'TURN CROSSFEED VALVE OFF'
  );
  elecTask = new Array(
    'OPEN AC TIE BUS',
    'TURN LH GEN ON',
    'TURN RH GEN ON',
    'TURN LH BAT ON',
    'TURN RH BAT ON'
  );
  elecTaskoff = new Array(
    'CLOSE AC TIE BUS',
    'TURN LH GEN OFF',
    'TURN RH GEN OFF',
    'TURN LH BAT OFF',
    'TURN RH BAT OFF'
  );

  airTask = new Array(
    'TURN LH HIGH BLEED AIR ON',
    'TURN RH HIGH BLEED AIR ON',
    'TURN LH LOW BLEED AIR ON',
    'TURN RH LOW BLEED AIR ON',
    'OPEN ISOLATION VALVE'
  );
  airTaskoff = new Array(
    'TURN LH HIGH BLEED AIR OFF',
    'TURN RH HIGH BLEED AIR OFF',
    'TURN LH LOW BLEED AIR OFF',
    'TURN RH LOWBLEED AIR OFF',
    'CLOSE ISOLATION VALVE'
  );
  hydTask = new Array(
    'TURN LH ELEC PUMP ON',
    'TURN RH ELEC PUMP ON',
    'TURN AUX PUMP ON',
    'TURN LH ENG PUMP ON',
    'TURN RH ENG PUMP ON'
  );
  hydTaskoff = new Array(
    'TURN LH ELEC PUMP OFF',
    'TURN RH ELEC PUMP OFF',
    'TURN AUX PUMP OFF',
    'TURN LH ENG PUMP OFF',
    'TURN RH ENG PUMP OFF'
  );

  isGame = false;
  var element = document.getElementById('loader');
  element.parentNode.removeChild(element);
  showStartScreen();
  //showSecondScreen();
  //createInterface();
  stage.update();
  startMain();
}
function showStartScreen() {
  showScreen('#logo-screen');
  document.getElementById('tside').innerHTML = String(
    'Adjust<span>Legacy</span>'
  );
  document.getElementById('tsider').innerHTML = String('Start of Exam');
  document
    .querySelector('#start-button')
    .addEventListener('click', showSecondScreen);
}
function showSecondScreen(e) {
  showScreen('#time-screen');
}
$(document).on('click', '#time-screen #time-buttons .time-button', function () {
  totalSec = Number($(this).attr('data-time'));
  createInterface();
});
function createInterface() {
  showScreen('#main-screen');

  gameCont = new createjs.Container();
  var bmp = addBmp('Fmask', 0, 0, false);

  var maskFillter = new createjs.AlphaMaskFilter(bmp.image);
  gameCont.filters = [maskFillter];
  gameCont.x = 0;
  gameCont.cache(0, 0, 1400, 790);

  stage.addChild(gameCont);

  fieldSky = addBmp('Bterrain', 0, 0, true);
  fieldSky.x = stage.canvas.width / 2;
  fieldSky.y = 270;
  fieldSky.visible = false;
  gameCont.addChild(fieldSky);

  planeBox = addBmp('Bdisplay', 0, 0, true);
  planeBox.x = stage.canvas.width / 2;
  planeBox.y = 500; //367
  gameCont.addChild(planeBox);
  stage.update();

  speed = 310;
  tspeed = 310;
  alt = 5800;
  talt = 5800;
  heading = 180;
  theading = 180;

  var titleT = new createjs.Text('HEADING', '11px Open Sans', '#c7c7c7');
  titleT.x = 390;
  titleT.y = 350;
  titleT.textAlign = 'center';
  gameCont.addChild(titleT);

  theadT = new createjs.Text('180', '16px Open Sans', '#72b62b');
  theadT.x = 387;
  theadT.y = isSafari ? 373 : 378;
  theadT.textAlign = 'center';
  gameCont.addChild(theadT);

  titleT = new createjs.Text('ALTITUDE', '11px Open Sans', '#c7c7c7');
  titleT.x = 510;
  titleT.y = 350;
  titleT.textAlign = 'center';
  gameCont.addChild(titleT);

  taltT = new createjs.Text('5800', '16px Open Sans', '#72b62b');
  taltT.x = 510;
  taltT.y = isSafari ? 373 : 378;
  taltT.textAlign = 'center';
  gameCont.addChild(taltT);

  titleT = new createjs.Text('SPEED', '11px Open Sans', '#c7c7c7');
  titleT.x = 630;
  titleT.y = 350;
  titleT.textAlign = 'center';
  gameCont.addChild(titleT);

  tspT = new createjs.Text('310', '16px Open Sans', '#72b62b');
  tspT.x = 630;
  tspT.y = isSafari ? 373 : 378;
  tspT.textAlign = 'center';
  gameCont.addChild(tspT);

  quesT = new createjs.Text('', '20px Open Sans', '#fff');
  quesT.x = 938;
  quesT.y = isSafari ? 361 : 366;
  quesT.textAlign = 'right';
  gameCont.addChild(quesT);

  ansT = new createjs.Text('', '20px Open Sans', '#fff');
  ansT.x = 940;
  ansT.y = isSafari ? 361 : 366;
  //ansT.textAlign = "center";
  gameCont.addChild(ansT);

  correctAns = answerRect(356, 58, '#6ee038');
  correctAns.x = 716;
  correctAns.y = 346;
  correctAns.visible = false;
  gameCont.addChild(correctAns);

  inCorrectAns = answerRect(356, 58, 'red');
  inCorrectAns.x = 716;
  inCorrectAns.y = 346;
  inCorrectAns.visible = false;
  gameCont.addChild(inCorrectAns);

  fakeQuestBox = new createjs.Shape();
  fakeQuestBox.graphics.setStrokeStyle(2).rect(0, 0, 356, 58);
  var hit = new createjs.Shape();
  hit.graphics.beginFill('#000').rect(0, 0, 356, 58);
  fakeQuestBox.hitArea = hit;
  fakeQuestBox.on('click', clickQuestionBox);
  fakeQuestBox.x = 716;
  fakeQuestBox.y = 348;
  fakeQuestBox.cursor = 'pointer';
  gameCont.addChild(fakeQuestBox);

  fuelOn = addBmp('Bgrey', 0, 0, false);
  fuelOn.scaleX = 0.55;
  fuelOn.scaleY = 0.45;
  fuelOn.x = 218;
  fuelOn.y = 340;
  fuelOn.name = 'pre_fuel';
  fuelOn.cursor = 'pointer';
  fuelOn.addEventListener('mouseover', mouseOverButton);
  fuelOn.addEventListener('mouseout', mouseOutButton);
  // fuelOn.visible = false;
  gameCont.addChild(fuelOn);
  var keyT = new createjs.Text('FUEL', '12px Open Sans', '#ffffff');
  keyT.set({
    x: 218 + (160 * 0.55) / 2,
    y: 340 + (56 * 0.45) / 2,
    textAlign: 'center',
    textBaseline: 'middle',
  });
  gameCont.addChild(keyT);

  airOn = addBmp('Bgrey', 0, 0, false);
  airOn.scaleX = 0.55;
  airOn.scaleY = 0.45;
  airOn.x = 218;
  airOn.y = 380;
  airOn.name = 'pre_air';
  airOn.cursor = 'pointer';
  airOn.addEventListener('mouseover', mouseOverButton);
  airOn.addEventListener('mouseout', mouseOutButton);
  // airOn.visible = false;
  gameCont.addChild(airOn);
  keyT = new createjs.Text('AIR', '12px Open Sans', '#ffffff');
  keyT.set({
    x: 218 + (160 * 0.55) / 2,
    y: 380 + (56 * 0.45) / 2,
    textAlign: 'center',
    textBaseline: 'middle',
  });
  gameCont.addChild(keyT);

  elecOn = addBmp('Bgrey', 0, 0, false);
  elecOn.scaleX = 0.55;
  elecOn.scaleY = 0.45;
  elecOn.x = 1096;
  elecOn.y = 340;
  elecOn.name = 'pre_elec';
  elecOn.cursor = 'pointer';
  elecOn.addEventListener('mouseover', mouseOverButton);
  elecOn.addEventListener('mouseout', mouseOutButton);
  // elecOn.visible = false;
  gameCont.addChild(elecOn);
  keyT = new createjs.Text('ELEC', '12px Open Sans', '#ffffff');
  keyT.set({
    x: 1096 + (160 * 0.55) / 2,
    y: 340 + (56 * 0.45) / 2,
    textAlign: 'center',
    textBaseline: 'middle',
  });
  gameCont.addChild(keyT);

  hydOn = addBmp('Bgrey', 0, 0, false);
  hydOn.scaleX = 0.55;
  hydOn.scaleY = 0.45;
  hydOn.x = 1096;
  hydOn.y = 380;
  hydOn.name = 'pre_hyd';
  hydOn.cursor = 'pointer';
  hydOn.addEventListener('mouseover', mouseOverButton);
  hydOn.addEventListener('mouseout', mouseOutButton);
  // hydOn.visible = false;
  gameCont.addChild(hydOn);
  keyT = new createjs.Text('HYD', '12px Open Sans', '#ffffff');
  keyT.set({
    x: 1096 + (160 * 0.55) / 2,
    y: 380 + (56 * 0.45) / 2,
    textAlign: 'center',
    textBaseline: 'middle',
  });
  gameCont.addChild(keyT);

  clCont = new createjs.Container();
  checklistText = new createjs.Text('', '16px Open Sans', '#fff');
  checklistText.x = 20;
  checklistText.y = isSafari ? 4 : 7;
  var shape = boxMaker(360, 30, '#222');
  shape.name = 'checkbox';
  clCont.addChild(shape);
  clCont.visible = false;
  clCont.addChild(checklistText);
  gameCont.addChild(clCont);
  clCont.x = 280;
  clCont.y = 460;

  pickATask();
  //pickFuelTask();
  speedStatus = false;
  altStatus = false;
  headingStatus = false;
  headingAltSpeed();
  arithMatic();
  errors = 0;
  currentS = 0;
  cm = 0;
  cc = 0;
  msec = 0;
  sec = 0;
  score = 0;

  flightScore = 0;
  flightError = 0;
  checklistScore = 0;
  checklistError = 0;
  mathScore = 0;
  mathError = 0;

  isDone = false;

  //speed
  readCont = new createjs.Container();
  var maskv = addBmp('Vmask', 0, 0, false);
  maskv.alpha = 0.5;
  readCont.addChild(maskv);
  var maskFillter2 = new createjs.AlphaMaskFilter(maskv.image);
  readCont.filters = [maskFillter2];
  readCont.x = 195;
  readCont.y = 28;
  readCont.cache(0, 0, 1400, 790);
  gameCont.addChild(readCont);

  speedR = addBmp('ISpeed', 10, 0, false);
  readCont.addChild(speedR);

  spIn = new createjs.Container();
  bmp = addBmp('Barrow', 0, 0, false);
  spIn.addChild(bmp);
  bmp.scaleX = 0.7;
  bmp.scaleY = 0.6;
  gameCont.addChild(spIn);

  spT = new createjs.Text('310', '16px Open Sans', '#fff');
  spT.x = 40;
  spT.y = isSafari ? 6 : 10;
  spIn.addChild(spT);
  spIn.x = 280;
  spIn.y = 142;

  //alt
  readCont2 = new createjs.Container();
  var maskc = addBmp('Vmask', 0, 0, false);
  maskc.alpha = 0.5;
  readCont2.addChild(maskc);
  var maskFillter3 = new createjs.AlphaMaskFilter(maskc.image);
  readCont2.filters = [maskFillter3];
  readCont2.x = 1106;
  readCont2.y = 28;
  readCont2.cache(0, 0, 1400, 790);
  gameCont.addChild(readCont2);

  altR = addBmp('IAltitu', 15, 0, false);
  readCont2.addChild(altR);

  altIn = new createjs.Container();
  bmp = addBmp('Barrow', 0, 0, false);
  bmp.scaleX = -0.7;
  bmp.scaleY = 0.6;
  altIn.addChild(bmp);
  gameCont.addChild(altIn);
  altT = new createjs.Text('5800', '16px Open Sans', '#fff');
  altT.x = -75;
  altT.y = isSafari ? 6 : 10;
  altIn.addChild(altT);
  altIn.x = 1125;
  altIn.y = 142;

  //head
  readCont3 = new createjs.Container();
  var maskd = addBmp('Hmask', 0, 0, false);
  maskd.alpha = 0.5;
  readCont3.addChild(maskd);
  var maskFillter4 = new createjs.AlphaMaskFilter(maskd.image);
  readCont3.filters = [maskFillter4];
  readCont3.x = 574;
  readCont3.y = 217;
  readCont3.cache(0, 0, 1400, 790);
  gameCont.addChild(readCont3);

  headR = addBmp('IHead', -10, 20, false);
  headRCont.addChild(headR);
  headRCont.x = -374;
  readCont3.addChild(headRCont);

  headingIn = new createjs.Container();
  bmp = addBmp('Bharrow', 0, 0, false);
  bmp.scaleX = 0.7;
  bmp.scaleY = 0.6;
  headingIn.addChild(bmp);
  gameCont.addChild(headingIn);
  headT = new createjs.Text('180', '16px Open Sans', '#fff');
  headT.x = 35;
  headT.y = isSafari ? 6 : 10;
  headT.textAlign = 'center';
  headingIn.addChild(headT);
  headingIn.x = 666;
  headingIn.y = 186;

  isGame = true;
  trackTime = setInterval(keepTime, 1000);

  // document.body.style.backgroundColor = "#2e2e2e";
  window.addEventListener('keydown', getKeyDown);
  window.addEventListener('keyup', getKeyUp);
}
function mouseOverButton(e) {
  var bname = String(e.target.name);
  if (bname.indexOf('pre') > -1) {
    e.target.image = loader.getResult('BHgrey');
  } else {
    e.target.image = loader.getResult('BHblue');
  }
  stage.update();
}
function mouseOutButton(e) {
  var bname = String(e.target.name);
  if (bname.indexOf('pre') > -1) {
    e.target.image = loader.getResult('Bgrey');
  } else {
    e.target.image = loader.getResult('Bblue');
  }
  stage.update();
}
function keepTime() {
  sec++;
  var rsec = totalSec - sec;
  var tStr = String(Math.floor(rsec / 60) + ' mins ' + (rsec % 60) + ' secs');
  document.getElementById('tsider').innerHTML = String(tStr);
  manageTest();
  if (sec > totalSec) {
    clearInterval(trackTime);
    isGame = false;
    sec = 0;
    gameOver();
  }
}
function manageTest() {
  cm++;
  cc++;
  currentS++;
  if (currentS > targetS) {
    currentS = 0;
    calculatePrevious();
    headingAltSpeed();
  } else {
    checkShowCircelAnimation();
  }
  if (cm > targetM) {
    cm = 0;
    var ans = String(ansT.text);
    if (!spacek) {
      if (ans == arithAns) {
        errors++;
      }
    }
    spacek = false;
    isDone = false;
    arithMatic();
  }
  if (cc > targetC) {
    cc = 0;
    if (totalQ <= 0) {
      pickATask();
    } else {
      errors++;
    }
  }
  document.getElementById('tsiderx').innerHTML = String('Score: ' + score);
}
function startMain() {
  createjs.Ticker.setFPS(60);
  createjs.Ticker.addEventListener('tick', updateGame);
}
function updateGame(e) {
  if (isGame) {
    if (gameCont != null) {
      gameCont.updateCache();
    }
    if (readCont != null) {
      readCont.updateCache();
    }
    if (readCont2 != null) {
      readCont2.updateCache();
    }
    if (readCont3 != null) {
      readCont3.updateCache();
    }
    changeSpeed();
    changeAltitude();
    changeHeading();
    changeCloud();
    gamepadCheck();
    //	moveSky();
  }
  stage.update();
}
function checkShowCircelAnimation() {
  var speedTempStatus = proximityCheck(speed, tspeed, 11) ? true : false;
  var altTempStatus = proximityCheck(alt, talt, 11) ? true : false;
  var headingTempStatus = proximityCheck(heading, theading, 6) ? true : false;

  if (speedStatus != speedTempStatus) {
    if (speedTempStatus) {
      generateAnimatedCircle(400, 157, gameCont, 5000, 'speed_circle');
    } else {
      if (gameCont.getChildByName('speed_circle'))
        gameCont.removeChild(gameCont.getChildByName('speed_circle'));
    }
    speedStatus = speedTempStatus;
  }

  if (altStatus != altTempStatus) {
    if (altTempStatus) {
      generateAnimatedCircle(1003, 160, gameCont, 5000, 'alt_circle');
    } else {
      if (gameCont.getChildByName('alt_circle'))
        gameCont.removeChild(gameCont.getChildByName('alt_circle'));
    }
    altStatus = altTempStatus;
  }

  if (headingStatus != headingTempStatus) {
    if (headingTempStatus) {
      generateAnimatedCircle(700, 165, gameCont, 5000, 'heading_circle');
    } else {
      if (gameCont.getChildByName('heading_circle'))
        gameCont.removeChild(gameCont.getChildByName('heading_circle'));
    }
    headingStatus = headingTempStatus;
  }
}
function calculatePrevious() {
  if (
    proximityCheck(speed, tspeed, 11) &&
    proximityCheck(heading, theading, 6) &&
    proximityCheck(alt, talt, 11)
  ) {
    score++;
    flightScore++;
  } else {
    errors++;
    flightError++;
  }
}
function changeSpeed() {
  if (wkey) {
    if (speedR.y < 0) {
      speedR.y += 2.85;
      speed += 0.5;
      //spIn.y -= 1;
      // altR.y += 1;
      // alt += 1.75;
    }
  }
  if (skey) {
    if (speedR.y > -570) {
      speedR.y -= 2.85;
      speed -= 0.5;
      //spIn.y += 1;
      // altR.y -= 1;
      // alt -= 1.75;
    }
  }
  spT.text = String(Math.floor(speed));
  // altT.text = String(Math.floor(alt));
}

function changeAltitude() {
  if (upk && alt < 5800) {
    altR.y += 4;
    alt += 7;
  }
  if (downk && alt > 4200) {
    altR.y -= 4;
    alt -= 7;
  }
  altT.text = String(Math.floor(alt));
}

function changeHeading() {
  if (leftk) {
    rotD = 'left';
    headRCont.x += headOffset;

    if (heading != 0) heading -= 1;
    else heading = 360;

    if (headRCont.x > -25 - headIndex * 914) {
      headIndex--;
      if (!headRCont.getChildByName('headIndex' + headIndex)) {
        var headR2 = headR.clone();
        headR2.x = headIndex * 914 - 10;
        headR2.name = 'headIndex' + headIndex;
        headRCont.addChild(headR2);
      }
    }
  }
  if (rightk) {
    rotD = 'right';
    headRCont.x -= headOffset;

    if (heading != 360) heading += 1;
    else heading = 0;

    if (headRCont.x < -665 - headIndex * 914) {
      headIndex++;
      if (!headRCont.getChildByName('headIndex' + headIndex)) {
        var headR2 = headR.clone();
        headR2.x = headIndex * 914 - 10;
        headRCont.addChild(headR2);
      }
    }
  }
  headT.text = String(Math.floor(heading));
}

function changeCloud() {
  if (upk && alt < 5800) cloudMargin.top += 2.5;
  if (downk && alt > 4200) cloudMargin.top -= 2.5;
  if (leftk) cloudMargin.left += 1.5;
  if (rightk) cloudMargin.left -= 1.5;
  updateCloud();
}

function gamepadCheck() {
  const gp = navigator.getGamepads()[0];
  if (!gp) return;

  const offsetLeft = gp.axes[0];
  const offsetTop = gp.axes[1];

  //up down
  if ((offsetTop < 0 && alt > 4200) || (offsetTop > 0 && alt < 5800)) {
    altR.y += 4 * offsetTop;
    alt += 7 * offsetTop;
    // fieldSky.y += 0.5 * offsetTop;
    cloudMargin.top += 1.5 * offsetTop;
  }

  altT.text = String(Math.floor(alt));

  // if ((offsetTop < 0 && alt > 4200) || (offsetTop > 0 && alt < 5800)) {
  //     cloudMargin.top += 1.5 * offsetTop;
  // }

  //left right
  headRCont.x -= headOffset * offsetLeft;
  if (offsetLeft < 0) {
    rotD = 'left';
    if (heading >= 0) heading += offsetLeft;
    else heading = 360;
    if (headRCont.x > -25 - headIndex * 914) {
      headIndex--;
      if (!headRCont.getChildByName('headIndex' + headIndex)) {
        var headR2 = headR.clone();
        headR2.x = headIndex * 914 - 10;
        headR2.name = 'headIndex' + headIndex;
        headRCont.addChild(headR2);
      }
    }
  }
  if (offsetLeft > 0) {
    rotD = 'right';
    if (heading <= 360) heading += offsetLeft;
    else heading = 0;

    if (headRCont.x < -665 - headIndex * 914) {
      headIndex++;
      if (!headRCont.getChildByName('headIndex' + headIndex)) {
        var headR2 = headR.clone();
        headR2.x = headIndex * 914 - 10;
        headRCont.addChild(headR2);
      }
    }
  }
  headT.text = String(Math.floor(heading));
  cloudMargin.left -= 2.5 * offsetLeft;
  updateCloud();
}

function updateCloud() {
  document.querySelector('#viewport').style.marginTop = `${Math.round(
    cloudMargin.top
  )}px`;

  document.querySelector('#viewport').style.marginLeft = `${Math.round(
    cloudMargin.left
  )}px`;
}

function playAgain(e) {
  e.target.removeEventListener('click', playAgain);
}

function headingBack(items) {
  createjs.Tween.get(items).to({ rotation: 0 }, 2000, createjs.Ease.QuadOut);
}
function altBack(items) {
  createjs.Tween.get(items).to(
    { y: 270, scaleY: 1 },
    2000,
    createjs.Ease.QuadOut
  );
}
function gameOver() {
  createjs.Tween.removeAllTweens();
  sec = 0;
  totalQ = 0;
  createjs.Sound.stop();
  stage.removeChild(readCont);
  stage.removeChild(readCont2);
  stage.removeChild(readCont3);
  gameCont.removeAllChildren();
  stage.removeChild(gameCont);
  window.removeEventListener('keydown', getKeyDown);
  window.removeEventListener('keyup', getKeyUp);
  showEndScreen();
}
function showEndScreen() {
  // document.getElementById('tside').innerHTML = String("Adjust<span>Legacy</span>");
  document.getElementById('tsider').innerHTML = String('End of Exam');
  $('#flightpath-control').text(
    ((flightScore / (flightScore + flightError)) * 100).toFixed(0)
  );
  $('#true_items').text(checklistScore);
  $('#all_items').text(checklistScore + checklistError);
  $('#true_arithmetic').text(mathScore);
  $('#all_arithmetic').text(mathScore + mathError);
  showScreen('#results-screen');

  saveLoaded();
  errors = 0;
  score = 0;
  flightScore = 0;
  flightError = 0;
  checklistScore = 0;
  checklistError = 0;
  mathScore = 0;
  mathError = 0;
  upk = false;
  downk = false;
  leftk = false;
  rightk = false;
  skey = false;
  wkey = false;
  spacek = false;
  stage.update();

  document
    .querySelector('#restart-button')
    .addEventListener('click', startAgain);
}
function startAgain() {
  showStartScreen();
}

//save the score
function saveLoaded() {
  // Create our XMLHttpRequest object
  // var hr = new XMLHttpRequest();

  var flightpathScore = (flightScore / (flightScore + flightError)) * 100;
  var chScore =
    checklistScore + checklistError > 0
      ? (checklistScore / (checklistScore + checklistError)) * 100
      : 100;
  var mtScore =
    mathScore + mathError > 0
      ? (mathScore / (mathScore + mathError)) * 100
      : 100;

  // var datastring = '';
  var accu = Math.round((flightpathScore + chScore + mtScore) / 3);

  insertResults(accu, totalSec);
  //   datastring += 'adjust_errors' + '=' + errors + '&';
  //   datastring += 'accuracy' + '=' + accu + '&';
  //   datastring += 'duration' + '=' + totalSec;
  //   hr.open('POST', 'saveADScore.php');
  //   // Set content type header information for sending url encoded variables in the request
  //   hr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  //   // Access the onreadystatechange event for the XMLHttpRequest object
  //   hr.onreadystatechange = function () {
  //     if (hr.readyState == 4 && hr.status == 200) {
  //       var return_data = hr.responseText;
  //       //alert(return_data);
  //     }
  //   };
  //   // Send the data to PHP now... and wait for response to update the status div
  //   hr.send(datastring); // Actually execute the re
}
function addBmp(bname, tx, ty, isR) {
  var bmp = new createjs.Bitmap(loader.getResult(bname));
  if (isR) {
    bmp.regX = bmp.image.width / 2;
    bmp.regY = bmp.image.height / 2;
  }
  bmp.y = ty;
  bmp.x = tx;
  return bmp;
}

function clearGameWindow() {
  for (var i = 0; i < gameCont.numChildren; i++) {
    if (gameCont.getChildAt(i).hasEventListener('click')) {
      gameCont.getChildAt(i).removeEventListener('click', selectPlane);
    }
  }
  //gameCont.removeAllChildren();
}

function getKeyUp(e) {
  switch (e.keyCode) {
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
function getKeyDown(e) {
  e.preventDefault();
  switch (e.keyCode) {
    case 32:
      ////spacek = true;
      ////var ans = String(ansT.text);
      ////if(!isDone){
      ////	isDone = true;
      ////	if(ans != arithAns){
      ////		errors++;

      ////	}
      ////}

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
function pickATask() {
  var ri = Math.floor(Math.random() * 4);
  findex = -1;
  //ri = 3;
  hydOn.name = 'pre_hyd';
  airOn.name = 'pre_air';
  fuelOn.name = 'pre_fuel';
  elecOn.name = 'pre_elec';
  hydOn.image = loader.getResult('Bgrey');
  airOn.image = loader.getResult('Bgrey');
  fuelOn.image = loader.getResult('Bgrey');
  elecOn.image = loader.getResult('Bgrey');

  if (hydCont != null) {
    gameCont.removeChild(hydCont);
    hydOn.removeEventListener('click', pickTheTask);
  }
  if (airCont != null) {
    gameCont.removeChild(airCont);
    airOn.removeEventListener('click', pickTheTask);
  }
  if (elecCont != null) {
    gameCont.removeChild(elecCont);
    elecOn.removeEventListener('click', pickTheTask);
  }
  if (fuelCont != null) {
    gameCont.removeChild(fuelCont);
    fuelOn.removeEventListener('click', pickTheTask);
  }
  // ri = 3;
  switch (ri) {
    case 0:
      // fuelOn.visible = true;
      fuelOn.name = 'fuel';
      fuelOn.image = loader.getResult('Bblue');
      generateAnimatedLine(198, 340, 8, 24, gameCont, targetC * 1000);
      fuelOn.addEventListener('click', pickTheTask);
      //
      break;
    case 1:
      //
      // airOn.visible = true;
      airOn.name = 'air';
      airOn.image = loader.getResult('Bblue');
      generateAnimatedLine(198, 380, 8, 24, gameCont, targetC * 1000);
      airOn.addEventListener('click', pickTheTask);
      break;
    case 2:
      //
      // elecOn.visible = true;
      elecOn.name = 'elec';
      elecOn.image = loader.getResult('Bblue');
      generateAnimatedLine(1206, 340, 8, 24, gameCont, targetC * 1000);
      elecOn.addEventListener('click', pickTheTask);
      break;
    case 3:
      //
      // hydOn.visible = true;
      hydOn.name = 'hyd';
      hydOn.image = loader.getResult('Bblue');
      generateAnimatedLine(1206, 380, 8, 24, gameCont, targetC * 1000);
      hydOn.addEventListener('click', pickTheTask);
      break;
  }
}
function pickTheTask(e) {
  e.target.removeEventListener('click', pickTheTask);
  var cname = String(e.target.name);
  checklistText.text = cname.toUpperCase() + ' CHECKLIST';
  clCont.visible = true;
  switch (cname) {
    case 'fuel':
      pickFuelTask();

      break;
    case 'air':
      pickAirTask();

      break;
    case 'elec':
      pickElecTask();

      break;
    case 'hyd':
      pickHydTask();

      break;
  }
}
function pickFuelTask() {
  var pM = Math.floor(Math.random() * 4) + 1;
  var gg = Math.floor(Math.random() * 2);
  totalQ = pM;
  var i = 0;
  tempArray = new Array();
  var sArray = new Array();
  while (i < pM) {
    var qObj = new Object();
    if (gg == 1) {
      var gI = Math.floor(Math.random() * fuelTask.length);
      var tStr = String(fuelTask[gI]);
      qObj.state = 'on';
    } else {
      gI = Math.floor(Math.random() * fuelTaskoff.length);
      tStr = String(fuelTaskoff[gI]);
      qObj.state = 'off';
    }

    qObj.str = tStr;
    qObj.index = i;

    if (sArray.indexOf(tStr) == -1) {
      sArray.push(tStr);
      tStr = tStr.replace(/\s/g, '');
      tStr = tStr.toLowerCase();
      qObj.name = tStr;
      tempArray.push(qObj);
      i++;
    }
  }
  fuelCont = new createjs.Container();
  manageScr = addBmp('Fscreen', 0, 0, false);
  // manageScr.scaleX = .53;
  // manageScr.scaleY = .53;
  fuelCont.x = 724;
  fuelCont.y = 440 + 250 * 0.05;
  //manageScr.alpha = 0.2;
  fuelCont.addChild(manageScr);
  for (i = 0; i < tempArray.length; i++) {
    var cont = makeYellowBox(tempArray[i].str, 360, 30, '#f2ea1d', false);
    cont.index = i;
    cont.name = tempArray[i].name;

    gameCont.addChild(cont);
    setupFuel(tempArray[i].name, i);
    cont.x = 280;
    cont.y = 510 + i * 42;
  }

  gameCont.addChild(fuelCont);
}
function pickElecTask() {
  var pM = Math.floor(Math.random() * 4) + 1;
  totalQ = pM;
  var gg = Math.floor(Math.random() * 2);
  var i = 0;
  tempArray = new Array();
  var sArray = new Array();
  while (i < pM) {
    var qObj = new Object();
    if (gg == 1) {
      var gI = Math.floor(Math.random() * elecTask.length);
      var tStr = String(elecTask[gI]);
      qObj.state = 'on';
    } else {
      gI = Math.floor(Math.random() * elecTaskoff.length);
      tStr = String(elecTaskoff[gI]);
      qObj.state = 'off';
    }

    qObj.str = tStr;
    qObj.index = i;

    if (sArray.indexOf(tStr) == -1) {
      sArray.push(tStr);
      tStr = tStr.replace(/\s/g, '');
      tStr = tStr.toLowerCase();
      qObj.name = tStr;
      tempArray.push(qObj);

      i++;
    }
  }
  elecCont = new createjs.Container();
  manageScr = addBmp('Escreen', 0, 0, false);
  // manageScr.scaleX = .53;
  // manageScr.scaleY = .53;
  elecCont.x = 724;
  elecCont.y = 440 + 250 * 0.05;
  //manageScr.alpha = 0.2;
  elecCont.addChild(manageScr);

  for (i = 0; i < tempArray.length; i++) {
    var cont = makeYellowBox(tempArray[i].str, 360, 30, '#f2ea1d', false);
    cont.index = i;
    cont.name = tempArray[i].name;
    gameCont.addChild(cont);

    setupElec(tempArray[i].name, i);
    cont.x = 280;
    cont.y = 510 + i * 42;
  }
  gameCont.addChild(elecCont);
}
function pickAirTask() {
  var pM = Math.floor(Math.random() * 4) + 1;
  totalQ = pM;
  var i = 0;
  var gg = Math.floor(Math.random() * 2);
  tempArray = new Array();
  var sArray = new Array();
  while (i < pM) {
    var qObj = new Object();
    if (gg == 1) {
      var gI = Math.floor(Math.random() * airTask.length);
      var tStr = String(airTask[gI]);
      qObj.state = 'on';
    } else {
      gI = Math.floor(Math.random() * airTaskoff.length);
      tStr = String(airTaskoff[gI]);
      qObj.state = 'off';
    }

    qObj.str = tStr;
    qObj.index = i;

    if (sArray.indexOf(tStr) == -1) {
      sArray.push(tStr);
      tStr = tStr.replace(/\s/g, '');
      tStr = tStr.toLowerCase();
      qObj.name = tStr;
      tempArray.push(qObj);
      i++;
    }
  }
  airCont = new createjs.Container();
  manageScr = addBmp('Ascreen', 0, 0, false);
  // manageScr.scaleX = .53;
  // manageScr.scaleY = .53;
  airCont.x = 724;
  airCont.y = 440 + 250 * 0.05;
  //manageScr.alpha = 0.2;
  airCont.addChild(manageScr);

  for (i = 0; i < tempArray.length; i++) {
    var cont = makeYellowBox(tempArray[i].str, 360, 30, '#f2ea1d', false);
    cont.index = i;
    cont.name = tempArray[i].name;
    gameCont.addChild(cont);
    setupAir(tempArray[i].name, i);
    cont.x = 280;
    cont.y = 510 + i * 42;
  }
  gameCont.addChild(airCont);
}
function pickHydTask() {
  var pM = Math.floor(Math.random() * 4) + 1;
  totalQ = pM;
  var gg = Math.floor(Math.random() * 2);
  var i = 0;
  tempArray = new Array();
  var sArray = new Array();
  while (i < pM) {
    var qObj = new Object();
    if (gg == 1) {
      var gI = Math.floor(Math.random() * hydTask.length);
      var tStr = String(hydTask[gI]);
      qObj.state = 'on';
    } else {
      gI = Math.floor(Math.random() * hydTaskoff.length);
      tStr = String(hydTaskoff[gI]);
      qObj.state = 'off';
    }

    qObj.str = tStr;
    qObj.index = i;

    if (sArray.indexOf(tStr) == -1) {
      sArray.push(tStr);
      tStr = tStr.replace(/\s/g, '');
      tStr = tStr.toLowerCase();
      qObj.name = tStr;
      tempArray.push(qObj);
      i++;
    }
  }
  hydCont = new createjs.Container();
  manageScr = addBmp('Hscreen', 0, 0, false);
  // manageScr.scaleX = .53;
  // manageScr.scaleY = .53;
  hydCont.x = 724;
  hydCont.y = 440 + 250 * 0.05;
  //manageScr.alpha = 0.2;
  hydCont.addChild(manageScr);
  gameCont.addChild(hydCont);

  for (i = 0; i < tempArray.length; i++) {
    var cont = makeYellowBox(tempArray[i].str, 360, 30, '#f2ea1d', false);
    cont.index = i;
    cont.name = tempArray[i].name;
    gameCont.addChild(cont);
    setupHyd(tempArray[i].name, i);
    cont.x = 280;
    cont.y = 510 + i * 42;
  }
}
function completeTask(e) {
  e.target.removeEventListener('click', completeTask);
  var tname = String(e.target.name);

  var type = String(e.target.type);
  var ind = parseInt(e.target.index);

  var tx = e.target.x;
  var ty = e.target.y;
  gameCont.removeChild(gameCont.getChildByName(tname));
  if (findex == -1) {
    if (ind != 0) {
      errors++;
      checklistError++;
    } else {
      score++;
      checklistScore++;
    }
    findex = 0;
  } else if (findex == 0) {
    if (ind != 1) {
      errors++;
      checklistError++;
    } else {
      score++;
      checklistScore++;
    }
    findex = 1;
  } else if (findex == 1) {
    if (ind != 2) {
      errors++;
      checklistError++;
    } else {
      score++;
      checklistScore++;
    }
    findex = 2;
  } else if (findex == 2) {
    if (ind != 3) {
      errors++;
      checklistError++;
    } else {
      score++;
      checklistScore++;
    }
    findex = 3;
  }
  // document.getElementById('tside').innerHTML = String("Errors: " + errors);
  totalQ--;

  switch (type) {
    case 'fuel':
      fuelCont.removeChild(fuelCont.getChildByName(tname));
      var sname = String(tname + '0');
      fuelCont.removeChild(fuelCont.getChildByName(sname));

      break;

    case 'air':
      airCont.removeChild(airCont.getChildByName(tname));
      sname = String(tname + '0');
      airCont.removeChild(airCont.getChildByName(sname));

      break;
    case 'elec':
      elecCont.removeChild(elecCont.getChildByName(tname));
      sname = String(tname + '0');
      elecCont.removeChild(elecCont.getChildByName(sname));

      break;
    case 'hyd':
      hydCont.removeChild(hydCont.getChildByName(tname));
      sname = String(tname + '0');
      hydCont.removeChild(hydCont.getChildByName(sname));

      break;
  }

  if (totalQ <= 0) {
    hydOn.name = 'pre_hyd';
    airOn.name = 'pre_air';
    fuelOn.name = 'pre_fuel';
    elecOn.name = 'pre_elec';
    hydOn.image = loader.getResult('Bgrey');
    airOn.image = loader.getResult('Bgrey');
    fuelOn.image = loader.getResult('Bgrey');
    elecOn.image = loader.getResult('Bgrey');
    if (hydCont != null) {
      gameCont.removeChild(hydCont);
    }
    if (airCont != null) {
      gameCont.removeChild(airCont);
    }
    if (elecCont != null) {
      gameCont.removeChild(elecCont);
    }
    if (fuelCont != null) {
      gameCont.removeChild(fuelCont);
    }
    checklistText.text = '';
    clCont.visible = false;
  }
}
function setupFuel(tname, i) {
  //tname = "turnrhrearfuelpumpon";
  switch (tname) {
    case 'turnlhfrontfuelpumpon':
      var f1 = makeBlackBox('', 61, 72, '#000', true);
      var s1 = makeYellowRect('', 61, 72, '#f2ea1d', true);
      f1.name = tname;
      s1.name = String(tname + '0');
      f1.mouseChildren = false;
      fuelCont.addChild(f1);
      fuelCont.addChild(s1);
      f1.x = 19;
      f1.y = 19;
      s1.x = 19;
      s1.y = 19;
      f1.addEventListener('click', completeTask);

      break;
    case 'turnlhfrontfuelpumpoff':
      f1 = makeBlackBox('', 61, 72, '#000', true);
      s1 = makeYellowRect('', 61, 72, '#f2ea1d', true);
      f1.name = tname;
      s1.name = String(tname + '0');
      f1.mouseChildren = false;
      fuelCont.addChild(f1);
      fuelCont.addChild(s1);
      f1.x = 19;
      f1.y = 19;
      s1.x = 19;
      s1.y = 19;
      f1.addEventListener('click', completeTask);

      break;
    case 'turnrhfrontfuelpumpon':
      f1 = makeBlackBox('', 61, 72, '#000', true);
      s1 = makeYellowRect('', 61, 72, '#f2ea1d', true);
      f1.name = tname;
      s1.name = String(tname + '0');
      f1.mouseChildren = false;
      fuelCont.addChild(f1);
      fuelCont.addChild(s1);
      f1.x = 352;
      f1.y = 19;
      s1.x = 352;
      s1.y = 19;
      f1.addEventListener('click', completeTask);

      break;
    case 'turnrhfrontfuelpumpoff':
      f1 = makeBlackBox('', 61, 72, '#000', true);
      s1 = makeYellowRect('', 61, 72, '#f2ea1d', true);
      f1.name = tname;
      s1.name = String(tname + '0');
      f1.mouseChildren = false;
      fuelCont.addChild(f1);
      fuelCont.addChild(s1);
      f1.x = 352;
      f1.y = 19;
      s1.x = 352;
      s1.y = 19;
      f1.addEventListener('click', completeTask);

      break;
    case 'turnlhrearfuelpumpon':
      f1 = makeBlackBox('', 61, 72, '#000', true);
      s1 = makeYellowRect('', 61, 72, '#f2ea1d', true);
      f1.name = tname;
      s1.name = String(tname + '0');
      f1.mouseChildren = false;
      fuelCont.addChild(f1);
      fuelCont.addChild(s1);
      f1.x = 19;
      f1.y = 113;
      s1.x = 19;
      s1.y = 113;
      f1.addEventListener('click', completeTask);

      break;
    case 'turnlhrearfuelpumpoff':
      f1 = makeBlackBox('', 61, 72, '#000', true);
      s1 = makeYellowRect('', 61, 72, '#f2ea1d', true);
      f1.name = tname;
      s1.name = String(tname + '0');
      f1.mouseChildren = false;
      fuelCont.addChild(f1);
      fuelCont.addChild(s1);
      f1.x = 19;
      f1.y = 113;
      s1.x = 19;
      s1.y = 113;
      f1.addEventListener('click', completeTask);

      break;
    case 'turncrossfeedvalveon':
      f1 = makeBlackBox('', 61, 72, '#000', true);
      s1 = makeYellowRect('', 61, 72, '#f2ea1d', true);
      f1.name = tname;
      s1.name = String(tname + '0');
      f1.mouseChildren = false;
      fuelCont.addChild(f1);
      fuelCont.addChild(s1);
      f1.x = 186;
      f1.y = 113;
      s1.x = 186;
      s1.y = 113;
      f1.addEventListener('click', completeTask);

      break;
    case 'turncrossfeedvalveoff':
      f1 = makeBlackBox('', 61, 72, '#000', true);
      s1 = makeYellowRect('', 61, 72, '#f2ea1d', true);
      f1.name = tname;
      s1.name = String(tname + '0');
      f1.mouseChildren = false;
      fuelCont.addChild(f1);
      fuelCont.addChild(s1);
      f1.x = 186;
      f1.y = 113;
      s1.x = 186;
      s1.y = 113;
      f1.addEventListener('click', completeTask);

      break;
    case 'turnrhrearfuelpumpon':
      f1 = makeBlackBox('', 61, 72, '#000', true);
      s1 = makeYellowRect('', 61, 72, '#f2ea1d', true);
      f1.name = tname;
      s1.name = String(tname + '0');
      f1.mouseChildren = false;
      fuelCont.addChild(f1);
      fuelCont.addChild(s1);
      f1.x = 352;
      f1.y = 113;
      s1.x = 352;
      s1.y = 113;
      f1.addEventListener('click', completeTask);

      break;
    case 'turnrhrearfuelpumpoff':
      f1 = makeBlackBox('', 61, 72, '#000', true);
      s1 = makeYellowRect('', 61, 72, '#f2ea1d', true);
      f1.name = tname;
      s1.name = String(tname + '0');
      f1.mouseChildren = false;
      fuelCont.addChild(f1);
      fuelCont.addChild(s1);
      f1.x = 352;
      f1.y = 113;
      s1.x = 352;
      s1.y = 113;
      f1.addEventListener('click', completeTask);

      break;
  }
  f1.alpha = 0.1;
  f1.type = 'fuel';
  f1.index = i;
  f1.cursor = 'pointer';
}

function setupElec(tname, i) {
  //tname = "openactiebus";
  switch (tname) {
    case 'openactiebus':
      var f1 = makeBlackBox('', 61, 74, '#000', true);
      s1 = makeYellowRect('', 61, 74, '#f2ea1d', true);
      f1.name = tname;
      s1.name = String(tname + '0');
      f1.mouseChildren = false;
      elecCont.addChild(f1);
      elecCont.addChild(s1);
      f1.x = 185;
      f1.y = 55;
      s1.x = 185;
      s1.y = 55;
      f1.addEventListener('click', completeTask);

      break;
    case 'closeactiebus':
      f1 = makeBlackBox('', 61, 74, '#000', true);
      s1 = makeYellowRect('', 61, 74, '#f2ea1d', true);
      f1.name = tname;
      s1.name = String(tname + '0');
      f1.mouseChildren = false;
      elecCont.addChild(f1);
      elecCont.addChild(s1);
      f1.x = 185;
      f1.y = 55;
      s1.x = 185;
      s1.y = 55;
      f1.addEventListener('click', completeTask);

      break;
    case 'turnlhgenon':
      f1 = makeBlackBox('', 61, 74, '#000', true);
      s1 = makeYellowRect('', 61, 74, '#f2ea1d', true);
      f1.name = tname;
      s1.name = String(tname + '0');
      f1.mouseChildren = false;
      elecCont.addChild(f1);
      elecCont.addChild(s1);
      f1.x = 19;
      f1.y = 19;
      s1.x = 19;
      s1.y = 19;
      f1.addEventListener('click', completeTask);

      break;
    case 'turnlhgenoff':
      f1 = makeBlackBox('', 61, 74, '#000', true);
      s1 = makeYellowRect('', 61, 74, '#f2ea1d', true);
      f1.name = tname;
      s1.name = String(tname + '0');
      f1.mouseChildren = false;
      elecCont.addChild(f1);
      elecCont.addChild(s1);
      f1.x = 19;
      f1.y = 19;
      s1.x = 19;
      s1.y = 19;
      f1.addEventListener('click', completeTask);

      break;
    case 'turnrhgenon':
      f1 = makeBlackBox('', 61, 74, '#000', true);
      s1 = makeYellowRect('', 61, 74, '#f2ea1d', true);
      f1.name = tname;
      s1.name = String(tname + '0');
      f1.mouseChildren = false;
      elecCont.addChild(f1);
      elecCont.addChild(s1);
      f1.x = 351;
      f1.y = 19;
      s1.x = 351;
      s1.y = 19;
      f1.addEventListener('click', completeTask);

      break;
    case 'turnrhgenoff':
      f1 = makeBlackBox('', 61, 74, '#000', true);
      s1 = makeYellowRect('', 61, 74, '#f2ea1d', true);
      f1.name = tname;
      s1.name = String(tname + '0');
      f1.mouseChildren = false;
      elecCont.addChild(f1);
      elecCont.addChild(s1);
      f1.x = 351;
      f1.y = 19;
      s1.x = 351;
      s1.y = 19;
      f1.addEventListener('click', completeTask);

      break;
    case 'turnlhbaton':
      f1 = makeBlackBox('', 61, 74, '#000', true);
      s1 = makeYellowRect('', 61, 74, '#f2ea1d', true);
      f1.name = tname;
      s1.name = String(tname + '0');
      f1.mouseChildren = false;
      elecCont.addChild(f1);
      elecCont.addChild(s1);
      f1.x = 19;
      f1.y = 113;
      s1.x = 19;
      s1.y = 113;
      f1.addEventListener('click', completeTask);

      break;
    case 'turnlhbatoff':
      f1 = makeBlackBox('', 61, 74, '#000', true);
      s1 = makeYellowRect('', 61, 74, '#f2ea1d', true);
      f1.name = tname;
      s1.name = String(tname + '0');
      f1.mouseChildren = false;
      elecCont.addChild(f1);
      elecCont.addChild(s1);
      f1.x = 19;
      f1.y = 113;
      s1.x = 19;
      s1.y = 113;
      f1.addEventListener('click', completeTask);

      break;
    case 'turnrhbaton':
      f1 = makeBlackBox('', 61, 74, '#000', true);
      s1 = makeYellowRect('', 61, 74, '#f2ea1d', true);
      f1.name = tname;
      s1.name = String(tname + '0');
      f1.mouseChildren = false;
      elecCont.addChild(f1);
      elecCont.addChild(s1);
      f1.x = 351;
      f1.y = 113;
      s1.x = 351;
      s1.y = 113;
      f1.addEventListener('click', completeTask);

      break;
    case 'turnrhbatoff':
      f1 = makeBlackBox('', 61, 74, '#000', true);
      s1 = makeYellowRect('', 61, 74, '#f2ea1d', true);
      f1.name = tname;
      s1.name = String(tname + '0');
      f1.mouseChildren = false;
      elecCont.addChild(f1);
      elecCont.addChild(s1);
      f1.x = 351;
      f1.y = 113;
      s1.x = 351;
      s1.y = 113;
      f1.addEventListener('click', completeTask);

      break;
  }
  f1.alpha = 0.1;
  f1.type = 'elec';
  f1.index = i;
  f1.cursor = 'pointer';
}

function setupAir(tname, i) {
  //tname = "openisolationvalve";
  switch (tname) {
    case 'turnlhhighbleedairon':
      var f1 = makeBlackBox('', 60, 74, '#000', true);
      var s1 = makeYellowRect('', 60, 74, '#f2ea1d', true);
      f1.name = tname;
      s1.name = String(tname + '0');
      f1.mouseChildren = false;
      airCont.addChild(f1);
      airCont.addChild(s1);
      f1.x = 100;
      f1.y = 114;
      s1.x = 100;
      s1.y = 114;
      f1.addEventListener('click', completeTask);

      break;
    case 'turnlhhighbleedairoff':
      f1 = makeBlackBox('', 60, 74, '#000', true);
      s1 = makeYellowRect('', 60, 74, '#f2ea1d', true);
      s1.name = String(tname + '0');
      f1.name = tname;
      f1.mouseChildren = false;
      airCont.addChild(f1);
      airCont.addChild(s1);
      f1.x = 100;
      f1.y = 114;
      s1.x = 100;
      s1.y = 114;
      f1.addEventListener('click', completeTask);

      break;
    case 'turnrhhighbleedairon':
      f1 = makeBlackBox('', 60, 74, '#000', true);
      s1 = makeYellowRect('', 60, 74, '#f2ea1d', true);
      s1.name = String(tname + '0');
      f1.name = tname;
      f1.mouseChildren = false;
      airCont.addChild(f1);
      airCont.addChild(s1);
      f1.x = 353;
      f1.y = 114;
      s1.x = 353;
      s1.y = 114;
      f1.addEventListener('click', completeTask);

      break;
    case 'turnrhhighbleedairoff':
      f1 = makeBlackBox('', 60, 74, '#000', true);
      s1 = makeYellowRect('', 60, 74, '#f2ea1d', true);
      f1.name = tname;
      s1.name = String(tname + '0');
      f1.mouseChildren = false;
      airCont.addChild(f1);
      airCont.addChild(s1);
      f1.x = 353;
      f1.y = 114;
      s1.x = 353;
      s1.y = 114;
      f1.addEventListener('click', completeTask);

      break;
    case 'turnlhlowbleedairon':
      f1 = makeBlackBox('', 60, 74, '#000', true);
      s1 = makeYellowRect('', 60, 74, '#f2ea1d', true);
      f1.name = tname;
      s1.name = String(tname + '0');
      f1.mouseChildren = false;
      airCont.addChild(f1);
      airCont.addChild(s1);
      f1.x = 18;
      f1.y = 114;
      s1.x = 18;
      s1.y = 114;
      f1.addEventListener('click', completeTask);

      break;
    case 'turnlhlowbleedairoff':
      f1 = makeBlackBox('', 60, 74, '#000', true);
      s1 = makeYellowRect('', 60, 74, '#f2ea1d', true);
      f1.name = tname;
      s1.name = String(tname + '0');
      f1.mouseChildren = false;
      airCont.addChild(f1);
      airCont.addChild(s1);
      f1.x = 18;
      f1.y = 114;
      s1.x = 18;
      s1.y = 114;
      f1.addEventListener('click', completeTask);

      break;
    case 'turnrhlowbleedairon':
      f1 = makeBlackBox('', 60, 74, '#000', true);
      s1 = makeYellowRect('', 60, 74, '#f2ea1d', true);
      f1.name = tname;
      s1.name = String(tname + '0');
      f1.mouseChildren = false;
      airCont.addChild(f1);
      airCont.addChild(s1);
      f1.x = 271;
      f1.y = 114;
      s1.x = 271;
      s1.y = 114;
      f1.addEventListener('click', completeTask);

      break;
    case 'turnrhlowbleedairoff':
      f1 = makeBlackBox('', 60, 74, '#000', true);
      s1 = makeYellowRect('', 60, 74, '#f2ea1d', true);
      s1.name = String(tname + '0');
      f1.name = tname;
      f1.mouseChildren = false;
      airCont.addChild(f1);
      airCont.addChild(s1);
      f1.x = 271;
      f1.y = 114;
      s1.x = 271;
      s1.y = 114;
      f1.addEventListener('click', completeTask);

      break;
    case 'openisolationvalve':
      f1 = makeBlackBox('', 60, 74, '#000', true);
      s1 = makeYellowRect('', 60, 74, '#f2ea1d', true);
      f1.name = tname;
      s1.name = String(tname + '0');
      f1.mouseChildren = false;
      airCont.addChild(f1);
      airCont.addChild(s1);
      f1.x = 186;
      f1.y = 56;
      s1.x = 186;
      s1.y = 56;
      f1.addEventListener('click', completeTask);

      break;
    case 'closeisolationvalve':
      f1 = makeBlackBox('', 60, 74, '#000', true);
      s1 = makeYellowRect('', 60, 74, '#f2ea1d', true);
      s1.name = String(tname + '0');
      f1.name = tname;
      f1.mouseChildren = false;
      airCont.addChild(f1);
      airCont.addChild(s1);
      f1.x = 186;
      f1.y = 56;
      s1.x = 186;
      s1.y = 56;
      f1.addEventListener('click', completeTask);

      break;
  }
  f1.alpha = 0.1;
  f1.type = 'air';
  f1.index = i;
  f1.cursor = 'pointer';
}
function setupHyd(tname, i) {
  //tname = "turnauxpumpon";
  switch (tname) {
    case 'turnlhelecpumpon':
      var f1 = makeBlackBox('', 61, 74, '#000', true);
      var s1 = makeYellowRect('', 61, 74, '#f2ea1d', true);
      f1.name = tname;
      s1.name = String(tname + '0');
      f1.mouseChildren = false;
      hydCont.addChild(f1);
      hydCont.addChild(s1);
      f1.x = 95;
      f1.y = 113;
      s1.x = 95;
      s1.y = 113;
      f1.addEventListener('click', completeTask);

      break;
    case 'turnlhelecpumpoff':
      f1 = makeBlackBox('', 61, 74, '#000', true);
      s1 = makeYellowRect('', 61, 74, '#f2ea1d', true);
      s1.name = String(tname + '0');
      f1.name = tname;
      f1.mouseChildren = false;
      hydCont.addChild(f1);
      hydCont.addChild(s1);
      f1.x = 95;
      f1.y = 113;
      s1.x = 95;
      s1.y = 113;
      f1.addEventListener('click', completeTask);

      break;
    case 'turnrhelecpumpon':
      f1 = makeBlackBox('', 61, 74, '#000', true);
      s1 = makeYellowRect('', 61, 74, '#f2ea1d', true);
      s1.name = String(tname + '0');
      f1.name = tname;
      f1.mouseChildren = false;
      hydCont.addChild(f1);
      hydCont.addChild(s1);
      f1.x = 194;
      f1.y = 113;
      s1.x = 194;
      s1.y = 113;
      f1.addEventListener('click', completeTask);

      break;
    case 'turnrhelecpumpoff':
      f1 = makeBlackBox('', 61, 74, '#000', true);
      s1 = makeYellowRect('', 61, 74, '#f2ea1d', true);
      s1.name = String(tname + '0');
      f1.name = tname;
      f1.mouseChildren = false;
      hydCont.addChild(f1);
      hydCont.addChild(s1);
      f1.x = 194;
      f1.y = 113;
      s1.x = 194;
      s1.y = 113;
      f1.addEventListener('click', completeTask);

      break;
    case 'turnlhengpumpon':
      f1 = makeBlackBox('', 61, 74, '#000', true);
      s1 = makeYellowRect('', 61, 74, '#f2ea1d', true);
      s1.name = String(tname + '0');
      f1.name = tname;
      f1.mouseChildren = false;
      hydCont.addChild(f1);
      hydCont.addChild(s1);
      f1.x = 17;
      f1.y = 17;
      s1.x = 17;
      s1.y = 17;
      f1.addEventListener('click', completeTask);

      break;
    case 'turnlhengpumpoff':
      f1 = makeBlackBox('', 61, 74, '#000', true);
      s1 = makeYellowRect('', 61, 74, '#f2ea1d', true);
      s1.name = String(tname + '0');
      f1.name = tname;
      f1.mouseChildren = false;
      hydCont.addChild(f1);
      hydCont.addChild(s1);
      f1.x = 17;
      f1.y = 17;
      s1.x = 17;
      s1.y = 17;
      f1.addEventListener('click', completeTask);

      break;
    case 'turnrhengpumpon':
      f1 = makeBlackBox('', 61, 74, '#000', true);
      s1 = makeYellowRect('', 61, 74, '#f2ea1d', true);
      s1.name = String(tname + '0');
      f1.name = tname;
      f1.mouseChildren = false;
      hydCont.addChild(f1);
      hydCont.addChild(s1);
      f1.x = 269;
      f1.y = 17;
      s1.x = 269;
      s1.y = 17;
      f1.addEventListener('click', completeTask);

      break;
    case 'turnrhengpumpoff':
      f1 = makeBlackBox('', 61, 74, '#000', true);
      s1 = makeYellowRect('', 61, 74, '#f2ea1d', true);
      s1.name = String(tname + '0');
      f1.name = tname;
      f1.mouseChildren = false;
      hydCont.addChild(f1);
      hydCont.addChild(s1);
      f1.x = 269;
      f1.y = 17;
      s1.x = 269;
      s1.y = 17;
      f1.addEventListener('click', completeTask);

      break;
    case 'turnauxpumpon':
      f1 = makeBlackBox('', 61, 74, '#000', true);
      s1 = makeYellowRect('', 61, 74, '#f2ea1d', true);
      s1.name = String(tname + '0');
      f1.name = tname;
      f1.mouseChildren = false;
      hydCont.addChild(f1);
      hydCont.addChild(s1);
      f1.x = 350;
      f1.y = 17;
      s1.x = 350;
      s1.y = 17;
      f1.addEventListener('click', completeTask);

      break;
    case 'turnauxpumpoff':
      f1 = makeBlackBox('', 61, 74, '#000', true);
      s1 = makeYellowRect('', 61, 74, '#f2ea1d', true);
      s1.name = String(tname + '0');
      f1.name = tname;
      f1.mouseChildren = false;
      hydCont.addChild(f1);
      hydCont.addChild(s1);
      f1.x = 350;
      f1.y = 17;
      s1.x = 350;
      s1.y = 17;
      f1.addEventListener('click', completeTask);

      break;
  }
  f1.alpha = 0.1;
  f1.type = 'hyd';
  f1.index = i;
  f1.cursor = 'pointer';
}
function makeYellowBox(yt, wd, h, color, isC) {
  var tCont = new createjs.Container();

  var ctd = new createjs.Text(yt, '16px Open Sans', color);
  ctd.x = 20;
  ctd.y = isSafari ? 4 : 7;
  if (isC) {
    ctd.textAlign = 'center';
    ctd.x = 50;
    ctd.y = 5;
    ctd.font = '10px Open Sans';
  }
  var shape = boxMakerYellowBorder(wd, h, color);
  shape.name = 'yellow';
  tCont.addChild(shape);
  tCont.addChild(ctd);
  return tCont;
}
function boxMakerYellowBorder(wdt, h, color) {
  var shape = new createjs.Shape();
  shape.graphics.beginStroke(color).beginFill('#000').drawRect(0, 0, wdt, h);
  return shape;
}
function makeYellowRect(yt, wd, h, color, isC) {
  var tCont = new createjs.Container();

  var ctd = new createjs.Text(yt, '16px Open Sans', '#000');
  ctd.x = 10;
  ctd.y = 10;
  if (isC) {
    ctd.textAlign = 'center';
    ctd.x = 50;
    ctd.y = 5;
    ctd.font = '14px Open Sans';
  }
  var shape = rectMaker(wd, h, color);
  shape.name = 'yellow';
  tCont.addChild(shape);
  tCont.addChild(ctd);
  return tCont;
}
function makeBlackBox(yt, wd, h, color, isC) {
  var tCont = new createjs.Container();

  var ctd = new createjs.Text(yt, '16px Open Sans', '#000');
  ctd.x = 10;
  ctd.y = 10;
  if (isC) {
    ctd.textAlign = 'center';
    ctd.x = 50;
    ctd.y = 5;
    ctd.font = '14px Open Sans';
  }
  var shape = boxMaker(wd, h, color);
  shape.name = 'black';
  tCont.addChild(shape);
  tCont.addChild(ctd);
  return tCont;
}
function boxMaker(wdt, h, color) {
  var shape = new createjs.Shape();
  shape.graphics.beginFill(color).drawRect(0, 0, wdt, h);
  return shape;
}
function rectMaker(wdt, h, color) {
  var border = new createjs.Shape();
  border.graphics.beginStroke(color);
  border.graphics.setStrokeStyle(2);
  //border.snapToPixel = true;
  border.graphics.drawRect(0, 0, wdt, h);
  return border;
}
function makeYellowCircle(color) {
  var tCont = new createjs.Container();

  var shape = cirCle2(color);

  tCont.addChild(shape);

  return tCont;
}
function makeBlackCircle(color) {
  var tCont = new createjs.Container();

  var shape = circleMaker(color);

  tCont.addChild(shape);

  return tCont;
}
function circleMaker(color) {
  var shape = new createjs.Shape();
  shape.graphics.beginFill(color).drawCircle(0, 0, 25);

  return shape;
}
function cirCle2(color) {
  var shape = new createjs.Shape();

  shape.graphics.setStrokeStyle(2);
  shape.graphics.beginStroke(color);
  shape.graphics.drawCircle(0, 0, 28);
  return shape;
}
function arithMatic() {
  correctAns.visible = false;
  inCorrectAns.visible = false;
  arithAns = 0;
  var r = Math.floor(Math.random() * 5);
  var fdigit = 0;
  var sdigit = 0;
  if (r == 0) {
    fdigit = Math.floor(Math.random() * 1000) + 1;
    sdigit = Math.floor(Math.random() * 1000) + 1;
    arithAns = fdigit + sdigit;
    quesT.text = String(fdigit + ' + ' + sdigit + ' = ');
    var ran = Math.round(Math.random() * 1000) + 1;
  }
  if (r == 1) {
    fdigit = Math.floor(Math.random() * 1000) + 1;
    sdigit = Math.floor(Math.random() * 1000) + 1;
    arithAns = fdigit - sdigit;
    quesT.text = String(fdigit + ' - ' + sdigit + ' = ');

    ran = Math.round(Math.random() * 500) + 1;
  }
  if (r == 2) {
    fdigit = Math.floor(Math.random() * 900) + 100;
    sdigit = Math.floor(Math.random() * 10) + 1;
    arithAns = Math.round(fdigit * sdigit);
    quesT.text = String(fdigit + ' x ' + sdigit + ' = ');
    ran = Math.round(Math.random() * 2000) + 100;
  }
  if (r == 3) {
    fdigit = Math.floor(Math.random() * 500) + 100;
    sdigit = Math.floor(Math.random() * 100) + 1;
    arithAns = Math.round(fdigit / sdigit);
    quesT.text = String(fdigit + ' ÷ ' + sdigit + ' = ');
    ran = Math.round(Math.random() * 200) + 10;
  }
  if (r == 4) {
    fdigit = Math.floor(Math.random() * 90) + 9;
    sdigit = Math.floor(Math.random() * 900) + 102;
    arithAns = Math.round((sdigit / 100) * fdigit);
    quesT.text = String(fdigit + '% of ' + sdigit + ' = ');
    ran = Math.round(Math.random() * 500) + 10;
  }

  var r = Math.floor(Math.random() * 2);
  if (r == 1) {
    ansT.text = String(arithAns);
  } else {
    ansT.text = String(ran);
  }
  generateAnimatedLine(735, 358, 10, 34, gameCont, targetM * 1000);
}
function headingAltSpeed() {
  var r = Math.floor(Math.random() * 3);

  speedStatus = false;
  altStatus = false;
  headingStatus = false;

  if (r == 0) {
    var isD = false;
    while (!isD) {
      tspeed = Math.floor(Math.random() * 100) + 210;
      if (tspeed % 5 == 0) {
        tspT.text = String(tspeed);
        isD = true;
      }
    }
    jType = 'speed';
    speedStatus = false;
    generateAnimatedLine(580, 375, 6, 18, gameCont, targetS * 1000);
  }
  if (r == 1) {
    talt = Math.floor(Math.random() * 16) + 1;
    var fstr = String(talt + '00');
    var intr = parseInt(fstr);
    intr += 4200;
    talt = intr;
    taltT.text = String(talt);
    jType = 'alt';
    altStatus = false;
    generateAnimatedLine(460, 375, 6, 18, gameCont, targetS * 1000);
  }

  if (r == 2) {
    isD = false;
    while (!isD) {
      theading = Math.floor(Math.random() * 240) + 60;
      if (theading % 5 == 0) {
        theadT.text = String(theading);
        isD = true;
      }
    }
    jType = 'head';
    headingStatus = false;
    generateAnimatedLine(340, 375, 6, 18, gameCont, targetS * 1000);
  }
}
function proximityCheck(at, tar, r) {
  for (var i = 0; i < r; i++) {
    if (
      parseInt(at + i) == parseInt(tar) ||
      parseInt(at - i) == parseInt(tar)
    ) {
      return true;
    }
  }
  return false;
}

function answerRect(wdt, h, color) {
  var border = new createjs.Shape();
  border.graphics.beginStroke(color);
  border.graphics.setStrokeStyle(2);
  border.graphics.drawRoundRect(0, 0, wdt, h, 3);
  return border;
}

function clickQuestionBox(e) {
  spacek = true;
  var ans = String(ansT.text);
  if (!isDone) {
    isDone = true;
    if (ans != arithAns) {
      errors++;
      mathError++;
      correctAns.visible = false;
      inCorrectAns.visible = true;
    } else {
      score++;
      mathScore++;
      correctAns.visible = true;
      inCorrectAns.visible = false;
    }
  }
}

function generateAnimatedLine(x, y, w, h, prop, duration) {
  //create animated line

  var animatedCont = new createjs.Container();
  var backLine = new createjs.Shape();
  backLine.graphics.setStrokeStyle(w).beginStroke('#5F562B');
  backLine.graphics.moveTo(0, h);
  backLine.graphics.lineTo(0, 0);
  backLine.graphics.endStroke();
  animatedCont.addChild(backLine);

  var line = new createjs.Shape();
  line.graphics.setStrokeStyle(w).beginStroke('#F4D242');
  line.graphics.moveTo(0, h);
  line.lineCmd = line.graphics.lineTo(0, 0).command;
  line.graphics.endStroke();
  animatedCont.addChild(line);

  animatedCont.x = x;
  animatedCont.y = y;
  prop.addChild(animatedCont);

  // createjs.Tween.get(line.lineCmd).to({y: h}, duration, createjs.Ease.quadInOut)
  createjs.Tween.get(line.lineCmd)
    .to({ y: h }, duration, createjs.Ease.quadInOut)
    .call(() => {
      setTimeout(() => {
        prop.removeChild(animatedCont);
      }, 1000);
    });
}

function generateAnimatedCircle(x, y, prop, duration, name) {
  var circleCont = new createjs.Container();
  circleCont.name = name;

  var s = new createjs.Shape();
  s.graphics
    .beginFill('#303030')
    .arc(0, 0, 15, 0, Math.PI * 2, false)
    .closePath();
  circleCont.addChild(s);

  var s2 = new createjs.Shape();
  s2.graphics
    .setStrokeStyle(3, 'round')
    .beginStroke('#446039')
    .arc(0, 0, 12, 0, Math.PI * 2, false);
  circleCont.addChild(s2);

  var s1 = new createjs.Shape();
  s1.graphics.setStrokeStyle(3, 'round').beginStroke('#76D350').moveTo(0, -12);
  s1.strokeCmd = s1.graphics.arc(
    0,
    0,
    12,
    -Math.PI / 2,
    (Math.PI * 3) / 2,
    true
  ).command;
  circleCont.addChild(s1);

  circleCont.x = x;
  circleCont.y = y;
  prop.addChild(circleCont);

  createjs.Tween.get(s1.strokeCmd)
    .to({ endAngle: Math.PI * 3.5 }, duration, createjs.Ease.quadInOut)
    .call(function () {
      circleCont.removeChild(s1);
      circleCont.removeChild(s2);

      var check = new createjs.Shape();

      check.graphics
        .setStrokeStyle(4, 'round')
        .beginStroke('#76D350')
        .moveTo(-8, 0);
      check.graphics.lineTo(-3, 6);
      check.graphics.lineTo(8, -4);
      circleCont.addChild(check);

      setTimeout(() => {
        prop.removeChild(circleCont);
      }, 3000);
    });
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
