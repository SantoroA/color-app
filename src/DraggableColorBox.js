import React from "react";
import { SortableElement } from "react-sortable-hoc";
import { withStyles } from "@material-ui/styles";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import styles from "./styles/DraggableColorBoxStyles";

const DraggableColorBox = SortableElement((props) => {
  const { color, classes, name, handleClick } = props;
  return (
    <div className={classes.root} style={{ backgroundColor: color }}>
      <div className={classes.boxContent}>
        <span>{name}</span>
        <DeleteForeverRoundedIcon
          onClick={handleClick}
          className={classes.deleteIcon}
        />
      </div>
    </div>
  );
});
export default withStyles(styles)(DraggableColorBox);
