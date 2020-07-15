import sizes from "./sizes";
import bg from "./bg.svg";

export default {
  root: {
    height: "100vh",
    overflow: "scroll",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: "#b55084",
    backgroundImage: `url(${bg})`,
    // background by SVGBackgrounds.com
  },
  heading: {
    fontSize: "3rem",
    color: "#60072b",
    fontFamily: '"Shadows Into Light", cursive',
  },
  container: {
    width: "50%",
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    flexWrap: "wrap",
    [sizes.down("lg")]: {
      width: "80%",
    },
    [sizes.down("xs")]: {
      width: "70%",
    },
  },
  nav: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    color: "white",
    alignItems: "center",
    "& a": {
      color: "white",
    },
  },
  palettes: {
    boxSizing: "border-box",

    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(3, 30%)",
    gridGap: "2rem",
    [sizes.down("sm")]: {
      gridTemplateColumns: "repeat(2, 50%)",
    },
    [sizes.down("xs")]: {
      gridTemplateColumns: "repeat(1, 100%)",
      gridGap: "1rem",
    },
  },
};
