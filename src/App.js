import React, {useState} from 'react'
import './App.css'
import produce from "immer"

let vh = window.innerHeight;
let vw = window.innerWidth;


const numRows = Math.ceil(vw / 20);
const numCols = Math.ceil(vh / 20);

export default function App() {
  const [grid, setGrid] = useState(()=>{
    const rows = [];
    
    for(let i = 0; i < numRows; i++){
      rows.push(Array.from(Array(numCols),()=>0)) 
    }

    return rows
  });
  
  const toggleLife = (i,k)=>{
    const newGrid = produce(grid, gridCopy =>{
      gridCopy[i][k] = !gridCopy[i][k]
    })
    setGrid(newGrid)
  }

  
  return (
    <div className="App">
      <h1>The Game of Life</h1>
      <div className="grid">
      {grid.map((rows, i) => {
        return rows.map((col, k) => {
          return (
            <div
              key={`${i}-${k}`}
              onClick={()=>toggleLife(i,k)}
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
