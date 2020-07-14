import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Palette from "./Palette";
import seedColors from "./seedColors";
import "./App.css";
import SingleColorPalette from "./SingleColorPalette";
import PaletteList from "./PaletteList";
import NewPaletteForm from "./NewPaletteForm";
import { generatePalette } from "./colorHelpers";

function App() {
  const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
  const [palettes, setPalettes] = useState(savedPalettes || seedColors);
  function findPalette(id) {
    return palettes.find(function (palette) {
      return palette.id === id;
    });
  }
  function savePalette(newPalette) {
    return setPalettes([...palettes, newPalette]);
  }

  useEffect(() => {
    window.localStorage.setItem("palettes", JSON.stringify(palettes));
  }, [palettes]);
  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path="/palette/new"
          render={(routeProps) => (
            <NewPaletteForm
              savePalette={savePalette}
              {...routeProps}
              palettes={palettes}
            />
          )}
        />
        <Route
          exact
          path="/"
          render={(routeProps) => (
            <PaletteList palettes={palettes} {...routeProps} />
          )}
        />
        <Route
          exact
          path="/palette/:id"
          render={(routeProps) => (
            <Palette
              palette={generatePalette(findPalette(routeProps.match.params.id))}
            />
          )}
        />
        <Route
          path="/palette/:paletteId/:colorId"
          render={(routeProps) => (
            <SingleColorPalette
              colorId={routeProps.match.params.colorId}
              palette={generatePalette(
                findPalette(routeProps.match.params.paletteId)
              )}
            />
          )}
        />
      </Switch>

      {/*  */}
    </div>
  );
}

export default App;
