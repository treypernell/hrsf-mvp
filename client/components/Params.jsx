import React from 'react';
import ReactDOM from 'react-dom';
import Slider, { Range } from 'rc-slider';
import styles from '../styles/Params.css';


const Params = (props) => {
  return (
    <div className={`${styles['params-container']}`}>
      <div className={`${styles['scalechoice-text']}`}>Pick a scale:</div>
        <select value={props.scale} onChange={props.updateScale}>
          {props.scales.map((scale, index) => {
            return <option value={scale}>{scale}</option>
          })
          }
        </select>
      <div className={`${styles['tempochoice-text']}`}> Select a tempo: </div>
      <div className={`${styles['slow-text']}`}>(slow)</div>
      <div className={`${styles['fast-text']}`}>(fast)</div>
      <Slider min={1} max={15} value={props.tempo} onChange={props.updateTempo}/>
    </div>
  )
}




export default Params;

//updateScale
//scale
//scales
//changeTempo

