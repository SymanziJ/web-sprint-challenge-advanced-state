import React from 'react'
import { connect } from 'react-redux';
import * as actions from '../state/action-creators'

function Wheel(props) {

  const { activeCog } = props;

  const handleClockwise = () => {
    const { moveClockwise } = props;
    moveClockwise();
  }

  const handleCounterClockwise = () => {
    const { moveCounterClockwise } = props;
    moveCounterClockwise();
  }

  return (
    <div id="wrapper">
      <div id="wheel">
        {
          [0,1,2,3,4,5].map((cog) => {
            return (
              <div 
                className={`cog${cog === activeCog ? ' active' : ''}`}
                style={{ "--i": cog }}
                key={cog}
              >
                {cog === activeCog ? "B" : null}
              </div>
            )
          })
        }
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={handleCounterClockwise}>Counter clockwise</button>
        <button id="clockwiseBtn" onClick={handleClockwise}>Clockwise</button>
      </div>
    </div>
  )
}

export default connect(st => st, actions)(Wheel);