<?php require_once('../checkuser.php'); ?>

<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>PFD</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
    <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700,800' rel='stylesheet' type='text/css'>
    <!-- <link rel="stylesheet" media="screen" href="additional-styles.css" /> -->
    <link rel="stylesheet" media="screen" href="../_common/css/styles.css" />
    <link rel="stylesheet" href="styles.css" />
    <script src="../_common/js/jquery.min.js"></script>
    <script src="../_common/js/jqueryui.min.js"></script>
    <script src="../_common/js/game.js"></script>
    <script src="lib/easeljs-NEXT.combined.js"></script>
    <script src="lib/tweenjs-NEXT.min.js"></script>
    <script src="lib/soundjs-NEXT.min.js"></script>
    <script src="lib/preloadjs-NEXT.min.js"></script>
    <script src="joy.js"></script>
    <script src="main.js"></script>

</head>

<body onLoad="Main();">

    <div id="compatibility_message">
        <div class="_title">Incompatible Screen Size or Orientation</div>
        <div class="_text">This activity requires a minimum screen size of 1024px by 768px,
            and if used on a touchscreen device, must be used in Landscape
            orientation.</div>
        <a href="#">
            <div class="_button">Learn more about Compatibility</div>
        </a>
    </div>

    <div id="title">
        <div id="tside">
            <img id="logo" src="../_common/css/PAT_roundel.png" />
            <div class="logo-title">
                PFD
            </div>
            <div id="setting">
                <h4 class="setting_title">Controller Settings</h4>
                <div class="setting_contonller">
                    <p class="controller_name">Left Controller <span class="controller_target">for Speed:</span></p>
                    <div class="controller_content" id="speed_controller">
                        <button class="left_controller"></button>
                        <p class="set_controller">Saitek ST90 USB Joystick</p>
                        <button class="right_controller"></button>
                    </div>
                </div>
                <div class="setting_contonller">
                    <p class="controller_name">Right Controller <span class="controller_target">for Altitude and Heading:</span></p>
                    <div class="controller_content" id="alt_head_controller">
                        <button class="left_controller"></button>
                        <p class="set_controller">Saitek ST90 USB Joystick</p>
                        <button class="right_controller"></button>
                    </div>
                </div>
                <div class="setting_contonller end">
                    <p class="controller_name">Rudder Controller <span class="controller_target">for Yaw Control:</span></p>
                    <div class="controller_content" id="yaw_controller">
                        <button class="left_controller"></button>
                        <p class="set_controller">No Controller</p>
                        <button class="right_controller"></button>
                    </div>
                </div>
                <div class="set_content">
                    <p class="set_intensity">Intensity</p>
                    <div class="stepper-wrapper">
                        <div class="stepper-item completed" key="90">
                            <div class="step-counter"></div>
                            <div class="step-name easy-sname">Easy</div>
                        </div>
                        <div class="stepper-item left-radius completed active" key="60">
                            <div class="step-counter"></div>
                            <div class="step-name">Normal</div>
                        </div>
                        <div class="stepper-item right-radius" key="30">
                            <div class="step-counter"></div>
                            <div class="step-name hard-sname">Hard</div>
                        </div>
                    </div>
                </div>
                <div id="exit_setting">Exit to Main Menu</div>
            </div>
        </div>
        <div id="tsiderx">- / -</div>
        <div id="tsider"></div>
        <div id="tsidery">
            <a href="#" onclick="window.open( '/user-guide/pfd', 'name', 'location=no,scrollbars=yes,status=no,toolbar=no,resizable=yes' )" target="”_blank”" rel="noopener" class="help"></a>
            <a href="javascript:window.open('','_self').close();" class="exit"></a>
        </div>
        <div id="tsider-train">
            <img src="images/icon_mortarboard.svg" />
            <span>Training Mode</span>
        </div>
    </div>

    <div id="mainb">
        <div id="loader">
            <img src="images/loading.gif" alt="ld" height="80" width="85">
            <p id="load_percent"></p>
        </div>
        <div class="screen off" id="logo-screen">
            <div id="subtitle">PFD</div>
            <div>
                <div id="PAT_exam_logo">
                    <span id="by_logo">by</span>
                    <img src="./images/PAT_exam_logo.png" alt="logo" />
                </div>
            </div>
            <button id="start-button" class="big start-button">
                Start Activity
            </button>
            <button id="train-button" class="big train-button">
                Training Mode
            </button>
            <a href="#" onclick="window.open( '/user-guide/pfd', 'name', 'location=no,scrollbars=yes,status=no,toolbar=no,resizable=yes' )" target="”_blank”" rel="noopener">
<button id="userguide-button" class="big userguide-button">
			User Guide
		</button></a>
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
        <div class="screen off" id="main-screen">

            <canvas id="test" width="1440" height="900"></canvas>
            <div id="joystick_panel">
                <div id="joystick-left-div"></div>
                <div id="joystick-right-div"></div>
            </div>
        </div>
        <div class="screen off" id="results-screen">
            <div id="result-container">
                <div id="result-type">Your Performance</div>
                <div id="results-lights-acknowledged">
                    <p>Overall Accuracy</p>
                    <span id="average_accuracy">0</span>
                    <span class="tag">%</span>
                </div>
                <div id="overall-detail">
                    <div class="end">
                        <div class="end-item">
                            <img src="./images/results-img-speed.png" alt="altitude"></img>
                            <div class="end-item-description">
                                <p>Speed Control</p>
                                <span id="result-speed" class="end-value">64</span>
                                <span class="end-pro">&nbsp;%</span>
                            </div>
                        </div>
                        <div class="end-item">
                            <img src="./images/results-img-altitude.png" alt="heading"></img>
                            <div class="end-item-description">
                                <p>Altitude Control</p>
                                <span id="result-altitude" class="end-value">64</span>
                                <span class="end-pro">&nbsp;%</span>
                            </div>
                        </div>
                    </div>
                    <div class="end">
                        <div class="end-item">
                            <img src="./images/results-img-heading.png" alt="speed"></img>
                            <div class="end-item-description">
                                <p>Heading Control</p>
                                <span id="result-heading" class="end-value">64</span>
                                <span class="end-pro">&nbsp;%</span>
                            </div>
                        </div>
                        <div class="end-item">
                            <img src="./images/results-img-yaw.png" alt="yaw"></img>
                            <div class="end-item-description">
                                <p>Yaw Control</p>
                                <span id="result-yaw" class="end-value">64</span>
                                <span class="end-pro">&nbsp;%</span>
                            </div>
                        </div>
                    </div>
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