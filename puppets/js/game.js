$(document).ready(function () {
  score_manager.init('puppets_advanced');

  var SECONDS_PER_QUESTION = 10;
  var NUMBER_OF_QUESTIONS = [10, 20, 30];

  fadeOutIn('#loading-text', true);
  game.load(
    {
      sounds: ['Left_n', 'right_n', 'positive_n', 'negative_n', 'Square_1'],
      images: [
        'left_square_behind-01',
        'left_square_front-01',
        'right_square_behind-01',
        'right_square_front-01',
      ],
    },
    function (percent) {
      $('#loading-percent').text(Math.round(percent) + '%');
    },
    function () {
      var totalSec = 0;
      var N_QUESTIONS = 0;
      $('.time-button').each(function (i) {
        $(this).find('.question').text(NUMBER_OF_QUESTIONS[i]);
      });
      $('#loading').hide();
      $('#start-button').fadeIn(FADE_TIME);
      var correct_total = 0;
      function question(number) {
        var left_right = Math.round(Math.random()) == 0 ? 'Left_n' : 'right_n';
        var positive_negative =
          Math.round(Math.random()) == 0 ? 'positive_n' : 'negative_n';
        var puppets = [];
        var correct = 0;
        for (var puppet = 1; puppet <= 3; puppet++) {
          puppets[puppet] = game._assets.images[Math.round(Math.random() * 3)];
          var lr = left_right.toLowerCase().substring(0, left_right.length - 2);
          if (
            (positive_negative == 'positive_n' &&
              puppets[puppet].indexOf(lr) >= 0) ||
            (positive_negative == 'negative_n' &&
              puppets[puppet].indexOf(lr) < 0)
          )
            correct++;
        }
        var seconds = SECONDS_PER_QUESTION;
        var timer;
        function nextQuestion() {
          clearInterval(timer);
          if (number < N_QUESTIONS) question(number + 1);
          else {
            changeTopText('left', 'Results', true);
            changeTopText('right', 'End of Exam', true);
            showScreen('#results-screen');
            $('#results')
              .text(Math.round((correct_total / N_QUESTIONS) * 100) + '')
              .fadeIn(FADE_TIME);
            score_manager.submit({
              game_duration: totalSec,
              score_accuracy: Math.round((correct_total / N_QUESTIONS) * 100),
            });
            $('.start-button').prop('disabled', false);
            $('.time-button').prop('disabled', false);
          }
        }

        changeTopText('left', 'Ques ' + number, true);
        changeTopText(
          'right',
          (seconds <= 9 ? '&ensp;' : '') + seconds + ' seconds',
          false
        );
        showScreen('#audio-screen');
        fadeOutIn('#audio-icon', true);
        game.sounds[left_right].play({
          onfinish: function () {
            game.sounds['Square_1'].play({
              onfinish: function () {
                game.sounds[positive_negative].play({
                  onfinish: function () {
                    for (var puppet in puppets) {
                      var img = $('#puppet' + puppet);
                      img.attr('src', 'images/' + puppets[puppet] + '.png');
                      if (Math.round(Math.random() * 2) == 2) {
                        var angle = Math.round(Math.random() * 2) - 1;
                        img.rotate(angle * 90);
                      }
                    }
                    showScreen('#puppet-screen', function () {
                      var buttons = $('button.answer-button');
                      buttons.bind('mousedown', function () {
                        buttons.unbind('mousedown');
                        buttons.prop('disabled', true);
                        if ($(this).attr('data-answer') == correct) {
                          correct_total++;
                        }
                        nextQuestion();
                      });
                      buttons.prop('disabled', false);
                      timer = setInterval(function () {
                        totalSec++;
                        seconds--;
                        if (seconds >= 0) {
                          changeTopText(
                            'right',
                            (seconds <= 9 ? '&ensp;' : '') +
                              seconds +
                              ' seconds',
                            false
                          );
                        }
                        if (seconds < 0) {
                          nextQuestion();
                        }
                      }, 1000);
                    });
                  },
                });
              },
            });
          },
        });
      }
      $('.start-button').bind('click', function () {
        $('.start-button').prop('disabled', true);
        showScreen('#time-screen');
      });
      $('.time-button').bind('click', function () {
        $('.time-button').prop('disabled', true);
        var i = parseInt($(this).attr('data-order') - 1);
        if (!isNaN(i) && i > 0 && i < NUMBER_OF_QUESTIONS.length)
          N_QUESTIONS = NUMBER_OF_QUESTIONS[i];
        else N_QUESTIONS = NUMBER_OF_QUESTIONS[0];
        console.log(N_QUESTIONS);
        correct_total = 0;
        question(1);
      });
    }
  );
});
