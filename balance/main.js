// JavaScript Document
var canvas;
var stage;
var sec = 0;
var loader;

var totalSec = 300;
var isGame = false;
var gameCont;
var score = 0;  //time-replicated vertical bar and ball
var correct_count = 0;
var total_count = 0;
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
var accerlate_flag = false;
var ballXstep;
let manual_move_interval;
var time_elapsed = 0;

const main_interval = 20;
const gravity = 0.245;
const forced_accerate = 1.2;
const ballRadius = 40;
// const triangle_length = 20;
const rotationStep = 0.4;
const thickness = 25;
const centerCircleRadius = 25;
const barBorderRadius = 3.5;
const VerticalChangeInterval_seed = 8;
var verticalChangeInterval = 8;
var seesawWidth;
var center_height;
var random_direction_efficient = 1;
var verticalBar_elapsed_time = 0;
var maxX;
var minX;
var maxAngle = 25;
var minAngle = -25;

function Main() {
  canvas = document.getElementById("test");
  stage = new createjs.Stage(canvas);

  seesawWidth = canvas.width * 0.8;
  center_height = canvas.height/2;
  maxX = canvas.width / 2 + seesawWidth/2;
  minX = canvas.width / 2 - seesawWidth/2;

  optimizeForTouchAndScreens();
  stage.enableMouseOver(10);

  isGame = false;
  var element = document.getElementById("loader");
  element.parentNode.removeChild(element);
  showStartScreen();

  stage.update();
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
  document.getElementById("acc-num").innerHTML = "0";
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

function initScore() {
  score = 0;
  sec = 0;
  manual_move_flag = false;
  accerlate_flag = false;
  time_elapsed = 0;
  correct_count = 0;
  total_count = 0;
  verticalBar_elapsed_time = 0;
  verticalChangeInterval = 8;
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

  //create the vertical bar
  verticalBar = new createjs.Shape();
  verticalBar.graphics.beginFill(trainMode?"#f6cdda":"#dfeef5").drawRect(-ballRadius, -canvas.height/2, ballRadius * 2, canvas.height);
  verticalBar.y = center_height;
  verticalBar.x = canvas.width / 2; - 600;
  gameCont.addChild(verticalBar);

  // Draw a centerShape
  const centerShape = new createjs.Shape();  
  centerShape.graphics.beginFill("#dbdbdb").drawCircle(canvas.width / 2, center_height + thickness/2, centerCircleRadius);
    // .lineTo(seeSaw.x-triangle_length/2, seeSaw.y+triangle_length*Math.cos(Math.PI/6))
    // .lineTo(seeSaw.x+triangle_length/2, seeSaw.y+triangle_length*Math.cos(Math.PI/6))
    // .closePath();
  gameCont.addChild(centerShape);

  //create the See-Saw
  seeSaw = new createjs.Shape();
  seeSaw.graphics.beginFill("#3f474c").drawRoundRect(-seesawWidth / 2, 0, seesawWidth, thickness, barBorderRadius);
  seeSaw.x = canvas.width / 2;
  seeSaw.y = center_height;
  seeSaw.rotation = 0;
  gameCont.addChild(seeSaw);

  //create the Ball
  ball = new createjs.Shape();
  ball.graphics.beginRadialGradientFill(["#ed1e79", "#9f005d"], [0, 1], 0, 0, 0, 0, 0, ballRadius).drawCircle(0, 0, ballRadius);
  ball.x = seeSaw.x;
  ball.y = seeSaw.y - ballRadius;
  ball.dx = 0;
  ball.dy = 0;
  gameCont.addChild(ball);
  stage.update();
  isGame = true;
  trackTime = setInterval(keepTime, main_interval);

  window.addEventListener("keydown", getKeyDown);
  window.addEventListener("keyup", getKeyUp);

  startMain();

  if (trainMode && gamePaused) $("#gamepause").show();
}
function startMain() {
  $('#progress-container').show();
  $('#main-progress-bar').show();
  $('#bar-container').css('background', 'rgba(211, 49, 103, 0.5)');
  $('#main-progress-bar').css('background', 'rgba(211, 49, 103, 1)');
  if (trainMode){
    $('#bar-container').css('background', 'rgba(116, 188, 46, 0.5)');
    $('#main-progress-bar').css('background', 'rgba(116, 188, 46, 1)');
  }
  createjs.Ticker.setFPS(60);
  createjs.Ticker.addEventListener("tick", updateGame);
}
function createRandomVerticalBar(){
  verticalChangeInterval = Math.floor(VerticalChangeInterval_seed + Math.random() * VerticalChangeInterval_seed);
  verticalBar_elapsed_time =  0;
  var random_num_len = Math.random();
  var random_num_direction = Math.random();
  if (random_num_direction > 0.5){
    verticalBar.x = seeSaw.x - random_num_len * (seesawWidth*0.4);
  } else {
    verticalBar.x = seeSaw.x + random_num_len * (seesawWidth*0.4);
  }
  stage.update();
}

function keepTime() {
  if (trainMode && gamePaused) return;
  total_count++;
  if (total_count == 1 ||  Math.abs(verticalChangeInterval - verticalBar_elapsed_time) < 0.01 ){
    if (Math.random() > 0.5){
      random_direction_efficient = 1;
    } else {
      random_direction_efficient = -1;
    }
    createRandomVerticalBar();
  }
  calcScore();
  if (total_count % (1000/main_interval) == 0){
    sec++;
  }
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
    sec = 0;
    gameOver();
  }
}
function calcScore(){
  if (trainMode && gamePaused) return;
  verticalBar_elapsed_time += main_interval/1000;
  // if (ball.x > verticalBar.x - 2 * ballRadius && ball.x < verticalBar.x + 2 * ballRadius){
  if (Math.abs(ball.x - verticalBar.x)<10){
    if (trainMode){
      verticalBar.graphics.clear().beginFill("#e4f6cd").drawRect(-ballRadius, -canvas.height/2, ballRadius * 2, canvas.height);
    }
    score += main_interval/1000;
    correct_count++;
  } else {
    if (trainMode){
      verticalBar.graphics.clear().beginFill("#f6cdda").drawRect(-ballRadius, -canvas.height/2, ballRadius * 2, canvas.height);
    }
  }
  stage.update();
  if (total_count > 0){
    var acc = Math.round(100*correct_count/total_count);
    document.getElementById("acc-num").innerHTML = String(acc.toString());
  }
  
  var progress = 100 - (verticalBar_elapsed_time/verticalChangeInterval) * 100;
  updateProgressBar(progress);
}

function moveBallManually(direction = 1){
  if (seeSaw.rotation >= maxAngle || seeSaw.rotation <= minAngle) return;
  if (random_direction_efficient * direction > 0 ){
    if (ball.x >= maxX) return
  } else {
    if (ball.x <= minX) return
  }
  
  seeSaw.rotation += (random_direction_efficient * direction*rotationStep);

  maxX = seeSaw.x + Math.abs((seesawWidth / 2) * Math.cos(seeSaw.rotation * Math.PI / 180));
  minX = seeSaw.x - Math.abs((seesawWidth / 2) * Math.cos(seeSaw.rotation * Math.PI / 180));
  
  if (random_direction_efficient * direction * seeSaw.rotation > 0){
    accerlate_flag = true;
  } else {
    accerlate_flag = false;
  }
  manual_move_flag = true;
  
  stage.update();
}
function getKeyUp(e){
  $('#main-screen .btn').removeClass('active');
  manual_move_flag = false;
  accerlate_flag = false;
}

function getKeyDown(e) {
  e.preventDefault();
  if (e.keyCode == 87){// w key
    $('.left-up-btn').addClass('active');
    moveBallManually(-1);
  }
  if (e.keyCode == 80){// p key
    $('.right-up-btn').addClass('active');
    moveBallManually(1);
  }
}

function updateProgressBar(progress){
  var progressBar = document.getElementById('main-progress-bar');
  progressBar.style.width = progress + '%';
}

function updateGame(e) {
  var delta_time = createjs.Ticker.getTime() - time_elapsed;
  time_elapsed = createjs.Ticker.getTime();
  if (trainMode && gamePaused) return;
  // if (manual_move_flag && !accerlate_flag) return;
  if (!(seeSaw.rotation < maxAngle && seeSaw.rotation > minAngle)) return;
  
  var rotation_rad = seeSaw.rotation * Math.PI / 180;

  // ball sliding
  ball.dx = gravity * Math.sin(rotation_rad)*Math.cos(rotation_rad) * delta_time * delta_time; // Slide left or right based on tilt
  if (accerlate_flag){
    ball.dx = forced_accerate + ball.dx;
  } else {
    if (manual_move_flag){
      ball.dx = 0.5*ball.dx;
    }
  }
  
  if (!(ball.x + ball.dx > minX && ball.x + ball.dx < maxX)) {// prevent ball sliding at the edge
    if (ball.x + ball.dx <= minX){
      ball.x = minX;
    }
    if (ball.x + ball.dx >= minX){
      ball.x = maxX;
    }
  } else {
    ball.x += ball.dx;
  }
  
  ball.y = seeSaw.y - ballRadius + (ball.x - seeSaw.x)*Math.tan(rotation_rad);

  stage.update(e);
}
function gameOver() {
  createjs.Tween.removeAllTweens();
  sec = 0;
  createjs.Sound.stop();
  gameCont.removeAllChildren();
  stage.removeChild(gameCont);
  $('#progress-container').hide();
  $('#main-progress-bar').hide();
  showEndScreen();
}
function showEndScreen() {
  document.getElementById("tsider").innerHTML = String("End of Exam");
  score = Math.round(score);
  $("#correct_answer").text(score);
  $("#total_question").text(totalSec);
  $("#average_accuracy").text(
    totalSec == 0
    ? " 0 "
    : (Math.round(score / totalSec *  100) )
    );

  showScreen("#results-screen");
  showSetting = false;
  let _accu = totalSec == 0 ? 0 : (Math.round(score / totalSec) * 100);
  insertResults(_accu, totalSec);
  stage.update();

  document
    .querySelector("#main-menu-button")
    .addEventListener("click", startAgain);
  document
    .querySelector("#restart-button")
    .addEventListener("click", restartAgain);
}
function startAgain() {
  showStartScreen();
}
function restartAgain(){
  initScore();
  createInterface();
}

$(document).ready(function () {
  $('canvas').attr('height', $('#main-screen').height() * 0.86);
  if ($('body').width() < 1200){
    $('canvas').attr('height', $('#main-screen').height());
  }
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
      moveBallManually(-1);
    }, 50);
  });
  $('.left-up-btn').on("touchstart", function(event){
    $(this).addClass('active');
    manual_move_interval = setInterval(function() {
      moveBallManually(-1);
    }, 50);
  });
  
  $('.left-up-btn').mouseup(function(event){
    $(this).removeClass('active');
    clearInterval(manual_move_interval);
    manual_move_flag = false;
    accerlate_flag = false;
  });
  $('.left-up-btn').on("touchend", function(event){
    $(this).removeClass('active');
    clearInterval(manual_move_interval);
    manual_move_flag = false;
    accerlate_flag = false;
  });
  $('.right-up-btn').mousedown(function(event){
    $(this).addClass('active');
    manual_move_interval = setInterval(function() {
      moveBallManually(1);
    }, 50);
  });
  $('.right-up-btn').on('touchstart',function(event){
    $(this).addClass('active');
    manual_move_interval = setInterval(function() {
      moveBallManually(1);
    }, 50);
  });
  $('.right-up-btn').mouseup(function(event){
    $(this).removeClass('active');
    clearInterval(manual_move_interval);
    manual_move_flag = false;
    accerlate_flag = false;
  });
  $('.right-up-btn').on('touchend', function(event){
    $(this).removeClass('active');
    clearInterval(manual_move_interval);
    manual_move_flag = false;
    accerlate_flag = false;
  });

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
    isGame = false;
    createjs.Sound.stop();
    gameCont.removeAllChildren();
    stage.removeChild(gameCont);
    $('#progress-container').hide();
    $('#main-progress-bar').hide();

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
