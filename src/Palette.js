import React, { useState } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/PaletteStyles";
import "./Palette.css";

function Palette(props) {
  const { colors, paletteName, emoji, id } = props.palette;
  const { classes } = props;
  const [level, setLevel] = useState(500);
  const [format, setFormat] = useState("hex");
  function changeLevel(level) {
    setLevel(level);
  }
  function changeFormat(val) {
    setFormat(val);
  }
  return (
    <div className={classes.Palette}>
      <Navbar
        level={level}
        changeFormat={changeFormat}
        changeLevel={changeLevel}
        showingAllColors
      />
      <div className={classes.colors}>
        {colors[level].map((color) => (
          <ColorBox
            color={color[format]}
            name={color.name}
            key={color.id}
            moreUrl={`/palette/${id}/${color.id}`}
            showingFullPalette
          />
        ))}
      </div>
      <PaletteFooter paletteName={paletteName} emoji={emoji} />
    </div>
  );
}
export default withStyles(styles)(Palette);
