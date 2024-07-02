$(document).ready(function () {
  score_manager.init('memory_basic');

  var SECONDS_TO_CHECK = 1;
  var SECONDS_TO_ENTERMODULE = 15; // This is the available time value in input data
  var SECONDS_BETWEEN_INDICATIONS = 5;
  var SECONDS_TO_EXTINGUISH_INDICATIONS = 3;

  var MIN_ALTITUDE = 100;
  var MAX_ALTITUDE = 30000;
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

  var GET_ARRAY = function () {
    var array = [Math.round(Math.random()), Math.round(Math.random())];
    if (array[0] == 0 && array[1] == 0) array.push(1);
    else if (array[0] == 1 && array[1] == 1) array.push(0);
    else array.push(Math.round(Math.random()));
    return array;
  };
  fadeOutIn('#loading-text', true);
  game.load(
    {
      sounds: [],
      images: [
        'up_active',
        'up_disabled',
        'up_inactive',
        'down_active',
        'down_disabled',
        'down_inactive',
        'submit_active',
        'submit_disabled',
        'submit_inactive',
        'key_0',
        'key_1',
        'key_2',
        'key_3',
        'key_4',
        'key_5',
        'key_6',
        'key_7',
        'key_8',
        'key_9',
        'module_small.svg',
        'scratchpad_small.svg',
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

      var time_left = 0;
      var game_time = 0;
      var light_on = false;
      var indication_dir = 0;
      var entering = false;
      var secs = 0;
      var enter_module_timer;
      var check_timer;
      var indication_timer;
      var extinguish_timer;
      var altitude, heading, speed;

      var randwomArray = [];
      var zeroCnt;
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

        light_on = false;
        indication_dir = 0;
        secs = 0;
        time_left = $(this).attr('data-time') * 60;
        game_time = time_left;
        entering = false;
        clearInterval(enter_module_timer);
        changeTopText('left', 'Score: 0');
        changeTopText('right', minsAndSecs(time_left));

        showScreen('#game-screen');
        play();
      });

      function play() {
        var field = 0;
        var fields = ['a', 'h', 's'];

        function enterModule() {
          entering = true;
          enable_button();

          randwomArray = GET_ARRAY(); // 0: change, 1: no change
          zeroCnt = 0;
          randwomArray.forEach((e) => {
            if (!e) zeroCnt++;
          });

          console.log(randwomArray, zeroCnt);

          var firstIndex = randwomArray.findIndex((e) => e == 0);

          $('#autopilot .val').removeClass('active-textbox');

          $(`#autopilot #${fields[firstIndex]} .val`).addClass(
            'active-textbox'
          );

          altitude = ALTITUDE_FUNCTION();
          $('#altitude').children('.val').text(altitude);
          $('#a .val').text(randwomArray[0] ? altitude : '');
          $('#a .val').css('color', randwomArray[0] ? '#555' : 'white');

          heading = HEADING_FUNCTION();
          $('#heading').children('.val').text(heading);
          $('#h .val').text(randwomArray[1] ? heading : '');
          $('#h .val').css('color', randwomArray[1] ? '#555' : 'white');

          speed = SPEED_FUNCTION();
          $('#speed').children('.val').text(speed);
          $('#s .val').text(randwomArray[2] ? speed : '');
          $('#s .val').css('color', randwomArray[2] ? '#555' : 'white');

          $('#play-time .action').text('input data');
          secs = SECONDS_TO_ENTERMODULE;

          $('#play-time').show();
          $('#play-time .val').text(secs);

          $('#enter-button').bind('click', enter);

          field = firstIndex;
          display_cursor();

          enter_module_timer = setInterval(function () {
            secs--;
            $('#play-time .val').text(secs);
            if (secs <= 0) {
              // clearInterval(enter_module_timer);
              enter();
            }
          }, 1000);
        }

        $('#a').click((e) => {
          display_cursor(0);
        });

        $('#h').click((e) => {
          display_cursor(1);
        });
        $('#s').click((e) => {
          display_cursor(2);
        });

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
        function disable_button() {
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

        function check() {
          entering = false;
          disable_button();
          $('#autopilot .val').removeClass('active-textbox');
          $('#autopilot .val').css('color', '#555');
          $('#a .val').text(altitude);
          $('#h .val').text(heading);
          $('#s .val').text(speed);

          $('#play-time .action').text('check');
          secs = SECONDS_TO_CHECK;
          // $("#play-time .val").text(secs);
          $('#play-time').hide();

          check_timer = setInterval(function () {
            secs--;
            // $("#play-time .val").text(secs);
            if (secs <= 0) {
              clearInterval(check_timer);
              setTimeout(enterModule, 1000);
            }
          }, 1000);
        }

        indication_timer = setInterval(
          display_indication,
          SECONDS_BETWEEN_INDICATIONS * 1000 +
            SECONDS_TO_EXTINGUISH_INDICATIONS * 1000
        );

        function display_indication() {
          light_on = true;
          all_lights++;
          indication_dir = Math.round(Math.random() * 8) + 1;
          $('.keyboard img').attr(
            'src',
            'images/key_' + indication_dir + '.png'
          );
          extinguish_timer = setTimeout(
            switch_light,
            SECONDS_TO_EXTINGUISH_INDICATIONS * 1000
          );
        }

        function switch_light(correct) {
          light_on = false;
          clearInterval(extinguish_timer);
          $('.keyboard img').attr('src', 'images/key_0.png');

          if (correct) {
            true_lights++;
          }
        }

        KeyboardJS.on(
          'enter, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, backspace, left, up, down, right, num0, num1, num2, num3, num4, num5, num6, num7, num8, num9, u, i, o, h, j, k, b, n, m',
          function (e) {
            e.preventDefault();
          },
          parse_keys
        );
        function display_cursor(index) {
          if (!entering) return;
          if (randwomArray[index]) return;
          $('#autopilot .cursor').hide();
          $('#autopilot .val').removeClass('active-textbox');

          if (index != undefined) field = index;
          $('#' + fields[field] + ' .cursor').show();
          $('#' + fields[field] + ' .val').addClass('active-textbox');
        }

        $('#up-button').click(up);
        function up() {
          if (entering && field > 0) {
            var temp;
            for (var i = 0; i < field; i++) {
              if (!randwomArray[i]) temp = i;
            }
            console.log('temp:' + temp);
            if (temp != undefined) field = temp;
            display_cursor();
          }
        }
        $('#down-button').click(down);
        function down() {
          if (entering && field < 2) {
            var temp;
            for (var i = 2; i > field; i--) {
              if (!randwomArray[i]) temp = i;
            }
            console.log('temp:' + temp);
            if (temp != undefined) field = temp;
            display_cursor();
          }
        }
        $('#enter-button').click(enter);
        function enter() {
          clearInterval(enter_module_timer);
          $('#autopilot .val').removeClass('active-textbox');
          if (entering) {
            all_recalls += zeroCnt;
            $('#autopilot .cursor').hide();

            for (var field in fields) {
              if (randwomArray[field]) continue;
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
              }
              val = '' + val;
              if (f.text() == val) {
                true_recalls++;
                changeTopText('left', 'Score: ' + true_recalls);
              }
            }
            check();
          }
        }

        function parse_keys(e) {
          var key = e.keyCode;
          if (key == 190) key = 46; // fix period
          e.preventDefault();
          if (
            light_on &&
            ((key == 66 && indication_dir == 1) ||
              (key == 78 && indication_dir == 2) ||
              (key == 77 && indication_dir == 3) ||
              (key == 72 && indication_dir == 4) ||
              (key == 74 && indication_dir == 5) ||
              (key == 75 && indication_dir == 6) ||
              (key == 85 && indication_dir == 7) ||
              (key == 73 && indication_dir == 8) ||
              (key == 79 && indication_dir == 9))
          ) {
            switch_light(true);
            return;
          }
          if (entering) {
            var f = $('#' + fields[field] + ' .val');
            var t = f.text();
            if (key === 38) up();
            else if (key === 40) down();
            else if (key == 13) enter();
            else if (key == 8) f.text(t.substr(0, t.length - 1));
            else if (t.length < 5 && (key < 37 || key > 40)) {
              if (key != 46 || t.match(/\./) == null) {
                if (key >= 96 && key <= 105)
                  f.text(f.text() + String.fromCharCode(key - 48));
                if (key >= 48 && key <= 57)
                  f.text(f.text() + String.fromCharCode(key));
              }
            }
          }
        }

        enterModule();

        var timer = setInterval(function () {
          time_left--;
          if (time_left > 0) {
            changeTopText('right', minsAndSecs(time_left), false);
          } else {
            clearInterval(enter_module_timer);
            clearInterval(check_timer);
            clearInterval(indication_timer);
            clearInterval(extinguish_timer);
            clearInterval(timer);
            changeTopText('left', '- / -', true);
            changeTopText('right', 'End of Exam', true);

            $('.keyboard img').attr('src', 'images/key_0.png');

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
