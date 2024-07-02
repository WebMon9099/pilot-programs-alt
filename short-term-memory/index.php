<?php require_once('../checkuser.php'); ?>

<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8" />
  <meta name="description" content="description" />
  <title>Short Term Memory (Legacy)</title>

  <link rel="stylesheet" media="screen" href="../_common/css/styles.css" />
  <link href="https://fonts.cdnfonts.com/css/bahnschrift" rel="stylesheet" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
  <!--[if lte IE 7]>
		<link rel="stylesheet" media="screen" href="../_common/css/styles-ie.css" />
    
		<!-- <![endif]-->
  <link rel="stylesheet" media="screen" href="css/styles.css" />
  <!--<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>-->
  <script type="text/javascript" src="../_common/js/jquery.min.js"></script>
  <script type="text/javascript" src="../_common/js/soundmanager2-nodebug-jsmin.js"></script>
  <script type="text/javascript" src="../_common/js/keyboard.0.4.1.min.js"></script>
  <script type="text/javascript" src="../_common/js/game.js"></script>
  <script type="text/javascript" src="../_common/js/score.js"></script>
  <!--[if lte IE 7]>
		<script type="text/javascript" src="../_common/js/json2.min.js"></script>
		<script type="text/javascript" src="localstorageshim.min.js" id="ie-localstorage-shim"></script>
		<!-- <![endif]-->
  <script type="text/javascript" src="js/game.js"></script>
  <!--
		-->
</head>

<body>
<div id="compatibility_message">
<div class="_title">Incompatible Screen Size or Orientation</div>
<div class="_text">This activity requires a minimum screen size of 1024px by 768px, 
and if used on a touchscreen device, must be used in Landscape
orientation.</div>
<a href="#" onclick="window.open( '/user-guide/getting-started#using-on-smartphone-tablet', 'name', 'location=no,scrollbars=yes,status=no,toolbar=no,resizable=yes' )" target="”_blank”" rel="noopener"><div class="_button">Learn more about Compatibility</div></a>
</div>

  <div id="game">
    <div id="top">
      <div id="toptitle">
        <div>Short Term Memory <span>Legacy</span></div>
      </div>
      <div id="topright_container">
        <div id="topright_inner">
          <a href="#" onclick="window.open( '/user-guide/short-term-memory', 'name', 'location=no,scrollbars=yes,status=no,toolbar=no,resizable=yes' )" target="”_blank”" rel="noopener" class="help"></a>
          <a href="javascript:window.open('','_self').close();" class="exit"></a>
        </div>
        <div id="topleft">
          <div>- / -</div>
        </div>
        <div id="topright">
          <div>Start of Exam</div>
        </div>
      </div>
    </div>
    <div id="middle">
      <div class="screen on" id="logo-screen">
        <div id="subtitle">Short Term Memory</div>
        <button id="start-button" class="big start-button">
          Start Activity
        </button>
        <button id="userguide-button" class="big userguide-button" href="#" onclick="window.open( '/user-guide/short-term-memory', 'name', 'location=no,scrollbars=yes,status=no,toolbar=no,resizable=yes' )" target="”_blank”" rel="noopener">
          User Guide
        </button>
        <div class="bottom">
          <div id="loading">
            <div id="loading-text">Loading</div>
            <div id="loading-percent"></div>
          </div>
        </div>
      </div>
      <div class="screen off" id="time-screen">
        <div class="time-screen-title">Select your duration:</div>
        <ul id="time-buttons">
          <li>
            <button class="big time-button" data-time="2">2 Minutes</button>
          </li>
          <li>
            <button class="big time-button" data-time="5">5 Minutes</button>
          </li>
          <li>
            <button class="big time-button" data-time="7">7 Minutes</button>
          </li>
        </ul>
      </div>
      <div class="screen off" id="game-screen">
        <div id="play-time">
          <span class="val">&emsp;</span> second(s) to
          <span class="action">memorise</span>!
        </div>

        <div id="notepad-autopilot">
          <img id="notepad-autopilot-image" src="images/fms_no-arrow.png" />

          <div id="autopilot">
            <div id="a" class="list">
              <span id="title">Altitude</span>
              <span class="cursor"><img src="images/cursor.png" /></span><span class="val"></span>
            </div>
            <div id="h" class="list">
              <span id="title">Heading</span>
              <span class="cursor"><img src="images/cursor.png" /></span><span class="val"></span>
            </div>
            <div id="s" class="list">
              <span id="title">Speed</span>
              <span class="cursor"><img src="images/cursor.png" /></span><span class="val"></span>
            </div>
            <div id="f" class="list">
              <span id="title">Frequency</span>
              <span class="cursor"><img src="images/cursor.png" /></span><span class="val"></span>
            </div>
            <div id="game-buttons">
              <div id="up-button"></div>
              <div id="down-button"></div>
              <div id="enter-button"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="screen off" id="results-screen">
        <div id="result-container">
          <div id="result-type">Score</div>
          <div id="results">
            <span id="percentage-recalls">0</span> <span class="tag">%</span>
          </div>
          <div class="result-detail">
            (<span id="true_recalls">0</span> out of
            <span id="all_recalls">0</span> items correctly input)
          </div>
        </div>
        <div id="result-container">
          <div id="result-type">Lights Acknowledged</div>
          <div id="results-lights-acknowledged">
            <span id="true_lights">0</span>
            <span class="tag">out of</span>
            <span id="all_lights">0</span>
          </div>
          <div class="result-detail">
            (approx. <span id="percentage-lights">0</span>% of lights
            acknowledged)
          </div>
        </div>
        <div class="bottom">
          <button id="restart-button" class="big start-button">
            Restart Activity
          </button>
        </div>
      </div>
    </div>
  </div>
</body>

</html>