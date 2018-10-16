import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../styles/Square.css';
import 'rc-slider/assets/index.css';

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      isSelected: false,
      buttonClass: `${styles['unselected']}`,
      playNoteClass:  '',
    }
    this.stageNote = this.stageNote.bind(this);
  }

  stageNote(e, newSequenceStaging = false) {
    const { row, col, updateSequence, note } = this.props;
    const newClass = this.state.isSelected ? `${styles['unselected']}` : `${styles['selected']}`    
    this.setState((prevState) => {
      return {
        isSelected: !prevState.isSelected,
        buttonClass: newClass
      }
    })
    if(!newSequenceStaging) {
      updateSequence(note, col);
    }
  }

  setClass() {
    this.state.isSelected ? 
    `${styles['selected']}` :
    `${styles['unselected']}`
  }

  updateScale(prevProps) {
    const { note, col, updateSequence } = this.props;
    const { isSelected } = this.state;
    if (note !== prevProps.note && isSelected) {
      updateSequence(note, col, prevProps.note, true)
    }
  }

  toggleNotePlayedColor() {
    const { col, row, colCurrentlyPlayed, gridChords, note} = this.props;
    const { playNoteClass } = this.state;
    if (col === colCurrentlyPlayed && 
        playNoteClass === '' &&
        gridChords[col].indexOf(note) >= 0) {
      this.setState({
        playNoteClass: `${styles['note-played']}`
      })
    setTimeout(() => {
      this.setState({
        playNoteClass: '',
      })
    }, 1000)
    }
  }

  updateWithNewSequence(prevProps) {
    const { selectedSequence, gridChords, row, col, note, updateSequence } = this.props;
    const { isSelected } = this.state;
    if (selectedSequence !== prevProps.selectedSequence) {
      let inSequence = gridChords[col].indexOf(note) >= 0;
      if (inSequence && !isSelected) {
        this.stageNote(null, true);
      } else if (!inSequence && isSelected) {
        this.stageNote(null, true)
      }
    }
  }

  componentDidUpdate(prevProps) {
    this.updateScale(prevProps);
    this.updateWithNewSequence(prevProps);
    this.toggleNotePlayedColor()
  }


  render() {
    return(
        <div className={`${styles['square-container']}`}>
          <button 
            className={`${this.state.buttonClass} ${this.state.playNoteClass} ${styles['square']}`}
            onClick={this.stageNote}>
            {!this.props.col ? this.props.note : ''}
          </button>
        </div>
    )
  }
}

export default Square;