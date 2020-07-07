import React, { useState } from "react";
import { Link } from "react-router-dom";
import ColorBox from "./ColorBox";
import PaletteFooter from "./PaletteFooter";
import Navbar from "./Navbar";

export default function SingleColorPalette(props) {
  const [format, setFormat] = useState("hex");
  function changeFormat(val) {
    setFormat(val);
  }
  const { paletteName, emoji, id } = props.palette;
  const shades = gatherShades(props.palette, props.colorId);
  const colorBoxes = shades.map((color) => {
    return (
      <ColorBox
        key={color.name}
        name={color.name}
        color={color[format]}
        showingFullPalette={false}
      />
    );
  });
  function gatherShades(palette, colorToFilterBy) {
    let paletteShades = [];
    let allColors = palette.colors;
    for (let key in allColors) {
      paletteShades = paletteShades.concat(
        allColors[key].filter((color) => color.id === colorToFilterBy)
      );
    }
    return paletteShades.slice(1);
    //reurn all shades of a given color
  }
  return (
    <div className="SingleColorPalette Palette">
      <Navbar showingAllColors={false} changeFormat={changeFormat} />
      <div className="Palette-colors">
        {colorBoxes}
        <div className="go-back ColorBox">
          <Link to={`/palette/${id}`} className="back-button">
            Go Back
          </Link>
        </div>
      </div>
      <PaletteFooter paletteName={paletteName} emoji={emoji} />
    </div>
  );
}
