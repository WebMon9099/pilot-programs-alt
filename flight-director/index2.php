<?php require_once('../checkuser.php'); ?>

<!DOCTYPE html>
<html>
<head>
  <title>Flight Director</title>
	
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>Pat</title>
  <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700,800' rel='stylesheet' type='text/css'>
  <link rel="stylesheet" href="styles.css" />
  <script src="lib/easeljs-0.8.0.min.js"></script>
  <script src="lib/tweenjs-0.6.0.min.js"></script>
  <script src="lib/soundjs-0.6.0.min.js"></script>
  <script src="lib/preloadjs-0.6.0.min.js"></script>
  <script src="lib/flashaudioplugin-0.6.0.min.js"></script>
  <script src="main.js"></script>
</head>

<body onLoad="Main();">
  
	<div id="title">
  		<div id="tside">Error</div>
  		<div id="tmid">
			<img src="images/logo.png" alt="logo" height="34" width="60" />
		</div>
  		<div id="tsider"></div>
  	</div>
  	<br />
  	<div id="mainb">
  		<div id="loader">
  			<img src="images/loading.gif" alt="ld" height="80" width="85">
  		</div>
  		<canvas id ="test" width="880" height="695"></canvas>
  	</div>
  	
</body>
</html>
