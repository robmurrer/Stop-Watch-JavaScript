"use strict";

var Stopwatch = (function() {

  var STATE = {
    STOPPED: 0,
    RUNNING: 1,
  } 

  var Model = (function () {
    var state = STATE.STOPPED;
    var delta = 0.0; 
    var prev_delta = 0.0; 
    var counter = 0;
    var start_time;

    // private
    var CalcDelta = function() { 
      return Date.now() - start_time + prev_delta;
    };

    var tick = function() {
      delta = CalcDelta(); 
      View.display.innerText = parse_delta(delta);
    };

    var parse_delta = function(delta) {
      var ms = parseInt((delta % 1e3))
      var seconds = parseInt(delta / 1e3);
      var minutes = parseInt(seconds / 60);
      var hours = parseInt(minutes / 60);

      return minutes%60 + ":" + seconds%60 + ":" + ms%60;
    };


    //public api
    var GetState = function() { return state; };
    var Start = function() {
      start_time = Date.now();
      counter = window.setInterval(tick, 10);
      View.start_stop_button.innerText = "Stop";
      state = STATE.RUNNING;
    };

    var Stop = function() {
        window.clearInterval(counter);
        View.start_stop_button.innerText = "Start";
        state = STATE.STOPPED;
    };

    var Reset = function () {
      View.display.innerText = parse_delta(0);
      state = STATE.STOPPED;
    };

    return {
      Start: Start, 
      Stop: Stop,
      Reset: Reset,
      GetState: GetState,
    }

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

  var Reset_Click = function() 
  {
    Model.Reset();
  };


  var View = (function() {
    var reset_text = "Reset";
    var start_text = "Start";
    var stop_text = "Stop";

    var stopwatch = document.getElementById("stopwatch");

    var display = document.createElement("div");
    display.id = "display";
    stopwatch.appendChild(display)

    var start_stop_button = document.createElement("button");
    start_stop_button.id = "start_stop";
    start_stop_button.innerText = start_text;
    start_stop_button.addEventListener("click", Start_Stop_Click);
    stopwatch.appendChild(start_stop_button);

    var reset_button = document.createElement("button");
    reset_button.id = "reset";
    reset_button.innerText = reset_text; 
    reset_button.addEventListener("click", Reset_Click); 
    stopwatch.appendChild(reset_button);

    return {
      start_stop_button: start_stop_button,
      reset_button: reset_button,
      display: display
    };
  })();


})();