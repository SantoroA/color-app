import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./Navbar.css";
import Select from "@material-ui/core/Select";
import { MenuItem } from "@material-ui/core";

export default function Navbar(props) {
  const { level, changeLevel, changeFormat } = props;
  const [format, setFormat] = useState("hex");
  function handleChange(e) {
    setFormat(e.target.value);
    changeFormat(e.target.value);
  }
  return (
    <header className="Navbar">
      <div className="logo">
        <a href="/">ColorHabit</a>
      </div>
      <div className="slider-container">
        <span>level: {level}</span>
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
      </div>
      <div className="select-container">
        <Select value={format} onChange={handleChange}>
          <MenuItem value="hex">HEX - #fff</MenuItem>
          <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
          <MenuItem value="rgba">RGBA - rgba(255,255,255,1.0)</MenuItem>
        </Select>
      </div>
    </header>
  );
}
