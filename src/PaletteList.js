import React from "react";
import MiniPalette from "./MiniPalette";
import { Link } from "react-router-dom";

export default function PaletteList(props) {
  const { palettes } = props;
  return (
    <div>
      <MiniPalette />
      {palettes.map((palette) => {
        return <MiniPalette {...palette} />;
      })}
    </div>
  );
}
