"use strict";

var Events = (function() {
  var STATE = {
    RESET: 0,
    PLAYING: 1,
    PAUSED: 2
  } 

  var cur_state = STATE.RESET;

  var counter = 0;
  var start_time;

  var start_stop = function() { 
    switch (cur_state)
    {
      case STATE.RESET:
        start_time = Date.now();
        counter = window.setInterval(tick, 10);
        Elements.start_stop_button.innerText = "Stop";
        cur_state = STATE.PLAYING;
      break;

      case STATE.PLAYING:
        window.clearInterval(counter);
        Elements.start_stop_button.innerText = "Start";
        cur_state = STATE.PAUSED;
      break;

      case STATE.PAUSED:
        console.log("State: Paused");
      break;
      
      default:
      break;

    }


  };

  var tick = function() {
    var delta = Date.now() - start_time; 
    var ms = parseInt((delta % 1e3))
    var seconds = parseInt(delta / 1e3);
    var minutes = parseInt(seconds / 60);
    var hours = parseInt(minutes / 60);

    Elements.display.innerText = minutes%60 + ":" + seconds%60 + ":" + ms%60;
  };

  var reset = function () {
    Elements.display.innerText = "00:00:00";
    cur_state = STATE.RESET;

  };


  return {
    start_stop: start_stop,
    reset: reset,
  };

 })();


var Elements = (function() {
  var start_stop_button = document.getElementById("start_stop_button");
  start_stop_button.addEventListener("click", Events.start_stop);

  var reset_button = document.getElementById("reset_button");
  reset_button.addEventListener("click", Events.reset);

  var display = document.getElementById("display");
  return {
    start_stop_button: start_stop_button,
    reset_button: reset_button,
    display: display
  };
})();

