import React from 'react';
import ReactDOM from 'react-dom';

const SelectSave = (props) => {
  return (
    <div>
      <div> Select a pre-existing song </div>
      <select value={props.selectedSequence} onChange={() => console.log('change registered')}>
        {props.sequences.map((seq, index) => {
          return <option value={seq}>{seq}</option>
        })
        }
       </select>
       <div> New Song Title </div>
       <input type="text" onChange={props.updateSongTitle}/> 
       <button onClick={props.saveSong}> Save Song </button>
     </div>
  )
}

export default SelectSave;