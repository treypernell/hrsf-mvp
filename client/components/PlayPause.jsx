import React from 'react';
import ReactDOM from 'react-dom';

const PlayPause = (props) => {
  return (
    <div>
      <button onClick={props.playSequence}>Play</button>
      <button onClick={props.pauseSequence}>Pause</button>
    </div>
  )
}

export default PlayPause;