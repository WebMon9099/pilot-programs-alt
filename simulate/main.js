// JavaScript Document
var canvas;
var stage;
var sec = 0;
var loader;
var currentS = 0,
  targetS = 5; //30 headinAltSpeed Normal version

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
var speed, alt, heading;
var tspeed, talt, theading;
var altT, tspT, taltT, theadT, timeT;
var isGame = false;
var gameCont;
var screenm;
var isDone = false;
var speedR, altR, headR;
var score = {
  speed: { flag: false, total: 0, correct: 0 },
  alt: { flag: false, total: 0, correct: 0 },
  head: { flag: false, total: 0, correct: 0 },
  audio: { flag: false, total: 0, correct: 0 },
};
var totalCount,
  totalScore = 0;
var trackTime;
var crossCont, crossX, crossY;

var trainMode = false;

var showSetting = false;
var joyRTimer, joyLTimer;
var JoyRightDiv, JoyLeftDiv;

var relationSpeed = 0.888;

var speed_turbulence_flag = true;
var alt_turbulence_flag = true;
var heading_turbulence_flag = true;
var realism_flag = true;
var artificial_horizon_flag = false;

var speed_turbulence = 0;
var alt_turbulence = 0;
var heading_turbulence = 0;

const turblence_steps = 150;
const speec_change_rate_by_alt = 0.00003;

const gamepads = {
  9: { index: 9, id: "No Controller" },
};
var gamepad_conneted = {
  speed: 9,
  alt:9,
  head:9
};

var joystick_axis_index = {
  speed:-1,
  alt:-1,
  heading:-1
}
var joystick_axis_invert = {
  speed:false,
  alt:false,
  heading:false
}

const meter_width = 300;
const pointer_width = 10;
const bug_width  = 40;
const arrow_length = meter_width/2 - 50;
var spInst, altInst, headInst;
//constant for speed meter
const degree_per_speed = 2.4;
const init_degree = 15;
const min_speed_on_meter = 40;
const max_speed_on_meter = 170;
var speedArrow, compassArrow, altArrow, speedBug, compassBug, altBug, speedMeter, compassMeter, altimeter;
var audio_numbers = [];
var soundInstance;
var throttle = 0.5;
var bankAngle = 0;
var centerCross = {
  x: 1200,
  y: 750,
  w: 150,
  h: 4,
};
//-----------------------------------

function Main() {
  var joyLeftParam = { title: "joystick-left" };
  JoyLeftDiv = new JoyStick("joystick-left-div", joyLeftParam);
  var joyRightParam = { title: "joystick-right" };
  JoyRightDiv = new JoyStick("joystick-right-div", joyRightParam);

  canvas = document.getElementById("test");
  stage = new createjs.Stage(canvas);
  optimizeForTouchAndScreens();
  stage.enableMouseOver(10);
  manifest = [
    { src: "images/mask.png", id: "Fmask" },
    { src: "images/screen_mid.png", id: "ScreenM" },
    { src: "images/on.png", id: "On" },
    { src: "images/off.png", id: "Off" },

    { src: "images/Airspeed.png", id: "Airspeed" },
    { src: "images/AltimeterForegroundAndBackground.png", id: "AltimeterForegroundAndBackground" },
    { src: "images/AltimeterForeground.png", id: "AltimeterForeground" },
    { src: "images/Background.png", id: "Background" },
    { src: "images/Bug.png", id: "Bug" },
    { src: "images/CompassArrow.png", id: "CompassArrow" },
    { src: "images/CompassForeground.png", id: "CompassForeground" },
    { src: "images/DialDisabledIcon.png", id: "DialDisabledIcon" },
    { src: "images/Pointer.png", id: "Pointer" },

    { src: "audio/10.wav", id: "audio_number_10" },
    { src: "audio/11.wav", id: "audio_number_11" },
    { src: "audio/12.wav", id: "audio_number_12" },
    { src: "audio/13.wav", id: "audio_number_13" },
    { src: "audio/14.wav", id: "audio_number_14" },
    { src: "audio/15.wav", id: "audio_number_15" },
    { src: "audio/16.wav", id: "audio_number_16" },
    { src: "audio/17.wav", id: "audio_number_17" },
    { src: "audio/18.wav", id: "audio_number_18" },
    { src: "audio/19.wav", id: "audio_number_19" },

    { src: "audio/20.wav", id: "audio_number_20" },
    { src: "audio/21.wav", id: "audio_number_21" },
    { src: "audio/22.wav", id: "audio_number_22" },
    { src: "audio/23.wav", id: "audio_number_23" },
    { src: "audio/24.wav", id: "audio_number_24" },
    { src: "audio/25.wav", id: "audio_number_25" },
    { src: "audio/26.wav", id: "audio_number_26" },
    { src: "audio/27.wav", id: "audio_number_27" },
    { src: "audio/28.wav", id: "audio_number_28" },
    { src: "audio/29.wav", id: "audio_number_29" },

    { src: "audio/30.wav", id: "audio_number_30" },

    { src: "audio/50.wav", id: "audio_number_50" },
    { src: "audio/51.wav", id: "audio_number_51" },
    { src: "audio/52.wav", id: "audio_number_52" },
    { src: "audio/53.wav", id: "audio_number_53" },
    { src: "audio/54.wav", id: "audio_number_54" },
    { src: "audio/55.wav", id: "audio_number_55" },
    { src: "audio/56.wav", id: "audio_number_56" },
    { src: "audio/57.wav", id: "audio_number_57" },
    { src: "audio/58.wav", id: "audio_number_58" },
    { src: "audio/59.wav", id: "audio_number_59" },

    { src: "audio/60.wav", id: "audio_number_60" },
    { src: "audio/61.wav", id: "audio_number_61" },
    { src: "audio/62.wav", id: "audio_number_62" },
    { src: "audio/63.wav", id: "audio_number_63" },
    { src: "audio/64.wav", id: "audio_number_64" },
    { src: "audio/65.wav", id: "audio_number_65" },
    { src: "audio/66.wav", id: "audio_number_66" },
    { src: "audio/67.wav", id: "audio_number_67" },
    { src: "audio/68.wav", id: "audio_number_68" },
    { src: "audio/69.wav", id: "audio_number_69" },

    { src: "audio/90.wav", id: "audio_number_90" },
    { src: "audio/91.wav", id: "audio_number_91" },
    { src: "audio/92.wav", id: "audio_number_92" },
    { src: "audio/93.wav", id: "audio_number_93" },
    { src: "audio/94.wav", id: "audio_number_94" },
    { src: "audio/95.wav", id: "audio_number_95" },
    { src: "audio/96.wav", id: "audio_number_96" },
    { src: "audio/97.wav", id: "audio_number_97" },
    { src: "audio/98.wav", id: "audio_number_98" },
    { src: "audio/99.wav", id: "audio_number_99" },
  ];

  loader = new createjs.LoadQueue(false);
  loader.installPlugin(createjs.Sound);
  createjs.Sound.alternateExtensions = ["wav"];
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
  $('#artificial_horizon_check').prop('checked', false);
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
  artificial_horizon_flag = false;
  $('.x-coord').html('X:0');
  $('.y-coord').html('Y:0');
  $('.dot').css({'top':'50%', 'left':'50%'});

  showScreen("#logo-screen");
  document.querySelector("#tside .logo-title").innerHTML = String(
    "Simulate<span>Legacy</span>"
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
    "background-color: rgb(239, 239, 239) !important";

  showScreen("#main-screen");
  showSetting = true;

  speed = 100;
  tspeed = 70;
  alt = 6500;
  talt = 3500;
  heading = 100;
  theading = 180;

  gameCont = new createjs.Container();
  var bmp = addBmp("Fmask", 0, 0, false);

  var maskFillter = new createjs.AlphaMaskFilter(bmp.image);
  gameCont.filters = [maskFillter];
  gameCont.x = 0;
  gameCont.cache(0, 0, 1440, 900);

  stage.addChild(gameCont);

  //add speed meter
  speedMeter = new createjs.Bitmap(loader.getResult("Airspeed"));
  speedMeter.scaleX = meter_width/speedMeter.image.naturalWidth;
  speedMeter.scaleY = meter_width/speedMeter.image.naturalWidth;
  speedMeter.x = 5;
  speedMeter.y = 150 * 1.5;
  gameCont.addChild(speedMeter);

  speedArrow = new createjs.Bitmap(loader.getResult("Pointer"));
  speedArrow.scaleX = arrow_length/speedArrow.image.naturalHeight;
  speedArrow.scaleY = arrow_length/speedArrow.image.naturalHeight;
  speedArrow.regX = speedArrow.image.naturalWidth /2;
  speedArrow.regY = 0;
  speedArrow.x = speedMeter.x + meter_width/2;
  speedArrow.y = speedMeter.y + meter_width/2;
  speedArrow.rotation = (speed - min_speed_on_meter) * degree_per_speed + init_degree - 180;
  gameCont.addChild(speedArrow);

  speedBug = new createjs.Bitmap(loader.getResult("Bug"));
  speedBug.scaleX = bug_width/speedBug.image.naturalWidth;
  speedBug.scaleY = bug_width/speedBug.image.naturalWidth;
  speedBug.regX = speedBug.image.naturalWidth /2;
  speedBug.regY = speedBug.image.naturalHeight /2;
  speedBug.rotation = (tspeed - min_speed_on_meter) * degree_per_speed + init_degree - 180;
  speedBug.x = speedMeter.x + meter_width/2 + (arrow_length + 20) * Math.cos((speedBug.rotation + 90) * Math.PI / 180);
  speedBug.y = speedMeter.y + meter_width/2 + (arrow_length + 20) * Math.sin((speedBug.rotation + 90) * Math.PI / 180);
  gameCont.addChild(speedBug);

  spInst = addBmp("On", 0, 0, false);
  spInst.x = speedArrow.x - 25;
  spInst.y = speedArrow.y + meter_width/2 + 10;
  spInst.cursor = "pointer";
  spInst.name = "in_speed_on";
  spInst.on("click", clickInstrument);
  if (!trainMode) spInst.visible = false;
  gameCont.addChild(spInst);

  tspT = new createjs.Text("Maintain " + tspeed + "kt", "20px Open Sans", "#222c33");
  tspT.x = speedArrow.x - 70;
  tspT.y = speedMeter.y - 50;
  tspT.textAlign = "left";
  if (!trainMode) tspT.visible = false;
  gameCont.addChild(tspT);
  //-------------------------

  //add compass meter-------------
  compassMeter = new createjs.Bitmap(loader.getResult("CompassForeground"));
  compassMeter.regX = compassMeter.image.width/2;
  compassMeter.regY = compassMeter.image.height/2;
  compassMeter.scaleX = meter_width/compassMeter.image.width;
  compassMeter.scaleY = meter_width/compassMeter.image.width;
  compassMeter.x = 500 + meter_width/2;
  compassMeter.y = 150 + meter_width/2;
  compassMeter.rotation = heading;
  gameCont.addChild(compassMeter);

  compassArrow = new createjs.Bitmap(loader.getResult("CompassArrow"));
  compassArrow.regX = compassArrow.image.width/2;
  compassArrow.regY = compassArrow.image.height/2;
  compassArrow.scaleX = meter_width/2/compassArrow.image.height;
  compassArrow.scaleY = meter_width/2/compassArrow.image.height;
  compassArrow.x = compassMeter.x;
  compassArrow.y = compassMeter.y;
  gameCont.addChild(compassArrow);

  compassBug = new createjs.Bitmap(loader.getResult("Bug"));
  compassBug.scaleX = bug_width/compassBug.image.naturalWidth;
  compassBug.scaleY = bug_width/compassBug.image.naturalWidth;
  compassBug.regX = compassBug.image.naturalWidth /2;
  compassBug.regY = compassBug.image.naturalHeight /2;
  compassBug.rotation = (theading + heading) - 180;
  compassBug.x = compassMeter.x + (arrow_length + 20) * Math.cos((compassBug.rotation + 90) * Math.PI / 180);
  compassBug.y = compassMeter.y + (arrow_length + 20) * Math.sin((compassBug.rotation + 90) * Math.PI / 180);
  gameCont.addChild(compassBug);

  headInst = addBmp("On", 0, 0, false);
  headInst.x = compassArrow.x - 25;
  headInst.y = compassArrow.y + meter_width/2 + 10;
  headInst.cursor = "pointer";
  headInst.name = "in_head_on";
  headInst.on("click", clickInstrument);
  if (!trainMode) headInst.visible = false;
  gameCont.addChild(headInst);

  theadT = new createjs.Text("Adjust heading to " + (theading/10>0?"0"+theading/10:"00"+theading/10), "20px Open Sans", "#222c33");
  theadT.x = compassArrow.x - 70;
  theadT.y = compassMeter.y - 50 - meter_width/2;
  theadT.textAlign = "left";
  if (!trainMode) theadT.visible = false;
  gameCont.addChild(theadT);
  //-------------------------

  //add altimeter-------------
  altimeter = new createjs.Bitmap(loader.getResult("AltimeterForegroundAndBackground"));
  altimeter.scaleX = meter_width/altimeter.image.width;
  altimeter.scaleY = meter_width/altimeter.image.width;
  altimeter.x = 1000;
  altimeter.y = 150 * 1.5;
  gameCont.addChild(altimeter);

  altArrow = new createjs.Bitmap(loader.getResult("Pointer"));
  altArrow.regX = altArrow.image.naturalWidth /2;
  altArrow.regY = 0;
  altArrow.scaleX = arrow_length/altArrow.image.height;
  altArrow.scaleY = arrow_length/altArrow.image.height;
  altArrow.x = altimeter.x + meter_width/2;
  altArrow.y = altimeter.y + meter_width/2;
  altArrow.rotation = alt/10000 * 360 - 180;
  gameCont.addChild(altArrow);

  altBug = new createjs.Bitmap(loader.getResult("Bug"));
  altBug.scaleX = bug_width/altBug.image.naturalWidth;
  altBug.scaleY = bug_width/altBug.image.naturalWidth;
  altBug.regX = altBug.image.naturalWidth /2;
  altBug.regY = altBug.image.naturalHeight /2;
  altBug.rotation = talt/10000 * 360 - 180;
  altBug.x = altimeter.x + meter_width/2 + (arrow_length + 20) * Math.cos((altBug.rotation + 90) * Math.PI / 180);
  altBug.y = altimeter.y + meter_width/2 + (arrow_length + 20) * Math.sin((altBug.rotation + 90) * Math.PI / 180);
  gameCont.addChild(altBug);

  altInst = addBmp("On", 0, 0, false);
  altInst.x = altArrow.x - 25;
  altInst.y = altArrow.y + meter_width/2 + 10;
  altInst.cursor = "pointer";
  altInst.name = "in_alt_on";
  altInst.on("click", clickInstrument);
  if (!trainMode) altInst.visible = false;
  gameCont.addChild(altInst);

  taltT = new createjs.Text("Maintain " + talt + "m", "20px Open Sans", "#222c33");
  taltT.x = altArrow.x - 70;
  taltT.y = altimeter.y - 50;
  taltT.textAlign = "left";
  if (!trainMode) taltT.visible = false;
  gameCont.addChild(taltT);

  altT = new createjs.Text(alt, "22px Open Sans", "#fff");
  altT.x = altArrow.x;
  altT.y = altimeter.y + meter_width/3 - 10;
  altT.textAlign = "center";
  gameCont.addChild(altT);

  //-------------------------

  //timer part
  var timer_container = new createjs.Container();
  var timerBox = new createjs.Shape();
  timerBox.graphics.beginFill("#222c33");
  timerBox.graphics.drawRect(
    0,
    0,
    200,
    60
  );
  timerBox.graphics.endFill();
  timer_container.addChild(timerBox);

  timeT = new createjs.Text("", "30px Open Sans", "#fff");
  timeT.x = 95;
  timeT.y = 15;
  timeT.textAlign = "center";
  timer_container.addChild(timeT);

  timer_container.x = compassArrow.x - 200/2;
  timer_container.y = canvas.height*3/4 - 60 / 2;

  gameCont.addChild(timer_container);


  screenm = new createjs.Bitmap(loader.getResult("ScreenM"));
  screenm.regX = screenm.image.width / 2;
  screenm.regY = screenm.image.height / 2;
  screenm.scaleX = 0.5;
  screenm.scaleY = 0.5;
  screenm.x = 1200;
  screenm.y = 750 ;
  var circle = new createjs.Shape(
    new createjs.Graphics().drawCircle(0, 0, 120)
  );
  circle.x = 1200;
  circle.y = 750 - 10;

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
  //------------------------------

  currentS = 0;
  msec = 0;
  sec = 0;
  totalCount = 0;
  totalScore = 0;
  speed_turbulence_flag = true;
  alt_turbulence_flag = true;
  heading_turbulence_flag = true;
  realism_flag = true;
  artificial_horizon_flag = false;
  audio_numbers = [];
  initScore();
  
  isDone = false;
  relationSpeed = 0.888;

  headingAltSpeed();
  playAudio();

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
    audio: { flag: true, total: 0, correct: 0 },
  };
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
        speedBug.visible = false;
        speedArrow.visible = false;
        speedMeter.image = loader.getResult('DialDisabledIcon');
        break;
      case "in_alt":
        score.alt.flag = false;
        taltT.visible = false;
        altArrow.visible = false;
        altBug.visible = false;
        altT.visible = false;
        altimeter.image = loader.getResult('DialDisabledIcon');
        break;
      case "in_head":
        score.head.flag = false;
        theadT.visible = false;
        compassArrow.visible = false;
        compassBug.visible = false;
        compassMeter.image = loader.getResult('DialDisabledIcon');
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
        speedBug.visible = true;
        speedArrow.visible = true;
        speedMeter.image = loader.getResult('Airspeed');
        break;
      case "in_alt":
        score.alt.flag = true;
        taltT.visible = true;
        altBug.visible = true;
        altArrow.visible = true;
        altT.visible = true;
        altimeter.image = loader.getResult('AltimeterForegroundAndBackground');
        break;
      case "in_head":
        score.head.flag = true;
        theadT.visible = true;
        compassArrow.visible = true;
        compassBug.visible = true;
        compassMeter.image = loader.getResult('CompassForeground');
        break;
      default:
        break;
    }
    gameCont.getChildByName(tname).name = type + "_on";
  }
}

function keepTime() {
  sec++;
  var rsec = totalSec - sec;
  var tStr = String(Math.floor(rsec / 60) + " mins " + (rsec % 60) + " secs");
  document.getElementById("tsider").innerHTML = String(tStr);

  timeT.text = "0" + String(Math.floor(rsec / 60) + " : " + ((rsec % 60) > 9 ? (rsec % 60) : "0"+(rsec % 60)));

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

  document.getElementById("tsiderx").innerHTML = String("Score: " + totalScore);
}
function updateAirCraft() {
  //chnage speed------------------------------
  const SQUARE_STEP = 1;
  const BAR_HEIGHT = $('.power-setting-area .bar').height();
  const THROTTLE_STEP = 1/(BAR_HEIGHT - $('.square').height());
  const DRAG = Math.pow(speed, 2)/100000;

  if (wkey || jl_upk || gamepad_wkey) {
    if (throttle < 1){
      $('.square').css('top', Math.max($('.square').position().top - SQUARE_STEP, 0));
      throttle = Math.min(1, throttle + THROTTLE_STEP);
    }
  }

  if (skey || jl_downk || gamepad_skey) {
    if (throttle > 0){
      $('.square').css('top',  Math.min($('.square').position().top + SQUARE_STEP, BAR_HEIGHT - $('.square').height()));
      throttle = Math.max(0, throttle - THROTTLE_STEP);
    }
  }

  var temp_speed = speed + (throttle - DRAG);

  if (temp_speed < 170 && temp_speed > 40){
    speed = temp_speed;
    speedArrow.rotation = (speed - min_speed_on_meter) * degree_per_speed + init_degree - 180;
  }

  if (speed_turbulence_flag){
    var temp_speed = speed + speed_turbulence/turblence_steps;
    if (temp_speed > 40 && temp_speed < 170) {
      speed = temp_speed;
      speedArrow.rotation = (speed - min_speed_on_meter) * degree_per_speed + init_degree - 180;
    }
  }
  //------------------------------------------

  if (rightk || gamepad_rightk || jr_rightk) {
    if (bankAngle > -45) {
      bankAngle -= 0.2;
    }
  }
  if (leftk || gamepad_leftk || jr_leftk) {
    if (bankAngle < 45) {
      bankAngle += 0.2;
    }
  }
  if (heading_turbulence_flag){
    var temp_bank = bankAngle + heading_turbulence/turblence_steps;
    if (temp_bank > -45 && temp_bank < 45){
      bank = temp_bank;
    }
  }

  heading += bankAngle/30 * speed/50;
  if (heading < 0) heading += 360;
  if (heading > 360) heading -= 360;
  compassMeter.rotation = heading;
  compassBug.rotation = (theading + heading) - 180;
  updateCompassBugPosition();

  if (upk || gamepad_upk || jr_upk) {
    if (alt < 9900){
      alt += 10;
      if (realism_flag){
        temp_speed = speed - speec_change_rate_by_alt * alt;
        if (temp_speed < 170 && temp_speed > 40){
          speed = temp_speed;
          speedArrow.rotation = (speed - min_speed_on_meter) * degree_per_speed + init_degree - 180;
        }
      }
    }
  }
  if (downk || gamepad_downk || jr_downk) {
    if (alt > 20){
      alt -= 10;
      if (realism_flag){
        temp_speed = speed + speec_change_rate_by_alt * alt;
        if (temp_speed < 170 && temp_speed > 40){
          speed = temp_speed;
          speedArrow.rotation = (speed - min_speed_on_meter) * degree_per_speed + init_degree - 180;
        }
      }
    }
  }

  if (alt_turbulence_flag){
    var temp_alt = alt + alt_turbulence/turblence_steps
    if (temp_alt > 20 && temp_alt < 9900){
      alt = temp_alt;
    }
  }
  altArrow.rotation = alt/10000 * 360 - 180;


  const rot = (bankAngle * Math.PI) / 180;
  screenm.rotation = bankAngle;
  screenm.y = 750 - (alt-5000) * 0.01 * Math.cos(rot) * 0.95;
  screenm.x = 1200 + (alt-5000) * 0.01 * Math.sin(rot);

  crossX.y = (alt-5000) * 0.01 * -Math.cos(rot);
  crossY.x = (alt-5000) * 0.01 * Math.sin(rot);
  screenm.visible = artificial_horizon_flag;
  crossX.visible = artificial_horizon_flag;
  crossY.visible = artificial_horizon_flag;
}
function startMain() {

  createjs.Ticker.setFPS(60);
  createjs.Ticker.addEventListener("tick", updateGame);
}
function updateGame(e) {
  if (isGame) {
    if (gameCont != null) {
      gameCont.updateCache();
    }
    updateAirCraft();
    moveLeftJoystick();
    moveRightJoystick();
    if (gamepad_conneted.alt != 9) gamepadCheck("alt");
    if (gamepad_conneted.head != 9) gamepadCheck('head');
    if (gamepad_conneted.speed != 9) gamepadCheck("speed");
  }
  stage.update();
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
  if (key == "speed") {
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
    heading_turbulence = Math.random();
    if (Math.random() < 0.5){
      heading_turbulence = -heading_turbulence;
    }
  } else {
    heading_turbulence = 0;
  }
}

function gameOver() {
  createjs.Tween.removeAllTweens();
  createjs.Sound.stop();
  gameCont.removeAllChildren();
  stage.removeChild(gameCont);
  window.removeEventListener("keydown", getKeyDown);
  window.removeEventListener("keyup", getKeyUp);
  sec = 0;
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
  let _audio = ((score.audio.correct / score.audio.total) * 100);
  let _total = ((_alt + _head + _speed + _audio) / 4);
  
  $("#result-speed").text(_speed.toFixed(0));
  $("#result-altitude").text(_alt.toFixed(0));
  $("#result-heading").text(_head.toFixed(0));
  $("#result-audio").text(_audio.toFixed(0));
  $("#average_accuracy").text(_total.toFixed(0));

  document.getElementsByTagName("body")[0].style = "background-color: white";

  clearInterval(joyRTimer);
  clearInterval(joyLTimer);
  showScreen("#results-screen");
  showSetting = false;
  insertResults(_total, totalSec);
  stage.update();

  document
    .querySelector("#restart-button")
    .addEventListener("click", startAgain);
}
function startAgain() {
  showStartScreen(restart = true);
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
    case 32:
      spacek = false;
      break;
  }
}
function getKeyDown(e) {
  e.preventDefault();
  switch (e.keyCode) {
    case 32:
      break;
    case 37:
      leftk = true;
      break;
    case 38:
      upk = true;
      //
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
}
function updateSpeedBugPosition() {
  speedBug.x = speedMeter.x + meter_width/2 + (arrow_length + 20) * Math.cos((speedBug.rotation + 90) * Math.PI / 180);
  speedBug.y = speedMeter.y + meter_width/2 + (arrow_length + 20) * Math.sin((speedBug.rotation + 90) * Math.PI / 180);
}
function setSpeedBug() {
  createjs.Tween.get(speedBug, { loop: false })
    .to({ 
      rotation: (tspeed - min_speed_on_meter) * degree_per_speed + init_degree - 180,
    }, 1000, createjs.Ease.linear)
    .addEventListener("change", updateSpeedBugPosition);

  score["speed"].total++;
  totalCount++;
}

function updateAltBugPosition(){
  altBug.x = altimeter.x + meter_width/2 + (arrow_length + 20) * Math.cos((altBug.rotation + 90) * Math.PI / 180);
  altBug.y = altimeter.y + meter_width/2 + (arrow_length + 20) * Math.sin((altBug.rotation + 90) * Math.PI / 180);
}

function setAltBug() {
  createjs.Tween.get(altBug, { loop: false })
    .to({ 
      rotation: talt/10000 * 360 - 180,
    }, 1000, createjs.Ease.linear)
    .addEventListener("change", updateAltBugPosition);

  score["alt"].total++;
  totalCount++;
}
function updateCompassBugPosition(){
  compassBug.x = compassMeter.x + (arrow_length + 20) * Math.cos((compassBug.rotation + 90) * Math.PI / 180);
  compassBug.y = compassMeter.y + (arrow_length + 20) * Math.sin((compassBug.rotation + 90) * Math.PI / 180);
}

function setHeadBug() {
  createjs.Tween.get(compassBug, { loop: false })
    .to({ 
      rotation: (theading + heading) - 180,
    }, 1000, createjs.Ease.linear)
    .addEventListener("change", updateCompassBugPosition);
  score["head"].total++;
  totalCount++;
}

function generateIndex(){ //for avoiding duplicated random index
  let res;
  
  do{
    res = Math.ceil(Math.random() * 80 + 10)
  }while((res > 69 && res < 90) || (res > 30 && res < 50))
  return res;
}

function playAudio(){
  if (totalSec <= sec || sec == 0){
    return;
  }
  var index = generateIndex();
  soundInstance = createjs.Sound.play("audio_number_" + index);
  soundInstance.volume = 1;
  soundInstance.on("complete", () => {
    audio_numbers.push(index);
    if (audio_numbers.length >=3){
      var len = audio_numbers.length;
      if (audio_numbers[len - 1] % 2 == 0 && audio_numbers[len - 2] % 2 == 0 && audio_numbers[len - 3] % 2 == 0){
        score.audio.total++;
      }
      if (audio_numbers[len - 1] % 2 == 1 && audio_numbers[len - 2] % 2 == 1 && audio_numbers[len - 3] % 2 == 1){
        score.audio.total++;
      }
    }
    setTimeout(() => {
      playAudio();  
    }, 1000);
  });
}

function headingAltSpeed() {
  // set Speed Target
  var isT = false;
  while (!isT) {
    tspeed = Math.floor(Math.random() * 170) + 40;
    if (tspeed % 5 == 0 && tspeed < 170) {
      tspT.text = "Maintain " + String(tspeed) + "kt";
      isT = true;
    }
  }
  setSpeedBug();

  // set Alt Target
  talt = Math.floor(Math.random() * 100) + 20;
  var fstr = String(talt + "00");
  var intr = parseInt(fstr);
  talt = intr;
  taltT.text = "Maintain " + String(talt) + "m";
  setAltBug();

  // set Heading Target
  var isH = false;
  while (!isH) {
    theading = Math.floor(Math.random() * 360);
    if (theading % 5 == 0) {
      if (theading < 100) {
        theadT.text = "Adjust heading to " + "00" + String(parseInt(theading/10));
      } else {
        theadT.text = "Adjust heading to " + "0" + String(parseInt(theading/10));
      }
      isH = true;
    }
  }
  setHeadBug();
}

function proximityCheck(key, at, tar, r) {
  if (trainMode && !score[key].flag) return;
  for (var i = 0; i < r; i++) {
    if (
      parseInt(at + i) == parseInt(tar) ||
      parseInt(at - i) == parseInt(tar)
    ) {
      score[key].correct++;
      totalScore++;
      return;
    }
  }
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
  $('#artificial_horizon_check').click(function() {
    artificial_horizon_flag = $(this).prop('checked');
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
  const SQUARE_STEP = 1;
  const BAR_HEIGHT = $('.power-setting-area .bar').height();
  const THROTTLE_STEP = 1/(BAR_HEIGHT - $('.square').height());
  $('.decrease').click(function(){
    $('.square').css('top',  Math.min($('.square').position().top + SQUARE_STEP, BAR_HEIGHT - $('.square').height()));
    throttle = Math.max(0, throttle - THROTTLE_STEP);
  })
  $('.increase').click(function(){
    $('.square').css('top', Math.max($('.square').position().top - SQUARE_STEP, 0));
    throttle = Math.min(1, throttle + THROTTLE_STEP);
  })

  $('#red-btn').click(function(){
    var len = audio_numbers.length;
    if (audio_numbers[len - 1] % 2 == 1 && audio_numbers[len - 2] % 2 == 1 && audio_numbers[len - 3] % 2 == 1){
      score.audio.correct++;
      totalScore++;
    }
  })
  $('#blue-btn').click(function(){
    var len = audio_numbers.length;
    if (audio_numbers[len - 1] % 2 == 0 && audio_numbers[len - 2] % 2 == 0 && audio_numbers[len - 3] % 2 == 0){
      score.audio.correct++;
      totalScore++;
    }
  })
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
