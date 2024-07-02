// JavaScript Document
var canvas;
var stage;

var DELAY_BETWEEN_NUMBERS = 2; // in seconds;
var TIME_TO_PRESS_SPACE = 1; // in seconds
var CROSSHAIR_MOVE_INTERVAL = 0.25; // in seconds
var CROSSHAIR_MOVE_AMOUNT = 30;
var intensity = 1;
let gamepadIndex;
var JoyDiv
var gamepadtimer;
var gamepad_flag = false;
var numbers = [
  20, 22, 24, 26, 27, 28, 30, 32, 34, 35, 37, 38, 40, 41, 43, 44, 45, 46,
  47, 48, 50, 52, 53, 56, 60, 62, 64, 68, 72, 74, 76, 80,
];
var sequences = {
  20: [
    [20, 30, 40, 50, 60],
    [20, 30, 40, 50],
    [20, 30, 40],
    [20, 22, 24, 26, 28, 30, 32, 34],
    [20, 22, 24, 26, 28, 30, 32],
    [20, 22, 24, 26, 28, 30],
    [20, 22, 24, 26, 28],
    [20, 22, 24, 26],
    [20, 22, 24],
    [20, 24, 28, 32],
    [20, 24, 28],
  ],
  22: [
    [22, 24, 26, 28, 30, 32, 34],
    [22, 24, 26, 28, 30, 32],
    [22, 24, 26, 28, 30],
    [22, 24, 26, 28],
    [22, 24, 26],
    [22, 26, 30, 34, 38],
    [22, 26, 30, 34],
    [22, 26, 30],
  ],
  24: [
    [24, 26, 28, 30, 32, 34],
    [24, 26, 28, 30, 32],
    [24, 26, 28, 30],
    [24, 26, 28],
  ],
  26: [
    [26, 28, 30, 32, 34],
    [26, 28, 30, 32],
    [26, 28, 30],
  ],
  27: [[27, 37, 47]],
  30: [
    [30, 35, 40, 45, 50],
    [30, 35, 40, 45],
    [30, 35, 40],
  ],
  32: [
    [32, 28, 24, 20],
    [32, 28, 24],
    [32, 35, 38, 41, 44, 47, 50, 53, 56],
    [32, 35, 38, 41, 44, 47, 50, 53],
    [32, 35, 38, 41, 44, 47, 50],
    [32, 35, 38, 41, 44, 47],
    [32, 35, 38, 41, 44],
    [32, 35, 38, 41],
    [32, 35, 38],
  ],
  34: [
    [34, 37, 40, 43, 46],
    [34, 37, 40, 43],
    [34, 37, 40],
    [34, 32, 30, 28, 26, 24, 22, 20],
    [34, 32, 30, 28, 26, 24, 22],
    [34, 32, 30, 28, 26, 24],
    [34, 32, 30, 28, 26],
    [34, 32, 30, 28],
    [34, 32, 30],
  ],
  35: [
    [35, 38, 41, 44, 47, 50, 53, 56],
    [35, 38, 41, 44, 47, 50, 53],
    [35, 38, 41, 44, 47, 50],
    [35, 38, 41, 44, 47],
    [35, 38, 41, 44],
    [35, 38, 41],
  ],
  38: [
    [38, 34, 30, 26, 22],
    [38, 34, 30, 26],
    [38, 34, 30],
    [38, 41, 44, 47, 50, 53, 56],
    [38, 41, 44, 47, 50, 53],
    [38, 41, 44, 47, 50],
    [38, 41, 44, 47],
    [38, 41, 44],
  ],
  40: [
    [40, 44, 48, 52, 56, 60, 64, 68, 72, 76, 80],
    [40, 44, 48, 52, 56, 60, 64, 68, 72, 76],
    [40, 44, 48, 52, 56, 60, 64, 68, 72],
    [40, 44, 48, 52, 56, 60, 64, 68],
    [40, 44, 48, 52, 56, 60, 64],
    [40, 44, 48, 52, 56, 60],
    [40, 44, 48, 52, 56],
    [40, 44, 48, 52],
    [40, 44, 48],
  ],
  41: [
    [41, 44, 47, 50, 53, 56],
    [41, 44, 47, 50, 53],
    [41, 44, 47, 50],
    [41, 44, 47],
  ],
  44: [
    [44, 46, 48, 50, 52],
    [44, 46, 48, 50],
    [44, 46, 48],
    [44, 47, 50, 53, 56],
    [44, 47, 50, 53],
    [44, 47, 50],
    [44, 48, 52, 56, 60, 64, 68, 72, 76, 80],
    [44, 48, 52, 56, 60, 64, 68, 72, 76],
    [44, 48, 52, 56, 60, 64, 68, 72],
    [44, 48, 52, 56, 60, 64, 68],
    [44, 48, 52, 56, 60, 64],
    [44, 48, 52, 56, 60],
    [44, 48, 52, 56],
    [44, 48, 52],
  ],
  46: [
    [46, 43, 40, 37, 34],
    [46, 43, 40, 37],
    [46, 43, 40],
    [46, 48, 50, 52],
    [46, 48, 50],
  ],
  47: [
    [47, 37, 27],
    [47, 50, 53, 56],
    [47, 50, 53],
  ],
  48: [
    [48, 50, 52],
    [48, 52, 56, 60, 64, 68, 72, 76, 80],
    [48, 52, 56, 60, 64, 68, 72, 76],
    [48, 52, 56, 60, 64, 68, 72],
    [48, 52, 56, 60, 64, 68],
    [48, 52, 56, 60, 64],
    [48, 52, 56, 60],
    [48, 52, 56],
  ],
  50: [
    [50, 45, 40, 35, 30],
    [50, 45, 40, 35],
    [50, 45, 40],
    [50, 53, 56],
  ],
  52: [
    [52, 50, 48, 46, 44],
    [52, 50, 48, 46],
    [52, 50, 48],
    [52, 56, 60, 64, 68, 72, 76, 80],
    [52, 56, 60, 64, 68, 72, 76],
    [52, 56, 60, 64, 68, 72],
    [52, 56, 60, 64, 68],
    [52, 56, 60, 64],
    [52, 56, 60],
  ],
  56: [
    [56, 53, 50, 47, 44, 41, 38, 35, 32],
    [56, 53, 50, 47, 44, 41, 38, 35],
    [56, 53, 50, 47, 44, 41, 38],
    [56, 53, 50, 47, 44, 41],
    [56, 53, 50, 47, 44],
    [56, 53, 50, 47],
    [56, 53, 50],
    [56, 60, 64, 68, 72, 76, 80],
    [56, 60, 64, 68, 72, 76],
    [56, 60, 64, 68, 72],
    [56, 60, 64, 68],
    [56, 60, 64],
  ],
  60: [
    [60, 62, 64],
    [60, 64, 68, 72, 76, 80],
    [60, 64, 68, 72, 76],
    [60, 64, 68, 72],
    [60, 64, 68],
  ],
  64: [
    [64, 62, 60],
    [64, 68, 72, 76, 80],
    [64, 68, 72, 76],
    [64, 68, 72],
  ],
  68: [
    [68, 72, 76, 80],
    [68, 72, 76],
  ],
  72: [
    [72, 74, 76],
    [72, 76, 80],
  ],
  76: [[76, 74, 72]],
  80: [
    [80, 76, 72, 68, 64, 60, 56, 52, 48, 44, 40],
    [80, 76, 72, 68, 64, 60, 56, 52, 48, 44],
    [80, 76, 72, 68, 64, 60, 56, 52, 48],
    [80, 76, 72, 68, 64, 60, 56, 52],
    [80, 76, 72, 68, 64, 60, 56],
    [80, 76, 72, 68, 64, 60],
    [80, 76, 72, 68, 64],
    [80, 76, 72, 68],
    [80, 76, 72],
  ],
};

var heatmapInstance = null;
var heatmaps = {
  data: [],
  max: 150,
};
var time_target = 0;

var chx = null;
var chy = null;
var xtimer = null, ytimer = null;
var distances = [];
var chtimer;
var joytimer;
var joy_flag = false;
var miss_total = 0;
var correct_total = 0;
var sequence;
var last = 0;
var diff = 0;

var changed = false;

var spacetimer;
var justmissed = false;
var spaceup = false;

var seqplaying = false;
var started = false;

var totalSec = 180;
var sec = 0;
var gameSec = 0;

var timeCounter;

function Main() {
  canvas = document.getElementById('test');
  stage = new createjs.Stage(canvas);
  optimizeForTouchAndScreens();
  stage.enableMouseOver(10);

  manifest = [
    { src: 'audio/20.ogg', id: '20'},
    { src: 'audio/22.ogg', id: '22'},
    { src: 'audio/24.ogg', id: '24'},
    { src: 'audio/26.ogg', id: '26'},
    { src: 'audio/27.ogg', id: '27'},
    { src: 'audio/28.ogg', id: '28'},
    { src: 'audio/30.ogg', id: '30'},
    { src: 'audio/32.ogg', id: '32'},
    { src: 'audio/34.ogg', id: '34'},
    { src: 'audio/35.ogg', id: '35'},
    { src: 'audio/37.ogg', id: '37'},
    { src: 'audio/38.ogg', id: '38'},
    { src: 'audio/40.ogg', id: '40'},
    { src: 'audio/41.ogg', id: '41'},
    { src: 'audio/43.ogg', id: '43'},
    { src: 'audio/44.ogg', id: '44'},
    { src: 'audio/45.ogg', id: '45'},
    { src: 'audio/46.ogg', id: '46'},
    { src: 'audio/47.ogg', id: '47'},
    { src: 'audio/48.ogg', id: '48'},
    { src: 'audio/50.ogg', id: '50'},
    { src: 'audio/52.ogg', id: '52'},
    { src: 'audio/53.ogg', id: '53'},
    { src: 'audio/56.ogg', id: '56'},
    { src: 'audio/60.ogg', id: '60'},
    { src: 'audio/62.ogg', id: '62'},
    { src: 'audio/64.ogg', id: '64'},
    { src: 'audio/68.ogg', id: '68'},
    { src: 'audio/72.ogg', id: '72'},
    { src: 'audio/74.ogg', id: '74'},
    { src: 'audio/76.ogg', id: '76'},
    { src: 'audio/80.ogg', id: '80'},
    { src: 'images/centre.png', id: 'centre' },
    { src: 'images/screen.png', id: 'screen' },
  ];
  loader = new createjs.LoadQueue(false);
  loader.installPlugin(createjs.Sound);
  createjs.Sound.alternateExtensions = ['mp3'];

  loader.addEventListener('progress', handleProgress);
  loader.addEventListener('complete', handleComplete);
  loader.loadManifest(manifest, true);
  
  var joyParam = { title: 'joystick' };
  JoyDiv = new JoyStick('joystickDiv', joyParam);

  // score_manager.init('crosshairs_advanced');
}
function optimizeForTouchAndScreens() {
  if (createjs.Touch.isSupported()) {
    createjs.Touch.enable(stage);
  }
}
function handleProgress() {
  var progresPrecentage = Math.round(loader.progress * 100);
  $('#load_percent').text(`${progresPrecentage}% loaded`);
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
  changeTopText('left', '- / -', true);
        changeTopText('right', 'Start of Exam');
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
  showScreen('#crosshairs-screen');
  startMain();
}
function startMain() {
  gameSec = 0;
  miss_total = 0;
  correct_total = 0;
  distances = [];
  sequence = null;
  started = true;
  spaceup = false;
  justmissed = false;

  heatmapInstance = h337.create({
    container: document.querySelector('.result-heatmap'),
    gradient: {
      '.85': '#8cdd3e',
      '.98': '#fefe00',
      1: '#fe1f00',
    },
  });
  
  chx = $('#crosshair-x');
  chy = $('#crosshair-y');

  chx.css('left', '0');
  chx.css('top', '0');
  chy.css('left', '0');
  chy.css('top', '0');

  changeTopText('left', 'Score: 0&ensp;');

  window.addEventListener('keydown', getKeyDown);
  window.addEventListener('keyup', getKeyUp);

  createjs.Ticker.addEventListener('tick', mainEnterFrame);
  createjs.Ticker.setFPS(30);

  moveCrosshairs();
  moveCrossWithJoystick();
  gamepadHandler();

  timeCounter = setInterval('countTimeMain()', 1000);

  last = 0;
  diff = 0;

  changeSequence();
  seqplaying = true;
  playSequence();
}
function changeSequence() {
  do {
    var n = numbers[Math.round(Math.random() * (numbers.length - 1))];
    sequence = sequences[n];
  } while (
    !sequence ||
    n == last ||
    n == last + diff ||
    n == last - diff
  );
  sequence = sequence[Math.round(Math.random() * (sequence.length - 1))];
}
function playSequence() {
  if (seqplaying) {
    var next = sequence.shift();
    if (next) {
      diff = Math.abs(last - next);
      last = next;
      var instance = createjs.Sound.play(next); // play using id.  Could also use full source path or event.src.
      instance.on('complete', createjs.proxy(this.handleCompleteSound, this));
      instance.volume = 1;
    } else {
      changeSequence();
      changed = true;
      console.log("click now.")
      spacetimer = setTimeout(function () {
        spacetimer = null;
        justmissed = true;
        setTimeout(function () {
          justmissed = false;
        }, TIME_TO_PRESS_SPACE * 1000);
        clearInterval(spacetimer);
        miss_total++;
        updateMissed();
        changed = false;
      }, TIME_TO_PRESS_SPACE * 1000 + 1000);
      playSequence();
    }
  }
}
function handleCompleteSound() {
  setTimeout(playSequence, DELAY_BETWEEN_NUMBERS * 1000);
}
function updateMissed() {
  // changeTopText('left', miss_total + ' Error' + (miss_total>1 ? 's' : '&ensp;') + '&ensp;');
  changeTopText('left', ' Score: ' + correct_total);
}
function hitChanged() {
  if (started) {
    if (spacetimer && changed) {
      console.log("OK")
      correct_total++;
      updateMissed();
      clearInterval(spacetimer);
      spacetimer = null;
      changed = false;
    } else if (!justmissed) {
      console.log("MISS")
      miss_total++;
    }
  }
}
function getKeyUp(e) {
  var key = e.keyCode || e.which;
  switch (key) {
    case 32:
      spaceup = false;
      break;
    case 38:
      clearInterval(ytimer);
      ytimer = null;
      initJoystick();
      break;
    case 40:
      clearInterval(ytimer);
      ytimer = null;
      initJoystick();
      break;
    case 37:
      clearInterval(xtimer);
      xtimer = null;
      initJoystick();
      break;
    case 39:
      clearInterval(xtimer);
      xtimer = null;
      initJoystick();
      break;
  }
}
function getKeyDown(e) {
  e.preventDefault();
  var key = e.keyCode || e.which;
  switch (key) {
    case 32:
      spaceup = true;
      hitChanged();
      break;
    case 38:
      setDirectionJoystick('t');
      if (!ytimer)
        ytimer = setInterval(function () {
          move(chy, 'y', -1 * CROSSHAIR_MOVE_AMOUNT);
        }, CROSSHAIR_MOVE_INTERVAL * 150);
      break;
    case 40:
      setDirectionJoystick('b');
      if (!ytimer)
        ytimer = setInterval(function () {
          move(chy, 'y', 1 * CROSSHAIR_MOVE_AMOUNT);
        }, CROSSHAIR_MOVE_INTERVAL * 150);
      break;
    case 37:
      setDirectionJoystick('l');
      if (!xtimer)
        xtimer = setInterval(function () {
          move(chx, 'x', -1 * CROSSHAIR_MOVE_AMOUNT);
        }, CROSSHAIR_MOVE_INTERVAL * 150);
      break;
    case 39:
      setDirectionJoystick('r');
      if (!xtimer)
        xtimer = setInterval(function () {
          move(chx, 'x', 1 * CROSSHAIR_MOVE_AMOUNT);
        }, CROSSHAIR_MOVE_INTERVAL * 150);
      break;
  }
}
function setDirectionJoystick(dir) {
  switch (dir) {
    case 't':
      moveJoystick(60, 30);
      break;
    case 'tr':
      moveJoystick(80, 40);
      break;
    case 'r':
      moveJoystick(90, 60);
      break;
    case 'br':
      moveJoystick(80, 80);
      break;
    case 'b':
      moveJoystick(60, 90);
      break;
    case 'bl':
      moveJoystick(40, 80);
      break;
    case 'l':
      moveJoystick(30, 60);
      break;
    case 'tl':
      moveJoystick(40, 40);
      break;
    default:
      break;
  }
}
function moveJoystick(_offX, _offY) {
  JoyDiv.SetPosition(_offX, _offY);
}

function initJoystick() {
  JoyDiv.initPosition();
}
function moveCrosshairs() {
  chtimer = setInterval(function () {
    var movex =
      Math.random() *
      CROSSHAIR_MOVE_AMOUNT *
      intensity *
      (Math.random() < 0.5 ? -1 : 1);
    var movey =
      Math.random() *
      CROSSHAIR_MOVE_AMOUNT *
      intensity *
      (Math.random() < 0.5 ? -1 : 1);
    move(chx, 'x', movex, true);
    move(chy, 'y', movey, true);
    if (xtimer != null || ytimer != null || joy_flag || gamepad_flag) {
      var _dis = Math.abs(1 - dist() / max());
      distances.push(_dis);
      heatmaps.data.push({
        x: parseInt(150 + (parseInt(chx.css('left')) / 175) * 150),
        y: parseInt(150 + (parseInt(chy.css('top')) / 175) * 150),
        value: parseInt(150 * _dis),
        radius: parseInt(100 * _dis),
      });
      // heatmaps.max = parseInt( (150 * _dis)>heatmaps.max?(150 * _dis):heatmaps.max );
      if (_dis >= 0.9) time_target += CROSSHAIR_MOVE_INTERVAL;
    }
  }, CROSSHAIR_MOVE_INTERVAL * 1000);
}
function dist() {
  return Math.sqrt(
    Math.pow(parseInt(chx.css('left')), 2) +
      Math.pow(parseInt(chy.css('top')), 2)
  );
}

function max() {
  return 245;
}
function move(el, axis, amount, animate) {
  axis = axis == 'y' ? 'top' : 'left';
  if (Math.abs(parseInt(el.css(axis)) + amount) < 175) {
    el.css(axis, '+=' + amount);
  } else {
    if (amount > 0) {
      el.css(axis, 175);
    } else {
      el.css(axis, -175);
    }
  }
}
function moveCrossWithJoystick() {
  joytimer = setInterval(function () {
    var offX = JoyDiv.GetPosX() - 60;
    var offY = JoyDiv.GetPosY() - 60;
    var dic = JoyDiv.GetDir();
    if (dic == 'C') {
      joy_flag = false;
    } else {
      joy_flag = true;
      switch (dic) {
        case 'N':
          move(chy, 'y', offY);
          break;
        case 'NE':
          move(chx, 'x', offX);
          move(chy, 'y', offY);
          break;
        case 'E':
          move(chx, 'x', offX);
          break;
        case 'SE':
          move(chx, 'x', offX);
          move(chy, 'y', offY);
          break;
        case 'S':
          move(chy, 'y', offY);
          break;
        case 'SW':
          move(chx, 'x', offX);
          move(chy, 'y', offY);
          break;
        case 'W':
          move(chx, 'x', offX);
          break;
        case 'NW':
          move(chx, 'x', offX);
          move(chy, 'y', offY);
          break;
        default:
          break;
      }
    }
  }, 50);
}
function gamepadHandler() {
  gamepadtimer = setInterval(function () {
    if (gamepadIndex !== undefined) {
      const gp = navigator.getGamepads()[gamepadIndex];
      if (gp) {
        if (gp.axes[0] < -0.05) {
          if (gp.axes[1] < -0.05) {
            // setDirectionJoystick('tl');
            gamepad_flag = true;
            move(chy, 'y', -1 * CROSSHAIR_MOVE_AMOUNT);
            move(chx, 'x', -1 * CROSSHAIR_MOVE_AMOUNT);
          } else if (gp.axes[1] >= -0.05 && gp.axes[1] <= 0.05) {
            // setDirectionJoystick('l');
            gamepad_flag = true;
            // move(chy, 'y', 20);
            move(chx, 'x', -1 * CROSSHAIR_MOVE_AMOUNT);
          } else {
            // setDirectionJoystick('bl');
            gamepad_flag = true;
            move(chy, 'y', CROSSHAIR_MOVE_AMOUNT);
            move(chx, 'x', -1 * CROSSHAIR_MOVE_AMOUNT);
          }
        } else if (gp.axes[0] >= -0.05 && gp.axes[0] <= 0.05) {
          if (gp.axes[1] < -0.05) {
            // setDirectionJoystick('t');
            gamepad_flag = true;
            move(chy, 'y', -1 * CROSSHAIR_MOVE_AMOUNT);
            // move(chx, 'x', 20);
          } else if (gp.axes[1] >= -0.05 && gp.axes[1] <= 0.05) {
            // initJoystick();
            gamepad_flag = false;
            // move(chy, 'y', 20);
            // move(chx, 'x', 20);
          } else {
            // setDirectionJoystick('b');
            gamepad_flag = true;
            move(chy, 'y', CROSSHAIR_MOVE_AMOUNT);
            // move(chx, 'x', 20);
          }
        } else {
          if (gp.axes[1] < -0.05) {
            // setDirectionJoystick('tr');
            gamepad_flag = true;
            move(chy, 'y', -1 * CROSSHAIR_MOVE_AMOUNT);
            move(chx, 'x', CROSSHAIR_MOVE_AMOUNT);
          } else if (gp.axes[1] >= -0.05 && gp.axes[1] <= 0.05) {
            // setDirectionJoystick('r');
            gamepad_flag = true;
            // move(chy, 'y', 20);
            move(chx, 'x', CROSSHAIR_MOVE_AMOUNT);
          } else {
            // setDirectionJoystick('br');
            gamepad_flag = true;
            move(chy, 'y', CROSSHAIR_MOVE_AMOUNT);
            move(chx, 'x', CROSSHAIR_MOVE_AMOUNT);
          }
        }
      }
    }
  }, 50);
}
function mainEnterFrame(event) {
  // countTime();
  // moveCrossHair();
  stage.update(event);
}
function countTimeMain() {
  // if (isDone) {
  //   sec++;
  // }
  gameSec++;

  if (gameSec >= totalSec) {
    clearInterval(timeCounter);
    gameOver();
  }
  var rsec = totalSec - gameSec;
  var tStr = String(
    Math.floor(rsec / 60) + ' minutes ' + (rsec % 60) + ' seconds'
  );
  changeTopText('right', String(tStr));
  // if (sec >= targetSec) {
  //   sec = 0;
  //   isDone = false;
  //   pickNextQuestion();
  // }
}
function average() {
  if (distances.length == 0) return 0;
  var sum = 0;
  for (var dist in distances) {
    sum += distances[dist];
  }
  return sum / distances.length;
}
function gameOver() {
  window.removeEventListener('keydown', getKeyDown);
  window.removeEventListener('keyup', getKeyUp);

  createjs.Ticker.removeEventListener('tick', mainEnterFrame);
  createjs.Sound.stop();

  gameSec = 0;
  started = false;
  clearInterval(xtimer);
  clearInterval(ytimer);
  clearInterval(chtimer);
  clearInterval(joytimer);
  clearInterval(gamepadtimer);
  clearInterval(spacetimer);
  createjs.Sound.stop();

  seqplaying = false;
  changeTopText('left', 'Results', true);
  changeTopText('right', '- / -', true);
  $('#corrects').text(correct_total);
  $('#total').text(correct_total + miss_total);
  var _tt = parseInt((time_target / totalSec) * 100);
  $('#results-time-target').text(_tt);

  var _mins = Math.floor(parseInt(time_target) / 60);
  var _secs = parseInt(time_target) % 60;

  var _str_mins =
    (_mins == 0 ? '' : _mins) +
    ' ' +
    (_mins == 0 ? '' : ' min' + (_mins > 1 ? 's' : ''));
  var _str_secs = _secs + ' sec' + (_secs > 1 ? 's' : '');

  $('#time-targets').text(
    (_mins == 0 ? '' : _str_mins + ' and ') + _str_secs
  );

  var avg = average();
  $('#results-accuracy').text(Math.round(avg * 100) + '');
  heatmapInstance.setData(heatmaps);

  var accu = Math.round(avg * 100);
  var crc = (correct_total / (correct_total + miss_total)) * 100;

  // score_manager.submit({
  //   game_duration: totalSec,
  //   score_errors: miss_total,
  //   score_correct: correct_total,
  //   score_accuracy: Math.floor((accu + crc) / 2),
  // });
  saveLoaded(Math.floor((accu + crc) / 2));

  showEndScreen();
}
function showEndScreen() {
  showScreen('#results-screen');
  document
    .querySelector('#restart-button')
    .addEventListener('click', startAgain);
}
function startAgain() {
  showStartScreen();
}
function saveLoaded(accuracy) {
  insertResults(accuracy, totalSec);
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
$(document).ready(function () {
  $('.stepper-item').bind('click', function () {
    $('.stepper-item').each((index, el) => {
      if (index <= $(this).index()) {
        $(el).removeClass('active').addClass('completed');
      } else {
        $(el).removeClass('active').removeClass('completed');
      }
    });
    $(this).addClass('active');
    intensity = parseFloat($(this).attr('key'));
    CROSSHAIR_MOVE_INTERVAL = 0.25 / parseFloat($(this).attr('key'));
  });
  $('#logo').bind('click', function () {
    $('#setting').slideDown();
  });
  $('#change-button').bind('click', hitChanged);
  // $('#change-button').bind('tap', hitChanged);
  $('#move_joystick').bind('click', function () {
    if ($(this).attr('status') == 'right') {
      $('#joystickDiv').css('left', '0');
      $('#joystickDiv').css('right', 'unset');
      $(this).attr('status', 'left');
    } else {
      $('#joystickDiv').css('left', 'unset');
      $('#joystickDiv').css('right', '0');
      $(this).attr('status', 'right');
    }
  });
  $('body').click(function (event) {
    if (
      !$(event.target).closest('#setting').length &&
      !$(event.target).closest('#logo').length
    ) {
      $('#setting').slideUp();
    }
  });
});
