import React, { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import produce from "immer";  // double buffering state 

// NW | N | NE
//  W | C |  E
// SW | S | SE
const operations = [
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
  [-1, 0],
  [-1, 1],
];

const numRows = 100;
const numCols = 100;

// creates an empty grid 
const emptyGrid = () => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    // pushes a array of 0s to the rows array, each new array is a column
    rows.push(Array.from(Array(numCols), () => 0));
  }
  return rows;
};

export default function App() {
  const [grid, setGrid] = useState(emptyGrid);
  const [running, setRunning] = useState(false);
  const runningRef = useRef();  // useRef persists the object on every render.
  runningRef.current = running;
  


  const toggleLife = (i, k) => {
    // only click if simulations is stoped 
    if (!runningRef.current) {
      const newGrid = produce(grid, (gridCopy) => {
        gridCopy[i][k] = gridCopy[i][k] ? 0 : 1;
      });
      setGrid(newGrid);
    }
  };

  // creates a random pattern in the grid
  const setRandom = () => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(
        Array.from(Array(numCols), () => (Math.random() > 0.7 ? 1 : 0))
      );
    }
    setGrid(rows);
  };

  // advances next step in simulation
  const nextSimulation = ()=>{
    setGrid((grid) => {
      // returns a copy of the grid with all the state changes
      return produce(grid, (gridCopy) => {
        // loop over all rows
        for (let i = 0; i < numRows; i++) {
          //loop over all columns
          for (let k = 0; k < numCols; k++) {
            //calculate neighbors
            let neighbors = 0;
            // checks all neighboors of a cell
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;

              // if neighboor exists add value tu neighboors
              if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                neighbors += grid[newI][newK];
              }
            });
            // Game of Life rules
            // Any live cell with fewer than two live neighbours dies, as if by underpopulation.
            // Any live cell with two or three live neighbours lives on to the next generation.
            // Any live cell with more than three live neighbours dies, as if by overpopulation.
            // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0;
            } else if (grid[i][k] === 0 && neighbors === 3) {
              gridCopy[i][k] = 1;
            }
          }
        }
      });
    });
  }

  const runSimulation = useCallback(() => {   // using callback to have the same function on every rerender 
    // stops simulation when user clicked stop
    if (!runningRef.current) {
      return;
    }

    //runs the simmulation
    setGrid((grid) => {
      // returns a copy of the grid with all the state changes
      return produce(grid, (gridCopy) => {
        // loop over all rows
        for (let i = 0; i < numRows; i++) {
          //loop over all columns
          for (let k = 0; k < numCols; k++) {
            //calculate neighbors
            let neighbors = 0;
            // checks all neighboors of a cell
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;

              // if neighboor exists add value tu neighboors
              if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                neighbors += grid[newI][newK];
              }
            });
            // Game of Life rules
            // Any live cell with fewer than two live neighbours dies, as if by underpopulation.
            // Any live cell with two or three live neighbours lives on to the next generation.
            // Any live cell with more than three live neighbours dies, as if by overpopulation.
            // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0;
            } else if (grid[i][k] === 0 && neighbors === 3) {
              gridCopy[i][k] = 1;
            }
          }
        }
      });
    });

    setTimeout(runSimulation, 200);
  }, []);

  useEffect(() => {
    runSimulation();
  }, [running]);

  return (
    <div className="App">
      <h1>Conway's Game of Life</h1>
      <div className="controls">
        <button onClick={() => setRunning(!running)}>
          {running ? "stop" : "start"}
        </button>
        <button onClick={nextSimulation} disabled={running} >Step</button>
        <button onClick={setRandom} disabled={running}>Random</button>
        <button onClick={()=>setGrid(emptyGrid)} disabled={running}>Clear</button>
      </div>
      <div className="grid">
        {grid.map((rows, i) => {
          return rows.map((col, k) => {
            return (
              <div
                key={`${i}-${k}`}
                onClick={() => toggleLife(i, k)}
                className="cel"
                style={{ backgroundColor: grid[i][k] ? "white" : undefined }}
              ></div>
            );
          });
        })}
      </div>
    </div>
  );
}
