import chroma from "chroma-js";
import sizes from "./sizes";

const styles = {
  root: {
    width: "20%",
    height: "25%",
    margin: " 0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-5px",
    "&:hover svg": {
      color: "white",
      transform: "scale(1.5)",
    },
    [sizes.down("lg")]: {
      width: "25%",
      height: "20%",
    },
    [sizes.down("md")]: {
      width: "50%",
      height: "10%",
    },
    [sizes.down("sm")]: {
      width: "100%",
      height: "5%",
      marginBottom: "-5px",
    },
  },
  boxContent: {
    position: "absolute",
    width: "100%",
    left: "0px",
    bottom: "0px",
    padding: "10px",
    color: (props) =>
      chroma(props.color).luminance() <= 0.15
        ? "rgba(255,255,255,0.8)"
        : "rgba(0,0,0,0.7)",

    letterSpacing: "1px",
    fontSize: "11px",
    textTransform: "uppercase",
    display: "flex",
    justifyContent: "space-between",
  },
  deleteIcon: {
    transition: "all 0.3s ease-in-out",
  },
};
export default styles;
