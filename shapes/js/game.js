$(document).ready(function () {
  score_manager.init('shapes_advanced');

  var THREE_SHAPES_CHANGE_TIME = 1.5; // in seconds
  var CORRECT_SHAPE_CHANGE_TIME = 7; // in seconds;
  var CORNER_CHANGE_TIME = 4; // in seconds;
  var TIME_TO_PRESS_KEY = 1.5; // in seconds

  var DEBUG = true;

  fadeOutIn('#loading-text', true);
  game.load(
    {
      sounds: [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        'blue',
        'circle',
        'green',
        'red',
        'square',
        'triangle',
        'yellow',
      ],
      images: [
        'bottom_off',
        'bottom_on',
        'circle_1_blue-01',
        'circle_2_blue-01',
        'circle_3_blue-01',
        'circle_4_blue-01',
        'circle_5_blue-01',
        'circle_6_blue-01',
        'circle_7_blue-01',
        'circle_8_blue-01',
        'circle_9_blue-01',
        'circle_1_green-01',
        'circle_2_green-01',
        'circle_3_green-01',
        'circle_4_green-01',
        'circle_5_green-01',
        'circle_6_green-01',
        'circle_7_green-01',
        'circle_8_green-01',
        'circle_9_green-01',
        'circle_1_red-01',
        'circle_2_red-01',
        'circle_3_red-01',
        'circle_4_red-01',
        'circle_5_red-01',
        'circle_6_red-01',
        'circle_7_red-01',
        'circle_8_red-01',
        'circle_9_red-01',
        'circle_1_yellow-01',
        'circle_2_yellow-01',
        'circle_3_yellow-01',
        'circle_4_yellow-01',
        'circle_5_yellow-01',
        'circle_6_yellow-01',
        'circle_7_yellow-01',
        'circle_8_yellow-01',
        'circle_9_yellow-01',
        'right_corner_on',
        'right_corner_off',
        'square_1_blue-01',
        'square_2_blue-01',
        'square_3_blue-01',
        'square_4_blue-01',
        'square_5_blue-01',
        'square_6_blue-01',
        'square_7_blue-01',
        'square_8_blue-01',
        'square_9_blue-01',
        'square_1_green-01',
        'square_2_green-01',
        'square_3_green-01',
        'square_4_green-01',
        'square_5_green-01',
        'square_6_green-01',
        'square_7_green-01',
        'square_8_green-01',
        'square_9_green-01',
        'square_1_red-01',
        'square_2_red-01',
        'square_3_red-01',
        'square_4_red-01',
        'square_5_red-01',
        'square_6_red-01',
        'square_7_red-01',
        'square_8_red-01',
        'square_9_red-01',
        'square_1_yellow-01',
        'square_2_yellow-01',
        'square_3_yellow-01',
        'square_4_yellow-01',
        'square_5_yellow-01',
        'square_6_yellow-01',
        'square_7_yellow-01',
        'square_8_yellow-01',
        'square_9_yellow-01',
        'tri_1_blue-01',
        'tri_2_blue-01',
        'tri_3_blue-01',
        'tri_4_blue-01',
        'tri_5_blue-01',
        'tri_6_blue-01',
        'tri_7_blue-01',
        'tri_8_blue-01',
        'tri_9_blue-01',
        'tri_1_green-01',
        'tri_2_green-01',
        'tri_3_green-01',
        'tri_4_green-01',
        'tri_5_green-01',
        'tri_6_green-01',
        'tri_7_green-01',
        'tri_8_green-01',
        'tri_9_green-01',
        'tri_1_red-01',
        'tri_2_red-01',
        'tri_3_red-01',
        'tri_4_red-01',
        'tri_5_red-01',
        'tri_6_red-01',
        'tri_7_red-01',
        'tri_8_red-01',
        'tri_9_red-01',
        'tri_1_yellow-01',
        'tri_2_yellow-01',
        'tri_3_yellow-01',
        'tri_4_yellow-01',
        'tri_5_yellow-01',
        'tri_6_yellow-01',
        'tri_7_yellow-01',
        'tri_8_yellow-01',
        'tri_9_yellow-01',
      ],
    },
    function (percent) {
      $('#loading-percent').text(Math.round(percent) + '%');
    },
    function () {
      var shapes = ['circle', 'square', 'tri'];
      var numbers = 9;
      var colours = ['blue', 'green', 'red', 'yellow'];

      var shape;

      function randomShape() {
        var o = {
          shape: shapes[Math.round(Math.random() * (shapes.length - 1))],
          number: 1 + Math.round(Math.random() * (numbers - 1)),
          colour: colours[Math.round(Math.random() * (colours.length - 1))],
        };
        o.url =
          'images/' + o.shape + '_' + o.number + '_' + o.colour + '-01.png';
        return o;
      }

      function updateMissed() {
        changeTopText(
          'left',
          miss_total + ' Error' + (miss_total > 1 ? 's' : '&ensp;') + '&ensp;'
        );
      }

      function updateCorrect() {
        changeTopText('left', 'Score: ' + correct_total);
      }

      var cornertimeout;
      var cornerinterval;

      var cornerside;
      var justmissed_corner = false;
      var justmissed_shape = false;
      var correct_total = 0;
      var miss_total = 0;

      var started = false;

      var downup = false;
      KeyboardJS.on(
        'down',
        function (e) {
          e.preventDefault();
          if (started) downup = true;
        },
        function (e) {
          e.preventDefault();
          if (downup) {
            if (cornertimeout && cornerside == 'bottom') {
              correct_total++;
              updateCorrect();
              if (DEBUG) console.log('corner ok!');
              clearInterval(cornertimeout);
              cornertimeout = null;
              switchCorner(cornerside, false);
            } else if (!justmissed_corner) {
              if (DEBUG) console.log('corner error!');
              miss_total++;
              // updateMissed();
            }
            downup = false;
          }
        }
      );
      var leftup = false;
      KeyboardJS.on(
        'left',
        function (e) {
          e.preventDefault();
          if (started) leftup = true;
        },
        function (e) {
          e.preventDefault();
          if (leftup) {
            if (cornertimeout && cornerside == 'left') {
              correct_total++;
              updateCorrect();
              if (DEBUG) console.log('corner ok!');
              clearInterval(cornertimeout);
              cornertimeout = null;
              switchCorner(cornerside, false);
            } else if (!justmissed_corner) {
              if (DEBUG) console.log('corner error!');
              miss_total++;
              // updateMissed();
            }
            leftup = false;
          }
        }
      );
      var rightup = false;
      KeyboardJS.on(
        'right',
        function (e) {
          e.preventDefault();
          if (started) rightup = true;
        },
        function (e) {
          e.preventDefault();
          if (rightup) {
            if (cornertimeout && cornerside == 'right') {
              correct_total++;
              updateCorrect();
              if (DEBUG) console.log('corner ok!');
              clearInterval(cornertimeout);
              cornertimeout = null;
              switchCorner(cornerside, false);
            } else if (!justmissed_corner) {
              if (DEBUG) console.log('corner error!');
              miss_total++;
              // updateMissed();
            }
            rightup = false;
          }
        }
      );

      var cornersides = ['bottom', 'left', 'right'];

      function switchCorner(cornerside, on) {
        $('#corner-' + cornerside + '-img').attr(
          'src',
          'images/' +
            cornerside +
            (cornerside != 'bottom' ? '_corner' : '') +
            (on ? '_on' : '_off') +
            '.png'
        );
      }

      function equalShape(shape1, shape2) {
        return (
          shape1.shape == shape2.shape &&
          shape1.number == shape2.number &&
          shape1.colour == shape2.colour
        );
      }

      function changeShapes(correctShape) {
        var correctPut = false;
        var shape1;
        do {
          shape1 = randomShape();
        } while (equalShape(shape, shape1));
        if (correctShape && !correctPut && Math.random() <= 0.33) {
          shape1 = shape;
          correctPut = true;
        }
        var shape2;
        do {
          shape2 = randomShape();
        } while (equalShape(shape, shape2) || equalShape(shape1, shape2));
        if (correctShape && !correctPut && Math.random() <= 0.33) {
          shape2 = shape;
          correctPut = true;
        }
        var shape3;
        do {
          shape3 = randomShape();
        } while (
          equalShape(shape, shape3) ||
          equalShape(shape1, shape3) ||
          equalShape(shape2, shape3)
        );
        if (correctShape && !correctPut) {
          shape3 = shape;
        }
        $('#shape1').attr('src', shape1.url);
        $('#shape2').attr('src', shape2.url);
        $('#shape3').attr('src', shape3.url);
      }

      var shapetimeout;

      var spaceup = false;
      KeyboardJS.on(
        'space',
        function (e) {
          e.preventDefault();
          if (started) spaceup = true;
        },
        function (e) {
          e.preventDefault();
          if (spaceup) {
            if (shapetimeout) {
              correct_total++;
              updateCorrect();
              if (DEBUG) console.log('shape ok!');
              clearInterval(shapetimeout);
              shapetimeout = null;
            } else if (!justmissed_shape) {
              if (DEBUG) console.log('shape error!');
              miss_total++;
              // updateMissed();
            }
            spaceup = false;
          }
        }
      );

      var timeSinceShape;
      var threeshapeinterval;
      var shapechangetimeout;

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

      var timer;
      var seconds;
      var game_time;

      miss_total = 0;

      function nextShape() {
        showScreen('#audio-screen');
        fadeOutIn('#audio-icon', true);

        shape = randomShape();
        timeSinceShape = 0;
        changeShapes(false);
        switchCorner('left', false);
        switchCorner('right', false);
        switchCorner('bottom', false);

        game.sounds[shape.colour].play({
          onfinish: function () {
            game.sounds[shape.shape != 'tri' ? shape.shape : 'triangle'].play({
              onfinish: function () {
                game.sounds[shape.number].play({
                  onfinish: function () {
                    shapechangetimeout = setTimeout(function () {
                      clearInterval(shapechangetimeout);
                      clearInterval(cornerinterval);
                      //clearInterval(cornertimeout);
                      clearInterval(threeshapeinterval);
                      //clearInterval(shapetimeout);
                      started = false;
                      shape = randomShape();
                      if (seconds > 0) nextShape();
                    }, CORRECT_SHAPE_CHANGE_TIME * 1000);

                    started = true;

                    justmissed_corner = false;
                    justmissed_shape = false;

                    showScreen('#shapes-screen');

                    cornerinterval = setInterval(function () {
                      cornerside =
                        cornersides[
                          Math.round(Math.random() * (cornersides.length - 1))
                        ];
                      switchCorner(cornerside, true);
                      cornertimeout = setTimeout(function () {
                        cornertimeout = null;
                        switchCorner(cornerside, false);
                        justmissed_corner = true;
                        setTimeout(function () {
                          justmissed_corner = false;
                        }, TIME_TO_PRESS_KEY * 1000);
                        if (DEBUG) console.log('corner miss!');
                        miss_total++;
                        // updateMissed();
                      }, TIME_TO_PRESS_KEY * 1000);
                    }, CORNER_CHANGE_TIME * 1000);

                    threeshapeinterval = setInterval(function () {
                      timeSinceShape++;
                      var timeForShape = false;
                      if (
                        timeSinceShape == CORRECT_SHAPE_CHANGE_TIME - 1 ||
                        Math.random() < 1 / CORRECT_SHAPE_CHANGE_TIME
                      ) {
                        timeForShape = true;
                        timeSinceShape = 0;
                      }
                      changeShapes(timeForShape);

                      if (timeForShape) {
                        shapetimeout = setTimeout(function () {
                          shapetimeout = null;
                          justmissed_shape = true;
                          setTimeout(function () {
                            justmissed_shape = false;
                          }, TIME_TO_PRESS_KEY * 1000);
                          if (DEBUG) console.log('shape miss!');
                          miss_total++;
                          // updateMissed();
                        }, TIME_TO_PRESS_KEY * 1000);
                      }
                    }, THREE_SHAPES_CHANGE_TIME * 1000);

                    if (!timer) {
                      timer = setInterval(function () {
                        seconds--;
                        if (seconds >= 0) {
                          changeTopText('right', minsAndSecs(seconds), false);
                        }
                        if (seconds < 0) {
                          var score = Math.round(
                              (correct_total / (correct_total + miss_total)) *
                                100
                            ),
                            started = false;
                          clearInterval(timer);
                          timer = null;
                          clearInterval(shapechangetimeout);
                          clearInterval(cornerinterval);
                          clearInterval(cornertimeout);
                          clearInterval(threeshapeinterval);
                          clearInterval(shapetimeout);
                          $('#results').text(`${score}%`);
                          score_manager.submit({
                            game_duration: game_time,
                            score_errors: miss_total,
                            score_accuracy: score,
                          });
                          changeTopText('left', 'Results', true);
                          changeTopText('right', 'End of Exam', true);
                          showScreen('#results-screen');
                          $('.start-button').prop('disabled', false);
                        }
                      }, 1000);
                    }
                  },
                });
              },
            });
          },
        });
      }

      $('#loading').hide();
      $('#start-button').fadeIn(FADE_TIME);

      $('.start-button').bind('click', function () {
        $('.start-button').prop('disabled', true);

        changeTopText('left', '', true);
        changeTopText('right', 'Select Duration');
        showScreen('#time-screen');
      });
      $('.time-button').bind('click', function () {
        seconds = $(this).attr('data-time') * 60;
        game_time = seconds;

        changeTopText('left', 'Score: 0');
        changeTopText('right', minsAndSecs(seconds));

        miss_total = 0;

        nextShape();
      });
    }
  );
});
