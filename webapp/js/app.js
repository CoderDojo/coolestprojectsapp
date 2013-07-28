var app = {
    views: {},
    models: {},
    routers: {},
    utils: {},
    adapters: {}
};

var shakes = 0;
var lastX, lastY, lastZ;
var moveCounter = 0;

document.addEventListener("deviceready", loadApp, true);

function loadApp() {
    alert('loaded');
    //navigator.splashscreen.hide();
    navigator.accelerometer.watchAcceleration(gotMovement, errHandler, {
        frequency: 200
    });
}

function errHandler(e) {
    console.log("--- ERROR ---");
    console.dir(e);
}

function gotMovement(a) {
    if (!lastX) {
        lastX = a.x;
        lastY = a.y;
        lastZ = a.z;
        return;
    }

    var deltaX, deltaY, deltaZ;
    deltaX = Math.abs(a.x - lastX);
    deltaY = Math.abs(a.y - lastY);
    deltaZ = Math.abs(a.z - lastZ);

    if (deltaX + deltaY + deltaZ > 3) {
        moveCounter++;
    } else {
        moveCounter = Math.max(0, --moveCounter);
    }

    if (deltaX != 0 || deltaY != 0 || deltaZ != 0) console.log(deltaX, deltaY, deltaZ, moveCounter);

    if (moveCounter > 1) {
        shakes++;
        moveCounter = 0;
    }

    lastX = a.x;
    lastY = a.y;
    lastZ = a.z;
}

$(document).on("ready", function() {
    app.router = new app.routers.AppRouter();
    app.utils.templates.load(["LoginView", "HomeView", "RegisterView", "MessagesView", "ActivityMonitorView", "VotingView"],
        function() {
            app.router = new app.routers.AppRouter();
            Backbone.history.start();
        });
});
