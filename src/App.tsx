import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import PokemonList from "./Components/PokemonList";
import PokeDetails from "./Components/PokeDetails";
import Header from "./Components/Header";

function App() {
  return (
    <React.Fragment>
      <Header />
      <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <React.Fragment>
            <PokemonList />
          </React.Fragment>
        </Route>

        <Route
          exact
          path="/:name"
          render={(props) => {
         
          return <PokeDetails pokename={props.match.params.name} />
        }}
        />
      </Switch>
     </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
