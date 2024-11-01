// JavaScript Document
var canvas;
var stage;
var sec = 0;
var loader;
var currentS = 0,
  targetS = 60; //30 headinAltSpeed Normal version

var totalSec = 300;
var leftk, rightk, upk, downk;
var skey, wkey, akey, dkey;
var jr_upk,
  jr_downk,
  jr_rightk,
  jr_leftk = false;
var jl_upk,
  jl_downk,
  jl_rightk,
  jl_leftk = false;
var gamepad_leftk, gamepad_rightk, gamepad_upk, gamepad_downk;
var gamepad_skey, gamepad_wkey, gamepad_akey, gamepad_dkey;
var randomM = 0;
var rSpeed = 0.2,
  rUser = 0.5,
  mSpeed = 0.5,
  upSpeed = 1.2;
var speed, alt, heading, yaw;
var jType;
var tspeed, talt, theading;
var spT, altT, headT, tspT, taltT, theadT;
var altT1, altT2, altT3, altT4;
var spInst, altInst, headInst, yawInst;
var isGame = false;
var spIn, headingIn, altIn;
var gameCont;
var screenm, screenf;
var manageScr;
var isDone = false;
var rotD = "left";
var speedR, altR, headR, yawR;
var speedTarget, altTarget, headTarget, yawTarget;
var readCont, readCont2, readCont3, readCont4;
var score = {
  speed: { flag: false, total: 0, correct: 0 },
  alt: { flag: false, total: 0, correct: 0 },
  head: { flag: false, total: 0, correct: 0 },
  yaw: { flag: false, total: 0, correct: 0 },
};
var total_yaw_aver = 0;
var totalCount,
  totalScore = 0;
var errors = 0;
var findex = -1;
var trackTime;
var crossCont, crossX, crossY;

var flightScore = 0,
  flightError = 0;
var headRCont = new createjs.Container();
var headIndex = 0;

var trainMode = false;

var centerCross = {
  x: 720,
  y: 325,
  w: 300,
  h: 6,
};

var showSetting = false;
var joyRTimer, joyLTimer;
var JoyRightDiv, JoyLeftDiv;

var relationSpeed = 0.888;

var speed_turbulence_flag = true;
var alt_turbulence_flag = true;
var heading_turbulence_flag = true;
var realism_flag = true;

var speed_turbulence = 0;
var alt_turbulence = 0;
var heading_turbulence = 0;

const turblence_steps = 150;
const speec_change_rate_by_alt = 0.003;

const gamepads = {
  9: { index: 9, id: "No Controller" },
  // 0: { 
  //   id: 'Fake Gamepad',
  //   index: 0,
  //   connected: true,
  //   mapping: 'standard',
  //   axes: [0, 0, 0, 0], // Initial axis positions (left joystick and right joystick)
  //   buttons: Array.from({length: 17}, () => ({ pressed: false, value: 0 })), // 17 buttons
  //   timestamp: performance.now()
  // },
  // 0: { index: 0, id: "USB-1" },
  // 1: { index: 1, id: "USB-2" },
  // 2: { index: 2, id: "USB-3" },
  // 3: { index: 3, id: "USB-4" },
};
var gamepad_conneted = {
  speed: 9,
  yaw: 9,
  alt:9,
  head:9
};

var joystick_axis_index = {
  speed:-1,
  yaw:-1,
  alt:-1,
  heading:-1
}
var joystick_axis_invert = {
  speed:false,
  yaw:false,
  alt:false,
  heading:false
}

function Main() {
  var joyRightParam = { title: "joystick-right" };
  JoyRightDiv = new JoyStick("joystick-right-div", joyRightParam);
  var joyLeftParam = { title: "joystick-left" };
  JoyLeftDiv = new JoyStick("joystick-left-div", joyLeftParam);

  canvas = document.getElementById("test");
  stage = new createjs.Stage(canvas);
  optimizeForTouchAndScreens();
  stage.enableMouseOver(10);
  manifest = [
    { src: "images/mask.png", id: "Fmask" },
    { src: "images/PAT_exam_logo.png", id: "Tlogo" },
    { src: "images/altArrow.png", id: "BAarrow" },
    { src: "images/speedArrow.png", id: "BSarrow" },
    { src: "images/headingArrow.png", id: "BHarrow" },
    { src: "images/altTarget.png", id: "TAarrow" },
    { src: "images/speedTarget.png", id: "TSarrow" },
    { src: "images/headingTarget.png", id: "THarrow" },
    { src: "images/speed.png", id: "ISpeed" },
    { src: "images/speed_bg.png", id: "ISpeedBG" },
    { src: "images/vermask.png", id: "Vmask" },
    { src: "images/altitude.png", id: "IAltitu" },
    { src: "images/altitude_bg.png", id: "IAltituBG" },
    { src: "images/hormask.png", id: "Hmask" },
    { src: "images/heading.png", id: "IHead" },
    { src: "images/heading_bg.png", id: "IHeadBG" },
    { src: "images/screen_mid.png", id: "ScreenM" },
    { src: "images/screen_front.png", id: "ScreenF" },
    { src: "images/on.png", id: "On" },
    { src: "images/off.png", id: "Off" },
    { src: "images/yawBG.png", id: "BYaw" },
    { src: "images/yaw.png", id: "Yaw" },
    { src: "images/yawTarget.png", id: "TYaw" },
  ];
  loader = new createjs.LoadQueue(false);
  loader.installPlugin(createjs.Sound);

  loader.addEventListener("progress", handleProgress);
  loader.addEventListener("complete", handleComplete);
  loader.loadManifest(manifest, true);
}
function handleProgress() {
  var progresPrecentage = Math.round(loader.progress * 100);
  $("#load_percent").text(`${progresPrecentage}% loaded`);
}
function optimizeForTouchAndScreens() {
  if (createjs.Touch.isSupported()) {
    createjs.Touch.enable(stage);
  }
}
function handleComplete() {
  loader.removeEventListener("progress", handleProgress);
  loader.removeEventListener("complete", handleComplete);

  isGame = false;
  var element = document.getElementById("loader");
  element.parentNode.removeChild(element);
  showStartScreen();

  stage.update();
  // startMain();
}
function showStartScreen(restart = false) {
  showSetting = false;
  trainMode = false;
  document.querySelector("#title").style = "background-color: #3793d1";
  document.querySelector("#tsider-train").style = "display: none !important";
  if (restart == false){
    var saved_joystick_axis_index = localStorage.getItem('joystick_axis_index');
    if (saved_joystick_axis_index){
      joystick_axis_index = JSON.parse(saved_joystick_axis_index);
    } else {
      joystick_axis_index = {
        speed:-1,
        yaw:-1,
        alt:-1,
        heading:-1
      }
    }
    var saved_joystick_axis_invert = localStorage.getItem('joystick_axis_invert');
    if (saved_joystick_axis_invert){
      joystick_axis_invert = JSON.parse(saved_joystick_axis_invert);
    } else {
      joystick_axis_invert = {
        speed:false,
        yaw:false,
        alt:false,
        heading:false
      }
    }

    var saved_gamepad_connected = localStorage.getItem('gamepad_conneted');
    var gps = navigator.getGamepads();
    if (saved_gamepad_connected){
      gamepad_conneted = JSON.parse(saved_gamepad_connected);
      if (gamepad_conneted.alt != 9 && gps[gamepad_conneted.alt]){
        $('.alt_controller .set_controller').html(gps[gamepad_conneted.alt].id);
        $('.alt_controller .set_controller').removeClass("no_controll");
        $('.alt_controller .axis-setting').show();
        $('.alt_controller .axis-select').empty();
        $('.alt_controller .axis-select').append('<option value="" selected></option>');
        for (var i = 0; i < gps[gamepad_conneted.alt].axes.length; i++){
          var disabled_index_flag = false;
          if (i == joystick_axis_index.alt){
            disabled_index_flag = true;
          }
          if (i == joystick_axis_index.heading && gamepad_conneted.head == gamepad_conneted.alt){
            disabled_index_flag = true;
          }
          if (i == joystick_axis_index.yaw && gamepad_conneted.yaw == gamepad_conneted.alt){
            disabled_index_flag = true;
          }
          if (i == joystick_axis_index.speed && gamepad_conneted.speed == gamepad_conneted.alt){
            disabled_index_flag = true;
          }
          if (disabled_index_flag){
            $('.alt_controller .axis-select').append('<option disabled value="'+ i.toString() +'">Axis ' + i.toString() + '</option>');
          } else {
            $('.alt_controller .axis-select').append('<option value="'+ i.toString() +'">Axis ' + i.toString() + '</option>');
          }
        }
        if (joystick_axis_index.alt > -1){
          $('.alt_controller .axis-select').val(joystick_axis_index.alt);
        }
        if (joystick_axis_invert.alt){
          $('.alt-invert').prop('checked', true);
        } else {
          $('.alt-invert').prop('checked', false);
        }
      } else {
        $('.alt_controller .set_controller').html(gamepads[9].id);
        $('.alt_controller .set_controller').addClass("no_controll");
        $('.alt_controller .axis-setting').hide();
        $('.alt_controller .axis-select').empty();
        $('.alt_controller .axis-select').val('');
        joystick_axis_index.alt = -1;
        joystick_axis_invert.alt = false;
      }

      if (gamepad_conneted.speed != 9 && gps[gamepad_conneted.speed]){
        $('.speed_controller .set_controller').html(gps[gamepad_conneted.speed].id);
        $('.speed_controller .set_controller').removeClass("no_controll");
        $('.speed_controller .axis-setting').show();
        $('.speed_controller .axis-select').empty();
        $('.speed_controller .axis-select').append('<option value="" selected></option>');
        for (var i = 0; i < gps[gamepad_conneted.speed].axes.length; i++){
          var disabled_index_flag = false;
          if (i == joystick_axis_index.speed){
            disabled_index_flag = true;
          }
          if (i == joystick_axis_index.heading && gamepad_conneted.head == gamepad_conneted.speed){
            disabled_index_flag = true;
          }
          if (i == joystick_axis_index.yaw && gamepad_conneted.yaw == gamepad_conneted.speed){
            disabled_index_flag = true;
          }
          if (i == joystick_axis_index.alt && gamepad_conneted.alt == gamepad_conneted.speed){
            disabled_index_flag = true;
          }
          if (disabled_index_flag){
            $('.speed_controller .axis-select').append('<option disabled value="'+ i.toString() +'">Axis ' + i.toString() + '</option>');
          } else {
            $('.speed_controller .axis-select').append('<option value="'+ i.toString() +'">Axis ' + i.toString() + '</option>');
          }
        }
        if (joystick_axis_index.speed > -1){
          $('.speed_controller .axis-select').val(joystick_axis_index.speed);
        }
        if (joystick_axis_invert.speed){
          $('.speed-invert').prop('checked', true);
        } else {
          $('.speed-invert').prop('checked', false);
        }
      } else {
        $('.speed_controller .set_controller').html(gamepads[9].id);
        $('.speed_controller .set_controller').addClass("no_controll");
        $('.speed_controller .axis-setting').hide();
        $('.speed_controller .axis-select').empty();
        $('.speed_controller .axis-select').val('');
        joystick_axis_index.speed = -1;
        joystick_axis_invert.speed = false;
      }

      if (gamepad_conneted.yaw != 9 && gps[gamepad_conneted.yaw]){
        $('.yaw_controller .set_controller').html(gps[gamepad_conneted.yaw].id);
        $('.yaw_controller .set_controller').removeClass("no_controll");
        $('.yaw_controller .axis-setting').show();
        $('.yaw_controller .axis-select').empty();
        $('.yaw_controller .axis-select').append('<option value="" selected></option>');
        for (var i = 0; i < gps[gamepad_conneted.yaw].axes.length; i++){
          var disabled_index_flag = false;
          if (i == joystick_axis_index.yaw){
            disabled_index_flag = true;
          }
          if (i == joystick_axis_index.heading && gamepad_conneted.head == gamepad_conneted.yaw){
            disabled_index_flag = true;
          }
          if (i == joystick_axis_index.speed && gamepad_conneted.speed == gamepad_conneted.yaw){
            disabled_index_flag = true;
          }
          if (i == joystick_axis_index.alt && gamepad_conneted.alt == gamepad_conneted.yaw){
            disabled_index_flag = true;
          }
          if (disabled_index_flag){
            $('.yaw_controller .axis-select').append('<option disabled value="'+ i.toString() +'">Axis ' + i.toString() + '</option>');
          } else {
            $('.yaw_controller .axis-select').append('<option value="'+ i.toString() +'">Axis ' + i.toString() + '</option>');
          }
        }
        if (joystick_axis_index.yaw > -1){
          $('.yaw_controller .axis-select').val(joystick_axis_index.yaw);
        }
        if (joystick_axis_invert.yaw){
          $('.yaw-invert').prop('checked', true);
        } else {
          $('.yaw-invert').prop('checked', false);
        }
      } else {
        $('.yaw_controller .set_controller').html(gamepads[9].id);
        $('.yaw_controller .set_controller').addClass("no_controll");
        $('.yaw_controller .axis-setting').hide();
        $('.yaw_controller .axis-select').empty();
        $('.yaw_controller .axis-select').val('');
        joystick_axis_index.yaw = -1;
        joystick_axis_invert.yaw = false;
      }

      if (gamepad_conneted.head != 9 && gps[gamepad_conneted.head]){
        $('.head_controller .set_controller').html(gps[gamepad_conneted.head].id);
        $('.head_controller .set_controller').removeClass("no_controll");
        $('.head_controller .axis-setting').show();
        $('.head_controller .axis-select').empty();
        $('.head_controller .axis-select').append('<option value="" selected></option>');
        for (var i = 0; i < gps[gamepad_conneted.head].axes.length; i++){
          var disabled_index_flag = false;
          if (i == joystick_axis_index.heading){
            disabled_index_flag = true;
          }
          if (i == joystick_axis_index.yaw && gamepad_conneted.yaw == gamepad_conneted.head){
            disabled_index_flag = true;
          }
          if (i == joystick_axis_index.speed && gamepad_conneted.speed == gamepad_conneted.head){
            disabled_index_flag = true;
          }
          if (i == joystick_axis_index.alt && gamepad_conneted.alt == gamepad_conneted.head){
            disabled_index_flag = true;
          }
          if (disabled_index_flag){
            $('.head_controller .axis-select').append('<option disabled value="'+ i.toString() +'">Axis ' + i.toString() + '</option>');
          } else {
            $('.head_controller .axis-select').append('<option value="'+ i.toString() +'">Axis ' + i.toString() + '</option>');
          }
        }
        if (joystick_axis_index.heading > -1){
          $('.head_controller .axis-select').val(joystick_axis_index.heading);
        }
        if (joystick_axis_invert.heading){
          $('.head-invert').prop('checked', true);
        } else {
          $('.head-invert').prop('checked', false);
        }
      } else {
        $('.head_controller .set_controller').html(gamepads[9].id);
        $('.head_controller .set_controller').addClass("no_controll");
        $('.head_controller .axis-setting').hide();
        $('.head_controller .axis-select').empty();
        $('.head_controller .axis-select').val('');
        joystick_axis_index.heading = -1;
        joystick_axis_invert.heading = false;
      }
    } else {
      gamepad_conneted.alt = gamepads[9].index;
      gamepad_conneted.speed = gamepads[9].index;
      gamepad_conneted.yaw = gamepads[9].index;
      gamepad_conneted.head = gamepads[9].index;

      $('.axis-setting').hide();
      $('.axis-select').val('');
      $('.axis-select').empty();
      $('.axis-setting option').prop('disabled', false);

      document
        .querySelectorAll(".setting_contonller .set_controller")
        .forEach((el) => {
          el.innerHTML = gamepads[9].id;
        });
      document
        .querySelectorAll(".setting_contonller .set_controller")
        .forEach((el) => {
          el.classList.add("no_controll");
        });
    }
  }

  $('#realism_check').prop('checked', true);
  $('#head_trubulence_check').prop('checked', true);
  $('#speed_trubulence_check').prop('checked', true);
  $('#alt_trubulence_check').prop('checked', true);
  if ($('#realism_check').attr('checked')){
    $('#left-letter-big-slide').html('Enabled');
    $('#left-letter-big-slide').css('color', 'white');
    $('#right-letter-big-slide').html('Realism');
    $('#right-letter-big-slide').css('color', 'black');
  } else {
    $('#left-letter-big-slide').html('Realism');
    $('#left-letter-big-slide').css('color', 'black');
    $('#right-letter-big-slide').html('Disabled');
    $('#right-letter-big-slide').css('color', 'white');
  }

  speed_turbulence_flag = true;
  alt_turbulence_flag = true;
  heading_turbulence_flag = true;
  
  realism_flag = true;
  $('.x-coord').html('X:0');
  $('.y-coord').html('Y:0');
  $('.dot').css({'top':'50%', 'left':'50%'});

  showScreen("#logo-screen");
  document.querySelector("#tside .logo-title").innerHTML = String(
    "PFD<span>Legacy</span>"
  );
  document.getElementById("tsider").innerHTML = String("Start of Exam");
  document.getElementById("tsiderx").innerHTML = String("- / -");
  document.querySelector("#start-button").addEventListener(
    "click",
    function () {
      showSecondScreen(false);
    },
    false
  );
  document.querySelector("#train-button").addEventListener(
    "click",
    function () {
      showSecondScreen(true);
    },
    false
  );
  window.addEventListener(
    "gamepadconnected",
    (e) => {
      gamepadHandler(e, true);
    },
    false
  );

  window.addEventListener(
    "gamepaddisconnected",
    (e) => {
      gamepadHandler(e, false);
    },
    false
  );
}

function pollGamepads() {
  const connected_gamepads = navigator.getGamepads();
  if (connected_gamepads && connected_gamepads.length > 0){
    for (let i = 0; i < connected_gamepads.length; i++) {
      if (connected_gamepads[i]) {
          gamepads[i] = connected_gamepads[i];
          $('.coords-container').html(gamepads[i].id + " Pos:");
          //check X move
          var x_axis_value = connected_gamepads[i].axes[0];
          var origin_x = parseInt($('.dot').css('left'));
          if (x_axis_value < -0.05){
            if (origin_x > 10){
              $('.dot').css('left', (origin_x - 1).toString() + 'px');
            }
            
          }
          if (x_axis_value > 0.05){
            if(origin_x < $('.joystick-tester').width() - 10){
              $('.dot').css('left', (origin_x + 1).toString() + 'px');
            }
          }
          //check Y move
          var y_axis_value = connected_gamepads[i].axes[1];
          var origin_y = parseInt($('.dot').css('top'));
          if (y_axis_value < -0.05){
            if (origin_y > 10){
              $('.dot').css('top', (origin_y - 1).toString() + 'px');
            }
          }
          if (y_axis_value > 0.05){
            if (origin_y < $('.joystick-tester').height() - 10){
              $('.dot').css('top', (origin_y + 1).toString() + 'px');
            }
          }
      }
    }
  }
  requestAnimationFrame(pollGamepads);
}

requestAnimationFrame(pollGamepads);

function gamepadHandler(event, connecting) {
  console.log('gamepadHandler', connecting);
  const gamepad = event.gamepad;

  if (connecting) {
    gamepads[gamepad.index] = gamepad;
    console.log('connecting gamepad----------', gamepad);
  } else {
    delete gamepads[gamepad.index];
  }
}
function showSecondScreen(train) {
  showSetting = false;
  trainMode = train;
  if (trainMode) {
    document.querySelector("#title").style = "background-color: #7ad304";
    document.querySelector("#tsider-train").style = "display: flex !important";
    $('.realism-container').show();
  } else {
    $('.realism-container').hide();
  }
  if (trainMode){
    $('#time-screen ul#time-buttons li button').addClass('traing_mode');
  } else {
    $('#time-screen ul#time-buttons li button').removeClass('traing_mode');
  }
  showScreen("#time-screen");
}
$(document).on("click", "#time-screen #time-buttons .time-button", function () {
  totalSec = Number($(this).attr("data-time"));
  createInterface();
});
function createInterface() {
  document.getElementsByTagName("body")[0].style =
    "background-color: #22231f !important";

  showScreen("#main-screen");
  showSetting = true;
  gameCont = new createjs.Container();
  var bmp = addBmp("Fmask", 0, 0, false);

  var maskFillter = new createjs.AlphaMaskFilter(bmp.image);
  gameCont.filters = [maskFillter];
  gameCont.x = 0;
  gameCont.cache(0, 0, 1440, 900);

  stage.addChild(gameCont);

  screenm = new createjs.Bitmap(loader.getResult("ScreenM"));
  screenm.regX = screenm.image.width / 2;
  screenm.regY = screenm.image.height / 2;
  screenm.scaleX = 1.3;
  screenm.scaleY = 1.3;
  screenm.x = 720;
  screenm.y = 250 * 1.3;
  var circle = new createjs.Shape(
    new createjs.Graphics().drawCircle(0, 0, 240)
  );
  circle.x = 720;
  circle.y = 250 * 1.3 - 10;

  screenm.mask = circle;
  gameCont.addChild(screenm);

  crossCont = new createjs.Container();
  crossX = new createjs.Shape();
  crossX.graphics.beginFill("#e022b3");
  crossX.graphics.drawRect(
    centerCross.x - centerCross.w / 2,
    centerCross.y - centerCross.h / 2,
    centerCross.w,
    centerCross.h
  );
  crossX.graphics.endFill();
  crossCont.addChild(crossX);

  crossY = new createjs.Shape();
  crossY.graphics.beginFill("#e022b3");
  crossY.graphics.drawRect(
    centerCross.x - centerCross.h / 2,
    centerCross.y - centerCross.w / 2,
    centerCross.h,
    centerCross.w
  );
  crossY.graphics.endFill();
  crossCont.addChild(crossY);

  crossCont.mask = circle;
  gameCont.addChild(crossCont);

  //load screen front
  screenf = new createjs.Bitmap(loader.getResult("ScreenF"));
  screenf.regX = screenf.image.width / 2;
  screenf.regY = screenf.image.height / 2;
  screenf.scaleX = 1.3;
  screenf.scaleY = 1.3;
  screenf.x = 720;
  screenf.y = 254 * 1.3;
  gameCont.addChild(screenf);

  speed = 230;
  tspeed = 230;
  alt = 6500;
  talt = 6500;
  heading = 180;
  theading = 180;

  tspT = new createjs.Text("230", "26px Open Sans", "#e022b3");
  tspT.x = 410 - 12;
  tspT.y = 25;
  tspT.textAlign = "right";
  gameCont.addChild(tspT);

  taltT = new createjs.Text("6500", "26px Open Sans", "#e022b3");
  taltT.x = 1040;
  taltT.y = 25;
  taltT.textAlign = "left";
  gameCont.addChild(taltT);

  theadT = new createjs.Text("180", "26px Open Sans", "#e022b3");
  theadT.x = 400;
  theadT.y = 720;
  theadT.textAlign = "left";
  gameCont.addChild(theadT);

  speedStatus = false;
  altStatus = false;
  headingStatus = false;
  yawStatus = false;

  errors = 0;
  currentS = 0;
  msec = 0;
  sec = 0;
  totalCount = 0;
  totalScore = 0;
  speed_turbulence_flag = true;
  alt_turbulence_flag = true;
  heading_turbulence_flag = true;
  realism_flag = true;
  initScore();

  length = 0;
  isDone = false;
  relationSpeed = 0.888;

  //speed
  readCont = new createjs.Container();
  var maskv = addBmp("Vmask", 0, 0, false);
  maskv.alpha = 0;
  readCont.addChild(maskv);
  var maskFillter2 = new createjs.AlphaMaskFilter(maskv.image);
  readCont.filters = [maskFillter2];
  readCont.x = 300;
  readCont.y = 60;
  readCont.cache(0, 0, 1440, 900);
  gameCont.addChild(readCont);

  bmp = addBmp("ISpeedBG", 0, 0, false);
  readCont.addChild(bmp);

  speedR = addBmp("ISpeed", 0, 0, false);
  speedR.y = -480;
  readCont.addChild(speedR);

  spIn = new createjs.Container();
  bmp = addBmp("BSarrow", 0, 0, false);
  spIn.addChild(bmp);
  gameCont.addChild(spIn);

  spInst = addBmp("On", 0, 0, false);
  spInst.x = 200;
  spInst.y = 300;
  spInst.cursor = "pointer";
  spInst.name = "in_speed_on";
  spInst.on("click", clickInstrument);
  if (!trainMode) spInst.visible = false;
  gameCont.addChild(spInst);

  speedTarget = addBmp("TSarrow", 82, 248, false);
  readCont.addChild(speedTarget);

  spT = new createjs.Text("310", "32px Open Sans", "#fff");
  spT.x = 18;
  spT.y = 15;
  // spT.textAlign = "center";
  spIn.addChild(spT);
  spIn.x = 410 - 15 - 15 - 100;
  spIn.y = 317 - 58 / 2;

  //alt
  readCont2 = new createjs.Container();
  var maskc = addBmp("Vmask", 0, 0, false);
  maskc.alpha = 0;
  readCont2.addChild(maskc);
  var maskFillter3 = new createjs.AlphaMaskFilter(maskc.image);
  readCont2.filters = [maskFillter3];
  readCont2.x = 1030;
  readCont2.y = 60;
  readCont2.cache(0, 0, 1440, 900);
  gameCont.addChild(readCont2);

  bmp = addBmp("IAltituBG", 10, 0, false);
  readCont2.addChild(bmp);

  altR = addBmp("IAltitu", 10, 0, false);
  altR.y = -3205.25;
  readCont2.addChild(altR);

  altIn = new createjs.Container();
  bmp = addBmp("BAarrow", 10, 0, false);
  altIn.addChild(bmp);
  gameCont.addChild(altIn);

  altInst = addBmp("On", 0, 0, false);
  altInst.x = 1215;
  altInst.y = 300;
  altInst.cursor = "pointer";
  altInst.name = "in_alt_on";
  altInst.on("click", clickInstrument);
  if (!trainMode) altInst.visible = false;
  gameCont.addChild(altInst);

  altTarget = addBmp("TAarrow", 0, 200, false);
  readCont2.addChild(altTarget);

  altT1 = new createjs.Text("7", "46px Open Sans", "#fff");
  altT1.x = 89;
  altT1.y = 13.5;
  altT1.textAlign = "right";
  altIn.addChild(altT1);

  altT2 = new createjs.Text("8", "34px Open Sans", "#fff");
  altT2.x = 90;
  altT2.y = 22;
  altIn.addChild(altT2);

  altT3 = new createjs.Text("60", "28px Open Sans", "#fff");
  altT3.x = 110;
  altT3.y = 8;
  altIn.addChild(altT3);

  altT4 = new createjs.Text("40", "28px Open Sans", "#fff");
  altT4.x = 110;
  altT4.y = 36;
  altIn.addChild(altT4);

  altIn.x = 1030 + 15;
  altIn.y = 317 - 70 / 2;

  //head
  readCont3 = new createjs.Container();
  var maskd = addBmp("Hmask", 0, 0, false);
  maskd.alpha = 0;
  readCont3.addChild(maskd);
  var maskFillter4 = new createjs.AlphaMaskFilter(maskd.image);
  readCont3.filters = [maskFillter4];
  readCont3.x = 400;
  readCont3.y = 600;
  readCont3.cache(0, 0, 1440, 900);
  gameCont.addChild(readCont3);

  bmp = addBmp("IHeadBG", 0, 30, false);
  readCont3.addChild(bmp);

  headR = addBmp("IHead", 0, 30, false);
  headRCont.addChild(headR);
  headRCont.x = -1367;
  readCont3.addChild(headRCont);

  headingIn = new createjs.Container();
  bmp = addBmp("BHarrow", 0, 0, false);
  bmp.regX = bmp.image.width / 2;
  headingIn.addChild(bmp);
  gameCont.addChild(headingIn);

  headInst = addBmp("On", 0, 0, false);
  headInst.x = 1080;
  headInst.y = 650;
  headInst.cursor = "pointer";
  headInst.name = "in_head_on";
  headInst.on("click", clickInstrument);
  if (!trainMode) headInst.visible = false;
  gameCont.addChild(headInst);

  headTarget = addBmp("THarrow", 320, 4, false);
  headTarget.regX = headTarget.image.width / 2;
  readCont3.addChild(headTarget);

  headT = new createjs.Text("180", "26px Open Sans", "#fff");
  headT.x = 0;
  headT.y = -25;
  headT.textAlign = "center";
  // headT.visible = false;
  headingIn.addChild(headT);
  headingIn.x = 720;
  headingIn.y = 600 - 5;

  //yaw
  yaw = 320;

  readCont4 = new createjs.Container();
  var masky = addBmp("BYaw", 0, 0, false);
  readCont4.addChild(masky);
  readCont4.x = 400;
  readCont4.y = 770;
  gameCont.addChild(readCont4);

  yawR = addBmp("Yaw", yaw, 0, false);
  yawR.regX = yawR.image.width / 2;
  readCont4.addChild(yawR);

  yawTarget = addBmp("TYaw", 320, 0, false);
  yawTarget.regX = yawTarget.image.width / 2;
  readCont4.addChild(yawTarget);

  yawInst = addBmp("On", 0, 0, false);
  yawInst.x = 1080;
  yawInst.y = 780;
  yawInst.cursor = "pointer";
  yawInst.name = "in_yaw_on";
  yawInst.on("click", clickInstrument);
  if (!trainMode) yawInst.visible = false;
  gameCont.addChild(yawInst);

  headingAltSpeed();

  isGame = true;
  trackTime = setInterval(keepTime, 1000);

  window.addEventListener("keydown", getKeyDown);
  window.addEventListener("keyup", getKeyUp);

  startMain();
}
function initScore() {
  score = {
    speed: { flag: true, total: 0, correct: 0 },
    alt: { flag: true, total: 0, correct: 0 },
    head: { flag: true, total: 0, correct: 0 },
    yaw: { flag: true, total: 0, correct: 0 },
  };
  total_yaw_aver = 0;
}
function clickInstrument(e) {
  var tname = String(e.target.name);

  if (tname.includes("on")) {
    gameCont.getChildByName(tname).image = loader.getResult("Off");
    var type = tname.slice(0, -3);
    switch (type) {
      case "in_speed":
        score.speed.flag = false;
        tspT.visible = false;
        speedR.visible = false;
        speedTarget.visible = false;
        spT.visible = false;
        break;
      case "in_alt":
        score.alt.flag = false;
        taltT.visible = false;
        altR.visible = false;
        altTarget.visible = false;
        altT1.visible = false;
        altT2.visible = false;
        altT3.visible = false;
        altT4.visible = false;
        break;
      case "in_head":
        score.head.flag = false;
        theadT.visible = false;
        headR.visible = false;
        headTarget.visible = false;
        headT.visible = false;
        break;
      case "in_yaw":
        score.yaw.flag = false;
        yawR.visible = false;
        break;
      default:
        break;
    }
    gameCont.getChildByName(tname).name = type + "_off";
  }
  if (tname.includes("off")) {
    var type = tname.slice(0, -4);
    gameCont.getChildByName(tname).image = loader.getResult("On");
    switch (type) {
      case "in_speed":
        score.speed.flag = true;
        tspT.visible = true;
        speedR.visible = true;
        speedTarget.visible = true;
        spT.visible = true;
        break;
      case "in_alt":
        score.alt.flag = true;
        taltT.visible = true;
        altR.visible = true;
        altTarget.visible = true;
        altT1.visible = true;
        altT2.visible = true;
        altT3.visible = true;
        altT4.visible = true;
        break;
      case "in_head":
        score.head.flag = true;
        theadT.visible = true;
        headR.visible = true;
        headTarget.visible = true;
        headT.visible = true;
        break;
      case "in_yaw":
        score.yaw.flag = true;
        yawR.visible = true;
        break;
      default:
        break;
    }
    gameCont.getChildByName(tname).name = type + "_on";
  }
}
function setAltText(val) {
  var str = String(val);

  var a4 = str.slice(-2);
  var a2 = str.slice(-3, -2);
  var a1 = str.slice(0, -3);
  altT1.text = a1;
  altT2.text = a2;
  var _m = Math.floor(Number(a4) / 20);
  altT3.text = String((_m + 1) * 20).slice(-2);
  altT4.text = _m == 0 ? "00" : String(_m * 20);
}
function keepTime() {
  sec++;
  var rsec = totalSec - sec;
  var tStr = String(Math.floor(rsec / 60) + " mins " + (rsec % 60) + " secs");
  document.getElementById("tsider").innerHTML = String(tStr);

  if (sec % 3 == 1){
    makeTurbulence();
  }
  
  manageTest();
  if (sec > totalSec) {
    clearInterval(trackTime);
    isGame = false;
    sec = 0;
    gameOver();
  }

  randomM = Math.floor(Math.random() * 2);
}

function manageTest() {
  currentS++;

  if (currentS == targetS) {
    calculatePrevious();
  }

  if (currentS > targetS) {
    currentS = 0;
    headingAltSpeed();
  }
  calcYAW();

  document.getElementById("tsiderx").innerHTML = String("Score: " + totalScore);
}
function rotateMidScreen() {
  if (screenm.rotation < -1 * rSpeed || screenm.rotation > rSpeed) {
    headRCont.x += ((9.175 * relationSpeed) / 60) * screenm.rotation * 0.5;

    heading -= (relationSpeed / 60) * screenm.rotation * 0.5;
    if (heading <= 0) heading += 360;
    if (heading >= 360) heading -= 360;

    if (headRCont.x > -25 - headIndex * 3326) {
      headIndex--;
      if (!headRCont.getChildByName("headIndex" + headIndex)) {
        var headR2 = headR.clone();
        headR2.x = headIndex * 3326;
        headR2.name = "headIndex" + headIndex;
        headRCont.addChild(headR2);
      }
    }
    if (headRCont.x < -665 - headIndex * 3326) {
      headIndex++;
      if (!headRCont.getChildByName("headIndex" + headIndex)) {
        var headR2 = headR.clone();
        headR2.x = headIndex * 3326;
        headR2.name = "headIndex" + headIndex;
        headRCont.addChild(headR2);
      }
    }
  }

  if (alt_turbulence_flag){
    var temp_alt = altR.y + alt_turbulence/turblence_steps * 10.43/20;
    if (temp_alt > -5544 && temp_alt < -335){
      alt += alt_turbulence/turblence_steps;
      altR.y = temp_alt;
    }
  }

  if (heading_turbulence_flag){
    var temp_rotation = screenm.rotation + heading_turbulence/turblence_steps;
    if (temp_rotation < 45 && temp_rotation > -45) {
      screenm.rotation = temp_rotation;
    }
  }

  if (rightk || gamepad_rightk || jr_rightk) {
    if (screenm.rotation > -45) {
      screenm.rotation -= rUser * 0.5;
    }
  }
  if (leftk || gamepad_leftk || jr_leftk) {
    if (screenm.rotation < 45) {
      screenm.rotation += rUser * 0.5;
    }
  }
  const rot = (screenm.rotation * Math.PI) / 180;
  if (Math.abs(length) > 1.5 && altR.y > -5544 && altR.y < -335) {
    altR.y -= (((length / 33) * 500) / 60) * relationSpeed * 0.3;
    alt -= (((length / 33) * 500) / 60 / 10.43) * 20 * relationSpeed * 0.3;

    if (realism_flag){
      if (length > 0){
        var temp = speedR.y + speec_change_rate_by_alt * length * 0.9375/0.25;
        if (temp < 0) {
          speed += speec_change_rate_by_alt * length;
          speedR.y = temp;
        }
      }
      if (length < 0){
        temp = speedR.y + speec_change_rate_by_alt * length * 0.9375/0.25;
        if (temp > -970) {
          speed += speec_change_rate_by_alt * length;
          speedR.y = temp;
        }
      }
    }
  }
  if (upk || gamepad_upk || jr_upk) {
    if (altR.y > -5544) {
      if (length < 261) {
        length += upSpeed * 0.3;
      }
    } else {
      altR.y = -5543;
      alt = 2000;
    }
    if (altR.y > -335 && length > 0) {
      altR.y = -336;
      alt = 12000;
    }
  }
  if (downk || gamepad_downk || jr_downk) {
    if (altR.y < -334) {
      if (length > -261) {
        length -= upSpeed * 0.3;
      }
    } else {
      altR.y = -336;
      alt = 12000;
    }
    if (altR.y < -5544 && length < 0) {
      altR.y = -5543;
      alt = 2000;
    }
  }

  screenm.y = 250 * 1.3 - length * Math.cos(rot) * 0.95;
  screenm.x = 720 + length * Math.sin(rot);

  crossX.y = length * -Math.cos(rot);
  crossY.x = length * Math.sin(rot);
}
let cT = null;
function startMain() {
  randomM = 0;

  createjs.Ticker.setFPS(60);
  createjs.Ticker.addEventListener("tick", updateGame);
}
function updateGame(e) {
  const nT = Date.now();
  cT = nT;
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
    rotateMidScreen();
    changeAltitude();
    changeHeading();
    changeYaw();
    moveRightJoystick();
    moveLeftJoystick();
    if (gamepad_conneted.alt != 9) gamepadCheck("alt");
    if (gamepad_conneted.head != 9) gamepadCheck('head');
    if (gamepad_conneted.speed != 9) gamepadCheck("speed");
    if (gamepad_conneted.yaw != 9) gamepadCheck("yaw");
  }
  stage.update();
}
function moveRightJoystick() {
  if (!joyRTimer) {
    joyRTimer = setInterval(function () {
      var dic = JoyRightDiv.GetDir();
      initJoyRightKeyPressed();
      if (dic != "C") {
        switch (dic) {
          case "N":
            jr_upk = true;
            break;
          case "NE":
            jr_upk = true;
            jr_rightk = true;
            break;
          case "E":
            jr_rightk = true;
            break;
          case "SE":
            jr_rightk = true;
            jr_downk = true;
            break;
          case "S":
            jr_downk = true;
            break;
          case "SW":
            jr_downk = true;
            jr_leftk = true;
            break;
          case "W":
            jr_leftk = true;
            break;
          case "NW":
            jr_leftk = true;
            jr_upk = true;
            break;
          default:
            break;
        }
      }
    }, 50);
  }
}
function moveLeftJoystick() {
  if (!joyLTimer) {
    joyLTimer = setInterval(function () {
      var dic = JoyLeftDiv.GetDir();
      initJoyLeftKeyPressed();
      if (dic != "C") {
        switch (dic) {
          case "N":
            jl_upk = true;
            break;
          case "NE":
            jl_upk = true;
            jl_rightk = true;
            break;
          case "E":
            jl_rightk = true;
            break;
          case "SE":
            jl_rightk = true;
            jl_downk = true;
            break;
          case "S":
            jl_downk = true;
            break;
          case "SW":
            jl_downk = true;
            jl_leftk = true;
            break;
          case "W":
            jl_leftk = true;
            break;
          case "NW":
            jl_leftk = true;
            jl_upk = true;
            break;
          default:
            break;
        }
      }
    }, 50);
  }
}

function initJoyRightKeyPressed() {
  jr_upk = false;
  jr_downk = false;
  jr_rightk = false;
  jr_leftk = false;
}
function initJoyLeftKeyPressed() {
  jl_upk = false;
  jl_downk = false;
  jl_rightk = false;
  jl_leftk = false;
}
function gamepadCheck(key) {
  if (gamepad_conneted[key] == 9) return;
  const gp = navigator.getGamepads()[gamepad_conneted[key]];
  if (!gp) return;

  const offsetLeft = gp.axes[0];
  const offsetTop = gp.axes[1];
  if (key == "alt" || key=="head") {
    initUDLRGamepadPressed();
    if (joystick_axis_index.alt > -1){
      if (gp.axes[joystick_axis_index.alt] < -0.05) {
        if (joystick_axis_invert.alt){
          gamepad_downk = true;
        } else {
          gamepad_upk = true;
        }
      } else if (gp.axes[joystick_axis_index.alt] >= -0.05 && gp.axes[joystick_axis_index.alt] <= 0.05) {
      } else {
        if (joystick_axis_invert.alt){
          gamepad_upk = true;
        } else {
          gamepad_downk = true;
        }
      }
    }
    if (joystick_axis_index.heading > -1){
      if (gp.axes[joystick_axis_index.heading] < -0.05) {
        if (joystick_axis_invert.heading){
          gamepad_rightk = true;
        } else {
          gamepad_leftk = true;
        }
      } else if (gp.axes[joystick_axis_index.heading] >= -0.05 && gp.axes[joystick_axis_index.heading] <= 0.05) {
      } else {
        if (joystick_axis_invert.heading){
          gamepad_leftk = true;
        } else {
          gamepad_rightk = true;
        }
      }
    }
  }
  if (key == "speed" || key=="yaw") {
    initASDWGamepadPressed();
    if (joystick_axis_index.speed > -1){
      if (gp.axes[joystick_axis_index.speed] < -0.05) {
        if (joystick_axis_invert.speed){
          gamepad_skey = true;
        } else {
          gamepad_wkey = true;
        }
      }
      if (gp.axes[joystick_axis_index.speed] > 0.05) {
        if (joystick_axis_invert.speed){
          gamepad_wkey = true;
        } else {
          gamepad_skey = true;
        }
      }
    }
    if (joystick_axis_index.yaw > -1){
      
      if (gp.axes[joystick_axis_index.yaw] < -0.05) {
        if (joystick_axis_invert.yaw){
          gamepad_dkey = true;
        } else {
          gamepad_akey = true;
        }
      }
      if (gp.axes[joystick_axis_index.yaw] > 0.05) {
        if (joystick_axis_invert.yaw){
          gamepad_akey = true;
        } else {
          gamepad_dkey = true;
        }
      }
    }
  }
}
function initUDLRGamepadPressed() {
  gamepad_leftk = false;
  gamepad_rightk = false;
  gamepad_upk = false;
  gamepad_downk = false;
}
function initASDWGamepadPressed() {
  gamepad_akey = false;
  gamepad_skey = false;
  gamepad_wkey = false;
  gamepad_dkey = false;
}
function calculatePrevious() {
  proximityCheck("speed", speed, tspeed, 11);
  proximityCheck("head", heading, theading, 6);
  proximityCheck("alt", alt, talt, 50);
  // proximityCheck("yaw", yaw, 320, 10);
}

function makeTurbulence(){
  if (speed_turbulence_flag){
    speed_turbulence = 5 + 10 * Math.random();
    if (Math.random() < 0.5){
      speed_turbulence = -speed_turbulence;
    }
  } else {
    speed_turbulence = 0;
  }

  if (alt_turbulence_flag){
    alt_turbulence = 50 + 200 * Math.random();
    if (Math.random() < 0.5){
      alt_turbulence = -alt_turbulence;
    }
  } else {
    alt_turbulence = 0;
  }
  
  if (heading_turbulence_flag){
    heading_turbulence = 2 + 6 * Math.random();
    if (Math.random() < 0.5){
      heading_turbulence = -heading_turbulence;
    }
  } else {
    heading_turbulence = 0;
  }
}
function changeSpeed() {
  if (speed_turbulence_flag){
    var temp_speed = speedR.y + (speed_turbulence/turblence_steps)* 0.9375/0.25;
    if (temp_speed < 0 && temp_speed > -970) {
      speed += speed_turbulence/turblence_steps;
      speedR.y = temp_speed;
    }
  }
  if (wkey || jl_upk || gamepad_wkey) {
    if (speedR.y < 0) {
      speedR.y += 0.9375;
      speed += 0.25;
    }
  }
  if (skey || jl_downk || gamepad_skey) {
    if (speedR.y > -970) {
      speedR.y -= 0.9375;
      speed -= 0.25;
    }
  }
  if (Math.abs(speed - tspeed) <= 70) {
    speedTarget.y = 248 + (speed - tspeed) * 3.55;
  } else {
    if (speed < tspeed) speedTarget.y = -5;
    else speedTarget.y = 500;
  }
  spT.text = String(Math.floor(speed));
  relationSpeed = ((speed - 90) * 0.375) / 100 + 0.5;
}
function changeAltitude() {
  if (Math.abs(alt - talt) <= 500) {
    altTarget.y = 228 + ((alt - talt) / 20) * 10.43;
  } else {
    if (alt < talt) altTarget.y = -30;
    else altTarget.y = 480;
  }
  setAltText(Math.floor(alt));
}
function changeHeading() {
  if (Math.abs(heading - theading) <= 35) {
    headTarget.x = 320 + (theading - heading) * 9.175;
  } else {
    if (theading < heading) headTarget.x = 0;
    else headTarget.x = 640;
  }
  headT.text = String(Math.floor(heading));
}
function changeYaw() {
  if (
    !akey &&
    !jl_leftk &&
    !dkey &&
    !jl_rightk &&
    !gamepad_akey &&
    !gamepad_dkey
  ) {
    var distance = Math.floor(Math.random() * 5);
    if (randomM) {
      if (yaw + distance > 630) {
        yawR.x -= distance;
        yaw -= distance;
        randomM = 0;
      } else {
        yawR.x += distance;
        yaw += distance;
      }
    } else {
      if (yaw - distance < 10) {
        yawR.x += distance;
        yaw += distance;
        randomM = 1;
      } else {
        yawR.x -= distance;
        yaw -= distance;
      }
    }
  }
  if (akey || jl_leftk || gamepad_akey) {
    if (yawR.x > 10) {
      yawR.x -= 2;
      yaw -= 2;
    }
  }
  if (dkey || jl_rightk || gamepad_dkey) {
    if (yawR.x < 630) {
      yawR.x += 2;
      yaw += 2;
    }
  }
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
  createjs.Sound.stop();
  stage.removeChild(readCont);
  stage.removeChild(readCont2);
  stage.removeChild(readCont3);
  gameCont.removeAllChildren();
  stage.removeChild(gameCont);
  window.removeEventListener("keydown", getKeyDown);
  window.removeEventListener("keyup", getKeyUp);
  showEndScreen();
}
function showEndScreen() {
  document.getElementById("tsider").innerHTML = String("End of Exam");
  let _alt = score.alt.total == 0
            ? 0
            : ((score.alt.correct / score.alt.total) * 100);
  let _speed = score.speed.total == 0
            ? 0
            : ((score.speed.correct / score.speed.total) * 100);
  let _head = score.head.total == 0
            ? 0
            : ((score.head.correct / score.head.total) * 100);
  let _yaw = ((total_yaw_aver / totalSec) * 100);
  let _total = ((_alt + _head + _speed + _yaw) / 4);
  
  $("#result-speed").text(_speed.toFixed(0));
  $("#result-altitude").text(_alt.toFixed(0));
  $("#result-heading").text(_head.toFixed(0));
  $("#result-yaw").text(_yaw.toFixed(0));
  $("#average_accuracy").text(_total.toFixed(0));

  document.getElementsByTagName("body")[0].style = "background-color: white";

  clearInterval(joyRTimer);
  clearInterval(joyLTimer);
  showScreen("#results-screen");
  showSetting = false;
  // saveLoaded();
  insertResults(_total, totalSec);
  stage.update();

  document
    .querySelector("#restart-button")
    .addEventListener("click", startAgain);
}
function startAgain() {
  showStartScreen(restart = true);
}

//save the score
function saveLoaded() {
  //   // Create our XMLHttpRequest object
  //   var hr = new XMLHttpRequest();
  //   var datastring = "";
  var accu = totalCount == 0 ? 0 : ((totalScore / totalCount) * 100).toFixed(0);
  insertResults(accu, totalSec);
  //   datastring += "adjust_errors" + "=" + errors + "&";
  //   datastring += "accuracy" + "=" + accu + "&";
  //   datastring += "duration" + "=" + totalSec;
  //   hr.open("POST", "saveADScore.php");
  //   // Set content type header information for sending url encoded variables in the request
  //   hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
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
    if (gameCont.getChildAt(i).hasEventListener("click")) {
      gameCont.getChildAt(i).removeEventListener("click", selectPlane);
    }
  }
  //gameCont.removeAllChildren();
}

function getKeyUp(e) {
  switch (e.keyCode) {
    case 37:
      leftk = false;
      // headingBack(fieldSky);
      //fieldSky.rotation =0;
      break;
    case 38:
      upk = false;
      // altBack(fieldSky);
      break;
    case 39:
      rightk = false;
      // headingBack(fieldSky);
      //fieldSky.rotation =0;
      break;
    case 40:
      downk = false;
      // altBack(fieldSky);
      //fieldSky.y = 270;
      //  fieldSky.scaleY =1;
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
    case 32:
      spacek = false;
      break;
  }
}
function getKeyDown(e) {
  e.preventDefault();
  switch (e.keyCode) {
    case 32:
      //spacek = true;
      //var ans = String(ansT.text);
      //if(!isDone){
      //  isDone = true;
      //  if(ans != arithAns){
      //    errors++;
      //  }
      //}
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
      //  createjs.Tween.removeAllTweens();
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
}
function setSpeedBug() {
  if (tspeed >= speed) {
    if (tspeed - speed > 70) {
      speedTarget.y = -5;
    } else {
      speedTarget.y = 248 - (tspeed - speed) * 3.55;
    }
  } else {
    if (speed - tspeed > 70) {
      speedTarget.y = 500;
    } else {
      speedTarget.y = 248 + (tspeed - speed) * 3.55;
    }
  }
  score["speed"].total++;
  totalCount++;
}
function setAltBug() {
  if (talt >= alt) {
    if (talt - alt > 500) {
      altTarget.y = -30;
    } else {
      altTarget.y = 228 - ((talt - alt) / 20) * 10.43;
    }
  } else {
    if (alt - talt > 500) {
      altTarget.y = 480;
    } else {
      altTarget.y = 228 + ((talt - alt) / 20) * 10.43;
    }
  }
  score["alt"].total++;
  totalCount++;
}
function setHeadBug() {
  if (theading >= heading) {
    if (theading - heading > 35) {
      headTarget.x = 640;
    } else {
      headTarget.x = 320 + (theading - heading) * 9.175;
    }
  } else {
    if (heading - theading > 35) {
      headTarget.x = 0;
    } else {
      headTarget.x = 320 - (theading - heading) * 9.175;
    }
  }
  score["head"].total++;
  totalCount++;
}

function headingAltSpeed() {
  // set Speed Target
  var isT = false;
  while (!isT) {
    tspeed = Math.floor(Math.random() * 250) + 100;
    if (tspeed % 5 == 0) {
      tspT.text = String(tspeed);
      isT = true;
    }
  }
  setSpeedBug();

  // set Alt Target
  talt = Math.floor(Math.random() * 100) + 20;
  var fstr = String(talt + "00");
  var intr = parseInt(fstr);
  talt = intr;
  taltT.text = String(talt);
  setAltBug();

  // set Heading Target
  var isH = false;
  while (!isH) {
    theading = Math.floor(Math.random() * 360);
    if (theading % 5 == 0) {
      if (theading < 100) {
        theadT.text = "0" + String(theading);
      } else {
        theadT.text = String(theading);
      }
      isH = true;
    }
  }
  setHeadBug();

  // set Yaw Target
  // yaw = Math.floor(Math.random() * 640);
  // yawR.x = yaw;
  // score["yaw"].total++;
  // totalCount++;
}
function calcYAW() {
  var current_yaw_aver = (1 - Math.abs(yaw - 320) / 320);
  total_yaw_aver = (total_yaw_aver + current_yaw_aver);
}
function proximityCheck(key, at, tar, r) {
  if (trainMode && !score[key].flag) return;
  for (var i = 0; i < r; i++) {
    if (
      parseInt(at + i) == parseInt(tar) ||
      parseInt(at - i) == parseInt(tar)
    ) {
      score[key].correct++;
      // if (key != "yaw") {
        // totalCount++;
        totalScore++;
      // }
      return;
    }
  }
  // score[key].total++;
  // if (key != "yaw") totalCount++;
  return;
}

$(document).ready(function () {
  $(".stepper-item").bind("click", function () {
    $(".stepper-item").each((index, el) => {
      if (index <= $(this).index()) {
        $(el).removeClass("active").addClass("completed");
      } else {
        $(el).removeClass("active").removeClass("completed");
      }
    });
    $(this).addClass("active");
    intensity = parseFloat($(this).attr("key"));
    CROSSHAIR_MOVE_INTERVAL = 0.25 / parseFloat($(this).attr("key"));
  });

  $("#logo").click(function () {
    if (!showSetting) return;
    $("#setting").slideDown();
  });

  $("body").click(function (event) {
    if (
      !$(event.target).closest("#setting").length &&
      !$(event.target).closest("#logo").length
    ) {
      $("#setting").slideUp();
    }
  });

  $("#exit_setting").click(function () {
    $("#setting").slideUp();

    document.getElementsByTagName("body")[0].style = "background-color: white";

    clearInterval(joyRTimer);
    clearInterval(joyLTimer);
    clearInterval(trackTime);

    createjs.Tween.removeAllTweens();
    sec = 0;
    createjs.Sound.stop();
    stage.removeChild(readCont);
    stage.removeChild(readCont2);
    stage.removeChild(readCont3);
    gameCont.removeAllChildren();
    stage.removeChild(gameCont);
    window.removeEventListener("keydown", getKeyDown);
    window.removeEventListener("keyup", getKeyUp);

    showStartScreen(true);
  });

  $(".alt_controller button").click(function () {
    if (Object.keys(gamepads).length <= 1) return;

    let right = $(this).attr("class").includes("right");
    let _keys = Object.keys(gamepads);
    var prev_alt_connected_gamepad = gamepad_conneted.alt;
    const isFindKeyIndex = (element) =>
      Number(element) == gamepad_conneted.alt;
    let _next = _keys.findIndex(isFindKeyIndex);
    if (right) {
        _next++;
        if (_next == _keys.length) {
          _next = 0;
        }
    } else {
        _next--;
        if (_next == -1) {
          _next = _keys.length - 1;
        }
    }
    gamepad_conneted.alt = Number(_keys[_next]);
    $(".alt_controller .set_controller").text(
      gamepads[gamepad_conneted.alt].id
    );
    if (gamepad_conneted.alt == 9) {
      $(".alt_controller .set_controller").addClass("no_controll");
      $('.alt_controller > .axis-setting').hide();
      $('.alt_controller .axis-select').empty();
      if (joystick_axis_index.alt > -1 && prev_alt_connected_gamepad != 9){
        $('.axis-select').each((index, el) => {
          if ($(el).attr("class").includes('speed') && gamepad_conneted.speed == prev_alt_connected_gamepad){
            $('option[value="' + (joystick_axis_index.alt).toString() + '"]', $(el)).prop('disabled', false);
          }
          if ($(el).attr("class").includes('yaw') && gamepad_conneted.yaw == prev_alt_connected_gamepad){
            $('option[value="' + (joystick_axis_index.alt).toString() + '"]', $(el)).prop('disabled', false);
          }
          if ($(el).attr("class").includes('head') && gamepad_conneted.head == prev_alt_connected_gamepad){
            $('option[value="' + (joystick_axis_index.alt).toString() + '"]', $(el)).prop('disabled', false);
          }
        })
      }
      joystick_axis_index.alt = -1;
    } else {
      $(".alt_controller .set_controller").removeClass("no_controll");
      $('.alt_controller > .axis-setting').show();
      $('.alt_controller .axis-select').append('<option value="" selected></option>');
      for (var i = 0; i < gamepads[gamepad_conneted.alt].axes.length; i++){
        var disabled_index_flag = false;
        if (i == joystick_axis_index.heading && gamepad_conneted.head == gamepad_conneted.alt){
          disabled_index_flag = true;
        }
        if (i == joystick_axis_index.yaw && gamepad_conneted.yaw == gamepad_conneted.alt){
          disabled_index_flag = true;
        }
        if (i == joystick_axis_index.speed && gamepad_conneted.speed == gamepad_conneted.alt){
          disabled_index_flag = true;
        }
        if (disabled_index_flag){
          $('.alt_controller .axis-select').append('<option disabled value="'+ i.toString() +'">Axis ' + i.toString() + '</option>');
        } else {
          $('.alt_controller .axis-select').append('<option value="'+ i.toString() +'">Axis ' + i.toString() + '</option>');
        }
      }
    }
    localStorage.setItem("gamepad_conneted", JSON.stringify(gamepad_conneted));
  });

  $(".speed_controller button").click(function () {
    if (Object.keys(gamepads).length <= 1) return;

    let right = $(this).attr("class").includes("right");
    let _keys = Object.keys(gamepads);
    var prev_speed_connected_gamepad = gamepad_conneted.speed;
    const isFindKeyIndex = (element) =>
      Number(element) == gamepad_conneted.speed;
    let _next = _keys.findIndex(isFindKeyIndex);
    if (right) {
        _next++;
        if (_next == _keys.length) {
          _next = 0;
        }
    } else {
        _next--;
        if (_next == -1) {
          _next = _keys.length - 1;
        }
    }
    
    gamepad_conneted.speed = Number(_keys[_next]);
    $(".speed_controller .set_controller").text(
      gamepads[gamepad_conneted.speed].id
    );
    if (gamepad_conneted.speed == 9 && prev_speed_connected_gamepad != 9) {
      $(".speed_controller .set_controller").addClass("no_controll");
      $('.speed_controller > .axis-setting').hide();
      $('.speed_controller .axis-select').empty();
      if (joystick_axis_index.speed > -1){
        $('.axis-select').each((index, el) => {
          if ($(el).attr("class").includes('alt') && gamepad_conneted.alt == prev_speed_connected_gamepad){
            $('option[value="' + (joystick_axis_index.speed).toString() + '"]', $(el)).prop('disabled', false);
          }
          if ($(el).attr("class").includes('yaw') && gamepad_conneted.yaw == prev_speed_connected_gamepad){
            $('option[value="' + (joystick_axis_index.speed).toString() + '"]', $(el)).prop('disabled', false);
          }
          if ($(el).attr("class").includes('head') && gamepad_conneted.head == prev_speed_connected_gamepad){
            $('option[value="' + (joystick_axis_index.speed).toString() + '"]', $(el)).prop('disabled', false);
          }
        })
      }
      joystick_axis_index.speed = -1;
    } else {
      $(".speed_controller .set_controller").removeClass("no_controll");
      $('.speed_controller > .axis-setting').show();
      $('.speed_controller .axis-select').append('<option value="" selected></option>');
      for (var i = 0; i < gamepads[gamepad_conneted.speed].axes.length; i++){
        var disabled_index_flag = false;
        if (i == joystick_axis_index.alt && gamepad_conneted.alt == gamepad_conneted.speed){
          disabled_index_flag = true;
        }
        if (i == joystick_axis_index.yaw && gamepad_conneted.yaw == gamepad_conneted.speed){
          disabled_index_flag = true;
        }
        if (i == joystick_axis_index.heading && gamepad_conneted.head == gamepad_conneted.speed){
          disabled_index_flag = true;
        }
        if (disabled_index_flag){
          $('.speed_controller .axis-select').append('<option disabled value="'+ i.toString() +'">Axis ' + i.toString() + '</option>');
        } else {
          $('.speed_controller .axis-select').append('<option value="'+ i.toString() +'">Axis ' + i.toString() + '</option>');
        }
      }
    }
    localStorage.setItem("gamepad_conneted", JSON.stringify(gamepad_conneted));
  });

  $(".head_controller button").click(function () {
    if (Object.keys(gamepads).length <= 1) return;

    let right = $(this).attr("class").includes("right");
    let _keys = Object.keys(gamepads);
    var prev_head_connected_gamepad = gamepad_conneted.head;
    const isFindKeyIndex = (element) =>
      Number(element) == gamepad_conneted.head;
    let _next = _keys.findIndex(isFindKeyIndex);
    if (right) {
        _next++;
        if (_next == _keys.length) {
          _next = 0;
        }
    } else {
        _next--;
        if (_next == -1) {
          _next = _keys.length - 1;
        }
    }

    gamepad_conneted.head = Number(_keys[_next]);
    $(".head_controller .set_controller").text(
      gamepads[gamepad_conneted.head].id
    );
    if (gamepad_conneted.head == 9) {
      $(".head_controller .set_controller").addClass("no_controll");
      $('.head_controller > .axis-setting').hide();
      $('.head_controller .axis-select').empty();
      if (joystick_axis_index.heading > -1 && prev_head_connected_gamepad != 9){
        $('.axis-select').each((index, el) => {
          if ($(el).attr("class").includes('alt') && gamepad_conneted.alt == prev_head_connected_gamepad){
            $('option[value="' + (joystick_axis_index.heading).toString() + '"]', $(el)).prop('disabled', false);
          }
          if ($(el).attr("class").includes('yaw') && gamepad_conneted.yaw == prev_head_connected_gamepad){
            $('option[value="' + (joystick_axis_index.heading).toString() + '"]', $(el)).prop('disabled', false);
          }
          if ($(el).attr("class").includes('speed') && gamepad_conneted.speed == prev_head_connected_gamepad){
            $('option[value="' + (joystick_axis_index.heading).toString() + '"]', $(el)).prop('disabled', false);
          }
        })
      }
      joystick_axis_index.heading = -1;
    } else {
      $(".head_controller .set_controller").removeClass("no_controll");
      $('.head_controller > .axis-setting').show();
      $('.head_controller .axis-select').append('<option value="" selected></option>');
      for (var i = 0; i < gamepads[gamepad_conneted.head].axes.length; i++){
        var disabled_index_flag = false;
        if (i == joystick_axis_index.alt && gamepad_conneted.alt == gamepad_conneted.head){
          disabled_index_flag = true;
        }
        if (i == joystick_axis_index.yaw && gamepad_conneted.yaw == gamepad_conneted.head){
          disabled_index_flag = true;
        }
        if (i == joystick_axis_index.speed && gamepad_conneted.speed == gamepad_conneted.head){
          disabled_index_flag = true;
        }
        if (disabled_index_flag){
          $('.head_controller .axis-select').append('<option disabled value="'+ i.toString() +'">Axis ' + i.toString() + '</option>');
        } else {
          $('.head_controller .axis-select').append('<option value="'+ i.toString() +'">Axis ' + i.toString() + '</option>');
        }
      }
    }
    localStorage.setItem("gamepad_conneted", JSON.stringify(gamepad_conneted));
  });

  $(".yaw_controller button").click(function () {
    if (Object.keys(gamepads).length <= 1) return;

    let right = $(this).attr("class").includes("right");
    var prev_yaw_connected_gamepad = gamepad_conneted.yaw;
    let _keys = Object.keys(gamepads);
    const isFindKeyIndex = (element) =>
      Number(element) == gamepad_conneted.yaw;
    let _next = _keys.findIndex(isFindKeyIndex);
    if (right) {
        _next++;
        if (_next == _keys.length) {
          _next = 0;
        }
    } else {
        _next--;
        if (_next == -1) {
          _next = _keys.length - 1;
        }
    }

    gamepad_conneted.yaw = Number(_keys[_next]);
    $(".yaw_controller .set_controller").text(
      gamepads[gamepad_conneted.yaw].id
    );
    if (gamepad_conneted.yaw == 9) {
      $(".yaw_controller .set_controller").addClass("no_controll");
      $('.yaw_controller > .axis-setting').hide();
      $('.yaw_controller .axis-select').empty();
      if (joystick_axis_index.yaw > -1 && prev_yaw_connected_gamepad != 9){
        $('.axis-select').each((index, el) => {
          if ($(el).attr("class").includes('alt') && gamepad_conneted.alt == prev_yaw_connected_gamepad){
            $('option[value="' + (joystick_axis_index.yaw).toString() + '"]', $(el)).prop('disabled', false);
          }
          if ($(el).attr("class").includes('head') && gamepad_conneted.head == prev_yaw_connected_gamepad){
            $('option[value="' + (joystick_axis_index.yaw).toString() + '"]', $(el)).prop('disabled', false);
          }
          if ($(el).attr("class").includes('speed') && gamepad_conneted.speed == prev_yaw_connected_gamepad){
            $('option[value="' + (joystick_axis_index.yaw).toString() + '"]', $(el)).prop('disabled', false);
          }
        })
      }
      joystick_axis_index.yaw = -1;
    } else {
      $(".yaw_controller .set_controller").removeClass("no_controll");
      $('.yaw_controller > .axis-setting').show();
      $('.yaw_controller .axis-select').append('<option value="" selected></option>');
      for (var i = 0; i < gamepads[gamepad_conneted.yaw].axes.length; i++){
        var disabled_index_flag = false;
        if (i == joystick_axis_index.alt && gamepad_conneted.alt == gamepad_conneted.yaw){
          disabled_index_flag = true;
        }
        if (i == joystick_axis_index.heading && gamepad_conneted.head == gamepad_conneted.yaw){
          disabled_index_flag = true;
        }
        if (i == joystick_axis_index.speed && gamepad_conneted.speed == gamepad_conneted.yaw){
          disabled_index_flag = true;
        }
        if (disabled_index_flag){
          $('.yaw_controller .axis-select').append('<option disabled value="'+ i.toString() +'">Axis ' + i.toString() + '</option>');
        } else {
          $('.yaw_controller .axis-select').append('<option value="'+ i.toString() +'">Axis ' + i.toString() + '</option>');
        }
      }
    }
    localStorage.setItem("gamepad_conneted", JSON.stringify(gamepad_conneted));
  });

  $(".stepper-item").click(function () {
    $(".stepper-item").each((index, el) => {
      if (index <= $(this).index()) {
        $(el).removeClass("active").addClass("completed");
      } else {
        $(el).removeClass("active").removeClass("completed");
      }
    });
    $(this).addClass("active");
    targetS = parseFloat($(this).attr("key"));
  });

  $("#alt_trubulence_check").change(function () {
    alt_turbulence_flag = $(this).prop("checked");
  });
  $("#head_trubulence_check").change(function () {
    heading_turbulence_flag = $(this).prop("checked");
  });
  $("#speed_trubulence_check").change(function () {
    speed_turbulence_flag = $(this).prop("checked");
  });

  $('#realism_check').click(function() {
    realism_flag = $(this).prop("checked");
    if ($(this).attr('checked')){
      $('#left-letter-big-slide').html('Enabled');
      $('#left-letter-big-slide').css('color', 'white');
      $('#right-letter-big-slide').html('Realism');
      $('#right-letter-big-slide').css('color', 'black');
    } else {
      $('#left-letter-big-slide').html('Realism');
      $('#left-letter-big-slide').css('color', 'black');
      $('#right-letter-big-slide').html('Disabled');
      $('#right-letter-big-slide').css('color', 'white');
    }
  })
  $('.axis-select').change(function(){
    let prev_value = "";
    let selcted_axis_value = $(this).val();
    let selected_axis_class = $(this).attr("class");
    if (selected_axis_class.includes("speed")){
      if (joystick_axis_index.speed > -1){
        prev_value = joystick_axis_index.speed;
      }
      joystick_axis_index.speed = selcted_axis_value;
    } else if(selected_axis_class.includes("yaw")){
      if (joystick_axis_index.yaw > -1){
        prev_value = joystick_axis_index.yaw;
      }
      joystick_axis_index.yaw = selcted_axis_value;
    } else if (selected_axis_class.includes("alt")){
      if (joystick_axis_index.alt > -1){
        prev_value = joystick_axis_index.alt;
      }
      joystick_axis_index.alt = selcted_axis_value;
    } else {
      if (joystick_axis_index.heading > -1){
        prev_value = joystick_axis_index.heading;
      }
      joystick_axis_index.heading = selcted_axis_value;
    }
    
    $('.axis-select').each((index, el) => {
      if (selcted_axis_value !== ""){
        $('option[value="' + selcted_axis_value + '"]', $(el)).prop('disabled', true);
      }
      if (prev_value !== '' && prev_value !== selcted_axis_value){
        $('option[value="' + (prev_value).toString() + '"]', $(el)).prop('disabled', false);
      }

      if ($(el).attr("class") == selected_axis_class){
        $(el).val(selcted_axis_value);
      }
    })
    localStorage.setItem("joystick_axis_index", JSON.stringify(joystick_axis_index));
  })

  $('.invert').change(function(){
    let selected_class = $(this).attr("class");
    if (selected_class.includes("speed")){
      joystick_axis_invert.speed = $(this).prop('checked');
      $('.speed-invert').prop('checked', $(this).prop('checked'));
    }
    if (selected_class.includes("yaw")){
      joystick_axis_invert.yaw = $(this).prop('checked');
      $('.yaw-invert').prop('checked', $(this).prop('checked'));
    }
    if (selected_class.includes("alt")){
      joystick_axis_invert.alt = $(this).prop('checked');
      $('.alt-invert').prop('checked', $(this).prop('checked'));
    }
    if (selected_class.includes("head")){
      joystick_axis_invert.heading = $(this).prop('checked');
      $('.head-invert').prop('checked', $(this).prop('checked'));
    }
    localStorage.setItem("joystick_axis_invert", JSON.stringify(joystick_axis_invert));
  })

  $('#setting-button').click(function(){
    $('#settiingModal').fadeIn();
  })
  $(window).click(function(event) {
    if ($(event.target).is("#settiingModal")) {
        $("#settiingModal").fadeOut();
    }
  });
});

function insertResults(score, duration) {
  fetch("/wp-content/plugins/pat/api/insert-result.php", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      score,
      duration,
      mode: trainMode ? "training" : "normal",
    }),
  });
}
