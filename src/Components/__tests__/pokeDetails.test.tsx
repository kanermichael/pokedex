import React from "react";
import { render, screen} from "@testing-library/react";
import { MemoryRouter } from "react-router";
import PokeDetails from "../PokeDetails";
import { server } from '../../mocks/server.js'

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

it("loads pokemon detail page", async () => {
    render(
        <MemoryRouter>
          <PokeDetails pokename='caterpie' />
        </MemoryRouter>
      );
      // expect this ability to be in the document
      expect(await screen.findByText(/shield-dust/i)).toBeInTheDocument()
})