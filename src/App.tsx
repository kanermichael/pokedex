import React from "react";
import { BrowserRouter as Router, Route,  Switch} from "react-router-dom";
import "./App.css";
import PokemonList from "./Components/PokemonList";
import PokeDetails from "./Components/PokeDetails";
import Header from "./Components/Header";

function App() {
  return (
    <React.Fragment>
      <Header />
      <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <React.Fragment>
              <PokemonList />
            </React.Fragment>
          )}
        />

        <Route
          exact
          path="/pokemon/:name"
          render={(props) => <PokeDetails {...props} />}
        />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
