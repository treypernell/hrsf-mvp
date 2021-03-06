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
import synth from '../synth.js';

const ROWS = [0,1,2,3,4,5,6];
const COLS = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
const GRID_CHORDS_INIT = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];

class Sequencer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playToggle: false,
      gridChords: GRID_CHORDS_INIT, 
      scales: Object.keys(Scales),
      scale: 'major',
      rows: ROWS,
      cols: COLS,
      tempo: 1,
      sequences: [],
      selectedSequence: null,
      songTitle: '',
      notesCurrentlyPlayed: [],
      colCurrentlyPlayed: -1,
    };
  }

  saveSong() {
    const { tempo, scale, gridChords, songTitle } = this.state;
    const reqParams = {
      tempo,
      scale,
      gridChords, 
      name: songTitle,
    }
    axios.post('/sequence', reqParams)
    .then((result) => {
      console.log(result);
      this.fetchAllSongs();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  playSequence(){
    let toggled = this.state.playToggle;
    let colNum = 0;
    (function playNote() {
      if (this.state.playToggle === toggled) {
        synth.triggerAttackRelease(this.state.gridChords[colNum], 0.1);
        this.setState({
          notesCurrentlyPlayed: this.state.gridChords[colNum],
          colCurrentlyPlayed: colNum,
        })
        colNum = (colNum + 1) % 16;
        setTimeout(playNote.bind(this), (1000/this.state.tempo));
      }
    }).call(this)
  }

  updateTempo(e) {
    this.setState({
      tempo: e,
    })
  }

  pauseSequence() {
    this.setState({
      playToggle: !this.state.playToggle,
      notesCurrentlyPlayed: [],
      colCurrentlyPlayed: -1,
    })
  }

  updateSongTitle(e) {
    this.setState({
      songTitle: e.target.value,
    })
  }

  updateScale(e) {
    this.setState({
      scale: e.target.value,
    })
  }

  loadExistingSong(e) {
    if (e.target.value === '') {
      return;
    }
    axios.get( `/sequence/${e.target.value}`)
      .then((result) => {
        let { scale, tempo, gridChords } = result.data[0];
        this.setState({
          scale,
          tempo,
        }, () => {
          this.setState({
            gridChords,     
            selectedSequence: result.data[0].name,
          })
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }

  fetchAllSongs() {
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

  componentDidMount() {
    this.fetchAllSongs();
  }

  render() {
    const { 
      rows, 
      cols, 
      scale, 
      scales,
      tempo,
      selectedSequence, 
      sequences, 
      gridChords, 
      notesCurrentlyPlayed, 
      colCurrentlyPlayed } = this.state
    return (
      <div className={`${styles['app-container']}`}>
      <div className={`${styles['app-title']}`}>MySequencer</div>
      <PlayPause 
        playSequence={this.playSequence.bind(this)}
        pauseSequence={this.pauseSequence.bind(this)}/>
      <div className={`${styles['sequence-container']}`}>
        <div className={`${styles['sequence-grid']}`}>
          {
            rows.map((val, row) => {
              return cols.map((val, col) => {
                return (
                  <Square 
                    notesCurrentlyPlayed={notesCurrentlyPlayed}
                    colCurrentlyPlayed={colCurrentlyPlayed}
                    selectedSequence={selectedSequence}
                    gridChords={gridChords}
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
      <div className={`${styles['sidebar-container']}`}>
      <div className={`${styles['options-text']}`}>Options</div>
        <Params 
          updateScale={this.updateScale.bind(this)}
          scale={scale}
          scales={scales}
          updateTempo={this.updateTempo.bind(this)}
          tempo={tempo}/>
      <div className={`${styles['savesong-text']}`}>Save/Select Song</div>
        <SelectSave 
            selectedSequence={selectedSequence} 
            sequences={sequences}
            loadExistingSong={this.loadExistingSong.bind(this)}
            updateSongTitle={this.updateSongTitle.bind(this)}
            saveSong={this.saveSong.bind(this)}/>
      </div>
      </div>
      )
  }
}

export default Sequencer;