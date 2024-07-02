<?php require_once('../checkuser.php'); ?>

<!DOCTYPE html>
<html>

<head>
	<meta charset=utf-8 />
	<meta name="description" content="description">
	<title>Ball & Plate (Legacy)</title>

	<link rel="stylesheet" media="screen" href="../_common/css/styles.css" />
	<!--[if lte IE 7]>
		<link rel="stylesheet" media="screen" href="../_common/css/styles-ie.css" />
		<!-- <![endif]-->
	<link rel="stylesheet" media="screen" href="css/styles.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com">
 	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
	<!--<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>-->
	<script type="text/javascript" src="../_common/js/json2.min.js"></script>
	<script type="text/javascript" src="../_common/js/jquery.min.js"></script>
	<script type="text/javascript" src="../_common/js/jqueryui.min.js"></script>
	<script type="text/javascript" src="../_common/js/soundmanager2-nodebug-jsmin.js"></script>
	<script type="text/javascript" src="../_common/js/keyboard.0.4.1.min.js"></script>
	<script type="text/javascript" src="./js/joy.js"></script>
	<script type="text/javascript" src="./js/heatmap.js"></script>
	<script type="text/javascript" src="../_common/js/game.js"></script>
	<script type="text/javascript" src="../_common/js/score.js"></script>
	<script type="text/javascript" src="./js/three.min.js"></script>
	<script type="text/javascript" src="./js/cannon.js"></script>
	<script type="text/javascript" src="./js/utils.js"></script>


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
				<img id="logo" src="../_common/css/PAT_roundel.png" />
				<div class="logo-title">
					Ball & Plate<span>Legacy</span>
				</div>
			</div>
			<div id="topright_container">
				<div id="topright_inner">
					<a href="#" onclick="window.open( '/user-guide/ball-plate', 'name', 'location=no,scrollbars=yes,status=no,toolbar=no,resizable=yes' )" target="”_blank”" rel="noopener" class="help"></a>
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
				<div id="subtitle">Ball & Plate</div>
				<button id="start-button" class="big start-button">Start Activity</button>
				<button id="userguide-button" class="big userguide-button" href="#" onclick="window.open( '/user-guide/ball-plate', 'name', 'location=no,scrollbars=yes,status=no,toolbar=no,resizable=yes' )" target="”_blank”" rel="noopener">User Guide</button>
				<div class="bottom">
					<div id="loading">
						<div id="loading-text">Loading</div>
						<div id="loading-percent"></div>
					</div>
				</div>
			</div>
			<div class="screen off" id="type-screen">
				<div class="time-screen-title">Select an Activity Mode:</div>
				<ul id="type-buttons">
					<li><button id="top-type-button" class="big type-button" data-type="top">Top Down View</button></li>
					<li><button id="side-type-button" class="big type-button" data-type="side">Side View</button></li>
				</ul>
			</div>
			<div class="screen off" id="time-screen">
				<div class="time-screen-title">Select your duration:</div>
				<ul id="time-buttons">
					<li><button class="big time-button" data-time="2">2 Minutes</button></li>
					<li><button class="big time-button" data-time="5">5 Minutes</button></li>
					<li><button class="big time-button" data-time="7">7 Minutes</button></li>
				</ul>
			</div>

			<div class="screen off" id="crosshairs-screen">
				<div id="setting">
					<div id="move_joystick" status="right">Change On-Screen Joystick Pos</div>
					<div class="set_content">
						<p class="set_intensity">Intensity</p>
						<div class="stepper-wrapper">
							<div class="stepper-item completed" key="0.5">
								<div class="step-counter"></div>
								<div class="step-name easy-sname">Easy</div>
							</div>
							<div class="stepper-item left-radius completed active" key="1">
								<div class="step-counter"></div>
								<div class="step-name">Normal</div>
							</div>
							<div class="stepper-item right-radius" key="2">
								<div class="step-counter"></div>
								<div class="step-name hard-sname">Hard</div>
							</div>
						</div>
					</div>
				</div>
				<div id="crosshairs"></div>
				<div class="bottom">
					<div id="joystick_panel">
						<div id="joystickDiv"></div>
					</div>
					<button id="change-button" class="big" style="display: none;">Change</button>
				</div>
			</div>
			<div class="screen off" id="results-screen">
				<div id="result-container">
					<p class="result-title">Your Performance</p>
					<div class="result-content">
						<div class="heatmap_title">Heatmap</div>
						<div class="result-heatmap">
							<img src="./images/heatmap_bg.svg" class="heatmap_bg" />
							<img src="./images/heatmap_small_dot.svg" class="heatmap_dot" />
						</div>
						<div class="result-values">
							<div>
								<div class="result-type">Average Accuracy</div>
								<div id="results-accuracy">45</div>
							</div>
							<div>
								<div class="result-type">Time-on-Target</div>
								<div id="results-time-target">45</div>
								<div class="accuracy-content">You were on target for <span id="time-targets">2 mins and 30 secs</span></div>
							</div>
							<div></div>
						</div>
					</div>
				</div>
				<div class="bottom">
					<button id="restart-button" class="big start-button">Restart Activity</button>
				</div>
			</div>
		</div>
	</div>
</body>

</html>