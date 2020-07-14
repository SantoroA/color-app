import sizes from "./sizes";

export default {
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
    [sizes.down("lg")]: {
      width: "75%",
      height: "33.33%",
    },
    [sizes.down("md")]: {
      width: "50%",
      height: "20%",
    },
    [sizes.down("sm")]: {
      width: "100%",
      height: "10%",
    },
  },
};
