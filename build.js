(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NoteGeneration = (function () {
  function NoteGeneration() {
    _classCallCheck(this, NoteGeneration);

    this.dictionary = [
    /*00*/["C", 2], ["C#", 2], ["D", 2], ["D#", 2], ["E", 2], ["F", 2], ["F#", 2], ["G", 2], ["G#", 2], ["A", 2], ["A#", 2], ["B", 2],
    /*12*/["C", 3], ["C#", 3], ["D", 3], ["D#", 3], ["E", 3], ["F", 3], ["F#", 3], ["G", 3], ["G#", 3], ["A", 3], ["A#", 3], ["B", 3],
    /*24*/["C", 4], ["C#", 4], ["D", 4], ["D#", 4], ["E", 4], ["F", 4], ["F#", 4], ["G", 4], ["G#", 4], ["A", 4], ["A#", 4], ["B", 4],
    /*36*/["C", 5], ["C#", 5], ["D", 5], ["D#", 5], ["E", 5], ["F", 5], ["F#", 5], ["G", 5], ["G#", 5], ["A", 5], ["A#", 5], ["B", 5],
    /*48*/["C", 6], ["C#", 6], ["D", 6], ["D#", 6], ["E", 6], ["F", 6], ["F#", 6], ["G", 6], ["G#", 6], ["A", 6], ["A#", 6], ["B", 6], ["C", 7]];

    this.intervals = ["perfect unison", "minor second", "major second", "minor third", "major third", "perfect fourth", "diminished fifth", "perfect fifth", "minor sixth", "major sixth", "minor seventh", "major seventh", "octave"];
  }

  NoteGeneration.prototype.randomInterval = function randomInterval() {
    //interval always higher
    var root = this.getRandomNumber(0, 48); //get random note
    var interval = this.getRandomNumber(0, 12); //get random interval, 13 possibilities from unison to octave

    return [this.dictionary[root], this.dictionary[root + interval], //gets the higher note from array
    this.intervals[interval] //string with the name of the interval
    ];
  };

  NoteGeneration.prototype.getRandomNumber = function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  return NoteGeneration;
})();

exports["default"] = NoteGeneration;
module.exports = exports["default"];

},{}],2:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var NoteSynth = (function () {
  function NoteSynth() {
    _classCallCheck(this, NoteSynth);

    this.piano = Synth.createInstrument('piano');
  }

  NoteSynth.prototype.playInterval = function playInterval(root, interval) {

    this.piano.play(root[0], root[1], 2);

    setTimeout(function () {
      this.piano = Synth.createInstrument('piano'); //have to redefine it here for god knows what reason
      this.piano.play(interval[0], interval[1], 2);
    }, 2000);
  };

  return NoteSynth;
})();

exports['default'] = NoteSynth;
module.exports = exports['default'];

},{}],3:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _NoteGeneration = require('./NoteGeneration');

var _NoteGeneration2 = _interopRequireDefault(_NoteGeneration);

var _NoteSynth = require('./NoteSynth');

var _NoteSynth2 = _interopRequireDefault(_NoteSynth);

var nG = new _NoteGeneration2['default']();

var interval = nG.randomInterval();
console.log(interval[2]);

var nS = new _NoteSynth2['default']();

nS.playInterval(interval[0], interval[1]);

$(document).ready(function () {
  $(".test-option").click(function () {
    var clickedButton = $(this).attr("interval");
    console.log(clickedButton);

    if (clickedButton == interval[2]) {
      $(".buttons-container").hide();
      $(".result").html("Correct! it's a " + clickedButton);
      $(".interval").html(interval[0][0] + String(interval[0][1]) + " > " + interval[1][0] + String(interval[1][1]));
    } else {
      $(".result").html("Wrong! :(");
    }
  });

  $(".play-again").click(function () {
    nS.playInterval(interval[0], interval[1]);
  });

  $(".play-another").click(function () {
    interval = nG.randomInterval();
    nS.playInterval(interval[0], interval[1]);
    $(".buttons-container").show();
  });
});

},{"./NoteGeneration":1,"./NoteSynth":2}]},{},[3]);
