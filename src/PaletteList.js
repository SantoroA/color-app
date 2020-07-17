import React, { useState } from "react";
import useToggle from "./hooks/useToggle";
import MiniPalette from "./MiniPalette";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/PaletteListStyles";
import { Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Dialog from "@material-ui/core/Dialog";
import Avatar from "@material-ui/core/Avatar";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import blue from "@material-ui/core/colors/blue";
import red from "@material-ui/core/colors/red";

function PaletteList(props) {
  const [deleteDialog, toggleDeleteDialog] = useToggle(false);
  const [deletingId, setDeletingId] = useState("");
  const { palettes, classes, deletePalette } = props;
  function goToPalette(id) {
    props.history.push(`/palette/${id}`);
  }

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <nav className={classes.nav}>
          <h1 className={classes.heading}>ColorHabit</h1>
          <Link to="/palette/new">Create New Palette</Link>
        </nav>

        <TransitionGroup className={classes.palettes}>
          {palettes.map((palette) => {
            return (
              <CSSTransition classNames="fade" timeout={500} key={palette.id}>
                <MiniPalette
                  // deletePalette={deletePalette}
                  openDialog={toggleDeleteDialog}
                  setDeletingId={setDeletingId}
                  key={palette.id}
                  id={palette.id}
                  {...palette}
                  handleClick={() => goToPalette(palette.id)}
                />
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      </div>
      <Dialog
        aria-labelledby="delete-dialog-title"
        open={deleteDialog}
        onClose={toggleDeleteDialog}
      >
        <DialogTitle id="delete-dialog-title">Delete this palette</DialogTitle>
        <List>
          <ListItem
            button
            onClick={() => {
              deletePalette(deletingId);
              toggleDeleteDialog();
            }}
          >
            <ListItemAvatar>
              <Avatar style={{ backgroundColor: blue[100], color: blue[700] }}>
                <CheckIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText>Delete</ListItemText>
          </ListItem>
          <ListItem button onClick={toggleDeleteDialog}>
            <ListItemAvatar>
              <Avatar style={{ backgroundColor: red[100], color: red[700] }}>
                <CloseIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText>Cancel</ListItemText>
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
}
export default withStyles(styles)(PaletteList);
