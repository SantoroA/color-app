import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Button from "@material-ui/core/Button";
import useToggle from "./hooks/useToggle";
import DraggableColorList from "./DraggableColorList";
import { SketchPicker } from "react-color";
import { arrayMove } from "react-sortable-hoc";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

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
  const [currColor, setCurrColor] = useState("teal");
  const [newName, setNewName] = useState("");
  const [newPaletteName, setNewPaletteName] = useState("");
  const [colors, setColors] = useState(props.palettes[0].colors);
  const paletteIsFull = colors.length >= maxColors;

  const onSortEnd = ({ oldIndex, newIndex }) =>
    setColors(arrayMove(colors, oldIndex, newIndex));

  function addNewColor() {
    const newColor = {
      color: currColor,
      name: newName,
    };
    return setColors([...colors, newColor]);
  }
  function handleSubmit() {
    const newPalette = {
      paletteName: newPaletteName,
      id: newPaletteName.toLowerCase().replace(/ /g, "-"),
      colors: colors,
    };
    return props.savePalette(newPalette);
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

  useEffect(() => {
    ValidatorForm.addValidationRule("isColorNameUnique", (value) => {
      return colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      );
    });
    ValidatorForm.addValidationRule("isPaletteNameUnique", (value) => {
      return props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      );
    });
    ValidatorForm.addValidationRule("isColorUnique", (value) => {
      return colors.every(({ color }) => color !== currColor);
    });
  });

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        color="default"
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Persistent drawer
          </Typography>
          <ValidatorForm
            onSubmit={() => {
              handleSubmit();
              props.history.push("/");
            }}
          >
            <TextValidator
              value={newPaletteName}
              label="Palette Name"
              onChange={(e) => setNewPaletteName(e.target.value)}
              validators={["required", "isPaletteNameUnique"]}
              errorMessages={[
                "Enter a palette name",
                "This name is already taken",
              ]}
            />
            <Button variant="contained" color="primary" type="submit">
              Save Palette
            </Button>
          </ValidatorForm>
        </Toolbar>
      </AppBar>
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
        <SketchPicker
          color={currColor}
          onChangeComplete={(newColor) => setCurrColor(newColor.hex)}
        />
        <ValidatorForm
          onSubmit={() => {
            setNewName("");
            addNewColor();
          }}
        >
          <TextValidator
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            validators={["required", "isColorNameUnique", "isColorUnique"]}
            errorMessages={[
              "Enter a color name",
              "This color name is taken",
              "This color is taken",
            ]}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={paletteIsFull}
            style={{ backgroundColor: paletteIsFull ? "grey" : currColor }}
          >
            {paletteIsFull ? "Palette Full" : "Add Color"}
          </Button>
        </ValidatorForm>
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
