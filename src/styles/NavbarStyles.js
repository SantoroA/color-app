import sizes from "./sizes";

export default {
  Navbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    height: "6vh",
  },
  logo: {
    marginRight: "15px",
    padding: "0 13px",
    fontSize: "1.2rem",
    backgroundColor: "#eceff1",
    fontFamily: '"Shadows Into Light", cursive',
    height: "100%",
    display: "flex",
    alignItems: "center",
    "& a": {
      textDecoration: "none",
      color: "black",
    },
    [sizes.down("xs")]: {
      display: "none",
    },
  },

  selectContainer: {
    marginLeft: " auto",
    marginRight: "1rem",
  },
  slider: {
    width: "200px",
    display: "inline-block",
    marginLeft: "10px",
  },
};
