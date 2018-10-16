import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../styles/PlayPause.css'

const PlayPause = (props) => {
  return (
    <div className={`${styles['playpause-container']}`}>
      <button className={`${styles['playbutton']}`} onClick={props.playSequence}>Play</button>
      <button className={`${styles['pausebutton']}`} onClick={props.pauseSequence}>Pause</button>
    </div>
  )
}

export default PlayPause;