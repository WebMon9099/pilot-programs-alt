// JavaScript Document
var canvas;
var stage;
var sec = 0;
var loader;

var totalSec = 300;
var isGame = false;
var gameCont;
var score = {
  nav: { flag: false, total: 0, correct: 0 },
  fuel: { flag: false, total: 0, correct: 0 },
  elec: { flag: false, total: 0, correct: 0 },
  freq: { flag: false, total: 0, correct: 0 },
  tcas: { flag: false, total: 0, correct: 0 },
};
var totalCount = 0,
  totalScore = 0;
var trackTime;

var trainMode = false;
var showSetting = false;

// Gameplay mode
var gamePaused = false;
const isSafari = platform.name.toLowerCase() == "safari";

var seeSaw;
var ball;
var verticalBar;
var manual_move_flag = false;
var maxAngle = 14.4;
var minAngle = -14.4;
var ballXstep;
let manual_move_interval;
var time_elapsed = 0;
var ex_rotation = 0;

const gravity = 0.098;
const rotationSpeed = 0.01;
const ballRadius = 15;
const triangle_length = 20;
const rotationStep = 0.2;
const VerticalChangeInterval = 3;

function Main() {
  canvas = document.getElementById("test");
  stage = new createjs.Stage(canvas);
  optimizeForTouchAndScreens();
  stage.enableMouseOver(10);
  manifest = [
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
  document.querySelector("#tside .logo-title").innerHTML = String("Balance");
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
  showScreen("#main-screen");
  showSetting = true;
  gameCont = new createjs.Container();
  stage.addChild(gameCont);

  //create the See-Saw
  seeSaw = new createjs.Shape();
  seeSaw.graphics.beginFill("#3f474c").drawRect(-canvas.width / 4, -5, canvas.width / 2, 10);
  seeSaw.x = canvas.width / 2;
  seeSaw.y = 300;
  seeSaw.rotation = 0;
  gameCont.addChild(seeSaw);

  //create the vertical bar
  verticalBar = new createjs.Shape();
  verticalBar.graphics.beginFill("#dfeef5").drawRect(-ballRadius, -canvas.height/2, ballRadius * 2, canvas.height);
  verticalBar.y = seeSaw.y;
  verticalBar.x = seeSaw.x - 200;
  gameCont.addChild(verticalBar);
  
  // Draw a centerShape
  const centerShape = new createjs.Shape();  
  centerShape.graphics.beginFill("#dbdbdb").drawCircle(seeSaw.x, seeSaw.y+ballRadius/2, ballRadius);
    // .lineTo(seeSaw.x-triangle_length/2, seeSaw.y+triangle_length*Math.cos(Math.PI/6))
    // .lineTo(seeSaw.x+triangle_length/2, seeSaw.y+triangle_length*Math.cos(Math.PI/6))
    // .closePath();
  gameCont.addChild(centerShape);

  //create the Ball
  ball = new createjs.Shape();
  ball.graphics.beginRadialGradientFill(["#ed1e79", "#9f005d"], [0, 1], 0, 0, 0, 0, 0, ballRadius).drawCircle(0, 0, ballRadius);
  ball.x = seeSaw.x;
  ball.y = seeSaw.y - ballRadius;
  ball.dx = 0;
  ball.dy = 0;
  stage.addChild(ball);
  stage.update();
  isGame = true;
  trackTime = setInterval(keepTime, 1000);

  window.addEventListener("keydown", getKeyDown);
  window.addEventListener("keyup", getKeyUp);

  startMain();

  if (trainMode && gamePaused) $("#gamepause").show();
}
function moveBallManually(direction = 1){
  if (direction == 1){
    if (!(seeSaw.rotation < maxAngle)){
      return;
    }
  } else {
    if (!(seeSaw.rotation > minAngle)){
      return;
    }
  }
  seeSaw.rotation += (direction*rotationStep);
  ballXstep = Math.abs(ball.x - seeSaw.x)*Math.cos(seeSaw.rotation * Math.PI / 180)/ Math.abs(seeSaw.rotation)*rotationStep;
  ball.x += (direction * ballXstep);
  ball.y = Math.abs(ball.x - seeSaw.x)*Math.abs(Math.tan(seeSaw.rotation * Math.PI / 180)) + seeSaw.y - ballRadius;
  manual_move_flag = true;
  stage.update();
}
function getKeyUp(e){
  $('#main-screen .btn').removeClass('active');
  manual_move_flag = false;
}

function getKeyDown(e) {
  e.preventDefault();
  console.log('keycode', e.keyCode);
  if (e.keyCode == 87){// w key
    $('.left-up-btn').addClass('active');
    moveBallManually(1);
    
  }
  if (e.keyCode == 80){// p key
    $('.right-up-btn').addClass('active');
    moveBallManually(-1);
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
}

function createRandomVerticalBar(){
  var random_num_len = Math.random();
  var random_num_direction = Math.random();
  if (random_num_direction > 0.5){
    verticalBar.x = seeSaw.x - random_num_len * (canvas.width/5);
  } else {
    verticalBar.x = seeSaw.x + random_num_len * (canvas.width/5);
  }
  stage.update();
}

function keepTime() {
  if (trainMode && gamePaused) return;
  if (sec % VerticalChangeInterval == 0 ){
    createRandomVerticalBar();
  }
  sec++;
  var rsec = totalSec - sec;
  var tStr = String(Math.floor(rsec / 60) + " mins " + (rsec % 60) + " secs");
  document.getElementById("tsider").innerHTML = String(tStr);
  
  // checking game over
  if (sec > totalSec) {
    clearInterval(trackTime);
    if (manual_move_interval){
      clearInterval(manual_move_interval);
    }
    
    isGame = false;
    startPump = false;
    sec = 0;
    gameOver();
  }
}

function startMain() {
  createjs.Ticker.setFPS(60);
  createjs.Ticker.addEventListener("tick", updateGame);
}

function updateGame(e) {
  console.log('rotation', seeSaw.rotation);
  var delta_time = createjs.Ticker.getTime() - time_elapsed;
  time_elapsed = createjs.Ticker.getTime();
  if (trainMode && gamePaused) return;
  if (manual_move_flag) return;
  if (!(seeSaw.rotation < maxAngle && seeSaw.rotation > minAngle)) return;

  var rotation_rad = seeSaw.rotation * Math.PI / 180;
  if (rotation_rad == 0) return;
  console.log('rotation_rad', rotation_rad, delta_time);

  // ball sliding
  
  ball.dx = gravity * Math.sin(rotation_rad)*Math.cos(rotation_rad) * delta_time * delta_time; // Slide left or right based on tilt
  if (ex_rotation > seeSaw.rotation){
    if (rotation_rad > 0){
      ball.x -= ball.dx;
    } else {
      ball.x += ball.dx;
    }
  } else {
    if (rotation_rad > 0){
      ball.x += ball.dx;
    } else {
      ball.x -= ball.dx;
    }
  }
  ex_rotation = seeSaw.rotation;
  console.log('dxxxxx', ball.dx);
  ball.y = Math.abs(ball.x - seeSaw.x)*Math.abs(Math.tan(rotation_rad)) + seeSaw.y - ballRadius;

  
  // Prevent the ball from sliding off the see-saw
  const maxX = seeSaw.x + Math.abs(canvas.width / 4 * Math.cos(rotation_rad));
  const minX = seeSaw.x - Math.abs(canvas.width / 4 * Math.cos(rotation_rad));
  console.log('ballX', ball.x, maxX, minX);
  if (ball.x >= maxX) {
      ball.x = maxX;
      maxAngle = seeSaw.rotation;
  } else if (ball.x <= minX) {
      ball.x = minX;
      minAngle = seeSaw.rotation;
  } else {
    console.log('moving seesaw');
    if (rotation_rad > 0){
      seeSaw.rotation += rotationSpeed*delta_time;
      if (seeSaw.rotation >= maxAngle){
        maxAngle = seeSaw.rotation + 0.001;
      }
    } else {
      seeSaw.rotation -= rotationSpeed*delta_time;
      if (seeSaw.rotation <= minAngle){
        minAngle = seeSaw.rotation - 0.001;
      }
    }
  }
  console.log('final rotation', seeSaw.rotation);

  stage.update(e);
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

  showScreen("#results-screen");
  showSetting = false;
  let _accu = _totalCount == 0 ? 0 : ((_totalScore / _totalCount) * 100).toFixed(0);
  insertResults(_accu, totalSec);
  stage.update();

  document
    .querySelector("#restart-button")
    .addEventListener("click", startAgain);
}
function startAgain() {
  showStartScreen();
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
$(document).ready(function () {
  $("#logo").click(function () {
    if (!showSetting) return;
    $("#setting").slideDown();
    $("#opaque").show();
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

  $('.left-up-btn').mousedown(function(event){
    $(this).addClass('active');
    manual_move_interval = setInterval(function() {
      moveBallManually(1);
    }, 50);
    
  })
  $('.left-up-btn').mouseup(function(event){
    $(this).removeClass('active');
    clearInterval(manual_move_interval);
    manual_move_flag = false;
  })
  $('.right-up-btn').mousedown(function(event){
    $(this).addClass('active');
    manual_move_interval = setInterval(function() {
      moveBallManually(-1);
    }, 50);
  })
  $('.right-up-btn').mouseup(function(event){
    $(this).removeClass('active');
    clearInterval(manual_move_interval);
    manual_move_flag = false;
  })

  $("#exit_setting").click(function () {
    $("#setting").slideUp();
    $("#opaque").hide();

    // document.getElementsByTagName("body")[0].style = "background-color: white";

    clearInterval(trackTime);
    if(manual_move_interval){
      clearInterval(manual_move_interval);
    }

    createjs.Tween.removeAllTweens();
    sec = 0;
    startPump = false;
    isGame = false;
    createjs.Sound.stop();
    gameCont.removeAllChildren();
    stage.removeChild(gameCont);

    showStartScreen();
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