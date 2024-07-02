$(document).ready(function () {
  score_manager.init('crosshairs_advanced');

  var DELAY_BETWEEN_NUMBERS = 2; // in seconds;
  var TIME_TO_PRESS_SPACE = 1; // in seconds
  var CROSSHAIR_MOVE_INTERVAL = 0.25; // in seconds
  var CROSSHAIR_MOVE_AMOUNT = 30;
  var intensity = 1;

  var DEBUG = false;

  fadeOutIn('#loading-text', true);
  game.load(
    {
      sounds: [],
      images: ['centre'],
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
            initKeyPressed();
            const gp = navigator.getGamepads()[gamepadIndex];
            if (gp) {
              if (gp.axes[0] < -0.05) {
                if (gp.axes[1] < -0.05) {
                  // setDirectionJoystick('tl');
                  gamepad_flag = true;
                  keysPressed[KEY_UP_LEFT] = true;
                } else if (gp.axes[1] >= -0.05 && gp.axes[1] <= 0.05) {
                  // setDirectionJoystick('l');
                  gamepad_flag = true;
                  keysPressed[KEY_LEFT] = true;
                } else {
                  // setDirectionJoystick('bl');
                  gamepad_flag = true;
                  keysPressed[KEY_DOWN_LEFT] = true;
                }
              } else if (gp.axes[0] >= -0.05 && gp.axes[0] <= 0.05) {
                if (gp.axes[1] < -0.05) {
                  // setDirectionJoystick('t');
                  gamepad_flag = true;
                  keysPressed[KEY_UP] = true;
                } else if (gp.axes[1] >= -0.05 && gp.axes[1] <= 0.05) {
                  // initJoystick();
                  gamepad_flag = false;
                } else {
                  // setDirectionJoystick('b');
                  gamepad_flag = true;
                  keysPressed[KEY_DOWN] = true;
                }
              } else {
                if (gp.axes[1] < -0.05) {
                  // setDirectionJoystick('tr');
                  gamepad_flag = true;
                  keysPressed[KEY_UP_RIGHT] = true;
                } else if (gp.axes[1] >= -0.05 && gp.axes[1] <= 0.05) {
                  // setDirectionJoystick('r');
                  gamepad_flag = true;
                  keysPressed[KEY_RIGHT] = true;
                } else {
                  // setDirectionJoystick('br');
                  gamepad_flag = true;
                  keysPressed[KEY_DOWN_RIGHT] = true;
                }
              }
            }
          }
        }, 50);
      }

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

      var game_type = 'top';
      // ****************************  3D START  **********************************
      const T_SIZE = 420;

      const keysPressed = {};

      const KEY_UP = 'arrowup';
      const KEY_LEFT = 'arrowleft';
      const KEY_DOWN = 'arrowdown';
      const KEY_RIGHT = 'arrowright';
      const KEY_UP_RIGHT = 'arrowupright';
      const KEY_UP_LEFT = 'arrowupleft';
      const KEY_DOWN_RIGHT = 'arrowdownright';
      const KEY_DOWN_LEFT = 'arrowdownleft';

      let playerSettings = {
        turnSpeed: 0.3,
      };
      const plateAngle = {
        x: 0,
        y: 0,
        z: 0,
      };
      ///////////////cannon.js////////////
      const world = new CANNON.World();
      world.gravity.set(0, -50, 0);

      //Plate
      const plateBody = new CANNON.Body({ mass: 0 });
      const plateShape = new CANNON.Cylinder(11, 11, 0.3, 50);

      var quat = new CANNON.Quaternion();
      quat.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
      var translation = new CANNON.Vec3(0, 0, 0);
      plateShape.transformAllPoints(translation, quat);

      plateBody.addShape(plateShape);

      const segCount = 50;
      for (var i = 0; i < segCount; i++) {
        var pBody = new CANNON.Body({
          mass: 0,
          position: new CANNON.Vec3(
            Math.cos(((Math.PI * 2) / segCount) * i) * 10,
            0,
            Math.sin(((Math.PI * 2) / segCount) * i) * 10
          ), // m
          shape: new CANNON.Box(new CANNON.Vec3(0.1, 10, 10)),
        });
        pBody.quaternion.setFromAxisAngle(
          new CANNON.Vec3(0, 1, 0),
          ((-2 * Math.PI) / segCount) * i
        );
        plateBody.addShape(pBody.shapes[0], pBody.position, pBody.quaternion);
      }

      world.addBody(plateBody);

      //sphere body
      const sphereBody = new CANNON.Body({
        mass: 100,
        position: new CANNON.Vec3(0, 1, 0),
        shape: new CANNON.Sphere(1),
      });
      world.addBody(sphereBody);

      //set renderer start
      let scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(
        T_SIZE / -40,
        T_SIZE / 40,
        T_SIZE / 40,
        T_SIZE / -40,
        1,
        10000
      );
      let renderer = new THREE.WebGLRenderer();

      document.getElementById('crosshairs').appendChild(renderer.domElement);
      renderer.setSize(T_SIZE, T_SIZE);
      renderer.setClearColor(0xffffff);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      var light = new THREE.SpotLight(0xffffff, 1);
      light.position.set(60, 100, 60);
      light.castShadow = true;
      light.shadow.mapSize.width = 1024;
      light.shadow.mapSize.height = 1024;
      light.shadow.camera.near = 1;
      light.shadow.camera.far = 1000;
      scene.add(light);

      const hemiLight = new THREE.HemisphereLight(0xffffff, 0x080820, 1);
      scene.add(hemiLight);

      camera.position.set(0, 10, 60);
      camera.lookAt(0, 0, 0);
      //set renderer end

      //Start

      const pShape = new THREE.Shape()
        .moveTo(10, 0)
        .absarc(0, 0, 10, 0, Math.PI * 2, false);
      const pHoleShape = new THREE.Shape()
        .moveTo(3, 0)
        .absarc(0, 0, 3, 0, Math.PI * 2, false);
      pShape.holes.push(pHoleShape);
      const extrudeSettings = {
        depth: 0.15,
        bevelEnabled: true,
        bevelSegments: 20,
        steps: 20,
        bevelSize: 0.2,
        bevelThickness: 0.2,
        bevelOffset: 0,
        curveSegments: 500,
      };

      const plateGeo = new THREE.ExtrudeGeometry(pShape, extrudeSettings);
      const pMesh = new THREE.Mesh(
        plateGeo,
        new THREE.MeshPhysicalMaterial({ color: 0x222222 })
      );
      pMesh.material.roughness = 0.2;
      pMesh.rotation.x = Math.PI / 2;
      pMesh.position.y = -0.2;
      pMesh.receiveShadow = true;
      scene.add(pMesh);

      const cShape = new THREE.Shape()
        .moveTo(2.6, 0)
        .absarc(0, 0, 2.6, 0, Math.PI * 2, false);
      const cGeo = new THREE.ExtrudeGeometry(cShape, extrudeSettings);
      const cMesh = new THREE.Mesh(
        cGeo,
        new THREE.MeshStandardMaterial({ color: 0x525252 })
      );
      cMesh.rotation.x = Math.PI / 2;
      cMesh.position.y = -0.2;
      cMesh.receiveShadow = true;
      scene.add(cMesh);

      let sphereGeo = new THREE.SphereGeometry(1);
      let sphereMat = new THREE.MeshStandardMaterial({
        color: 0x08599,
        roughness: 0.5,
      });
      let sphere = new THREE.Mesh(sphereGeo, sphereMat);
      sphere.castShadow = true;
      sphere.receiveShadow = true;
      sphere.material.metalness = 0.2;
      sphere.position.copy(sphereBody.position);
      sphere.quaternion.copy(sphereBody.quaternion);
      scene.add(sphere);

      function updateControls() {
        //Movement Controls
        if (sphere == undefined || !started) {
          return;
        }

        //W and S Movement
        if (
          keysPressed[KEY_UP] ||
          keysPressed[KEY_UP_RIGHT] ||
          keysPressed[KEY_UP_LEFT]
        ) {
          if (plateAngle.x > -10) {
            plateAngle.x -= playerSettings.turnSpeed;
          }
        }

        if (
          keysPressed[KEY_DOWN] ||
          keysPressed[KEY_DOWN_RIGHT] ||
          keysPressed[KEY_DOWN_LEFT]
        ) {
          if (plateAngle.x < 10) {
            plateAngle.x += playerSettings.turnSpeed;
          }
        }

        //A and D Movement
        if (
          keysPressed[KEY_LEFT] ||
          keysPressed[KEY_UP_LEFT] ||
          keysPressed[KEY_DOWN_LEFT]
        ) {
          if (plateAngle.z < 10) {
            plateAngle.z += playerSettings.turnSpeed;
          }
        }

        if (
          keysPressed[KEY_RIGHT] ||
          keysPressed[KEY_UP_RIGHT] ||
          keysPressed[KEY_DOWN_RIGHT]
        ) {
          if (plateAngle.z > -10) {
            plateAngle.z -= playerSettings.turnSpeed;
          }
        }
      }

      function render() {
        updateControls();

        plateBody.quaternion.setFromEuler(
          ang2Rad(plateAngle.x),
          ang2Rad(plateAngle.y),
          ang2Rad(plateAngle.z)
        );

        pMesh.rotation.set(
          ang2Rad(plateAngle.x + 90),
          ang2Rad(plateAngle.z),
          0
        );
        cMesh.rotation.set(
          ang2Rad(plateAngle.x + 90),
          ang2Rad(plateAngle.z),
          0
        );

        sphere.position.copy(sphereBody.position);
        sphere.quaternion.copy(sphereBody.quaternion);

        world.step(1 / 60);

        renderer.render(scene, camera);
        requestAnimationFrame(render);
      }
      // ******************************  3D END ***********************************

      function dist() {
        return Math.sqrt(
          Math.pow(sphere.position.x, 2) + Math.pow(sphere.position.z, 2)
        );
      }

      function max() {
        return 10;
      }

      var distances = [];

      var chtimer;
      function moveCrosshairs() {
        if (sphere == undefined) {
          return;
        }
        chtimer = setInterval(function () {
          var movex =
            Math.random() * intensity * (Math.random() < 0.5 ? -1 : 1);
          var movey =
            Math.random() * intensity * (Math.random() < 0.5 ? -1 : 1);
          move('x', movex);
          move('z', movey);
          if (xtimer != null || ytimer != null || joy_flag || gamepad_flag) {
            var _dis = Math.abs(1 - dist() / max());
            distances.push(_dis);
            heatmaps.data.push({
              x: parseInt(150 + (sphere.position.x / 10) * 150),
              y: parseInt(150 + (sphere.position.z / 10) * 150),
              value: parseInt(150 * _dis),
              radius: parseInt(100 * (1 - _dis)),
            });
            // heatmaps.max = parseInt( (150 * _dis)>heatmaps.max?(150 * _dis):heatmaps.max );
            if (_dis >= 0.9) time_target += CROSSHAIR_MOVE_INTERVAL;
          }
        }, CROSSHAIR_MOVE_INTERVAL * 1000);
      }

      function move(axis, amount) {
        if (sphere == undefined) {
          return;
        }
        if (axis == 'x') {
          if (plateAngle.x > -10 && plateAngle.x < 10) {
            plateAngle.x += amount;
          }
        }
        if (axis == 'z') {
          if (plateAngle.z > -10 && plateAngle.z < 10) {
            plateAngle.z += amount;
          }
        }
      }

      var xtimer = null,
        ytimer = null;

      function handleKeyDown(e) {
        keysPressed[e.key.toLowerCase()] = true;
        var key = e.keyCode || e.which;
        switch (key) {
          case 38:
            e.preventDefault();
            setDirectionJoystick('t');
            if (!ytimer)
              ytimer = setInterval(function () {},
              CROSSHAIR_MOVE_INTERVAL * 150);
            break;
          case 40:
            e.preventDefault();
            setDirectionJoystick('b');
            if (!ytimer)
              ytimer = setInterval(function () {},
              CROSSHAIR_MOVE_INTERVAL * 150);
            break;
          case 37:
            e.preventDefault();
            setDirectionJoystick('l');
            if (!xtimer)
              xtimer = setInterval(function () {},
              CROSSHAIR_MOVE_INTERVAL * 150);
            break;
          case 39:
            e.preventDefault();
            setDirectionJoystick('r');
            if (!xtimer)
              xtimer = setInterval(function () {},
              CROSSHAIR_MOVE_INTERVAL * 150);
            break;
        }
      }

      function handleKeyUp(e) {
        keysPressed[e.key.toLowerCase()] = false;
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

      var joytimer;
      var joy_flag = false;
      function moveCrossWithJoystick() {
        joytimer = setInterval(function () {
          var offX = parseFloat((JoyDiv.GetPosX() - 60) / 30).toFixed(2);
          var offY = parseFloat((JoyDiv.GetPosY() - 60) / 30).toFixed(2);
          var dic = JoyDiv.GetDir();
          initKeyPressed();
          if (dic == 'C') {
            joy_flag = false;
          } else {
            joy_flag = true;
            switch (dic) {
              case 'N':
                keysPressed[KEY_UP] = true;
                break;
              case 'NE':
                keysPressed[KEY_UP_RIGHT] = true;
                break;
              case 'E':
                keysPressed[KEY_RIGHT] = true;
                break;
              case 'SE':
                keysPressed[KEY_DOWN_RIGHT] = true;
                break;
              case 'S':
                keysPressed[KEY_DOWN] = true;
                break;
              case 'SW':
                keysPressed[KEY_DOWN_LEFT] = true;
                break;
              case 'W':
                keysPressed[KEY_LEFT] = true;
                break;
              case 'NW':
                keysPressed[KEY_UP_LEFT] = true;
                break;
              default:
                break;
            }
          }
        }, 50);
      }

      function initKeyPressed() {
        keysPressed[KEY_UP] = false;
        keysPressed[KEY_UP_RIGHT] = false;
        keysPressed[KEY_RIGHT] = false;
        keysPressed[KEY_DOWN_RIGHT] = false;
        keysPressed[KEY_DOWN] = false;
        keysPressed[KEY_DOWN_LEFT] = false;
        keysPressed[KEY_LEFT] = false;
        keysPressed[KEY_UP_LEFT] = false;
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

        changeTopText('right', 'Select Mode');
        showScreen('#type-screen');
      });
      $('.type-button').bind('click', function () {
        changeTopText('right', 'Select Duration');
        game_type = $(this).attr('data-type');

        if (game_type == 'top') {
          light.position.set(60, 100, 100);
          camera.position.set(0, 10, 0);
          $('#crosshairs > canvas').addClass('border');
        } else if (game_type == 'side') {
          light.position.set(60, 60, 60);
          camera.position.set(0, 10, 60);
          $('#crosshairs > canvas').removeClass('border');
        }
        camera.lookAt(0, 0, 0);

        showScreen('#time-screen');
      });
      $('.time-button').bind('click', function () {
        miss_total = 0;
        correct_total = 0;
        distances = [];
        heatmaps.data = [];
        started = true;

        plateAngle.x = 0;
        plateAngle.z = 0;

        sphereBody.position.set(0, 1, 0);

        var seconds = $(this).attr('data-time') * 60;
        var game_time = seconds;

        changeTopText('left', 'Score: 0&ensp;');
        changeTopText('right', minsAndSecs(seconds));

        showScreen('#crosshairs-screen');

        moveCrosshairs();
        moveCrossWithJoystick();
        gamepadHandler();

        render();

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
            changeTopText('left', 'Results', true);
            changeTopText('right', 'Results', true);
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
            score_manager.submit({
              game_duration: game_time,
              score_errors: miss_total,
              score_correct: correct_total,
              score_accuracy: Math.round(avg * 100),
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
