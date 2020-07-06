import React from "react";
import ColorBox from "./ColorBox";

export default function SingleColorPalette(props) {
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
  const shades = gatherShades(props.palette, props.colorId);
  const colorBoxes = shades.map((color) => {
    return (
      <ColorBox
        key={color.id}
        name={color.name}
        color={color.hex}
        showLink={false}
      />
    );
  });
  return (
    <div className="Palette">
      <h1>Single Color Palette</h1>
      <div className="Palette-colors">{colorBoxes}</div>
    </div>
  );
}
