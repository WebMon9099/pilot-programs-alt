// JavaScript Document
var circle_canvas;
var exam_canvas;
var circle_stage;
var exam_stage;

var loader;
var showSetting = false;
var trackTime;

var score = {
  symmetry: { total: 0, correct: 0 },
  rotation: { total: 0, correct: 0 },
  equation: { total: 0, correct: 0 },
  memory: { total: 0, correct: 0 },
};
// Value
var orderT;
const isSafari = platform.name.toLowerCase() == "safari";
const SYMMETRY_SUB_EXAM = 0;
const ROTATION_SUB_EXAM = 1;
const MATH_SUB_EXAM = 2;
const SHOW_SET_SECONDS = 3;
var totalSets = 5;

// Gameplay mode
var gamePaused = false;
var trainMode = false;
var cur_set = 1;
var freq_timer_interval = 0;
var circles = [];
var innerCircles_arr = [];
var circle_index_txt_arr = [];
var sub_exam_type = SYMMETRY_SUB_EXAM;
var right_answer = true;
var currentProgress = 100;
var freqTimer = null;
var progress_bar_id = 'main-progress-bar';
var is_checking_circle_order = false;
var circle_order_indices = [];
var selected_circle_ids = [];
var sec = 0;
var is_traing_draw_flag = false;
var rotation_index = null;
var sym_index = null;
var math_index = null;
var circle_index = null;
var review_answer_flag = false;
var set_show_seconds = SHOW_SET_SECONDS;
var timer_for_set_screen = null;

const EQUATIONS = [
  '53 + (152 - 67) = 138',
  '55 + (87 - 73) = 69',
  '1 x 53 x 2 = 106',
  '670 + 11 x 70 = 1,440',
  '580 + 47 x 20 = 1,520',
  '6 x (50 + 190) = 1,440',
  '43 x 20 + 380 = 1,240',
  '72 + 15 + 79 = 166',
  '43 x 20 x 1 = 860',
  '41 x 2 + 64 = 146',
  '10 + 13 x 7 = 101',
  '(7 + 46) x 7 = 371',
  '56 x 1 x 2 = 112',
  '1 x 97 x 2 = 194',
  '(10 + 52) x 3 = 186',
  '19 x 2 x 21 = 796',
  '18 x 2 x 19 = 680',
  '5 x 5 + 18 = 47',
  '73 + 11 x 3 = 116',
  '1 x 71 x 7 = 493',
  '19 x 5 + 40 = 137',
  '270 ÷ (16 - 7) = 21',
  '(17 - 8) x 40 = 345',
  '10 x 7 - 70 = 7',
  '(400 ÷ 80) x 30 = 160',
  '(560 ÷ 70) x 100 = 900',
  '(13 - 7) x 70 = 370',
  '70 - 160 ÷ 8 = 35',
  '90 x (300 ÷ 100) = 180',
  '630 ÷ (630 ÷ 90) = 180'
];

const EQUATIONS_ANSWERS = [
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
];

const SYM_ANSWERS = [
  true,
  true,
  true,
  true,
  true,
  false,
  false,
  false,
  false,
  false,
];

const ROTATION_ANSWERS = [
  true,
  true,
  true,
  true,
  true,
  false,
  false,
  false,
  false,
  false,
];

const radius = 25;
function Main() {
  circle_canvas = document.getElementById("circle");
  circle_stage = new createjs.Stage(circle_canvas);
  exam_canvas = document.getElementById('exam-canvas');
  exam_stage = new createjs.Stage(exam_canvas);

  optimizeForTouchAndScreens();
  circle_stage.enableMouseOver(10);
  manifest = [
    { src: "images/symmetry_1.png", id: "Symmetry1" },
    { src: "images/symmetry_2.png", id: "Symmetry2" },
    { src: "images/symmetry_3.png", id: "Symmetry3" },
    { src: "images/symmetry_4.png", id: "Symmetry4" },
    { src: "images/symmetry_5.png", id: "Symmetry5" },
    { src: "images/symmetry_6.png", id: "Symmetry6" },
    { src: "images/symmetry_7.png", id: "Symmetry7" },
    { src: "images/symmetry_8.png", id: "Symmetry8" },
    { src: "images/symmetry_9.png", id: "Symmetry9" },
    { src: "images/symmetry_10.png", id: "Symmetry10" },
    { src: "images/rotation_1.png", id: "Rotation1" },
    { src: "images/rotation_2.png", id: "Rotation2" },
    { src: "images/rotation_3.png", id: "Rotation3" },
    { src: "images/rotation_4.png", id: "Rotation4" },
    { src: "images/rotation_5.png", id: "Rotation5" },
    { src: "images/rotation_6.png", id: "Rotation6" },
    { src: "images/rotation_7.png", id: "Rotation7" },
    { src: "images/rotation_8.png", id: "Rotation8" },
    { src: "images/rotation_9.png", id: "Rotation9" },
    { src: "images/rotation_10.png", id: "Rotation10" },
  ];
  loader = new createjs.LoadQueue(false);
  loader.addEventListener("progress", handleProgress);
  loader.addEventListener("complete", handleComplete);
  loader.loadManifest(manifest, true);
}

function initVariables(){
  gamePaused = false;
  trainMode = false;
  cur_set = 1;
  freq_timer_interval = 0;
  circles = [];
  innerCircles_arr = [];
  circle_index_txt_arr = [];
  sub_exam_type = SYMMETRY_SUB_EXAM;
  right_answer = true;
  currentProgress = 100;
  freqTimer = null;
  progress_bar_id = 'main-progress-bar';
  is_checking_circle_order = false;
  circle_order_indices = [];
  selected_circle_ids = [];
  sec = 0;
  is_traing_draw_flag = false;
  rotation_index = null;
  sym_index = null;
  math_index = null;
  circle_index = null;
  score = {
    symmetry: { total: 0, correct: 0 },
    rotation: { total: 0, correct: 0 },
    equation: { total: 0, correct: 0 },
    memory: { total: 0, correct: 0 },
  };
  review_answer_flag = false;
  set_show_seconds = SHOW_SET_SECONDS;
  timer_for_set_screen = null;
}

function handleProgress() {
  var progresPrecentage = Math.round(loader.progress * 100);
  $("#load_percent").text(`${progresPrecentage}% loaded`);
}
function optimizeForTouchAndScreens() {
  if (createjs.Touch.isSupported()) {
    createjs.Touch.enable(circle_stage);
  }
}
function handleComplete() {
  loader.removeEventListener("progress", handleProgress);
  loader.removeEventListener("complete", handleComplete);

  var element = document.getElementById("loader");
  element.parentNode.removeChild(element);
  showStartScreen();

  circle_stage.update();
}
function showStartScreen() {
  $('body').css('background', 'white');
  trainMode = false;
  gamePaused = false;
  showSetting = false;
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

  $(".screen.on").removeClass('on').addClass('off');
  $("#switch-first-screen").removeClass('off').addClass('on');
  // showScreen("#switch-first-screen");
  document.querySelector("#tside .logo-title").innerHTML = String("Switch");
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
  $('body').css('background', '#efefef');
  trainMode = train;
  showSetting = false;
  if (trainMode) {
    document.querySelector("#title").style = "background-color: #7ad304";
    document.querySelector("#tsider-train").style = "display: flex !important";
    $(".setting_title").show();
    $(".setting_contonller").show();
    // playpause button
    $(".playpause").css("background-image", "url(./images/playpause.svg)");
    gamePaused = false;
  }

  $(".screen.on").removeClass('on').addClass('off');
  $("#time-screen").removeClass('off').addClass('on');
  // showScreen("#time-screen");
}

function getRandomPosition(radius) {
  const x = Math.random() * (circle_canvas.width - 2 * radius) + radius;
  const y = Math.random() * (circle_canvas.height - 2 * radius) + radius;
  return { x, y };
}
function isOverlap(position) {
  return circles.some(existingCircle => {
    var ex_center_x = existingCircle.graphics.command.x;
    var ex_center_y = existingCircle.graphics.command.y;
    const distance = Math.hypot(ex_center_x - position.x, ex_center_y - position.y);
    return distance < 6 * radius | position.x < 2* radius | position.y < 2* radius | position.x > circle_canvas.width - 4 * radius | position.y > circle_canvas.height - 4 * radius;
  });
}

function createRandomCircle() {
  let position;
  do {
    position = getRandomPosition(radius);
  } while (isOverlap(position));

  const circle = new createjs.Shape();
  circle.graphics.setStrokeStyle(3);
  circle.graphics.beginStroke('darkgray');
  circle.graphics.beginFill('#FFFFFF').drawCircle(position.x, position.y, radius);
  circle.addEventListener('click', function(event) {
    handleCircleClick(event.target); // Pass the clicked circle to the handler function
  });
  circle.addEventListener('mouseover', function(event) {
    handleMouseOver(event.target); // Pass the clicked circle to the handler function
  });
  circle.addEventListener('mouseout', function(event) {
    handleMouseOut(event.target); // Pass the clicked circle to the handler function
  });
  circles.push(circle);
  circle_stage.addChild(circle);
}

function handleMouseOver(circle){
  if (trainMode && gamePaused) return;
  circle_stage.cursor = 'pointer';
  circle_stage.update();
}
function handleMouseOut(circle){
  if (trainMode && gamePaused) return;
  circle_stage.cursor = 'default';
  circle_stage.update();
}

function handleCircleClick(circle){
  console.log('ccc', currentProgress, review_answer_flag);
  if (trainMode && gamePaused) return;
  if (!is_checking_circle_order) return;
  if (review_answer_flag) return;
  if (currentProgress == 0 || currentProgress == 100) return;
  if (selected_circle_ids.includes(circle.id)) return;

  var center_x = circle.graphics.command.x;
  var center_y = circle.graphics.command.y;
  selected_circle_ids.push(circle.id);

  var innerCircle = new createjs.Shape();
  innerCircle.graphics.beginFill('#34424C').drawCircle(center_x, center_y, radius-5);
  circle_stage.addChild(innerCircle);
  innerCircles_arr.push(innerCircle);
  var circle_index_txt = new createjs.Text(
    selected_circle_ids.length,
    "25px Inter",
    "#FFFFFF"
  );
  circle_index_txt.x = center_x;
  circle_index_txt.y = center_y - 10;
  circle_index_txt.textAlign = "center";
  circle_stage.addChild(circle_index_txt);
  circle_index_txt_arr.push(circle_index_txt);
  circle_stage.update();
}

$(document).on("click", "#time-screen #time-buttons .time-button", function () {
  totalSets = Number($(this).attr("data-set"));
  trackTime = setInterval(keepTime, 1000);
  startOneSetExam();
});


function keepTime() {
  if (trainMode && gamePaused) return;
  sec++;
  var tStr = String(Math.floor(sec / 60) + " mins " + (sec % 60) + " secs");
  document.getElementById("tsider").innerHTML = String(tStr);
  document.getElementById("tsiderx").innerHTML = String('Set ' + cur_set);
}

function countSetScreen() {
  if (trainMode && gamePaused) return;
  if (set_show_seconds > 0){
    set_show_seconds--;
  }
  if (set_show_seconds == 0){
    clearInterval(timer_for_set_screen);
    createFirstInterface();
  }
}

function startOneSetExam(){
  showSetting = true;
  $('.main-question').hide();
  $('.submit-btn').hide();
  $('#progress-container').hide();
  showSetTitleScreen();
  set_show_seconds = SHOW_SET_SECONDS;
  timer_for_set_screen = setInterval(countSetScreen, 1000);
  
}

function showSetTitleScreen(){
  $(".screen.on").removeClass('on').addClass('off');
  $("#set-title-screen").removeClass('off').addClass('on');
  // showScreen('#set-title-screen');
  $('.progress-bar').hide();
  $('.progress-bar').css('width', '100%');
  $('#set-title').html('Set ' + cur_set);
}

function switchMainScreen(){
  $('body').css('background', '#efefef');
  is_traing_draw_flag = false;
  review_answer_flag = false;
  if (freqTimer){
    clearInterval(freqTimer);
  }
  $(".screen.on").removeClass('on').addClass('off');
  $("#main-screen").removeClass('off').addClass('on');
  // showScreen("#main-screen");
  progress_bar_id = 'main-progress-bar';
  $('#main-progress-bar').show();
  // if (trainMode){
  //   $('#bar-container').css('background', 'rgba(116, 188, 46, 0.5)');
  //   $('#main-progress-bar').css('background', 'rgba(116, 188, 46, 1)');
    
  // } else {
    $('#bar-container').css('background', 'rgba(211, 49, 103, 0.5)');
    $('#main-progress-bar').css('background', 'rgba(211, 49, 103, 1)');
  // }
  $('.btn').attr('disabled', false);
  $('.btn').addClass('hover-btn');
  $('.submit-btn button').text('Submit');
  
  currentProgress = 100;

  innerCircles_arr.map(innerCircle_item => {
    circle_stage.removeChild(innerCircle_item);
  })
  innerCircles_arr = [];
  circle_index_txt_arr = [];

  if (!is_checking_circle_order){
    do {
      circle_index = Math.floor(Math.random() * 10);
    } while (circle_order_indices.includes(circle_index));
  
    circle_order_indices.push(circle_index);
    var circleUpdate = circles[circle_index];
    var ex_x = circleUpdate.graphics.command.x;
    var ex_y = circleUpdate.graphics.command.y;
    var innerCircle = new createjs.Shape();
    innerCircle.graphics.beginFill('#E02D2D').drawCircle(ex_x, ex_y, radius-5);
    circle_stage.addChild(innerCircle);
    innerCircles_arr.push(innerCircle);

    circle_stage.update();
    $('.main-question').hide();
    $('.submit-btn').hide();
    freq_timer_interval = 5;
    freqTimer = setInterval(simulateProgress, freq_timer_interval);
  } else {
    $('.main-question').show();
    $('.submit-btn').show();
    circle_stage.update();
    freq_timer_interval = 30;
    freqTimer = setInterval(simulateProgress, freq_timer_interval);
  }
  
}

function checkMemoryResult(){
  var res = true;
  circle_order_indices.map((index_item, index) => {
    if (circles[index_item].id != selected_circle_ids[index]){
      res = false;
    }
  });
  if (selected_circle_ids.length != circle_order_indices.length){
    res = false;
  }
  score.memory.total++;
  if (res){
    score.memory.correct++;
  }
}

function submitResult(e) {
  if (trainMode && gamePaused) return;
  if (trainMode && e.innerHTML == 'Submit'){
    $('.submit-btn button').text('Next');
    $('#progress-container').hide();
    clearInterval(freqTimer);
    is_checking_circle_order = false;
    currentProgress = 100;
    showHighlightedCircles();
    return;
  }
  checkMemoryResult();
  if (cur_set < totalSets){
    cur_set++;
    is_checking_circle_order = false;
    startOneSetExam();
  } else {
    clearInterval(freqTimer);
    gameOver();
  }
  $('.submit-btn button').text('Submit');
}

function answerQuestion(answer){
  if (trainMode && gamePaused) return;
  switch((sub_exam_type + 2) % 3){
    case SYMMETRY_SUB_EXAM:
      score.symmetry.total++;
      if (answer === SYM_ANSWERS[sym_index - 1]){
        score.symmetry.correct++;
      }
      break;
    case ROTATION_SUB_EXAM:
      score.rotation.total++;
      if (answer === ROTATION_ANSWERS[rotation_index - 1]){
        score.rotation.correct++;
      }
      break;
    case MATH_SUB_EXAM:
      score.equation.total++;
      if (answer === EQUATIONS_ANSWERS[math_index - 1]){
        score.equation.correct++;
      }
      break;
  }

  if (trainMode){
    clearInterval(freqTimer);
    currentProgress = 100;
    var progressBar = document.getElementById(progress_bar_id);
    progressBar.style.width = '100%';
    freq_timer_interval = 5;
    freqTimer = setInterval(simulateProgress, freq_timer_interval);
    review_answer_flag = true;
    $('.btn').attr('disabled', true);
    $('.btn').removeClass('hover-btn');
    $('#bar-container').css('background', 'rgba(116, 188, 46, 0.5)');
    $('#sub-progress-bar').css('background', 'rgba(116, 188, 46, 1)');
    if (right_answer){
      $('.yes-btn').css('background', '#7ad304');
      if (!answer){
        $('.no-btn').css('background', '#E02D2D');
      }
    } else {
      $('.no-btn').css('background', '#7ad304');
      if (answer){
        $('.yes-btn').css('background', '#E02D2D');
      }
    }
  } else {
    $('#sub-screen').removeClass('on').addClass('off');
    $('#sub-progress-bar').hide();
    $('#sub-progress-bar').css('width', '100%');

    exam_stage.removeAllChildren();
    exam_stage.update();
    if (sub_exam_type == SYMMETRY_SUB_EXAM){
      is_checking_circle_order = true;
    }
    switchMainScreen();

  }
}

function showHighlightedCircles(){
  if (circle_order_indices.length > 1){
    circle_order_indices.map((circle_order_index, order_index) => {
      var ex_select_circle = circles[circle_order_index];
      ex_x = ex_select_circle.graphics.command.x;
      ex_y = ex_select_circle.graphics.command.y;

      var is_order_right = (selected_circle_ids[order_index] == ex_select_circle.id );

      
      var backCircle = new createjs.Shape();
      backCircle.graphics.beginFill(is_order_right?"#7ad304":"#E02D2D").drawCircle(ex_x, ex_y, 1.5*radius);
      var backRect = new createjs.Shape();
      backRect.graphics.beginFill(is_order_right?"#7ad304":"#E02D2D").drawRoundRect(ex_x, ex_y- 1.5*  radius, 3 * radius, 3* radius, 8, 0, 0, 0);
      circle_stage.addChildAt(backCircle, 0);
      circle_stage.addChildAt(backRect, 1);

      circle_stage.removeChild(circle_index_txt_arr[order_index]);
      if (selected_circle_ids[order_index] && is_order_right == false){
        var wrong_circle = innerCircles_arr[order_index];
        var wrong_ex_x = wrong_circle.graphics.command.x;
        var wrong_ex_y = wrong_circle.graphics.command.y;
        wrong_circle.graphics.clear().beginFill('#E02D2D').drawCircle(wrong_ex_x, wrong_ex_y, radius - 5);

        var index_txt = new createjs.Text(
          order_index + 1,
          "25px Inter",
          "#ffffff"
        );
        index_txt.x = wrong_ex_x;
        index_txt.y = wrong_ex_y - 10;
        index_txt.textAlign = "center";
        circle_stage.addChild(index_txt);
      }

      if (is_order_right){
        circle_stage.removeChild(innerCircles_arr[order_index]);
        var index_txt = new createjs.Text(
          order_index + 1,
          "25px Inter",
          "#00000"
        );
        index_txt.x = ex_x;
        index_txt.y = ex_y - 10;
        index_txt.textAlign = "center";
        circle_stage.addChild(index_txt);
      }

      index_txt = new createjs.Text(
        order_index + 1,
        "25px Inter",
        // is_order_right ? "#78bc2a": '#d30559'
        "#FFFFFF"
      );
      index_txt.x = ex_x + 1.7 * radius;
      index_txt.y = ex_y - 10;
      index_txt.textAlign = "center";
      circle_stage.addChild(index_txt);
    });
    circle_stage.update();
  }
}

function updateProgressBar(progress) {
  var progressBar = document.getElementById(progress_bar_id);
  progressBar.style.width = progress + '%';
}

function simulateProgress() {
  if (currentProgress > 0) {
    currentProgress -= 0.1;
    updateProgressBar(currentProgress);
    if (trainMode && !is_traing_draw_flag){
      is_traing_draw_flag = true;
      if (progress_bar_id == 'main-progress-bar'){
        if (!is_checking_circle_order){
          if (circle_order_indices.length > 1){
            circle_order_indices.map((circle_order_index_item, rel_index) => {
              if (rel_index < circle_order_indices.length - 1){
                var circleUpdate = circles[circle_order_index_item];
                ex_x = circleUpdate.graphics.command.x;
                ex_y = circleUpdate.graphics.command.y;
                var innerCircle = new createjs.Shape();
                innerCircle.graphics.beginFill('#E02D2D').drawCircle(ex_x, ex_y, radius-5);
                innerCircle.alpha = 0.5;
                circle_stage.addChild(innerCircle);
                innerCircles_arr.push(innerCircle);
              }
              return true;
            })
            circle_stage.update();
          }
        }
      } else {
      }
    }
  } else {
    is_traing_draw_flag = false;
    if (freqTimer){
      clearInterval(freqTimer);
      currentProgress = 100;
      var progressBar = document.getElementById(progress_bar_id);
      progressBar.style.width = '100%';
      progressBar.style.display = 'none';
      if (trainMode){
        if (progress_bar_id != 'main-progress-bar'){
          if (!review_answer_flag){
            review_answer_flag = true;
            freq_timer_interval = 5;
            freqTimer = setInterval(simulateProgress, freq_timer_interval);
            $('.btn').attr('disabled', true);
            $('.btn').removeClass('hover-btn');
            $('#bar-container').css('background', 'rgba(116, 188, 46, 0.5)');
            $('#sub-progress-bar').css('background', 'rgba(116, 188, 46, 1)');
            $('#sub-progress-bar').show();
            if (right_answer){
              $('.yes-btn').css('background', '#7ad304');
            } else {
              $('.no-btn').css('background', '#7ad304');
            }
            return;
          }

          if (sub_exam_type == SYMMETRY_SUB_EXAM){
            is_checking_circle_order = true;
          }
          switchMainScreen();
        } else {
          if (!is_checking_circle_order){
            showSubInterface();
            sub_exam_type = (sub_exam_type + 1) % 3;
          } else {
            showHighlightedCircles();
            $('.submit-btn button').text('Next');
            $('#progress-container').hide();
          }
        }

      } else {
        if (progress_bar_id == 'main-progress-bar'){
          if(is_checking_circle_order){
            score.memory.total++;
            if (cur_set < totalSets){
              cur_set++;
              is_checking_circle_order = false;
              startOneSetExam();
            } else {
              clearInterval(freqTimer);
              gameOver();
            }
            checkMemoryResult();
          } else {
            showSubInterface();
            sub_exam_type = (sub_exam_type + 1) % 3;
          }
        } else {
          if (sub_exam_type == SYMMETRY_SUB_EXAM){
            is_checking_circle_order = true;
          }
          switch(sub_exam_type){
            case SYMMETRY_SUB_EXAM:
              score.symmetry.total++;
              break;
            case ROTATION_SUB_EXAM:
              score.rotation.total++;
              break;
            case MATH_SUB_EXAM:
              score.equation.total++;
              break;
          }
          switchMainScreen();
        }
      }
    }
  }
}

function showSubInterface(){
  review_answer_flag = false;
  $('body').css('background', 'white');
  is_traing_draw_flag = false;
  $('#main-screen').removeClass('on').addClass('off');
  $('#main-progress-bar').hide();
  $('.btn').attr('disabled', false);
  $('.btn').addClass('hover-btn');
  $(".screen.on").removeClass('on').addClass('off');
  $("#sub-screen").removeClass('off').addClass('on');
  // showScreen('#sub-screen');
  $('#sub-progress-bar').show();
  // if (trainMode){
  //   $('#bar-container').css('background', 'rgba(116, 188, 46, 0.5)');
  //   $('#sub-progress-bar').css('background', 'rgba(116, 188, 46, 1)');
  // } else {
    $('#bar-container').css('background', 'rgba(52, 66, 76, 0.5)');
    $('#sub-progress-bar').css('background', 'rgba(52, 66, 76, 1)');
  // }
  
  $('.yes-btn').css('background', '#34424C');
  $('.no-btn').css('background', '#34424C');

  progress_bar_id = 'sub-progress-bar';
  freq_timer_interval = 15;
  freqTimer = setInterval(simulateProgress, freq_timer_interval);
  
  exam_stage.removeAllChildren();

  switch (sub_exam_type){
    case SYMMETRY_SUB_EXAM:
      orderT = new createjs.Text(
        "Is it symmetrical?",
        "50px Inter",
        "#000000"
      );
      orderT.x = 720;
      orderT.y = isSafari ? -5 : 0;
      orderT.textAlign = "center";
      orderT.lineHeight = 50;
      exam_stage.addChild(orderT);

      sym_index = Math.ceil(Math.random() * 10);
      var bmp = addBmp("Symmetry" + sym_index, 0, 0, false);
      bmp.scaleX = 0.6;
      bmp.scaleY = 0.6;
      bmp.x = bmp.image.width > 1440 ? 720 * (1-bmp.scaleX) : 720 - bmp.image.width * bmp.scaleX;
      bmp.y = 100;
      exam_stage.addChild(bmp);
      right_answer = SYM_ANSWERS[sym_index - 1];

      break;
    case ROTATION_SUB_EXAM:
      orderT = new createjs.Text(
        "Is it the same but rotated?",
        "50px Inter",
        "#000000"
      );
      orderT.x = 720;
      orderT.y = isSafari ? -5 : 0;
      orderT.textAlign = "center";
      orderT.lineHeight = 50;
      exam_stage.addChild(orderT);

      rotation_index = Math.ceil(Math.random() * 10);
      var bmp = addBmp("Rotation" + rotation_index, 0, 0, false);
      bmp.scaleX = 0.8;
      bmp.scaleY = 0.8;
      bmp.x = bmp.image.width > 1440 ? 720 * (1-bmp.scaleX) : 720 - bmp.image.width * bmp.scaleX;
      bmp.y = 100;
      exam_stage.addChild(bmp);
      right_answer = ROTATION_ANSWERS[rotation_index - 1];

      break;
    case MATH_SUB_EXAM:
      orderT = new createjs.Text(
        "Is this equation correct?",
        "40px Inter",
        "#000000"
      );
      orderT.x = 720;
      orderT.y = isSafari ? 125 : 130;
      orderT.textAlign = "center";
      orderT.lineHeight = 50;
      exam_stage.addChild(orderT);
      math_index = Math.floor(Math.random() * 30);
      var equation_text = new createjs.Text(
        EQUATIONS[math_index],
        "60px Inter",
        "#000000"
      );
      equation_text.x = 700;
      equation_text.y = 300;
      equation_text.textAlign = "center";
      equation_text.lineHeight = 100;
      exam_stage.addChild(equation_text);
      right_answer = EQUATIONS_ANSWERS[math_index - 1];
      break;
  }
  
  exam_stage.update();
}
function createFirstInterface(){
  $('#set-title-screen').removeClass('on').addClass('off');
  $('#progress-container').show();
  circles = [];
  innerCircles_arr = [];
  circle_index_txt_arr = [];
  circle_order_indices = [];
  selected_circle_ids = [];
  circle_stage.removeAllChildren();
  for (let i = 0; i < 10; i++) {
    createRandomCircle();
  }
  switchMainScreen();
}

function gameOver() {
  is_checking_circle_order = false;
  createjs.Tween.removeAllTweens();
  circle_stage.removeAllChildren();
  exam_stage.removeAllChildren();
  circle_stage.update();
  exam_stage.update();
  $('.progress-bar').hide();
  $('#progress-container').hide();
  showEndScreen();
}
function showEndScreen() {
  $('body').css('background', 'white');
  is_traing_draw_flag = false;
  clearInterval(trackTime);
  document.getElementById("tsider").innerHTML = String("End of Exam");
  document.getElementById("tsiderx").innerHTML = String('- / -');
  $('.main-question').hide();
  $('.submit-btn').hide();
  let _totalScore = score.symmetry.correct + 
                    score.rotation.correct +
                    score.equation.correct +
                    score.memory.correct;
  let _totalCount = score.symmetry.total + 
                    score.rotation.total +
                    score.equation.total +
                    score.memory.total;
  // $("#correct_answer").text(_totalScore);
  // $("#total_question").text(_totalCount);
  $("#average_accuracy").text(
    _totalCount == 0
    ? "0"
    : ((_totalScore / _totalCount) * 100).toFixed(0)
    );
  $("#correct-symmetry").text(score.symmetry.correct);
  $("#total-symmetry").text(score.symmetry.total);
  $('#symmetry_accuracy').text(score.symmetry.total == 0 ? '0' : ((score.symmetry.correct/score.symmetry.total)*100).toFixed(0))

  $("#correct-rotation").text(score.rotation.correct);
  $("#total-rotation").text(score.rotation.total);
  $('#rotation_accuracy').text(score.rotation.total == 0 ? '0' : ((score.rotation.correct/score.rotation.total)*100).toFixed(0))

  $("#correct-equation").text(score.equation.correct);
  $("#total-equation").text(score.equation.total);
  $('#equation_accuracy').text(score.equation.total == 0 ? '0' : ((score.equation.correct/score.equation.total)*100).toFixed(0))

  $("#correct-memory").text(score.memory.correct);
  $("#total-memory").text(score.memory.total);
  $('#memory_accuracy').text(score.memory.total == 0 ? '0' : ((score.memory.correct/score.memory.total)*100).toFixed(0))

  $(".screen.on").removeClass('on').addClass('off');
  $("#results-screen").removeClass('off').addClass('on');
  // showScreen("#results-screen");
  showSetting = false;
  let _accu = _totalCount == 0 ? 0 : ((_totalScore / _totalCount) * 100).toFixed(0);
  insertResults(_accu, sec);
  sec = 0;
  document
    .querySelector("#main-menu-button")
    .addEventListener("click", startAgain);
  document
    .querySelector("#restart-button")
    .addEventListener("click", restartAgain);
}

function restartAgain(){
  var temp = totalSets;
  var temp_traingmode = trainMode;
  initVariables();
  totalSets = temp;
  trainMode = temp_traingmode;
  if (trainMode){
    document.querySelector("#title").style = "background-color: #7ad304";
    document.querySelector("#tsider-train").style = "display: flex !important";
    $(".setting_title").show();
    $(".setting_contonller").show();
    // playpause button
    $(".playpause").css("background-image", "url(./images/playpause.svg)");
  }
  trackTime = setInterval(keepTime, 1000);
  startOneSetExam();
}

function startAgain() {
  score = {
    symmetry: { total: 0, correct: 0 },
    rotation: { total: 0, correct: 0 },
    equation: { total: 0, correct: 0 },
    memory: { total: 0, correct: 0 },
  };
  initVariables();
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
  $("#exit_setting").click(function () {
    $("#setting").slideUp();
    $("#opaque").hide();

    clearInterval(trackTime);
    clearInterval(freqTimer);
    clearInterval(timer_for_set_screen);
    createjs.Tween.removeAllTweens();
    createjs.Tween.removeAllTweens();
    circle_stage.removeAllChildren();
    exam_stage.removeAllChildren();
    circle_stage.update();
    exam_stage.update();
    $('.progress-bar').hide();
    $('#progress-container').hide();
    $('.main-question').hide();
    $('.submit-btn').hide();
    initVariables();

    showStartScreen();
  });
  $(".playpause").click(function () {
    if (!trainMode) return;
    if (!(sec > 0)) return;
    gamePaused = !gamePaused;
    if (gamePaused) {
      $("#gamepause").show();
      clearInterval(freqTimer);
    } else {
      $("#gamepause").hide();
      if (freq_timer_interval > 0){
        freqTimer = setInterval(simulateProgress, freq_timer_interval);
      }
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
