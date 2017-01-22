class NoteGeneration {
  constructor(){
    this.__dictionary = [
                      /*00*/["C", 2], ["C#", 2], ["D", 2], ["D#", 2], ["E", 2], ["F", 2], ["F#", 2], ["G", 2], ["G#", 2], ["A", 2], ["A#", 2], ["B", 2],
                      /*12*/["C", 3], ["C#", 3], ["D", 3], ["D#", 3], ["E", 3], ["F", 3], ["F#", 3], ["G", 3], ["G#", 3], ["A", 3], ["A#", 3], ["B", 3],
                      /*24*/["C", 4], ["C#", 4], ["D", 4], ["D#", 4], ["E", 4], ["F", 4], ["F#", 4], ["G", 4], ["G#", 4], ["A", 4], ["A#", 4], ["B", 4],
                      /*36*/["C", 5], ["C#", 5], ["D", 5], ["D#", 5], ["E", 5], ["F", 5], ["F#", 5], ["G", 5], ["G#", 5], ["A", 5], ["A#", 5], ["B", 5],
                      /*48*/["C", 6], ["C#", 6], ["D", 6], ["D#", 6], ["E", 6], ["F", 6], ["F#", 6], ["G", 6], ["G#", 6], ["A", 6], ["A#", 6], ["B", 6],
                            ["C", 7]];

    this.__intervals = ["perfect unison",
                      "minor second",
                      "major second",
                      "minor third",
                      "major third",
                      "perfect fourth",
                      "diminished fifth",
                      "perfect fifth",
                      "minor sixth",
                      "major sixth",
                      "minor seventh",
                      "major seventh",
                      "octave"];

  }

  randomInterval(){ //interval always higher
    let root = this.__getRandomNumber(0, 48); //get random note
    let interval = this.__getRandomNumber(0,12); //get random interval, 13 possibilities from unison to octave


    return [this.__dictionary[root],
            this.__dictionary[root + interval], //gets the higher note from array
            this.__intervals[interval] //string with the name of the interval
            ];
  }


  private

  __getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }




}

export default NoteGeneration;
