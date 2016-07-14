class NoteSynth {
  constructor() {
    this.piano = Synth.createInstrument('piano');
  }
  
  playInterval(root, interval) {
    
    this.piano.play(root[0], root[1], 2); 
  
    setTimeout(function(){
        this.piano = Synth.createInstrument('piano'); //have to redefine it here for god knows what reason
        this.piano.play(interval[0], interval[1], 2); 
    }, 2000);
    
  }
}

export default NoteSynth;