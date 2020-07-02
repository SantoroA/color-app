import React, { useState } from "react";
import ColorBox from "./ColorBox";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./Palette.css";

export default function Palette(props) {
  const { colors } = props.palette;
  const [level, setLevel] = useState(500);
  function changeLevel(level) {
    setLevel(level);
  }
  return (
    <div className="Palette">
      <div className="slider">
        <Slider
          defaultValue={level}
          min={100}
          max={900}
          step={100}
          onAfterChange={changeLevel}
          trackStyle={{ backgroundColor: "transparent" }}
          handleStyle={{
            borderColor: "green",
            height: 13,
            width: 13,
            marginLeft: -7,
            marginTop: -3,
            backgroundColor: "green",
            boxShadow: "none",
          }}
          railStyle={{ height: 8 }}
        />
      </div>
      <div className="Palette-colors">
        {colors[level].map((color) => (
          <ColorBox color={color} />
        ))}
        <h1>Hi</h1>
      </div>
    </div>
  );
}
