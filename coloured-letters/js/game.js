$(document).ready(function () {
  score_manager.init('grid_advanced');

  var SECONDS_UNTIL_CHANGE = 5;
  var PROBABILITY_OF_MATCH = 0.4;
  var MIN_LETTERS_CHANGE = 8;
  var MAX_LETTERS_CHANGE = 13;

  fadeOutIn('#loading-text', true);
  game.load(
    {
      sounds: [],
      images: [
        'Blue_A-01',
        'Blue_B-01',
        'Blue_C-01',
        'Blue_D-01',
        'Blue_E-01',
        'Green_A-01',
        'Green_B-01',
        'Green_C-01',
        'Green_D-01',
        'Green_E-01',
        'grid_empty',
        'Orange_A-01',
        'Orange_B-01',
        'Orange_C-01',
        'Orange_D-01',
        'Orange_E-01',
        'Purple_A-01',
        'Purple_B-01',
        'Purple_C-01',
        'Purple_D-01',
        'Purple_E-01',
        'Red_A-01',
        'Red_B-01',
        'Red_C-01',
        'Red_D-01',
        'Red_E-01',
      ],
    },
    function (percent) {
      $('#loading-percent').text(Math.round(percent) + '%');
    },
    function () {
      $('#loading').hide();
      $('#start-button').fadeIn(FADE_TIME);
      var correct_total = 0;
      var wrong_total = 0;
      var time_left = 0;
      var game_time = 0;
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
        wrong_total = 0;
        time_left = $(this).attr('data-time') * 60;
        game_time = time_left;

        changeTopText('left', 'Score: 0');
        changeTopText('right', minsAndSecs(time_left));

        showScreen('#grid-screen');
        play();
      });
      function play() {
        var hasToMatch = false;
        var lastMatch = -1;
        function changeLetters(all) {
          var colors = ['Red', 'Green', 'Blue', 'Orange', 'Purple'];
          var letters = ['A', 'B', 'C', 'D', 'E'];
          var cells = $('#grid-cells div img');
          if (all) {
            $.each(cells, function (i, e) {
              var color = 0,
                letter = 0;
              do {
                color = Math.round(Math.random() * (colors.length - 1));
                letter = Math.round(Math.random() * (letters.length - 1));
              } while (letter * colors.length + color == i);
              var url =
                'images/' + colors[color] + '_' + letters[letter] + '-01.png';
              $(this).attr('src', url);
            });
          } else {
            if (lastMatch >= 0) {
              var color = Math.round(Math.random() * (colors.length - 1));
              var letter = Math.round(Math.random() * (letters.length - 1));
              var url =
                'images/' + colors[color] + '_' + letters[letter] + '-01.png';
              $(cells[lastMatch]).attr('src', url);
            }
            var n_change = Math.round(
              MIN_LETTERS_CHANGE +
                Math.random() * (MAX_LETTERS_CHANGE - MIN_LETTERS_CHANGE - 1)
            );
            for (var i = 0; i < n_change; i++) {
              var color = 0,
                letter = 0,
                pos = 0;
              do {
                pos = Math.round(Math.random() * cells.length - 1);
                color = Math.round(Math.random() * (colors.length - 1));
                letter = Math.round(Math.random() * (letters.length - 1));
              } while (
                pos == lastMatch ||
                pos == letter * colors.length + color
              );
              var url =
                'images/' + colors[color] + '_' + letters[letter] + '-01.png';
              $(cells[pos]).attr('src', url);
            }
          }
          hasToMatch = Math.random() <= PROBABILITY_OF_MATCH;
          if (hasToMatch) {
            var color = Math.round(Math.random() * (colors.length - 1));
            var letter = Math.round(Math.random() * (letters.length - 1));
            var url =
              'images/' + colors[color] + '_' + letters[letter] + '-01.png';
            lastMatch = letter * colors.length + color;
            $(cells[lastMatch]).attr('src', url);
          }
        }
        var matchTimer;
        var lastTimestamp = 0;
        var times = [];
        function nextGrid(first) {
          $('#match-button').unbind('click');
          clearInterval(matchTimer);
          $('#match-time').hide();
          if (hasToMatch) {
            wrong_total++;
          }
          first = first != undefined && first;
          changeLetters(first);
          if (hasToMatch) {
            lastTimestamp = new Date().getTime();
          }
          $('#match-button').bind('click', function () {
            $(this).unbind('click');
            if (hasToMatch) {
              correct_total++;
              changeTopText('left', 'Score: ' + correct_total);
              var time = new Date().getTime() - lastTimestamp;
              $('#match-time')
                .text((time / 1000).toFixed(3) + 's')
                .show()
                .fadeOut(1000);
              times.push(time);
              hasToMatch = false;
            } else {
              wrong_total++;
            }
          });
          matchTimer = setTimeout(nextGrid, SECONDS_UNTIL_CHANGE * 1000);
        }
        function average() {
          var sum = 0;
          for (var time in times) {
            sum += times[time];
          }
          return sum / times.length;
        }
        var timer = setInterval(function () {
          time_left--;
          if (time_left >= 0) {
            changeTopText('right', minsAndSecs(time_left), false);
          }
          if (time_left < 0) {
            var score = Math.round(
              (correct_total / (correct_total + wrong_total)) * 100
            );

            clearInterval(timer);
            clearInterval(matchTimer);
            changeTopText('left', '- / -', true);
            changeTopText('right', 'End of Exam', true);
            $('#results').text(`${score}%`);
            var reaction_time = average();
            var avg = (reaction_time / 1000).toFixed(3);
            if (!isNaN(avg)) avg += 's';
            else {
              avg = '-';
              reaction_time = 0;
            }
            $('#results-average').text(avg);
            showScreen('#results-screen');
            score_manager.submit({
              game_duration: game_time,
              score_errors: wrong_total,
              score_reactiontime: reaction_time / 1000,
              score_accuracy: score,
            });
            $('.start-button').prop('disabled', false);
          }
        }, 1000);
        nextGrid(true);
      }
      $('.start-button').bind('click', function () {
        $('.start-button').prop('disabled', true);
        showScreen('#time-screen');
      });
    }
  );
});
