import React from 'react';
import ReactDOM from 'react-dom';
import Tone from 'tone';
import styles from '../styles/Sequencer.css';
import Square from './Square.jsx';
import Scales from '../scales.js';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

var tremolo = new Tone.Tremolo().start();

var synth = new Tone.PolySynth({
    "oscillator" : {
        "type" : "sine",
        "modulationFrequency" : 0.2
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
      notes: ["C4","D4","E4","F4","G4"],
      playToggle: false,
      gridChords: [[],[],[],[],[],[],[],[],[],[],[],[]], //a rotated version of the grid with notes for easy chord reading...
      scales: ['major', 'minor'], //a scale for determining which notes can be chosen. 
      scale: 'major',
      rows: [1,2,3,4,5,6,7],
      cols: [1,2,3,4,5,6,7,8,9,10,11,12],
      tempo: 1,
    };
  }
  
  playSequence(){
    let toggled = this.state.playToggle;
    let colNum = 0;
    (function playNote() {
      if (this.state.playToggle === toggled) {
        synth.triggerAttackRelease(this.state.gridChords[colNum], "8n");
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
    console.log('Updated ', e.target.value);
    this.setState({
      scale: e.target.value,
    })
  }

  updateSequence(currentNote, col) {
    this.setState((prevState) => {
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
    console.log('Changing Tempo ', e);
    this.setState({
      tempo: e,
    })
  }

  render() {
    const { rows, cols, scale } = this.state
    this.state
    return (
      <div>
      <button onClick={this.playSequence.bind(this)}>PLAY</button>
      <button onClick={this.pauseSequence.bind(this)}>STOP</button>
      <div className={`${styles['sequence-grid']}`}>
        {
          this.state.rows.map((val, row) => {
            return this.state.cols.map((val, col) => {
              return (
               <div className={`${styles['square-container']}`}>
                <Square 
                  row={row} 
                  col={col} 
                  updateSequence={this.updateSequence.bind(this)}
                  note={Scales[scale][row]}/>
               </div>
              )
            })
          })
        }
      </div>
        <select value={this.state.scale} onChange={this.updateScale.bind(this)}>
          <option value="major">Major</option>
          <option value="minor">Minor</option>
        </select>
      <Slider min={1} max={20} onChange={this.changeTempo.bind(this)}/>
      </div>)
  }
}

export default Sequencer;