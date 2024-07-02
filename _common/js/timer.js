var TimerManager = function() {
	var timers = [];

	this.add = function(timer) { timer["elapsed"] = 0; timer["lastRun"] = Date.now(); timers.push(timer); timers[timer.id] = timers.length - 1; };
	this.remove = function(timer) { var id = timer.id || timer; var i = timers[id]; if(i !== undefined) delete timers[i]; delete timers[id]; };

	function update() {
		var now = Date.now();
		for(var i = 0, l = timers.length; i < l; i++) {
			var t = timers[i];
			if(t && t.lastRun + t.interval <= now) {
				t.elapsed += now - t.lastRun;
				t.runnable(t.id, t.elapsed);
				t.lastRun = now;
			}
		}
		setTimeout(update, 0);
	};

	setTimeout(update, 0);
}

var timerManager = new TimerManager;

function Timer(id, interval, fn) {
	timerManager.add({
		id: id,
		interval: interval,
		runnable: fn
	});
}
