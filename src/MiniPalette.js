import React from "react";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/MiniPaletteStyles";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";

function MiniPalette(props) {
  const {
    classes,
    paletteName,
    emoji,
    colors,
    handleClick,
    deletePalette,
    id,
  } = props;

  const miniColorBoxes = colors.map((color) => {
    return (
      <div
        className={classes.miniColor}
        style={{ backgroundColor: color.color }}
        key={color.name}
      ></div>
    );
  });

  return (
    <div className={classes.root} onClick={handleClick}>
      <div className={classes.delete}>
        <DeleteForeverRoundedIcon
          onClick={(e) => {
            e.stopPropagation();
            deletePalette(id);
          }}
          className={classes.deleteIcon}
        />
      </div>
      <div className={classes.colors}>{miniColorBoxes}</div>
      <h5 className={classes.title}>
        {paletteName}
        <spam className={classes.emoji}>{emoji}</spam>
      </h5>
    </div>
  );
}

export default withStyles(styles)(MiniPalette);
