$(document).ready(function () {
  score_manager.init('memory_basic');

  var SECONDS_TO_MEMORISE = 5;
  var SECONDS_TO_RE_ENTER = 15;
  var SECONDS_BETWEEN_INDICATIONS = 5;
  var SECONDS_TO_EXTINGUISH_INDICATIONS = 2;

  var MIN_ALTITUDE = 100;
  var MAX_ALTITUDE = 30000;

  var All_TITLES = 3;

  var falseCount = 0;

  var GET_RANDOM_BOOLEAN = function () {
    if (falseCount == All_TITLES) {
      return true;
    }
    if (Math.round(Math.random()) === 1) return true;
    else {
      falseCount++;
      return false;
    }
  };

  var ALTITUDE_FUNCTION = function () {
    var alt =
      '' +
      Math.round(MIN_ALTITUDE + Math.random() * (MAX_ALTITUDE - MIN_ALTITUDE));
    return (
      Math.pow(10, alt.length - 1) *
      Math.round(alt / Math.pow(10, alt.length - 1))
    );
  }; // round to nearest power of 10

  var MIN_HEADING = 0;
  var MAX_HEADING = 359;

  var HEADING_FUNCTION = function () {
    return (
      10 *
      Math.round(
        Math.round(MIN_HEADING + Math.random() * (MAX_HEADING - MIN_HEADING)) /
          10
      )
    );
  }; // round to nearest multiple of 10

  var MIN_SPEED = 40;
  var MAX_SPEED = 450;

  var SPEED_FUNCTION = function () {
    return (
      10 *
      Math.round(
        Math.round(MIN_SPEED + Math.random() * (MAX_SPEED - MIN_SPEED)) / 10
      )
    );
  }; // round to nearest multiple of 10

  var MIN_FREQUENCY = 30;
  var MAX_FREQUENCY = 300;
  var FREQUENCY_FUNCTION = function () {
    return (
      5 *
        Math.round(
          Math.round(
            MIN_FREQUENCY + Math.random() * (MAX_FREQUENCY - MIN_FREQUENCY)
          ) / 5
        ) +
      Math.round(Math.random()) * 0.5
    ).toFixed(1);
  }; // round to nearest multiple of 5 and add 0.5 or nothing, keep 1 decimal place always

  fadeOutIn('#loading-text', true);
  game.load(
    {
      sounds: [],
      images: [
        'fms_no-arrow',
        'fms_downarrow-01',
        'fms_leftarrow-01',
        'fms_rightarrow-01',
        'up_active',
        'up_disabled',
        'up_inactive',
        'down_active',
        'down_disabled',
        'down_inactive',
        'submit_active',
        'submit_disabled',
        'submit_inactive',
        'module_small',
      ],
    },
    function (percent) {
      $('#loading-percent').text(Math.round(percent) + '%');
    },
    function () {
      $('#loading').hide();
      $('#start-button').fadeIn(FADE_TIME);

      var true_recalls = 0;
      var all_recalls = 0;

      var true_lights = 0;
      var all_lights = 0;
      $('#autopilot .cursor').hide();
      var time_left = 0;
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
      $('.time-button').bind('click', function () {
        true_recalls = 0;
        all_recalls = 0;
        true_lights = 0;
        all_lights = 0;

        time_left = $(this).attr('data-time') * 60;
        game_time = time_left;

        changeTopText('left', 'Score: 0');
        changeTopText('right', minsAndSecs(time_left));

        showScreen('#game-screen');
        play();
      });
      function play() {
        var altitude, heading, speed, frequency;
        var playing = true;
        var re_entering = false;
        var hidden = [];
        var memorise_timer;
        function memorise() {
          re_entering = false;
          diable_button();
          highLight();
          hidden = [];
          altitude = ALTITUDE_FUNCTION();
          $('#a .val').text(altitude);

          heading = HEADING_FUNCTION();
          $('#h .val').text(heading);

          speed = SPEED_FUNCTION();
          $('#s .val').text(speed);

          frequency = FREQUENCY_FUNCTION();
          $('#f .val').text(frequency);

          $('#play-time .action').text('memorise');
          var secs = SECONDS_TO_MEMORISE;
          $('#play-time .val').text(secs);
          memorise_timer = setInterval(function () {
            secs--;
            $('#play-time .val').text(secs);
            if (secs == 0) {
              clearInterval(memorise_timer);
              setTimeout(re_enter, 1000);
            }
          }, 1000);
        }
        var field = 0;
        var fields = ['a', 'h', 's', 'f'];
        var re_enter_timer;

        function enable_button() {
          $('#up-button')
            .css('background-image', 'url(images/up_inactive.png)')
            .addClass('up-hover');

          $('#down-button')
            .css('background-image', 'url(images/down_inactive.png)')
            .addClass('down-hover');

          $('#enter-button')
            .css('background-image', 'url(images/submit_inactive.png)')
            .addClass('enter-hover');
        }
        function diable_button() {
          $('#up-button')
            .css('background-image', 'url(images/up_disabled.png)')
            .removeClass('up-hover');

          $('#down-button')
            .css('background-image', 'url(images/down_disabled.png)')
            .removeClass('down-hover');

          $('#enter-button')
            .css('background-image', 'url(images/submit_disabled.png)')
            .removeClass('enter-hover');
        }

        function lowLight() {
          for (var field in fields) {
            $('#' + fields[field] + ' #title').css('color', '#555');
            $('#' + fields[field] + ' .val').css('color', '#555');
          }
          for (var index in hidden) {
            var field = hidden[index];
            $('#' + fields[field] + ' #title').css('color', 'white');
            $('#' + fields[field] + ' .val').css('color', 'white');
          }
        }
        function highLight() {
          for (var field in fields) {
            $('#' + fields[field] + ' #title').css('color', 'white');
            $('#' + fields[field] + ' .val').css('color', 'white');
          }
        }
        function re_enter() {
          re_entering = true;
          enable_button();

          $('#enter-button').bind('click', enter);

          $('#altitude').hide();
          $('#heading').hide();
          $('#speed').hide();

          $('#a').unbind('click');
          $('#h').unbind('click');
          $('#s').unbind('click');
          $('#f').unbind('click');
          falseCount = 0;
          if (GET_RANDOM_BOOLEAN()) {
            hidden.push(0);
            $('#a .val').text('?');
            $('#a').click((e) => {
              display_cursor(0);
            });
          }
          if (GET_RANDOM_BOOLEAN()) {
            hidden.push(1);
            $('#h .val').text('?');
            $('#h').click((e) => {
              display_cursor(1);
            });
          }
          if (GET_RANDOM_BOOLEAN()) {
            hidden.push(2);
            $('#s .val').text('?');
            $('#s').click((e) => {
              display_cursor(2);
            });
          }
          if (GET_RANDOM_BOOLEAN()) {
            hidden.push(3);
            $('#f .val').text('?');
            $('#f').click((e) => {
              display_cursor(3);
            });
          }
          lowLight();

          field = hidden[0];
          display_cursor();
          $('#play-time .action').text('re-enter');
          var secs = SECONDS_TO_RE_ENTER;
          $('#play-time .val').text(secs);
          re_enter_timer = setInterval(function () {
            secs--;
            $('#play-time .val').text(secs);
            if (secs == 0) {
              clearInterval(re_enter_timer);
              setTimeout(enter, 1000);
            }
          }, 1000);
        }

        var indication_timer;
        var extinguish_timer;
        var dirs = ['down', 'left', 'right'];
        var indication_dir = 0;

        var light_on = false;
        indication_timer = setInterval(
          display_indication,
          SECONDS_BETWEEN_INDICATIONS * 1000 +
            SECONDS_TO_EXTINGUISH_INDICATIONS * 1000
        );
        function display_indication() {
          light_on = true;
          all_lights++;
          indication_dir = Math.round(Math.random() * 2);
          $('#notepad-autopilot-image').attr(
            'src',
            'images/fms_' + dirs[indication_dir] + 'arrow-01.png'
          );
          extinguish_timer = setTimeout(
            switch_light,
            SECONDS_TO_EXTINGUISH_INDICATIONS * 1000
          );
        }

        function switch_light(correct) {
          clearInterval(extinguish_timer);
          $('#notepad-autopilot-image').attr('src', 'images/fms_no-arrow.png');
          light_on = false;
          if (correct) {
            true_lights++;
          }
        }

        KeyboardJS.on(
          'enter, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, ., left, up, right, down, backspace, num0, num1, num2, num3, num4, num5, num6, num7, num8, num9, w, s',
          function (e) {
            e.preventDefault();
          },
          parse_keys
        );
        function display_cursor(index) {
          if (!re_entering) return;
          $('#autopilot .cursor').hide();
          $('#autopilot .val').removeClass('active-textbox');

          if (index != undefined) field = index;
          $('#' + fields[field] + ' .cursor').show();
          $('#' + fields[field] + ' .val').addClass('active-textbox');
        }

        $('#up-button').click(up);
        function up() {
          if (!re_enter) return;
          var index = hidden.findIndex((h) => h == field);
          if (index == 0) return;
          field = hidden[index - 1];
          display_cursor();
        }
        $('#down-button').click(down);
        function down() {
          if (!re_enter) return;
          var index = hidden.findIndex((h) => h == field);
          if (index == hidden.length - 1) return;
          field = hidden[index + 1];
          display_cursor();
        }
        function enter() {
          $('#autopilot .val').removeClass('active-textbox');
          $('#enter-button').unbind('click', enter);
          if (re_entering) {
            all_recalls += hidden.length;
            $('#autopilot .cursor').hide();

            for (var index in hidden) {
              var field = hidden[index];
              var f = $('#' + fields[field] + ' .val');
              var val;
              switch (fields[field]) {
                case 'a':
                  val = altitude;
                  break;
                case 'h':
                  val = heading;
                  break;
                case 's':
                  val = speed;
                  break;
                case 'f':
                  val = frequency;
                  break;
              }

              val = '' + val;
              if (f.text() == val) {
                true_recalls++;
                changeTopText('left', 'Score:' + true_recalls);
              }
            }
            clearInterval(re_enter_timer);
            memorise();
          }
        }

        function parse_keys(e) {
          var key = e.keyCode;

          if (key == 190) key = 46; // fix period
          e.preventDefault();

          if( key == 87 ){
            up();
            return;
          }
          if(key == 83) {
            down();
            return;
          }

          if (re_entering) {
            var f = $('#' + fields[field] + ' .val');
            var t = f.text();
            // if (key === 38) up();
            // else if (key === 40) down();
            if (key == 13) enter();
            else if (key == 8) f.text(t.substr(0, t.length - 1));
            else {
              if (
                t.length < 5 &&
                (key != 46 || t.length > 0) &&
                (key < 37 || key > 40)
              )
                if (key != 46 || t.match(/\./) == null) {
                  if (f.text() == '?') f.text('');
                  if (key >= 96 && key <= 105) {
                    f.text(f.text() + String.fromCharCode(key - 48));
                  } else {
                    f.text(f.text() + String.fromCharCode(key));
                  }
                }
            }
          }
          if (light_on) {
            if (
              (key == 40 && indication_dir == 0) ||
              (key == 37 && indication_dir == 1) ||
              (key == 39 && indication_dir == 2)
            ) {
              switch_light(true);
            }

            // else if (key >= 37 && key <= 40) switch_light();
          }
        }

        memorise();

        var timer = setInterval(function () {
          time_left--;
          if (time_left >= 0) {
            changeTopText('right', minsAndSecs(time_left), false);
          }
          if (time_left < 0) {
            clearInterval(memorise_timer);
            clearInterval(re_enter_timer);
            clearInterval(indication_timer);
            clearInterval(extinguish_timer);
            clearInterval(timer);
            changeTopText('left', '- / -', true);
            changeTopText('right', 'End of Exam', true);
            var percentage_recalls = Math.round(
              (true_recalls / all_recalls) * 100
            );
            if (percentage_recalls)
              $('#percentage-recalls').text(percentage_recalls);

            $('#true_recalls').text(true_recalls);
            $('#all_recalls').text(all_recalls);

            $('#true_lights').text(true_lights);
            $('#all_lights').text(all_lights);

            var percentage_lights = Math.round(
              (true_lights / all_lights) * 100
            );
            if (percentage_lights)
              $('#percentage-lights').text(percentage_lights);

            score_manager.submit({
              game_duration: game_time,
              // score_errors: wrong_total,
              score: true_recalls,
              score_accuracy: Math.floor(
                (percentage_lights + percentage_recalls) / 2
              ),
            });
            showScreen('#results-screen');
            $('.start-button').prop('disabled', false);
          }
        }, 1000);
      }
      $('.start-button').bind('click', function () {
        $('.start-button').prop('disabled', true);
        showScreen('#time-screen');
      });
    }
  );
});
