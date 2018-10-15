import React from 'react';
import ReactDOM from 'react-dom';
import Slider, { Range } from 'rc-slider';

const Params = (props) => {
  return (
    <div>
      <div>Pick a scale:</div>
        <select value={props.scale} onChange={props.updateScale}>
          {props.scales.map((scale, index) => {
            return <option value={scale}>{scale}</option>
          })
          }
        </select>
      <div> Select a tempo: </div>
      <Slider min={1} max={20} onChange={props.changeTempo}/>
    </div>
  )
}




export default Params;

//updateScale
//scale
//scales
//changeTempo

