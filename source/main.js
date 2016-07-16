import NoteGeneration from './NoteGeneration'
import NoteSynth from './NoteSynth'
import NoteDisplay from './NoteDisplay'

let nG = new NoteGeneration();
let interval = nG.randomInterval();

let nS = new NoteSynth();
let nD = new NoteDisplay();

let wrongAnswers = 0;
let correctAnswers = 0;

nS.playInterval(interval[0], interval[1]);

$(document).ready(function(){
  nD.make(interval[0]);
  $(".correct-answer-counter").html(correctAnswers);
  $(".wrong-answer-counter").html(wrongAnswers);
  
  $(".test-option").click(function(){
    let clickedButton = $(this).attr("interval");
    console.log(clickedButton);
    
    if(clickedButton == interval[2]) {
      
      var aAn = "a "; //it needs to be "an" octave not "a" octave
      if (interval[2] == "octave") { aAn = "an " } 
      
      $(".result").html("Correct! The interval is " + aAn + clickedButton + ".").removeClass("wrong").addClass("correct");
      $(".interval").html("<b>" + interval[0][0] + String(interval[0][1]) + "</b> " + "  >>  " + " <b>" + interval[1][0] + String(interval[1][1]) + "</b>")
      
      nD.make(interval[0], interval[1]);//prints interval to sheet
      
      $(".play-another").show();
      $(".buttons-container").hide();
      $(".buttons-container2").hide();
      $(".question").addClass("transparent");
      
      correctAnswers +=1;
      
      
      
    }
    else {
      $(this).addClass("wrong-background");
      $(".result").html("Incorrect Answer!").removeClass("correct").addClass("wrong");
      
      wrongAnswers +=1;
    }
    
    $(".correct-answer-counter").html(correctAnswers);
    $(".wrong-answer-counter").html(wrongAnswers);
    
  });
  
  $(".play-again").click(function(){
    nS.playInterval(interval[0], interval[1]);
  })
  
  $(".play-another").click(function(){
    interval = nG.randomInterval();
    nD.make(interval[0]);
    nS.playInterval(interval[0], interval[1]);
    
    $(".test-option").removeClass("wrong-background"); //removes the red background from incorrect answers 
    
    $(".play-another").hide();
    
    if ($(window).width() > 800) { //if window is not in mobile mode, show the desktop buttons container
      $(".buttons-container").show();
    }
    else {
      $(".buttons-container2").show(); //else show the mobile one
    }
    
    $(".question").removeClass("transparent")
    
    $(".result").html(" ");
    $(".interval").html(" ")
    
  })
  


  
})

