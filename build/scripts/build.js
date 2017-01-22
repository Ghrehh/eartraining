(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NoteDisplay = (function () {
  function NoteDisplay() {
    _classCallCheck(this, NoteDisplay);

    this.clef;
    this.note1;
    this.note2;
  }

  NoteDisplay.prototype.make = function make(root, interval) {
    //this is very messy but seems to work

    this.note1 = this.convertNote(root); //converts notes to syntax applicable to VexFlow

    if (interval != undefined) {
      //if inteveral is provided
      this.note2 = this.convertNote(interval);
    }

    this.clef = this.findClef(root); //finds the clef using the original root note

    this.removeStave(); //removes current stave before creating new one

    this.VF = Vex.Flow;
    this.canvas = document.getElementById("stave"); // Create an SVG renderer and attach it to the DIV element named "stave".

    this.renderer = new this.VF.Renderer(this.canvas, this.VF.Renderer.Backends.SVG);
    this.renderer.resize(220, 150);

    this.context = this.renderer.getContext(); // Configure the rendering context.
    this.context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");

    this.stave = new this.VF.Stave(10, 30, 200); // Create a stave of width 400 at position 10, 40 on the canvas.]

    this.stave.addClef(this.clef); // Add a clef and time signature.
    this.stave.setContext(this.context).draw(); // Connect it to the rendering context and draw!

    this.notes = [];

    this.notes.push(new this.VF.StaveNote({ clef: this.clef, keys: [this.note1[0]], duration: "h" }));

    if (interval != undefined) {
      this.notes.push(new this.VF.StaveNote({ clef: this.clef, keys: [this.note2[0]], duration: "h" }));

      if (this.note2[1] == true) {
        this.notes[1].addAccidental(0, new this.VF.Accidental("#"));
      }
    }

    if (this.note1[1] == true) {
      //checks each note to see if it needs to be sharpened
      this.notes[0].addAccidental(0, new this.VF.Accidental("#"));
    }

    var numberOfNotes = 2; //need to specify the number of notes, if an interval is not provided it will only display one note
    if (interval == undefined) {
      numberOfNotes = 1;
    }

    this.voice = new this.VF.Voice({ num_beats: numberOfNotes, beat_value: 2 });
    this.voice.addTickables(this.notes);

    this.formatter = new this.VF.Formatter().joinVoices([this.voice]).format([this.voice], 200); // Format and justify the notes to 400 pixels.
    this.voice.draw(this.context, this.stave);
  };

  NoteDisplay.prototype.convertNote = function convertNote(note) {
    //converts the ["c#", 3] to ["c/3", true] true being sharp or not

    var newNote = note[0].substring(0, 1) + "/" + String(note[1]); //should get the first letter of the nnote
    var sharp = undefined;

    if (note[0].length > 1) {
      sharp = true;
    } else {
      sharp = false;
    }

    return [newNote, sharp];
  };

  NoteDisplay.prototype.findClef = function findClef(note) {
    //finds which clef to display the notes with

    if (note[1] > 3) {
      return "treble";
    } else {
      return "bass";
    }
  };

  NoteDisplay.prototype.removeStave = function removeStave() {
    $("#stave").html("");
  };

  return NoteDisplay;
})();

exports["default"] = NoteDisplay;
module.exports = exports["default"];

},{}],2:[function(require,module,exports){
"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NoteGeneration = (function () {
  function NoteGeneration() {
    _classCallCheck(this, NoteGeneration);

    this.__dictionary = [
    /*00*/["C", 2], ["C#", 2], ["D", 2], ["D#", 2], ["E", 2], ["F", 2], ["F#", 2], ["G", 2], ["G#", 2], ["A", 2], ["A#", 2], ["B", 2],
    /*12*/["C", 3], ["C#", 3], ["D", 3], ["D#", 3], ["E", 3], ["F", 3], ["F#", 3], ["G", 3], ["G#", 3], ["A", 3], ["A#", 3], ["B", 3],
    /*24*/["C", 4], ["C#", 4], ["D", 4], ["D#", 4], ["E", 4], ["F", 4], ["F#", 4], ["G", 4], ["G#", 4], ["A", 4], ["A#", 4], ["B", 4],
    /*36*/["C", 5], ["C#", 5], ["D", 5], ["D#", 5], ["E", 5], ["F", 5], ["F#", 5], ["G", 5], ["G#", 5], ["A", 5], ["A#", 5], ["B", 5],
    /*48*/["C", 6], ["C#", 6], ["D", 6], ["D#", 6], ["E", 6], ["F", 6], ["F#", 6], ["G", 6], ["G#", 6], ["A", 6], ["A#", 6], ["B", 6], ["C", 7]];

    this.__intervals = ["perfect unison", "minor second", "major second", "minor third", "major third", "perfect fourth", "diminished fifth", "perfect fifth", "minor sixth", "major sixth", "minor seventh", "major seventh", "octave"];
  }

  NoteGeneration.prototype.randomInterval = function randomInterval() {
    //interval always higher
    var root = this.__getRandomNumber(0, 48); //get random note
    var interval = this.__getRandomNumber(0, 12); //get random interval, 13 possibilities from unison to octave

    return [this.__dictionary[root], this.__dictionary[root + interval], //gets the higher note from array
    this.__intervals[interval] //string with the name of the interval
    ];
  };

  NoteGeneration.prototype.__getRandomNumber = function __getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  return NoteGeneration;
})();

exports["default"] = NoteGeneration;
module.exports = exports["default"];

},{}],3:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var NoteSynth = (function () {
  function NoteSynth() {
    _classCallCheck(this, NoteSynth);

    this.piano = Synth.createInstrument('piano');
  }

  NoteSynth.prototype.playInterval = function playInterval(root, interval) {

    this.piano.play(root[0], root[1], 1);

    setTimeout(function () {
      this.piano = Synth.createInstrument('piano'); //have to redefine it here for god knows what reason
      this.piano.play(interval[0], interval[1], 1);
    }, 1000);
  };

  return NoteSynth;
})();

exports['default'] = NoteSynth;
module.exports = exports['default'];

},{}],4:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _NoteGeneration = require('./NoteGeneration');

var _NoteGeneration2 = _interopRequireDefault(_NoteGeneration);

var _NoteSynth = require('./NoteSynth');

var _NoteSynth2 = _interopRequireDefault(_NoteSynth);

var _NoteDisplay = require('./NoteDisplay');

var _NoteDisplay2 = _interopRequireDefault(_NoteDisplay);

var nG = new _NoteGeneration2['default']();
var interval = nG.randomInterval();

var nS = new _NoteSynth2['default']();
var nD = new _NoteDisplay2['default']();

var wrongAnswers = 0;
var correctAnswers = 0;

$(document).ready(function () {
  nD.make(interval[0]);

  $(".begin").click(function () {
    nS.playInterval(interval[0], interval[1]);
    $(".intro-screen").hide();
    $(".test-screen").show();
  });

  $(".correct-answer-counter").html(correctAnswers);
  $(".wrong-answer-counter").html(wrongAnswers);

  $(".test-option").click(function () {
    var clickedButton = $(this).attr("interval");
    console.log(clickedButton);

    if (clickedButton == interval[2]) {

      var aAn = "a "; //it needs to be "an" octave not "a" octave
      if (interval[2] == "octave") {
        aAn = "an ";
      }

      $(".result").html("Correct! The interval is " + aAn + clickedButton + ".").removeClass("wrong").addClass("correct");
      $(".interval").html("<b>" + interval[0][0] + String(interval[0][1]) + "</b> " + "  >>  " + " <b>" + interval[1][0] + String(interval[1][1]) + "</b>");

      nD.make(interval[0], interval[1]); //prints interval to sheet

      $(".play-another").show();
      $(".buttons-container").hide();
      $(".buttons-container2").hide();
      $(".question").addClass("transparent");

      correctAnswers += 1;
    } else {
      $(this).addClass("wrong-background");
      $(".result").html("Incorrect Answer!").removeClass("correct").addClass("wrong");

      wrongAnswers += 1;
    }

    $(".correct-answer-counter").html(correctAnswers);
    $(".wrong-answer-counter").html(wrongAnswers);
  });

  $(".play-again").click(function () {
    nS.playInterval(interval[0], interval[1]);
  });

  $(".play-another").click(function () {
    interval = nG.randomInterval();
    nD.make(interval[0]);
    nS.playInterval(interval[0], interval[1]);

    $(".test-option").removeClass("wrong-background"); //removes the red background from incorrect answers

    $(".play-another").hide();

    if ($(window).width() > 800) {
      //if window is not in mobile mode, show the desktop buttons container
      $(".buttons-container").show();
    } else {
      $(".buttons-container2").show(); //else show the mobile one
    }

    $(".question").removeClass("transparent");

    $(".result").html(" ");
    $(".interval").html(" ");
  });
});

},{"./NoteDisplay":1,"./NoteGeneration":2,"./NoteSynth":3}]},{},[4]);
