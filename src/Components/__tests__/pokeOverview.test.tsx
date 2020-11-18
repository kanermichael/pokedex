import React from "react";
import { render, screen } from "@testing-library/react";
import PokemonList from "../PokemonList";
import Header from "../Header";
import { server } from '../../mocks/server.js'
import { MemoryRouter } from "react-router";

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe("Pokemon Overview Page ", () => {

  
  it("Loads Header correctly", () => {
    render(<Header />);
    // check if header loads with correct text
    expect(screen.getByText("Pokedex"));
  });

  it("loads pokemonlist", async () => {
    render(
      <MemoryRouter>
        <PokemonList />
      </MemoryRouter>
    );

    // Check that first and last pokemon of page are there
    expect(await screen.findByText(/bulbasaur/i)).toBeInTheDocument();
    // screen.debug(await screen.findByText(/bulbasaur/i))
    expect(screen.getByText(/charizard/i)).toBeInTheDocument();
    // Check that the next button is enabled
    expect(screen.getByLabelText(/next/i)).toBeEnabled();
    // check that previous button is disabled on first page
    expect(screen.getByLabelText(/previous/i)).toBeDisabled();
  });
});
