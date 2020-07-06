import React, { useState } from "react";
import ColorBox from "./ColorBox";
import PaletteFooter from "./PaletteFooter";
import Navbar from "./Navbar";

export default function SingleColorPalette(props) {
  const [format, setFormat] = useState("hex");
  function changeFormat(val) {
    setFormat(val);
  }
  const { paletteName, emoji } = props.palette;
  const shades = gatherShades(props.palette, props.colorId);
  const colorBoxes = shades.map((color) => {
    return (
      <ColorBox
        key={color.id}
        name={color.name}
        color={color[format]}
        showLink={false}
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
    <div className="Palette">
      <Navbar showingAllColors={false} changeFormat={changeFormat} />
      <h1>Single Color Palette</h1>
      <div className="Palette-colors">{colorBoxes}</div>
      <PaletteFooter paletteName={paletteName} emoji={emoji} />
    </div>
  );
}
