import React from "react";

export default function Cel(props) {
  
    const { x, y, grid } = props;

  return (
    <div
      onClick={() => props.toggleLife(x, y)}
      className="cel"
      style={{ backgroundColor: grid[x][y] ? "white" : undefined }}
    ></div>
  );
}
