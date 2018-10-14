import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../styles/Square.css';
import 'rc-slider/assets/index.css';

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      isSelected: false,
      currentNote: this.props.note,
      buttonClass: `${styles['unselected']}`,
    }
  }

  stageNote() {
    const { row, col, updateSequence } = this.props;
    const { currentNote } = this.state;
    const newClass = this.state.isSelected ? `${styles['unselected']}` : `${styles['selected']}`
    this.setState((prevState) => {
      return {
        isSelected: !prevState.isSelected,
        buttonClass: newClass
      }
    })
    updateSequence(currentNote, col);
  }

  setClass() {
    this.state.isSelected ? 
    `${styles['selected']}` :
    `${styles['unselected']}`
  }

  render() {
    return(
      <button 
        className={`${this.state.buttonClass} ${styles['square']}`}
        onClick={this.stageNote.bind(this)}>
        {!this.props.col ? this.state.currentNote : ''}
      </button>
    )
  }
}

export default Square;