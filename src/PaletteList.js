import React from "react";
import MiniPalette from "./MiniPalette";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/PaletteListStyles";
import { Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

function PaletteList(props) {
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
                  deletePalette={deletePalette}
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
    </div>
  );
}
export default withStyles(styles)(PaletteList);
