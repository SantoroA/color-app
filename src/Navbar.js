import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import Select from "@material-ui/core/Select";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import { MenuItem, IconButton } from "@material-ui/core";
import styles from "./styles/NavbarStyles";

function Navbar(props) {
  const { level, changeLevel, changeFormat, showingAllColors, classes } = props;
  const [format, setFormat] = useState("hex");
  const [open, setOpen] = useState(false);
  function handleFormatChange(e) {
    setFormat(e.target.value);
    changeFormat(e.target.value);
    setOpen(true);
  }
  const handleClose = (e, reason) => {
    setOpen(false);
  };
  return (
    <header className={classes.Navbar}>
      <div className={classes.logo}>
        <Link to="/">ColorHabit</Link>
      </div>
      {showingAllColors && (
        <div className="slider-container">
          <span>level: {level}</span>
          <div className={classes.slider}>
            <Slider
              defaultValue={level}
              min={100}
              max={900}
              step={100}
              onAfterChange={changeLevel}
              trackStyle={{ backgroundColor: "transparent" }}
              handleStyle={{
                borderColor: "green",
                height: "13px",
                width: "13px",
                marginLeft: -7,
                marginTop: -3,
                backgroundColor: "green",
                boxShadow: "none",
              }}
              railStyle={{ height: "8px" }}
            />
          </div>
        </div>
      )}
      <div className={classes.selectContainer}>
        <Select value={format} onChange={handleFormatChange}>
          <MenuItem value="hex">HEX - #fff</MenuItem>
          <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
          <MenuItem value="rgba">RGBA - rgba(255,255,255,1.0)</MenuItem>
        </Select>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={open}
        onClose={handleClose}
        autoHideDuration={2000}
        message={
          <span id="message-id">Format changed to {format.toUpperCase()}</span>
        }
        ContentProps={{
          "aria-describedby": "message-id",
        }}
        action={
          <IconButton
            onClick={handleClose}
            color="inherit"
            key="close"
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        }
      />
    </header>
  );
}
export default withStyles(styles)(Navbar);
