import NoteGeneration from './NoteGeneration'
import NoteSynth from './NoteSynth'

let nG = new NoteGeneration();

let interval = nG.randomInterval();
console.log(interval[2]);

let nS = new NoteSynth();

nS.playInterval(interval[0], interval[1]);

$(document).ready(function(){
  $(".test-option").click(function(){
    let clickedButton = $(this).attr("interval");
    console.log(clickedButton);
    
    if(clickedButton == interval[2]) {
      $(".buttons-container").hide();
      $(".result").html("Correct! it's a " + clickedButton);
      $(".interval").html(interval[0][0] + String(interval[0][1]) + " > " + interval[1][0] + String(interval[1][1]))
    }
    else {
      $(".result").html("Wrong! :(");
    }
    
  });
  
  $(".play-again").click(function(){
    nS.playInterval(interval[0], interval[1]);
  })
  
  $(".play-another").click(function(){
    interval = nG.randomInterval();
    nS.playInterval(interval[0], interval[1]);
    $(".buttons-container").show();
    
  }) 
    
  
  
  
})