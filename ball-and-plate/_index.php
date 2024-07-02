<?php require_once('../checkuser.php'); ?>

<!DOCTYPE html>
<html>
	<head>
		<meta charset=utf-8 />
		<meta name="description" content="description">
		<title>Crosshairs</title>

		<link rel="stylesheet" media="screen" href="../_common/css/styles.css" />
		<!--[if lte IE 7]>
		<link rel="stylesheet" media="screen" href="../_common/css/styles-ie.css" />
		<!-- <![endif]-->
		<link rel="stylesheet" media="screen" href="css/styles.css" />

		<!--<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>-->
		<script type="text/javascript" src="../_common/js/json2.min.js"></script>
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
		<div id="game">
			<div id="top">
				<div id="topleft">
					<div>CROSSHAIRS</div>
				</div>
				<div id="topright">
					<div>START OF EXAM</div>
				</div>
			</div>
			<div id="middle">
				<div class="screen on" id="logo-screen">
					<div id="pat-logo"><img src="../_common/images/PAT-logo.png"></div>
					<div id="subtitle">The Premier website for practicing PILAPT and COMPASS Tests</div>
					<div id="disclaimer">All rights reserved 2012. sevel.bg does not make any guarantees for accuracy.</div>
					<div class="bottom">
						<div id="loading">
							<div id="loading-text">LOADING</div>
							<div id="loading-percent"></div>
						</div>
						<button id="start-button" class="big start-button">START</button>
					</div>
				</div>
				<div class="screen off" id="time-screen">
					<ul id="time-buttons">
						<li><button class="big time-button" data-time="2">2 MINS</button></li>
						<li><button class="big time-button" data-time="5">5 MINS</button></li>
						<li><button class="big time-button" data-time="7">7 MINS</button></li>
					</ul>
				</div>
				<div class="screen off" id="crosshairs-screen">
					<div id="centre-circle"><img src="images/centre.png"></div>
					<div id="crosshairs">
						<div class="crosshair" id="crosshair-x"></div>
						<div class="crosshair" id="crosshair-y"></div>
					</div>
					<div id="screen-container">
						<div id="screen"><img src="images/screen.png"></div>
					</div>
					<div class="bottom">
						<button id="change-button" class="big">CHANGE</button>
					</div>
				</div>
				<div class="screen off" id="results-screen">
					<div id="score">Number of errors</div>
					<div id="results"></div>
					<div id="accuracy">Accuracy</div>
					<div id="results-accuracy"></div>
					<div class="bottom">
						<button id="restart-button" class="big start-button">RESTART</button>
					</div>
				</div>
			</div>
		</div>
	</body>
</html>