import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../styles/SelectSave.css';


const SelectSave = (props) => {
  return (
    <div className={`${styles['selectsave-container']}`}>
       <div className={`${styles['newtitle-text']}`}> New Song Title </div>
       <input className={`${styles['save-text']}`} type="text" onChange={props.updateSongTitle}/> 
       <button onClick={props.saveSong}>Save</button>
      <div className={`${styles['selectsong-text']}`}> Select a pre-existing song </div>
      <select value={props.selectedSequence} onChange={props.loadExistingSong}>
        <option value=''></option>
        {props.sequences.map((seq, index) => {
          return <option value={seq}>{seq}</option>
        })
        }
       </select>
     </div>
  )
}

export default SelectSave;