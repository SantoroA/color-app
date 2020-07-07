import React, { useState } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";

import ColorBox from "./ColorBox";
import PaletteFooter from "./PaletteFooter";
import Navbar from "./Navbar";

const styles = {
  Palette: {
    height: "97vh",
    display: "flex",
    flexDirection: "column",
  },
  colors: {
    height: "90%",
  },
  goBack: {
    width: "20%",
    height: "50%",
    margin: " 0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-5px",
    opacity: "1",
    backgroundColor: "black",
    "& a": {
      color: "white",
      width: "100px",
      height: "30px",
      position: "absolute",
      display: "inline-block",
      top: "50%",
      left: "50%",
      marginLeft: "-50px",
      marginTop: "-15px",
      textAlign: "center",
      outline: "none",
      border: "none",
      backgroundColor: "rgba(255, 255, 255, 0.3)",
      fontSize: "0.8rem",
      lineHeight: "30px",
      textTransform: "uppercase",
      textDecoration: "none",
    },
  },
};

function SingleColorPalette(props) {
  const { classes } = props;
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
    <div className={classes.Palette}>
      <Navbar showingAllColors={false} changeFormat={changeFormat} />
      <div className={classes.colors}>
        {colorBoxes}
        <div className={classes.goBack}>
          <Link to={`/palette/${id}`}>Go Back</Link>
        </div>
      </div>
      <PaletteFooter paletteName={paletteName} emoji={emoji} />
    </div>
  );
}
export default withStyles(styles)(SingleColorPalette);
