import sizes from "./sizes";
import bg from "./bg.svg";

export default {
  "@global": {
    ".fade-exit": {
      opacity: 1,
    },
    ".fade-exit-active": {
      opacity: 0,
      transition: "opacity 500ms ease-out",
    },
  },
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
    marginBottom: "0.8rem",
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
      width: "60%",
    },
  },

  nav: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    justifyContent: "space-between",
    color: "white",
    alignItems: "center",
    "& button": {
      display: "flex",
      flexDirection: "row",
      marginBottom: "2rem",
      borderRadius: "1rem",
      BackgroundColor: "#60072b",
      "& a": {
        color: "white",
        textDecoration: "none",
      },
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
