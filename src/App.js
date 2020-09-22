import React, { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import produce from "immer";

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

const numRows = 50;
const numCols = 50;

// creates an empty grid 
const emptyGrid = () => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0));
  }
  return rows;
};

export default function App() {
  const [grid, setGrid] = useState(emptyGrid);
  const [running, setRunning] = useState(false);
  const runningRef = useRef();
  runningRef.current = running;


  const toggleLife = (i, k) => {
    const newGrid = produce(grid, (gridCopy) => {
      gridCopy[i][k] = gridCopy[i][k] ? 0 : 1;
    });
    setGrid(newGrid);
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

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    //runs the simmulation
    setGrid((grid) => {
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
            // Game of Life Rules
            // Any live cell with fewer than two live neighbours dies, as if by underpopulation.
            // Any live cell with more than three live neighbours dies, as if by overpopulation.
            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0;
            } else if (grid[i][k] === 0 && neighbors === 3) {  //Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
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
      <h1>The Game of Life</h1>
      <button onClick={() => setRunning(!running)}>
        {running ? "stop" : "start"}
      </button>
      <button onClick={setRandom}>Random</button>
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
