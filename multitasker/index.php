<?php require_once('../checkuser.php'); ?>


<html>

<head>
  <title>MultiTasker (Legacy)</title>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700,800' rel='stylesheet' type='text/css'>
  <link rel="stylesheet" media="screen" href="../_common/css/styles.css" />
  <link rel="stylesheet" href="styles.css" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
  <script src="../_common/js/jquery.min.js"></script>
  <script src="../_common/js/game.js"></script>
  <script src="lib/easeljs-0.8.0.min.js"></script>
  <script src="lib/tweenjs-0.6.0.min.js"></script>
  <script src="lib/soundjs-0.6.0.min.js"></script>
  <script src="lib/preloadjs-0.6.0.min.js"></script>
  <script src="lib/flashaudioplugin-0.6.0.min.js"></script>

  <script src="main.js"></script>
</head>

<body onLoad="Main();">

<div id="compatibility_message">
<div class="_title">Incompatible Screen Size or Orientation</div>
<div class="_text">This activity requires a minimum screen size of 1024px by 768px, 
and if used on a touchscreen device, must be used in Landscape
orientation.</div>
<a href="#" onclick="window.open( '/user-guide/getting-started#using-on-smartphone-tablet', 'name', 'location=no,scrollbars=yes,status=no,toolbar=no,resizable=yes' )" target="”_blank”" rel="noopener"><div class="_button">Learn more about Compatibility</div></a>
</div>

  <div id="title">

    <div id="tside">Error</div>
    <div id="tsiderx">- / -</div>
    <div id="tsider"></div>
    <div id="tsidery">
      <a href="#" onclick="window.open( '/user-guide/multitasker', 'name', 'location=no,scrollbars=yes,status=no,toolbar=no,resizable=yes' )" target="”_blank”" rel="noopener" class="help"></a>
      <a href="javascript:window.open('','_self').close();" class="exit"></a>
    </div>

  </div>

  <div id="mainb">

    <div id="loader">
      <img src="images/loading.gif" alt="ld" height="80" width="85">
      <p id="load_percent"></p>
    </div>


    <div class="screen off" id="logo-screen">
      <div id="subtitle" class="multitasker">MultiTasker</div>
      <div>
        <div id="PAT_exam_logo">
          <span id="by_logo">by</span>
          <img src="./images/PAT_exam_logo.png" alt="logo" />
        </div>
      </div>
      <button id="start-button" class="big start-button">
        Start Activity
      </button>
      <button id="userguide-button" class="big userguide-button" href="#" onclick="window.open( '/user-guide/multitasker', 'name', 'location=no,scrollbars=yes,status=no,toolbar=no,resizable=yes' )" target="”_blank”" rel="noopener">
        User Guide
      </button>
    </div>

    <div class="screen off" id="time-screen">
      <div class="time-screen-title">Select your duration:</div>
      <ul id="time-buttons">
        <li>
          <button class="big time-button" data-time="120">2 Minutes</button>
        </li>
        <li>
          <button class="big time-button" data-time="300">5 Minutes</button>
        </li>
        <li>
          <button class="big time-button" data-time="420">7 Minutes</button>
        </li>
      </ul>
    </div>


    <canvas class="screen off" id="test" width="1325" height="715"></canvas>

    <div class="screen off" id="results-screen">
      <div id="result-container">
        <div id="result-type">Correct Answers</div>
        <div id="results">
          <span>0</span>
        </div>
        <div class="result-detail">
          (That’s approximately <span id="percentage-lights">0</span>% correct!)
        </div>
      </div>
      <div id="result-container">
        <div id="result-type">Avg. Accuracy</div>
        <div id="results-lights-acknowledged">
          <span id="percentage-recalls">0</span> <span class="tag">%</span>
        </div>
      </div>
      <div class="bottom">
        <button id="restart-button" class="big start-button">
          Restart Activity
        </button>
      </div>
    </div>
  </div>
</body>

</html>