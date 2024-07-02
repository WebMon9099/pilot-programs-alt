(function () {
    var lastTime = 0;
    var vendors = ["ms", "moz", "webkit", "o"];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame =
            window[vendors[x] + "RequestAnimationFrame"];
        window.cancelRequestAnimationFrame =
            window[vendors[x] + "CancelRequestAnimationFrame"];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function (callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function () {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
})();

var layers = [],
    objects = [],
    world = document.getElementById("world"),
    viewport = document.getElementById("viewport"),
    d = 0,
    p = 400,
    worldXAngle = 0,
    worldYAngle = 0,
    computedWeights = [];

var links = document.querySelectorAll("a[rel=external]");
for (var j = 0; j < links.length; j++) {
    var a = links[j];
    a.addEventListener(
        "click",
        function (e) {
            window.open(this.href, "_blank");
            e.preventDefault();
        },
        false
    );
}

viewport.style.webkitPerspective = p;
viewport.style.MozPerspective = p + "px";
viewport.style.oPerspective = p;
viewport.style.perspective = p;

generate();

function createCloud(pos) {
    var div = document.createElement("div");
    div.className = "cloudBase";
    // var x = 256 - Math.random() * 512;
    // var y = 256 - Math.random() * 512;
    // var z = 256 - Math.random() * 512;
    var x = 1400 - (pos % 3) * 1400;
    var y = 512 - Math.floor(pos / 3) * 1024;
    var z = 256 - Math.random() * 512;
    var t =
        "translateX( " +
        x +
        "px ) translateY( " +
        y +
        "px ) translateZ( " +
        z +
        "px )";
    div.style.webkitTransform =
        div.style.MozTransform =
        div.style.oTransform =
        div.style.transform =
            t;
    world.appendChild(div);

    for (var j = 0; j < 50; j++) {
        var cloud = document.createElement("img");
        cloud.style.opacity = 0;
        var r = Math.random();
        var src = "./images/cloud.png";
        for (var k = 0; k < computedWeights.length; k++) {
            if (r >= computedWeights[k].min && r <= computedWeights[k].max) {
                (function (img) {
                    img.addEventListener("load", function () {
                        img.style.opacity = 0.8;
                    });
                })(cloud);
                src = computedWeights[k].src;
            }
        }
        if (computedWeights.length === 0) {
            cloud.style.opacity = 0.8;
        }
        cloud.setAttribute("src", src);
        cloud.className = "cloudLayer";

        var x = 700 - Math.random() * 1400;
        var y = 512 - Math.random() * 1024;
        var z = 100 - Math.random() * 500;

        // var x = 256 - ((Math.floor(j / 20) % 3) * 628 + Math.random() * 628 );
        // var y =  (Math.floor(j / 60) * 1024 + Math.random() * 1024 );
        // var z = 100 - (j % 20 * 50 );

        var a = Math.random() * 360;
        var s = 0.25 + Math.random();
        x *= 0.2;
        y *= 0.2;
        cloud.data = {
            x: x,
            y: y,
            z: z,
            a: a,
            s: s,
            // speed: 0.1 * Math.random(),
        };
        var t =
            "translateX( " +
            x +
            "px ) translateY( " +
            y +
            "px ) translateZ( " +
            z +
            "px ) rotateZ( " +
            a +
            "deg ) scale( " +
            s +
            " )";
        cloud.style.webkitTransform =
            cloud.style.MozTransform =
            cloud.style.oTransform =
            cloud.style.transform =
                t;

        div.appendChild(cloud);
        layers.push(cloud);
    }

    return div;
}

// window.addEventListener("keydown", function (e) {
//     // if (e.keyCode == 32) generate();

//     switch (e.keyCode) {
//         case 32:
//             // generate();
//             break;
//         case 37:
//             document.getElementById("viewport").style.marginLeft =
//                 parseInt(document.getElementById("viewport").style.marginLeft) +
//                 2.5 +
//                 "px";
//             break;
//         case 39:
//             document.getElementById("viewport").style.marginLeft =
//                 parseInt(document.getElementById("viewport").style.marginLeft) -
//                 2.5 +
//                 "px";
//             break;
//         case 38:
//             if (alt < 5800) {
//                 document.getElementById("viewport").style.marginTop =
//                     parseInt(
//                         document.getElementById("viewport").style.marginTop
//                     ) +
//                     1.5 +
//                     "px";
//             }
//             break;
//         case 40:
//             if (alt > 4195) {
//                 document.getElementById("viewport").style.marginTop =
//                     parseInt(
//                         document.getElementById("viewport").style.marginTop
//                     ) -
//                     1.5 +
//                     "px";
//             }
//             break;
//     }
// });

function generate() {
    objects = [];
    if (world.hasChildNodes()) {
        while (world.childNodes.length >= 1) {
            world.removeChild(world.firstChild);
        }
    }
    for (var j = 0; j < 6; j++) {
        objects.push(createCloud(j));
    }
}

function updateView() {
    var t =
        "translateZ( " +
        d +
        "px ) rotateX( " +
        worldXAngle +
        "deg) rotateY( " +
        worldYAngle +
        "deg)";
    world.style.webkitTransform =
        world.style.MozTransform =
        world.style.oTransform =
        world.style.transform =
            t;
}

function orientationhandler(e) {
    if (!e.gamma && !e.beta) {
        e.gamma = -(e.x * (180 / Math.PI));
        e.beta = -(e.y * (180 / Math.PI));
    }

    var x = e.gamma;
    var y = e.beta;

    worldXAngle = y;
    worldYAngle = x;
    updateView();
}

function update() {
    for (var j = 0; j < layers.length; j++) {
        var layer = layers[j];
        layer.data.a += layer.data.speed;
        var t =
            "translateX( " +
            layer.data.x +
            "px ) translateY( " +
            layer.data.y +
            "px ) translateZ( " +
            layer.data.z +
            "px ) rotateY( " +
            -worldYAngle +
            "deg ) rotateX( " +
            -worldXAngle +
            "deg ) rotateZ( " +
            layer.data.a +
            "deg ) scale( " +
            layer.data.s +
            ")";
        layer.style.webkitTransform =
            layer.style.MozTransform =
            layer.style.oTransform =
            layer.style.transform =
                t;
        //layer.style.webkitFilter = 'blur(5px)';
    }

    requestAnimationFrame(update);
}

update();

setInterval(() => {
    d += 0.025;
    if (d < 600) {
        updateView();
    } else {
        update();
        d = 0;
    }
}, 10);
