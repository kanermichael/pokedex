import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import PokemonList from "./Components/PokemonList";
import PokeDetails from "./Components/PokeDetails";
import Header from "./Components/Header";

function App() {
  return (
    <React.Fragment>
      <Header />

      <Switch>
        <Route exact path="/">
          <React.Fragment>
            <PokemonList />
          </React.Fragment>
        </Route>

        <Route
          exact
          path="/:name"
          render={(props) => <PokeDetails {...props} />}
        />
      </Switch>
    </React.Fragment>
  );
}

export default App;
