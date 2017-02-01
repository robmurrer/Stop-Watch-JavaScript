"use strict";

var Events = (function() {
  var STATE = {
    RESET: 0,
    PLAYING: 1,
    PAUSED: 2
  } 

  var cur_state = STATE.RESET;
  var prev_delta = 0.0; 

  var counter = 0;
  var start_time;

  var start_tick = function() {
    start_time = Date.now();
    counter = window.setInterval(tick, 10);
    Elements.start_stop_button.innerText = "Stop";
    cur_state = STATE.PLAYING;
  };

  var pause = function(prev_delta) {
      window.clearInterval(counter);
      Elements.start_stop_button.innerText = "Start";
      cur_state = STATE.PAUSED;
  };

  var start_stop = function() { 
    switch (cur_state)
    {
      case STATE.RESET:
        start_tick();
      break;

      case STATE.PLAYING:
        pause(Date.now() - start_time + prev_delta);
      break;

      case STATE.PAUSED:
        start_tick();
      break;
      
      default:
      break;

    }


  };

  var parse_delta = function(delta) {
    var ms = parseInt((delta % 1e3))
    var seconds = parseInt(delta / 1e3);
    var minutes = parseInt(seconds / 60);
    var hours = parseInt(minutes / 60);

    return minutes%60 + ":" + seconds%60 + ":" + ms%60;
  }

  var tick = function() {
    var delta = Date.now() - start_time + prev_delta;
    Elements.display.innerText = parse_delta(delta);
  };

  var reset = function () {
    Elements.display.innerText = parse_delta(0);
    pause(0);
    cur_state = STATE.RESET;
  };


  return {
    start_stop: start_stop,
    reset: reset,
  };

 })();


var Elements = (function() {
  var start_text = "Start";
  var stop_text = "Stop";
  var reset_text = "Reset";
  var display_text = "00:00:00";

  var container = document.getElementById("stopwatch");

  var display = document.createElement("div");
  display.id = "display";
  display.innerText = display_text;
  container.appendChild(display);

  var start_stop_button = document.createElement("button");
  start_stop_button.id = "start_stop_button";
  start_stop_button.innerText = start_text;
  start_stop_button.addEventListener("click", Events.start_stop);
  container.appendChild(start_stop_button);

  var reset_button = document.createElement("button");
  reset_button.id = "reset_button";
  reset_button.innerText = reset_text;
  reset_button.addEventListener("click", Events.reset);
  container.appendChild(reset_button);


  return {
    start_stop_button: start_stop_button,
    reset_button: reset_button,
    display: display
  };
})();

