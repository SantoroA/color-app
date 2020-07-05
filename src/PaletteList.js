import React from "react";
import { Link } from "react-router-dom";

export default function PaletteList(props) {
  const { palettes } = props;
  return (
    <div>
      {palettes.map((palette) => {
        return (
          <p>
            <Link to={`/palette/${palette.id}`}>{palette.paletteName}</Link>
          </p>
        );
      })}
    </div>
  );
}
