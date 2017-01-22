class NoteDisplay {
  constructor(){
    this.clef;
    this.note1;
    this.note2;
    
  }
  
  make(root, interval) { //this is very messy but seems to work
  
    this.note1 = this.convertNote(root); //converts notes to syntax applicable to VexFlow
    
    if (interval != undefined) { //if inteveral is provided
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
    
    
    if (this.note1[1] == true) { //checks each note to see if it needs to be sharpened
      this.notes[0].addAccidental(0, new this.VF.Accidental("#"));
    }
    

    
    let numberOfNotes = 2; //need to specify the number of notes, if an interval is not provided it will only display one note
    if (interval == undefined) { numberOfNotes = 1 }
    
   
    this.voice = new this.VF.Voice({num_beats: numberOfNotes,  beat_value: 2});
    this.voice.addTickables(this.notes);
    
    this.formatter = new this.VF.Formatter().joinVoices([this.voice]).format([this.voice], 200);// Format and justify the notes to 400 pixels.
    this.voice.draw(this.context, this.stave);
  }
  
  convertNote(note) { //converts the ["c#", 3] to ["c/3", true] true being sharp or not
  
    let newNote = note[0].substring(0,1) + "/" + String(note[1]); //should get the first letter of the nnote
    let sharp;
    
    if (note[0].length > 1) { sharp = true; } else { sharp = false; }
    
    return [newNote, sharp];

  }
  
  findClef(note){ //finds which clef to display the notes with
    
    if(note[1] > 3) {
      return "treble";
    }
    else {
      return "bass";
    }
    
  }
  
  removeStave() {
    $("#stave").html("");
  } 


}

export default NoteDisplay;
