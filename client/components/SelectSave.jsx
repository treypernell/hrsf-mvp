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
     </div>
  )
}

export default SelectSave;