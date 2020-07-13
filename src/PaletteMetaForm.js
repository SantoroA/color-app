import React, { useEffect, useState } from "react";
import useToggle from "./hooks/useToggle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

function PaletteMetaForm(props) {
  const [open, toggleOpen] = useToggle(false);
  const [newPaletteName, setNewPaletteName] = useState("");
  const { handleSubmit } = props;

  useEffect(() => {
    ValidatorForm.addValidationRule("isPaletteNameUnique", (value) => {
      return props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      );
    });
  });
  return (
    <div>
      <div>
        <Button variant="outlined" color="primary" onClick={toggleOpen}>
          Open form dialog
        </Button>
        <Dialog
          open={open}
          onClose={toggleOpen}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText>
            <ValidatorForm
              onSubmit={() => {
                handleSubmit(newPaletteName);
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
          </DialogContent>
          <DialogActions>
            <Button onClick={toggleOpen} color="primary">
              Cancel
            </Button>
            <Button onClick={toggleOpen} color="primary">
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
export default PaletteMetaForm;
