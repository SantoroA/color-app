import React, { useState } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import "./Palette.css";

export default function Palette(props) {
  const { colors } = props.palette;
  const [level, setLevel] = useState(500);
  function changeLevel(level) {
    setLevel(level);
  }
  return (
    <div className="Palette">
      <Navbar level={level} changeLevel={changeLevel} />
      <div className="Palette-colors">
        {colors[level].map((color) => (
          <ColorBox color={color} />
        ))}
        <h1>Hi</h1>
      </div>
    </div>
  );
}
