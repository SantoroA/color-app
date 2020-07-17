export default {
  root: {
    cursor: "pointer",
    "&:hover svg": {
      opacity: "1",
    },
  },
  container: {
    overflow: "hidden",
    position: "relative",
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "0.7rem",
    postion: "relative",
  },
  colors: {
    backgroundColor: "#dae1e4",
    height: "130px",
    width: "100%",
    boderRadius: "10px",
    overflow: "hidden",
  },
  title: {
    display: "flex",
    justifyContent: "center",
    color: "#60072b",
    fontFamily: '"Shadows Into Light", cursive',
    alignItems: "center",
    margin: "0",

    paddingTop: "0.5rem",
    fontSize: "1.3rem",
    position: "relative",
  },
  emoji: {
    marginLeft: "0.5rem",
    fontSize: "1.5rem",
  },
  miniColor: {
    height: "25%",
    width: "20%",
    display: "inline-block",
    margin: "0 auto",
    position: "relative",
    marginBottom: "-5px",
  },

  deleteIcon: {
    color: "white",
    backgroundColor: "#eb3d30",
    width: "20px",
    height: "20px",
    position: "absolute",
    zIndex: 100,
    right: "0",
    top: "0",
    padding: "10px",
    opacity: 0,
    transition: "all 0.3s ease-in-out",
  },
};
