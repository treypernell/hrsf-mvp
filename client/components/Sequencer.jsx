import React from 'react';
import ReactDOM from 'react-dom';
import Tone from 'tone';
import styles from '../styles/Sequencer.css';
import axios from 'axios';

import PlayPause from './PlayPause.jsx';
import Params from './Params.jsx';
import Square from './Square.jsx';
import Scrubber from './Scrubber.jsx'
import SelectSave from './SelectSave.jsx'
import Scales from '../scales.js';

var tremolo = new Tone.Tremolo().start();
var synth = new Tone.PolySynth({
    "oscillator" : {
        "type" : "pwm",
        "modulationFrequency" : 0.8
    },
    "envelope" : {
        "attack" : 0.02,
        "decay" : 0.1,
        "sustain" : 0.2,
        "release" : 0.9,
    }
}).chain(tremolo, Tone.Master);

class Sequencer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playToggle: false,
      gridChords: [[],[],[],[],[],[],[],[],[],[],[],[]], //a rotated version of the grid with notes for easy chord reading...
      scales: Object.keys(Scales), //a scale for determining which notes can be chosen. 
      scale: 'major',
      rows: [1,2,3,4,5,6,7],
      cols: [1,2,3,4,5,6,7,8,9,10,11,12],
      tempo: 1,
      sequences: [],
      selectedSequence: null,
    };
  }

  playSequence(){
    let toggled = this.state.playToggle;
    let colNum = 0;
    (function playNote() {
      if (this.state.playToggle === toggled) {
        synth.triggerAttackRelease(this.state.gridChords[colNum], 0.1);
        colNum = (colNum + 1) % 12
        setTimeout(playNote.bind(this), (1000/this.state.tempo));
      }
    }).call(this)
  }

  pauseSequence() {
    this.setState({
      playToggle: !this.state.playToggle,
    })
  }

  updateScale(e) {
    this.setState({
      scale: e.target.value,
    })
  }

  componentDidMount() {
    axios.get('/sequence')
    .then((result) => {
      const sequences = result.data.map(seq => seq.name)
      this.setState({
        sequences: sequences,
      })
    })
    .catch((err) => {
      console.log(err);
    })
  }

  updateSequence(currentNote, col, prevNote = null, isKeyChange = false) {
    this.setState((prevState) => {
      if (isKeyChange) {
        let prevNoteIndex = prevState.gridChords[col].indexOf(prevNote);
        prevState.gridChords[col].splice(prevNoteIndex, 1)
      }
      let noteIndex = prevState.gridChords[col].indexOf(currentNote);
      if (noteIndex < 0) {
        prevState.gridChords[col].push(currentNote);
      } else {
        prevState.gridChords[col].splice(noteIndex, 1);
      }
      return {
        gridChords: prevState.gridChords
      }
    })
  }

  changeTempo(e) {
    this.setState({
      tempo: e,
    })
  }

  render() {
    const { rows, cols, scale, scales, selectedSequence, sequences } = this.state
    this.state
    return (
      <div>
      <PlayPause 
        playSequence={this.playSequence.bind(this)}
        pauseSequence={this.pauseSequence.bind(this)}/>
      <div className='sequence-container'>
        <Scrubber />
        <div className={`${styles['sequence-grid']}`}>
          {
            rows.map((val, row) => {
              return cols.map((val, col) => {
                return (
                  <Square 
                    row={row} 
                    col={col} 
                    updateSequence={this.updateSequence.bind(this)}
                    note={Scales[scale][row]}/>
                )
              })
            })
          }
        </div>
      </div>
      <Params 
        updateScale={this.updateScale.bind(this)}
        scale={scale}
        scales={scales}
        changeTempo={this.changeTempo.bind(this)}/>
      <SelectSave 
          selectedSequence={selectedSequence} 
          sequences={sequences}/>
      </div>
      )
  }
}

export default Sequencer;



/*
  TODO: 
    - Refactor code for clarity - extract
      logic from sequence functions and put in
      helper functions file
    - Create button allowing for persistence of
      current configuration.
    - Load a given configuration from a selected file **TIME INTENSIVE**
    - Have buttons highlight when 'played' by the synth **TIME INTENSIVE**

*/