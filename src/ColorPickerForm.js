import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import { SketchPicker } from "react-color";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import styles from "./styles/ColorPickerFormStyles";

function ColorPickerForm(props) {
  const [currColor, setCurrColor] = useState("teal");
  const [newName, setNewName] = useState("");
  const { paletteIsFull, addNewColor, colors, classes } = props;
  function handleSubmit() {
    const newColor = {
      color: currColor,
      name: newName,
    };
    return addNewColor(newColor);
  }
  useEffect(() => {
    ValidatorForm.addValidationRule("isColorNameUnique", (value) => {
      return colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      );
    });

    ValidatorForm.addValidationRule("isColorUnique", (value) => {
      return colors.every(({ color }) => color !== currColor);
    });
  });
  return (
    <div>
      <SketchPicker
        color={currColor}
        onChangeComplete={(newColor) => setCurrColor(newColor.hex)}
        className={classes.picker}
      />
      <ValidatorForm
        onSubmit={() => {
          setNewName("");
          handleSubmit();
        }}
      >
        <TextValidator
          value={newName}
          variant="filled"
          className={classes.colorNameInput}
          margin="normal"
          placeholder="Color Name"
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
          className={classes.addColor}
          style={{ backgroundColor: paletteIsFull ? "grey" : currColor }}
        >
          {paletteIsFull ? "Palette Full" : "Add Color"}
        </Button>
      </ValidatorForm>
    </div>
  );
}
export default withStyles(styles)(ColorPickerForm);
