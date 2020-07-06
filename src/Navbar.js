import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./Navbar.css";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import { Link } from "react-router-dom";
import Select from "@material-ui/core/Select";
import { MenuItem, IconButton } from "@material-ui/core";

export default function Navbar(props) {
  const { level, changeLevel, changeFormat, showingAllColors } = props;
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
    <header className="Navbar">
      <div className="logo">
        <Link to="/">ColorHabit</Link>
      </div>
      {showingAllColors && (
        <div className="slider-container">
          <span>level: {level}</span>
          <div className="slider">
            <Slider
              defaultValue={level}
              min={100}
              max={900}
              step={100}
              onAfterChange={changeLevel}
              trackStyle={{ backgroundColor: "transparent" }}
              handleStyle={{
                borderColor: "green",
                height: 13,
                width: 13,
                marginLeft: -7,
                marginTop: -3,
                backgroundColor: "green",
                boxShadow: "none",
              }}
              railStyle={{ height: 8 }}
            />
          </div>
        </div>
      )}
      <div className="select-container">
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
