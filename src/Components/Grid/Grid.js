import {Context} from '../../Context/Context'
import { useContext } from 'react'
import SquareGrid from './SquareGrid';


function Grid() {
    const ctx = useContext(Context)

  // let gridSide = ctx.sideValue;

  // let squareArr = [];

  // for (let i = 0; i < gridSide ** 2; i++) {
  //   squareArr.push(
  //     <div 
  //       key={i}
  //       className="square" 
  //       style={{ 
  //               border: ctx.displayLines? "solid 1px black" : 'none',
  //               backgroundColor: `${ctx.bkGroundColor}`
  //             }}
  //       onMouseDown={(e) => {ctx.squareMouseDown(e)}}
  //       id={i}
  //       ></div>
  //   );
  // }



  let squareArr = [];

  // create number of squares depending on selected grid size (girdSize x girdSize)
  for (let i = 0; i < ctx.sideValue ** 2; i++) {
    squareArr.push(i);
  }

  const squares = squareArr.map(item => (
        <SquareGrid 
          key={item}
          id={item}
          gridSide = {ctx.sideValue}
          displayLines = {ctx.displayLines}
          //bkGroundColor = {ctx.bkGroundColor}
          // Start coloring square when user clicks a square
          squareMouseDown = {ctx.squareMouseDown}
          
        />
  ))


  return (
    <div className="columnGrid" id="capture">
      <div
        className="grid"
        // Align squares as grid of equal sizes inside main grid container via gridTemplateColumns/Rows style property
        style={{
          gridTemplateColumns: `repeat(${ctx.sideValue}, 1fr)`,
          gridTemplateRows: `repeat(${ctx.sideValue}, 1fr)`,
          backgroundColor: `${ctx.bkGroundColor}`
        }}

        // Squares are colored depending on where the mouse is over the grid. squares are coloured only if mouseDown state is true. 
        // onMousedown eventListner sets mouseDown state to true. If the user hovers over other squares within the grid, mousedown state remains true, and the squares are colored.
        // When the user leaves the grid, mouseDown state is set to false and coloring stops. onMouseUp also sets mouseDown state to false, and stops coloring.
        onMouseDown={() => ctx.startDraw()}
        onMouseUp={() => ctx.stopDraw()}
        onMouseLeave={() => ctx.stopDraw()}
        onMouseOver={(event) => ctx.dragDraw(event)}
        
        // These events are for mobile devices. Concept is same as above.
        onTouchStart={() => ctx.startDraw()}
        onTouchMove={(event) => ctx.touchDragDraw(event)}
        onTouchEnd={() => ctx.stopDraw()}
        onTouchCancel={() => ctx.stopDraw()}
        
      >
        {squares}
        
      </div>
    </div>
  );
}

export default Grid;
