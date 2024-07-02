$(document).ready(function () {
  score_manager.init('crosshairs_advanced');

  var DELAY_BETWEEN_NUMBERS = 2; // in seconds;
  var TIME_TO_PRESS_SPACE = 1; // in seconds
  var CROSSHAIR_MOVE_INTERVAL = 0.25; // in seconds
  var CROSSHAIR_MOVE_AMOUNT = 30;
  var intensity = 1;

  var DEBUG = true;

  fadeOutIn('#loading-text', true);
  game.load(
    {
      sounds: [
        '20',
        '22',
        '24',
        '26',
        '27',
        '28',
        '30',
        '32',
        '34',
        '35',
        '37',
        '38',
        '40',
        '41',
        '43',
        '44',
        '45',
        '46',
        '47',
        '48',
        '50',
        '52',
        '53',
        '56',
        '60',
        '62',
        '64',
        '68',
        '72',
        '74',
        '76',
        '80',
      ],
      images: ['centre', 'screen'],
    },
    function (percent) {
      $('#loading-percent').text(Math.round(percent) + '%');
    },
    function () {
      $('#loading').hide();
      $('#start-button').fadeIn(FADE_TIME);

      let gamepadIndex;
      window.addEventListener('gamepadconnected', (event) => {
        gamepadIndex = event.gamepad.index;
      });
      window.addEventListener('gamepaddisconnected', (event) => {
        gamepadIndex = undefined;
      });

      var joyParam = { title: 'joystick' };
      var JoyDiv = new JoyStick('joystickDiv', joyParam);

      var gamepadtimer;
      var gamepad_flag = false;
      function gamepadHandler() {
        gamepadtimer = setInterval(function () {
          if (gamepadIndex !== undefined) {
            const gp = navigator.getGamepads()[gamepadIndex];
            if (gp) {
              if (gp.axes[0] < -0.05) {
                if (gp.axes[1] < -0.05) {
                  // setDirectionJoystick('tl');
                  gamepad_flag = true;
                  move(chy, 'y', -1 * CROSSHAIR_MOVE_AMOUNT);
                  move(chx, 'x', -1 * CROSSHAIR_MOVE_AMOUNT);
                } else if (gp.axes[1] >= -0.05 && gp.axes[1] <= 0.05) {
                  // setDirectionJoystick('l');
                  gamepad_flag = true;
                  // move(chy, 'y', 20);
                  move(chx, 'x', -1 * CROSSHAIR_MOVE_AMOUNT);
                } else {
                  // setDirectionJoystick('bl');
                  gamepad_flag = true;
                  move(chy, 'y', CROSSHAIR_MOVE_AMOUNT);
                  move(chx, 'x', -1 * CROSSHAIR_MOVE_AMOUNT);
                }
              } else if (gp.axes[0] >= -0.05 && gp.axes[0] <= 0.05) {
                if (gp.axes[1] < -0.05) {
                  // setDirectionJoystick('t');
                  gamepad_flag = true;
                  move(chy, 'y', -1 * CROSSHAIR_MOVE_AMOUNT);
                  // move(chx, 'x', 20);
                } else if (gp.axes[1] >= -0.05 && gp.axes[1] <= 0.05) {
                  // initJoystick();
                  gamepad_flag = false;
                  // move(chy, 'y', 20);
                  // move(chx, 'x', 20);
                } else {
                  // setDirectionJoystick('b');
                  gamepad_flag = true;
                  move(chy, 'y', CROSSHAIR_MOVE_AMOUNT);
                  // move(chx, 'x', 20);
                }
              } else {
                if (gp.axes[1] < -0.05) {
                  // setDirectionJoystick('tr');
                  gamepad_flag = true;
                  move(chy, 'y', -1 * CROSSHAIR_MOVE_AMOUNT);
                  move(chx, 'x', CROSSHAIR_MOVE_AMOUNT);
                } else if (gp.axes[1] >= -0.05 && gp.axes[1] <= 0.05) {
                  // setDirectionJoystick('r');
                  gamepad_flag = true;
                  // move(chy, 'y', 20);
                  move(chx, 'x', CROSSHAIR_MOVE_AMOUNT);
                } else {
                  // setDirectionJoystick('br');
                  gamepad_flag = true;
                  move(chy, 'y', CROSSHAIR_MOVE_AMOUNT);
                  move(chx, 'x', CROSSHAIR_MOVE_AMOUNT);
                }
              }
            }
          }
        }, 50);
      }

      var numbers = [
        20, 22, 24, 26, 27, 28, 30, 32, 34, 35, 37, 38, 40, 41, 43, 44, 45, 46,
        47, 48, 50, 52, 53, 56, 60, 62, 64, 68, 72, 74, 76, 80,
      ];
      var sequences = {
        20: [
          [20, 30, 40, 50, 60],
          [20, 30, 40, 50],
          [20, 30, 40],
          [20, 22, 24, 26, 28, 30, 32, 34],
          [20, 22, 24, 26, 28, 30, 32],
          [20, 22, 24, 26, 28, 30],
          [20, 22, 24, 26, 28],
          [20, 22, 24, 26],
          [20, 22, 24],
          [20, 24, 28, 32],
          [20, 24, 28],
        ],
        22: [
          [22, 24, 26, 28, 30, 32, 34],
          [22, 24, 26, 28, 30, 32],
          [22, 24, 26, 28, 30],
          [22, 24, 26, 28],
          [22, 24, 26],
          [22, 26, 30, 34, 38],
          [22, 26, 30, 34],
          [22, 26, 30],
        ],
        24: [
          [24, 26, 28, 30, 32, 34],
          [24, 26, 28, 30, 32],
          [24, 26, 28, 30],
          [24, 26, 28],
        ],
        26: [
          [26, 28, 30, 32, 34],
          [26, 28, 30, 32],
          [26, 28, 30],
        ],
        27: [[27, 37, 47]],
        30: [
          [30, 35, 40, 45, 50],
          [30, 35, 40, 45],
          [30, 35, 40],
        ],
        32: [
          [32, 28, 24, 20],
          [32, 28, 24],
          [32, 35, 38, 41, 44, 47, 50, 53, 56],
          [32, 35, 38, 41, 44, 47, 50, 53],
          [32, 35, 38, 41, 44, 47, 50],
          [32, 35, 38, 41, 44, 47],
          [32, 35, 38, 41, 44],
          [32, 35, 38, 41],
          [32, 35, 38],
        ],
        34: [
          [34, 37, 40, 43, 46],
          [34, 37, 40, 43],
          [34, 37, 40],
          [34, 32, 30, 28, 26, 24, 22, 20],
          [34, 32, 30, 28, 26, 24, 22],
          [34, 32, 30, 28, 26, 24],
          [34, 32, 30, 28, 26],
          [34, 32, 30, 28],
          [34, 32, 30],
        ],
        35: [
          [35, 38, 41, 44, 47, 50, 53, 56],
          [35, 38, 41, 44, 47, 50, 53],
          [35, 38, 41, 44, 47, 50],
          [35, 38, 41, 44, 47],
          [35, 38, 41, 44],
          [35, 38, 41],
        ],
        38: [
          [38, 34, 30, 26, 22],
          [38, 34, 30, 26],
          [38, 34, 30],
          [38, 41, 44, 47, 50, 53, 56],
          [38, 41, 44, 47, 50, 53],
          [38, 41, 44, 47, 50],
          [38, 41, 44, 47],
          [38, 41, 44],
        ],
        40: [
          [40, 44, 48, 52, 56, 60, 64, 68, 72, 76, 80],
          [40, 44, 48, 52, 56, 60, 64, 68, 72, 76],
          [40, 44, 48, 52, 56, 60, 64, 68, 72],
          [40, 44, 48, 52, 56, 60, 64, 68],
          [40, 44, 48, 52, 56, 60, 64],
          [40, 44, 48, 52, 56, 60],
          [40, 44, 48, 52, 56],
          [40, 44, 48, 52],
          [40, 44, 48],
        ],
        41: [
          [41, 44, 47, 50, 53, 56],
          [41, 44, 47, 50, 53],
          [41, 44, 47, 50],
          [41, 44, 47],
        ],
        44: [
          [44, 46, 48, 50, 52],
          [44, 46, 48, 50],
          [44, 46, 48],
          [44, 47, 50, 53, 56],
          [44, 47, 50, 53],
          [44, 47, 50],
          [44, 48, 52, 56, 60, 64, 68, 72, 76, 80],
          [44, 48, 52, 56, 60, 64, 68, 72, 76],
          [44, 48, 52, 56, 60, 64, 68, 72],
          [44, 48, 52, 56, 60, 64, 68],
          [44, 48, 52, 56, 60, 64],
          [44, 48, 52, 56, 60],
          [44, 48, 52, 56],
          [44, 48, 52],
        ],
        46: [
          [46, 43, 40, 37, 34],
          [46, 43, 40, 37],
          [46, 43, 40],
          [46, 48, 50, 52],
          [46, 48, 50],
        ],
        47: [
          [47, 37, 27],
          [47, 50, 53, 56],
          [47, 50, 53],
        ],
        48: [
          [48, 50, 52],
          [48, 52, 56, 60, 64, 68, 72, 76, 80],
          [48, 52, 56, 60, 64, 68, 72, 76],
          [48, 52, 56, 60, 64, 68, 72],
          [48, 52, 56, 60, 64, 68],
          [48, 52, 56, 60, 64],
          [48, 52, 56, 60],
          [48, 52, 56],
        ],
        50: [
          [50, 45, 40, 35, 30],
          [50, 45, 40, 35],
          [50, 45, 40],
          [50, 53, 56],
        ],
        52: [
          [52, 50, 48, 46, 44],
          [52, 50, 48, 46],
          [52, 50, 48],
          [52, 56, 60, 64, 68, 72, 76, 80],
          [52, 56, 60, 64, 68, 72, 76],
          [52, 56, 60, 64, 68, 72],
          [52, 56, 60, 64, 68],
          [52, 56, 60, 64],
          [52, 56, 60],
        ],
        56: [
          [56, 53, 50, 47, 44, 41, 38, 35, 32],
          [56, 53, 50, 47, 44, 41, 38, 35],
          [56, 53, 50, 47, 44, 41, 38],
          [56, 53, 50, 47, 44, 41],
          [56, 53, 50, 47, 44],
          [56, 53, 50, 47],
          [56, 53, 50],
          [56, 60, 64, 68, 72, 76, 80],
          [56, 60, 64, 68, 72, 76],
          [56, 60, 64, 68, 72],
          [56, 60, 64, 68],
          [56, 60, 64],
        ],
        60: [
          [60, 62, 64],
          [60, 64, 68, 72, 76, 80],
          [60, 64, 68, 72, 76],
          [60, 64, 68, 72],
          [60, 64, 68],
        ],
        64: [
          [64, 62, 60],
          [64, 68, 72, 76, 80],
          [64, 68, 72, 76],
          [64, 68, 72],
        ],
        68: [
          [68, 72, 76, 80],
          [68, 72, 76],
        ],
        72: [
          [72, 74, 76],
          [72, 76, 80],
        ],
        76: [[76, 74, 72]],
        80: [
          [80, 76, 72, 68, 64, 60, 56, 52, 48, 44, 40],
          [80, 76, 72, 68, 64, 60, 56, 52, 48, 44],
          [80, 76, 72, 68, 64, 60, 56, 52, 48],
          [80, 76, 72, 68, 64, 60, 56, 52],
          [80, 76, 72, 68, 64, 60, 56],
          [80, 76, 72, 68, 64, 60],
          [80, 76, 72, 68, 64],
          [80, 76, 72, 68],
          [80, 76, 72],
        ],
      };

      var heatmapInstance = h337.create({
        container: document.querySelector('.result-heatmap'),
        gradient: {
          '.85': '#8cdd3e',
          '.98': '#fefe00',
          1: '#fe1f00',
        },
      });
      var heatmaps = {
        data: [],
        max: 150,
      };
      var time_target = 0;

      var chx = $('#crosshair-x');
      var chy = $('#crosshair-y');

      function dist() {
        return Math.sqrt(
          Math.pow(parseInt(chx.css('left')), 2) +
            Math.pow(parseInt(chy.css('top')), 2)
        );
      }

      function max() {
        return 245;
        // return $(window).width() < 1366 ? 200 : 270;
      }

      function move(el, axis, amount, animate) {
        axis = axis == 'y' ? 'top' : 'left';
        if (Math.abs(parseInt(el.css(axis)) + amount) < 175) {
          el.css(axis, '+=' + amount);
        } else {
          if (amount > 0) {
            el.css(axis, 175);
          } else {
            el.css(axis, -175);
          }
        }
      }

      var xtimer = null,
        ytimer = null;

      function handleKeyDown(e) {
        var key = e.keyCode || e.which;
        switch (key) {
          case 38:
            e.preventDefault();
            setDirectionJoystick('t');
            if (!ytimer)
              ytimer = setInterval(function () {
                move(chy, 'y', -1 * CROSSHAIR_MOVE_AMOUNT);
              }, CROSSHAIR_MOVE_INTERVAL * 150);
            break;
          case 40:
            e.preventDefault();
            setDirectionJoystick('b');
            if (!ytimer)
              ytimer = setInterval(function () {
                move(chy, 'y', 1 * CROSSHAIR_MOVE_AMOUNT);
              }, CROSSHAIR_MOVE_INTERVAL * 150);
            break;
          case 37:
            e.preventDefault();
            setDirectionJoystick('l');
            if (!xtimer)
              xtimer = setInterval(function () {
                move(chx, 'x', -1 * CROSSHAIR_MOVE_AMOUNT);
              }, CROSSHAIR_MOVE_INTERVAL * 150);
            break;
          case 39:
            e.preventDefault();
            setDirectionJoystick('r');
            if (!xtimer)
              xtimer = setInterval(function () {
                move(chx, 'x', 1 * CROSSHAIR_MOVE_AMOUNT);
              }, CROSSHAIR_MOVE_INTERVAL * 150);
            break;
        }
      }

      function handleKeyUp(e) {
        var key = e.keyCode || e.which;
        switch (key) {
          case 38:
            clearInterval(ytimer);
            ytimer = null;
            initJoystick();
            break;
          case 40:
            clearInterval(ytimer);
            ytimer = null;
            initJoystick();
            break;
          case 37:
            clearInterval(xtimer);
            xtimer = null;
            initJoystick();
            break;
          case 39:
            clearInterval(xtimer);
            xtimer = null;
            initJoystick();
            break;
        }
      }

      document.body.onkeydown = handleKeyDown;
      document.body.onkeyup = handleKeyUp;

      var distances = [];

      var chtimer;
      function moveCrosshairs() {
        chtimer = setInterval(function () {
          var movex =
            Math.random() *
            CROSSHAIR_MOVE_AMOUNT *
            intensity *
            (Math.random() < 0.5 ? -1 : 1);
          var movey =
            Math.random() *
            CROSSHAIR_MOVE_AMOUNT *
            intensity *
            (Math.random() < 0.5 ? -1 : 1);
          move(chx, 'x', movex, true);
          move(chy, 'y', movey, true);
          if (xtimer != null || ytimer != null || joy_flag || gamepad_flag) {
            var _dis = Math.abs(1 - dist() / max());
            distances.push(_dis);
            heatmaps.data.push({
              x: parseInt(150 + (parseInt(chx.css('left')) / 175) * 150),
              y: parseInt(150 + (parseInt(chy.css('top')) / 175) * 150),
              value: parseInt(150 * _dis),
              radius: parseInt(100 * _dis),
            });
            // heatmaps.max = parseInt( (150 * _dis)>heatmaps.max?(150 * _dis):heatmaps.max );
            if (_dis >= 0.9) time_target += CROSSHAIR_MOVE_INTERVAL;
          }
        }, CROSSHAIR_MOVE_INTERVAL * 1000);
      }

      var joytimer;
      var joy_flag = false;
      function moveCrossWithJoystick() {
        joytimer = setInterval(function () {
          var offX = JoyDiv.GetPosX() - 60;
          var offY = JoyDiv.GetPosY() - 60;
          var dic = JoyDiv.GetDir();
          if (dic == 'C') {
            joy_flag = false;
          } else {
            joy_flag = true;
            switch (dic) {
              case 'N':
                move(chy, 'y', offY);
                break;
              case 'NE':
                move(chx, 'x', offX);
                move(chy, 'y', offY);
                break;
              case 'E':
                move(chx, 'x', offX);
                break;
              case 'SE':
                move(chx, 'x', offX);
                move(chy, 'y', offY);
                break;
              case 'S':
                move(chy, 'y', offY);
                break;
              case 'SW':
                move(chx, 'x', offX);
                move(chy, 'y', offY);
                break;
              case 'W':
                move(chx, 'x', offX);
                break;
              case 'NW':
                move(chx, 'x', offX);
                move(chy, 'y', offY);
                break;
              default:
                break;
            }
          }
        }, 50);
      }

      function setDirectionJoystick(dir) {
        switch (dir) {
          case 't':
            moveJoystick(60, 30);
            break;
          case 'tr':
            moveJoystick(80, 40);
            break;
          case 'r':
            moveJoystick(90, 60);
            break;
          case 'br':
            moveJoystick(80, 80);
            break;
          case 'b':
            moveJoystick(60, 90);
            break;
          case 'bl':
            moveJoystick(40, 80);
            break;
          case 'l':
            moveJoystick(30, 60);
            break;
          case 'tl':
            moveJoystick(40, 40);
            break;
          default:
            break;
        }
      }

      function moveJoystick(_offX, _offY) {
        JoyDiv.SetPosition(_offX, _offY);
      }

      function initJoystick() {
        JoyDiv.initPosition();
      }

      function average() {
        if (distances.length == 0) return 0;
        var sum = 0;
        for (var dist in distances) {
          sum += distances[dist];
        }
        return sum / distances.length;
      }

      var miss_total = 0;
      var correct_total = 0;
      var sequence;
      var last = 0;
      var diff = 0;

      var changed = false;

      var spacetimer;

      function updateMissed() {
        // changeTopText('left', miss_total + ' Error' + (miss_total>1 ? 's' : '&ensp;') + '&ensp;');
        changeTopText('left', ' Score: ' + correct_total);
      }

      var justmissed = false;

      function hitChanged() {
        if (started) {
          if (spacetimer && changed) {
            if (DEBUG) console.log('ok!');
            correct_total++;
            updateMissed();
            clearInterval(spacetimer);
            spacetimer = null;
            changed = false;
          } else if (!justmissed) {
            if (DEBUG) console.log('error!');
            miss_total++;
          }
        }
      }

      var spaceup = false;
      KeyboardJS.on(
        'space',
        function (e) {
          e.preventDefault();
          spaceup = true;
        },
        function (e) {
          e.preventDefault();
          if (spaceup) {
            hitChanged();
            spaceup = false;
          }
        }
      );

      $('#change-button').bind('click', hitChanged);

      function changeSequence() {
        do {
          var n = numbers[Math.round(Math.random() * (numbers.length - 1))];
          sequence = sequences[n];
        } while (
          !sequence ||
          n == last ||
          n == last + diff ||
          n == last - diff
        );
        sequence = sequence[Math.round(Math.random() * (sequence.length - 1))];
      }

      var seqplaying = false;
      function playSequence() {
        if (seqplaying) {
          var next = sequence.shift();
          if (next) {
            diff = Math.abs(last - next);
            last = next;
            game.sounds[next].play({
              onfinish: function () {
                setTimeout(playSequence, DELAY_BETWEEN_NUMBERS * 1000);
              },
            });
          } else {
            changeSequence();
            changed = true;
            if (DEBUG) console.log('click Chnage button now');
            spacetimer = setTimeout(function () {
              spacetimer = null;
              justmissed = true;
              setTimeout(function () {
                justmissed = false;
              }, TIME_TO_PRESS_SPACE * 1000);
              clearInterval(spacetimer);
              if (DEBUG) console.log('miss!');
              miss_total++;
              updateMissed();
              changed = false;
            }, TIME_TO_PRESS_SPACE * 1000 + 1000);
            playSequence();
          }
        }
      }

      function minsAndSecs(seconds) {
        var mins = Math.floor(seconds / 60);
        var secs = seconds % 60;

        var mins =
          (mins == 0 ? '&ensp;&ensp;' : mins <= 9 ? '&ensp;' : '') +
          (mins == 0 ? '' : mins) +
          '&ensp;' +
          (mins == 0
            ? '&ensp;&nbsp;&ensp;&ensp;'
            : 'minute' + (mins > 1 ? 's' : '&ensp;'));
        var secs =
          (secs == 0 ? '&ensp;&ensp;' : secs <= 9 ? '&ensp;' : '') +
          (secs == 0 ? '' : secs + '&ensp;second' + (secs > 1 ? 's' : ''));

        return mins + '&ensp;' + secs;
      }

      var started = false;

      $('.start-button').bind('click', function () {
        $('.start-button').prop('disabled', true);

        changeTopText('left', '- / -', true);
        changeTopText('right', 'Start of Exam');
        showScreen('#time-screen');
      });
      $('.time-button').bind('click', function () {
        miss_total = 0;
        correct_total = 0;
        var last = 0;
        var diff = 0;
        distances = [];
        sequence = null;
        started = true;

        chx.css('left', '0');
        chx.css('top', '0');
        chy.css('left', '0');
        chy.css('top', '0');

        var seconds = $(this).attr('data-time') * 60;
        var game_time = seconds;

        changeTopText('left', 'Score: 0&ensp;');
        changeTopText('right', minsAndSecs(seconds));

        showScreen('#crosshairs-screen');

        moveCrosshairs();
        moveCrossWithJoystick();
        gamepadHandler();

        changeSequence();
        seqplaying = true;
        playSequence();

        timer = setInterval(function () {
          seconds--;
          if (seconds >= 0) {
            changeTopText('right', minsAndSecs(seconds), false);
          }
          if (seconds < 0) {
            started = false;
            clearInterval(timer);
            clearInterval(xtimer);
            clearInterval(ytimer);
            clearInterval(chtimer);
            clearInterval(joytimer);
            clearInterval(gamepadtimer);
            clearInterval(spacetimer);
            seqplaying = false;
            changeTopText('left', 'Results', true);
            changeTopText('right', '- / -', true);
            $('#corrects').text(correct_total);
            $('#total').text(correct_total + miss_total);
            var _tt = parseInt((time_target / game_time) * 100);
            $('#results-time-target').text(_tt);

            var _mins = Math.floor(parseInt(time_target) / 60);
            var _secs = parseInt(time_target) % 60;

            var _str_mins =
              (_mins == 0 ? '' : _mins) +
              ' ' +
              (_mins == 0 ? '' : ' min' + (_mins > 1 ? 's' : ''));
            var _str_secs = _secs + ' sec' + (_secs > 1 ? 's' : '');

            $('#time-targets').text(
              (_mins == 0 ? '' : _str_mins + ' and ') + _str_secs
            );

            var avg = average();
            $('#results-accuracy').text(Math.round(avg * 100) + '');
            heatmapInstance.setData(heatmaps);

            var accu = Math.round(avg * 100);
            var crc = (correct_total / (correct_total + miss_total)) * 100;

            score_manager.submit({
              game_duration: game_time,
              score_errors: miss_total,
              score_correct: correct_total,
              score_accuracy: Math.floor((accu + crc) / 2),
            });
            showScreen('#results-screen');
            $('.start-button').prop('disabled', false);
          }
        }, 1000);
      });
      $('.stepper-item').bind('click', function () {
        $('.stepper-item').each((index, el) => {
          if (index <= $(this).index()) {
            $(el).removeClass('active').addClass('completed');
          } else {
            $(el).removeClass('active').removeClass('completed');
          }
        });
        $(this).addClass('active');
        intensity = parseFloat($(this).attr('key'));
        CROSSHAIR_MOVE_INTERVAL = 0.25 / parseFloat($(this).attr('key'));
      });
      $('#logo').bind('click', function () {
        $('#setting').slideDown();
      });
      $('#move_joystick').bind('click', function () {
        if ($(this).attr('status') == 'right') {
          $('#joystickDiv').css('left', '0');
          $('#joystickDiv').css('right', 'unset');
          $(this).attr('status', 'left');
        } else {
          $('#joystickDiv').css('left', 'unset');
          $('#joystickDiv').css('right', '0');
          $(this).attr('status', 'right');
        }
      });
      $('body').click(function (event) {
        if (
          !$(event.target).closest('#setting').length &&
          !$(event.target).closest('#logo').length
        ) {
          $('#setting').slideUp();
        }
      });
    }
  );
});
