import React, { useState } from "react";
import { arrayMove } from "react-sortable-hoc";
import DraggableColorList from "./DraggableColorList";
import PaletteFormNav from "./PaletteFormNav";
import ColorPickerForm from "./ColorPickerForm";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Button from "@material-ui/core/Button";
import useToggle from "./hooks/useToggle";
import seedColors from "./seedColors";

const drawerWidth = 350;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    display: "flex",
    alignItems: "center",
  },
  drawerHeader: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    height: "calc(100vh - 64px)",
    padding: 0,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  container: {
    width: "90%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  buttons: {
    width: "100%",
  },
  button: {
    width: "50%",
  },
}));

function NewPaletteForm(props) {
  const allColors = seedColors.map((p) => p.colors).flat();
  const maxColors = 20;
  const classes = useStyles();
  const [open, toggleOpen] = useToggle(true);
  const [colors, setColors] = useState(seedColors[0].colors);
  const paletteIsFull = colors.length >= maxColors;

  const onSortEnd = ({ oldIndex, newIndex }) =>
    setColors(arrayMove(colors, oldIndex, newIndex));

  function addNewColor(newColor) {
    return setColors([...colors, newColor]);
  }

  function removeColor(colorName) {
    const reducedColors = colors.filter((color) => color.name !== colorName);
    return setColors(reducedColors);
  }
  function clearColors() {
    return setColors([]);
  }
  function addRandomColor() {
    let rand;
    let randomColor;
    let isDuplicateColor = true;
    while (isDuplicateColor) {
      rand = Math.floor(Math.random() * allColors.length);
      randomColor = allColors[rand];
      console.log(randomColor);
      isDuplicateColor = colors.some(
        (color) => color.name === randomColor.name // eslint-disable-line no-loop-func
      );
    }
    setColors([...colors, randomColor]);
  }
  function handleSubmit(newPalette) {
    newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, "-");
    newPalette.colors = colors;

    return props.savePalette(newPalette);
  }

  return (
    <div className={classes.root}>
      <PaletteFormNav
        handleSubmit={handleSubmit}
        palettes={props.palettes}
        open={open}
        toggleOpen={toggleOpen}
        history={props.history}
      />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={toggleOpen}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <div className={classes.container}>
          <Typography gutterBottom variant="h4">
            Design Your Palette
          </Typography>
          <div className={classes.buttons}>
            <Button
              className={classes.button}
              onClick={clearColors}
              variant="contained"
              color="secondary"
            >
              Clear Palette
            </Button>
            <Button
              onClick={addRandomColor}
              variant="contained"
              disabled={paletteIsFull}
              color="primary"
              className={classes.button}
            >
              Random Color
            </Button>
          </div>
          <ColorPickerForm
            colors={colors}
            addNewColor={addNewColor}
            paletteIsFull={paletteIsFull}
          />
        </div>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <DraggableColorList
          onSortEnd={onSortEnd}
          colors={colors}
          removeColor={removeColor}
          axis="xy"
          distance={20}
        />
      </main>
    </div>
  );
}
export default NewPaletteForm;
