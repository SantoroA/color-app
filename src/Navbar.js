import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./Navbar.css";

export default function Navbar(props) {
  const { level, changeLevel } = props;
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
    </header>
  );
}
