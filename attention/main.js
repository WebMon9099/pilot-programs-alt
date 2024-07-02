// JavaScript Document
var waveform_canvas;
var waveform_stage;

var soundInstance;

var loader;
var showSetting = false;
var trackTime;

var waveform_timer = null;
var review_answer_timer = null;
var waveShape;
var sliceWidth;
var wav_data;
var position_x=0;
var buffer_x = 0;
var is_repeat_mode = false;
var review_answer_flag = false;
var score = {
  general: { total: 0, correct: 0 },
  first_listen:{ correct: 0 },
  second_listen:{ correct: 0 },
  third_listen:{ correct: 0 },
};
// Value
const isSafari = platform.name.toLowerCase() == "safari";

var totalSets = 10;

// Gameplay mode
var gamePaused = false;
var trainMode = false;
var cur_set = 1;
var currentProgress = 100;
var progress_bar_id = 'main-progress-bar';
var sec = 0;

var wav_index = null;

const TRAIN_LISTEN_LIMIT = 3;
var train_listen_num = 0;

var selected_wav_indices = [];

const QUESTIONS = [
  'What heading was the aircraft requested to turn to?',
  'What heading was the aircraft requested to turn to?',
  'What heading was the aircraft requested to turn to?',
  'What was the aircraft callsign?',
  'What was the aircraft callsign?',
  'Which aircraft was requested to descend to FL200?',
  'What heading was the aircraft requested to turn to?',
  'After departure, until what altitude must the aircraft continue a climb straight ahead?',
  'What Flight Level must the aircraft descend to?',
  'What was the aircraft callsign?',
  'What was the aircraft callsign?',
  'What altitude is the aircraft instructed to climb to?',
  'What is the Approach frequency?',
  'Which aircraft was requested to contact Control frequency?',
  'Which aircraft was requested to contact Tower frequency?',
  'What is the Approach frequency?',
  'Which aircraft was requested to contact Control frequency?',
  'What was the QNH provided?',
  'What Flight Level was the traffic passing through?',
  'What was the QNH provided?',
  'What Flight Level was the aircraft instructed to descend to?',
  'At what Flight Level, or above, should the aircraft cross VICTOR?',
  'At what position did the Controller identify the aircraft?',
  'What Transponder Code was the aircraft requested to set?',
  'At what position did the Controller identify the aircraft?',
  'What Transponder Code was the aircraft requested to set?',
  'What Transponder Code was the aircraft requested to set?',
  'What Flight Level was the aircraft instructed to descend to?',
  'What altitude is the aircraft instructed to descend to?',
  'What Flight Level was the aircraft instructed to climb to?',
  'What was the QNH provided?',
  'At what Flight Level, or above, should the aircraft cross Central Point?',
  'What was the aircraft callsign?',
  'What was the aircraft callsign?',
  'What was the aircraft callsign?',
  'What was the aircraft callsign?',
  'What altitude was the aircraft requested to climb to?',
  'What altitude was the aircraft requested to descend to?',
  'What request was issued to the aircraft?',
  'What request was issued to the aircraft?',
  'Until what Waypoint should the aircraft expedite their rate of descent?',
  'What altitude is the aircraft requested to descend to?',
  'What Flight Level must the aircraft report leaving?',
  'What altitude is the aircraft requested to descend to?',
  'What Flight Level must the aircraft report passing?',
  'What was the QNH provided?',
  'What Flight Level must the aircraft report leaving?',
  'What Flight Level was the aircraft maintaining?',
  'What Flight Level was the aircraft maintaining?',
  'What Flight Level was the aircraft cleared to?',
  'What Flight Level was the aircraft cleared to?',
  'What speed was the aircraft maintaining?',
  'What holding point was the aircraft cleared to?',
  'What runway was the aircraft cleared to?',
  'What runway was the aircraft cleared to?',
  'What holding point was the aircraft cleared to?',
  'What holding point was the aircraft cleared to?'
];

const ANSWERS = [
  '112°',
  '050°',
  '017°',
  'Express Jet 223',
  'Blue Jet 64',
  'G-ANEB',
  '360°',
  '2,500ft',
  'FL140',
  'Blue Jet 44',
  'G-ANER',
  '7,500ft',
  '119.5',
  'G-BSVM',
  'Express Jet 312',
  '122.45',
  'G-DFRE',
  '1011',
  'FL120',
  '1015',
  'FL140',
  'No lower than FL270',
  '25 Miles SW of Central Point',
  '3217',
  '15 Miles NE of Central Point',
  '3657',
  '3143',
  'FL120',
  '3,500ft',
  'FL160',
  '1012',
  'FL150',
  'Express Jet 230',
  'Express Jet 217',
  'Blue Jet 66',
  'Blue Jet 51',
  '4,000ft',
  '3,500ft',
  'Descend at 1,000FPM or Greater',
  'Descend at 500FPM or Less',
  'Foxtrot',
  '3,500ft',
  'FL200',
  '5,000ft',
  'FL150',
  '1017',
  'FL120',
  'FL120',
  'FL140',
  'FL240',
  'FL140',
  '250 Knots',
  'Golf 3',
  'Runway 36',
  'Runway 21',
  'Delta 7',
  'Romeo 5',
];

const ANSWER_OPTIONS = [
  ['112°',	'122°',	'121°'],
  ['050°',	'040°',	'060°'],
  ['017°',	'019°',	'013°'],
  ['Express Jet 223',	'Express Jet 232',	'Express Jet 226'],
  ['Blue Jet 64',	'Blue Jet 63',	'Blue Jet 62'],
  ['G-ANEB',	'G-ANOB',	'Hyper Jet 2150'],
  ['360°',	'350°',	'330°'],
  ['2,500ft',	'2,000ft',	'3,500ft'],
  ['FL140',	'FL150',	'FL160'],
  ['Blue Jet 44',	'Blue Jet 54',	'Blue Jet 64'],
  ['G-ANER',	'G-ANOB',	'G-ANOR'],
  ['7,500ft',	'5,000ft',	'6,500ft'],
  ['119.5',	'121.475',	'129.5'],
  ['G-BSVM',	'G-TSVR'],
  ['Express Jet 312',	'Express Jet 322',	'Express Jet 302'],
  ['122.45',	'123.55',	'122.55'],
  ['G-DFRE',	'G-DFRA',	'G-EFRA'],
  ['1011',	'1001',	'1021'],
  ['FL120',	'FL140',	'FL110'],
  ['1015',	'1014',	'1017'],
  ['FL140',	'FL180',	'FL160'],
  ['No lower than FL270',	'No lower than FL260',	'No lower than FL250'],
  ['25 Miles SW of Central Point',	'15 Miles SW of Central Point',	'15 Miles NW of Central Point'],
  ['3217',	'3127',	'3117'],
  ['15 Miles NE of Central Point',	'25 Miles NE of Central Point',	'15 Miles SE of Central Point'],
  ['3657',	'3765',	'3659'],
  ['3143',	'3134',	'3142'],
  ['FL120',	'FL130',	'FL140'],
  ['3,500ft',	'4,500ft',	'2,500ft'],
  ['FL160',	'FL150',	'FL170'],
  ['1012',	'1011',	'1002'],
  ['FL150',	'FL140',	'FL160'],
  ['Express Jet 230',	'Express Jet 220',	'Express Jet 200'],
  ['Express Jet 217',	'Express Jet 317',	'Express Jet 417'],
  ['Blue Jet 66',	'Blue Jet 64',	'Blue Jet 65'],
  ['Blue Jet 51',	'Blue Jet 61',	'Blue Jet 41'],
  ['4,000ft',	'3,000ft',	'5,000ft'],
  ['3,500ft',	'4,500ft',	'2,500ft'],
  ['Descend at 1,000FPM or Greater',	'Climb at 1,000FPM or Greater'],
  ['Descend at 500FPM or Less',	'Climb at 500FPM or Greater'],
  ['Foxtrot',	'Bravo',	'Reaper'],
  ['3,500ft',	'2,500ft',	'4,500ft'],
  ['FL200',	'FL210',	'FL220'],
  ['5,000ft',	'4,000ft',	'6,000ft'],
  ['FL150',	'FL110',	'FL130'],
  ['1017',	'1016',	'1015'],
  ['FL120',	'FL130',	'FL140'],
  ['FL120',	'FL240',	'FL220'],
  ['FL140',	'FL240',	'FL200'],
  ['FL240',	'FL170',	'FL270'],
  ['FL140',	'FL110',	'FL170'],
  ['250 Knots',	'240 Knots',	'350 Knots'],
  ['Golf 3',	'Golf 2',	'Runway 25'],
  ['Runway 36',	'Runway 26',	'Runway 16'],
  ['Runway 21',	'Runway 31',	'Runway 11'],
  ['Delta 7',	'Delta 5',	'Delta 8'],
  ['Romeo 5',	'Runway 18',	'Romeo 18'],
];

function Main() {
  waveform_canvas = document.getElementById("waveform");
  waveform_stage = new createjs.Stage(waveform_canvas);

  optimizeForTouchAndScreens();
  waveform_stage.enableMouseOver(10);
  manifest = [
    { src: "audio/att1.wav", id: "ATT1" },
    { src: "audio/att2.wav", id: "ATT2" },
    { src: "audio/att3.wav", id: "ATT3" },
    { src: "audio/att4.wav", id: "ATT4" },
    { src: "audio/att5.wav", id: "ATT5" },
    { src: "audio/att6.wav", id: "ATT6" },
    { src: "audio/att7.wav", id: "ATT7" },
    { src: "audio/att8.wav", id: "ATT8" },
    { src: "audio/att9.wav", id: "ATT9" },
    { src: "audio/att10.wav", id: "ATT10" },
    { src: "audio/att11.wav", id: "ATT11" },
    { src: "audio/att12.wav", id: "ATT12" },
    { src: "audio/att13.wav", id: "ATT13" },
    { src: "audio/att14.wav", id: "ATT14" },
    { src: "audio/att15.wav", id: "ATT15" },
    { src: "audio/att16.wav", id: "ATT16" },
    { src: "audio/att17.wav", id: "ATT17" },
    { src: "audio/att18.wav", id: "ATT18" },
    { src: "audio/att19.wav", id: "ATT19" },
    { src: "audio/att20.wav", id: "ATT20" },
    { src: "audio/att21.wav", id: "ATT21" },
    { src: "audio/att22.wav", id: "ATT22" },
    { src: "audio/att23.wav", id: "ATT23" },
    { src: "audio/att24.wav", id: "ATT24" },
    { src: "audio/att25.wav", id: "ATT25" },
    { src: "audio/att26.wav", id: "ATT26" },
    { src: "audio/att27.wav", id: "ATT27" },
    { src: "audio/att28.wav", id: "ATT28" },
    { src: "audio/att29.wav", id: "ATT29" },
    { src: "audio/att30.wav", id: "ATT30" },
    { src: "audio/att31.wav", id: "ATT31" },
    { src: "audio/att32.wav", id: "ATT32" },
    { src: "audio/att33.wav", id: "ATT33" },
    { src: "audio/att34.wav", id: "ATT34" },
    { src: "audio/att35.wav", id: "ATT35" },
    { src: "audio/att36.wav", id: "ATT36" },
    { src: "audio/att37.wav", id: "ATT37" },
    { src: "audio/att38.wav", id: "ATT38" },
    { src: "audio/att39.wav", id: "ATT39" },
    { src: "audio/att40.wav", id: "ATT40" },
    { src: "audio/att41.wav", id: "ATT41" },
    { src: "audio/att42.wav", id: "ATT42" },
    { src: "audio/att43.wav", id: "ATT43" },
    { src: "audio/att44.wav", id: "ATT44" },
    { src: "audio/att45.wav", id: "ATT45" },
    { src: "audio/att46.wav", id: "ATT46" },
    { src: "audio/att47.wav", id: "ATT47" },
    { src: "audio/att48.wav", id: "ATT48" },
    { src: "audio/att49.wav", id: "ATT49" },
    { src: "audio/att50.wav", id: "ATT50" },
    { src: "audio/att51.wav", id: "ATT51" },
    { src: "audio/att52.wav", id: "ATT52" },
    { src: "audio/att53.wav", id: "ATT53" },
    { src: "audio/att54.wav", id: "ATT54" },
    { src: "audio/att55.wav", id: "ATT55" },
    { src: "audio/att56.wav", id: "ATT56" },
    { src: "audio/att57.wav", id: "ATT57" },


  ];
  loader = new createjs.LoadQueue(false);
  loader.installPlugin(createjs.Sound);
  createjs.Sound.alternateExtensions = ["wav"];
  loader.addEventListener("progress", handleProgress);
  loader.addEventListener("complete", handleComplete);
  loader.loadManifest(manifest, true);
}

function initVariables(){
  soundInstance = null;
  gamePaused = false;
  trainMode = false;
  cur_set = 1;
  currentProgress = 100;
  progress_bar_id = 'main-progress-bar';
  sec = 0;
  wav_index = null;
  waveform_timer = null;
  review_answer_timer = null;
  waveShape;
  sliceWidth;
  wav_data;
  position_x=0;
  buffer_x = 0;
  train_listen_num = 0;
  is_repeat_mode = false;
  review_answer_flag = false;
  selected_wav_indices = [];
  score = {
    general: { total: 0, correct: 0 },
    first_listen:{ correct: 0 },
    second_listen:{ correct: 0 },
    third_listen:{ correct: 0 },
  };
  $('.submit-btn').hide();
}

function handleProgress() {
  var progresPrecentage = Math.round(loader.progress * 100);
  $("#load_percent").text(`${progresPrecentage}% loaded`);
}
function optimizeForTouchAndScreens() {
  if (createjs.Touch.isSupported()) {
    createjs.Touch.enable(waveform_stage);
  }
}
function handleComplete() {
  loader.removeEventListener("progress", handleProgress);
  loader.removeEventListener("complete", handleComplete);

  var element = document.getElementById("loader");
  element.parentNode.removeChild(element);
  showStartScreen();

  waveform_stage.update();
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
  $("#attention-first-screen").removeClass('off').addClass('on');
  document.querySelector("#tside .logo-title").innerHTML = String("Attention");
  document.getElementById("tsider").innerHTML = String("Start of Exam");
  document.getElementById("tsiderx").innerHTML = String("");
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
  document.getElementById("tsiderx").innerHTML = String('Ques ' + cur_set + ' of ' + totalSets);
}

function startOneSetExam(){
  showSetting = true;
  $('#progress-container').hide();
  showAudioPlayScreen();
}

function showAudioPlayScreen(){
  $('body').css('background', '#efefef');
  $(".screen.on").removeClass('on').addClass('off');
  $("#play-audio-screen").removeClass('off').addClass('on');
  $('.progress-bar').hide();
  $('.progress-bar').css('width', '100%');
  if (trainMode && train_listen_num > 0){
    $('.submit-btn').show();
  } else {
    $('.submit-btn').hide();
  }
}

function generateIndex(){ //for avoiding duplicated random index
  let res;
  do{
    res = Math.ceil(Math.random() * 57)
  }while(selected_wav_indices.includes(res))
  selected_wav_indices.push(res);
  return res;
}

function playAudio(){
  if (trainMode && gamePaused) return;
  $('#playButton').hide();
  $('.submit-btn').hide();
  if (!is_repeat_mode){
    wav_index = generateIndex();
  }
  soundInstance = createjs.Sound.play("ATT" + wav_index);
  soundInstance.on(
    "complete",
    createjs.proxy(this.handleCompleteSoundCaution, this)
  );
  soundInstance.volume = 1;

  waveform_stage.removeAllChildren();
  waveShape = new createjs.Shape();
  waveShape.graphics.clear().setStrokeStyle(2).beginStroke("#34424C");
  
  wav_data = soundInstance.playbackResource.getChannelData(0);
  var bufferLength = wav_data.length;
  var duration = soundInstance.duration;
  buffer_interval = parseInt(bufferLength/(duration/50));

  sliceWidth = waveform_canvas.width / (duration/50);
  position_x = 0;
  buffer_x = 0;
  
  waveform_timer = setInterval(updateWaveform, 50);
}

function updateWaveform() {
  if (trainMode && gamePaused) return;
  var y = (1 - wav_data[buffer_x]) * (waveform_canvas.height * 0.5);
  // var y_height = wav_data[buffer_x] * (waveform_canvas.height * 0.5);
  waveShape.graphics.lineTo(position_x, y);
  // waveShape.graphics.beginFill("#34424C").drawRect(position_x, y, sliceWidth*0.9, y_height);
  position_x += sliceWidth;
  buffer_x += buffer_interval;
  waveform_stage.addChild(waveShape);
  waveform_stage.update();
}

function handleCompleteSoundCaution(){
  $('#playButton').show();
  clearInterval(waveform_timer);
  soundInstance = null;
  waveform_stage.removeAllChildren();
  waveform_stage.update();
  if (trainMode){
    if (train_listen_num < TRAIN_LISTEN_LIMIT){
      train_listen_num++;
      is_repeat_mode = true;
      $('.submit-btn').show();
    } else {
      switchQuestionScreen();  
    }
  } else {
    switchQuestionScreen();
  }
}

function switchQuestionScreen(){
  if (trainMode && gamePaused) return;
  is_repeat_mode = false;
  $('.submit-btn').hide();
  $(".screen.on").removeClass('on').addClass('off');
  $("#question-screen").removeClass('off').addClass('on');
  var selected_answer_options = ANSWER_OPTIONS[wav_index - 1];
  var selected_question = QUESTIONS[wav_index - 1];
  $('#question').html(selected_question);
  selected_answer_options = shuffleArray(selected_answer_options);
  $('#answer-options').empty();
  selected_answer_options.map(item => {
    var option_div = $("<div></div>");
    option_div.addClass('answer-option');
    option_div.text(item);
    option_div.click(function(){
      if (trainMode && review_answer_flag) return;

      var is_right_answer = checkAnswer(item);
      if (trainMode){
        review_answer_flag = true;
        if (is_right_answer) {
          option_div.css('background', '#7ad304');
          option_div.css('color', 'white');
        } else {
          option_div.css('background', '#E02D2D');
          option_div.css('color', 'white');
          var right_answer_index = selected_answer_options.findIndex(x => x == ANSWERS[wav_index - 1]) + 1;
          $('#answer-options div:nth-child('+ right_answer_index + ')').css('background', '#7ad304');
          $('#answer-options div:nth-child('+ right_answer_index + ')').css('color', 'white');
        }
        $('#progress-container').show();
        $('.progress-bar').show();
        review_answer_timer = setInterval(updateProgressBar, 5);
      } else {
        if (cur_set < totalSets){
          showAudioPlayScreen();
          cur_set++;
        } else {
          gameOver();
        }
      }
    })
    $('#answer-options').append(option_div);
  })
}

function checkAnswer(answer){
  score.general.total++;
  if (ANSWERS[wav_index - 1] == answer){
    score.general.correct++;
    if (trainMode){
      if (train_listen_num <= 1){
        score.first_listen.correct++;
      }
      if (train_listen_num == 2){
        score.second_listen.correct++;
      }
      if (train_listen_num == 3){
        score.third_listen.correct++;
      }
    }
  }
  train_listen_num = 0;
  return ANSWERS[wav_index - 1] == answer
}

function shuffleArray(array_val) {
  for (let i = array_val.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Generate a random index between 0 and i
      [array_val[i], array_val[j]] = [array_val[j], array_val[i]]; // Swap elements at indices i and j
  }
  return array_val;
}

function updateProgressBar() {
  if (currentProgress > 0) {
    currentProgress -= 0.1;
    var progressBar = document.getElementById('progress-bar');
    progressBar.style.width = currentProgress + '%';
  } else {
    review_answer_flag = false;
    clearInterval(review_answer_timer);
    $('#progress-container').hide();
    currentProgress = 100;

    if (cur_set < totalSets){
      showAudioPlayScreen();
      cur_set++;
    } else {
      gameOver();
    }
  }
}

function gameOver() {
  createjs.Tween.removeAllTweens();
  waveform_stage.removeAllChildren();
  waveform_stage.update();
  $('.progress-bar').hide();
  $('#progress-container').hide();
  showEndScreen();
}
function showEndScreen() {
  $('body').css('background', 'white');
  clearInterval(trackTime);
  document.getElementById("tsider").innerHTML = String("End of Exam");
  document.getElementById("tsiderx").innerHTML = String('');
  let _totalScore = score.general.correct;
  let _totalCount = score.general.total;
  $("#correct_answer").text(_totalScore);
  $("#total_question").text(_totalCount);
  $("#average_accuracy").text(
    _totalCount == 0
    ? "0"
    : ((_totalScore / _totalCount) * 100).toFixed(0)
    );

  $(".screen.on").removeClass('on').addClass('off');
  $("#results-screen").removeClass('off').addClass('on');
  if (trainMode){
    $('#overall-detail').show();
    var first_percent = '';
    if (_totalScore > 0 && score.first_listen.correct > 0){
      first_percent = ((score.first_listen.correct / _totalScore) * 100).toFixed(0) + '%';
    }
    $('#first-status-bar').text(first_percent);
    if (first_percent == ''){
      $('#first-status-bar').css('width', '0%');
      $('#first-status-bar').css('padding-right', '0px');
    } else {
      $('#first-status-bar').css('width', first_percent);
      $('#first-status-bar').css('padding-right', '10px');
    }
    var second_percent = '';
    if (_totalScore > 0 && score.second_listen.correct > 0){
      second_percent = ((score.second_listen.correct / _totalScore) * 100).toFixed(0) + '%';
    }
    $('#second-status-bar').text(second_percent);
    if (second_percent == ''){
      $('#second-status-bar').css('width', '0%');
      $('#second-status-bar').css('padding-right', '0px');
    } else {
      $('#second-status-bar').css('width', second_percent);
      $('#second-status-bar').css('padding-right', '10px');
    }
    
    var third_percent = '';
    if (_totalScore > 0 && score.third_listen.correct > 0){
      third_percent = ((score.third_listen.correct / _totalScore) * 100).toFixed(0) + '%';
    }
    $('#third-status-bar').text(third_percent);
    if (third_percent == ''){
      $('#third-status-bar').css('width', '0%');
      $('#third-status-bar').css('padding-right', '0px');
    } else {
      $('#third-status-bar').css('width', third_percent);
      $('#third-status-bar').css('padding-right', '10px');
    }
    
  } else {
    $('#overall-detail').hide();
  }
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
  initVariables();
  showStartScreen();
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
    createjs.Tween.removeAllTweens();
    createjs.Tween.removeAllTweens();
    waveform_stage.removeAllChildren();
    waveform_stage.update();
    $('.progress-bar').hide();
    $('#progress-container').hide();
    initVariables();

    showStartScreen();
  });
  $(".playpause").click(function () {
    if (!trainMode) return;
    if (!(sec > 0)) return;
    gamePaused = !gamePaused;
    if (gamePaused) {
      $("#gamepause").show();
      if (waveform_timer){
        clearInterval(waveform_timer);
        if (soundInstance){
          soundInstance.paused = true;
        }
      }
      if (review_answer_timer){
        clearInterval(review_answer_timer);
      }
    } else {
      $("#gamepause").hide();
      if (soundInstance){
        waveform_timer = setInterval(updateWaveform, 50);
        soundInstance.paused = false;
      }
      if (review_answer_flag){
        review_answer_timer = setInterval(updateProgressBar, 5);
      }
    }
  });

  $("#gamepause").click(function () {
    if (!trainMode) return;
    gamePaused = false;
    $(".playpause").css("background-image", "url(./images/playpause.svg)");
    $("#gamepause").hide();
    if (soundInstance){
      waveform_timer = setInterval(updateWaveform, 50);
      soundInstance.paused = false;
    }
    if (review_answer_flag){
      review_answer_timer = setInterval(updateProgressBar, 5);
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
      mode: trainMode? "training" : "normal",
    }),
  });
}
