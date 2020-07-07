import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import chroma from "chroma-js";
import { withStyles } from "@material-ui/styles";

const styles = {
  ColorBox: {
    width: "20%",
    height: (props) => (props.showingFullPalette ? " 25%" : "50%"),
    margin: " 0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-5px",
    "&:hover button": {
      opacity: "1",
    },
  },
  copyText: {
    color: (props) =>
      chroma(props.color).luminance() >= 0.5 ? "rgba(0, 0, 0, 0.8)" : "white",
  },
  colorName: {
    color: (props) =>
      chroma(props.color).luminance() <= 0.1 ? "white" : "black",
  },
  seeMore: {
    color: (props) =>
      chroma(props.color).luminance() >= 0.5 ? "rgba(0, 0, 0, 0.8)" : "white",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    position: "absolute",
    border: "none",
    right: "0",
    bottom: "0",
    fontSize: "12px",
    width: "60px",
    height: "30px",
    textAlign: "center",
    lineHeight: "30px",
  },
  copyButton: {
    color: (props) =>
      chroma(props.color).luminance() >= 0.5 ? "rgba(0, 0, 0, 0.8)" : "white",
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
    lineHight: "30px",
    textTransform: "uppercase",
    textDecoration: "none",
    opacity: "0",
  },
  boxContent: {
    position: "absolute",
    width: "100%",
    left: "0px",
    bottom: "0px",
    padding: "10px",
    color: "black",
    letterSpacing: "1px",
    fontSize: "11px",
    textTransform: "uppercase",
  },
  copyOverlay: {
    opacity: "0",
    zIndex: "0",
    width: "100%",
    height: "100%",
    transition: "transform 0.6s ease-in-out",
    transform: "scale(0.1)",
  },
  showOverlay: {
    opacity: "1",
    transform: "scale(50)",
    zIndex: "10",
    position: "absolute",
  },
  copyMessage: {
    flexDirection: "column",
    position: "fixed",
    left: "0",
    right: "0",
    top: " 0",
    bottom: " 0",
    display: " flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "4rem",
    transform: "scale(0.1)",
    opacity: "0",
    color: "white",
    "& h1": {
      fontWeight: "400",
      textShadow: "1px 2px black",
      backgroundColor: "rgba(255, 255, 255, 0.3)",
      width: "100%",
      textAlign: "center",
      marginBottom: "0",
      padding: "1rem",
      textTransform: "uppercase",
    },
    "& p": {
      fontSize: "2rem",
      fontWeight: "100",
    },
  },
  showMessage: {
    opacity: "1",
    transform: "scale(1)",
    zIndex: "25",
    transition: "all 0.4s ease-in-out",
    transitionDelay: "0.3s",
  },
};

function ColorBox(props) {
  const [copied, setCopied] = useState(false);
  const { name, color, moreUrl, showingFullPalette, classes } = props;
  const changeCopyState = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <CopyToClipboard text={color} onCopy={changeCopyState}>
      <div style={{ background: color }} className={classes.ColorBox}>
        <div
          style={{ background: color }}
          className={`${classes.copyOverlay} ${copied && classes.showOverlay}`}
        />
        <div
          className={`${classes.copyMessage} ${copied && classes.showMessage}`}
        >
          <h1>COPIED!</h1>
          <p className={classes.copyText}>{color}</p>
        </div>
        <div>
          <div className={classes.boxContent}>
            <span className={classes.colorName}>{name}</span>
          </div>
          <button className={classes.copyButton}>Copy</button>
        </div>
        {showingFullPalette && (
          <Link to={moreUrl} onClick={(e) => e.stopPropagation()}>
            <span className={classes.seeMore}>MORE</span>
          </Link>
        )}
      </div>
    </CopyToClipboard>
  );
}
export default withStyles(styles)(ColorBox);
