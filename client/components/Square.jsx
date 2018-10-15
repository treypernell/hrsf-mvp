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
    }
    this.stageNote = this.stageNote.bind(this);
  }

  stageNote() {
    const { row, col, updateSequence, note } = this.props;
    const newClass = this.state.isSelected ? `${styles['unselected']}` : `${styles['selected']}`
    this.setState((prevState) => {
      return {
        isSelected: !prevState.isSelected,
        buttonClass: newClass
      }
    })
    updateSequence(note, col);
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

  componentDidUpdate(prevProps) {
    this.updateScale(prevProps);
  }


  render() {
    return(
      <button 
        className={`${this.state.buttonClass} ${styles['square']}`}
        onClick={this.stageNote}>
        {!this.props.col ? this.props.note : ''}
      </button>
    )
  }
}

export default Square;