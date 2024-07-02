// JavaScript Document
var canvas;
var stage;
var sec = 0;
var hSec = 0;
var crossSec = 0;
var proT, perT;
var loader;
var currentS = 0,
  inS = 0;
var screenm, screenf, diamondw, diamondr;
var qState;
var leftk,
  rightk,
  upk,
  downk,
  skey,
  wkey,
  akey,
  dkey = false;

var gamepad_leftk,
  gamepad_rightk,
  gamepad_upk,
  gamepad_downk,
  gamepad_skey,
  gamepad_wkey,
  gamepad_akey,
  gamepad_dkey = false;
var targetSec = 6;
var totalSec = 180;
var gameSec = 0;
var colorArray = new Array('Red', 'Green', 'Blue', 'Yellow');
var CY = 245,
  CX = 460,
  SMY = 236;
var pickedColor;
var isA = 'Y';
var cContainer;
var spacek = false;
var errors = 0,
  score = 0;
var randomQ = 0,
  randomM = 0;
var isResponse = false;
var totalAccuracy, totalAccuracyd;
var gameCont;
var rSpeed = 1,
  rUser = 2,
  dUser = 2,
  drSpeed = 1,
  dwSpeed = 1,
  mSpeed = 0.4,
  upSpeed = 2;
var timeCounter;
var isDone = false;
var height = 0;
var gamepad;

var gamepadConnected = false;

var qqq, sss;

const gamepadSwitch = (connect) => {
  if (connect) {
    gamepadConnected = true;
    console.log('gamepad connected');
    console.log(navigator.getGamepads()[0]);
  } else {
    gamepadConnected = false;
    console.log('gamepad disconnected');
  }
};

function Main() {
    if (navigator.getGamepads()[0]) {
        gamepadSwitch(true);
    } else {
        gamepadSwitch(false);
    }
    
    window.addEventListener('gamepadconnected', () => gamepadSwitch(true));
    window.addEventListener('gamepaddisconnected', () => gamepadSwitch(false));

    canvas = document.getElementById('test');
    stage = new createjs.Stage(canvas);
    optimizeForTouchAndScreens();
    stage.enableMouseOver(10);

    manifest = [
        { src: 'sounds/red.ogg', id: 'Red' },
        { src: 'sounds/green.ogg', id: 'Green' },
        { src: 'sounds/blue.ogg', id: 'Blue' },
        { src: 'sounds/yellow.ogg', id: 'Yellow' },
        { src: 'sounds/triangle.ogg', id: 'Triangle' },
        { src: 'sounds/square.ogg', id: 'Square' },
        { src: 'sounds/circle.ogg', id: 'Circle' },
        { src: 'images/screen1.png', id: 'Screen1' },
        { src: 'images/screen2.png', id: 'Screen2' },
        { src: 'images/screen3.png', id: 'Screen3' },
        { src: 'images/screen_mid.png', id: 'ScreenM' },
        { src: 'images/screen_front.png', id: 'ScreenF' },
        { src: 'images/diamond.png', id: 'DiamondW' },
        { src: 'images/diamondr.png', id: 'DiamondR' },
        { src: 'images/red.png', id: 'IRed' },
        { src: 'images/blue.png', id: 'IBlue' },
        { src: 'images/green.png', id: 'IGreen' },
        { src: 'images/yellow.png', id: 'IYellow' },
        { src: 'images/red_square.png', id: 'IReds' },
        { src: 'images/blue_square.png', id: 'IBlues' },
        { src: 'images/green_square.png', id: 'IGreens' },
        { src: 'images/yellow_square.png', id: 'IYellows' },
    ];

    loader = new createjs.LoadQueue(false);
    loader.installPlugin(createjs.Sound);
    createjs.Sound.alternateExtensions = ['mp3'];

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
  showStartScreen();
  stage.update();
}
function showStartScreen() {
  showScreen('#logo-screen');
  document.getElementById('tside').innerHTML = String(
    'Flight Director<span>Legacy</span>'
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
  //load screen 1
  var screen1 = new createjs.Bitmap(loader.getResult('Screen1'));
  screen1.regX = 0;
  screen1.regY = 0;
  screen1.x = 0;
  screen1.y = 38;
  gameCont.addChild(screen1);

  //load screen 2
  var screen2 = new createjs.Bitmap(loader.getResult('Screen2'));
  screen2.regX = 0;
  screen2.regY = 0;
  screen2.x = 188;
  screen2.y = 0;

  gameCont.addChild(screen2);

  //load screen 3
  var screen3 = new createjs.Bitmap(loader.getResult('Screen3'));
  screen3.regX = 0;
  screen3.regY = 0;
  screen3.x = 257;
  screen3.y = 510;

  gameCont.addChild(screen3);
  stage.addChild(gameCont);

  //load screen mid
  screenm = new createjs.Bitmap(loader.getResult('ScreenM'));
  screenm.regX = screenm.image.width / 2;
  screenm.regY = screenm.image.height / 2;
  screenm.x = 487;
  screenm.y = SMY;
  var circle = new createjs.Shape(
    new createjs.Graphics().drawCircle(0, 0, 185)
  );
  circle.x = 486;
  circle.y = 237;

  screenm.mask = circle;
  stage.addChild(screenm);

  //load screen front
  screenf = new createjs.Bitmap(loader.getResult('ScreenF'));
  screenf.regX = 0;
  screenf.regY = 0;
  screenf.x = 190;
  screenf.y = -12;
  stage.addChild(screenf);

  //load red diamond

  diamondr = new createjs.Bitmap(loader.getResult('DiamondR'));
  diamondr.regX = 0;
  diamondr.regY = 0;
  diamondr.x = 70;
  diamondr.y = 245;
  stage.addChild(diamondr);

  //load white diamond

  diamondw = new createjs.Bitmap(loader.getResult('DiamondW'));
  diamondw.regX = 0;
  diamondw.regY = 0;
  diamondw.x = 460;
  diamondw.y = 580;
  stage.addChild(diamondw);

////////////////////////////////////////////
    qqq = new createjs.Text(qState, '25px Open Sans', '#ff0000');
    qqq.y = 0;
    qqq.x = 0;
    stage.addChild(qqq);

    sss = new createjs.Text('none', '25px Open Sans', '#00ff00');
    sss.y = 50;
    sss.x = 0;
    stage.addChild(sss);
/////////////////////////////////////////////

  startMain();
}
function startMain() {
    sec = 0;
    errors = 0;
    score = 0;
    randomQ = 0;
    randomM = 0;
    currentS = 0;
    gameSec = 0;
    hSec = 0;
    inS = 0;
    isDone = false;
    isResponse = false;
    spacek = false;
    totalAccuracy = new Array();
    totalAccuracyd = new Array();
    qState = 'visual';
    qqq.text = qState;
    targetSec = 1;
    timeCounter = null;

    window.addEventListener('keydown', getKeyDown);
    window.addEventListener('keyup', getKeyUp);
  
    document.getElementById('tsiderx').innerHTML = String('Score: ' + score);
  
    createjs.Ticker.addEventListener('tick', mainEnterFrame);
    createjs.Ticker.setFPS(30);
    timeCounter = setInterval('countTimeMain()', 1000);

    // createjs.Ticker.timingMode = createjs.Ticker.RAF;
    // createjs.Ticker.on('tick', tickPie);

    questionColor();
    testAudio();

  //questionColor();
  //questionNumber();
}
//color audi
function testAudio() {
  var aName = String('Red');
  var instance = createjs.Sound.play(aName); // play using id.  Could also use full source path or event.src.
  instance.on('complete', createjs.proxy(this.handleCompleteSoundTest, this));
  instance.volume = 0;
}
function handleCompleteSoundTest() {
    // setTimeout(testAudio, 1000);
}
function questionColor() {
    var xOff = 810;
    pickedColor = new Array();
    cContainer = new createjs.Container();
    var r = Math.floor(Math.random() * 2);
    if (r == 1) {
        isA = 'Y';
    } else {
        isA = 'N';
    }

    for (var i = 0; i < 3; i++) {
        var rI = Math.floor(Math.random() * colorArray.length);
        var gI = Math.floor(Math.random() * 2);
        if (gI == 1) {
            var secS = String('Circle');
        } else {
            secS = String('Square');
        }
        var pStr = String(colorArray[rI] + '-' + secS);

        if (isA == 'Y') {
            pickedColor[i] = pStr;
        }

        var bName = String('I' + getColorName(pStr));
        var bmp = new createjs.Bitmap(loader.getResult(bName));
        bmp.regX = 0;
        bmp.regY = 0;
        bmp.x = 0;
        bmp.y = i * 68;
        cContainer.addChild(bmp);
    }

    if (isA == 'N') {
        for (i = 0; i < 3; i++) {
            rI = Math.floor(Math.random() * colorArray.length);
            if (gI == 1) {
                secS = String('Circle');
            } else {
                secS = String('Square');
            }
            pStr = String(colorArray[rI] + '-' + secS);
            pickedColor[i] = pStr;
        }
    }
    stage.addChild(cContainer);
    cContainer.x = xOff;
    cContainer.y = 120;
    isDone = true;
    // testAudio();
}
function getColorName(pStr) {
    var cName = '';
    var tArray = new Array();
    tArray = pStr.split('-');
    cName = String(tArray[0]);
    var eS = tArray[1];
    switch (eS) {
        case 'Square':
            cName += 's';
            break;
    }
  
    return cName;
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
        case 83:
            skey = false;
            break;
        case 87:
            wkey = false;
            break;
        case 65:
            akey = false;
            break;
        case 68:
            dkey = false;
            break;
      }
}
function getKeyDown(e) {
  e.preventDefault();
  switch (e.keyCode) {
    case 32:
        if (qState == 'answer' && !isResponse) {
            if (isA == 'Y') {
                score++;
                document.getElementById('tsiderx').innerHTML = String(
                    'Score: ' + score
                );
            } else {
                errors++;
            }
            isResponse = true;
            spacek = true;
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
    case 83:
        skey = true;
        break;
    case 87:
        wkey = true;
        break;
    case 65:
        akey = true;
        break;
    case 68:
        dkey = true;
        break;
  }
  stage.update();
}
function countTimeMain() {
    if (isDone) {
        sec++;
    }
    console.log(sec, targetSec, qState)
    if (sec > targetSec) {
        isDone = false;
        sec = 0;
        if (qState == 'visual') {
            stage.removeChild(cContainer);
            targetSec = 1;
            qState = 'audio';
            isDone = true;
        } else if (qState == 'audio') {
            qState = 'answer';
            currentS = 0;
            inS = 0;
            colorAudioMain();
            targetSec = 5;
        } else if (qState == 'answer') {
            if (!isResponse && !spacek) {
                if (isA == 'Y') {
                    errors++;
                }
                if (isA == 'N') {
                    score++;
                    document.getElementById('tsiderx').innerHTML = String(
                        'Score: ' + score
                    );
                }
            }
            qState = 'visual';
            isResponse = false;
            spacek = false;
            //check answer and start the new
            questionColor();
            isDone = true;
            targetSec = 1;
        }
    }
    qqq.text = qState;

    gameSec++;

    var rsec = totalSec - gameSec;
    var tStr = String(
        Math.floor(rsec / 60) + ' minutes ' + (rsec % 60) + ' seconds'
    );

    document.getElementById('tsider').innerHTML = String(tStr);
    randomM = Math.floor(Math.random() * 2);

    if (gameSec >= totalSec) {
        gameSec = 0;
        sec = 0;
        clearInterval(timeCounter);
        gameOver();
    }
    stage.update();
}
function countTime() {
    hSec++;
    crossSec++;

    if (hSec > 20) {
        hSec = 0;
        randomQ = Math.floor(Math.random() * 4);
    }

    if (crossSec >= 20) {
        crossSec = 0;
        measureAccuracy();
        measureAccuracyD();
    }
}
function measureAccuracy() {
    var cRot = Math.abs(Math.round(screenm.rotation));
    var ravg = Math.round((cRot / 60) * 100);
    var yOffc = Math.abs(SMY - screenm.y);
    var yavg = (yOffc / 125) * 100;
    var bavg = Math.round((yavg + ravg) / 2);
  
    totalAccuracy.push(bavg);
}
function measureAccuracyD() {
    var yOffc = Math.abs(CY - diamondr.y);
    var yavg = (yOffc / 150) * 100;
  
    var xOffc = Math.abs(CX - diamondw.x);
    var xavg = (xOffc / 160) * 100;
    var bavg = Math.round((yavg + xavg) / 2);
    totalAccuracyd.push(bavg);
}
function giveAresult() {
    var tV = 0;
    for (var i = 0; i < totalAccuracy.length; i++) {
      tV += totalAccuracy[i];
    }
    var avg = Math.round(tV / totalAccuracy.length);
    var res = 100 - avg;
    return res;
}
function giveAresultd() {
    var tV = 0;
    for (var i = 0; i < totalAccuracyd.length; i++) {
      tV += totalAccuracyd[i];
    }
    var avg = Math.round(tV / totalAccuracyd.length);
    var res = 100 - avg;
    return res;
}
function playAgain(e) {
  e.target.removeEventListener('click', playAgain);
}
function mainEnterFrame(event) {
  // this set makes it so the stage only re-renders when an event handler indicates a change has happened.

  countTime();
  rotateMidScreen();
  moveRedDiamond();
  moveWDiamond();

  //update = false; // only update once
  stage.update(event);
}

function rotateMidScreen() {
    if (!rightk && !leftk && !gamepad_rightk && !gamepad_leftk) {
        if (randomM == 1) {
            screenm.rotation += rSpeed;
        }
        if (screenm.rotation > 60) {
            screenm.rotation -= 2;
            rSpeed *= -1;
        }

        if (screenm.rotation < -60) {
            screenm.rotation += 2;
            rSpeed *= -1;
        }
    }
    if (rightk) {
        if (screenm.rotation > -60) {
            screenm.rotation -= rUser;
        }
    }
    if (leftk) {
        if (screenm.rotation < 60) {
            screenm.rotation += rUser;
        }
    }

    const rot = (screenm.rotation * Math.PI) / 180;
    if (!upk && !downk && !gamepad_upk && !gamepad_downk) {
        length += mSpeed;

        if (length < -161) {
            length += 2;
            mSpeed *= -1;
        }
        if (length > 161) {
            length -= 2;
            mSpeed *= -1;
        }
    }
    if (upk) {
        if (length > -161) {
            length -= upSpeed;
        }
    }
    if (downk) {
        if (length < 161) {
            length += upSpeed;
        }
    }

    screenm.y = 236 - length * Math.cos(rot);
    screenm.x = 487 + length * Math.sin(rot);

    var gp = navigator.getGamepads()[0];
    if (!gp) return;

    if (gp.axes[0] !== 0) {
        screenm.rotation -= gp.axes[0] * rUser;
    }

    if (gp.axes[1] !== 0) {
        length -= gp.axes[1] * upSpeed;
    }
}

function moveRedDiamond() {
    if (!skey && !wkey && !gamepad_skey && !gamepad_wkey) {
        if (randomQ == 1) {
            drSpeed *= -1;
        }

        diamondr.y += drSpeed;

        if (diamondr.y > 398) {
            diamondr.y -= 20;
            drSpeed *= -1;
        }
        if (diamondr.y < 85) {
            diamondr.y += 20;
            drSpeed *= -1;
        }
    }
    if (skey || gamepad_skey) {
        if (diamondr.y > 90) {
            diamondr.y -= dUser;
        }
    }
    if (wkey || gamepad_wkey) {
        if (diamondr.y < 398) {
            diamondr.y += dUser;
        }
    }
}

function moveWDiamond() {
    if (!akey && !dkey && !gamepad_akey && !gamepad_dkey) {
        if (randomQ == 3) {
            dwSpeed *= -1;
        }

        diamondw.x -= dwSpeed;

        if (diamondw.x > 620) {
            diamondw.x -= 20;
            dwSpeed *= -1;
        }
        if (diamondw.x < 300) {
            diamondw.x += 20;
            dwSpeed *= -1;
        }
    }
    if (akey || gamepad_akey) {
        if (diamondw.x < 610) {
            diamondw.x += dUser;
        }
    }
    if (dkey || gamepad_dkey) {
        if (diamondw.x > 310) {
            diamondw.x -= dUser;
        }
    }
}
function colorAudioMain() {
    if (currentS < pickedColor.length) {
        currentS++;
        // setTimeout(() => colorAudio(), 50);
        colorAudio();
    } else {
        currentS = 0;
        inS = 0;
        isDone = true;
        return;
    }
}
function colorAudio() {
    var rSt = String(pickedColor[currentS - 1]);
    var tArray = new Array();
    tArray = rSt.split('-');
    var aName = String(tArray[inS]);
    sss.text = aName;
    stage.update();
    var instance = createjs.Sound.play(aName); // play using id.  Could also use full source path or event.src.
    instance.on('complete', createjs.proxy(this.handleCompleteSoundC, this));
    instance.volume = 1;
}
function handleCompleteSoundC() {
    inS++;
    if (inS < 2) {
        setTimeout(() => colorAudio(), 50);
    } else {
        inS = 0;
        colorAudioMain();
    }
}
function gameOver() {
  window.removeEventListener('keydown', getKeyDown);
  window.removeEventListener('keyup', getKeyUp);
  createjs.Ticker.removeEventListener('tick', mainEnterFrame);
  stage.removeChild(cContainer);
  stage.removeChild(gameCont);
  stage.removeChild(screenm);
  stage.removeChild(screenf);
  stage.removeChild(diamondr);
  stage.removeChild(diamondw);
  createjs.Sound.stop();
  showEndScreen();
}
function showEndScreen() {
  document.getElementById('tsider').innerHTML = String('End of Exam');
  document.getElementById('tsiderx').innerHTML = String('- / -');
  
  showScreen('#results-screen');

  document.querySelector('#score_result').innerHTML = score;
  document.querySelector('#percent_score').innerHTML = Math.round(
    (score / (score + errors)) * 100
  ).toFixed(1);

  var accuracy = giveAresult();
  var accuracy2 = giveAresultd();
  saveLoaded(accuracy, accuracy2);

  document.querySelector('#average_accuracy').innerHTML = Math.round(
    (accuracy + accuracy2) / 2
  );
  document.querySelector('#primary span').innerHTML = accuracy;
  document.querySelector('#secondary span').innerHTML = accuracy2;
  document
    .querySelector('#restart-button')
    .addEventListener('click', startAgain);
}
function startAgain() {
  showStartScreen();
}
//save the score
function saveLoaded(accuracy, accuracy2) {
    // Create our XMLHttpRequest object
    // var hr = new XMLHttpRequest();
    // var datastring = "";
    // datastring += "Errors" + "=" + errors + "&";
    // datastring += "Score" + "=" + score + "&";
    // datastring += "Duration" + "=" + totalSec + "&";
    // datastring += "Accuracy" + "=" + accuracy + "&";
    // datastring += "Accuracy2" + "=" + accuracy2;
  
    var accu = (accuracy + accuracy2) / 2;
    var ackn = (score / (score + errors)) * 100;
  
    insertResults(Math.floor((accu + ackn) / 2), totalSec);
  
    // hr.open("POST", "saveFDScore.php");
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