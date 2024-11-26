<?php require_once('../checkuser.php'); ?>

<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Simulate</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
    <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700,800' rel='stylesheet' type='text/css'>
    <!-- <link rel="stylesheet" media="screen" href="additional-styles.css" /> -->
    <link rel="stylesheet" media="screen" href="../_common/css/styles.css?v=1" />
    <link rel="stylesheet" href="styles.css?v=11" />
    <script src="../_common/js/jquery.min.js"></script>
    <script src="../_common/js/jqueryui.min.js"></script>
    <script src="../_common/js/game.js"></script>
    <script src="lib/easeljs-NEXT.combined.js"></script>
    <script src="lib/tweenjs-NEXT.min.js"></script>
    <script src="lib/soundjs-NEXT.min.js"></script>
    <script src="lib/preloadjs-NEXT.min.js"></script>
    <script src="joy.js"></script>
    <script src="main.js?v=3"></script>

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
                Simulate
            </div>
            <div id="setting">
                <div class="setting_title">Settings</div>
				<div class="settings_container">
					<div class="setting_contonller alt_controller">
						<p class="controller_name">Altitude <span class="controller_target">Controller</span></p>
						<div class="controller_content">
							<button class="left_controller"></button>
							<p class="set_controller">Saitek ST90 USB Joystick</p>
							<button class="right_controller"></button>
						</div>
						<div class="axis-setting">
							<div style="display:flex;justify-content:space-between;">
								<div style="display:flex;">
									<div class="arrow-icon-container">
										<img src="images/up-down-icon.svg" />
									</div>
									<label class="switch-title">Altitude Axis:</label>
								</div>
								<select class="alt-axis axis-select">
								</select>
							</div>
							<div  style="display:flex;justify-content:space-between;">
								<div class="invert-label">Invert the Altitude Axis:</div>
								<div><input type="checkbox" class="alt-invert invert"/></div>
							</div>
						</div>
						<div class="switch-container">
							<label class="switch-title">Turbulence</label>
							<label class="switch">
								<input type="checkbox" id="alt_trubulence_check" checked>
								<span class="slider round"></span>
							</label>
						</div>
					</div>
					<div class="setting_contonller head_controller">
						<p class="controller_name">Heading <span class="controller_target">Controller</span></p>
						<div class="controller_content">
							<button class="left_controller"></button>
							<p class="set_controller">Saitek ST90 USB Joystick</p>
							<button class="right_controller"></button>
						</div>
						<div class="axis-setting">
							<div style="display:flex;justify-content:space-between;">
								<div style="display:flex;">
									<div class="arrow-icon-container">
										<img src="images/left-right-icon.svg" />
									</div>
									<label class="switch-title">Heading Axis:</label>
								</div>
								<select class="head-axis axis-select">
								</select>
							</div>
							<div  style="display:flex;justify-content:space-between;">
								<div class="invert-label">Invert the Heading Axis:</div>
								<div><input type="checkbox" class="head-invert invert"/></div>
							</div>
						</div>
						<div class="switch-container">
							<label class="switch-title">Turbulence</label>
							<label class="switch">
								<input type="checkbox" id="head_trubulence_check" checked>
								<span class="slider round"></span>
							</label>
						</div>
					</div>
					<div class="setting_contonller speed_controller">
						<p class="controller_name">Power <span class="controller_target">Controller</span></p>
						<div class="controller_content">
							<button class="left_controller"></button>
							<p class="set_controller">Saitek ST90 USB Joystick</p>
							<button class="right_controller"></button>
						</div>
						<div class="axis-setting">
							<div style="display:flex;justify-content:space-between;">
								<div style="display:flex;">
									<div class="arrow-icon-container">
										<img src="images/up-down-icon.svg" />
									</div>
									<label class="switch-title">Power Axis:</label>
								</div>
								<select class="speed-axis axis-select">
								</select>
							</div>
							<div  style="display:flex;justify-content:space-between;">
								<div class="invert-label">Invert the Power Axis:</div>
								<div><input type="checkbox" class="speed-invert invert"/></div>
							</div>
						</div>
						<div class="switch-container">
							<label class="switch-title">Turbulence</label>
							<label class="switch">
								<input type="checkbox" id="speed_trubulence_check" checked>
								<span class="slider round"></span>
							</label>
						</div>
					</div>
					<div class="set_content">
						<p class="set_intensity">Intensity</p>
						<div class="stepper-wrapper">
							<div class="stepper-item left-radius completed" key="50">
								<div class="step-counter"></div>
								<div class="step-name ">1</div>
							</div>
							<div class="stepper-item completed" key="45">
								<div class="step-counter"></div>
								<div class="step-name">2</div>
							</div>
							<div class="stepper-item completed" key="40">
								<div class="step-counter"></div>
								<div class="step-name">3</div>
							</div>
							<div class="stepper-item completed" key="35">
								<div class="step-counter"></div>
								<div class="step-name">4</div>
							</div>
							<div class="stepper-item completed active" key="30">
								<div class="step-counter"></div>
								<div class="step-name">5</div>
							</div>
							<div class="stepper-item" key="25">
								<div class="step-counter"></div>
								<div class="step-name">6</div>
							</div>
							<div class="stepper-item" key="20">
								<div class="step-counter"></div>
								<div class="step-name">7</div>
							</div>
							<div class="stepper-item" key="15">
								<div class="step-counter"></div>
								<div class="step-name">8</div>
							</div>
							<div class="stepper-item right-radius" key="10">
								<div class="step-counter"></div>
								<div class="step-name">9</div>
							</div>
						</div>
					</div>
					<div class="setting_contonller realism-container">
						<p class="controller_name">Realism</p>
						<label class="realism">
							<input type="checkbox" id="realism_check" checked>
							<span class="big-slider slider round"></span>
							<div id="left-letter-big-slide" class="big-slide-letter">Enabled</div>
							<div id="right-letter-big-slide" class="big-slide-letter">Realism</div>
						</label>
					</div>
					<div class="setting_contonller set_content horizontal-container">
						<p class="set_intensity">Artificial Horizon Aid</p>
						<div class="" style="margin-bottom:30px;">
							<label class="" style="font-size:12px;">Display the Artificial Horizon</label>
							<label class="switch">
								<input type="checkbox" id="artificial_horizon_check">
								<span class="slider round"></span>
							</label>
						</div>
					</div>
				</div>
                <div id="exit_setting">Exit to Menu</div>
            </div>
        </div>
        <div id="tsiderx">- / -</div>
        <div id="tsider"></div>
        <div id="tsidery">
            <a href="#" onclick="window.open( '/user-guide/simulate', 'name', 'location=no,scrollbars=yes,status=no,toolbar=no,resizable=yes' )" target="”_blank”" rel="noopener" class="help"></a>
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
            <div id="subtitle">Simulate</div>
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
            <button id="setting-button" class="big setting-button">
                Settings
            </button>
            <a href="#" onclick="window.open( '/user-guide/simulate', 'name', 'location=no,scrollbars=yes,status=no,toolbar=no,resizable=yes' )" target="”_blank”" rel="noopener">
<button id="userguide-button" class="big userguide-button">
			User Guide
		</button></a>
        </div>
        <!-- The Modal for Setting -->
        <div id="settiingModal" class="modal">
            
            <div class="modal-content">
                <div class="setting_title modal-title">Joystick Settings</div>
                <div class="contents-area">
                    <div class="setting-parameter-container">
                        <div class="setting_contonller alt_controller">
                            <p class="controller_name">Altitude <span class="controller_target">Controller</span></p>
                            <div class="controller_content">
                                <button class="left_controller"></button>
                                <p class="set_controller">Saitek ST90 USB Joystick</p>
                                <button class="right_controller"></button>
                            </div>
                            <div class="axis-setting">
                                <div style="display:flex;justify-content:space-between;">
                                    <div style="display:flex;">
                                        <div class="arrow-icon-container">
                                            <img src="images/up-down-icon.svg" />
                                        </div>
                                        <label class="switch-title">Altitude Axis:</label>
                                    </div>
                                    <select class="alt-axis axis-select">
                                    </select>
                                </div>
                                <div  style="display:flex;justify-content:space-between;">
                                    <div class="invert-label">Invert the Altitude Axis:</div>
                                    <div><input type="checkbox" class="alt-invert invert"/></div>
                                </div>
                            </div>
                        </div>
                        <div class="setting_contonller head_controller">
                            <p class="controller_name">Heading <span class="controller_target">Controller</span></p>
                            <div class="controller_content">
                                <button class="left_controller"></button>
                                <p class="set_controller">Saitek ST90 USB Joystick</p>
                                <button class="right_controller"></button>
                            </div>
                            <div class="axis-setting">
                                <div style="display:flex;justify-content:space-between;">
                                    <div style="display:flex;">
                                        <div class="arrow-icon-container">
                                            <img src="images/left-right-icon.svg" />
                                        </div>
                                        <label class="switch-title">Heading Axis:</label>
                                    </div>
                                    <select class="head-axis axis-select">
                                    </select>
                                </div>
                                <div  style="display:flex;justify-content:space-between;">
                                    <div class="invert-label">Invert the Heading Axis:</div>
                                    <div><input type="checkbox" class="head-invert invert"/></div>
                                </div>
                            </div>
                        </div>
                        <div class="setting_contonller speed_controller">
                            <p class="controller_name">Power <span class="controller_target">Controller</span></p>
                            <div class="controller_content">
                                <button class="left_controller"></button>
                                <p class="set_controller">Saitek ST90 USB Joystick</p>
                                <button class="right_controller"></button>
                            </div>
                            <div class="axis-setting">
                                <div style="display:flex;justify-content:space-between;">
                                    <div style="display:flex;">
                                        <div class="arrow-icon-container">
                                            <img src="images/up-down-icon.svg" />
                                        </div>
                                        <label class="switch-title">Power Axis:</label>
                                    </div>
                                    <select class="speed-axis axis-select">
                                    </select>
                                </div>
                                <div  style="display:flex;justify-content:space-between;">
                                    <div class="invert-label">Invert the Power Axis:</div>
                                    <div><input type="checkbox" class="speed-invert invert"/></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="joystick-test-area">
                        <div class="joystick-tester">
                            <div class="coords-container">Current Joystick Pos:</div>
                            <div class="dot"></div>
                            <div class="x-axis-line"></div>
                            <div class="y-axis-line"></div>
                            <!-- <div class="coords-values-area">
                                <span class="x-coord">X: 0</span>&nbsp;&nbsp;
                                <span class="y-coord">Y: 0</span>
                            </div> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- end modal -->
        <div class="screen off" id="time-screen">
            <div class="time-screen-title">Select your duration:</div>
            <ul id="time-buttons">
                <li>
                    <button class="big time-button" data-time="300">5 Minutes</button>
                </li>
                <li>
                    <button class="big time-button" data-time="900">15 Minutes</button>
                </li>
                <li>
                    <button class="big time-button" data-time="1800">30 Minutes</button>
                </li>
            </ul>
        </div>
        <div class="screen off" id="main-screen">

            <canvas id="test" width="1440" height="900"></canvas>
            <div id="left-control-div">
                <div class="power-setting-area">
                <div class="parameter-bar">
                    <button class="increase">+</button>
                    <div class="bar">
                        <div class="square"></div>
                    </div>
                    <button class="decrease">-</button>
                </div>
                </div>
                <div class="audio-btn-area">
                    <div class="red-btn audio-btn" id="red-btn"></div>
                    <div class="green-btn audio-btn" id="blue-btn"></div>
                </div>
            </div>
            <div id="joystick_panel">
                <div id="joystick-left-div"></div>
                <div id="joystick-right-div"></div>
            </div>
        </div>
        <div class="screen off" id="results-screen">
            <!-- <div id="result-container">
                <div id="result-type">Your Performance</div>
                <div id="results-lights-acknowledged">
                    <p>Overall Scoring</p>
                    <span id="average_accuracy">0</span>
                    <span class="tag">%</span>
                </div>
                <div id="overall-detail">
                    <div class="end">
                        <div class="end-item">
                            <img src="./images/results-img-speed.png" alt="speed"></img>
                            <div class="end-item-description">
                                <p>Speed Control</p>
                                <span id="result-speed" class="end-value">64</span>
                                <span class="end-pro">&nbsp;%</span>
                            </div>
                        </div>
                        <div class="end-item">
                            <img src="./images/altimeter_img.png" alt="altitude"></img>
                            <div class="end-item-description">
                                <p>Altitude Control</p>
                                <span id="result-altitude" class="end-value">64</span>
                                <span class="end-pro">&nbsp;%</span>
                            </div>
                        </div>
                    </div>
                    <div class="end">
                        <div class="end-item">
                            <img src="./images/compass_img.png" alt="heading"></img>
                            <div class="end-item-description">
                                <p>Heading Control</p>
                                <span id="result-heading" class="end-value">64</span>
                                <span class="end-pro">&nbsp;%</span>
                            </div>
                        </div>
                        <div class="end-item">
                            <img src="./images/audio_task_img.png" alt="audio"></img>
                            <div class="end-item-description">
                                <p>Audio task</p>
                                <span id="result-audio" class="end-value">64</span>
                                <span class="end-pro">&nbsp;%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div> -->
            <!-- <div class="bottom">
                <button id="restart-button" class="big start-button">
                    Restart Activity
                </button>
            </div> -->
            <div id="reaction-container">
                <h1 class="results-title">
                    <span class="light-text">You have completed</span> Simulate
                </h1>		
                <div class="score-section">
                        <h2>Your Score</h2>
                            <div class="score-container">
                    
                                <div class="circular-progress">
                                    <div class="score-value"></div>
                                        <div class="score-symbol">%</div>
                                            <svg viewBox="0 0 100 100" style="width: 200px;">
                                                <circle class="score-ring-background"
                                                    cx="50" cy="50" r="45" 
                                                    fill="none"/>
                                                <circle class="score-progress-ring"
                                                    cx="50" cy="50" r="45" 
                                                    fill="none"/>
                                                <image id="aircraftIcon" 
                                                    href="images/icon_aircraft.svg"
                                                    width="20" height="20" x="42" y="-5" rotate="0deg"
                                                    class="aircraft-icon"
                                                />
                                            </svg>
                                </div>
                                    
                                <div class="stats-container">
                                    <div class="stat-item">
                                        <span class="stat-label">Speed Control</span>
                                        <span class="stat-value" id="result-speed">60</span><span class="stat-value">%</span>
                                    </div>
                                    <div class="stat-item">
                                        <span class="stat-label">Altitude Control</span>
                                        <span class="stat-value" id="result-altitude"></span><span class="stat-value">%</span>
                                    </div>
                                    <div class="stat-item">
                                        <span class="stat-label">Heading Control</span>
                                        <span class="stat-value" id="result-heading">60</span><span class="stat-value">%</span>
                                    </div>
                                    <div class="stat-item" style="border-bottom: none !important;">
                                        <span class="stat-label">Audio task</span>
                                        <span class="stat-value" id="result-audio">60</span>
                                    </div>
                                </div>
                                
                                <div class="graph-container" style="min-width: 550px; position: relative;">
                                    <div class="reaction-time-label">Reaction Time <span>vs</span> Time</div>
                                    <div class="reaction-graph" style=""></div>
                                </div>
                            </div>
                                
                        </div>
                
                        <div class="results-actions">
                            <button id="playAgainButton" class="action-button">↺</button>
                            <a href="#" onclick="window.open( '/user-guide/simulate', 'name', 'location=no,scrollbars=yes,status=no,toolbar=no,resizable=yes' )" target="”_blank”" rel="noopener"><button class="action-button"><img src="images/help_button.svg"></button></a>
                            <a href="/performance?filter-key=activity-119-Simulate" target="_blank"><button class="action-button"><img src="images/performance_button.svg"></button></a>
                        </div>
                </div>
            </div>
        </div>
</body>

</html>