import React, { useState } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import "./Palette.css";

export default function Palette(props) {
  const { colors, paletteName, emoji, id } = props.palette;
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
        showingAllColors
      />
      <div className="Palette-colors">
        {colors[level].map((color) => (
          <ColorBox
            color={color[format]}
            name={color.name}
            key={color.id}
            moreUrl={`/palette/${id}/${color.id}`}
            showLink={true}
          />
        ))}
      </div>
      <PaletteFooter paletteName={paletteName} emoji={emoji} />
    </div>
  );
}
