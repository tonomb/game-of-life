import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import produce from "immer"; // double buffering state
import Cel from "./components/Cel";

//Patterns
import gliderImg from "./assets/glider-gun.png";
import gliderGun from "./data/gliderGun";
import simkinImg from "./assets/simkin-gun.png";
import simkinGun from "./data/simkinGliderGun";
import hammerImg from "./assets/hammerhead.png";
import hammerhead from "./data/hammerhead";
import pufferImg from "./assets/bi-block-puffer.png";
import puffer from "./data/puffer";

// NW | N | NE
//  W | C |  E
// SW | S | SE
const coordinates = [
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
  [-1, 0],
  [-1, 1],
];

const numRows = 74;
const numCols = 74;

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
  const runningRef = useRef(); // useRef persists the object on every render.
  runningRef.current = running;
  const [count, setCount] = useState(0)

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
  const nextSimulation = () => {
    setGrid((grid) => {
      // returns a copy of the grid with all the state changes
      return produce(grid, (gridCopy) => {
        // loop over all rows
        for (let i = 0; i < numRows; i++) {
          //loop` over all columns
          for (let k = 0; k < numCols; k++) {
            //calculate neighbors
            let neighbors = 0;

            // checks all neighboors of a cell
            coordinates.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;

              // if neighboor exists add` value tu neighboors
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
    setCount(count + 1)
  };

  const runSimulation = () => {
    
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
            coordinates.forEach(([x, y]) => {
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

    setInterval(runSimulation, 10);
  };

  const saveConfig = () => {
    window.localStorage.setItem("pattern", grid);
  };

  useEffect(() => {
    runSimulation();
  }, [running]);

  useEffect(()=>{
    if(runningRef.current){
      setCount(count + 1)
    }
  },[grid])

  return (
    <div className="App">
      <div className="rules">
        <h1>Conway's Game of Life</h1>
        <h4 style={{visibility: count > 0 ? 'visible': 'hidden'}}>Gen {count}</h4>
        <div className="controls">
          <button onClick={() => setRunning(!running)}>
            {running ? "stop" : "start"}
          </button>
          <button onClick={nextSimulation} disabled={running}>
            Step
          </button>
          <button onClick={setRandom} disabled={running}>
            Random
          </button>
          <button onClick={() => {setGrid(emptyGrid); setCount(0)}} disabled={running}>
            Clear
          </button>
          <button onClick={saveConfig}> Save</button>
        </div>
        <div className="description">
          <p>
            The Game of Life is a cellular automaton devised by the British
            mathematician John Horton Conway in 1970. It is a zero-player game,
            meaning that its evolution is determined by its initial state,
            requiring no further input. One interacts with the Game of Life by
            creating an initial configuration and observing how it evolves.
          </p>
          <h4>Rules</h4>
          <ol>
            <li>
              Any live cell with fewer than two live neighbours dies, as if by
              underpopulation.
            </li>
            <li>
              Any live cell with two or three live neighbours lives on to the
              next generation.
            </li>
            <li>
              Any live cell with more than three live neighbours dies, as if by
              overpopulation.
            </li>
            <li>
              Any dead cell with exactly three live neighbours becomes a live
              cell, as if by reproduction.
            </li>
          </ol>
        </div>
        <div className="gallery-section">
          <div className="gallery">
            <p className="gallery-title">Gosper glider gun</p>
            <img
              className="gallery-img"
              src={gliderImg}
              onClick={() => setGrid(gliderGun)}
              alt="Gosper glider gun"
            />
          </div>
          <div className="gallery">
            <p className="gallery-title">Simkin glider gun</p>
            <img
              className="gallery-img"
              src={simkinImg}
              onClick={() => setGrid(simkinGun)}
              alt="Simkin glider gun"
            />
          </div>
          <div className="gallery">
            <p className="gallery-title">Hammerhead</p>
            <img
              className="gallery-img"
              src={hammerImg}
              onClick={() => setGrid(hammerhead)}
              alt="Hammerhead"
            />
          </div>
          <div className="gallery">
            <p className="gallery-title">Bi block puffer</p>
            <img
              className="gallery-img"
              src={pufferImg}
              onClick={() => setGrid(puffer)}
              alt="Bi Block Puffer"
            />
          </div>
        </div>
      </div>
      <div className="grid">
        {grid.map((rows, i) => {
          return rows.map((col, k) => {
            return (
              <Cel
                key={`${i}-${k}`}
                x={i}
                y={k}
                toggleLife={toggleLife}
                grid={grid}
              />
            );
          });
        })}
      </div>
    </div>
  );
}
