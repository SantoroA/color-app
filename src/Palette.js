import React from "react";
import ColorBox from "./ColorBox";
import "./Palette.css";
import { generatePalette } from "./colorHelpers";
import seedColors from "./seedColors";

export default function Palette(props) {
  console.log(generatePalette(seedColors[4]));
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
