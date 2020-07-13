import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

function PaletteMetaForm(props) {
  const [stage, setStage] = useState("form");
  const [newPaletteName, setNewPaletteName] = useState("");
  const { handleSubmit, toggleFormShowing } = props;

  //   function savePalette(emoji) {
  //     const newPalette = {
  //       paletteName: newPaletteName,
  //       emoji: emoji.native,
  //     };
  //     return handleSubmit(newPalette);
  //   }

  useEffect(() => {
    ValidatorForm.addValidationRule("isPaletteNameUnique", (value) => {
      return props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      );
    });
  });
  return (
    <>
      <Dialog open={stage === "emoji"} onClose={toggleFormShowing}>
        <DialogTitle id="form-dialog-title">Choose a Palette Emoji</DialogTitle>
        <Picker
          onSelect={(e) => {
            handleSubmit({
              paletteName: newPaletteName,
              emoji: e.native,
            });
            props.history.push("/");
          }}
          title="Pick a Palette Emoji"
        />
      </Dialog>
      <Dialog
        open={stage === "form"}
        onClose={toggleFormShowing}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
        <ValidatorForm
          onSubmit={() => {
            setStage("emoji");
          }}
        >
          <DialogContent>
            <DialogContentText>
              Please enter a unique name for your new palette.
            </DialogContentText>
            <TextValidator
              value={newPaletteName}
              label="Palette Name"
              fullWidth
              margin="normal"
              onChange={(e) => setNewPaletteName(e.target.value)}
              validators={["required", "isPaletteNameUnique"]}
              errorMessages={[
                "Enter a palette name",
                "This name is already taken",
              ]}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={toggleFormShowing} color="primary">
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Save Palette
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </>
  );
}
export default PaletteMetaForm;
