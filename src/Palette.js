import React from "react";
import ColorBox from "./ColorBox";
import "./Palette.css";

export default function Palette(props) {
  return (
    <div className="Palette">
      <div className="Palette-colors">
        {props.palette.colors.map((color) => (
          <ColorBox color={color} />
        ))}
        <h1>Hi</h1>
      </div>
    </div>
  );
}
