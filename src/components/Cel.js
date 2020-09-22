import React from "react";

export default function Cel(props) {
  
    const { x, y, grid } = props;

  return (
    <div
      key={`${x}-${y}`}
      onClick={() => props.toggleLife(x, y)}
      className="cel"
      style={{ backgroundColor: grid[x][y] ? "white" : undefined }}
    ></div>
  );
}
