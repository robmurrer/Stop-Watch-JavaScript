"use strict";
var Stopwatch = (function() {
  var STATE = {
    STOPPED: 0,
    RUNNING: 1,
  } 

  var Model = (function() {
    // Private
    var state = STATE.STOPPED;
    var delta = 0.0; 
    var prev_delta = 0.0; 
    var counter = 0;
    var start_time;

    var tick = function() {
      delta = performance.now() - start_time + prev_delta;
      View.Update();
    };

    // public API
    var Start = function() {
      start_time = performance.now();
      counter = window.setInterval(tick, 10);
      state = STATE.RUNNING;
      View.Update();
    };

    var Stop = function() {
        window.clearInterval(counter);
        prev_delta = delta;
        state = STATE.STOPPED;
        View.Update();
    };

    var Reset = function () {
      Model.Stop();
      delta = 0.0;
      prev_delta = 0.0;
      View.Update();
    };

    var GetState = function () { return state; };
    var GetDelta = function () { return delta; };

    return {
      Start: Start,
      Stop: Stop,
      Reset: Reset,
      GetState: GetState,
      GetDelta: GetDelta,
    };

  })();

  var Start_Stop_Click = function() { 
    switch (Model.GetState())
    {
      case STATE.STOPPED:
        Model.Start(); 
      break;

      case STATE.RUNNING:
        Model.Stop();
      break;

      default:
      break;
    }

  };

  var Reset_Click = function() {
    Model.Reset();
  }

  var View = (function() {
    var start_text = "Start";
    var stop_text = "Stop";
    var reset_text = "Reset";
    var display_text = "00:00:00";
    var container = document.getElementById("stopwatch");

    var parse_delta = function(delta) {
      var ms = parseInt(delta) 
      var seconds = parseInt(delta / 1e3);
      var minutes = parseInt(seconds / 60);
      var hours = parseInt(minutes / 60);
      
      var d_minutes = minutes%60; 
      var d_seconds = seconds%60; 

      return (d_minutes < 10 ? "0" : "") + d_minutes + 
              ":" + (d_seconds < 10 ? "0" : "") + d_seconds + 
              ":" + ms;
    };

    var display = document.createElement("div");
    display.id = "display";
    display.innerText = display_text;
    container.appendChild(display);

    var start_stop_button = document.createElement("button");
    start_stop_button.id = "start_stop_button";
    start_stop_button.innerText = start_text;
    start_stop_button.addEventListener("click", Start_Stop_Click);
    container.appendChild(start_stop_button);

    var reset_button = document.createElement("button");
    reset_button.id = "reset_button";
    reset_button.innerText = reset_text;
    reset_button.addEventListener("click", Reset_Click);
    container.appendChild(reset_button);

    // public API
    var Update = function(model) {
      switch (Model.GetState())
      {
        case STATE.STOPPED:
          start_stop_button.innerText = start_text;
        break;

        case STATE.RUNNING:
          start_stop_button.innerText = stop_text;
        break;

        default:
        break;
      }

      display.innerText = parse_delta(Model.GetDelta());
    }

    return {
      Update: Update,
    };

  })();
})();



