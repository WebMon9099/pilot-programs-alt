<?php require_once('../checkuser.php'); ?>

<!DOCTYPE html>
<html>
	<head>
		<meta charset=utf-8 />
		<meta name="description" content="description">
		<title>Puppets (Legacy)</title>

		<link rel="stylesheet" media="screen" href="../_common/css/styles.css" />
		<!--[if lte IE 7]>
		<link rel="stylesheet" media="screen" href="../_common/css/styles-ie.css" />
		<!-- <![endif]-->
		<link rel="stylesheet" media="screen" href="css/styles.css" />
		<link rel="preconnect" href="https://fonts.googleapis.com">
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
		<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
		<!--<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>-->
		<script type="text/javascript" src="../_common/js/jquery.min.js"></script>
		<script type="text/javascript" src="../_common/js/soundmanager2-nodebug-jsmin.js"></script>
		<script type="text/javascript" src="../_common/js/game.js"></script>
		<script type="text/javascript" src="../_common/js/score.js"></script>
		<!--[if lte IE 7]>
		<script type="text/javascript" src="../_common/js/json2.min.js"></script>
		<script type="text/javascript" src="localstorageshim.min.js" id="ie-localstorage-shim"></script>
		<!-- <![endif]-->
		<script type="text/javascript" src="js/jQueryRotateCompressed.2.2.js"></script>
		<script type="text/javascript" src="js/game.js"></script>
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
					<div>Puppets<span>Legacy</span></div>
				</div>
				<div id="topright_container">
					<div id="topright_inner">
					<a href="#" onclick="window.open( '/user-guide/puppets', 'name', 'location=no,scrollbars=yes,status=no,toolbar=no,resizable=yes' )" target="”_blank”" rel="noopener" class="help"></a>
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
					<div id="subtitle">Puppets</div>
					<button id="start-button" class="big start-button">Start Activity</button>
					<button id="userguide-button" class="big userguide-button" href="#" onclick="window.open( '/user-guide/puppets', 'name', 'location=no,scrollbars=yes,status=no,toolbar=no,resizable=yes' )" target="”_blank”" rel="noopener">User Guide</button>
					<div class="bottom">
						<div id="loading">
							<div id="loading-text">Loading</div>
							<div id="loading-percent"></div>
						</div>
					</div>
				</div>
				<div class="screen off" id="time-screen">
					<ul id="time-buttons">
						<li><button class="big time-button" data-order="1"><span class="question"></span> Questions</button></li>
						<li><button class="big time-button" data-order="2"><span class="question"></span> Questions</button></li>
						<li><button class="big time-button" data-order="3"><span class="question"></span> Questions</button></li>
					</ul>
				</div>
				<div class="screen off" id="audio-screen">
					<div id="audio-icon"><img src="../_common/images/Audio_Icon.jpg"></div>
				</div>
				<div class="screen off" id="puppet-screen">
					<ul id="puppets">
						<li><img id="puppet1"></li>
						<li><img id="puppet2"></li>
						<li><img id="puppet3"></li>
					</ul>
					<div class="bottom">
						<div id="buttons">
							<button class="small answer-button" data-answer="0">0</button>
							<button class="small answer-button" data-answer="1">1</button>
							<button class="small answer-button" data-answer="2">2</button>
							<button class="small answer-button" data-answer="3">3</button>
						</div>
					</div>
				</div>
				
				<div class="screen off" id="results-screen">

					<div id="result-container-lg">
						<div id="result-type">Percentage. of Correct Answers</div>
						<div id="results"></div>
						
					</div>

					<div class="bottom">
						<button id="restart-button" class="big start-button">RESTART</button>
					</div>
				</div>
			</div>
		</div>
	</body>
</html>