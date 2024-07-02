var iOS = navigator.userAgent.match(/iPhone|iPod|iPad/i) != null;

var game = {
  _assets: {
    sounds: [],
    images: [],
  },
  sounds: [],
  _loadSounds: function () {
    var game = this;
    game.sounds = [];
    var filetype = $.browser.webkit || $.browser.msie ? "mp3" : "ogg";
    //filetype = 'wav';
    for (var sound in game._assets.sounds) {
      sound = game._assets.sounds[sound];
      game.sounds[sound] = soundManager.createSound({
        id: "audio_" + sound,
        url: "audio/" + sound + "." + filetype,
        autoLoad: true,
        autoPlay: false,
        onload: function () {
          $(game).trigger("loaded", ["sound", game._assets.sounds.length]);
        },
      });
      if (iOS) {
        game.sounds[sound].play({
          volume: 0,
          onfinish: function () {
            this.stop();
            $(game).trigger("loaded", ["sound", game._assets.sounds.length]);
          },
        });
      }
    }
  },
  images: [],
  _loadimages: function () {
    var game = this;
    game.images = [];
    for (var image in game._assets.images) {
      image = game._assets.images[image];
      if (image.slice(-4) == ".svg") {
        game.images[image] = $("<img />").attr("src", "images/" + image);
      } else
        game.images[image] = $("<img />").attr(
          "src",
          "images/" + image + ".png"
        );

      game.images[image].bind("load", function () {
        $(game).trigger("loaded", ["image", game._assets.images.length]);
      });
    }
  },
  load: function (assets, onload_percent, onload) {
    var game = this;
    game._assets = assets;
    var loaded = {
      image: 0,
      sound: 0,
    };
    var loaded_all = 0;
    var total_all = game._assets.sounds.length + game._assets.images.length;
    $(game).bind("loaded", function (event, type, total) {
      loaded[type]++;
      loaded_all++;
      onload_percent((loaded_all / total_all) * 100);
      if (loaded_all == total_all) onload();
      /*
			if(loaded[type]==total)
				loaded[type]=-total;
			var all_loaded = true;
			for(var l in loaded)
				all_loaded = all_loaded && loaded[l] < 0;
			if(all_loaded)
				onload();
			*/
    });
    soundManager.setup({
      debugMode: false,
      useHighPerformance: true,
      preferFlash: $.browser.msie && $.browser.version < 9,
      flashVersion: 9,
      url: "../_common/js/swf/",
      onready: function () {
        game._loadSounds();
      },
    });
    game._loadimages();
  },
};

var FADE_TIME = 0.5 * 1000;

function fadeOutIn(el, repeat) {
  var time = FADE_TIME;
  var repeatFunction = function () {};
  if (repeat)
    repeatFunction = function () {
      fadeOutIn(this, time);
    };
  $(el).fadeOut(time, function () {
    $(this).fadeIn(time, repeatFunction);
  });
}
function showScreen(screen, complete) {
  var currentScreen = $(".screen.on");
  currentScreen.fadeOut(FADE_TIME, function () {
    currentScreen.removeClass("on").addClass("off");
  });
  $(screen).fadeIn(FADE_TIME, function () {
    $(this).removeClass("off").addClass("on");
    if (typeof complete == "function") complete();
  });
}
function changeTopText(side, text, fade) {
  var time = FADE_TIME * 0.5; // 1/2 out, 1/2 in
  var el = $("#top" + side + " div");
  if (fade)
    el.fadeOut(time, function () {
      $(this).text(text).fadeIn(time);
    });
  else el.html(text);
}

$(document).ready(function () {
  if ($.browser.msie) {
    document.body.onselectstart = function () {
      return false;
    };
  }
});
