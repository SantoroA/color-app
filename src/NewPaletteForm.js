import React, { useState } from "react";
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
import { arrayMove } from "react-sortable-hoc";

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
  },
  drawerHeader: {
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
    padding: theme.spacing(3),
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
}));

function NewPaletteForm(props) {
  const maxColors = 20;
  const classes = useStyles();
  const [open, toggleOpen] = useToggle(true);
  const [colors, setColors] = useState(props.palettes[0].colors);
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
    const allColors = props.palettes.map((p) => p.colors).flat();
    let rand = Math.floor(Math.random() * allColors.length);
    const randomColor = allColors[rand];
    setColors([...colors, randomColor]);
  }
  function handleSubmit(newPaletteName) {
    const newPalette = {
      paletteName: newPaletteName,
      id: newPaletteName.toLowerCase().replace(/ /g, "-"),
      colors: colors,
    };
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
        <Typography variant="h4">Design Your Palette</Typography>
        <div>
          <Button onClick={clearColors} variant="contained" color="secondary">
            Clear Palette
          </Button>
          <Button
            onClick={addRandomColor}
            variant="contained"
            disabled={paletteIsFull}
            color="primary"
          >
            Random Color
          </Button>
        </div>
        <ColorPickerForm
          colors={colors}
          addNewColor={addNewColor}
          paletteIsFull={paletteIsFull}
        />
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
        />
      </main>
    </div>
  );
}
export default NewPaletteForm;
