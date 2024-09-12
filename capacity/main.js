// JavaScript Document
var canvas;
var stage;
var sec = 0;
var loader;
var currentS = 0,
  targetS = 60; //30 headinAltSpeed Normal version

var totalSec = 300;
var isGame = false;
var gameCont;
var manageScr;
var isDone = false;
var score = {
  nav: { flag: false, total: 0, correct: 0 },
  fuel: { flag: false, total: 0, correct: 0 },
  elec: { flag: false, total: 0, correct: 0 },
  freq: { flag: false, total: 0, correct: 0 },
  tcas: { flag: false, total: 0, correct: 0 },
};
var totalCount = 0,
  totalScore = 0;
var errors = 0;
var trackTime;
var tolernace = -1;
const ro_tolerance_range = [50, 200, 500];
const trk_tolerance_range = [0.5, 1, 3];
var intensity = 1;

// Duration for Per Task
const timeChecklist = 30,
  timeAir = 25,
  timeForStandPump = 20,
  targetFuelTime = 40,
  targetROTime = 20,
  targetRadioTime = 15,
  targetNavTime = 15,
  targetWayTime = 13;
var targetAudioTime = 30;
// Timer for per Task
var timeCounterChecklist = 0,
  timeCounterAir = 0,
  timeCounterFuel = 0,
  timeCounterLSPump = 0,
  timeCounterRSPump = 0,
  timeCounterRO = 0,
  timeCounterCurrentTask = 0;
var trainMode = false;
var random_mode = true;
var showSetting = false;
// Start time
var startHour = "00";
// Question Type
var qType = "";
// Air
var airList = {};
var airNumber = 0;
// Value
var radio = 125,
  freq = 500;

// Left Rect
var rectCont; // for Mask
var orderT, timeT, waypointT, radioT, freqT;
// Waypoint
var wayAirCont, wayAirT, wayAirLine;
// Right Rect
var cautionCont, warningCont, navCont, elecCont, fuelCont, freqCont;
var BtnCaution, BtnWarning, BtnNav, BtnElec, BtnFuel;
var checklistCont;
// Fuel Cont
var LMPumpCont, RMPumpCont, LSPumpCont, RSPumpCont, BtnPhoto;
var LMPumpImg, RMPumpImg, LSPumpImg, RSPumpImg;
var startPump = false;
// NAV Cont
var wayCont, waypointCont, BtnWaypoint, currentWaypointT;
var currentWaypoint = "EVY";
// Checklist
var tempChecklist = [];
var findex = -1,
  correctChecklistSelection = true;
var startChecklist = false;
// Fuel
const increaseMPump = 0.5,
  decreaseLHPump = 0.15,
  decreaseRHPump = 0.2,
  increaseSPump = 0.5;
var usingLMPump = true,
  usingRMPump = true,
  LMPumpStatus = "ON";
var usingLSPump = false,
  usingRSPump = false,
  RMPumpStatus = "ON";
var countingFuel = false,
  initFuel = true;
var playedCaution = false;
var movedGreenByLSpump = false,
  movedGreenByRSpump = false;
var canUseLSpump = false,
  canUseRSpump = false;
// Caution
var activeCaution = false;
// Altitude
var activeAltitude = false;
var altCont,
  altitudeT,
  currentAltitude = "29000",
  targetAlt = 0,
  oldAltitude = "29000";
// ROC / ROD
var activeRO = false;
var ROCont,
  ROT,
  currentRO = "0",
  targetRO = 0,
  oldRO = "0";
var activeTrk = false;
var TRKcont, TRK, currentTRK = "0", oldTRK="0", targetTRK=0;
// Current Question and Answer
var currentQuestion, currentAnswer, newAltitude;
// Playing Audio
var playingAudio = false;
// Gameplay mode
var gamePaused = false;
const isSafari = platform.name.toLowerCase() == "safari";

var oldData = {
  freq: null,
  alt: null,
  ro: null,
  way: null,
  trk:null,
};
var r_l = -1;
var touchedPhotoButton = false;
var playedCautionForSpump = false;

const real_scenario_numbers = 5;
var selected_real_scenaario_index = 0;
var real_question_index = 0;
var real_question_interval = 0;
var real_question_in_progress = false;
var question_during_flag = false;
var keyboard_flag = false;

function Main() {
  canvas = document.getElementById("test");
  stage = new createjs.Stage(canvas);
  optimizeForTouchAndScreens();
  stage.enableMouseOver(10);
  manifest = [
    { src: "images/PAT_exam_logo.png", id: "Tlogo" },
    { src: "images/screen_left.png", id: "ScreenL" },
    { src: "images/screen_right.png", id: "ScreenR" },
    { src: "images/up_button.png", id: "Bup" },
    { src: "images/up_button_hover.png", id: "HBup" },
    { src: "images/down_button.png", id: "Bdown" },
    { src: "images/down_button_hover.png", id: "HBdown" },
    { src: "images/diamond.png", id: "Nair" },
    { src: "images/diamond_selected.png", id: "Fair" },
    { src: "images/blue.png", id: "Bblue" },
    { src: "images/blue_hover.png", id: "HBblue" },
    { src: "images/grey.png", id: "Bgrey" },
    { src: "images/grey_hover.png", id: "HBgrey" },
    { src: "images/black.png", id: "Bblack" },
    { src: "images/black_hover.png", id: "HBblack" },
    { src: "images/black_active.png", id: "ABblack" },
    { src: "images/caution.png", id: "Bcaution" },
    { src: "images/caution_active.png", id: "ABcaution" },
    { src: "images/warning.png", id: "Bwarning" },
    { src: "images/warning_active.png", id: "ABwarning" },
    { src: "images/checklist_system.png", id: "Checklist" },
    { src: "images/checklist_container.png", id: "ChecklistBG" },
    { src: "images/fuel_dial.png", id: "Fuel" },
    { src: "images/fuel_pointer.png", id: "Fuelpoint" },
    { src: "images/nav_parameter_container.png", id: "Nav" },
    { src: "images/waypoint.png", id: "Wayplus" },
    { src: "images/wayline.png", id: "Wayline" },
    { src: "images/waypoint_dropdown.png", id: "Waydrop" },
    { src: "images/camera.png", id: "Bcamera" },
    { src: "images/camera_active.png", id: "ABcamera" },
    { src: "images/mask.png", id: "Mask" },
    { src: "images/dot.png", id: "Dot" },
    { src: "audio/Frequency/131_450.wav", id: "131_450" },
    { src: "audio/Frequency/130_350.wav", id: "130_350" },
    { src: "audio/Frequency/129_950.wav", id: "129_950" },
    { src: "audio/Frequency/128_850.wav", id: "128_850" },
    { src: "audio/Frequency/127_750.wav", id: "127_750" },
    { src: "audio/Frequency/126_650.wav", id: "126_650" },
    { src: "audio/Frequency/125_550.wav", id: "125_550" },
    { src: "audio/Frequency/124_450.wav", id: "124_450" },
    { src: "audio/Frequency/123_350.wav", id: "123_350" },
    { src: "audio/Waypoints/AWI.wav", id: "AWI" },
    { src: "audio/Waypoints/AER.wav", id: "AER" },
    { src: "audio/Waypoints/BAQ.wav", id: "BAQ" },
    { src: "audio/Waypoints/CEF.wav", id: "CEF" },
    { src: "audio/Waypoints/DGF.wav", id: "DGF" },
    { src: "audio/Waypoints/EVY.wav", id: "EVY" },
    { src: "audio/Waypoints/FGH.wav", id: "FGH" },
    { src: "audio/Waypoints/GYR.wav", id: "GYR" },
    { src: "audio/Waypoints/HLO.wav", id: "HLO" },
    { src: "audio/Waypoints/ITE.wav", id: "ITE" },
    { src: "audio/Waypoints/JAS.wav", id: "JAS" },
    { src: "audio/Altitudes/climb_35000.wav", id: "climb_35000" },
    { src: "audio/Altitudes/descend_35000.wav", id: "descend_35000" },
    { src: "audio/Altitudes/climb_32000.wav", id: "climb_32000" },
    { src: "audio/Altitudes/descend_32000.wav", id: "descend_32000" },
    { src: "audio/Altitudes/climb_30000.wav", id: "climb_30000" },
    { src: "audio/Altitudes/descend_30000.wav", id: "descend_30000" },
    { src: "audio/Altitudes/climb_27000.wav", id: "climb_27000" },
    { src: "audio/Altitudes/descend_27000.wav", id: "descend_27000" },
    { src: "audio/Altitudes/climb_25000.wav", id: "climb_25000" },
    { src: "audio/Altitudes/descend_25000.wav", id: "descend_25000" },
    { src: "audio/Altitudes/climb_23000.wav", id: "climb_23000" },
    { src: "audio/Altitudes/descend_23000.wav", id: "descend_23000" },
    { src: "audio/RO/rod_24000_2m.wav", id: "rod_24000_2m" },
    { src: "audio/RO/roc_24000_2m.wav", id: "roc_24000_2m" },
    { src: "audio/RO/rod_26000_3m.wav", id: "rod_26000_3m" },
    { src: "audio/RO/roc_26000_3m.wav", id: "roc_26000_3m" },
    { src: "audio/RO/rod_28000_2m.wav", id: "rod_28000_2m" },
    { src: "audio/RO/roc_28000_2m.wav", id: "roc_28000_2m" },
    { src: "audio/RO/rod_31000_1m30s.wav", id: "rod_31000_1m30s" },
    { src: "audio/RO/roc_31000_1m30s.wav", id: "roc_31000_1m30s" },
    { src: "audio/RO/rod_33000_2m30s.wav", id: "rod_33000_2m30s" },
    { src: "audio/RO/roc_33000_2m30s.wav", id: "roc_33000_2m30s" },
    { src: "audio/RO/rod_36000_3m30s.wav", id: "rod_36000_3m30s" },
    { src: "audio/RO/roc_36000_3m30s.wav", id: "roc_36000_3m30s" },
    { src: "audio/warning.wav", id: "Warning" },
    { src: "audio/caution.wav", id: "Caution" },
    { src: "audio/traffic.wav", id: "Traffic" },
    { src: "audio/camera.mp3", id: "Camera" },
    { src: "audio/snapshot_warning_1.wav", id: "Snapshot0" },
    { src: "audio/snapshot_warning_2.wav", id: "Snapshot1" },
    { src: "audio/snapshot_warning_3.wav", id: "Snapshot2" },

    { src: "audio/real/a1.wav", id: "a1" },
    { src: "audio/real/a2.wav", id: "a2" },
    { src: "audio/real/a3.wav", id: "a3" },
    { src: "audio/real/a4.wav", id: "a4" },
    { src: "audio/real/a5.wav", id: "a5" },
    { src: "audio/real/a6.wav", id: "a6" },
    { src: "audio/real/a7.wav", id: "a7" },
    { src: "audio/real/a8.wav", id: "a8" },
    { src: "audio/real/a9.wav", id: "a9" },
    { src: "audio/real/a10.wav", id: "a10" },
    { src: "audio/real/a11.wav", id: "a11" },
    { src: "audio/real/a12.wav", id: "a12" },
    { src: "audio/real/a13.wav", id: "a13" },
    { src: "audio/real/a14.wav", id: "a14" },
    { src: "audio/real/a15.wav", id: "a15" },
    { src: "audio/real/b1.wav", id: "b1" },
    { src: "audio/real/b2.wav", id: "b2" },
    { src: "audio/real/b3.wav", id: "b3" },
    { src: "audio/real/b4.wav", id: "b4" },
    { src: "audio/real/b5.wav", id: "b5" },
    { src: "audio/real/b6.wav", id: "b6" },
    { src: "audio/real/b7.wav", id: "b7" },
    { src: "audio/real/b8.wav", id: "b8" },
    { src: "audio/real/b9.wav", id: "b9" },
    { src: "audio/real/b10.wav", id: "b10" },
    { src: "audio/real/b11.wav", id: "b11" },
    { src: "audio/real/b12.wav", id: "b12" },
    { src: "audio/real/b13.wav", id: "b13" },
    { src: "audio/real/b14.wav", id: "b14" },
    { src: "audio/real/b15.wav", id: "b15" },
    { src: "audio/real/c1.wav", id: "c1" },
    { src: "audio/real/c2.wav", id: "c2" },
    { src: "audio/real/c3.wav", id: "c3" },
    { src: "audio/real/c4.wav", id: "c4" },
    { src: "audio/real/c5.wav", id: "c5" },
    { src: "audio/real/c6.wav", id: "c6" },
    { src: "audio/real/c7.wav", id: "c7" },
    { src: "audio/real/c8.wav", id: "c8" },
    { src: "audio/real/c9.wav", id: "c9" },
    { src: "audio/real/c10.wav", id: "c10" },
    { src: "audio/real/c11.wav", id: "c11" },
    { src: "audio/real/c12.wav", id: "c12" },
    { src: "audio/real/c13.wav", id: "c13" },
    { src: "audio/real/c14.wav", id: "c14" },
    { src: "audio/real/c15.wav", id: "c15" },
    { src: "audio/real/d1.wav", id: "d1" },
    { src: "audio/real/d2.wav", id: "d2" },
    { src: "audio/real/d3.wav", id: "d3" },
    { src: "audio/real/d4.wav", id: "d4" },
    { src: "audio/real/d5.wav", id: "d5" },
    { src: "audio/real/d6.wav", id: "d6" },
    { src: "audio/real/d7.wav", id: "d7" },
    { src: "audio/real/d8.wav", id: "d8" },
    { src: "audio/real/d9.wav", id: "d9" },
    { src: "audio/real/d10.wav", id: "d10" },
    { src: "audio/real/d11.wav", id: "d11" },
    { src: "audio/real/d12.wav", id: "d12" },
    { src: "audio/real/d13.wav", id: "d13" },
    { src: "audio/real/d14.wav", id: "d14" },
    { src: "audio/real/d15.wav", id: "d15" },
    { src: "audio/real/e1.wav", id: "e1" },
    { src: "audio/real/e2.wav", id: "e2" },
    { src: "audio/real/e3.wav", id: "e3" },
    { src: "audio/real/e4.wav", id: "e4" },
    { src: "audio/real/e5.wav", id: "e5" },
    { src: "audio/real/e6.wav", id: "e6" },
    { src: "audio/real/e7.wav", id: "e7" },
    { src: "audio/real/e8.wav", id: "e8" },
    { src: "audio/real/e9.wav", id: "e9" },
    { src: "audio/real/e10.wav", id: "e10" },
    { src: "audio/real/e11.wav", id: "e11" },
    { src: "audio/real/e12.wav", id: "e12" },
    { src: "audio/real/e13.wav", id: "e13" },
    { src: "audio/real/e14.wav", id: "e14" },
    { src: "audio/real/e15.wav", id: "e15" },

    { src: "audio/trk/RanTrk1.wav", id: "RanTrk1" },
    { src: "audio/trk/RanTrk2.wav", id: "RanTrk2" },
    { src: "audio/trk/RanTrk3.wav", id: "RanTrk3" },
    { src: "audio/trk/RanTrk4.wav", id: "RanTrk4" },
    { src: "audio/trk/RanTrk5.wav", id: "RanTrk5" },
    { src: "audio/trk/RanTrk6.wav", id: "RanTrk6" },
    { src: "audio/trk/RanTrk7.wav", id: "RanTrk7" },
    { src: "audio/trk/RanTrk8.wav", id: "RanTrk8" },
    { src: "audio/trk/RanTrk9.wav", id: "RanTrk9" },
    { src: "audio/trk/RanTrk10.wav", id: "RanTrk10" },
    { src: "audio/trk/RanTrk11.wav", id: "RanTrk11" },
    { src: "audio/trk/RanTrk12.wav", id: "RanTrk12" },
    { src: "audio/trk/RanTrk13.wav", id: "RanTrk13" },
    { src: "audio/trk/RanTrk14.wav", id: "RanTrk14" },

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
}
function showStartScreen() {
  initScore();
  showSetting = false;
  trainMode = false;
  gamePaused = false;
  $("#gamepause").hide();
  document.querySelector("#title").style = "background-color: #3793d1";
  document.querySelector("#tsider-train").style = "display: none !important";

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

  showScreen("#logo-screen");
  document.querySelector("#tside .logo-title").innerHTML = String("Capacity");
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
}
function showSecondScreen(train) {
  showSetting = false;
  trainMode = train;
  if (trainMode) {
    document.querySelector("#title").style = "background-color: #7ad304";
    document.querySelector("#tsider-train").style = "display: flex !important";
    $(".setting_title").show();
    $(".setting_contonller").show();
    // playpause button
    $(".playpause").css("background-image", "url(./images/playpause.svg)");
    gamePaused = false;
  } else {
    $(".setting_title").hide();
    $(".setting_contonller").hide();
  }
  showScreen('#mode-screen');
  
  if (trainMode){
    $('.most-popular-time-btn-area').css('background', '#7AD44A');
    $('#time-screen ul#time-buttons li button').addClass('traing_mode');
    $('.mode-group').addClass('traing_mode');
  } else {
    $('.most-popular-time-btn-area').css('background', '#63C3E5');
    $('#time-screen ul#time-buttons li button').removeClass('traing_mode');
    $('.mode-group').removeClass('traing_mode');
  }
}
$(document).on('click', ".mode-group", function(){
  if ($(this).hasClass('random_mode')){
    random_mode = true;
  } else {
    random_mode = false;
  }
  showScreen("#time-screen");
})
$(document).on("click", "#time-screen #time-buttons .time-button", function () {
  totalSec = Number($(this).attr("data-time"));
  if (random_mode == false){
    selected_real_scenaario_index = Math.floor(Math.random() * real_scenario_numbers);
    real_question_index = 0;
    real_question_interval = totalSec / 15;
    real_question_in_progress = true;
    currentAltitude = "43000";
    oldAltitude = "43000";
  }
  createInterface();
});
function createInterface() {
  showScreen("#main-screen");
  showSetting = true;
  gameCont = new createjs.Container();
  stage.addChild(gameCont);
  // Order Text
  orderT = new createjs.Text(
    "",
    "30px Inter",
    "#3f3f3f"
  );
  orderT.x = 720;
  orderT.y = isSafari ? -5 : 0;
  orderT.textAlign = "center";
  orderT.lineHeight = 50;
  gameCont.addChild(orderT);

  // Left Plane
  rectCont = new createjs.Container();
  // Mask for Aircraft
  var mask = addBmp("Mask", 0, 0, false);
  mask.scaleX = 0.85;
  mask.scaleY = 0.85;
  mask.alpha = 0;
  rectCont.addChild(mask);
  var maskFillter = new createjs.AlphaMaskFilter(mask.image);
  rectCont.filters = [maskFillter];
  rectCont.x = 38;
  rectCont.y = 185;
  rectCont.cache(0, 0, mask.image.width * 0.85, mask.image.height * 0.85);

  var rect1 = new createjs.Container();
  var bmp = addBmp("ScreenL", 0, 0, false);
  bmp.scaleX = 0.85;
  bmp.scaleY = 0.85;
  rect1.x = 720 - 50 - bmp.image.width * 0.85;
  rect1.y = 130;
  rect1.addChild(bmp);
  rect1.addChild(rectCont);
  // Waypoint
  wayAirCont = new createjs.Container();
  wayAirCont.regX = 6;
  wayAirCont.x = 285;
  wayAirCont.y = 0;
  wayAirCont.name = "wayaircont";
  wayAirCont.visible = false;
  rectCont.addChild(wayAirCont);

  bmp = addBmp("Wayplus", 0, 0, false);
  bmp.name = "wayair";
  wayAirCont.addChild(bmp);

  wayAirT = new createjs.Text(currentWaypoint, "18px Open Sans", "#ffffff");
  wayAirT.x = 25;
  wayAirT.y = 2;
  wayAirCont.addChild(wayAirT);

  wayAirLine = addBmp("Wayline", 288, 18, false);
  wayAirLine.visible = false;
  rectCont.addChild(wayAirLine);

  generateAir();

  // Time Text
  timeT = new createjs.Text("16 : 38 : 07", "24px Open Sans", "#FFFFFF");
  timeT.x = 55;
  timeT.y = 170;
  timeT.textAlign = "left";
  rect1.addChild(timeT);

  // Waypoint Text
  waypointT = new createjs.Text(
    "FL" + String(currentAltitude).slice(0, -2),
    "24px Open Sans",
    "#FFFFFF"
  );
  waypointT.x = 590;
  waypointT.y = 170;
  waypointT.textAlign = "right";
  rect1.addChild(waypointT);

  // Frequency Container
  freqCont = new createjs.Container();

  bmp = addBmp("Bup", 80, 35, false);
  bmp.cursor = "pointer";
  bmp.name = "up_radio";
  bmp.on("mousedown", pressDown);
  bmp.on("pressup", pressUp);
  bmp.on("click", clickFreqButton);
  bmp.addEventListener("mouseover", mouseOverButton);
  bmp.addEventListener("mouseout", mouseOutButton);
  freqCont.addChild(bmp);

  bmp = addBmp("Bdown", 80, 80, false);
  bmp.cursor = "pointer";
  bmp.name = "down_radio";
  bmp.on("mousedown", pressDown);
  bmp.on("pressup", pressUp);
  bmp.on("click", clickFreqButton);
  bmp.addEventListener("mouseover", mouseOverButton);
  bmp.addEventListener("mouseout", mouseOutButton);
  freqCont.addChild(bmp);

  radioT = new createjs.Text(radio, "24px Open Sans", "#DDDDDD");
  radioT.x = 175;
  radioT.y = isSafari ? 55 : 61;
  radioT.textAlign = "center";
  freqCont.addChild(radioT);

  var txt = new createjs.Text(".", "24px Open Sans", "#DDDDDD");
  txt.x = 207;
  txt.y = isSafari ? 55 : 63;
  freqCont.addChild(txt);

  freqT = new createjs.Text(freq, "24px Open Sans", "#DDDDDD");
  freqT.x = 245;
  freqT.y = isSafari ? 55 : 61;
  freqT.textAlign = "center";
  freqCont.addChild(freqT);

  txt = new createjs.Text("MHz", "18px Open Sans", "#DDDDDD");
  txt.x = 278;
  txt.y = isSafari ? 61 : 67;
  freqCont.addChild(txt);

  bmp = addBmp("Bup", 320, 35, false);
  bmp.cursor = "pointer";
  bmp.name = "up_freq";
  bmp.on("mousedown", pressDown);
  bmp.on("pressup", pressUp);
  bmp.on("click", clickFreqButton);
  bmp.addEventListener("mouseover", mouseOverButton);
  bmp.addEventListener("mouseout", mouseOutButton);
  freqCont.addChild(bmp);

  bmp = addBmp("Bdown", 320, 80, false);
  bmp.cursor = "pointer";
  bmp.name = "down_freq";
  bmp.on("mousedown", pressDown);
  bmp.on("pressup", pressUp);
  bmp.on("click", clickFreqButton);
  bmp.addEventListener("mouseover", mouseOverButton);
  bmp.addEventListener("mouseout", mouseOutButton);
  freqCont.addChild(bmp);

  bmp = addBmp("Bblue", 400, 55, false);
  bmp.scaleX = 0.7;
  bmp.scaleY = 0.6;
  bmp.cursor = "pointer";
  bmp.name = "confirm";
  bmp.addEventListener("mouseover", mouseOverButton);
  bmp.addEventListener("mouseout", mouseOutButton);
  bmp.on("click", clickFreqButton);
  freqCont.addChild(bmp);

  txt = new createjs.Text("CONFIRM", "18px Open Sans", "#FFFFFF");
  txt.x = 415;
  txt.y = isSafari ? 60 : 65;
  freqCont.addChild(txt);

  freqCont.x = 30;
  freqCont.y = 30;
  rect1.addChild(freqCont);

  gameCont.addChild(rect1);

  // Right Plane
  var rect2 = new createjs.Container();
  bmp = addBmp("ScreenR", 0, 0, false);
  bmp.scaleX = 0.85;
  bmp.scaleY = 0.85;
  rect2.x = 720 + 50;
  rect2.y = 130;
  rect2.addChild(bmp);

  // Caution Button
  BtnCaution = addBmp("Bcaution", 325 - 5, 70, false);
  BtnCaution.regX = BtnCaution.image.width;
  BtnCaution.scaleY = 0.85;
  BtnCaution.cursor = "pointer";
  BtnCaution.name = "caution";
  BtnCaution.on("click", clickCW);
  rect2.addChild(BtnCaution);

  // Warning Button
  BtnWarning = addBmp("Bwarning", 325 + 5, 70, false);
  BtnWarning.scaleY = 0.85;
  BtnWarning.cursor = "pointer";
  BtnWarning.name = "warning";
  BtnWarning.on("click", clickCW);
  rect2.addChild(BtnWarning);

  // NAV button
  BtnNav = addBmp("Bgrey", 325 - 90, 130, false);
  BtnNav.regX = BtnNav.image.width;
  BtnNav.scaleY = 0.75;
  BtnNav.cursor = "pointer";
  BtnNav.name = "nav";
  BtnNav.addEventListener("mouseover", mouseOverButton);
  BtnNav.addEventListener("mouseout", mouseOutButton);
  BtnNav.on("click", clickNEF);
  rect2.addChild(BtnNav);

  txt = new createjs.Text("NAV", "20px Open Sans", "#FFFFFF");
  txt.x = 157;
  txt.y = isSafari ? 137 : 142;
  txt.textAlign = "center";
  rect2.addChild(txt);

  // ELEC button
  BtnElec = addBmp("Bblue", 325, 130, false);
  BtnElec.regX = BtnElec.image.width / 2;
  BtnElec.scaleY = 0.75;
  BtnElec.cursor = "pointer";
  BtnElec.name = "elec";
  BtnElec.addEventListener("mouseover", mouseOverButton);
  BtnElec.addEventListener("mouseout", mouseOutButton);
  BtnElec.on("click", clickNEF);
  rect2.addChild(BtnElec);

  txt = new createjs.Text("ELEC", "20px Open Sans", "#FFFFFF");
  txt.x = 325;
  txt.y = isSafari ? 137 : 142;
  txt.textAlign = "center";
  rect2.addChild(txt);

  // FUEL button
  BtnFuel = addBmp("Bgrey", 325 + 90, 130, false);
  BtnFuel.scaleY = 0.75;
  BtnFuel.cursor = "pointer";
  BtnFuel.name = "fuel";
  BtnFuel.addEventListener("mouseover", mouseOverButton);
  BtnFuel.addEventListener("mouseout", mouseOutButton);
  BtnFuel.on("click", clickNEF);
  rect2.addChild(BtnFuel);

  txt = new createjs.Text("FUEL", "20px Open Sans", "#FFFFFF");
  txt.x = 493;
  txt.y = isSafari ? 137 : 142;
  txt.textAlign = "center";
  rect2.addChild(txt);

  // ELEC Content
  elecCont = new createjs.Container();
  elecCont.x = 50;
  elecCont.y = 195;
  // elecCont.visible = false;
  rect2.addChild(elecCont);

  bmp = addBmp("Checklist", 0, 0, false);
  bmp.scaleX = 0.95;
  bmp.scaleY = 0.95;
  elecCont.addChild(bmp);

  checklistCont = new createjs.Container();
  checklistCont.x = -8;
  checklistCont.y = 385;

  elecCont.addChild(checklistCont);

  bmp = addBmp("ChecklistBG", 0, 0, false);
  bmp.scaleX = 0.85;
  bmp.scaleY = 0.93;
  checklistCont.addChild(bmp);

  txt = new createjs.Text("No Checklist Items", "20px Open Sans", "#686868");
  txt.x = 20;
  txt.y = 20;
  checklistCont.addChild(txt);

  // FUEL Content
  fuelCont = new createjs.Container();
  fuelCont.x = 50;
  fuelCont.y = 195;
  fuelCont.visible = false;
  rect2.addChild(fuelCont);

  // photo
  BtnPhoto = addBmp("Bcamera", 525, 465, false);
  BtnPhoto.scaleX = 0.85;
  BtnPhoto.scaleY = 0.85;
  BtnPhoto.cursor = "pointer";
  BtnPhoto.name = "photo";
  BtnPhoto.addEventListener("mouseover", mouseOverButton);
  BtnPhoto.addEventListener("mouseout", mouseOutButton);
  BtnPhoto.on("click", makePhoto);
  fuelCont.addChild(BtnPhoto);

  // LH Main Pump
  LMPumpCont = new createjs.Container();
  LMPumpCont.x = 28;
  LMPumpCont.y = 0;
  fuelCont.addChild(LMPumpCont);

  bmp = addBmp("ChecklistBG", 0, 0, false);
  bmp.scaleX = 0.35;
  bmp.scaleY = 1.9;
  LMPumpCont.addChild(bmp);

  txt = new createjs.Text("LH MAIN PUMP", "20px Open Sans", "#A1A1A1");
  txt.x = 120;
  txt.y = isSafari ? 17 : 20;
  txt.textAlign = "center";
  LMPumpCont.addChild(txt);

  bmp = addBmp("Fuel", 50, 50, false);
  LMPumpCont.addChild(bmp);

  LMPumpImg = addBmp("Fuelpoint", 117, 117, false);
  LMPumpImg.regX = LMPumpImg.image.width / 2;
  LMPumpImg.regY = LMPumpImg.image.height / 2;
  LMPumpImg.rotation = 270;
  LMPumpCont.addChild(LMPumpImg);

  var btn = addBmp("Bblue", 20, 200, false);
  btn.scaleX = 0.35;
  btn.scaleY = 0.55;
  btn.cursor = "pointer";
  btn.name = "lm-on";
  btn.addEventListener("mouseover", mouseOverPump);
  btn.addEventListener("mouseout", mouseOutPump);
  btn.on("click", clickPump);
  LMPumpCont.addChild(btn);

  txt = new createjs.Text("ON", "20px Open Sans", "#FFFFFF");
  txt.x = 48;
  txt.y = isSafari ? 202 : 206;
  txt.textAlign = "center";
  LMPumpCont.addChild(txt);

  btn = addBmp("Bgrey", 90, 200, false);
  btn.scaleX = 0.35;
  btn.scaleY = 0.55;
  btn.cursor = "pointer";
  btn.name = "lm-pri";
  btn.addEventListener("mouseover", mouseOverPump);
  btn.addEventListener("mouseout", mouseOutPump);
  btn.on("click", clickPump);
  LMPumpCont.addChild(btn);

  txt = new createjs.Text("PRI", "20px Open Sans", "#FFFFFF");
  txt.x = 118;
  txt.y = isSafari ? 202 : 206;
  txt.textAlign = "center";
  LMPumpCont.addChild(txt);

  btn = addBmp("Bgrey", 160, 200, false);
  btn.scaleX = 0.35;
  btn.scaleY = 0.55;
  btn.cursor = "pointer";
  btn.name = "lm-off";
  btn.addEventListener("mouseover", mouseOverPump);
  btn.addEventListener("mouseout", mouseOutPump);
  btn.on("click", clickPump);
  LMPumpCont.addChild(btn);

  txt = new createjs.Text("OFF", "20px Open Sans", "#FFFFFF");
  txt.x = 188;
  txt.y = isSafari ? 202 : 206;
  txt.textAlign = "center";
  LMPumpCont.addChild(txt);

  // RH Main Pump
  RMPumpCont = new createjs.Container();
  RMPumpCont.x = 290;
  RMPumpCont.y = 0;
  fuelCont.addChild(RMPumpCont);

  bmp = addBmp("ChecklistBG", 0, 0, false);
  bmp.scaleX = 0.35;
  bmp.scaleY = 1.9;
  RMPumpCont.addChild(bmp);

  txt = new createjs.Text("RH MAIN PUMP", "20px Open Sans", "#A1A1A1");
  txt.x = 120;
  txt.y = isSafari ? 17 : 20;
  txt.textAlign = "center";
  RMPumpCont.addChild(txt);

  bmp = addBmp("Fuel", 50, 50, false);
  RMPumpCont.addChild(bmp);

  RMPumpImg = addBmp("Fuelpoint", 117, 117, false);
  RMPumpImg.regX = RMPumpImg.image.width / 2;
  RMPumpImg.regY = RMPumpImg.image.height / 2;
  RMPumpImg.rotation = 270;
  RMPumpCont.addChild(RMPumpImg);

  var btn = addBmp("Bblue", 20, 200, false);
  btn.scaleX = 0.35;
  btn.scaleY = 0.55;
  btn.cursor = "pointer";
  btn.name = "rm-on";
  btn.addEventListener("mouseover", mouseOverPump);
  btn.addEventListener("mouseout", mouseOutPump);
  btn.on("click", clickPump);
  RMPumpCont.addChild(btn);

  txt = new createjs.Text("ON", "20px Open Sans", "#FFFFFF");
  txt.x = 48;
  txt.y = isSafari ? 202 : 206;
  txt.textAlign = "center";
  RMPumpCont.addChild(txt);

  btn = addBmp("Bgrey", 90, 200, false);
  btn.scaleX = 0.35;
  btn.scaleY = 0.55;
  btn.cursor = "pointer";
  btn.name = "rm-pri";
  btn.addEventListener("mouseover", mouseOverPump);
  btn.addEventListener("mouseout", mouseOutPump);
  btn.on("click", clickPump);
  RMPumpCont.addChild(btn);

  txt = new createjs.Text("PRI", "20px Open Sans", "#FFFFFF");
  txt.x = 118;
  txt.y = isSafari ? 202 : 206;
  txt.textAlign = "center";
  RMPumpCont.addChild(txt);

  btn = addBmp("Bgrey", 160, 200, false);
  btn.scaleX = 0.35;
  btn.scaleY = 0.55;
  btn.cursor = "pointer";
  btn.name = "rm-off";
  btn.addEventListener("mouseover", mouseOverPump);
  btn.addEventListener("mouseout", mouseOutPump);
  btn.on("click", clickPump);
  RMPumpCont.addChild(btn);

  txt = new createjs.Text("OFF", "20px Open Sans", "#FFFFFF");
  txt.x = 188;
  txt.y = isSafari ? 202 : 206;
  txt.textAlign = "center";
  RMPumpCont.addChild(txt);

  // LS Standby Pump
  LSPumpCont = new createjs.Container();
  LSPumpCont.x = 28;
  LSPumpCont.y = 250;
  fuelCont.addChild(LSPumpCont);

  bmp = addBmp("ChecklistBG", 0, 0, false);
  bmp.scaleX = 0.35;
  bmp.scaleY = 1.9;
  LSPumpCont.addChild(bmp);

  txt = new createjs.Text("LH STANDBY PUMP", "20px Open Sans", "#A1A1A1");
  txt.x = 120;
  txt.y = isSafari ? 17 : 20;
  txt.textAlign = "center";
  LSPumpCont.addChild(txt);

  bmp = addBmp("Fuel", 50, 50, false);
  LSPumpCont.addChild(bmp);

  LSPumpImg = addBmp("Fuelpoint", 117, 117, false);
  LSPumpImg.regX = LSPumpImg.image.width / 2;
  LSPumpImg.regY = LSPumpImg.image.height / 2;
  LSPumpImg.rotation = 0;
  LSPumpCont.addChild(LSPumpImg);

  var btn = addBmp("Bgrey", 20, 200, false);
  btn.scaleX = 0.35;
  btn.scaleY = 0.55;
  btn.cursor = "pointer";
  btn.name = "ls-on";
  btn.addEventListener("mouseover", mouseOverPump);
  btn.addEventListener("mouseout", mouseOutPump);
  btn.on("click", clickPump);
  LSPumpCont.addChild(btn);

  txt = new createjs.Text("ON", "20px Open Sans", "#FFFFFF");
  txt.x = 48;
  txt.y = isSafari ? 202 : 206;
  txt.textAlign = "center";
  LSPumpCont.addChild(txt);

  btn = addBmp("Bblue", 160, 200, false);
  btn.scaleX = 0.35;
  btn.scaleY = 0.55;
  btn.cursor = "pointer";
  btn.name = "ls-off";
  btn.addEventListener("mouseover", mouseOverPump);
  btn.addEventListener("mouseout", mouseOutPump);
  btn.on("click", clickPump);
  LSPumpCont.addChild(btn);

  txt = new createjs.Text("OFF", "20px Open Sans", "#FFFFFF");
  txt.x = 188;
  txt.y = isSafari ? 202 : 206;
  txt.textAlign = "center";
  LSPumpCont.addChild(txt);

  // RS Standby Pump
  RSPumpCont = new createjs.Container();
  RSPumpCont.x = 290;
  RSPumpCont.y = 250;
  fuelCont.addChild(RSPumpCont);

  bmp = addBmp("ChecklistBG", 0, 0, false);
  bmp.scaleX = 0.35;
  bmp.scaleY = 1.9;
  RSPumpCont.addChild(bmp);

  txt = new createjs.Text("RH STANDBY PUMP", "20px Open Sans", "#A1A1A1");
  txt.x = 120;
  txt.y = isSafari ? 17 : 20;
  txt.textAlign = "center";
  RSPumpCont.addChild(txt);

  bmp = addBmp("Fuel", 50, 50, false);
  RSPumpCont.addChild(bmp);

  RSPumpImg = addBmp("Fuelpoint", 117, 117, false);
  RSPumpImg.regX = RSPumpImg.image.width / 2;
  RSPumpImg.regY = RSPumpImg.image.height / 2;
  RSPumpImg.rotation = 0;
  RSPumpCont.addChild(RSPumpImg);

  var btn = addBmp("Bgrey", 20, 200, false);
  btn.scaleX = 0.35;
  btn.scaleY = 0.55;
  btn.cursor = "pointer";
  btn.name = "rs-on";
  btn.addEventListener("mouseover", mouseOverPump);
  btn.addEventListener("mouseout", mouseOutPump);
  btn.on("click", clickPump);
  RSPumpCont.addChild(btn);

  txt = new createjs.Text("ON", "20px Open Sans", "#FFFFFF");
  txt.x = 48;
  txt.y = isSafari ? 202 : 206;
  txt.textAlign = "center";
  RSPumpCont.addChild(txt);

  btn = addBmp("Bblue", 160, 200, false);
  btn.scaleX = 0.35;
  btn.scaleY = 0.55;
  btn.cursor = "pointer";
  btn.name = "rs-off";
  btn.addEventListener("mouseover", mouseOverPump);
  btn.addEventListener("mouseout", mouseOutPump);
  btn.on("click", clickPump);
  RSPumpCont.addChild(btn);

  txt = new createjs.Text("OFF", "20px Open Sans", "#FFFFFF");
  txt.x = 188;
  txt.y = isSafari ? 202 : 206;
  txt.textAlign = "center";
  RSPumpCont.addChild(txt);

  // NAV Content
  navCont = new createjs.Container();
  navCont.x = 50;
  navCont.y = 165;
  navCont.visible = false;
  rect2.addChild(navCont);

  // Altitude Edit
  altCont = new createjs.Container();
  altCont.x = 0;
  altCont.y = 130;
  navCont.addChild(altCont);

  bmp = addBmp("ChecklistBG", 40, 30, false);
  bmp.scaleX = 0.7;
  bmp.scaleY = 0.7;
  altCont.addChild(bmp);

  txt = new createjs.Text("ALTITUDE", "22px Open Sans", "#A9A9A9");
  txt.x = 60;
  txt.y = isSafari ? 55 : 60;
  altCont.addChild(txt);

  btn = addBmp("Bblack", 200, 45, false);
  btn.scaleX = 0.9;
  btn.scaleY = 0.95;
  btn.name = "alt";
  btn.cursor = "pointer";
  btn.on("click", clickAltROTrk);
  altCont.addChild(btn);

  altitudeT = new createjs.Text(currentAltitude, "26px Open Sans", "#A9A9A9");
  altitudeT.x = 335;
  altitudeT.y = isSafari ? 54 : 60;
  altitudeT.textAlign = "right";
  altCont.addChild(altitudeT);

  btn = addBmp("Bblue", 370, 50, false);
  btn.scaleX = 0.7;
  btn.scaleY = 0.75;
  btn.cursor = "pointer";
  btn.name = "c_alt";
  btn.addEventListener("mouseover", mouseOverButton);
  btn.addEventListener("mouseout", mouseOutButton);
  btn.on("click", confirmAltROTrk);
  altCont.addChild(btn);

  txt = new createjs.Text("EDIT", "22px Open Sans", "#FFFFFF");
  txt.x = 425;
  txt.y = isSafari ? 55 : 62;
  txt.textAlign = "center";
  altCont.addChild(txt);

  // ROC/ROD Edit
  ROCont = new createjs.Container();
  ROCont.x = 0;
  ROCont.y = 260;
  navCont.addChild(ROCont);

  bmp = addBmp("ChecklistBG", 40, 30, false);
  bmp.scaleX = 0.7;
  bmp.scaleY = 0.7;
  ROCont.addChild(bmp);

  txt = new createjs.Text("ROC/ROD", "22px Open Sans", "#A9A9A9");
  txt.x = 60;
  txt.y = isSafari ? 55 : 60;
  ROCont.addChild(txt);

  btn = addBmp("Bblack", 200, 45, false);
  btn.scaleX = 0.9;
  btn.scaleY = 0.95;
  btn.name = "ro";
  btn.cursor = "pointer";
  btn.on("click", clickAltROTrk);
  ROCont.addChild(btn);

  ROT = new createjs.Text(currentRO, "26px Open Sans", "#A9A9A9");
  ROT.x = 335;
  ROT.y = isSafari ? 54 : 60;
  ROT.textAlign = "right";
  ROCont.addChild(ROT);

  btn = addBmp("Bblue", 370, 50, false);
  btn.scaleX = 0.7;
  btn.scaleY = 0.75;
  btn.cursor = "pointer";
  btn.name = "c_ro";
  btn.addEventListener("mouseover", mouseOverButton);
  btn.addEventListener("mouseout", mouseOutButton);
  btn.on("click", confirmAltROTrk);
  ROCont.addChild(btn);

  txt = new createjs.Text("EDIT", "22px Open Sans", "#FFFFFF");
  txt.x = 425;
  txt.y = isSafari ? 55 : 62;
  txt.textAlign = "center";
  ROCont.addChild(txt);

  // TRK Edit
  TRKcont = new createjs.Container();
  TRKcont.x = 0;
  TRKcont.y = 390;
  navCont.addChild(TRKcont);

  bmp = addBmp("ChecklistBG", 40, 30, false);
  bmp.scaleX = 0.7;
  bmp.scaleY = 0.7;
  TRKcont.addChild(bmp);

  txt = new createjs.Text("TRK MILES", "22px Open Sans", "#A9A9A9");
  txt.x = 60;
  txt.y = isSafari ? 55 : 60;
  TRKcont.addChild(txt);

  btn = addBmp("Bblack", 200, 45, false);
  btn.scaleX = 0.9;
  btn.scaleY = 0.95;
  btn.name = "trk";
  btn.cursor = "pointer";
  btn.on("click", clickAltROTrk);
  TRKcont.addChild(btn);

  TRK = new createjs.Text(currentTRK, "26px Open Sans", "#A9A9A9");
  TRK.x = 335;
  TRK.y = isSafari ? 54 : 60;
  TRK.textAlign = "right";
  TRKcont.addChild(TRK);

  btn = addBmp("Bblue", 370, 50, false);
  btn.scaleX = 0.7;
  btn.scaleY = 0.75;
  btn.cursor = "pointer";
  btn.name = "c_trk";
  btn.addEventListener("mouseover", mouseOverButton);
  btn.addEventListener("mouseout", mouseOutButton);
  btn.on("click", confirmAltROTrk);
  TRKcont.addChild(btn);

  txt = new createjs.Text("EDIT", "22px Open Sans", "#FFFFFF");
  txt.x = 425;
  txt.y = isSafari ? 55 : 62;
  txt.textAlign = "center";
  TRKcont.addChild(txt);

  // Waypoint Cont
  wayCont = new createjs.Container();
  wayCont.x = 0;
  wayCont.y = 0;
  navCont.addChild(wayCont);

  bmp = addBmp("ChecklistBG", 40, 30, false);
  bmp.scaleX = 0.7;
  bmp.scaleY = 0.7;
  wayCont.addChild(bmp);

  txt = new createjs.Text("WAYPOINT", "22px Open Sans", "#A9A9A9");
  txt.x = 60;
  txt.y = isSafari ? 55 : 60;
  wayCont.addChild(txt);

  btn = addBmp("Bblack", 200, 45, false);
  btn.scaleX = 0.9;
  btn.scaleY = 0.95;
  btn.cursor = "pointer";
  btn.name = "waydrop";
  btn.on("click", clickWayPoint);
  wayCont.addChild(btn);

  currentWaypointT = new createjs.Text(
    currentWaypoint,
    "26px Open Sans",
    "#A9A9A9"
  );
  currentWaypointT.x = 245;
  currentWaypointT.y = isSafari ? 54 : 60;
  currentWaypointT.textAlign = "center";
  wayCont.addChild(currentWaypointT);

  waypointCont = new createjs.Container();
  waypointCont.x = 200;
  waypointCont.y = 45;
  waypointCont.visible = false;
  wayCont.addChild(waypointCont);

  for (let i = 0; i < waypointList.length; i++) {
    btn = addBmp("Bblack", 0, 39 * i, false);
    btn.scaleX = 0.9;
    btn.scaleY = 0.7;
    btn.cursor = "pointer";
    btn.name = waypointList[i];
    btn.on("click", clickWayPoint);
    btn.addEventListener("mouseover", mouseOverWaypointButton);
    btn.addEventListener("mouseout", mouseOutWaypointButton);
    waypointCont.addChild(btn);

    txt = new createjs.Text(waypointList[i], "25px Open Sans", "#A9A9A9");
    txt.x = 30;
    txt.y = (isSafari ? 3 : 8) + 39 * i;
    txt.textAlign = "left";
    waypointCont.addChild(txt);
  }

  BtnWaypoint = addBmp("Waydrop", 315, 70, false);
  BtnWaypoint.regX = BtnWaypoint.image.width / 2;
  BtnWaypoint.regY = BtnWaypoint.image.height / 2;
  BtnWaypoint.cursor = "pointer";
  BtnWaypoint.name = "waydrop";
  BtnWaypoint.on("click", clickWayPoint);
  wayCont.addChild(BtnWaypoint);

  btn = addBmp("Bblue", 370, 50, false);
  btn.scaleX = 0.7;
  btn.scaleY = 0.75;
  btn.cursor = "pointer";
  btn.name = "c_way";
  btn.addEventListener("mouseover", mouseOverButton);
  btn.addEventListener("mouseout", mouseOutButton);
  btn.on("click", confirmAltROTrk);
  wayCont.addChild(btn);

  txt = new createjs.Text("SELECT", "22px Open Sans", "#FFFFFF");
  txt.x = 425;
  txt.y = isSafari ? 55 : 62;
  txt.textAlign = "center";
  wayCont.addChild(txt);

  gameCont.addChild(rect2);

  pickSound();

  isGame = true;
  trackTime = setInterval(keepTime, 1000);

  window.addEventListener("keydown", getKeyDown);

  startMain();

  if (trainMode && gamePaused) $("#gamepause").show();
}
function getKeyDown(e) {
  if (keyboard_flag){
    return;
  }
  e.preventDefault();
  if (
    activeAltitude &&
    ((e.keyCode >= 96 && e.keyCode <= 105) ||
      (e.keyCode >= 48 && e.keyCode <= 57) ||
      e.keyCode == 8)
  ) {
    if (e.keyCode == 8) currentAltitude = currentAltitude.slice(0, -1);
    else {
      if (currentAltitude.length > 6) return;
      currentAltitude = currentAltitude + String(e.key);
    }
    altitudeT.text = String(currentAltitude);
  }

  if (
    activeRO &&
    ((e.keyCode >= 96 && e.keyCode <= 105) ||
      (e.keyCode >= 48 && e.keyCode <= 57) ||
      e.keyCode == 8)
  ) {
    if (e.keyCode == 8) currentRO = currentRO.slice(0, -1);
    else {
      if (currentRO.length > 3) return;
      currentRO = currentRO + String(e.key);
    }
    ROT.text = String(currentRO);
  }

  if (
    activeTrk &&
    ((e.keyCode >= 96 && e.keyCode <= 105) ||
      (e.keyCode >= 48 && e.keyCode <= 57) ||
      e.keyCode == 8 || e.keyCode == 190 || e.keyCode == 110)
  ) {
    if (e.keyCode == 8) currentTRK = currentTRK.slice(0, -1);
    if ((e.keyCode == 190 || e.keyCode == 110) && currentTRK.includes('.')) {
      return;
    }
    else {
      if (currentTRK.length > 3) return;
      currentTRK = currentTRK + String(e.key);
    }
    TRK.text = String(currentTRK);
  }
}
function clickAltROTrk(e) {
  let tname = e.target.name;
  altCont.getChildByName("alt").image = loader.getResult("Bblack");
  ROCont.getChildByName("ro").image = loader.getResult("Bblack");
  TRKcont.getChildByName("trk").image = loader.getResult("Bblack");
  e.target.image = loader.getResult("ABblack");
  if (tname == "alt") {
    activeAltitude = true;
    activeRO = false;
    activeTrk = false;
    oldAltitude = currentAltitude;
    currentAltitude = "";
    currentRO = oldRO;
    currentTRK = oldTRK;
  }
  if (tname == "ro") {
    activeAltitude = false;
    activeRO = true;
    activeTrk = false;
    oldRO = currentRO;
    currentRO = "";
    currentAltitude = oldAltitude;
    currentTRK = oldTRK;
  }
  if (tname == 'trk'){
    activeAltitude = false;
    activeRO = false;
    activeTrk = true;
    oldTRK = currentTRK;
    currentTRK = '';
    currentAltitude = oldAltitude;
    currentRO = oldRO;
  }
  altitudeT.text = String(currentAltitude);
  ROT.text = String(currentRO);
  TRK.text = String(currentTRK);
  if (keyboard_flag){
    $('#keyboardModal').fadeIn();
  }
}
function confirmAltROTrk(e) {
  let tname = e.target.name;
  console.log('confirmAltROTrk tname', tname);
  altCont.getChildByName("alt").image = loader.getResult("Bblack");
  ROCont.getChildByName("ro").image = loader.getResult("Bblack");
  TRKcont.getChildByName("trk").image = loader.getResult("Bblack");
  activeAltitude = false;
  activeRO = false;
  activeTrk = false;
  waypointCont.visible = false;
  if (tname == "c_way") {
    // wayAirT.text = currentWaypoint;
    console.log("Altitude", currentWaypoint);
  }
  if (tname == "c_alt") {
    if (currentAltitude == "") {
      currentAltitude = String(oldAltitude);
    }
    waypointT.text = "FL" + currentAltitude.slice(0, -2);
    oldAltitude = currentAltitude;
    altitudeT.text = String(currentAltitude);
  }
  if (tname == "c_ro") {
    oldRO = currentRO;
  }
  if (tname == 'c_trk'){
    oldTRK = currentTRK;
  }
  if (tname && qType == tname.replace("c_", "")){
    confirmAnswer(false);
  }
  
}
function generateAir() {
  // Add Aircrafts left-top(0, 0). right-bottom(550, 500)
  let xPos = Math.floor(Math.random() * 550);
  let yPos = Math.floor(Math.random() * 10);

  airNumber++;

  let _f = true;
  let feet;
  while (_f) {
    let _r = Math.floor(Math.random() * 10) >= 4 ? 10 : 50;
    feet = Math.floor(Math.random() * _r);
    feet = feet * (Math.floor(Math.random() * 2) > 0 ? 100 : -100);
    if (Math.abs(feet) > 250) {
      if (_r <= 10) {
        let _p = Math.floor(Math.random() * 10);
        if (_p > 4) {
          // if ( (xPos > 70 && xPos < 185) || (xPos > 380 && xPos < 495) ) {
          if ( (xPos > 70 && xPos < 495) ) {
            console.log("Correct xPos!")
          } else {
            let _x = Math.floor(Math.random() * 2);
            if (_x > 0) {
              xPos = Math.floor(Math.random() * (115)) + 380;
            } else {
              xPos = Math.floor(Math.random() * (185 - 70)) + 70;
            }
          }
        }
        _f = false;
      } else {
        _f = false;
      }
    }
  }

  if (Math.abs(feet) <= 1000 &&
     ( (xPos > 70 && xPos < 495) )
  ) {
    score.tcas.total++;
    totalCount++;
  }

  let _airCont = new createjs.Container();
  _airCont.x = xPos;
  _airCont.y = yPos;
  _airCont.name = "aircont-" + airNumber;

  let air = addBmp("Nair", 0, 0, false);
  air.regX = 15;
  air.regY = 15;
  air.name = "air-" + airNumber;
  air.cursor = "pointer";
  air.on("click", clickAir);
  _airCont.addChild(air);

  let txt = new createjs.Text(
    feet > 0 ? "+" + feet + "ft" : feet + "ft",
    "18px Open Sans",
    "#39a6e2"
  );
  txt.x = 25;
  txt.y = isSafari ? -10 : -5;
  _airCont.addChild(txt);

  airList["air-" + airNumber] = { air: _airCont, feet: feet };

  rectCont.addChild(_airCont);
}
function clickAir(e) {
  var air_name = String(e.target.name);
  if (air_name.includes("actived")) return;
  let cX = e.target.parent.x;
  let cY = e.target.parent.y;

  let distance = Math.sqrt(Math.pow(cX - 285, 2) + Math.pow(cY - 320, 2));

  if (
    distance > 100 &&
    distance < 210 &&
    Math.abs(airList[air_name].feet) <= 1000
  ) {
    e.target.image = loader.getResult("Fair");
    let newkey = air_name + "-actived";
    e.target.name = newkey;
    airList[newkey] = airList[air_name];
    delete airList[air_name];
    score.tcas.correct++;
    totalScore++;
  } else {
    console.log("Wrong Selection");
  }
}
function moveAir() {
  if (trainMode && !rectCont.visible) return;
  let _keys = Object.keys(airList);
  for (let i = 0; i < _keys.length; i++) {
    if (airList[_keys[i]].air.y > 530) delete airList[_keys[i]];
    else {
      airList[_keys[i]].air.y += 0.1;
      checkMovingAir(_keys[i]);
    }
  }
}
function checkMovingAir(air_name) {
  if (air_name.includes("actived") || Math.abs(airList[air_name].feet) > 1000)
    return;
  if (airList[air_name].traffic) return;

  let cX = airList[air_name].air.x;
  let cY = airList[air_name].air.y;
  let distance = Math.sqrt(Math.pow(cX - 285, 2) + Math.pow(cY - 320, 2));
  if (distance < 100) {
    console.log("Traffic! Traffic!");
    var instance = createjs.Sound.play("Traffic");
    instance.on(
      "complete",
      createjs.proxy(this.handleCompleteSoundWarning, this)
    );
    instance.volume = 1;
    airList[air_name].traffic = true;
  }
}
function mouseOverWaypointButton(e) {
  var bname = String(e.target.name);
  waypointCont.getChildByName(bname).image = loader.getResult("HBblack");
}
function mouseOutWaypointButton(e) {
  var bname = String(e.target.name);
  waypointCont.getChildByName(bname).image = loader.getResult("Bblack");
}
function clickWayPoint(e) {
  var tname = String(e.target.name);
  if (tname == "waydrop") {
    waypointCont.visible = true;
    BtnWaypoint.rotation = 90;
    BtnWaypoint.name = "offwaydrop";
  } else if (tname == "offwaydrop") {
    waypointCont.visible = false;
    BtnWaypoint.rotation = 0;
    BtnWaypoint.name = "waydrop";
  } else {
    currentWaypoint = tname;
    // initWaypointButton();
    waypointCont.visible = false;
    BtnWaypoint.rotation = 0;
    currentWaypointT.text = currentWaypoint;
    // wayAirT.text = currentWaypoint;
  }
}
function initWaypointButton() {
  for (let i = 0; i < waypointList.length; i++) {
    waypointCont.getChildByName(waypointList[i]).image =
      loader.getResult("Bblack");
  }
}
function clickNEF(e) {
  if (trainMode && gamePaused) return;
  activeAltitude = false;
  activeRO = false;
  activeTrk = false;
  waypointCont.visible = false;
  currentAltitude = oldAltitude;
  altitudeT.text = String(currentAltitude);
  currentRO = oldRO;
  ROT.text = String(currentRO);
  currentTRK = oldTRK;
  TRK.text = String(currentTRK);
  altCont.getChildByName("alt").image = loader.getResult("Bblack");
  ROCont.getChildByName("ro").image = loader.getResult("Bblack");
  TRKcont.getChildByName("trk").image = loader.getResult("Bblack");

  var tname = String(e.target.name);

  BtnNav.image = loader.getResult("Bgrey");
  BtnElec.image = loader.getResult("Bgrey");
  BtnFuel.image = loader.getResult("Bgrey");
  fuelCont.visible = false;
  elecCont.visible = false;
  navCont.visible = false;

  if (tname == "nav") {
    // console.log("Pressed nav button");
    BtnNav.image = loader.getResult("Bblue");
    navCont.visible = true;
  }
  if (tname == "elec") {
    // console.log("Pressed elec button");
    BtnElec.image = loader.getResult("Bblue");
    elecCont.visible = true;
  }
  if (tname == "fuel") {
    // console.log("Pressed fuel button");
    BtnFuel.image = loader.getResult("Bblue");
    fuelCont.visible = true;
  }
}
function makePhoto(e) {
  // console.log("make photo");
  if (sec > 10 && sec % 120 >= 0 && sec % 120 <= 10) {
    console.log("You took a photo in correct time.");
    if (touchedPhotoButton) return;
    score.fuel.correct++;
    totalScore++;
    touchedPhotoButton = true;
  } else {
    console.log("You missed the moment to take a photo");
  }
  var instance = createjs.Sound.play("Camera");
  instance.on(
    "complete",
    createjs.proxy(this.handleCompleteSoundWarning, this)
  );
  instance.volume = 3;
}
function clickCW(e) {
  if (trainMode && gamePaused) return;
  var tname = String(e.target.name);

  if (tname == "caution") {
    console.log("Pressed caution button");
  }
  if (tname == "warning") {
    console.log("Pressed warning button");
  }
}
var freqTimer = null;
var selectedFreq = "";
function pressDown(e) {
  if (trainMode && gamePaused) return;
  var tname = String(e.target.name);
  selectedFreq = tname;
  freqTimer = setInterval(increaseRadioFreq, 250);
}
function pressUp(e) {
  if (trainMode && gamePaused) return;
  selectedFreq = "";
  if (freqTimer) clearInterval(freqTimer);
}
function increaseRadioFreq() {
  let _arr = selectedFreq.split("_");
  if (_arr[0] == "up") {
    if (_arr[1] == "freq" && freq < 975) freq += 25;
    if (_arr[1] == "radio" && radio <= 139) radio++;
  }
  if (_arr[0] == "down") {
    if (_arr[1] == "freq" && freq > 0) freq -= 25;
    if (_arr[1] == "radio" && radio >= 120) radio--;
  }
  freqT.text =
    freq > 99 ? freq : freq > 9 ? String("0" + freq) : String("00" + freq);
  radioT.text = radio;
}
function clickFreqButton(e) {
  if (trainMode && gamePaused) return;
  var tname = String(e.target.name);

  if (tname == "confirm" && qType == 'freq') {
    confirmAnswer(false);
  } else {
    let _arr = tname.split("_");
    if (_arr[0] == "up") {
      if (_arr[1] == "freq" && freq < 975) freq += 25;
      if (_arr[1] == "radio" && radio <= 135) radio++;
    }
    if (_arr[0] == "down") {
      if (_arr[1] == "freq" && freq > 0) freq -= 25;
      if (_arr[1] == "radio" && radio >= 120) radio--;
    }
    freqT.text =
      freq > 99 ? freq : freq > 9 ? String("0" + freq) : String("00" + freq);
    radioT.text = radio;
  }
}
function mouseOverButton(e) {
  let _tname = String(e.target.name);
  if (_tname.includes("radio") || _tname.includes("freq")) {
    if (_tname.includes("up")) {
      e.target.image = loader.getResult("HBup");
    } else {
      e.target.image = loader.getResult("HBdown");
    }
  }

  if (_tname == "nav" || _tname == "elec" || _tname == "fuel") {
    switch (_tname) {
      case "nav":
        if (navCont.visible) BtnNav.image = loader.getResult("HBblue");
        else BtnNav.image = loader.getResult("HBgrey");
        break;
      case "elec":
        if (elecCont.visible) BtnElec.image = loader.getResult("HBblue");
        else BtnElec.image = loader.getResult("HBgrey");
        break;
      case "fuel":
        if (fuelCont.visible) BtnFuel.image = loader.getResult("HBblue");
        else BtnFuel.image = loader.getResult("HBgrey");
        break;
    }
  }

  if (_tname == "confirm") e.target.image = loader.getResult("HBblue");

  if (_tname == "photo") e.target.image = loader.getResult("ABcamera");

  if (_tname == "c_alt" || _tname == "c_ro" || _tname == "c_way") {
    switch (_tname) {
      case "c_alt":
        altCont.getChildByName(_tname).image = loader.getResult("HBblue");
        break;
      case "c_ro":
        ROCont.getChildByName(_tname).image = loader.getResult("HBblue");
        break;
      case "c_way":
        wayCont.getChildByName(_tname).image = loader.getResult("HBblue");
        break;
    }
  }
}
function mouseOutButton(e) {
  let _tname = String(e.target.name);
  if (_tname.includes("radio") || _tname.includes("freq")) {
    if (_tname.includes("up")) {
      e.target.image = loader.getResult("Bup");
    } else {
      e.target.image = loader.getResult("Bdown");
    }
  }
  if (_tname == "nav" || _tname == "elec" || _tname == "fuel") {
    switch (_tname) {
      case "nav":
        if (navCont.visible) BtnNav.image = loader.getResult("Bblue");
        else BtnNav.image = loader.getResult("Bgrey");
        break;
      case "elec":
        if (elecCont.visible) BtnElec.image = loader.getResult("Bblue");
        else BtnElec.image = loader.getResult("Bgrey");
        break;
      case "fuel":
        if (fuelCont.visible) BtnFuel.image = loader.getResult("Bblue");
        else BtnFuel.image = loader.getResult("Bgrey");
        break;
    }
  }
  if (_tname == "confirm") e.target.image = loader.getResult("Bblue");

  if (_tname == "photo") e.target.image = loader.getResult("Bcamera");

  if (_tname == "c_alt" || _tname == "c_ro" || _tname == "c_way") {
    switch (_tname) {
      case "c_alt":
        altCont.getChildByName(_tname).image = loader.getResult("Bblue");
        break;
      case "c_ro":
        ROCont.getChildByName(_tname).image = loader.getResult("Bblue");
        break;
      case "c_way":
        wayCont.getChildByName(_tname).image = loader.getResult("Bblue");
        break;
    }
  }
}
function initScore() {
  score = {
    nav: { flag: false, total: 0, correct: 0 },
    fuel: { flag: false, total: 0, correct: 0 },
    elec: { flag: false, total: 0, correct: 0 },
    freq: { flag: false, total: 0, correct: 0 },
    tcas: { flag: false, total: 0, correct: 0 },
  };
  totalCount = 0;
  totalScore = 0;
  sec = 0;
  timeCounterCurrentTask = 0;
  tolernace = -1;
  intensity = 1;
  timeCounterAir = 0;
  timeCounterFuel = 0;
  timeCounterLSPump = 0;
  timeCounterRSPump = 0;
  timeCounterRO = 0;
  timeCounterCurrentTask = 0;
  selected_real_scenaario_index = 0;
  real_question_index = 0;
  real_question_interval = 0;
  real_question_in_progress = false;
  question_during_flag = false;
  keyboard_flag = false;
  currentWaypoint = "EVY";
  currentAltitude = "29000";
  oldAltitude = "29000";
  currentRO = "0";
  oldRO = "0";
  currentTRK = "0";
  oldTRK="0";
  activeCaution = false;
  activeAltitude = false;
  activeRO = false;
  activeTrk = false;
  $("#keyboard_check").text('Enable On-Screen Keyboard')
  $('#NAV_check').prop('checked', true);
  $('#ELEC_check').prop('checked', true);
  $('#FULE_check').prop('checked', true);
  $('#Radio_check').prop('checked', true);
  $('#TCAS_check').prop('checked', true);
  $('#statements_check').prop('checked', true);
  $('#keyboard_check').prop('checked', false);
  $(".stepper-item-tolerance").removeClass('active').removeClass('completed');
  $(".stepper-item-tolerance").first().addClass('active').addClass('completed');
  $(".stepper-item-intensity").removeClass('active').removeClass('completed');
  $(".stepper-item-intensity").first().addClass('active').addClass('completed');
}
function makeBlackBox(wd, h, color) {
  var tCont = new createjs.Container();

  var shape = new createjs.Shape();
  shape.graphics.beginFill(color).drawRect(0, 0, wd, h);
  shape.name = "black";
  tCont.addChild(shape);

  return tCont;
}
function makeYellowRect(wd, h, color) {
  var tCont = new createjs.Container();

  var border = new createjs.Shape();
  border.graphics.beginStroke(color);
  border.graphics.setStrokeStyle(4);
  //border.snapToPixel = true;
  border.graphics.drawRect(0, 0, wd, h);
  border.name = "yellow";
  tCont.addChild(border);

  return tCont;
}
function setupChecklist(tname, i) {
  let f1, s1;
  switch (tname) {
    case "c1":
      f1 = makeBlackBox(43, 46, "#000");
      s1 = makeYellowRect(43, 46, "#e3a04f");
      f1.name = tname;
      s1.name = String(tname + "0");
      f1.mouseChildren = false;
      elecCont.addChild(f1);
      elecCont.addChild(s1);
      f1.x = 137;
      f1.y = 130;
      s1.x = 137;
      s1.y = 130;

      break;
    case "c2":
      f1 = makeBlackBox(43, 46, "#000");
      s1 = makeYellowRect(43, 46, "#e3a04f");
      f1.name = tname;
      s1.name = String(tname + "0");
      f1.mouseChildren = false;
      elecCont.addChild(f1);
      elecCont.addChild(s1);
      f1.x = 369;
      f1.y = 130;
      s1.x = 369;
      s1.y = 130;

      break;
    case "c3":
      f1 = makeBlackBox(43, 46, "#000");
      s1 = makeYellowRect(43, 46, "#e3a04f");
      f1.name = tname;
      s1.name = String(tname + "0");
      f1.mouseChildren = false;
      elecCont.addChild(f1);
      elecCont.addChild(s1);
      f1.x = 137;
      f1.y = 54;
      s1.x = 137;
      s1.y = 54;

      break;
    case "c4":
      f1 = makeBlackBox(43, 46, "#000");
      s1 = makeYellowRect(43, 46, "#e3a04f");
      f1.name = tname;
      s1.name = String(tname + "0");
      f1.mouseChildren = false;
      elecCont.addChild(f1);
      elecCont.addChild(s1);
      f1.x = 369;
      f1.y = 53;
      s1.x = 369;
      s1.y = 53;

      break;
    case "c5":
      f1 = makeBlackBox(43, 46, "#000");
      s1 = makeYellowRect(43, 46, "#e3a04f");
      f1.name = tname;
      s1.name = String(tname + "0");
      f1.mouseChildren = false;
      elecCont.addChild(f1);
      elecCont.addChild(s1);
      f1.x = 254;
      f1.y = 2;
      s1.x = 254;
      s1.y = 2;

      break;
    case "lhbatt":
      f1 = makeBlackBox(76, 93, "#000");
      s1 = makeYellowRect(76, 93, "#e3a04f");
      f1.name = tname;
      s1.name = String(tname + "0");
      f1.mouseChildren = false;
      elecCont.addChild(f1);
      elecCont.addChild(s1);
      f1.x = 7;
      f1.y = 129;
      s1.x = 7;
      s1.y = 129;

      break;
    case "rhbatt":
      f1 = makeBlackBox(76, 93, "#000");
      s1 = makeYellowRect(76, 93, "#e3a04f");
      f1.name = tname;
      s1.name = String(tname + "0");
      f1.mouseChildren = false;
      elecCont.addChild(f1);
      elecCont.addChild(s1);
      f1.x = 466;
      f1.y = 129;
      s1.x = 466;
      s1.y = 129;

      break;
    case "lhgen":
      f1 = makeBlackBox(76, 93, "#000");
      s1 = makeYellowRect(76, 93, "#e3a04f");
      f1.name = tname;
      s1.name = String(tname + "0");
      f1.mouseChildren = false;
      elecCont.addChild(f1);
      elecCont.addChild(s1);
      f1.x = 69;
      f1.y = 276;
      s1.x = 69;
      s1.y = 276;

      break;
    case "rhstby":
      f1 = makeBlackBox(76, 93, "#000");
      s1 = makeYellowRect(76, 93, "#e3a04f");
      f1.name = tname;
      s1.name = String(tname + "0");
      f1.mouseChildren = false;
      elecCont.addChild(f1);
      elecCont.addChild(s1);
      f1.x = 299;
      f1.y = 275;
      s1.x = 299;
      s1.y = 275;

      break;
    case "lhstby":
      f1 = makeBlackBox(76, 93, "#000");
      s1 = makeYellowRect(76, 93, "#e3a04f");
      f1.name = tname;
      s1.name = String(tname + "0");
      f1.mouseChildren = false;
      elecCont.addChild(f1);
      elecCont.addChild(s1);
      f1.x = 173;
      f1.y = 275;
      s1.x = 173;
      s1.y = 275;

      break;
    case "rhgen":
      f1 = makeBlackBox(76, 93, "#000");
      s1 = makeYellowRect(76, 93, "#e3a04f");
      f1.name = tname;
      s1.name = String(tname + "0");
      f1.mouseChildren = false;
      elecCont.addChild(f1);
      elecCont.addChild(s1);
      f1.x = 404;
      f1.y = 275;
      s1.x = 404;
      s1.y = 275;

      break;
  }

  f1.alpha = 0.1;
  f1.index = i;
  f1.cursor = "pointer";
  f1.addEventListener("click", completeTask);
}
function completeTask(e) {
  if (trainMode && gamePaused) return;
  var tname = String(e.target.name);
  var ind = parseInt(e.target.index);

  // random order
  if (findex < tempChecklist.length) {
    checklistCont.getChildByName("txt-" + tname).alpha = 0.3;
    findex++;
    elecCont.removeChild(elecCont.getChildByName(tname));
    var sname = String(tname + "0");
    elecCont.removeChild(elecCont.getChildByName(sname));
  }

  if (findex == ind) {
    // console.log("Correct item", findex, ind);
    if (correctChecklistSelection) correctChecklistSelection = true;
  } else {
    // console.log("Incorrect item", findex, ind);
    correctChecklistSelection = false;
  }

  if (findex == tempChecklist.length - 1) confirmChecklist();
}
function confirmChecklist() {
  for (let i = 0; i < tempChecklist.length; i++) {
    let el = elecCont.getChildByName(tempChecklist[i]);
    elecCont.removeChild(el);
    el = elecCont.getChildByName(tempChecklist[i] + "0");
    elecCont.removeChild(el);
  }

  checklistCont.removeAllChildren();
  BtnWarning.image = loader.getResult("Bwarning");
  let txt = new createjs.Text(
    "No Checklist Items",
    "20px Open Sans",
    "#686868"
  );
  txt.x = 20;
  txt.y = 20;
  checklistCont.addChild(txt);

  if (timeCounterChecklist < timeChecklist && correctChecklistSelection) {
    score.elec.correct++;
  }

  timeCounterChecklist = 0;
  startChecklist = false;
}
function pickChecklist() {
  elecCont.removeAllChildren();

  var bmp = addBmp("Checklist", 0, 0, false);
  bmp.scaleX = 0.95;
  bmp.scaleY = 0.95;
  elecCont.addChild(bmp);

  // Checklist Content
  checklistCont = new createjs.Container();
  checklistCont.x = -8;
  checklistCont.y = 385;

  elecCont.addChild(checklistCont);

  bmp = addBmp("ChecklistBG", 0, 0, false);
  bmp.scaleX = 0.85;
  bmp.scaleY = 0.93;
  checklistCont.addChild(bmp);

  let sel = Math.floor(Math.random() * checklist.length);
  tempChecklist = [];
  findex = -1;
  correctChecklistSelection = true;

  for (let i = 0; i < checklist[sel].length; i++) {
    let _t = `${i + 1}) ${checklist[sel][i]}`;
    let tStr = checklist[sel][i]
      .replace("TURN", "")
      .replace("ON", "")
      .replace("OFF", "")
      .replace(/\s/g, "");
    tStr = tStr.toLowerCase();

    let txt = new createjs.Text(_t, "20px Open Sans", "#f2ea1d");
    txt.x = i < 3 ? 20 : 310;
    txt.y = 20 + (i % 3) * 30;
    txt.name = "txt-" + tStr;
    checklistCont.addChild(txt);

    tempChecklist.push(tStr);
    setupChecklist(tStr, i);
  }

  BtnWarning.image = loader.getResult("ABwarning");
  timeCounterChecklist = 0;
  totalCount++;
  score.elec.total++;

  var instance = createjs.Sound.play("Warning");
  instance.on(
    "complete",
    createjs.proxy(this.handleCompleteSoundWarning, this)
  );
  instance.volume = 1;
}
function mouseOverPump(e) {
  let tname = String(e.target.name);
  let ptypes = tname.split("-");
  switch (ptypes[0]) {
    case "lm":
      if (ptypes[1] == "pri") {
        if (LMPumpCont.getChildByName("lm-pri").image.src.includes("blue"))
          LMPumpCont.getChildByName("lm-pri").image =
            loader.getResult("HBblue");
        else
          LMPumpCont.getChildByName("lm-pri").image =
            loader.getResult("HBgrey");
      } else if (ptypes[1] == "on") {
        if (LMPumpCont.getChildByName("lm-on").image.src.includes("blue"))
          LMPumpCont.getChildByName("lm-on").image = loader.getResult("HBblue");
        else
          LMPumpCont.getChildByName("lm-on").image = loader.getResult("HBgrey");
      } else {
        if (LMPumpCont.getChildByName("lm-off").image.src.includes("blue"))
          LMPumpCont.getChildByName("lm-off").image =
            loader.getResult("HBblue");
        else
          LMPumpCont.getChildByName("lm-off").image =
            loader.getResult("HBgrey");
      }
      break;
    case "rm":
      if (ptypes[1] == "pri") {
        if (RMPumpCont.getChildByName("rm-pri").image.src.includes("blue"))
          RMPumpCont.getChildByName("rm-pri").image =
            loader.getResult("HBblue");
        else
          RMPumpCont.getChildByName("rm-pri").image =
            loader.getResult("HBgrey");
      } else if (ptypes[1] == "on") {
        if (RMPumpCont.getChildByName("rm-on").image.src.includes("blue"))
          RMPumpCont.getChildByName("rm-on").image = loader.getResult("HBblue");
        else
          RMPumpCont.getChildByName("rm-on").image = loader.getResult("HBgrey");
      } else {
        if (RMPumpCont.getChildByName("rm-off").image.src.includes("blue"))
          RMPumpCont.getChildByName("rm-off").image =
            loader.getResult("HBblue");
        else
          RMPumpCont.getChildByName("rm-off").image =
            loader.getResult("HBgrey");
      }
      break;
    case "ls":
      if (ptypes[1] == "on") {
        if (LSPumpCont.getChildByName("ls-on").image.src.includes("blue"))
          LSPumpCont.getChildByName("ls-on").image = loader.getResult("HBblue");
        else
          LSPumpCont.getChildByName("ls-on").image = loader.getResult("HBgrey");
      } else {
        if (LSPumpCont.getChildByName("ls-off").image.src.includes("blue"))
          LSPumpCont.getChildByName("ls-off").image =
            loader.getResult("HBblue");
        else
          LSPumpCont.getChildByName("ls-off").image =
            loader.getResult("HBgrey");
      }
      break;
    case "rs":
      if (ptypes[1] == "on") {
        if (RSPumpCont.getChildByName("rs-on").image.src.includes("blue"))
          RSPumpCont.getChildByName("rs-on").image = loader.getResult("HBblue");
        else
          RSPumpCont.getChildByName("rs-on").image = loader.getResult("HBgrey");
      } else {
        if (RSPumpCont.getChildByName("rs-off").image.src.includes("blue"))
          RSPumpCont.getChildByName("rs-off").image =
            loader.getResult("HBblue");
        else
          RSPumpCont.getChildByName("rs-off").image =
            loader.getResult("HBgrey");
      }
      break;
  }
}
function mouseOutPump(e) {
  let tname = String(e.target.name);
  let ptypes = tname.split("-");
  switch (ptypes[0]) {
    case "lm":
      if (ptypes[1] == "pri") {
        if (LMPumpCont.getChildByName("lm-pri").image.src.includes("blue"))
          LMPumpCont.getChildByName("lm-pri").image = loader.getResult("Bblue");
        else
          LMPumpCont.getChildByName("lm-pri").image = loader.getResult("Bgrey");
      } else if (ptypes[1] == "on") {
        if (LMPumpCont.getChildByName("lm-on").image.src.includes("blue"))
          LMPumpCont.getChildByName("lm-on").image = loader.getResult("Bblue");
        else
          LMPumpCont.getChildByName("lm-on").image = loader.getResult("Bgrey");
      } else {
        if (LMPumpCont.getChildByName("lm-off").image.src.includes("blue"))
          LMPumpCont.getChildByName("lm-off").image = loader.getResult("Bblue");
        else
          LMPumpCont.getChildByName("lm-off").image = loader.getResult("Bgrey");
      }
      break;
    case "rm":
      if (ptypes[1] == "pri") {
        if (RMPumpCont.getChildByName("rm-pri").image.src.includes("blue"))
          RMPumpCont.getChildByName("rm-pri").image = loader.getResult("Bblue");
        else
          RMPumpCont.getChildByName("rm-pri").image = loader.getResult("Bgrey");
      } else if (ptypes[1] == "on") {
        if (RMPumpCont.getChildByName("rm-on").image.src.includes("blue"))
          RMPumpCont.getChildByName("rm-on").image = loader.getResult("Bblue");
        else
          RMPumpCont.getChildByName("rm-on").image = loader.getResult("Bgrey");
      } else {
        if (RMPumpCont.getChildByName("rm-off").image.src.includes("blue"))
          RMPumpCont.getChildByName("rm-off").image = loader.getResult("Bblue");
        else
          RMPumpCont.getChildByName("rm-off").image = loader.getResult("Bgrey");
      }
      break;
    case "ls":
      if (ptypes[1] == "on") {
        if (LSPumpCont.getChildByName("ls-on").image.src.includes("blue"))
          LSPumpCont.getChildByName("ls-on").image = loader.getResult("Bblue");
        else
          LSPumpCont.getChildByName("ls-on").image = loader.getResult("Bgrey");
      } else {
        if (LSPumpCont.getChildByName("ls-off").image.src.includes("blue"))
          LSPumpCont.getChildByName("ls-off").image = loader.getResult("Bblue");
        else
          LSPumpCont.getChildByName("ls-off").image = loader.getResult("Bgrey");
      }
      break;
    case "rs":
      if (ptypes[1] == "on") {
        if (RSPumpCont.getChildByName("rs-on").image.src.includes("blue"))
          RSPumpCont.getChildByName("rs-on").image = loader.getResult("Bblue");
        else
          RSPumpCont.getChildByName("rs-on").image = loader.getResult("Bgrey");
      } else {
        if (RSPumpCont.getChildByName("rs-off").image.src.includes("blue"))
          RSPumpCont.getChildByName("rs-off").image = loader.getResult("Bblue");
        else
          RSPumpCont.getChildByName("rs-off").image = loader.getResult("Bgrey");
      }
      break;
  }
}
function clickPump(e) {
  if (trainMode && gamePaused) return;
  let tname = String(e.target.name);
  console.log(tname, "Clicked Pump");
  let ptypes = tname.split("-");
  switch (ptypes[0]) {
    case "lm":
      LMPumpCont.getChildByName("lm-on").image = loader.getResult("Bgrey");
      LMPumpCont.getChildByName("lm-pri").image = loader.getResult("Bgrey");
      LMPumpCont.getChildByName("lm-off").image = loader.getResult("Bgrey");
      LMPumpCont.getChildByName(tname).image = loader.getResult("Bblue");
      break;
    case "rm":
      RMPumpCont.getChildByName("rm-on").image = loader.getResult("Bgrey");
      RMPumpCont.getChildByName("rm-pri").image = loader.getResult("Bgrey");
      RMPumpCont.getChildByName("rm-off").image = loader.getResult("Bgrey");
      RMPumpCont.getChildByName(tname).image = loader.getResult("Bblue");
      break;
    case "ls":
      LSPumpCont.getChildByName("ls-on").image = loader.getResult("Bgrey");
      LSPumpCont.getChildByName("ls-off").image = loader.getResult("Bgrey");
      LSPumpCont.getChildByName(tname).image = loader.getResult("Bblue");
      break;
    case "rs":
      RSPumpCont.getChildByName("rs-on").image = loader.getResult("Bgrey");
      RSPumpCont.getChildByName("rs-off").image = loader.getResult("Bgrey");
      RSPumpCont.getChildByName(tname).image = loader.getResult("Bblue");
      break;
  }
  if (ptypes[1] == "pri") {
    if (ptypes[0] == "lm") {
      usingLMPump = false;
      canUseLSpump = true;
      LMPumpStatus = "PRI";
    } else {
      // ptypes[0] == 'rm'
      usingRMPump = false;
      canUseRSpump = true;
      RMPumpStatus = "PRI";
    }
  } else if (ptypes[1] == "on") {
    if (ptypes[0] == "lm") {
      usingLMPump = true;
      LMPumpStatus = "ON";
    } else if (ptypes[0] == "rm") {
      usingRMPump = true;
      RMPumpStatus = "ON";
    } else if (ptypes[0] == "ls") {
      usingLSPump = true;
    } else if (ptypes[0] == "rs") {
      usingRSPump = true;
    }
  } else {
    // ptypes[1] == 'off'
    if (ptypes[0] == "lm") {
      usingLMPump = false;
      LMPumpStatus = "OFF";
    } else if (ptypes[0] == "rm") {
      usingRMPump = false;
      RMPumpStatus = "OFF";
    } else if (ptypes[0] == "ls") {
      usingLSPump = false;
      timeCounterLSPump = 0;
      playedCautionForSpump = false;
    } else if (ptypes[0] == "rs") {
      usingRSPump = false;
      timeCounterRSPump = 0;
      playedCautionForSpump = false;
    }
  }
}
function initFuelStatus() {
  LMPumpImg.rotation = 270;
  usingLMPump = true;
  LSPumpImg.rotation = 0;
  usingLSPump = false;
  LMPumpStatus = "ON";
  LMPumpCont.getChildByName("lm-on").image = loader.getResult("Bblue");
  LMPumpCont.getChildByName("lm-pri").image = loader.getResult("Bgrey");
  LMPumpCont.getChildByName("lm-off").image = loader.getResult("Bgrey");
  LSPumpCont.getChildByName("ls-on").image = loader.getResult("Bgrey");
  LSPumpCont.getChildByName("ls-off").image = loader.getResult("Bblue");

  RMPumpImg.rotation = 270;
  usingRMPump = true;
  RSPumpImg.rotation = 0;
  usingRSPump = false;
  RMPumpStatus = "ON";
  RMPumpCont.getChildByName("rm-on").image = loader.getResult("Bblue");
  RMPumpCont.getChildByName("rm-pri").image = loader.getResult("Bgrey");
  RMPumpCont.getChildByName("rm-off").image = loader.getResult("Bgrey");
  RSPumpCont.getChildByName("rs-on").image = loader.getResult("Bgrey");
  RSPumpCont.getChildByName("rs-off").image = loader.getResult("Bblue");

  movedGreenByLSpump = false;
  movedGreenByRSpump = false;
  canUseLSpump = false;
  canUseRSpump = false;
}
function confirmFuelStatus() {
  if (r_l > 0) {
    if (
      LMPumpImg.rotation >= 270 &&
      usingLMPump &&
      !usingLSPump
    ) {
      score.fuel.correct++;
      totalScore++;
      console.log("fuel fuel correct");
    }
  } else {
    if (
      RMPumpImg.rotation >= 270 &&
      usingRMPump &&
      !usingRSPump
    ) {
      score.fuel.correct++;
      totalScore++;
      console.log("fuel fuel correct");
    }
  }
  timeCounterFuel = 0;
  startPump = false;
  playedCaution = false;
  activeCaution = false;
  initFuelStatus();
}
function handleCompleteSoundCaution(e) {
  console.log("played Caution Audio");
  // playedCaution = true;
  // activeCaution = true;
}
function runLPump() {
  // LM Pump
  if (LMPumpImg.rotation > 0 && !movedGreenByLSpump) {
    LMPumpImg.rotation -= decreaseLHPump;
  }
  if (LMPumpImg.rotation < 90) {
    if (!playedCaution) {
      console.log("Caution! Caution! Caution!");
      var instance = createjs.Sound.play("Caution");
      instance.on(
        "complete",
        createjs.proxy(this.handleCompleteSoundCaution, this)
      );
      instance.volume = 1;
      playedCaution = true;
      activeCaution = true;
    }
  }
  // LS Pump
  if (LSPumpImg.rotation > 0 && !usingLSPump)
    LSPumpImg.rotation -= increaseSPump;
  if (usingLSPump) {
    if (LSPumpImg.rotation < 270) LSPumpImg.rotation += increaseSPump;
    if (LMPumpStatus == "PRI" && LMPumpImg.rotation < 270) {
      LMPumpImg.rotation += increaseMPump;
      if (LMPumpImg.rotation >= 270) movedGreenByLSpump = true;
    }
  }
  // Caution
  if (
    LMPumpImg.rotation > 100 &&
    timeCounterLSPump < timeForStandPump
  ) {
    activeCaution = false;
  } else {
    activeCaution = true;
  }
  if (timeCounterRSPump >= timeForStandPump && !playedCautionForSpump) {
    console.log("Standby! Standby! Standby!");
    var instance = createjs.Sound.play("Caution");
    instance.on(
      "complete",
      createjs.proxy(this.handleCompleteSoundCaution, this)
    );
    instance.volume = 1;
    playedCautionForSpump = true;
    activeCaution = true;
  }
}
function runRPump() {
  // RM Pump
  if ( RMPumpImg.rotation > 0 && !movedGreenByRSpump ) {
    RMPumpImg.rotation -= decreaseRHPump;
  }
  if (RMPumpImg.rotation < 90) {
    if (!playedCaution) {
      console.log("Caution! Caution! Caution!");
      var instance = createjs.Sound.play("Caution");
      instance.on(
        "complete",
        createjs.proxy(this.handleCompleteSoundCaution, this)
      );
      instance.volume = 1;
      playedCaution = true;
      activeCaution = true;
    }
  }
  // RS Pump
  if (RSPumpImg.rotation > 0 && !usingRSPump)
    RSPumpImg.rotation -= increaseSPump;
  if (usingRSPump) {
    if (RSPumpImg.rotation < 270) RSPumpImg.rotation += increaseSPump;
    if (RMPumpStatus == "PRI" && RMPumpImg.rotation < 270) {
      RMPumpImg.rotation += increaseMPump;
      if (RMPumpImg.rotation >= 270) movedGreenByRSpump = true;
    }
  }
  // Caution
  if (
    RMPumpImg.rotation > 100 &&
    timeCounterRSPump < timeForStandPump
  ) {
    activeCaution = false;
  } else {
    activeCaution = true;
  }

  if (timeCounterRSPump >= timeForStandPump && !playedCautionForSpump) {
    console.log("Standby! Standby! Standby!");
    var instance = createjs.Sound.play("Caution");
    instance.on(
      "complete",
      createjs.proxy(this.handleCompleteSoundCaution, this)
    );
    instance.volume = 1;
    playedCautionForSpump = true;
    activeCaution = true;
  }
}
function reduceFuel() {
  if (trainMode && !$("#FULE_check").prop("checked")) return;
  if (r_l > 0) {
    runLPump();
  } else {
    runRPump();
  }
}
function chooseQuestionType() {
  let _q = -1;
  let _selecting = true;
  while(_selecting) {
    _q = Math.floor(Math.random() * 5);
    console.log("new new", _q, qType);
    switch(_q) {
      case 0:
        if(qType != 'freq') _selecting = false;
        break;
      case 1:
        if (random_mode){
          if(qType != 'alt') _selecting = false;
        }
        break;
      case 2:
        if (random_mode){
          if(qType != 'ro') _selecting = false;
        }
        break;
      case 3:
        if(qType != 'way') _selecting = false;
        break;
      case 4:
        if(random_mode){
          if(qType != 'trk') _selecting = false;
        }
        break;
    }
  }
  console.log("result, reult", _q, qType);
  return _q;
}
function chooseCorrectItem(q) {
  let correctItem, data;
  let _choosing = true;
  switch (q) {
    case 0:
      while (_choosing) {
        correctItem = Math.floor(Math.random() * q_frequencyList.length);
        data = q_frequencyList[correctItem];
        if (!oldData.freq) _choosing = false;
        else if (oldData.freq.rad != data.val.rad || oldData.freq.freq != data.val.freq ) _choosing = false;
      } 
      break;
    case 1:
      while (_choosing) {
        correctItem = Math.floor(Math.random() * q_altitudeList.length);
        data = q_altitudeList[correctItem];
        if (!oldData.alt) _choosing = false;
        else if (oldData.alt !== data.val) _choosing = false;
      } 
      break;
    case 2:
      while (_choosing) {
        correctItem = Math.floor(Math.random() * q_ROList.length);
        data = q_ROList[correctItem];
        if (!oldData.ro) _choosing = false;
        else if (oldData.ro.alt !== data.val.alt) _choosing = false;
      } 
      break;
    case 3:
      while (_choosing) {
        correctItem = Math.floor(Math.random() * q_waypointList.length);
        data = q_waypointList[correctItem];
        if (!oldData.way) _choosing = false;
        else if (oldData.way !== data.val) _choosing = false;
      } 
      break;
    case 4:
      while (_choosing) {
        correctItem = Math.floor(Math.random() * q_TRKList.length);
        data = q_TRKList[correctItem];
        if (!oldData.trk) _choosing = false;
        else if (oldData.trk !== data.val) _choosing = false;
      } 
      break;
  }
  return correctItem;
}
function pickSound() {
  if (real_question_in_progress || real_question_time_trigger) return;
  let w = chooseQuestionType();
  let data;
  const f = chooseCorrectItem(w);
  if (trainMode) {
    if (BtnNav.alpha > 0.2) {
      if (w > 0) w = w;
      else {
        if (freqCont.visible) w = w;
        else w = Math.floor(Math.random() * 3) + 1;
      }
    } else {
      if (freqCont.visible) w = 0;
      else return;
    }
  }

  totalCount++;

  switch (w) {
    case 0:
      qType = "freq";
      data = q_frequencyList[f];
      targetAudioTime = targetRadioTime;
      score.freq.total++;
      break;
    case 1:
      qType = "alt";
      data = q_altitudeList[f];
      if (Number(currentAltitude) > data.val) {
        if (data.file.includes("climb")) {
          data = q_altitudeList[f + 1];
        }
      } else {
        if (data.file.includes("descend")) {
          data = q_altitudeList[f - 1];
        }
      }
      targetAudioTime = targetNavTime;
      score.nav.total++;
      break;
    case 2:
      qType = "ro";
      // f = Math.floor(Math.random() * q_ROList.length);
      data = q_ROList[f];
      if (Number(currentAltitude) > data.val.alt) {
        if (data.file.includes("roc")) {
          data = q_ROList[f - 1];
        }
      } else {
        if (data.file.includes("rod")) {
          data = q_ROList[f + 1];
        }
      }
      data.val.old = Number(currentAltitude);
      targetAlt = data.val.alt;
      targetRO = Math.abs(Number(currentAltitude) - targetAlt) / data.val.time;
      targetAudioTime = targetROTime;
      score.nav.total++;
      break;
    case 3:
      qType = "way";
      data = q_waypointList[f];
      wayAirCont.visible = true;
      wayAirT.text = data.val;
      wayAirCont.y = 0;
      wayAirLine.visible = false;
      wayAirLine.y = 18;
      wayAirLine.scaleY = 1;
      targetAudioTime = targetWayTime;
      score.nav.total++;
      break;
    case 4:
      qType = 'trk';
      data = q_TRKList[f];
      if (Number(currentAltitude) > data.val.alt) {
        if (data.txt.includes("climb")) {
          data = q_TRKList[f + 1];
        }
      } else {
        if (data.txt.includes("descend")) {
          data = q_TRKList[f - 1];
        }
      }
      data.val.old = Number(currentAltitude);
      // targetRO = Math.abs(Number(currentAltitude) - data.val.alt) / data.val.rate;
      targetAudioTime = targetROTime;
      score.nav.total++;
      break;
  }
  console.log(qType, sec);

  audioQuestion(data);
}
function audioQuestion(data) {
  currentQuestion = data.txt;
  currentAnswer = data.val;
  oldData[qType] = data.val;
  if (data.new_alt > 0){
    newAltitude = data.new_alt;
  } else {
    newAltitude = null;
  }
  orderT.text = currentQuestion;
  question_during_flag = true;
  playingAudio = true;
  var instance = createjs.Sound.play(data.file);
  instance.on("complete", createjs.proxy(this.handleCompleteSoundC, this));
  instance.volume = 1;
}
function handleCompleteSoundC() {
  console.log("audio done");
  playingAudio = false;
}
function handleCompleteSoundWarning() {
  console.log("warning audio done");
}

var real_question_time_trigger = false;

function keepTime() {
  if (trainMode && gamePaused) return;
  //get real question at equal time intervals.
  if (random_mode == false){
    if (real_question_index < 15){
      if (sec == real_question_index * real_question_interval){
        real_question_time_trigger = true;
        if (question_during_flag == false){
          score.nav.total++;
          data = real_scenarios[selected_real_scenaario_index][real_question_index];
          real_question_in_progress = true;
          qType = data.type;
          targetAudioTime = data.type == "alt"? targetNavTime:targetROTime;
          audioQuestion(data);
          real_question_index++;
          real_question_time_trigger = false;
          timeCounterCurrentTask = 0;
        }
      }
    }
    if (real_question_time_trigger){
      if (question_during_flag == false){
        score.nav.total++;
        data = real_scenarios[selected_real_scenaario_index][real_question_index];
        real_question_in_progress = true;
        qType = data.type;
        targetAudioTime = data.type == "alt"? targetNavTime:targetROTime;
        audioQuestion(data);
        real_question_index++;
        real_question_time_trigger = false;
        timeCounterCurrentTask = 0;
      }
    }
  }
  //-----------------------------
  sec++;
  var rsec = totalSec - sec;
  var tStr = String(Math.floor(rsec / 60) + " mins " + (rsec % 60) + " secs");
  document.getElementById("tsider").innerHTML = String(tStr);
  let m = Math.floor(sec / 60);
  let mm = m < 10 ? `0${m}` : m;
  let s = Math.floor(sec % 60);
  let ss = s < 10 ? `0${s}` : s;
  timeT.text = `${startHour} : ${mm} : ${ss}`;
  manageTest();
  // Snapshot Button
  if (sec % 120 == 0) {
    score.fuel.total++;
    totalCount++;
  }
  if (sec % 131 == 0) {
    if (!touchedPhotoButton) {
      let _photo = Math.floor(Math.random() * 3);
      var instance = createjs.Sound.play("Snapshot" + _photo);
      instance.on(
        "complete",
        createjs.proxy(this.handleCompleteSoundWarning, this)
      );
      instance.volume = 3;
    }
    touchedPhotoButton = false;
  }
  // checking game over
  if (sec > totalSec) {
    clearInterval(trackTime);
    isGame = false;
    startChecklist = false;
    startPump = false;
    sec = 0;
    gameOver();
  }
  // choose Checklist or Pump Question
  if (sec % 60 == 45 && !startChecklist && !startPump) {
  // if (sec % 60 == 1 && !startChecklist && !startPump) {
    let _cp = Math.floor(Math.random() * 2);
    // console.log(sec, "_cp:", _cp);
    // _cp = 1;
    switch (_cp) {
      case 0:
        startChecklist = true;
        break;
      case 1:
        r_l = Math.floor(Math.random() * 2);
        startPump = true;
        totalCount++;
        score.fuel.total++;
        console.log("fuel fuel", score.fuel.total)
        break;
      default:
        break;
    }
    if (trainMode) {
      if (BtnElec.alpha > 0.2) {
        if (startChecklist) startChecklist = true;
        else {
          if (BtnFuel.alpha > 0.2) startPump = true;
          else startChecklist = true;
        }
      } else {
        startChecklist = false;
        if (BtnFuel.alpha > 0.2) startPump = true;
      }

      if (BtnFuel.alpha > 0.2) {
        if (startPump) startPump = true;
        else {
          if (BtnElec.alpha > 0.2) startChecklist = true;
          else startPump = true;
        }
      } else {
        startPump = false;
        if (BtnElec.alpha > 0.2) startChecklist = true;
      }
    }
  }
  // checking checklist
  if (startChecklist && (!trainMode || (trainMode && $("#ELEC_check").prop("checked")))) {
    if (timeCounterChecklist == 0) pickChecklist();
    timeCounterChecklist++;
    if (timeCounterChecklist > timeChecklist) {
      confirmChecklist();
    }
  }
  // checking generate Air
  if (!trainMode || (trainMode && rectCont.visible)) {
    timeCounterAir++;
    if (timeCounterAir > timeAir) {
      timeCounterAir = 0;
      generateAir();
    }
  }
  // checking Fuel
  if (startPump && (!trainMode || (trainMode && $("#FULE_check").prop("checked")))) {
    if (playedCaution)  timeCounterFuel++;
    console.log("fuel fuel", timeCounterFuel)
    if (timeCounterFuel > targetFuelTime) {
      console.log("fuel fuel confirm");
      confirmFuelStatus();
    }

    if (usingLSPump) timeCounterLSPump++;
    if (usingRSPump) timeCounterRSPump++;
  }
  
  timeCounterCurrentTask++;
  if (timeCounterCurrentTask > targetAudioTime * intensity) {
    confirmAnswer(true);
  }
}
function confirmAnswer(b_flag) {
  if (!b_flag && orderT.text == "") return;
  if (orderT.text != "") {
    switch (qType) {
      case "freq":
        if (radio == currentAnswer.rad && freq == currentAnswer.freq) {
          score.freq.correct++;
          totalScore++;
        } else {
          radio = currentAnswer.rad;
          freq = currentAnswer.freq;
          radioT.text = String(radio);
          freqT.text = String(freq);
        }
        break;
      case "alt":
        if (currentAltitude == String(currentAnswer)) {
          score.nav.correct++;
          totalScore++;
        } else {
          currentAltitude = currentAnswer;
          altitudeT.text = currentAltitude;
          waypointT.text = "FL" + String(currentAltitude).slice(0, -2);
        }
        oldAltitude = currentAltitude;
        break;
      case "trk":
        if (b_flag){
          if (random_mode){
            let a_trk = Math.floor(
              (Math.abs(currentAnswer.old - currentAnswer.alt) * 10 / currentAnswer.rate)
            )/ 10;
            if (currentAltitude == String(currentAnswer.alt) && Math.abs(parseFloat(currentTRK) - a_trk) < trk_tolerance_range[tolernace + 1]){
              score.nav.correct++;
              totalScore++;
              currentAltitude = currentAnswer.alt;
              altitudeT.text = currentAltitude;
              waypointT.text = "FL" + String(currentAltitude).slice(0, -2);
              
            } else {
              currentAltitude = currentAnswer.alt;
              altitudeT.text = currentAltitude;
              waypointT.text = "FL" + String(currentAltitude).slice(0, -2);
              
              currentTRK = a_trk;
              TRK.text = String(currentTRK);
            }
          } else {
            if (currentAltitude == newAltitude && Math.abs(parseFloat(currentTRK) - currentAnswer) < trk_tolerance_range[tolernace + 1]){
              score.nav.correct++;
              totalScore++;
              if (newAltitude > 0){
                currentAltitude = newAltitude;
                altitudeT.text = currentAltitude;
                waypointT.text = "FL" + String(currentAltitude).slice(0, -2);
              }
            } else {
              if (newAltitude > 0){
                currentAltitude = newAltitude;
                altitudeT.text = currentAltitude;
                waypointT.text = "FL" + String(currentAltitude).slice(0, -2);
              }
              currentTRK = currentAnswer;
              TRK.text = String(currentTRK);
            }
          }
          oldTRK = currentTRK;
        }
        break;
      case "ro":
        if (b_flag){
          let a_ro = currentAnswer;
          if (random_mode){
            a_ro = Math.floor(
              Math.abs(currentAnswer.old - currentAnswer.alt) / currentAnswer.time
            );
          }

          if (random_mode){
            if (
              currentAltitude == String(currentAnswer.alt) &&
              Math.abs(parseFloat(currentRO) - a_ro) < ro_tolerance_range[tolernace + 1]
            ) {
              score.nav.correct++;
              totalScore++;
            } else {
              currentAltitude = currentAnswer.alt;
              altitudeT.text = currentAltitude;
              waypointT.text = "FL" + String(currentAltitude).slice(0, -2);
              currentRO = a_ro;
              ROT.text = String(currentRO);
            }
          } else {
            if (Math.abs(parseFloat(currentRO) - a_ro) < ro_tolerance_range[tolernace + 1]){
              score.nav.correct++;
              totalScore++;
              if (newAltitude > 0){
                currentAltitude = newAltitude;
                altitudeT.text = currentAltitude;
                waypointT.text = "FL" + String(currentAltitude).slice(0, -2);
              }
            } else {
              if (newAltitude > 0){
                currentAltitude = newAltitude;
                altitudeT.text = currentAltitude;
                waypointT.text = "FL" + String(currentAltitude).slice(0, -2);
              }
              currentRO = a_ro;
              ROT.text = String(currentRO);
            }
          }
          
          oldAltitude = currentAltitude;
          oldRO = currentRO;
        }
        break;
      case "way":
        if (currentWaypoint == String(currentAnswer)) {
          score.nav.correct++;
          totalScore++;
          wayAirLine.visible = true;
        } else {
          wayAirLine.visible = false;
        }
        break;
    }
    if (qType != "ro" && qType != 'trk') orderT.text = "";
  }
  if (b_flag) {
    real_question_in_progress = false;
    question_during_flag = false;
    timeCounterCurrentTask = 0;
    orderT.text = "";
    pickSound();
  }
}
function manageTest() {
  currentS++;

  if (currentS > targetS) {
    currentS = 0;
  }

  document.getElementById("tsiderx").innerHTML = String("Score: " + totalScore);
}
function startMain() {
  let randomM = Math.floor(Math.random() * 24);
  startHour = randomM < 10 ? `0${randomM}` : `${randomM}`;
  timeT.text = `${startHour} : 00 : 00`;
  oldData = {
    freq: null,
    alt: null,
    ro: null,
    way: null,
    trk:null,
  };

  createjs.Ticker.setFPS(60);
  createjs.Ticker.addEventListener("tick", updateGame);
}
function updateGame(e) {
  if (isGame) {
    if (rectCont != null) {
      rectCont.updateCache();
    }
  }
  if (trainMode && gamePaused) return;
  moveAir();
  if (startPump) reduceFuel();
  // reduceFuel();
  if (wayAirCont.visible) {
    if (wayAirCont.y > 325) {
      // wayAirCont.visible = false;
      wayAirLine.visible = false;
    }
    wayAirCont.y += 0.25;
    wayAirLine.y += 0.25;
    wayAirLine.scaleY -= 0.25 / 300;
  }
  if (activeCaution) BtnCaution.image = loader.getResult("ABcaution");
  else BtnCaution.image = loader.getResult("Bcaution");
  stage.update();
}
function gameOver() {
  createjs.Tween.removeAllTweens();
  sec = 0;
  createjs.Sound.stop();
  gameCont.removeAllChildren();
  stage.removeChild(gameCont);
  showEndScreen();
}
function showEndScreen() {
  document.getElementById("tsider").innerHTML = String("End of Exam");
  let _totalScore = score.nav.correct + 
                    score.fuel.correct +
                    score.elec.correct +
                    score.freq.correct +
                    score.tcas.correct;
  let _totalCount = score.nav.total + 
                    score.fuel.total +
                    score.elec.total +
                    score.freq.total +
                    score.tcas.total;
  $("#correct_answer").text(_totalScore);
  $("#total_question").text(_totalCount);
  $("#average_accuracy").text(
    _totalCount == 0
    ? "( 0% )"
    : "( " + ((_totalScore / _totalCount) * 100).toFixed(0) + "% )"
    );
  $("#correct-NAV").text(score.nav.correct);
  $("#total-NAV").text(score.nav.total);

  $("#correct-FUEL").text(score.fuel.correct);
  $("#total-FUEL").text(score.fuel.total);

  $("#correct-ELEC").text(score.elec.correct);
  $("#total-ELEC").text(score.elec.total);

  $("#correct-Freq").text(score.freq.correct);
  $("#total-Freq").text(score.freq.total);

  $("#correct-TCAS").text(score.tcas.correct);
  $("#total-TCAS").text(score.tcas.total);

  showScreen("#results-screen");
  showSetting = false;
  let _accu = _totalCount == 0 ? 0 : ((_totalScore / _totalCount) * 100).toFixed(0);
  // saveLoaded();
  insertResults(_accu, totalSec);
  stage.update();

  document
    .querySelector("#restart-button")
    .addEventListener("click", startAgain);
}
function startAgain() {
  showStartScreen();
}

//save the score
function saveLoaded() {
  var accu = Math.round((score / 40) * 100);
  insertResults(accu, totalSec);
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

$(document).ready(function () {
  $("#logo").click(function () {
    if (!showSetting) return;
    $("#setting").slideDown();
    $("#opaque").show();
  });
  
  $('#keyboardModal').draggable();
  $(window).click(function(event) {
    if ($(event.target).is("#keyboardModal")) {
        $("#keyboardModal").fadeOut();
    }
  });
  

  $("body").click(function (event) {
    if (
      !$(event.target).closest("#setting").length &&
      !$(event.target).closest("#logo").length
    ) {
      $("#setting").slideUp();
      $("#opaque").hide();
    }
  });

  $("#exit_setting").click(function () {
    $("#setting").slideUp();
    $("#opaque").hide();

    // document.getElementsByTagName("body")[0].style = "background-color: white";

    clearInterval(trackTime);

    createjs.Tween.removeAllTweens();
    sec = 0;
    startChecklist = false;
    startPump = false;
    isGame = false;
    createjs.Sound.stop();
    gameCont.removeAllChildren();
    stage.removeChild(gameCont);

    showStartScreen();
  });

  $("#NAV_check").change(function () {
    if (BtnNav.image.currentSrc.includes("blue"))
      navCont.visible = $(this).prop("checked");
    if ($(this).prop("checked")) {
      BtnNav.alpha = 1;
      BtnNav.cursor = "pointer";
      BtnNav.on("click", clickNEF);
    } else {
      BtnNav.alpha = 0.2;
      BtnNav.cursor = "default";
      BtnNav.removeAllEventListeners("click");
    }
  });

  $("#ELEC_check").change(function () {
    if (BtnElec.image.currentSrc.includes("blue"))
      elecCont.visible = $(this).prop("checked");
    if ($(this).prop("checked")) {
      BtnElec.alpha = 1;
      BtnElec.cursor = "pointer";
      BtnElec.on("click", clickNEF);
    } else {
      BtnElec.alpha = 0.2;
      BtnElec.cursor = "default";
      BtnElec.removeAllEventListeners("click");
      BtnWarning.image = loader.getResult("Bwarning");
    }
    startChecklist = false;
  });

  $("#FULE_check").change(function () {
    if (BtnFuel.image.currentSrc.includes("blue"))
      fuelCont.visible = $(this).prop("checked");
    if ($(this).prop("checked")) {
      BtnFuel.alpha = 1;
      BtnFuel.cursor = "pointer";
      BtnFuel.on("click", clickNEF);
    } else {
      BtnFuel.alpha = 0.2;
      BtnFuel.cursor = "default";
      BtnFuel.removeAllEventListeners("click");
      BtnCaution.image = loader.getResult("Bcaution");
      activeCaution = false;
    }
    startPump = false;
  });

  $("#Radio_check").change(function () {
    freqCont.visible = $(this).prop("checked");
  });
  $("#keyboard_check").click(function () {
    keyboard_flag = !keyboard_flag;
    if (keyboard_flag){
      $("#keyboard_check").text('Disable On-Screen Keyboard')
    } else {
      $("#keyboard_check").text('Enable On-Screen Keyboard')
    }
  });

  $("#TCAS_check").change(function () {
    rectCont.visible = $(this).prop("checked");
  });
  $("#statements_check").change(function () {
    orderT.visible = $(this).prop("checked");
  });

  $(".playpause").click(function () {
    if (!trainMode) return;
    gamePaused = !gamePaused;
    if (gamePaused) {
      // $(".playpause").css('background-image','url(./images/playpause_disabled.svg)');
      $("#gamepause").show();
    } else {
      // $(".playpause").css('background-image','url(./images/playpause.svg)');
      $("#gamepause").hide();
    }
  });

  $("#gamepause").click(function () {
    if (!trainMode) return;
    gamePaused = false;
    $(".playpause").css("background-image", "url(./images/playpause.svg)");
    $("#gamepause").hide();
  });

  $(".stepper-item-intensity").bind("click", function () {
    $(".stepper-item-intensity").each((index, el) => {
      if (index <= $(this).index()) {
        $(el).removeClass("active").addClass("completed");
      } else {
        $(el).removeClass("active").removeClass("completed");
      }
    });
    $(this).addClass("active");
    intensity = parseFloat($(this).attr("key"));
  });
  $(".stepper-item-tolerance").bind("click", function () {
    $(".stepper-item-tolerance").each((index, el) => {
      if (index <= $(this).index()) {
        $(el).removeClass("active").addClass("completed");
      } else {
        $(el).removeClass("active").removeClass("completed");
      }
    });
    $(this).addClass("active");
    tolernace = parseFloat($(this).attr("key"));
  });

  $(".key").on("touchstart mousedown", function() {
    $(this).css("transform", "scale(0.9)");
    $(this).css('background-color', '#555');
  });

  // Revert scale effect on touchend or mouseup
  $(".key").on("touchend mouseup", function() {
    $(this).css("transform", "scale(1)");
    $(this).css('background-color', '#232323');
  });

  $('.key').bind('click', function(){
    var val = $(this).text();
    if (activeAltitude ) {
      if ($(this).attr('id') == 'clear-btn') currentAltitude = currentAltitude.slice(0, -1);
      else {
        if (val == '.' && currentAltitude.includes('.')) {
          return;
        }
        if (currentAltitude.length > 6) return;
        currentAltitude = currentAltitude + String(val);
      }
      altitudeT.text = String(currentAltitude);
    }
  
    if (activeRO) {
      if ($(this).attr('id') == 'clear-btn') currentRO = currentRO.slice(0, -1);
      else {
        if (val == '.' && currentRO.includes('.')) {
          return;
        }
        if (currentRO.length > 3) return;
        currentRO = currentRO + String(val);
      }
      ROT.text = String(currentRO);
    }
  
    if (activeTrk) {
      if ($(this).attr('id') == 'clear-btn') {
        currentTRK = currentTRK.slice(0, -1);
      } else {
        if (val == '.' && currentTRK.includes('.')) {
          return;
        }
        else {
          if (currentTRK.length > 3) return;
          currentTRK = currentTRK + String(val);
        }
      }
      TRK.text = String(currentTRK);
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
      mode: trainMode? "training" : "normal",
    }),
  });
}
