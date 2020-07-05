import React, { useState } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import "./Palette.css";

export default function Palette(props) {
  const { colors } = props.palette;
  const [level, setLevel] = useState(500);
  const [format, setFormat] = useState("hex");
  function changeLevel(level) {
    setLevel(level);
  }
  function changeFormat(val) {
    setFormat(val);
  }
  return (
    <div className="Palette">
      <Navbar
        level={level}
        changeFormat={changeFormat}
        changeLevel={changeLevel}
      />
      <div className="Palette-colors">
        {colors[level].map((color) => (
          <ColorBox color={color[format]} name={color.name} />
        ))}
        <h1>Hi</h1>
      </div>
    </div>
  );
}
