// JavaScript Document
var canvas;
var stage;
var sec = 0,
  msec = 0;

var proT, perT, timeT;
var loader;
var currentS = 0;
var inS;
var qState;

var targetSec = 6;
var totalSec = 120;

var totalC = 0;
var errors = 0,
  score = 0;
var resultA;

var isGame = false;

var startCont, secondCont, gameCont;
var PlaneSp;
var pDir, pColor;

var questionsCount = 0;

function Main() {
  canvas = document.getElementById('test');
  stage = new createjs.Stage(canvas);
  optimizeForTouchAndScreens();
  stage.enableMouseOver(10);

  manifest = [
    { src: 'images/PAT_exam_logo.png', id: 'Tlogo' },
    { src: 'images/Plan_0.png', id: 'Plane0' },
    { src: 'images/Plan_1.png', id: 'Plane1' },
    { src: 'images/Plan_2.png', id: 'Plane2' },
    { src: 'images/Plan_3.png', id: 'Plane3' },
    { src: 'images/audio.png', id: 'Saudio' },
    { src: 'images/grey.png', id: 'Grey' },
    { src: 'images/orange.png', id: 'Orange' },
    { src: 'sounds/blue.ogg', id: 'SBlue' },
    { src: 'sounds/red.ogg', id: 'SRed' },
    { src: 'sounds/right.ogg', id: 'SRight' },
    { src: 'sounds/left.ogg', id: 'SLeft' },
  ];
  loader = new createjs.LoadQueue(false);
  loader.installPlugin(createjs.Sound);
  createjs.Sound.alternateExtensions = ['mp3'];
  //createjs.Sound.registerPlugins([createjs.HTMLAudioPlugin]);
  //createjs.Sound.registerPlugins([createjs.WebAudioPlugin, createjs.HTMLAudioPlugin]);
  loader.addEventListener('progress', handleProgress);
  loader.addEventListener('complete', handleComplete);
  loader.loadManifest(manifest, true);
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
  qState = 'no';
  isGame = false;
  showStartScreen();
  //showSecondScreen();
  //createInterface();
  stage.update();
  addPlaneSprite();
  startMain();
}
function showStartScreen() {
  showScreen('#logo-screen');
  document.getElementById('tside').innerHTML = String(
    'Aspects<span>Legacy</span>'
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

function createInterface() {
  showScreen('#test');

  gameCont = new createjs.Container();
  stage.addChild(gameCont);

  qState = 'no';
  pickQuestion();

  stage.update();
  isGame = true;
}
function pickQuestion() {
  inS = 0;
  targetSec = 8;
  resultA = new Object();
  var sD = Math.floor(Math.random() * 2);
  if (sD == 0) {
    pColor = String('Blue');
  } else {
    pColor = String('Red');
  }

  var cD = Math.floor(Math.random() * 2);
  if (cD == 0) {
    pDir = String('Right');
  } else {
    pDir = String('Left');
  }

  // var bmp = addBmp('Saudio', 490, 0, true);
  var bmp = new createjs.Bitmap(loader.getResult('Saudio'));
  bmp.x = stage.canvas.width / 2;
  bmp.y = stage.canvas.height / 2;
  // bmp.regX = 0;
  // bmp.regY = 0;
  bmp.regX = bmp.image.width / 2;
  bmp.regY = bmp.image.height / 2;
  gameCont.addChild(bmp);
  stage.update();
  questionsCount++;
  setTimeout(() => playeAudioMain(), 50);
}
function startMain() {
  createjs.Ticker.setFPS(60);
  createjs.Ticker.addEventListener('tick', updateGame);
}
function updateGame(e) {
  if (isGame) {
    msec++;
    if (msec >= 60) {
      msec = 0;
      sec++;
      var rsec = totalSec - sec;
      var tStr = String(
        Math.floor(rsec / 60) + ' minutes ' + (rsec % 60) + ' seconds'
      );
      document.getElementById('tsider').innerHTML = String(tStr);

      if (qState == 'yes') {
        targetSec--;
        timeT.text = String(targetSec + ' second(s) remaining!');
        if (targetSec <= 0) {
          qState = 'no';
          clearGameWindow();
          checkAnswer();
        }
      }
    }
    if (sec > totalSec) {
      isGame = false;
      sec = 0;
      qState = 'no';
      clearGameWindow();
      checkAnswer();
      gameOver();
    }
  }
  stage.update();
}

function playAgain(e) {
  e.target.removeEventListener('click', playAgain);
}

//color audi
function playeAudioMain() {
  if (inS == 0) {
    var aName = String('S' + pColor);
  } else {
    aName = String('S' + pDir);
  }

  var instance = createjs.Sound.play(aName);
  instance.on('complete', createjs.proxy(this.handleCompleteSoundC, this));
  instance.volume = 1;
}
function handleCompleteSoundC() {
  inS++;
  if (inS < 2) {
    setTimeout(() => playeAudioMain(), 50);
  } else {
    inS = 0;
    gameCont.removeAllChildren();
    showImages();
  }
}

function showImages() {
  var isDone = false;
  var allFrame = PlaneSp.animations;

  var selFrame = new Array();
  while (!isDone) {
    totalC = 0;
    var rD = Math.floor(Math.random() * allFrame.length);
    var rName = String(allFrame[rD]);
    if (selFrame.indexOf(rName) == -1) {
      selFrame.push(rName);
    }
    if (selFrame.length >= 4) {
      var tStr = String(pColor + pDir);
      for (var i = 0; i < selFrame.length; i++) {
        var sStr = String(selFrame[i]);
        sStr = sStr.slice(0, -1);

        if (sStr == tStr) {
          totalC++;
          isDone = true;
        }
      }
      if (!isDone) {
        selFrame = [];
      }
    }
  }
  if (isDone) {
    i = 0;
    for (var r = 0; r < 2; r++) {
      for (var c = 0; c < 2; c++) {
        var pFr = String(selFrame[i]);
        var cFr = String(pFr.slice(0, -1));

        var grayC = addBmp('Grey', 0, 0, true, 0.75);
        gameCont.addChild(grayC);
        grayC.x =
          stage.canvas.width / 2 +
          c * (grayC.image.width * 0.75) -
          (grayC.image.width / 2) * 0.75;
        grayC.y = 185 + r * (grayC.image.height * 0.75);
        grayC.name = String(cFr + String(r) + String(c));
        grayC.type = cFr;
        grayC.cursor = 'pointer';
        grayC.addEventListener('click', selectPlane);

        var OrangeC = addBmp('Orange', 0, 0, true, 0.75);
        gameCont.addChild(OrangeC);
        OrangeC.x =
          stage.canvas.width / 2 +
          c * (OrangeC.image.width * 0.75) -
          (OrangeC.image.width / 2) * 0.75;
        OrangeC.y = 185 + r * (OrangeC.image.height * 0.75);
        OrangeC.name = String(cFr + String(r) + String(c) + 'o');
        OrangeC.visible = false;
        OrangeC.addEventListener('click', deselectPlane);

        var planeC = new createjs.Sprite(PlaneSp, pFr);
        gameCont.addChild(planeC);
        //stage.addChild(planeC);
        // planeC.regX = planeC.getBounds().image.width/2;
        // planeC.regY = planeC.getBounds().image.height/2;
        planeC.scaleX = 0.75;
        planeC.scaleY = 0.75;
        // planeC.x = 175 + c*386*0.75;
        // planeC.y = r*(planeC.getBounds().height*0.75-90)+30;
        planeC.regX = planeC.getBounds().width / 2;
        planeC.regY = planeC.getBounds().height / 2;

        planeC.x =
          stage.canvas.width / 2 +
          c * (OrangeC.image.width * 0.75) -
          (OrangeC.image.width / 2) * 0.75;
        planeC.y = 185 + r * (OrangeC.image.height * 0.75);

        pFr = pFr.slice(0, -1);
        planeC.name = pFr;

        i++;
      }
    }
  }
  selFrame = [];

  qState = 'yes';
  //var bmp = addBmp("Sback",394,0,false);
  //gameCont.addChild(bmp);
  timeT = new createjs.Text('', '400 20px Open Sans', '#313131');
  timeT.y = 12;
  timeT.x = 400;

  gameCont.addChild(timeT);
}

function selectPlane(e) {
  var tbP = e.target;
  var tName = String(tbP.name);
  var tType = String(tbP.type);

  tName = String(tName + 'o');

  gameCont.getChildByName(tName).visible = true;
  var tStr = String(pColor + pDir);
  if (tType == tStr) {
    resultA[tName] = 1;
  } else {
    resultA[tName] = 0;
  }

  if (Object.keys(resultA).length >= 4) {
    qState = 'no';
    clearGameWindow();
    checkAnswer();
  }
}
function deselectPlane(e) {
  var tbP = e.target;
  tbP.visible = false;

  var tName = String(tbP.name);

  delete resultA[tName];

  if (Object.keys(resultA).length >= 4) {
    qState = 'no';
    clearGameWindow();
    checkAnswer();
  }
}
function checkAnswer() {
  if (Object.keys(resultA).length > 0) {
    if (Object.values(resultA).indexOf(0) == -1) {
      var total = 0;
      for (var i = 0; i < Object.values(resultA).length; i++) {
        total += Object.values(resultA)[i];
      }
      if (total == totalC) {
        score++;
      } else {
        errors++;
      }
    } else {
      errors++;
    }
  } else {
    errors++;
  }
  document.getElementById('tsiderx').innerHTML = String('Score: ' + score);
  pickQuestion();
}
//audio number

function gameOver() {
  msec = 0;
  sec = 0;
  createjs.Sound.stop();
  gameCont.removeAllChildren();
  showEndScreen();
}
function showEndScreen() {
  document.getElementById('tsider').innerHTML = String('End of Exam');
  document.getElementById('tsiderx').innerHTML = String('- / -');
  $('.result-detail').text(`(${score} correct answers out of ${questionsCount} questions)`);
  
  var _percent = (score / questionsCount) * 100;
  $('#results span').text(_percent.toFixed(1));
  showScreen('#results-screen');
  saveLoaded();
  errors = 0;
  score = 0;
  questionsCount = 0;
  stage.update();
  document
    .querySelector('#restart-button')
    .addEventListener('click', startAgain);
}
function startAgain() {
  showStartScreen();
}
function addPlaneSprite() {
  var data = {
    framerate: 24,
    images: [
      'images/Plan_0.png',
      'images/Plan_1.png',
      'images/Plan_2.png',
      'images/Plan_3.png',
    ],
    frames: [
      [0, 0, 386, 373, 0, 0, 0],
      [387, 0, 386, 373, 0, 0, 0],
      [773, 0, 386, 373, 0, 0, 0],
      [0, 374, 386, 373, 0, 0, 0],
      [387, 374, 386, 373, 0, 0, 0],
      [773, 374, 386, 373, 0, 0, 0],
      [0, 747, 386, 373, 0, 0, 0],
      [387, 747, 386, 373, 0, 0, 0],
      [773, 747, 386, 373, 0, 0, 0],
      [0, 0, 386, 373, 1, 0, 0],
      [387, 0, 386, 373, 1, 0, 0],
      [773, 0, 386, 373, 1, 0, 0],
      [0, 374, 386, 373, 1, 0, 0],
      [387, 374, 386, 373, 1, 0, 0],
      [773, 374, 386, 373, 1, 0, 0],
      [0, 747, 386, 373, 1, 0, 0],
      [387, 747, 386, 373, 1, 0, 0],
      [773, 747, 386, 373, 1, 0, 0],
      [0, 0, 386, 373, 2, 0, 0],
      [387, 0, 386, 373, 2, 0, 0],
      [773, 0, 386, 373, 2, 0, 0],
      [0, 374, 386, 373, 2, 0, 0],
      [387, 374, 386, 373, 2, 0, 0],
      [773, 374, 386, 373, 2, 0, 0],
      [0, 747, 386, 373, 2, 0, 0],
      [387, 747, 386, 373, 2, 0, 0],
      [773, 747, 386, 373, 2, 0, 0],
      [0, 0, 386, 373, 3, 0, 0],
      [387, 0, 386, 373, 3, 0, 0],
      [773, 0, 386, 373, 3, 0, 0],
    ],
    animations: {
      RedRight5: { speed: 1, frames: [26] },
      BlueLeft1: { speed: 1, frames: [0] },
      RedRight8: { speed: 1, frames: [29] },
      BlueLeft5: { speed: 1, frames: [4] },
      BlueRight3: { speed: 1, frames: [9] },
      BlueLeft4: { speed: 1, frames: [3] },
      BlueRight4: { speed: 1, frames: [10] },
      RedLeft1: { speed: 1, frames: [15] },
      BlueRight8: { speed: 1, frames: [14] },
      BlueLeft7: { speed: 1, frames: [6] },
      RedRight1: { speed: 1, frames: [22] },
      BlueRight7: { speed: 1, frames: [13] },
      RedLeft3: { speed: 1, frames: [17] },
      RedLeft2: { speed: 1, frames: [16] },
      BlueRight1: { speed: 1, frames: [7] },
      RedLeft6: { speed: 1, frames: [20] },
      BlueRight6: { speed: 1, frames: [12] },
      BlueLeft6: { speed: 1, frames: [5] },
      BlueRight2: { speed: 1, frames: [8] },
      RedLeft4: { speed: 1, frames: [18] },
      RedRight4: { speed: 1, frames: [25] },
      BlueRight5: { speed: 1, frames: [11] },
      BlueLeft3: { speed: 1, frames: [2] },
      RedRight7: { speed: 1, frames: [28] },
      RedRight2: { speed: 1, frames: [23] },
      RedLeft7: { speed: 1, frames: [21] },
      BlueLeft2: { speed: 1, frames: [1] },
      RedLeft5: { speed: 1, frames: [19] },
      RedRight3: { speed: 1, frames: [24] },
      RedRight6: { speed: 1, frames: [27] },
    },
  };
  PlaneSp = new createjs.SpriteSheet(data);
}
//save the score
function saveLoaded() {
  // Create our XMLHttpRequest object
  //   var hr = new XMLHttpRequest();

  //   var datastring = '';

  //   datastring += 'aspectErrors' + '=' + errors + '&';
  //   datastring += 'duration' + '=' + totalSec;

  var finalScore = Math.round((score / questionsCount) * 100);

  insertResults(finalScore, totalSec);
  //   hr.open('POST', 'saveASScore.php');
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

function addBmp(bname, tx, ty, isR, scale = 1) {
  var bmp = new createjs.Bitmap(loader.getResult(bname));
  if (isR) {
    bmp.regX = bmp.image.width / 2;
    bmp.regY = bmp.image.height / 2;
  }
  bmp.scaleX = scale;
  bmp.scaleY = scale;
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
  gameCont.removeAllChildren();
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
